document.addEventListener("DOMContentLoaded", () => {
    
    // Vérification de sécurité
    if (typeof config === 'undefined') { console.error("ERREUR CRITIQUE : config.js n'est pas chargé."); return; }

    // --- 1. THEME (Dark/Light Mode) ---
    const themeBtn = document.getElementById("theme-toggle");
    const body = document.body;
    
    // Appliquer le thème sauvegardé
    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-mode");
        if(themeBtn) themeBtn.innerText = "🌙"; 
    }
    
    // Gestion du clic bouton thème
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

    // --- 2. REMPLISSAGE DU PROFIL ---
    document.title = `${config.profile.name} | Portfolio`;
    
    // Avatar
    const avatarEl = document.getElementById("profile-avatar");
    if(avatarEl) avatarEl.src = config.profile.avatar;
    
    // Favicon
    const faviconEl = document.getElementById("favicon-link");
    if(faviconEl && config.profile.favicon) { faviconEl.href = config.profile.favicon; }

    // Textes
    setText("profile-name", config.profile.name);
    setText("profile-status", config.profile.status);
    setText("profile-bio", config.profile.bio);
    
    // Liens Sociaux
    setHref("link-github", config.social.github);
    setHref("link-linkedin", config.social.linkedin);
    
    // Footer
    const footerEl = document.getElementById("footer-copy");
    if(footerEl) footerEl.innerHTML = `&copy; ${new Date().getFullYear()} ${config.profile.name}.`;

    // --- 3. NAVIGATION (Menu) ---
    const navList = document.getElementById("nav-list");
    if(navList && config.navigation) {
        config.navigation.forEach(item => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.innerText = item.title;
            a.href = item.link; 
            
            // Fermer le menu sur mobile au clic
            a.addEventListener('click', () => {
                 const header = document.querySelector('.app-header');
                 if(header) header.classList.remove('menu-open');
            });

            li.appendChild(a);
            navList.appendChild(li);
        });
    }

    // --- 4. TAGS HEADER (Compétences rapides) ---
    const skillsContainer = document.getElementById("skills-section");
    if(skillsContainer && config.skills) {
        config.skills.forEach(s => {
            const span = document.createElement("span"); 
            span.className = "skill-tag"; 
            span.innerText = s;
            skillsContainer.appendChild(span);
        });
    }

    // --- 5. PROJETS ---
    const grid = document.getElementById("project-grid");
    // Calcul du chemin pour les PDF
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = `${window.location.origin}${path}Documents/`; 
    const PROJECT_LIMIT = 4; 

    if (grid && config.projects) {
        config.projects.forEach((proj, index) => {
            const vid = `viewer_${index}`;
            const div = document.createElement("div"); 
            div.className = "project-card";
            
            // Cacher les projets au-delà de la limite
            if (index >= PROJECT_LIMIT) div.classList.add("hidden-item");
            
            const fullPdfUrl = baseUrl + proj.path;
            const badgeHTML = proj.isNew ? `<span class="new-badge">Nouveau</span>` : '';

            // Note: On utilise window.togglePDF ici via onclick
            div.innerHTML = `
                ${badgeHTML}
                <div class="card-header" onclick="window.togglePDF('${vid}', '${fullPdfUrl}')" style="cursor: pointer;">
                    <div class="icon">${proj.icon}</div>
                    <div class="meta">
                        <h4>${proj.title}</h4>
                        <p>${proj.description}</p>
                    </div>
                </div>
                <div id="${vid}" class="pdf-container"></div>
            `;
            grid.appendChild(div);
        });
        
        // Bouton "Voir plus"
        if (config.projects.length > PROJECT_LIMIT) createToggleBtn(grid, PROJECT_LIMIT, "Voir la suite");
    }

    // --- 6. PARCOURS (Timeline) ---
    const expList = document.getElementById("exp-list");
    const EXP_LIMIT = 5;
    
    if(expList && config.experiences) {
        config.experiences.forEach((exp, index) => {
            const li = document.createElement("li"); 
            li.className = "timeline-item";
            if (index >= EXP_LIMIT) li.classList.add("hidden-item");
            
            li.innerHTML = `
                <span class="timeline-date">${exp.date}</span>
                <h4 class="timeline-title">${exp.role} <span style="font-weight:400;opacity:0.8;">@ ${exp.company}</span></h4>
                <p class="timeline-desc">${exp.description}</p>
            `;
            expList.appendChild(li);
        });
        if (config.experiences.length > EXP_LIMIT) createToggleBtn(expList, EXP_LIMIT, "Voir la suite");
    }

    // --- 7. COMPETENCES (Menu Déroulant) ---
    const compList = document.getElementById("comp-list");
    const COMP_LIMIT = 5;

    if(compList && config.competences) {
        config.competences.forEach((comp, index) => {
            const li = document.createElement("li"); 
            li.className = "comp-card-container";
            if (index >= COMP_LIMIT) li.classList.add("hidden-item");
            
            const dropId = `comp-drop-${index}`;
            const details = comp.details.map(d => `<li>• ${d}</li>`).join('');
            
            // Note: On utilise window.toggleComp ici
            li.innerHTML = `
                <div class="comp-header" onclick="window.toggleComp(event, '${dropId}')">
                    <div class="cert-icon-box">${comp.icon}</div>
                    <span class="cert-name">${comp.name}</span>
                    <button class="cert-btn comp-toggle">▼</button>
                </div>
                <ul id="${dropId}" class="comp-dropdown-menu" style="display:none;">${details}</ul>
            `;
            compList.appendChild(li);
        });
        if (config.competences.length > COMP_LIMIT) createToggleBtn(compList, COMP_LIMIT, "Voir la suite");
    }

    // --- 8. CERTIFICATIONS ---
    const certList = document.getElementById("cert-list");
    const CERT_LIMIT = 5;
    const certBaseUrl = `${window.location.origin}${path}Documents/Certifs/`; 

    if(certList && config.certifications) {
        config.certifications.forEach((cert, index) => {
            const li = document.createElement("li");
            li.className = "cert-card-container";
            
            if (index >= CERT_LIMIT) li.classList.add("hidden-item");
            
            const issuer = cert.issuer ? cert.issuer : "Certification"; 
            const viewerId = `cert_view_${index}`;
            const fullPdfUrl = cert.pdf ? certBaseUrl + cert.pdf : null;

            let buttonsHtml = '';
            // Bouton Lien
            if (cert.url) {
                buttonsHtml += `
                    <a href="${cert.url}" target="_blank" class="cert-btn link-btn" title="Voir le site officiel">
                         🔗
                    </a>`;
            }
            // Bouton PDF
            if (cert.pdf) {
                buttonsHtml += `
                    <button onclick="window.toggleCertPDF('${viewerId}', '${fullPdfUrl}')" class="cert-btn pdf-btn" title="Voir le diplôme">
                         📄
                    </button>`;
            }

            li.innerHTML = `
                <div class="cert-header-row">
                    <div class="cert-icon-box">🏆</div>
                    <div class="cert-info">
                        <span class="cert-name">${cert.name}</span>
                        <span class="cert-issuer">${issuer}</span>
                    </div>
                    <div class="cert-actions">
                        ${buttonsHtml}
                    </div>
                </div>
                <div id="${viewerId}" class="cert-pdf-viewer"></div>
            `;
            certList.appendChild(li);
        });
        if (config.certifications.length > CERT_LIMIT) createToggleBtn(certList, CERT_LIMIT, "Voir la suite");
    }

    // --- 9. EFFET MACHINE A ECRIRE ---
    const textEl = document.getElementById("typewriter-area");
    if(textEl && config.profile.typewriterText) {
        const txt = config.profile.typewriterText; 
        textEl.innerText = ""; 
        let i=0;
        function type() { 
            if(i<txt.length) { 
                textEl.innerHTML += txt.charAt(i); 
                i++; 
                setTimeout(type, 50); 
            } 
        }
        setTimeout(type, 500);
    }

    // --- 10. BOUTON CONTACT (Email) ---
    const emailTrigger = document.getElementById("email-trigger");
    if(emailTrigger) {
        emailTrigger.addEventListener("click", function(e) {
            e.preventDefault();
            const emailSpan = document.getElementById("email-text");
            // Récupère l'email depuis config.js
            emailSpan.innerText = config.profile.email || "Email non configuré";
            // Affiche la modale
            document.getElementById("email-modal").style.display = "flex";
        });
    }

    // --- 11. SCROLL & MENU MOBILE ---
    const header = document.querySelector('.app-header');
    const navCapsule = document.querySelector('.nav-capsule');
    const menuIcon = document.querySelector('.menu-icon'); 

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else { 
                header.classList.remove('scrolled'); 
                header.classList.remove('menu-open'); 
            }
        });

        if (menuIcon) {
            menuIcon.addEventListener('click', (e) => { 
                e.stopPropagation(); 
                header.classList.toggle('menu-open'); 
            });
        }

        document.addEventListener('click', (e) => {
            if (header.classList.contains('menu-open') && navCapsule && !navCapsule.contains(e.target)) {
                header.classList.remove('menu-open');
            }
        });
    }

    // Gestion fermeture modale au clic extérieur
    const modal = document.getElementById("email-modal");
    if(modal) {
        modal.addEventListener('click', function(e) {
            if(e.target === modal) window.closeModal();
        });
    }
    
    // Bouton croix modale
    const closeBtn = document.getElementById("modal-close-btn");
    if(closeBtn) {
        closeBtn.addEventListener('click', window.closeModal);
    }
});

