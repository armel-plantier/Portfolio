document.addEventListener("DOMContentLoaded", () => {
    
    // --- VERIFICATION CONFIG ---
    if (typeof config === 'undefined') { 
        console.error("ERREUR : config.js n'est pas chargé."); 
        return; 
    }

    const escapeHTML = (str) => {
        if (!str) return '';
        return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
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

    // --- 2. PROFIL ---
    document.title = `${config.profile.name} | Portfolio`;
    if(document.getElementById("profile-avatar")) document.getElementById("profile-avatar").src = config.profile.avatar;
    if(document.getElementById("favicon-link") && config.profile.favicon) document.getElementById("favicon-link").href = config.profile.favicon;
    if(document.getElementById("profile-name")) document.getElementById("profile-name").innerText = config.profile.name;
    if(document.getElementById("profile-status")) document.getElementById("profile-status").innerText = config.profile.status;
    if(document.getElementById("profile-bio")) document.getElementById("profile-bio").innerText = config.profile.bio;
    if(document.getElementById("footer-copy")) document.getElementById("footer-copy").innerHTML = `&copy; ${new Date().getFullYear()} ${escapeHTML(config.profile.name)}.`;
    if(document.getElementById("link-github")) document.getElementById("link-github").href = config.social.github;
    if(document.getElementById("link-linkedin")) document.getElementById("link-linkedin").href = config.social.linkedin;

    // --- 3. CONTACT MODAL ---
    const emailTrigger = document.getElementById("email-trigger");
    const emailModal = document.getElementById("email-modal");
    const closeModalBtn = document.getElementById("modal-close-btn");
    const captchaContainer = document.getElementById("captcha-container");
    const emailResultArea = document.getElementById("email-result-area");
    const emailText = document.getElementById("email-text");
    const captchaInstruction = document.getElementById("captcha-instruction");
    const copyBtn = document.getElementById("copy-email-btn");
    let widgetId = null; 
    
    if(emailTrigger && emailModal) {
        emailTrigger.addEventListener("click", (e) => {
            e.preventDefault();
            emailModal.style.display = "flex";
            if(captchaContainer) captchaContainer.style.display = "flex";
            if(emailResultArea) emailResultArea.style.display = "none";
            if(captchaInstruction) captchaInstruction.style.display = "block";
            if(emailText) emailText.innerText = "";
            if(copyBtn) { copyBtn.innerText = "Copier"; copyBtn.style.backgroundColor = ""; }

            if (window.turnstile) {
                if (widgetId !== null) turnstile.reset(widgetId);
                else {
                    try {
                        widgetId = turnstile.render('#captcha-container', {
                            sitekey: config.profile.turnstileSiteKey, 
                            theme: localStorage.getItem("theme") === "light" ? "light" : "dark",
                            callback: function(token) {
                                try {
                                    const decoded = atob(config.profile.emailEncoded);
                                    if(emailText) emailText.innerText = decoded;
                                    if(captchaContainer) captchaContainer.style.display = "none";
                                    if(captchaInstruction) captchaInstruction.style.display = "none";
                                    if(emailResultArea) emailResultArea.style.display = "block";
                                } catch (err) { console.error("Erreur décodage"); }
                            }
                        });
                    } catch (e) { console.error("Erreur Turnstile"); }
                }
            }
        });
        if(copyBtn) {
            copyBtn.addEventListener("click", () => {
                const mail = emailText.innerText;
                if(mail) {
                    navigator.clipboard.writeText(mail).then(() => {
                        copyBtn.innerText = "Copié ! ✅";
                        copyBtn.style.backgroundColor = "#10b981"; 
                        setTimeout(() => {
                            emailModal.style.display = "none";
                            copyBtn.innerText = "Copier"; 
                            copyBtn.style.backgroundColor = "";
                        }, 2000); 
                    });
                }
            });
        }
        const closeFn = () => { emailModal.style.display = "none"; };
        if(closeModalBtn) closeModalBtn.addEventListener("click", closeFn);
        window.addEventListener("click", (e) => { if(e.target === emailModal) closeFn(); });
    }

    // --- 4. MENTIONS LEGALES ---
    const legalTrigger = document.getElementById("legal-trigger");
    const legalModal = document.getElementById("legal-modal");
    const legalCloseBtn = document.getElementById("legal-close-btn");
    if (legalTrigger && legalModal) {
        legalTrigger.addEventListener("click", (e) => { e.preventDefault(); legalModal.style.display = "flex"; });
        const closeLegal = () => { legalModal.style.display = "none"; };
        if (legalCloseBtn) legalCloseBtn.addEventListener("click", closeLegal);
        window.addEventListener("click", (e) => { if(e.target === legalModal) closeLegal(); });
    }

    // --- 5. GESTION MODALE PROJET (NOUVEAU) ---
    const projModal = document.getElementById("project-modal");
    const projClose = document.getElementById("proj-close-btn");
    const projTitle = document.getElementById("proj-modal-title");
    const projMeta = document.getElementById("proj-modal-meta");
    const projViewer = document.getElementById("proj-modal-viewer");

    const closeProjModal = () => {
        if(projModal) {
            projModal.style.display = "none";
            if(projViewer) projViewer.innerHTML = ""; // Stop PDF loading
        }
    };

    if(projClose) projClose.addEventListener("click", closeProjModal);
    window.addEventListener("click", (e) => { if(e.target === projModal) closeProjModal(); });


    // --- 6. NAVIGATION ---
    const navList = document.getElementById("nav-list");
    if(navList && config.navigation) {
        config.navigation.forEach(item => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.innerText = item.title;
            a.href = item.link; 
            a.addEventListener('click', () => {
                 const header = document.querySelector('.app-header');
                 if(header) header.classList.remove('menu-open');
            });
            li.appendChild(a);
            navList.appendChild(li);
        });
    }

    // --- 7. HEADER SKILLS ---
    const skillsContainer = document.getElementById("skills-section");
    if(skillsContainer && config.skills) {
        config.skills.forEach(s => {
            const span = document.createElement("span"); 
            span.className = "skill-tag"; 
            span.innerText = s;
            skillsContainer.appendChild(span);
        });
    }

    // --- 8. PROJETS (NOUVEAU : OUVRE MODALE) ---
    const grid = document.getElementById("project-grid");
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = `${window.location.origin}${path}Documents/`; 
    const PROJECT_LIMIT = 4; 

    if (grid && config.projects) {
        config.projects.forEach((proj, index) => {
            const fullPdfUrl = baseUrl + proj.path;
            const badgeHTML = proj.isNew ? `<span class="new-badge">Nouveau</span>` : '';

            let tagsHTML = '';
            if(proj.tags && proj.tags.length > 0) {
                tagsHTML = proj.tags.map(tag => `<span class="proj-mini-tag">${escapeHTML(tag)}</span>`).join('');
            }

            // Date à gauche
            const dateHTML = proj.date ? `<span class="proj-date">📅 ${escapeHTML(proj.date)}</span>` : '';

            const div = document.createElement("div"); 
            div.className = "project-card";
            if (index >= PROJECT_LIMIT) div.classList.add("hidden-item");

            // On retire le PDF container d'ici car il est dans la modale
            div.innerHTML = `
                <div class="card-header">
                    <div class="icon">${escapeHTML(proj.icon)}</div>
                    
                    <div class="meta">
                        <h4>${escapeHTML(proj.title)}</h4>
                        <p>${escapeHTML(proj.description)}</p>
                        
                        <div class="meta-footer">
                            ${dateHTML}
                            <div class="proj-tags-row">${tagsHTML}</div>
                        </div>
                    </div>

                    <div class="actions-right">
                        ${badgeHTML}
                        <button class="btn-open-pdf" title="Ouvrir le projet">👁️</button>
                    </div>
                </div>
            `;
            
            // Clic sur l'œil ouvre la modale
            const openBtn = div.querySelector('.btn-open-pdf');
            openBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                
                // Remplissage Modale
                if(projTitle) projTitle.innerText = proj.title;
                
                if(projMeta) {
                    projMeta.innerHTML = `
                        <p style="margin-bottom:10px; color:var(--text);">${escapeHTML(proj.description)}</p>
                        <div style="display:flex; gap:10px; flex-wrap:wrap; font-size:0.85rem; color:var(--muted);">
                            ${dateHTML}
                            ${tagsHTML}
                        </div>
                    `;
                }

                if(projViewer) {
                    projViewer.innerHTML = `<iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(fullPdfUrl)}&embedded=true" width="100%" height="100%" style="border:none;"></iframe>`;
                }

                if(projModal) projModal.style.display = "flex";
            });

            grid.appendChild(div);
        });
        
        if (config.projects.length > PROJECT_LIMIT) createToggleBtn(grid, PROJECT_LIMIT, "Voir la suite");
    }

    // --- 9. PARCOURS ---
    const expList = document.getElementById("exp-list");
    const EXP_LIMIT = 5;
    if(expList && config.experiences) {
        config.experiences.forEach((exp, index) => {
            const li = document.createElement("li"); 
            li.className = "timeline-item";
            if (index >= EXP_LIMIT) li.classList.add("hidden-item");
            li.innerHTML = `<span class="timeline-date">${escapeHTML(exp.date)}</span><h4 class="timeline-title">${escapeHTML(exp.role)} <span style="font-weight:400;opacity:0.8;">@ ${escapeHTML(exp.company)}</span></h4><p class="timeline-desc">${escapeHTML(exp.description)}</p>`;
            expList.appendChild(li);
        });
        if (config.experiences.length > EXP_LIMIT) createToggleBtn(expList, EXP_LIMIT, "Voir la suite");
    }

    // --- 10. COMPETENCES ---
    const compList = document.getElementById("comp-list");
    const COMP_LIMIT = 5;
    if(compList && config.competences) {
        config.competences.forEach((comp, index) => {
            const li = document.createElement("li"); 
            li.className = "comp-card-container";
            if (index >= COMP_LIMIT) li.classList.add("hidden-item");
            const dropId = `comp-drop-${index}`;
            const details = comp.details.map(d => `<li>• ${escapeHTML(d)}</li>`).join('');
            li.innerHTML = `<div class="comp-header"><div class="cert-icon-box">${escapeHTML(comp.icon)}</div><span class="cert-name">${escapeHTML(comp.name)}</span><button class="cert-btn comp-toggle">▼</button></div><ul id="${dropId}" class="comp-dropdown-menu" style="display:none;">${details}</ul>`;
            const headerEl = li.querySelector('.comp-header');
            headerEl.addEventListener("click", () => toggleComp(dropId, headerEl));
            compList.appendChild(li);
        });
        if (config.competences.length > COMP_LIMIT) createToggleBtn(compList, COMP_LIMIT, "Voir la suite");
    }

    // --- 11. CERTIFICATIONS ---
    const certList = document.getElementById("cert-list");
    const CERT_LIMIT = 5;
    const certBaseUrl = `${window.location.origin}${path}Documents/Certifs/`; 
    if(certList && config.certifications) {
        config.certifications.forEach((cert, index) => {
            const li = document.createElement("li");
            li.className = "cert-card-container";
            if (index >= CERT_LIMIT) li.classList.add("hidden-item");
            const viewerId = `cert_view_${index}`;
            const fullPdfUrl = cert.pdf ? certBaseUrl + cert.pdf : null;
            let buttonsHtml = cert.url ? `<a href="${cert.url}" target="_blank" class="cert-btn link-btn">🔗</a>` : '';
            li.innerHTML = `<div class="cert-header-row"><div class="cert-icon-box">🏆</div><div class="cert-info"><span class="cert-name">${escapeHTML(cert.name)}</span><span class="cert-issuer">${escapeHTML(cert.issuer)}</span></div><div class="cert-actions">${buttonsHtml}</div></div><div id="${viewerId}" class="cert-pdf-viewer"></div>`;
            if (cert.pdf) {
                const pdfBtn = document.createElement("button");
                pdfBtn.className = "cert-btn pdf-btn";
                pdfBtn.innerHTML = "📄";
                pdfBtn.addEventListener("click", () => toggleCertPDF(viewerId, fullPdfUrl));
                li.querySelector('.cert-actions').appendChild(pdfBtn);
            }
            certList.appendChild(li);
        });
        if (config.certifications.length > CERT_LIMIT) createToggleBtn(certList, CERT_LIMIT, "Voir la suite");
    }

    // --- 12. TYPEWRITER ---
    const textEl = document.getElementById("typewriter-area");
    if(textEl && config.profile.typewriterText) {
        const txt = config.profile.typewriterText; textEl.innerText = ""; let i=0;
        function type() { if(i<txt.length) { textEl.textContent += txt.charAt(i); i++; setTimeout(type, 50); } }
        setTimeout(type, 500);
    }

    // --- 13. HEADER SCROLL ---
    const header = document.querySelector('.app-header');
    const menuIcon = document.querySelector('.menu-icon'); 
    const navCapsule = document.querySelector('.nav-capsule');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else { header.classList.remove('scrolled'); header.classList.remove('menu-open'); }
        });
        if (menuIcon) menuIcon.addEventListener('click', (e) => { e.stopPropagation(); header.classList.toggle('menu-open'); });
        document.addEventListener('click', (e) => { if (header.classList.contains('menu-open') && navCapsule && !navCapsule.contains(e.target)) header.classList.remove('menu-open'); });
    }

    // --- 14. GITHUB UPDATE ---
    const updateEl = document.getElementById("last-update");
    if(updateEl && config.profile.githubUser && config.profile.githubRepo) {
        fetch(`https://api.github.com/repos/${config.profile.githubUser}/${config.profile.githubRepo}`)
            .then(r => r.ok ? r.json() : Promise.reject(r))
            .then(d => {
                const date = new Date(d.pushed_at);
                updateEl.innerHTML = `Maj : ${date.toLocaleDateString('fr-FR')} ${date.toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'})}`;
            })
            .catch(() => updateEl.innerText = "System Ready");
    }
    
    // --- 15. KEYBOARD ---
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            if(document.getElementById("email-modal")) document.getElementById("email-modal").style.display = "none";
            if(document.getElementById("legal-modal")) document.getElementById("legal-modal").style.display = "none";
            if(document.getElementById("project-modal")) closeProjModal(); // Ferme aussi la modale projet
            
            document.querySelectorAll('.cert-pdf-viewer').forEach(el => { el.style.display='none'; el.innerHTML=''; });
            document.querySelectorAll('.comp-dropdown-menu').forEach(el => el.style.display='none');
            document.querySelectorAll('.comp-toggle').forEach(el => el.classList.remove('active'));
        }
        if ((e.key === "d" || e.key === "D") && e.target.tagName !== 'INPUT') document.getElementById("theme-toggle").click();
    });
});

