document.addEventListener("DOMContentLoaded", () => {
    
    // VÉRIFICATION DE SÉCURITÉ
    if (typeof config === 'undefined') {
        console.error("ERREUR : config.js n'est pas chargé !");
        return;
    }

    // --- 1. PROFIL ---
    document.title = `root@portfolio:~# ${config.profile.name}`;
    const avatarEl = document.getElementById("profile-avatar");
    if(avatarEl) avatarEl.src = config.profile.avatar;
    const nameEl = document.getElementById("profile-name");
    if(nameEl) nameEl.innerHTML = `${config.profile.name}<span class="cursor">_</span>`;
    const statusEl = document.getElementById("profile-status");
    if(statusEl) statusEl.innerText = config.profile.status;
    const bioEl = document.getElementById("profile-bio");
    if(bioEl) bioEl.innerText = config.profile.bio;
    const githubLink = document.getElementById("link-github");
    if(githubLink) githubLink.href = config.social.github;
    const linkedinLink = document.getElementById("link-linkedin");
    if(linkedinLink) linkedinLink.href = config.social.linkedin;
    const emailText = document.getElementById("email-text");
    if(emailText) emailText.innerText = config.profile.email;
    const footerEl = document.getElementById("footer-copy");
    if(footerEl) footerEl.innerHTML = `&copy; ${new Date().getFullYear()} ${config.profile.name} - GitHub Pages`;

    // --- 2. HEADER SKILLS ---
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
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = `${window.location.origin}${path}Documents/`; 
    const PROJECT_LIMIT = 3;

    if (grid && config.projects) {
        config.projects.forEach((project, index) => {
            const viewerId = `viewer_${index}`;
            const fullPdfUrl = baseUrl + project.path;
            
            const cardDiv = document.createElement("div");
            cardDiv.className = "project-card";
            if (index >= PROJECT_LIMIT) cardDiv.classList.add("hidden-item");

            cardDiv.innerHTML = `
                <div class="card-header" onclick="togglePDF('${viewerId}', '${fullPdfUrl}')">
                    <div class="icon">${project.icon}</div>
                    <div class="meta">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                    </div>
                    <div class="arrow">▼</div>
                </div>
                <div id="${viewerId}" class="pdf-container"></div>
            `;
            grid.appendChild(cardDiv);
        });

        if (config.projects.length > PROJECT_LIMIT) {
            createToggleBtn(grid, PROJECT_LIMIT, "Voir tous les projets");
        }
    }

    // --- 4. EXPÉRIENCES (Limite : 3) ---
    const expList = document.getElementById("exp-list");
    const EXP_LIMIT = 3;
    if(expList && config.experiences) {
        config.experiences.forEach((exp, index) => {
            const li = document.createElement("li");
            li.className = "timeline-item";
            if (index >= EXP_LIMIT) li.classList.add("hidden-item");

            li.innerHTML = `
                <span class="timeline-date">${exp.date}</span>
                <h4 class="timeline-title">${exp.role} <span class="timeline-company">@ ${exp.company}</span></h4>
                <p class="timeline-desc">${exp.description}</p>
            `;
            expList.appendChild(li);
        });

        if (config.experiences.length > EXP_LIMIT) {
            createToggleBtn(expList, EXP_LIMIT, "Afficher l'historique complet");
        }
    }

    // --- 5. COMPÉTENCES (Limite : 4) ---
    const compList = document.getElementById("comp-list");
    const COMP_LIMIT = 4;
    if(compList && config.competences) {
        config.competences.forEach((comp, index) => {
            const li = document.createElement("li");
            li.className = "comp-card-container"; 
            if (index >= COMP_LIMIT) li.classList.add("hidden-item");

            const detailsHTML = comp.details.map(d => `<li>• ${d}</li>`).join('');
            li.innerHTML = `
                <span class="cert-name">${comp.name}</span>
                <div class="comp-dropdown-wrapper">
                    <button class="cert-btn comp-toggle" onclick="toggleComp(event, 'comp-drop-${index}')">▼</button>
                    <ul id="comp-drop-${index}" class="comp-dropdown-menu">
                        ${detailsHTML}
                    </ul>
                </div>
            `;
            compList.appendChild(li);
        });

        if (config.competences.length > COMP_LIMIT) {
            createToggleBtn(compList, COMP_LIMIT, "Voir toutes les compétences");
        }
    }

    // --- 6. CERTIFICATIONS (Limite : 4) ---
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

    // --- 7. TYPEWRITER ---
    const textElement = document.getElementById("typewriter-area");
    if(textElement && config.profile.typewriterText) {
        const textToType = config.profile.typewriterText;
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

    // --- 8. DETECTION OS CLIENT ---
    const osElement = document.getElementById("client-os");
    if (osElement) {
        let os = "Unknown OS";
        const ua = window.navigator.userAgent;
        if (ua.indexOf("Win") !== -1) os = "Windows";
        else if (ua.indexOf("Mac") !== -1) os = "macOS";
        else if (ua.indexOf("Linux") !== -1) os = "Linux";
        else if (ua.indexOf("Android") !== -1) os = "Android";
        else if (ua.indexOf("iPhone") !== -1 || ua.indexOf("iPad") !== -1) os = "iOS";
        osElement.innerText = os;
    }

    // --- EVENTS ---
    const emailTrigger = document.getElementById("email-trigger");
    if(emailTrigger) {
        emailTrigger.addEventListener("click", function(e) {
            e.preventDefault();
            document.getElementById("email-modal").style.display = "flex";
        });
    }

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.comp-dropdown-wrapper')) {
            document.querySelectorAll('.comp-dropdown-menu').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.comp-toggle').forEach(el => el.classList.remove('active'));
        }
    });
});

