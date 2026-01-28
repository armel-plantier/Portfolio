document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. FAVICON ---
    const faviconLink = document.getElementById("favicon-link");
    if(config.profile.favicon && faviconLink) {
        faviconLink.href = config.profile.favicon;
    }

    // --- 2. HEADER & PROFIL ---
    document.getElementById("profile-avatar").src = config.profile.avatar;
    document.getElementById("profile-name").textContent = config.profile.name;
    document.getElementById("profile-status").textContent = config.profile.status;
    
    // NAVIGATION
    const navList = document.getElementById("nav-list");
    config.navigation.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${item.link}">${item.title}</a>`;
        navList.appendChild(li);
    });

    // --- 3. HERO SECTION ---
    const typewriterElement = document.getElementById("typewriter-area");
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

    document.getElementById("profile-bio").textContent = config.profile.bio;
    
    // LIENS SOCIAUX
    document.getElementById("link-github").href = config.social.github;
    document.getElementById("link-linkedin").href = config.social.linkedin;

    // --- 4. PROJETS (AVEC GOOGLE DOCS VIEWER) ---
    const projectGrid = document.getElementById("project-grid");
    config.projects.forEach((proj, index) => {
        const card = document.createElement("div");
        card.className = "project-card";

        // On utilise l'API Google Docs Viewer pour afficher le PDF
        // Note : Le PDF doit être accessible publiquement sur internet pour que ça marche
        const googleViewerUrl = `https://docs.google.com/gview?url=${proj.path}&embedded=true`;

        card.innerHTML = `
            <div class="card-header" onclick="togglePDF(${index})">
                <div class="icon">${proj.icon}</div>
                <div class="meta">
                    <h4>${proj.title}</h4>
                    <p>${proj.description}</p>
                </div>
            </div>
            <div id="pdf-${index}" class="pdf-container">
                <iframe src="${googleViewerUrl}" width="100%" height="100%" style="border:none;"></iframe>
            </div>
        `;
        projectGrid.appendChild(card);
    });

    // --- 5. PARCOURS (TIMELINE) ---
    const expList = document.getElementById("exp-list");
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

    // --- 6. COMPÉTENCES (ACCORDÉON) ---
    const compList = document.getElementById("comp-list");
    if(compList && config.competences) {
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

    // --- 7. CERTIFICATIONS ---
    const certList = document.getElementById("cert-list");
    if(certList && config.certifications) {
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

    // --- 8. FOOTER ---
    document.getElementById("footer-copy").innerHTML = `&copy; ${new Date().getFullYear()} ${config.profile.name} - Tous droits réservés.`;

    // --- 9. MODALE EMAIL + COPIE AUTO ---
    const modal = document.getElementById("email-modal");
    const emailBox = document.getElementById("email-box-action");
    const emailText = document.getElementById("email-text");

    // Ouvrir la modale
    document.getElementById("email-trigger").addEventListener("click", (e) => {
        e.preventDefault();
        emailText.textContent = config.profile.email;
        emailText.style.color = "var(--primary)"; // Reset couleur normale
        modal.style.display = "flex";
    });

    // Fermer la modale
    window.closeModal = () => {
        modal.style.display = "none";
    };

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // COPIER AU CLIC + FERMETURE AUTO
    emailBox.addEventListener("click", () => {
        const email = config.profile.email;
        navigator.clipboard.writeText(email).then(() => {
            // Feedback visuel "Copié"
            emailText.textContent = "Copié avec succès ! ✅";
            emailText.style.color = "#10b981"; // Vert
            
            // Fermer automatiquement après 1.2 seconde
            setTimeout(() => {
                closeModal();
            }, 1200);
        }).catch(err => {
            console.error('Erreur copie', err);
        });
    });

    // --- 10. THÈME SOMBRE/CLAIR ---
    const themeBtn = document.getElementById("theme-toggle");
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const isLight = document.body.classList.contains("light-mode");
        themeBtn.textContent = isLight ? "🌙" : "☀️";
    });
});

// FONCTIONS GLOBALES
window.togglePDF = (index) => {
    const pdfDiv = document.getElementById(`pdf-${index}`);
    // Ferme tous les autres avant d'ouvrir celui-ci
    document.querySelectorAll('.pdf-container').forEach(el => {
        if(el !== pdfDiv) el.style.display = 'none';
    });

    if (pdfDiv.style.display === "block") {
        pdfDiv.style.display = "none";
    } else {
        pdfDiv.style.display = "block";
    }
};

window.toggleComp = (index) => {
    const details = document.getElementById(`comp-details-${index}`);
    const isClosed = details.style.display === '' || details.style.display === 'none';
    details.style.display = isClosed ? 'block' : 'none';

    const parentItem = document.getElementById(`comp-item-${index}`);
    if (isClosed) {
        parentItem.classList.add('open');
    } else {
        parentItem.classList.remove('open');
    }
};
