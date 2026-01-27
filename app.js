document.addEventListener("DOMContentLoaded", () => {
    
    // VÉRIFICATION : Est-ce que la config est chargée ?
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

    // --- 3. CERTIFICATIONS ---
    const certList = document.getElementById("cert-list");
    if(certList) {
        config.certifications.forEach(cert => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="cert-name">${cert.name}</span>
                <a href="${cert.url}" target="_blank" class="cert-btn">Voir ➜</a>
            `;
            certList.appendChild(li);
        });
    }

    // --- 4. COMPÉTENCES (Dropdown) ---
    const compList = document.getElementById("comp-list");
    if(compList && config.competences) {
        config.competences.forEach((comp, index) => {
            const li = document.createElement("li");
            li.className = "comp-card-container"; 
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
    }

    // --- 5. TYPEWRITER (Machine à écrire) ---
    const textElement = document.getElementById("typewriter-area");
    const textToType = config.profile.typewriterText;
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

    // --- 6. PROJETS & DOCUMENTS ---
    const grid = document.getElementById("project-grid");
    
    // Détection du chemin pour trouver le dossier "Documents"
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = `${window.location.origin}${path}Documents/`; 

    config.projects.forEach((project, index) => {
        const viewerId = `viewer_${index}`;
        const fullPdfUrl = baseUrl + project.path;
        
        const cardHTML = `
            <div class="project-card">
                <div class="card-header" onclick="togglePDF('${viewerId}', '${fullPdfUrl}')">
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

    // --- 7. MODAL EMAIL ---
    const emailTrigger = document.getElementById("email-trigger");
    if(emailTrigger) {
        emailTrigger.addEventListener("click", function(e) {
            e.preventDefault();
            document.getElementById("email-modal").style.display = "flex";
        });
    }

    // Fermeture des menus si on clique ailleurs
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.comp-dropdown-wrapper')) {
            document.querySelectorAll('.comp-dropdown-menu').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.comp-toggle').forEach(el => el.classList.remove('active'));
        }
    });
});

// --- FONCTIONS GLOBALES (C'est ici que ton fichier était coupé) ---

window.toggleComp = function(event, id) {
    event.stopPropagation(); 
    const menu = document.getElementById(id);
    const btn = event.currentTarget; // C'est ça qui manquait !
    
    // Ferme les autres menus ouverts
    document.querySelectorAll('.comp-dropdown-menu').forEach(el => {
        if(el.id !== id) el.style.display = 'none';
    });
    document.querySelectorAll('.comp-toggle').forEach(el => {
        if(el !== btn) el.classList.remove('active');
    });

    // Ouvre ou ferme le menu actuel
    if (menu.style.display === "block") {
        menu.style.display = "none";
        btn.classList.remove('active');
    } else {
        menu.style.display = "block";
        btn.classList.add('active');
    }
};

window.togglePDF = function(containerId, url) {
    const container = document.getElementById(containerId);
    const header = container.previousElementSibling;
    
    // Si c'est déjà ouvert, on ferme
    if (container.style.display === "block") {
        container.style.display = "none";
        container.innerHTML = "";
        header.classList.remove("active");
        return;
    }

    // On ferme les autres PDF ouverts pour éviter le bazar
    document.querySelectorAll('.pdf-container').forEach(el => {
        el.style.display = 'none';
        el.innerHTML = '';
    });
    document.querySelectorAll('.card-header').forEach(el => el.classList.remove('active'));

    // On crée l'iframe Google Docs
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

window.closeModal = function() {
    document.getElementById("email-modal").style.display = "none";
    const feedback = document.getElementById("copy-feedback");
    if(feedback) feedback.innerText = "";
};

window.onclick = function(event) {
    const modal = document.getElementById("email-modal");
    if (event.target == modal) closeModal();
};

window.copyEmail = function() {
    const emailText = document.getElementById("email-text").innerText;
    navigator.clipboard.writeText(emailText).then(() => {
        const feedback = document.getElementById("copy-feedback");
        if(feedback) {
            feedback.innerText = "Adresse copiée ! ✅";
            setTimeout(closeModal, 2000); // Ferme auto après 2 secondes
        }
    });
};
