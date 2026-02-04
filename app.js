document.addEventListener("DOMContentLoaded", () => {
    
    // --- VERIFICATION CONFIG ---
    if (typeof config === 'undefined') { 
        console.error("ERREUR : config.js n'est pas chargé."); 
        return; 
    }

    const escapeHTML = (str) => {
        if (!str) return '';
        return String(str)
            .replace(/&/g, "&amp;") .replace(/</g, "&lt;") .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;") .replace(/'/g, "&#039;");
    };

    // --- 1. THEME ---
    const themeBtn = document.getElementById("theme-toggle");
    const body = document.body;
    
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

    // --- 2. REMPLISSAGE PROFIL ---
    document.title = `${config.profile.name} | Portfolio`;
    const avatarEl = document.getElementById("profile-avatar");
    if(avatarEl) avatarEl.src = config.profile.avatar;
    const faviconEl = document.getElementById("favicon-link");
    if(faviconEl && config.profile.favicon) faviconEl.href = config.profile.favicon;
    const nameEl = document.getElementById("profile-name");
    if(nameEl) nameEl.innerText = config.profile.name;
    const statusEl = document.getElementById("profile-status");
    if(statusEl) statusEl.innerText = config.profile.status;
    const bioEl = document.getElementById("profile-bio");
    if(bioEl) bioEl.innerText = config.profile.bio;
    const footerEl = document.getElementById("footer-copy");
    if(footerEl) footerEl.innerHTML = `&copy; ${new Date().getFullYear()} ${escapeHTML(config.profile.name)}.`;
    const ghBtn = document.getElementById("link-github");
    if(ghBtn && config.social.github) ghBtn.href = config.social.github;
    const lkBtn = document.getElementById("link-linkedin");
    if(lkBtn && config.social.linkedin) lkBtn.href = config.social.linkedin;

    // --- 3. MODALES ---
    function setupModal(triggerId, modalId, closeBtnId) {
        const trigger = document.getElementById(triggerId);
        const modal = document.getElementById(modalId);
        const closeBtn = document.getElementById(closeBtnId);
        if (trigger && modal) {
            trigger.addEventListener("click", (e) => { e.preventDefault(); modal.style.display = "flex"; });
        }
        const closeFn = () => { if(modal) modal.style.display = "none"; };
        if (closeBtn) closeBtn.addEventListener("click", closeFn);
        window.addEventListener("click", (e) => { if(e.target === modal) closeFn(); });
    }

    setupModal("email-trigger", "email-modal", "modal-close-btn");
    setupModal("legal-trigger", "legal-modal", "legal-close-btn");

    // --- GESTION EMAIL/CAPTCHA ---
    const emailTrigger = document.getElementById("email-trigger");
    const captchaContainer = document.getElementById("captcha-container");
    const emailResultArea = document.getElementById("email-result-area");
    const emailText = document.getElementById("email-text");
    const captchaInstruction = document.getElementById("captcha-instruction");
    const copyBtn = document.getElementById("copy-email-btn");
    let widgetId = null; let decodedEmail = ""; 

    if(emailTrigger) {
        emailTrigger.addEventListener("click", () => {
            if(captchaContainer) captchaContainer.style.display = "flex";
            if(emailResultArea) emailResultArea.style.display = "none";
            if(captchaInstruction) captchaInstruction.style.display = "block";
            
            if (window.turnstile) {
                if (widgetId !== null) turnstile.reset(widgetId);
                else {
                    widgetId = turnstile.render('#captcha-container', {
                        sitekey: config.profile.turnstileSiteKey, 
                        theme: localStorage.getItem("theme") === "light" ? "light" : "dark",
                        callback: function(token) {
                            decodedEmail = atob(config.profile.emailEncoded);
                            if(emailText) emailText.innerText = decodedEmail;
                            if(captchaContainer) captchaContainer.style.display = "none";
                            if(captchaInstruction) captchaInstruction.style.display = "none";
                            if(emailResultArea) emailResultArea.style.display = "block";
                        }
                    });
                }
            }
        });
        if(copyBtn) {
            copyBtn.addEventListener("click", () => {
                if(decodedEmail) navigator.clipboard.writeText(decodedEmail).then(() => {
                    copyBtn.innerText = "Copié ! ✅";
                    setTimeout(() => { document.getElementById("email-modal").style.display = "none"; }, 2000); 
                });
            });
        }
    }

    // --- NAVIGATION ---
    const navList = document.getElementById("nav-list");
    if(navList && config.navigation) {
        config.navigation.forEach(item => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.innerText = item.title; a.href = item.link; 
            li.appendChild(a); navList.appendChild(li);
        });
    }

    // --- SKILLS HEADER ---
    const skillsContainer = document.getElementById("skills-section");
    if(skillsContainer && config.skills) {
        config.skills.forEach(s => { 
            const span = document.createElement("span"); 
            span.className = "skill-tag"; span.innerText = s; 
            skillsContainer.appendChild(span); 
        });
    }

    // --- PROJETS ---
    const grid = document.getElementById("project-grid");
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = `${window.location.origin}${path}Documents/`; 
    const PROJECT_LIMIT = 4; 

    if (grid && config.projects) {
        config.projects.forEach((proj, index) => {
            const vid = `viewer_${index}`;
            const fullPdfUrl = baseUrl + proj.path;
            const btnId = `info-btn-${index}`;

            const div = document.createElement("div"); 
            div.className = "project-card interactive-card"; 
            div.setAttribute('data-hint', 'Voir le PDF 📄'); 
            if (index >= PROJECT_LIMIT) div.classList.add("hidden-item");

            // Note: proj.icon n'est pas passé dans escapeHTML pour permettre le SVG
            div.innerHTML = `
                <span id="badge-project-${index}" class="badge-container-abs"></span>
                <button class="info-btn" id="${btnId}" title="Plus d'infos" data-no-hint="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                </button>
                <div class="card-header">
                    <div class="icon">${proj.icon}</div>
                    <div class="meta">
                        <h4>${escapeHTML(proj.title)}</h4>
                        <p>${escapeHTML(proj.description)}</p>
                    </div>
                </div>
                <div id="${vid}" class="pdf-container"></div>
            `;
            
            div.querySelector('.card-header').addEventListener("click", () => { togglePDF(vid, fullPdfUrl); });
            div.querySelector(`#${btnId}`).addEventListener("click", (e) => {
                e.stopPropagation();
                openProjectModal(proj);
            });

            grid.appendChild(div);
        });
        if (config.projects.length > PROJECT_LIMIT) createToggleBtn(grid, PROJECT_LIMIT, "Voir la suite");
    }

    // --- COMPETENCES ---
    const compList = document.getElementById("comp-list");
    if(compList && config.competences) {
        config.competences.forEach((comp, index) => {
            const li = document.createElement("li"); 
            li.className = "comp-card-container"; 
            const dropId = `comp-drop-${index}`;
            const details = comp.details.map(d => `<li>• ${escapeHTML(d)}</li>`).join('');
            
            // comp.icon n'est pas échappé ici pour le SVG
            li.innerHTML = `
                <div class="comp-header">
                    <div class="cert-icon-box">${comp.icon}</div>
                    <span class="cert-name">${escapeHTML(comp.name)}</span>
                    <button class="cert-btn comp-toggle">▼</button>
                </div>
                <ul id="${dropId}" class="comp-dropdown-menu" style="display:none;">${details}</ul>
            `;
            li.querySelector('.comp-header').addEventListener("click", () => { toggleComp(dropId, li.querySelector('.comp-header')); });
            compList.appendChild(li);
        });
    }

    // --- CERTIFICATIONS ---
    const certList = document.getElementById("cert-list");
    if(certList && config.certifications) {
        config.certifications.forEach((cert, index) => {
            const li = document.createElement("li"); 
            li.className = "cert-card-container";
            const viewerId = `cert_view_${index}`;
            const fullPdfUrl = cert.pdf ? `${window.location.origin}${path}Documents/Certifs/${cert.pdf}` : null;
            
            li.innerHTML = `
                <div class="cert-header-row">
                    <div class="cert-icon-box">${cert.icon || '🏆'}</div>
                    <div class="cert-info">
                        <span class="cert-name">${escapeHTML(cert.name)}</span>
                        <span class="cert-issuer">${escapeHTML(cert.issuer)}</span>
                    </div>
                    <div class="cert-actions">
                        ${cert.url ? `<a href="${cert.url}" target="_blank" class="cert-btn link-btn">🔗</a>` : ''}
                        ${cert.pdf ? `<button class="cert-btn pdf-btn" onclick="toggleCertPDF('${viewerId}', '${fullPdfUrl}')">📄</button>` : ''}
                    </div>
                </div>
                <div id="${viewerId}" class="cert-pdf-viewer"></div>
            `;
            certList.appendChild(li);
        });
    }

    // --- MACHINE A ECRIRE ---
    const textEl = document.getElementById("typewriter-area");
    if(textEl && config.profile.typewriterText) {
        const txt = config.profile.typewriterText; textEl.innerText = ""; let i=0;
        function type() { if(i<txt.length) { textEl.textContent += txt.charAt(i); i++; setTimeout(type, 50); } }
        setTimeout(type, 500);
    }

    initCursorHint();
});

