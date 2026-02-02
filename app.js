document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. INITIALISATION & NAVIGATION
    // ==========================================
    const link = document.createElement('link');
    link.rel = 'icon'; link.href = config.profile.favicon;
    document.head.appendChild(link);

    const avatarImg = document.getElementById("avatar-img");
    if(avatarImg) avatarImg.src = config.profile.avatar;
    
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
    // Lancement sécurisé
    if (typeTarget) typeWriter();

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
    // 3. SECTIONS DYNAMIQUES (RÉPARÉES POUR CSP)
    // ==========================================

    // FONCTIONS UTILITAIRES (Définies avant utilisation)
    function togglePdf(headerElement, pdfFile) {
        const container = headerElement.nextElementSibling; // Le pdf-container juste après le header
        if (window.getComputedStyle(container).display === "block") {
            container.style.display = "none"; 
            container.innerHTML = ""; 
            return;
        }
        // Fermer les autres
        document.querySelectorAll(".pdf-container").forEach(el => { el.style.display = "none"; el.innerHTML = ""; });
        // Ouvrir celui-ci
        container.style.display = "block";
        container.innerHTML = `<iframe src="assets/pdf/${pdfFile}" width="100%" height="500px"></iframe>`;
    }

    function toggleComp(index, btnElement) {
        const list = document.getElementById(`comp-list-${index}`);
        if (window.getComputedStyle(list).display === "none") { 
            list.style.display = "block"; 
            btnElement.classList.add("active"); 
        } else { 
            list.style.display = "none"; 
            btnElement.classList.remove("active"); 
        }
    }

    function toggleCertPdf(containerId, pdfFile) {
        const container = document.getElementById(containerId);
        if (window.getComputedStyle(container).display === "block") { 
            container.style.display = "none"; 
            container.innerHTML = ""; 
            return; 
        }
        document.querySelectorAll(".cert-pdf-viewer").forEach(el => { el.style.display = "none"; el.innerHTML = ""; });
        container.style.display = "block";
        container.innerHTML = `<iframe src="assets/pdf/${pdfFile}"></iframe>`;
    }

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

            // Structure HTML sans onclick
            card.innerHTML = `
                ${badgeHtml}
                <div class="card-header">
                    <div class="icon">${proj.icon}</div>
                    <div class="meta">
                        <h4>${proj.title}</h4>
                        <p>${proj.description}</p>
                    </div>
                </div>
                <div class="pdf-container" id="pdf-${index}"></div>
            `;

            // Ajout de l'EventListener sécurisé
            const header = card.querySelector(".card-header");
            header.addEventListener("click", () => togglePdf(header, proj.path));

            projectsGrid.appendChild(card);
        });

        if (loadMoreBtn) {
            loadMoreBtn.style.display = (config.projects.length <= projectsVisible) ? "none" : "flex";
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

        // HTML sans onclick
        div.innerHTML = `
            <div class="comp-header">
                <span style="font-size:1.5rem;">${comp.icon}</span>
                <span>${comp.name}</span>
                <button class="comp-toggle" id="toggle-btn-${index}">▼</button>
            </div>
            <ul class="comp-dropdown-menu" id="comp-list-${index}" style="display:none;">
                ${detailsHtml}
            </ul>
        `;

        // EventListener sécurisé
        const header = div.querySelector(".comp-header");
        const btn = div.querySelector(`#toggle-btn-${index}`);
        header.addEventListener("click", () => toggleComp(index, btn));

        compGrid.appendChild(div);
    });

    // --- CERTIFICATIONS ---
    const certGrid = document.querySelector(".cert-list");
    config.certifications.forEach((cert, index) => {
        const li = document.createElement("li");
        li.className = "cert-card-container";

        // Création des éléments boutons dynamiquement pour attacher les événements
        const actionsDiv = document.createElement("div");
        actionsDiv.className = "cert-actions";

        if(cert.url) {
            const linkBtn = document.createElement("a");
            linkBtn.href = cert.url;
            linkBtn.target = "_blank";
            linkBtn.rel = "noopener noreferrer";
            linkBtn.className = "cert-btn link-btn";
            linkBtn.title = "Voir le site officiel";
            linkBtn.textContent = "🔗";
            actionsDiv.appendChild(linkBtn);
        }

        if(cert.pdf && cert.pdf !== "") {
            const pdfBtn = document.createElement("button");
            pdfBtn.className = "cert-btn pdf-btn";
            pdfBtn.title = "Voir le certificat";
            pdfBtn.textContent = "📄";
            pdfBtn.addEventListener("click", () => toggleCertPdf(`cert-pdf-${index}`, cert.pdf));
            actionsDiv.appendChild(pdfBtn);
        }

        const contentDiv = document.createElement("div");
        contentDiv.className = "cert-header-row";
        contentDiv.innerHTML = `
            <div class="cert-icon-box">📜</div>
            <div class="cert-info">
                <span class="cert-name">${cert.name}</span>
                <span class="cert-issuer">${cert.issuer}</span>
            </div>
        `;
        contentDiv.appendChild(actionsDiv); // On ajoute nos boutons sécurisés

        li.appendChild(contentDiv);
        
        const pdfViewer = document.createElement("div");
        pdfViewer.id = `cert-pdf-${index}`;
        pdfViewer.className = "cert-pdf-viewer";
        li.appendChild(pdfViewer);

        certGrid.appendChild(li);
    });

    // ==========================================
    // 5. THEME & CONTACT
    // ==========================================
    const themeBtn = document.getElementById("theme-toggle");
    const themeIcon = themeBtn.querySelector("span");
    
    // Initial Theme Check
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
    
    const captchaStep = document.getElementById("captcha-step");
    const emailArea = document.getElementById("email-result-area");
    const captchaContainer = document.getElementById("captcha-container");
    const emailSpan = document.getElementById("email-text");

    function openModal() {
        if (!contactModal) return;
        captchaStep.style.display = "block";
        emailArea.style.display = "none";
        emailSpan.innerText = "";
        captchaContainer.innerHTML = ""; 

        contactModal.style.display = "flex";
        setTimeout(() => { contactModal.style.opacity = "1"; }, 10);

        if (window.turnstile) {
            turnstile.render('#captcha-container', {
                sitekey: config.profile.turnstileSiteKey,
                theme: document.body.classList.contains('light-mode') ? 'light' : 'dark',
                callback: function(token) {
                    console.log('Captcha validé !');
                    captchaStep.style.display = "none";
                    emailSpan.innerText = atob(config.profile.emailEncoded);
                    emailArea.style.display = "block";
                },
            });
        } else {
            emailSpan.innerText = "Erreur chargement Captcha.";
            emailArea.style.display = "block";
        }
    }

    function closeModal() {
        if (!contactModal) return;
        contactModal.style.opacity = "0";
        setTimeout(() => { 
            contactModal.style.display = "none"; 
            captchaContainer.innerHTML = "";
        }, 300);
    }

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
