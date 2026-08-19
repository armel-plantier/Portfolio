// --- MINIATURES PDF (1ère page) — lazy-load + cache localStorage ---
(function () {
    if (typeof pdfjsLib === 'undefined') return;
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'vendor/pdfjs/pdf.worker.min.js';

    const CACHE_PREFIX = 'pdfthumb:v2:';
    const THUMB_WIDTH = 640;

    function cacheGet(url) {
        try { return localStorage.getItem(CACHE_PREFIX + url); } catch (e) { return null; }
    }
    function cacheSet(url, dataUrl) {
        try { localStorage.setItem(CACHE_PREFIX + url, dataUrl); } catch (e) { /* quota pleine : tant pis, pas de cache */ }
    }

    async function renderThumb(url) {
        const cached = cacheGet(url);
        if (cached) return cached;

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

        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        cacheSet(url, dataUrl);
        return dataUrl;
    }

    function mountThumb(container) {
        if (container.dataset.mounted) return;
        container.dataset.mounted = 'true';
        const url = container.dataset.pdfUrl;
        if (!url) return;

        renderThumb(url).then(function (dataUrl) {
            const img = document.createElement('img');
            img.src = dataUrl;
            img.alt = '';
            img.loading = 'lazy';
            img.className = 'thumb-img';
            container.appendChild(img);
            container.classList.add('thumb-loaded');
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