// Fonctions Globales
function togglePDF(id, url) {
    const c = document.getElementById(id);
    const card = c.closest('.project-card');
    if (c.style.display === 'block') {
        c.style.display = 'none'; c.innerHTML = '';
        card.classList.remove('expanded');
        return;
    }
    c.innerHTML = `<iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true" width="100%" height="600px" style="border:none;"></iframe>`;
    c.style.display = 'block';
    card.classList.add('expanded');
}

function toggleComp(id, headerEl) {
    const menu = document.getElementById(id);
    const btn = headerEl.querySelector('.comp-toggle'); 
    const isOpen = menu.style.display === 'block';
    menu.style.display = isOpen ? 'none' : 'block';
    btn.classList.toggle('active', !isOpen);
}

function toggleCertPDF(id, url) {
    const v = document.getElementById(id);
    if (v.style.display === 'block') { v.style.display = 'none'; v.innerHTML = ''; return; }
    v.style.display = 'block';
    v.innerHTML = `<iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true" width="100%" height="400px" style="border:none;"></iframe>`;
}

function initCursorHint() {
    let hintEl = document.getElementById("cursor-hint");
    if (!hintEl) { hintEl = document.createElement("div"); hintEl.id = "cursor-hint"; document.body.appendChild(hintEl); }
    document.addEventListener("mousemove", (e) => { hintEl.style.transform = `translate(${e.clientX + 15}px, ${e.clientY + 15}px)`; });
    document.querySelectorAll('.interactive-card').forEach(el => {
        el.addEventListener("mouseenter", () => { hintEl.innerText = el.getAttribute('data-hint'); hintEl.classList.add("visible"); });
        el.addEventListener("mouseleave", () => hintEl.classList.remove("visible"));
    });
}

function createToggleBtn(container, limit, txtMore) {
    const btn = document.createElement("button");
    btn.className = "load-more-btn"; btn.innerText = txtMore;
    btn.onclick = () => {
        Array.from(container.children).forEach((child, i) => { if(i >= limit) child.classList.toggle('hidden-item'); });
    };
    container.after(btn);
}

function openProjectModal(proj) {
    const modal = document.getElementById("project-modal");
    document.getElementById("modal-project-title").innerText = proj.title;
    document.getElementById("modal-project-desc").innerText = proj.longDescription || proj.description;
    modal.style.display = "flex";
}
