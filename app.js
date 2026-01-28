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
    
    // LIENS SOCIAUX (Mise à jour des href uniquement)
    document.getElementById("link-github").href = config.social.github;
    document.getElementById("link-linkedin").href = config.social.linkedin;

    // SKILLS TAGS
    const skillsSection = document.getElementById("skills-section");
    config.skills.forEach(skill => {
        const span = document.createElement("span");
        span.className = "skill-tag";
        span.textContent = skill;
        skillsSection.appendChild(span);
    });

    // --- 4. PROJETS (GRID) ---
    const projectGrid = document.getElementById("project-grid");
    config.projects.forEach((proj, index) => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
            <div class="card-header" onclick="togglePDF(${index})">
                <div class="icon">${proj.icon}</div>
                <div class="meta">
                    <h4>${proj.title}</h4>
                    <p>${proj.description}</p>
                </div>
            </div>
            <div id="pdf-${index}" class="pdf-container">
                <iframe src="${proj.path}" width="100%" height="100%" style="border:none;"></iframe>
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

    // --- 6. COMPÉTENCES (ACCORDÉON ANIMÉ) ---
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

    // --- 7. CERTIFICATIONS (BOUTONS) ---
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

    // --- 9. MODALE EMAIL ---
    const modal = document.getElementById("email-modal");
    document.getElementById("email-trigger").addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("email-text").textContent = config.profile.email;
        modal.style.display = "flex";
    });

    window.closeModal = () => {
        modal.style.display = "none";
    };

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // --- 10. THÈME SOMBRE/CLAIR ---
    const themeBtn = document.getElementById("theme-toggle");
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const isLight = document.body.classList.contains("light-mode");
        themeBtn.textContent = isLight ? "🌙" : "☀️";
    });
});

// FONCTIONS GLOBALES (Accessibles via onclick HTML)
window.togglePDF = (index) => {
    const pdfDiv = document.getElementById(`pdf-${index}`);
    if (pdfDiv.style.display === "block") {
        pdfDiv.style.display = "none";
    } else {
        document.querySelectorAll('.pdf-container').forEach(el => el.style.display = 'none');
        pdfDiv.style.display = "block";
    }
};

window.toggleComp = (index) => {
    // 1. Gérer l'affichage
    const details = document.getElementById(`comp-details-${index}`);
    const isClosed = details.style.display === '' || details.style.display === 'none';
    details.style.display = isClosed ? 'block' : 'none';

    // 2. Gérer l'animation (Classe .open)
    const parentItem = document.getElementById(`comp-item-${index}`);
    if (isClosed) {
        parentItem.classList.add('open');
    } else {
        parentItem.classList.remove('open');
    }
};
