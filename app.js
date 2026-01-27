document.addEventListener("DOMContentLoaded", () => {
    
    // ============================================
    // 1. CHARGEMENT DU PROFIL (NOUVEAU : Vient de config.js)
    // ============================================
    
    // Titre de l'onglet du navigateur
    document.title = `root@portfolio:~# ${config.profile.name}`;
    
    // Avatar
    const avatarEl = document.getElementById("profile-avatar");
    if(avatarEl) avatarEl.src = config.profile.avatar;

    // Nom (on garde le curseur clignotant en HTML)
    const nameEl = document.getElementById("profile-name");
    if(nameEl) nameEl.innerHTML = `${config.profile.name}<span class="cursor">_</span>`;

    // Status et Bio
    const statusEl = document.getElementById("profile-status");
    if(statusEl) statusEl.innerText = config.profile.status;

    const bioEl = document.getElementById("profile-bio");
    if(bioEl) bioEl.innerText = config.profile.bio;

    // Liens Sociaux
    const githubLink = document.getElementById("link-github");
    if(githubLink) githubLink.href = config.social.github;

    const linkedinLink = document.getElementById("link-linkedin");
    if(linkedinLink) linkedinLink.href = config.social.linkedin;

    // Email (texte dans le popup)
    const emailText = document.getElementById("email-text");
    if(emailText) emailText.innerText = config.profile.email;

    // Footer (Année auto + Nom)
    const footerEl = document.getElementById("footer-copy");
    if(footerEl) footerEl.innerHTML = `&copy; ${new Date().getFullYear()} ${config.profile.name} - GitHub Pages`;

    // Génération automatique des Compétences (Skills)
    const skillsContainer = document.getElementById("skills-section");
    if(skillsContainer) {
        config.skills.forEach(skill => {
            const span = document.createElement("span");
            span.className = "skill-tag";
            span.innerText = skill;
            skillsContainer.appendChild(span);
        });
    }

    // Génération automatique des Certifications
    const certList = document.getElementById("cert-list");
    if(certList) {
        config.certifications.forEach(cert => {
            const li = document.createElement("li");
            li.innerText = cert;
            certList.appendChild(li);
        });
    }

    // ============================================
    // 2. ANIMATION MACHINE À ÉCRIRE (Adaptée au config.js)
    // ============================================
    // Note : J'ai changé le sélecteur pour viser l'ID précis du nouveau HTML
    const textElement = document.getElementById("typewriter-area");
    const textToType = config.profile.typewriterText; // Le texte vient du config !
    
    if(textElement) {
        textElement.innerText = ""; 
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < textToType.length) {
                textElement.innerHTML += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 500);
    }

    // ============================================
    // 3. GÉNÉRATION DES PROJETS (Ta logique corrigée)
    // ============================================
    const grid = document.getElementById("project-grid");
    
    // L'URL vers ton autre dépôt "Technova"
    const baseUrl = `https://armel-plantier.github.io/Technova/Documents/`;

    config.projects.forEach((project, index) => {
        const viewerId = `viewer_${index}`;
        // Construction de l'URL complète
        const fullPdfUrl = baseUrl + project.path;
        
        const cardHTML = `
            <div class="project-card">
                <div class="card-header" onclick="togglePDF('${viewerId}', '${fullPdfUrl}')">
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

    // ============================================
    // 4. ÉCOUTEUR POUR LE POPUP EMAIL
    // ============================================
    const emailTrigger = document.getElementById("email-trigger");
    if(emailTrigger) {
        emailTrigger.addEventListener("click", function(e) {
            e.preventDefault();
            document.getElementById("email-modal").style.display = "flex";
        });
    }
});

// ============================================
// 5. FONCTIONS GLOBALES (PDF & MODAL)
// ============================================

window.togglePDF = function(containerId, url) {
    const container = document.getElementById(containerId);
    const header = container.previousElementSibling;

    // Fermeture si déjà ouvert
    if (container.style.display === "block") {
        container.style.display = "none";
        container.innerHTML = "";
        header.classList.remove("active");
        return;
    }

    // Ferme tous les autres avant d'ouvrir celui-ci
    document.querySelectorAll('.pdf-container').forEach(el => {
        el.style.display = 'none';
        el.innerHTML = '';
    });
    document.querySelectorAll('.card-header').forEach(el => el.classList.remove('active'));

    // On utilise encodeURIComponent pour sécuriser l'URL passée à Google Viewer
    const viewerUrl = "https://docs.google.com/viewer?url=" + encodeURIComponent(url) + "&embedded=true";

    const iframe = document.createElement('iframe');
    iframe.src = viewerUrl;
    iframe.width = "100%";
    iframe.height = "600px";
    iframe.style.border = "none";

    container.appendChild(iframe);
    container.style.display = "block";
    header.classList.add("active");
};

// Fonctions du Modal Email
window.closeModal = function() {
    document.getElementById("email-modal").style.display = "none";
    const feedback = document.getElementById("copy-feedback");
    if(feedback) feedback.innerText = "";
};

window.onclick = function(event) {
    const modal = document.getElementById("email-modal");
    if (event.target == modal) {
        closeModal();
    }
};

window.copyEmail = function() {
    const emailText = document.getElementById("email-text").innerText;
    
    navigator.clipboard.writeText(emailText).then(() => {
        const feedback = document.getElementById("copy-feedback");
        if(feedback) {
            feedback.innerText = "Adresse copiée ! ✅";
            setTimeout(closeModal, 2000);
        }
    }).catch(err => {
        console.error('Erreur copie :', err);
    });
};
