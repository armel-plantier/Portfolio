document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ANIMATION MACHINE À ÉCRIRE ---
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
    const baseUrl = `https://armel-plantier.github.io/Technova/Documents`;

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

    // --- 3. ÉCOUTEUR POUR OUVRIR LE POPUP EMAIL ---
    const emailTrigger = document.getElementById("email-trigger");
    if(emailTrigger) {
        emailTrigger.addEventListener("click", function(e) {
            e.preventDefault(); // Empêche le comportement par défaut
            document.getElementById("email-modal").style.display = "flex";
        });
    }
});

// --- 4. FONCTION D'OUVERTURE PDF ---
window.togglePDF = function(containerId, pdfPath) {
    const container = document.getElementById(containerId);
    const header = container.previousElementSibling;
    const githubUrl = `https://${config.githubUser}.github.io/`;

    if (container.style.display === "block") {
        container.style.display = "none";
        container.innerHTML = "";
        header.classList.remove("active");
        return;
    }

    document.querySelectorAll('.pdf-container').forEach(el => {
        el.style.display = 'none';
        el.innerHTML = '';
    });
    document.querySelectorAll('.card-header').forEach(el => el.classList.remove('active'));

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

// --- 5. FONCTIONS POPUP EMAIL ---

// Fermer le modal
window.closeModal = function() {
    document.getElementById("email-modal").style.display = "none";
    const feedback = document.getElementById("copy-feedback");
    if(feedback) feedback.innerText = "";
};

// Fermer en cliquant en dehors
window.onclick = function(event) {
    const modal = document.getElementById("email-modal");
    if (event.target == modal) {
        closeModal();
    }
};

// Copier l'email
window.copyEmail = function() {
    const emailText = document.getElementById("email-text").innerText;
    
    navigator.clipboard.writeText(emailText).then(() => {
        const feedback = document.getElementById("copy-feedback");
        if(feedback) {
            feedback.innerText = "Adresse copiée ! ✅";
            setTimeout(closeModal, 2000); // Ferme auto après 2s
        }
    }).catch(err => {
        console.error('Erreur copie :', err);
    });
};
