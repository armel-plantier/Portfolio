document.addEventListener("DOMContentLoaded", () => {
    
    // VÉRIFICATION DE SÉCURITÉ
    if (typeof config === 'undefined') {
        console.error("ERREUR : config.js n'est pas chargé !");
        return;
    }

    // --- GESTION DU THEME (Light / Dark) ---
    const themeBtn = document.getElementById("theme-toggle");
    const body = document.body;
    
    // Vérification du stockage local
    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-mode");
        if(themeBtn) themeBtn.innerText = "🌙"; 
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            body.classList.toggle("light-mode");
            if (body.classList.contains("light-mode")) {
                themeBtn.innerText = "🌙"; 
                localStorage.setItem("theme", "light");
            } else {
                themeBtn.innerText = "☀️"; 
                localStorage.setItem("theme", "dark");
            }
        });
    }

    // --- 1. PROFIL ---
    // Titre de l'onglet du navigateur
    document.title = `${config.profile.name} | Portfolio`;

    const avatarEl = document.getElementById("profile-avatar");
    if(avatarEl) avatarEl.src = config.profile.avatar;

    const nameEl = document.getElementById("profile-name");
    if(nameEl) nameEl.innerText = config.profile.name;

    const statusEl = document.getElementById("profile-status");
    if(statusEl) statusEl.innerText = config.profile.status;

    const bioEl = document.getElementById("profile-bio");
    if(bioEl) bioEl.innerText = config.profile.bio;

    const githubLink = document.getElementById("link-github");
    if(githubLink) githubLink.href = config.social.github;

    const linkedinLink = document.getElementById("link-linkedin");
    if(linkedinLink) linkedinLink.href = config.social.linkedin;
    
    const footerEl = document.getElementById("footer-copy");
    if(footerEl) footerEl.innerHTML = `&copy; ${new Date().getFullYear()} ${config.profile.name}. Tous droits réservés.`;

    // --- 2. HEADER SKILLS (Tags en haut) ---
    const skillsContainer = document.getElementById("skills-section");
    if(skillsContainer) {
        config.skills.forEach(skill => {
            const span = document.createElement("span");
            span.className = "skill-tag";
            span.innerText = skill;
            skillsContainer.appendChild(span);
        });
    }

    // --- 3. PROJETS (Limite : 3) ---
    const grid = document.getElementById("project-grid");
    // Calcul du chemin pour les PDF
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = `${window.location.origin}${path}Documents/`; 
    const PROJECT_LIMIT = 3;

    if (grid && config.projects) {
        config.projects.forEach((project, index) => {
            const viewerId = `viewer_${index}`;
            // On s'assure que le PDF pointe vers le bon dossier
            const fullPdfUrl = baseUrl + project.path;
            
            const cardDiv = document.createElement("div");
            cardDiv.className = "project-card";
            
            // Masquer les projets au-delà de la limite
            if (index >= PROJECT_LIMIT) cardDiv.classList.add("hidden-item");

            cardDiv.innerHTML = `
                <div class="card-header" onclick="togglePDF('${viewerId}', '${fullPdfUrl}')">
                    <div class="icon">${project.icon}</div>
                    <div class="meta">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                    </div>
                </div>
                <div id="${viewerId}" class="pdf-container"></div>
            `;
            grid.appendChild(cardDiv);
        });

        // Ajouter le bouton "Voir plus" si nécessaire
        if (config.projects.length > PROJECT_LIMIT) {
            createToggleBtn(grid, PROJECT_LIMIT, "Voir tous les projets");
        }
    }

    // --- 4. EXPÉRIENCES (Timeline) ---
    const expList = document.getElementById("exp-list");
    const EXP_LIMIT = 3;
    if(expList && config.experiences) {
        config.experiences.forEach((exp, index) => {
            const li = document.createElement("li");
            li.className = "timeline-item";
            if (index >= EXP_LIMIT) li.classList.add("hidden-item");
            li.innerHTML = `
                <span class="timeline-date">${exp.date}</span>
                <h4 class="timeline-title">${exp.role} <span style="font-weight:400; opacity:0.8;">@ ${exp.company}</span></h4>
                <p class="timeline-desc">${exp.description}</p>
            `;
            expList.appendChild(li);
        });
        if (config.experiences.length > EXP_LIMIT) {
            createToggleBtn(expList, EXP_LIMIT, "Afficher l'historique complet");
        }
    }

    // --- 5. COMPÉTENCES (Nouveau design Carte) ---
    const compList = document.getElementById("comp-list");
    const COMP_LIMIT = 4;
    if(compList && config.competences) {
        config.competences.forEach((comp, index) => {
            const li = document.createElement("li");
            li.className = "comp-card-container"; // Classe adaptée au nouveau CSS
            if (index >= COMP_LIMIT) li.classList.add("hidden-item");
            
            const detailsHTML = comp.details.map(d => `<li>• ${d}</li>`).join('');
            
            // Structure mise à jour pour le design moderne
            li.innerHTML = `
                <div class="comp-header">
                    <span class="cert-name">${comp.name}</span>
                    <button class="cert-btn comp-toggle" onclick="toggleComp(event, 'comp-drop-${index}')">▼</button>
                </div>
                <ul id="comp-drop-${index}" class="comp-dropdown-menu">
                    ${detailsHTML}
                </ul>
            `;
            compList.appendChild(li);
        });
        if (config.competences.length > COMP_LIMIT) {
            createToggleBtn(compList, COMP_LIMIT, "Voir toutes les compétences");
        }
    }

    // --- 6. CERTIFICATIONS ---
    const certList = document.getElementById("cert-list");
    const CERT_LIMIT = 4;
    if(certList && config.certifications) {
        config.certifications.forEach((cert, index) => {
            const li = document.createElement("li");
            if (index >= CERT_LIMIT) li.classList.add("hidden-item");
            li.innerHTML = `
                <span class="cert-name">${cert.name}</span>
                <a href="${cert.url}" target="_blank" class="cert-btn">Voir ➜</a>
            `;
            certList.appendChild(li);
        });
        if (config.certifications.length > CERT_LIMIT) {
            createToggleBtn(certList, CERT_LIMIT, "Voir toutes les certifications");
        }
    }

    // --- 7. TYPEWRITER EFFECT (Effet machine à écrire) ---
    const textElement = document.getElementById("typewriter-area");
    if(textElement && config.profile.typewriterText) {
        const textToType = config.profile.typewriterText;
        textElement.innerText = ""; 
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < textToType.length) {
                textElement.innerHTML += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50); // Vitesse de frappe
            }
        }
        setTimeout(typeWriter, 500); // Délai avant démarrage
    }

    // --- 8. MODALE DE CONTACT ---
    const emailTrigger = document.getElementById("email-trigger");
    if(emailTrigger) {
        emailTrigger.addEventListener("click", function(e) {
            e.preventDefault();
            document.getElementById("email-modal").style.display = "flex";
        });
    }

    // Fermeture des dropdowns si on clique ailleurs
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.comp-card-container')) {
            document.querySelectorAll('.comp-dropdown-menu').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.comp-toggle').forEach(el => el.classList.remove('active'));
        }
    });
});

