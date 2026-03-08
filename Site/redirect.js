(function() {
    var segments = window.location.pathname.split('/').filter(Boolean);

    if (segments[0] === 'procedures' && segments[1]) {
        window.location.href = 'https://armel-plantier.com/?proc=' + encodeURIComponent(segments[1]);
    }

    if (segments[0] === 'projet-technova' && segments[1]) {
        window.location.href = 'https://armel-plantier.com/?proj=' + encodeURIComponent(segments[1]);
    }
})();