function toggleComp(id, headerEl) {
    const menu = document.getElementById(id);
    const btn = headerEl.querySelector('.comp-toggle');
    document.querySelectorAll('.comp-dropdown-menu').forEach(el => { if(el.id !== id) el.style.display = 'none'; });
    document.querySelectorAll('.comp-toggle').forEach(el => { if(el !== btn) el.classList.remove('active'); });
    if(menu.style.display === 'block') { menu.style.display = 'none'; if(btn) btn.classList.remove('active'); } 
    else { menu.style.display = 'block'; if(btn) btn.classList.add('active'); }
}
function toggleCertPDF(id, url) {
    const viewer = document.getElementById(id);
    if (viewer.style.display === 'block') { viewer.style.display = 'none'; viewer.innerHTML = ''; return; }
    document.querySelectorAll('.cert-pdf-viewer').forEach(el => { el.style.display = 'none'; el.innerHTML = ''; });
    viewer.style.display = 'block';
    viewer.innerHTML = `<iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true" width="100%" height="100%" style="border:none;"></iframe>`;
}
function createToggleBtn(container, limit, txtMore) {
    const div = document.createElement("div"); div.className = "load-more-container"; 
    const btn = document.createElement("button"); btn.className = "load-more-btn"; btn.innerHTML = `<span>↓</span> ${txtMore}`; 
    let expanded = false;
    btn.addEventListener("click", () => {
        expanded = !expanded;
        const children = container.children;
        for(let i=0; i<children.length; i++) {
            if(i >= limit) {
                if(expanded) { children[i].classList.remove("hidden-item"); children[i].style.opacity = 0; setTimeout(()=>children[i].style.opacity=1, 50); } 
                else { children[i].classList.add("hidden-item"); children[i].style.opacity = 0; }
            }
        }
        btn.innerHTML = expanded ? `<span>↑</span> Masquer` : `<span>↓</span> ${txtMore}`;
    });
    div.appendChild(btn); container.parentNode.insertBefore(div, container.nextSibling);
}
