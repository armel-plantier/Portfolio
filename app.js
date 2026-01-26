document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ANIMATION MACHINE À ÉCRIRE (Manquait dans ton code) ---
    const textElement = document.querySelector("h2");
    const textToType = "> Admin Sys & Réseau | Passionné de Cybersécurité";
    
    if(textElement) {
        textElement.innerText = ""; 
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < textToType.length) {
                textElement.innerHTML += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50); // Vitesse de frappe
            }
        }
        setTimeout(typeWriter, 500);
    }

    // --- 2. GÉNÉRATION DES PROJETS ---
    const grid = document.getElementById("project-grid");
    const baseUrl = `https://${config.githubUser}.github.io/`;

    config.projects.forEach((project, index) => {
        const viewerId = `viewer_${index}`;
        const fullPdfUrl = baseUrl + project.path;
        
        const cardHTML = `
            <div class="project-card">
                <div class="card-header" onclick="togglePDF('${viewerId}', '${project.path}')">
                    <div class="icon">${project.icon}</div>
                    <div class="meta">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                    </div>
                    
                    <a href="${fullPdfUrl}" target="_blank" class="external-btn" onclick="event.stopPropagation()" title="Ouvrir le PDF">
                        ↗
                    </a>
                    
                    <div class="arrow">▼</div>
                </div>
                <div id="${viewerId}" class="pdf-container"></div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });
});

// --- 3. FONCTION D'OUVERTURE PDF ---
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
