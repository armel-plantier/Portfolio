// === BYPASS SI DÉJÀ VÉRIFIÉ (24h) ===
(function() {
    var STORAGE_KEY = 'ap_verified';
    var EXPIRY_MS   = 24 * 60 * 60 * 1000; // 24 heures

    function skipSplash() {
        var splash = document.getElementById('splash-screen');
        if (splash) splash.style.display = 'none';
    }

    try {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            var ts = parseInt(stored, 10);
            if (Date.now() - ts < EXPIRY_MS) {
                document.addEventListener('DOMContentLoaded', skipSplash);
                skipSplash();
                window._splashBypassed = true;
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    } catch(e) {}
})();

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

    if (!window._splashBypassed) runStep();
})();

// === CALLBACK CLOUDFLARE ===
function onTurnstileLoad() {
    if (window._splashBypassed) return;

    var splash = document.getElementById('splash-screen');
    if (!splash) return;

    turnstile.render('#entry-captcha-container', {
        sitekey: '0x4AAAAAACWdXwpSGlIddb_k',
        theme: 'dark',
        callback: function() {
            try { localStorage.setItem('ap_verified', Date.now().toString()); } catch(e) {}

            if (window._splashProgress) window._splashProgress.complete();
            setTimeout(function() {
                splash.style.transition = 'opacity 0.5s ease';
                splash.style.opacity = '0';
                setTimeout(function() { splash.style.display = 'none'; }, 500);
            }, 600);
        }
    });
}