// ==========================================
// FONCTIONS GLOBALES (Accessibles via onclick HTML)
// ==========================================

// Helper pour remplir du texte
function setText(id, text) {
    const el = document.getElementById(id);
    if(el) el.innerText = text || "";
}

// Helper pour les liens
function setHref(id, link) {
    const el = document.getElementById(id);
    if(el) el.href = link || "#";
}

// Fonction pour le bouton "Voir plus / Voir moins"
function createToggleBtn(container, limit, txtMore) {
    const div = document.createElement("div"); 
    div.className = "load-more-container"; 
    
    const btn = document.createElement("button"); 
    btn.className = "load-more-btn";
    btn.innerHTML = `<span>↓</span> ${txtMore}`; 
    
    let expanded = false;
    
    btn.onclick = () => {
        expanded = !expanded;
        const children = container.children;
        for(let i=0; i<children.length; i++) {
            if(i >= limit) {
                if(expanded) { 
                    children[i].classList.remove("hidden-item"); 
                    // Petit effet d'apparition
                    children[i].style.opacity = 0; 
                    setTimeout(()=>children[i].style.opacity=1, 50); 
                } else { 
                    children[i].classList.add("hidden-item"); 
                    children[i].style.opacity = 0; 
                }
            }
        }
        btn.innerHTML = expanded ? `<span>↑</span> Masquer` : `<span>↓</span> ${txtMore}`;
    };
    
    div.appendChild(btn); 
    container.parentNode.insertBefore(div, container.nextSibling);
}

