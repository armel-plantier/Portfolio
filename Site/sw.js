/**
 * Service Worker — Armel Plantier Portfolio
 * Stratégies :
 *   - Cache-first pour les assets statiques (CSS, JS, images, fonts)
 *   - Network-first pour HTML et config.js (toujours fraîchement récupéré)
 *   - Bypass complet pour les PDF et API GitHub (pas de cache)
 */

const VERSION = 'v1.0.0';
const STATIC_CACHE = `portfolio-static-${VERSION}`;
const RUNTIME_CACHE = `portfolio-runtime-${VERSION}`;

// Ressources pré-cachées à l'installation
const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/splash.js',
    '/redirect.js',
    '/manifest.json',
    '/assets/avatar.png',
    '/404.html'
];

// === INSTALL ===
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => cache.addAll(PRECACHE_URLS).catch(err => {
                console.warn('[SW] Precache partiel:', err);
            }))
            .then(() => self.skipWaiting())
    );
});

// === ACTIVATE ===
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then(names => Promise.all(
                names
                    .filter(n => n !== STATIC_CACHE && n !== RUNTIME_CACHE)
                    .map(n => caches.delete(n))
            ))
            .then(() => self.clients.claim())
    );
});

// === FETCH ===
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Seulement GET
    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    // Bypass : requêtes externes qu'on ne veut pas cacher
    if (
        url.hostname === 'api.github.com' ||
        url.hostname === 'raw.githubusercontent.com' ||
        url.hostname === 'docs.google.com' ||
        url.hostname === 'challenges.cloudflare.com' ||
        url.hostname.includes('cloudflareinsights') ||
        url.hostname.includes('sibforms') ||
        url.pathname.endsWith('.pdf')
    ) {
        return; // laisse le navigateur gérer
    }

    // Network-first pour HTML, config.js et la racine (contenu qui change)
    if (
        request.mode === 'navigate' ||
        url.pathname === '/' ||
        url.pathname.endsWith('.html') ||
        url.pathname.endsWith('/config.js')
    ) {
        event.respondWith(networkFirst(request));
        return;
    }

    // Cache-first pour le reste (assets statiques)
    if (url.origin === self.location.origin) {
        event.respondWith(cacheFirst(request));
        return;
    }

    // Fonts Google → stale-while-revalidate
    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
        event.respondWith(staleWhileRevalidate(request));
        return;
    }
});

// === STRATÉGIES ===

async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
        const response = await fetch(request);
        if (response && response.status === 200 && response.type !== 'opaque') {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, response.clone());
        }
        return response;
    } catch (err) {
        // Fallback si tout est HS
        return caches.match('/404.html');
    }
}

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response && response.status === 200) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, response.clone());
        }
        return response;
    } catch (err) {
        const cached = await caches.match(request);
        if (cached) return cached;
        // Dernier recours : page d'accueil en cache
        return caches.match('/') || caches.match('/index.html');
    }
}

async function staleWhileRevalidate(request) {
    const cached = await caches.match(request);
    const networkPromise = fetch(request).then(response => {
        if (response && response.status === 200) {
            caches.open(RUNTIME_CACHE).then(cache => cache.put(request, response.clone()));
        }
        return response;
    }).catch(() => cached);
    return cached || networkPromise;
}

// === MESSAGE : permettre au site de forcer l'update du SW ===
self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') self.skipWaiting();
    if (event.data === 'CLEAR_CACHE') {
        caches.keys().then(names => Promise.all(names.map(n => caches.delete(n))));
    }
});
