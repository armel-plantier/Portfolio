document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. CONFIGURATION GÉNÉRALE ---
    // Favicon
    const faviconLink = document.getElementById("favicon-link");
    if(config.profile.favicon && faviconLink) faviconLink.href = config.profile.favicon;

    // Header & Identité
    const avatar = document.getElementById("profile-avatar");
    if(avatar) avatar.src = config.profile.avatar;

    const name = document.getElementById("profile-name");
    if(name) name.textContent = config.profile.name;

    const status = document.getElementById("profile-status");
    if(status) status.textContent = config.profile.status;

    const bio = document.getElementById("profile-bio");
    if(bio) bio.textContent = config.profile.bio;

    // Footer
    document.getElementById("footer-copy").innerHTML = `&copy; ${new Date().getFullYear()} ${config.profile.name} - Tous droits réservés.`;

    // --- 2. NAVIGATION DYNAMIQUE ---
    const navList = document.getElementById("nav-list");
    if (navList && config.navigation) {
        config.navigation.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${item.link}">${item.title}</a>`;
            navList.appendChild(li);
        });
    }

    // --- 3. EFFET MACHINE À ÉCRIRE (Hero) ---
    const typewriterElement = document.getElementById("typewriter-area");
    if (typewriterElement && config.profile.typewriterText) {
        const textToType = config.profile.typewriterText;
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < textToType.length) {
                typewriterElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        }
        typeWriter();
    }

    // --- 4. LIENS SOCIAUX ---
    if(config.social) {
        const gh = document.getElementById("link-github");
        if(gh) gh.href = config.social.github;
        
        const li = document.getElementById("link-linkedin");
        if(li) li.href = config.social.linkedin;
    }

    // --- 5. PROJETS & PDF ---
    const projectGrid = document.getElementById("project-grid");
    if (projectGrid && config.projects) {
        config.projects.forEach((proj, index) => {
            const card = document.createElement("div");
            card.className = "project-card";

            // --- C'EST ICI QUE CA SE PASSE ---
            // On prend le dossier "Documents" + le nom du fichier défini dans config.js
            const pdfPath = `Documents/${proj.path}`;

            card.innerHTML = `
                <div class="card-header" onclick="togglePDF(${index})">
                    <div class="icon">${proj.icon}</div>
                    <div class="meta">
                        <h4>${proj.title}</h4>
                        <p>${proj.description}</p>
                    </div>
                </div>
                <div id="pdf-${index}" class="pdf-container" style="display:none;">
                    <iframe src="${pdfPath}" width="100%" height="100%" style="border:none;"></iframe>
                </div>
            `;
            projectGrid.appendChild(card);
        });
    }

    // --- 6. PARCOURS (TIMELINE) ---
    const expList = document.getElementById("exp-list");
    if (expList && config.experiences) {
        config.experiences.forEach(exp => {
            const li = document.createElement("li");
            li.className = "timeline-item";
            li.innerHTML = `
                <span class="timeline-date">${exp.date}</span>
                <h4 class="timeline-title">${exp.role} <span style="color:var(--muted)">@ ${exp.company}</span></h4>
                <p class="timeline-desc">${exp.description}</p>
            `;
            expList.appendChild(li);
        });
    }

    // --- 7. COMPÉTENCES (ACCORDÉON) ---
    const compList = document.getElementById("comp-list");
    if (compList && config.competences) {
        config.competences.forEach((comp, i) => {
            const li = document.createElement("li");
            li.className = "comp-item"; 
            li.id = `comp-item-${i}`;
            
            const detailsHTML = comp.details.map(d => `<li>${d}</li>`).join("");

            li.innerHTML = `
                <div class="comp-header" onclick="toggleComp(${i})">
                    <span class="comp-title">${comp.name}</span>
                    <span class="chevron">▼</span>
                </div>
                <ul id="comp-details-${i}" class="comp-dropdown">
                    ${detailsHTML}
                </ul>
            `;
            compList.appendChild(li);
        });
    }

    // --- 8. CERTIFICATIONS ---
    const certList = document.getElementById("cert-list");
    if (certList && config.certifications) {
        config.certifications.forEach(cert => {
            const li = document.createElement("li");
            li.className = "cert-item";
            li.innerHTML = `
                <span class="cert-name">${cert.name}</span>
                <a href="${cert.url}" target="_blank" class="cert-btn">
                    Vérifier
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            `;
            certList.appendChild(li);
        });
    }

    // --- 9. MODALE EMAIL + COPIE AUTO ---
    const modal = document.getElementById("email-modal");
    const emailBox = document.getElementById("email-box-action");
    const emailText = document.getElementById("email-text");

    // Ouvrir
    const emailTrigger = document.getElementById("email-trigger");
    if(emailTrigger) {
        emailTrigger.addEventListener("click", (e) => {
            e.preventDefault();
            if(emailText) {
                emailText.textContent = config.profile.email;
                emailText.style.color = "var(--primary)";
            }
            if(modal) modal.style.display = "flex";
        });
    }

    // Fermer
    window.closeModal = () => {
        if(modal) modal.style.display = "none";
    };

    if(modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Action Copier
    if(emailBox) {
        emailBox.addEventListener("click", () => {
            const email = config.profile.email;
            navigator.clipboard.writeText(email).then(() => {
                if(emailText) {
                    emailText.textContent = "Copié avec succès ! ✅";
                    emailText.style.color = "#10b981"; // Vert
                }
                // Fermeture auto après 1.2s
                setTimeout(() => {
                    closeModal();
                }, 1200);
            }).catch(err => console.error("Erreur copie", err));
        });
    }

    // --- 10. THÈME DARK/LIGHT ---
    const themeBtn = document.getElementById("theme-toggle");
    if(themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            const isLight = document.body.classList.contains("light-mode");
            themeBtn.textContent = isLight ? "🌙" : "☀️";
        });
    }
});

// --- FONCTIONS GLOBALES ---

window.togglePDF = (index) => {
    const pdfDiv = document.getElementById(`pdf-${index}`);
    if(!pdfDiv) return;

    // Ferme tous les autres PDF
    document.querySelectorAll('.pdf-container').forEach(el => {
        if(el !== pdfDiv) el.style.display = 'none';
    });

    // Bascule celui cliqué
    if (pdfDiv.style.display === "block") {
        pdfDiv.style.display = "none";
    } else {
        pdfDiv.style.display = "block";
    }
};

window.toggleComp = (index) => {
    const details = document.getElementById(`comp-details-${index}`);
    if(!details) return;

    const isClosed = (details.style.display === '' || details.style.display === 'none');
    details.style.display = isClosed ? 'block' : 'none';

    const parentItem = document.getElementById(`comp-item-${index}`);
    if(parentItem) {
        if (isClosed) parentItem.classList.add('open');
        else parentItem.classList.remove('open');
    }
};
