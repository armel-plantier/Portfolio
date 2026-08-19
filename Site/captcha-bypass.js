(function() {
    try {
        var ts = localStorage.getItem('ap_verified');
        if (ts && (Date.now() - parseInt(ts, 10)) < 1800000) {
            document.write('<style>#splash-screen{display:none!important}</style>');
            window._splashBypassed = true;
        }
    } catch(e) {}
})();