// --- FONCTIONS UTILITAIRES ---

// Nouvelle fonction "Toggle" (Ouvrir / Fermer)
function createToggleBtn(container, limit, textMore) {
    const btnContainer = document.createElement("div");
    btnContainer.className = "load-more-container";
    
    const btn = document.createElement("button");
    btn.className = "load-more-btn";
    btn.innerHTML = `[+] ${textMore}`;
    
    let isExpanded = false;

    btn.onclick = function() {
        isExpanded = !isExpanded; // On inverse l'état
        const items = container.children;

        // On parcourt tous les enfants
        for (let i = 0; i < items.length; i++) {
            // Si c'est un item qui dépasse la limite
            if (i >= limit) {
                if (isExpanded) {
                    // On montre
                    items[i].classList.remove("hidden-item");
                    // Petite animation
                    items[i].style.opacity = 0;
                    setTimeout(() => items[i].style.opacity = 1, 50);
                } else {
                    // On cache
                    items[i].classList.add("hidden-item");
                }
            }
        }

        // On change le texte du bouton
        btn.innerHTML = isExpanded ? `[-] Voir moins` : `[+] ${textMore}`;
    };

    btnContainer.appendChild(btn);
    container.parentNode.insertBefore(btnContainer, container.nextSibling);
}

window.toggleComp = function(event, id) {
    event.stopPropagation(); 
    const menu = document.getElementById(id);
    const btn = event.currentTarget;
    document.querySelectorAll('.comp-dropdown-menu').forEach(el => { if(el.id !== id) el.style.display = 'none'; });
    document.querySelectorAll('.comp-toggle').forEach(el => { if(el !== btn) el.classList.remove('active'); });
    if (menu.style.display === "block") { menu.style.display = "none"; btn.classList.remove('active'); } 
    else { menu.style.display = "block"; btn.classList.add('active'); }
};

window.togglePDF = function(containerId, url) {
    const container = document.getElementById(containerId);
    const header = container.previousElementSibling;
    if (container.style.display === "block") {
        container.style.display = "none"; container.innerHTML = ""; header.classList.remove("active");
        return;
    }
    document.querySelectorAll('.pdf-container').forEach(el => { el.style.display = 'none'; el.innerHTML = ''; });
    document.querySelectorAll('.card-header').forEach(el => el.classList.remove('active'));
    const viewerUrl = "https://docs.google.com/viewer?url=" + encodeURIComponent(url) + "&embedded=true";
    container.innerHTML = `<iframe src="${viewerUrl}" width="100%" height="600px" style="border:none;"></iframe>`;
    container.style.display = "block";
    header.classList.add("active");
};

window.closeModal = function() { document.getElementById("email-modal").style.display = "none"; };
window.onclick = function(event) { if (event.target == document.getElementById("email-modal")) window.closeModal(); };
window.copyEmail = function() {
    navigator.clipboard.writeText(document.getElementById("email-text").innerText).then(() => {
        const fb = document.getElementById("copy-feedback");
        if(fb) { fb.innerText = "Adresse copiée ! ✅"; setTimeout(window.closeModal, 2000); }
    });
};