// --- FONCTIONS UTILITAIRES GLOBALES ---

// Fonction pour créer le bouton "Voir plus / Voir moins"
function createToggleBtn(container, limit, textMore) {
    const btnContainer = document.createElement("div");
    btnContainer.className = "load-more-container";
    const btn = document.createElement("button");
    btn.className = "load-more-btn";
    btn.innerHTML = `↓ ${textMore}`;
    
    let isExpanded = false;
    btn.onclick = function() {
        isExpanded = !isExpanded; 
        const items = container.children;
        for (let i = 0; i < items.length; i++) {
            if (i >= limit) {
                if (isExpanded) {
                    items[i].classList.remove("hidden-item");
                    // Petit effet d'apparition
                    items[i].style.opacity = 0;
                    setTimeout(() => items[i].style.opacity = 1, 50);
                } else {
                    items[i].classList.add("hidden-item");
                }
            }
        }
        btn.innerHTML = isExpanded ? `↑ Voir moins` : `↓ ${textMore}`;
    };
    btnContainer.appendChild(btn);
    container.parentNode.insertBefore(btnContainer, container.nextSibling);
}

// Fonction pour ouvrir/fermer les détails des compétences
window.toggleComp = function(event, id) {
    event.stopPropagation(); 
    const menu = document.getElementById(id);
    const btn = event.currentTarget;
    
    // Fermer les autres ouverts
    document.querySelectorAll('.comp-dropdown-menu').forEach(el => { 
        if(el.id !== id) el.style.display = 'none'; 
    });
    
    // Basculer l'état
    if (menu.style.display === "block") { 
        menu.style.display = "none"; 
        btn.classList.remove('active'); 
    } else { 
        menu.style.display = "block"; 
        btn.classList.add('active'); 
    }
};

// Fonction pour afficher le PDF
window.togglePDF = function(containerId, url) {
    const container = document.getElementById(containerId);
    
    // Si déjà ouvert, on ferme
    if (container.style.display === "block") {
        container.style.display = "none"; 
        container.innerHTML = ""; 
        return;
    }
    
    // Fermer tous les autres PDF ouverts pour éviter la surcharge
    document.querySelectorAll('.pdf-container').forEach(el => { 
        el.style.display = 'none'; 
        el.innerHTML = ''; 
    });

    // Utilisation du viewer Google Docs pour l'intégration facile
    const viewerUrl = "https://docs.google.com/viewer?url=" + encodeURIComponent(url) + "&embedded=true";
    container.innerHTML = `<iframe src="${viewerUrl}" width="100%" height="500px" style="border:none;"></iframe>`;
    container.style.display = "block";
};

// Fonctions pour la modale
window.closeModal = function() { 
    document.getElementById("email-modal").style.display = "none"; 
};

// Fermer la modale si on clique sur le fond sombre
window.onclick = function(event) { 
    if (event.target == document.getElementById("email-modal")) {
        window.closeModal(); 
    }
};
