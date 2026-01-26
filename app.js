document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("project-grid");
    
    // On génère le HTML pour chaque projet dans la config
    config.projects.forEach((project, index) => {
        const viewerId = `viewer_${index}`;
        
        const cardHTML = `
            <div class="project-card">
                <div class="card-header" onclick="togglePDF('${viewerId}', '${project.path}')">
                    <div class="icon">${project.icon}</div>
                    <div class="meta">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                    </div>
                    <div class="arrow">▼</div>
                </div>
                <div id="${viewerId}" class="pdf-container"></div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });
});

// Fonction globale pour ouvrir/fermer le PDF
window.togglePDF = function(containerId, pdfPath) {
    const container = document.getElementById(containerId);
    const header = container.previousElementSibling;
    const githubUrl = `https://${config.githubUser}.github.io/`;

    // Si ouvert, on ferme
    if (container.style.display === "block") {
        container.style.display = "none";
        container.innerHTML = "";
        header.classList.remove("active");
        return;
    }

    // Sinon, on ferme les autres d'abord
    document.querySelectorAll('.pdf-container').forEach(el => {
        el.style.display = 'none';
        el.innerHTML = '';
    });
    document.querySelectorAll('.card-header').forEach(el => el.classList.remove('active'));

    // Et on ouvre le courant via Google Viewer
    const fullPdfUrl = githubUrl + pdfPath;
    const viewerUrl = "https://docs.google.com/viewer?url=" + fullPdfUrl + "&embedded=true";

    const iframe = document.createElement('iframe');
    iframe.src = viewerUrl;
    iframe.width = "100%";
    iframe.height = "600px";
    iframe.style.border = "none";

    container.appendChild(iframe);
    container.style.display = "block";
    header.classList.add("active");
};