// Ouvrir/Fermer la description des compétences
window.toggleComp = function(e, id) {
    if(e) e.stopPropagation(); 
    const menu = document.getElementById(id); 
    // Trouve le bouton flèche dans l'élément cliqué
    const btn = e.currentTarget.querySelector('.comp-toggle');
    
    // Ferme les autres menus ouverts
    document.querySelectorAll('.comp-dropdown-menu').forEach(el => { 
        if(el.id !== id) el.style.display = 'none'; 
    });
    document.querySelectorAll('.comp-toggle').forEach(el => { 
        if(el !== btn) el.classList.remove('active'); 
    });
    
    // Bascule l'état actuel
    if(menu.style.display === 'block') { 
        menu.style.display = 'none'; 
        if(btn) btn.classList.remove('active'); 
    } else { 
        menu.style.display = 'block'; 
        if(btn) btn.classList.add('active'); 
    }
};

// Afficher/Cacher le PDF Projet
window.togglePDF = function(id, url) {
    const c = document.getElementById(id);
    
    // Si déjà ouvert, on ferme
    if(c.style.display === 'block') { 
        c.style.display = 'none'; 
        c.innerHTML = ''; 
        return; 
    }
    
    // Ferme les autres PDF ouverts
    document.querySelectorAll('.pdf-container').forEach(el => { 
        el.style.display = 'none'; 
        el.innerHTML = ''; 
    });
    
    // Injecte le Viewer Google Docs
    c.innerHTML = `<iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true" width="100%" height="600px" style="border:none;"></iframe>`;
    c.style.display = 'block';
};

// Afficher/Cacher le PDF Certification
window.toggleCertPDF = function(id, url) {
    const viewer = document.getElementById(id);
    
    if (viewer.style.display === 'block') { 
        viewer.style.display = 'none'; 
        viewer.innerHTML = ''; 
        return; 
    }
    
    document.querySelectorAll('.cert-pdf-viewer').forEach(el => { 
        el.style.display = 'none'; 
        el.innerHTML = ''; 
    });
    
    viewer.style.display = 'block';
    viewer.innerHTML = `<iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true" width="100%" height="100%" style="border:none;"></iframe>`;
};

// Fermer la modale Email
window.closeModal = function() { 
    const m = document.getElementById("email-modal");
    if(m) m.style.display = "none"; 
};
