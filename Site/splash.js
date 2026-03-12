// === BARRE DE PROGRESSION ===
(function() {
    var bar   = document.getElementById('sp-progress-bar');
    var pct   = document.getElementById('sp-progress-pct');
    var label = document.getElementById('sp-progress-label');
    var current = 0;
    var timer = null;

    var steps = [
        { target: 20, delay: 60,  step: 2,   msg: "Connexion à Cloudflare..." },
        { target: 50, delay: 80,  step: 1.5, msg: "Chargement du captcha..." },
        { target: 75, delay: 120, step: 0.8, msg: "En attente de vérification..." },
        { target: 88, delay: 250, step: 0.3, msg: "En attente de vérification..." },
    ];
    var stepIndex = 0;

    function runStep() {
        if (stepIndex >= steps.length) return;
        var s = steps[stepIndex];
        if (label) label.textContent = s.msg;
        clearInterval(timer);
        timer = setInterval(function() {
            if (current >= s.target) {
                clearInterval(timer);
                stepIndex++;
                setTimeout(runStep, 350);
                return;
            }
            current = Math.min(current + s.step, s.target);
            if (bar) bar.style.width = current + '%';
            if (pct) pct.textContent = Math.round(current) + '%';
        }, s.delay);
    }

    window._splashProgress = {
        complete: function() {
            clearInterval(timer);
            if (bar)   { bar.classList.add('complete'); bar.style.width = '100%'; }
            if (pct)   { pct.textContent = '100%'; pct.style.color = '#10b981'; }
            if (label) { label.textContent = '✓ Vérification réussie'; label.style.color = '#10b981'; }
        }
    };

    runStep();
})();

// === CALLBACK CLOUDFLARE ===
function onTurnstileLoad() {
    var splash = document.getElementById('splash-screen');
    if (!splash) return;

    turnstile.render('#entry-captcha-container', {
        sitekey: '0x4AAAAAACWdXwpSGlIddb_k',
        theme: 'dark',
        callback: function() {
            if (window._splashProgress) window._splashProgress.complete();
            setTimeout(function() {
                splash.style.transition = 'opacity 0.5s ease';
                splash.style.opacity = '0';
                setTimeout(function() { splash.style.display = 'none'; }, 500);
            }, 600);
        }
    });
}
