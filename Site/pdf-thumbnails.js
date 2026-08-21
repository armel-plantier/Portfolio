// --- MINIATURES PDF (1ère page) — lazy-load + cache localStorage ---
(function () {
    if (typeof pdfjsLib === 'undefined') return;
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'vendor/pdfjs/pdf.worker.min.js';

    const CACHE_PREFIX = 'pdfthumb:v3:';
    const OLD_PREFIXES = ['pdfthumb:v1:', 'pdfthumb:v2:'];
    const THUMB_WIDTH = 640;

    // Purge des anciens caches (format sans nombre de pages)
    try {
        Object.keys(localStorage)
            .filter(k => OLD_PREFIXES.some(p => k.startsWith(p)))
            .forEach(k => localStorage.removeItem(k));
    } catch (e) { /* localStorage indisponible : rien à purger */ }

    function cacheGet(url) {
        try {
            const raw = localStorage.getItem(CACHE_PREFIX + url);
            return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
    }
    function cacheSet(url, entry) {
        try { localStorage.setItem(CACHE_PREFIX + url, JSON.stringify(entry)); } catch (e) { /* quota plein : tant pis, pas de cache */ }
    }

    async function renderThumb(url) {
        const cached = cacheGet(url);
        if (cached && cached.img) return cached;

        const pdf = await pdfjsLib.getDocument({ url }).promise;
        const page = await pdf.getPage(1);
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = THUMB_WIDTH / baseViewport.width;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport }).promise;

        const entry = { img: canvas.toDataURL('image/jpeg', 0.92), pages: pdf.numPages };
        cacheSet(url, entry);
        return entry;
    }

    function mountThumb(container) {
        if (container.dataset.mounted) return;
        container.dataset.mounted = 'true';
        const url = container.dataset.pdfUrl;
        if (!url) return;

        renderThumb(url).then(function (entry) {
            const img = document.createElement('img');
            img.src = entry.img;
            img.alt = '';
            img.loading = 'lazy';
            img.className = 'thumb-img';
            container.appendChild(img);
            container.classList.add('thumb-loaded');

            // Pastille "n p." sur les cartes document
            const pagesEl = container.querySelector('.doc-thumb-pages');
            if (pagesEl && entry.pages) {
                pagesEl.textContent = entry.pages + ' p.';
                pagesEl.hidden = false;
            }
        }).catch(function () {
            container.classList.add('thumb-failed');
        });
    }

    const observer = ('IntersectionObserver' in window)
        ? new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    mountThumb(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '400px 0px' })
        : null;

    window.observePdfThumb = function (container) {
        if (observer) observer.observe(container);
        else mountThumb(container);
    };
})();
