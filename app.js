document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. INITIALISATION & NAVIGATION
    // ==========================================
    const link = document.createElement('link');
    link.rel = 'icon'; link.href = config.profile.favicon;
    document.head.appendChild(link);

    document.getElementById("avatar-img").src = config.profile.avatar;
    document.getElementById("profile-name").textContent = config.profile.name;
    document.getElementById("profile-status").textContent = config.profile.status;

    const navList = document.getElementById("nav-list");
    config.navigation.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${item.link}">${item.title}</a>`;
        navList.appendChild(li);
    });

    window.addEventListener("scroll", () => {
        const header = document.querySelector(".app-header");
        if (window.scrollY > 50) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
    });

    const capsule = document.querySelector(".nav-capsule");
    const menuIcon = document.querySelector(".menu-icon");
    if (capsule && menuIcon) {
        menuIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            document.querySelector(".app-header").classList.toggle("menu-open");
        });
        document.addEventListener("click", (e) => {
            if (!capsule.contains(e.target)) {
                document.querySelector(".app-header").classList.remove("menu-open");
            }
        });
    }

    // ==========================================
    // 2. HERO SECTION
    // ==========================================
    const typeText = config.profile.typewriterText;
    const typeTarget = document.getElementById("typewriter-text");
    let typeIndex = 0;
    
    function typeWriter() {
        if (typeIndex < typeText.length) {
            typeTarget.textContent += typeText.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 50);
        }
    }
    typeWriter();

    document.getElementById("bio-text").textContent = config.profile.bio;
    document.getElementById("github-link").href = config.social.github;
    document.getElementById("linkedin-link").href = config.social.linkedin;

    const skillsContainer = document.getElementById("skills-container");
    config.skills.forEach(skill => {
        const span = document.createElement("span");
        span.className = "skill-tag";
        span.textContent = skill;
        skillsContainer.appendChild(span);
    });

    // ==========================================
    // 3. SECTIONS DYNAMIQUES
    // ==========================================

    // --- PROJETS ---
    const projectsGrid = document.getElementById("projects-grid");
    const loadMoreBtn = document.getElementById("load-more-projects");
    let projectsVisible = 3;

    function renderProjects() {
        projectsGrid.innerHTML = "";
        config.projects.forEach((proj, index) => {
            const card = document.createElement("div");
            card.className = `project-card ${index >= projectsVisible ? 'hidden-item' : ''}`;
            const badgeHtml = proj.isNew ? `<span class="new-badge">Nouveau</span>` : '';

            card.innerHTML = `
                ${badgeHtml}
                <div class="card-header" onclick="togglePdf(this, '${proj.path}')">
                    <div class="icon">${proj.icon}</div>
                    <div class="meta">
                        <h4>${proj.title}</h4>
                        <p>${proj.description}</p>
                    </div>
                </div>
                <div class="pdf-container" id="pdf-${index}"></div>
            `;
            projectsGrid.appendChild(card);
        });

        if (config.projects.length <= projectsVisible) {
            if(loadMoreBtn) loadMoreBtn.style.display = "none";
        } else {
            if(loadMoreBtn) loadMoreBtn.style.display = "flex";
        }
    }
    renderProjects();

    if(loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            projectsVisible += 3;
            renderProjects();
        });
    }

    // --- EXPÉRIENCES ---
    const timelineList = document.querySelector(".timeline-list");
    config.experiences.forEach(exp => {
        const li = document.createElement("li");
        li.className = "timeline-item";
        li.innerHTML = `
            <span class="timeline-date">${exp.date}</span>
            <h4 class="timeline-title">${exp.role} <span style="color:var(--muted); font-weight:400;">chez ${exp.company}</span></h4>
            <p class="timeline-desc">${exp.description}</p>
        `;
        timelineList.appendChild(li);
    });

    // --- COMPÉTENCES ---
    const compGrid = document.getElementById("competences-grid");
    config.competences.forEach((comp, index) => {
        const div = document.createElement("div");
        div.className = "comp-card-container";
        let detailsHtml = "";
        comp.details.forEach(det => detailsHtml += `<li>${det}</li>`);

        div.innerHTML = `
            <div class="comp-header" onclick="toggleComp(${index})">
                <span style="font-size:1.5rem;">${comp.icon}</span>
                <span>${comp.name}</span>
                <button class="comp-toggle" id="toggle-btn-${index}">▼</button>
            </div>
            <ul class="comp-dropdown-menu" id="comp-list-${index}" style="display:none;">
                ${detailsHtml}
            </ul>
        `;
        compGrid.appendChild(div);
    });

    // --- CERTIFICATIONS ---
    const certGrid = document.querySelector(".cert-list");
    config.certifications.forEach((cert, index) => {
        const li = document.createElement("li");
        li.className = "cert-card-container";

        let actionsHtml = "";
        if(cert.url) actionsHtml += `<a href="${cert.url}" target="_blank" class="cert-btn link-btn" title="Voir le site officiel">🔗</a>`;
        if(cert.pdf && cert.pdf !== "") actionsHtml += `<button onclick="toggleCertPdf('cert-pdf-${index}', '${cert.pdf}')" class="cert-btn pdf-btn" title="Voir le certificat">📄</button>`;

        li.innerHTML = `
            <div class="cert-header-row">
                <div class="cert-icon-box">📜</div>
                <div class="cert-info">
                    <span class="cert-name">${cert.name}</span>
                    <span class="cert-issuer">${cert.issuer}</span>
                </div>
                <div class="cert-actions">
                    ${actionsHtml}
                </div>
            </div>
            <div id="cert-pdf-${index}" class="cert-pdf-viewer"></div>
        `;
        certGrid.appendChild(li);
    });


    // ==========================================
    // 4. GESTION MODALES & PDF
    // ==========================================
    window.togglePdf = (headerElement, pdfFile) => {
        const container = headerElement.nextElementSibling;
        if (container.style.display === "block") {
            container.style.display = "none"; container.innerHTML = ""; return;
        }
        document.querySelectorAll(".pdf-container").forEach(el => { el.style.display = "none"; el.innerHTML = ""; });
        container.style.display = "block";
        // CORRECTION ICI : Chemin vers le dossier Documents
        container.innerHTML = `<iframe src="Documents/${pdfFile}" width="100%" height="500px"></iframe>`;
    };

    window.toggleComp = (index) => {
        const list = document.getElementById(`comp-list-${index}`);
        const btn = document.getElementById(`toggle-btn-${index}`);
        if (list.style.display === "none") { list.style.display = "block"; btn.classList.add("active"); } 
        else { list.style.display = "none"; btn.classList.remove("active"); }
    };

    window.toggleCertPdf = (containerId, pdfFile) => {
        const container = document.getElementById(containerId);
        if (container.style.display === "block") { container.style.display = "none"; container.innerHTML = ""; return; }
        document.querySelectorAll(".cert-pdf-viewer").forEach(el => { el.style.display = "none"; el.innerHTML = ""; });
        container.style.display = "block";
        // CORRECTION ICI EGALEMENT : Chemin vers le dossier Documents
        container.innerHTML = `<iframe src="Documents/${pdfFile}" width="100%" height="500px"></iframe>`;
    };

    // ==========================================
    // 5. THEME & CONTACT AVEC CAPTCHA
    // ==========================================
    const themeBtn = document.getElementById("theme-toggle");
    const themeIcon = themeBtn.querySelector("span");
    if(localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        themeIcon.textContent = "☀️";
    }
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const isLight = document.body.classList.contains("light-mode");
        themeIcon.textContent = isLight ? "☀️" : "🌙";
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });

    // --- MODALE CONTACT ---
    const contactBtn = document.getElementById("contact-btn");
    const contactModal = document.getElementById("contact-modal");
    const closeModalBtn = document.querySelector(".close-btn");
    
    // Elements internes
    const captchaStep = document.getElementById("captcha-step");
    const emailArea = document.getElementById("email-result-area");
    const captchaContainer = document.getElementById("captcha-container");
    const emailSpan = document.getElementById("email-text");

    function openModal() {
        if (!contactModal) return;

        // Reset de l'état (On cache l'email, on montre le captcha)
        captchaStep.style.display = "block";
        emailArea.style.display = "none";
        emailSpan.innerText = "";
        captchaContainer.innerHTML = ""; // Reset du widget précédent

        // Affichage Modale
        contactModal.style.display = "flex";
        setTimeout(() => { contactModal.style.opacity = "1"; }, 10);

        // Initialisation du Captcha Turnstile
        if (window.turnstile) {
            turnstile.render('#captcha-container', {
                sitekey: config.profile.turnstileSiteKey, // Utilisation de la clé dans Config.js
                theme: document.body.classList.contains('light-mode') ? 'light' : 'dark',
                callback: function(token) {
                    // SUCCÈS : L'utilisateur est humain
                    console.log('Captcha validé !');
                    
                    // 1. Masquer Captcha
                    captchaStep.style.display = "none";
                    
                    // 2. Décoder et afficher l'email
                    emailSpan.innerText = atob(config.profile.emailEncoded);
                    emailArea.style.display = "block";
                },
            });
        } else {
            // Fallback si script pas chargé (rare)
            emailSpan.innerText = "Erreur chargement Captcha.";
            emailArea.style.display = "block";
        }
    }

    window.closeModal = () => {
        if (!contactModal) return;
        contactModal.style.opacity = "0";
        setTimeout(() => { 
            contactModal.style.display = "none"; 
            // Nettoyage
            captchaContainer.innerHTML = "";
        }, 300);
    };

    if (contactBtn) contactBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
    });

    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => { if (e.target === contactModal) closeModal(); });

    // --- BOUTON COPIER ---
    const copyBtn = document.getElementById("copy-btn");
    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            const textToCopy = emailSpan.innerText;
            const originalHtml = copyBtn.innerHTML; 
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyBtn.style.background = "#10b981"; 
                copyBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Copié !</span>`;
                setTimeout(() => {
                    closeModal();
                    setTimeout(() => { copyBtn.style.background = ""; copyBtn.innerHTML = originalHtml; }, 300);
                }, 1000); 
            });
        });
    }
});
