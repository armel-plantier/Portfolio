document.addEventListener("DOMContentLoaded", () => {
    
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

    // --- EMAIL ---
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
            if(emailText) emailText.innerText = "";
            if(copyBtn) { copyBtn.innerText = "Copier"; copyBtn.style.backgroundColor = ""; copyBtn.style.borderColor = ""; }

            if (window.turnstile) {
                if (widgetId !== null) turnstile.reset(widgetId);
                else {
                    try {
                        widgetId = turnstile.render('#captcha-container', {
                            sitekey: config.profile.turnstileSiteKey, 
                            theme: localStorage.getItem("theme") === "light" ? "light" : "dark",
                            callback: function(token) {
                                try {
                                    decodedEmail = atob(config.profile.emailEncoded);
                                    if(emailText) emailText.innerText = decodedEmail;
                                    if(captchaContainer) captchaContainer.style.display = "none";
                                    if(captchaInstruction) captchaInstruction.style.display = "none";
                                    if(emailResultArea) emailResultArea.style.display = "block";
                                } catch (err) { console.error("Erreur décodage email"); }
                            }
                        });
                    } catch (e) { console.error(e); if(captchaContainer) captchaContainer.innerHTML = "Erreur sécu."; }
                }
            }
        });
        if(copyBtn) {
            copyBtn.addEventListener("click", () => {
                if(decodedEmail) navigator.clipboard.writeText(decodedEmail).then(() => {
                    copyBtn.innerText = "Copié ! ✅"; copyBtn.style.backgroundColor = "#10b981"; copyBtn.style.borderColor = "#10b981";
                    setTimeout(() => { document.getElementById("email-modal").style.display = "none"; }, 2000); 
                });
            });
        }
    }

    const projectModal = document.getElementById("project-modal");
    const projectCloseBtn = document.getElementById("project-close-btn");
    if(projectCloseBtn) projectCloseBtn.addEventListener("click", () => projectModal.style.display = "none");
    window.addEventListener("click", (e) => { if(e.target === projectModal) projectModal.style.display = "none"; });

    // --- 5. NAVIGATION ---
    const navList = document.getElementById("nav-list");
    if(navList && config.navigation) {
        config.navigation.forEach(item => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.innerText = item.title; a.href = item.link; 
            a.addEventListener('click', () => { const header = document.querySelector('.app-header'); if(header) header.classList.remove('menu-open'); });
            li.appendChild(a); navList.appendChild(li);
        });
    }

    // --- 6. COMPETENCES ---
    const skillsContainer = document.getElementById("skills-section");
    if(skillsContainer && config.skills) {
        config.skills.forEach(s => { const span = document.createElement("span"); span.className = "skill-tag"; span.innerText = s; skillsContainer.appendChild(span); });
    }

    // --- 7. PROJETS ---
    const grid = document.getElementById("project-grid");
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = `${window.location.origin}${path}Documents/`; 
    const PROJECT_LIMIT = 4; 

    if (grid && config.projects) {
        config.projects.forEach((proj, index) => {
            const vid = `viewer_${index}`;
            const fullPdfUrl = baseUrl + proj.path;
            const badgeId = `badge-project-${index}`;
            const btnId = `info-btn-${index}`; // ID pour cibler le bouton

            // Tags +X
            let cardTagsHTML = '';
            if (proj.tags && Array.isArray(proj.tags) && proj.tags.length > 0) {
                cardTagsHTML = '<div class="tags-container">';
                proj.tags.slice(0, 3).forEach(tag => {
                    cardTagsHTML += `<span class="project-tag">${escapeHTML(tag)}</span>`;
                });
                const remaining = proj.tags.length - 3;
                if (remaining > 0) {
                    cardTagsHTML += `<span class="project-tag" style="opacity: 0.7; font-weight: 700;">+${remaining}</span>`;
                }
                cardTagsHTML += '</div>';
            }

            const div = document.createElement("div"); 
            div.className = "project-card interactive-card"; 
            div.setAttribute('data-hint', 'Voir le PDF 📄'); 
            if (index >= PROJECT_LIMIT) div.classList.add("hidden-item");

            // HTML : Le bouton info est vide par défaut (ou contient "...")
            div.innerHTML = `
                <span id="${badgeId}" class="badge-container-abs"></span>
                
                <button class="info-btn" id="${btnId}" title="Plus d'infos" data-no-hint="true">
                    <span class="btn-text">Info</span>
                </button>

                <div class="card-header">
                    <div class="icon">${escapeHTML(proj.icon)}</div>
                    <div class="meta">
                        <h4>${escapeHTML(proj.title)}</h4>
                        <p>${escapeHTML(proj.description)}</p>
                        ${cardTagsHTML}
                    </div>
                </div>
                <div id="${vid}" class="pdf-container"></div>
            `;
            
            // --- GITHUB API ---
            if (config.profile.githubUser && config.profile.githubRepo && proj.path) {
                const apiUrl = `https://api.github.com/repos/${config.profile.githubUser}/${config.profile.githubRepo}/commits?path=Documents/${proj.path}&page=1&per_page=1`;
                
                fetch(apiUrl)
                    .then(res => { if (!res.ok) throw new Error("Fichier introuvable"); return res.json(); })
                    .then(data => {
                        if (data && data.length > 0) {
                            const commitDate = new Date(data[0].commit.author.date);
                            const formattedDate = commitDate.toLocaleDateString('fr-FR');
                            
                            // MISE A JOUR DU BOUTON INFO AVEC LA DATE
                            const btnEl = document.getElementById(btnId);
                            if(btnEl) {
                                btnEl.innerText = `Date d'ajout : ${formattedDate}`;
                                btnEl.setAttribute('data-date', formattedDate); // Stocke la date pour la modale
                            }

                            // BADGE
                            const today = new Date();
                            const timeDiff = Math.abs(today - commitDate);
                            const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); 
                            if (diffDays <= 30) {
                                const badgeEl = document.getElementById(badgeId);
                                if(badgeEl) badgeEl.innerHTML = `<span class="new-badge">Nouveau</span>`;
                            }
                        }
                    })
                    .catch(err => {
                        // En cas d'erreur ou pas de date, on laisse "Info" ou on met rien
                    });
            }

            const headerDiv = div.querySelector('.card-header');
            headerDiv.addEventListener("click", () => { togglePDF(vid, fullPdfUrl); });

            const infoBtn = div.querySelector(`#${btnId}`);
            if(infoBtn) {
                infoBtn.addEventListener("click", (e) => {
                    e.stopPropagation(); 
                    // On récupère la date stockée ou affichée
                    const dateText = infoBtn.getAttribute('data-date') || ""; 
                    openProjectModal(proj, dateText);
                });
            }

            grid.appendChild(div);
        });
        
        if (config.projects.length > PROJECT_LIMIT) createToggleBtn(grid, PROJECT_LIMIT, "Voir la suite");
    }

    // --- 8. PARCOURS ---
    const expList = document.getElementById("exp-list");
    const EXP_LIMIT = 5;
    if(expList && config.experiences) {
        config.experiences.forEach((exp, index) => {
            const li = document.createElement("li"); li.className = "timeline-item";
            if (index >= EXP_LIMIT) li.classList.add("hidden-item");
            li.innerHTML = `<span class="timeline-date">${escapeHTML(exp.date)}</span><h4 class="timeline-title">${escapeHTML(exp.role)} <span style="font-weight:400;opacity:0.8;">@ ${escapeHTML(exp.company)}</span></h4><p class="timeline-desc">${escapeHTML(exp.description)}</p>`;
            expList.appendChild(li);
        });
        if (config.experiences.length > EXP_LIMIT) createToggleBtn(expList, EXP_LIMIT, "Voir la suite");
    }

    // --- 9. COMPETENCES ---
    const compList = document.getElementById("comp-list");
    const COMP_LIMIT = 5;
    if(compList && config.competences) {
        config.competences.forEach((comp, index) => {
            const li = document.createElement("li"); 
            li.className = "comp-card-container"; 
            if (index >= COMP_LIMIT) li.classList.add("hidden-item");
            const dropId = `comp-drop-${index}`;
            const details = comp.details.map(d => `<li>• ${escapeHTML(d)}</li>`).join('');
            li.innerHTML = `
                <div class="comp-header">
                    <div class="cert-icon-box">${escapeHTML(comp.icon)}</div>
                    <span class="cert-name">${escapeHTML(comp.name)}</span>
                    <button class="cert-btn comp-toggle">▼</button>
                </div>
                <ul id="${dropId}" class="comp-dropdown-menu" style="display:none;">${details}</ul>
            `;
            const headerEl = li.querySelector('.comp-header');
            headerEl.addEventListener("click", (e) => { toggleComp(dropId, headerEl); });
            compList.appendChild(li);
        });
        if (config.competences.length > COMP_LIMIT) createToggleBtn(compList, COMP_LIMIT, "Voir la suite");
    }

    // --- 10. CERTIFICATIONS ---
    const certList = document.getElementById("cert-list");
    const CERT_LIMIT = 5;
    const certBaseUrl = `${window.location.origin}${path}Documents/Certifs/`; 
    if(certList && config.certifications) {
        config.certifications.forEach((cert, index) => {
            const li = document.createElement("li"); li.className = "cert-card-container";
            if (index >= CERT_LIMIT) li.classList.add("hidden-item");
            const issuer = cert.issuer ? cert.issuer : "Certification"; 
            const viewerId = `cert_view_${index}`;
            const fullPdfUrl = cert.pdf ? certBaseUrl + cert.pdf : null;
            let buttonsHtml = '';
            if (cert.url) buttonsHtml += `<a href="${cert.url}" target="_blank" class="cert-btn link-btn" title="Site officiel">🔗</a>`;
            li.innerHTML = `<div class="cert-header-row"><div class="cert-icon-box">🏆</div><div class="cert-info"><span class="cert-name">${escapeHTML(cert.name)}</span><span class="cert-issuer">${escapeHTML(issuer)}</span></div><div class="cert-actions">${buttonsHtml}</div></div><div id="${viewerId}" class="cert-pdf-viewer"></div>`;
            if (cert.pdf) {
                const actionsDiv = li.querySelector('.cert-actions');
                const pdfBtn = document.createElement("button"); pdfBtn.className = "cert-btn pdf-btn"; pdfBtn.title = "Voir le diplôme"; pdfBtn.innerHTML = "📄";
                pdfBtn.addEventListener("click", () => { toggleCertPDF(viewerId, fullPdfUrl); });
                actionsDiv.appendChild(pdfBtn);
            }
            certList.appendChild(li);
        });
        if (config.certifications.length > CERT_LIMIT) createToggleBtn(certList, CERT_LIMIT, "Voir la suite");
    }

    // --- 11. MACHINE A ECRIRE ---
    const textEl = document.getElementById("typewriter-area");
    if(textEl && config.profile.typewriterText) {
        const txt = config.profile.typewriterText; textEl.innerText = ""; let i=0;
        function type() { if(i<txt.length) { textEl.textContent += txt.charAt(i); i++; setTimeout(type, 50); } }
        setTimeout(type, 500);
    }

    // --- 12. HEADER SCROLL & MOBILE ---
    const header = document.querySelector('.app-header');
    const menuIcon = document.querySelector('.menu-icon'); 
    const navCapsule = document.querySelector('.nav-capsule');
    if (header) {
        window.addEventListener('scroll', () => { if (window.scrollY > 50) header.classList.add('scrolled'); else { header.classList.remove('scrolled'); header.classList.remove('menu-open'); } });
        if (menuIcon) { menuIcon.addEventListener('click', (e) => { e.stopPropagation(); header.classList.toggle('menu-open'); }); }
        document.addEventListener('click', (e) => { if (header.classList.contains('menu-open') && navCapsule && !navCapsule.contains(e.target)) { header.classList.remove('menu-open'); } });
    }

    // --- 13. FOOTER API ---
    const updateEl = document.getElementById("last-update");
    if(updateEl && config.profile.githubUser && config.profile.githubRepo) {
        const repoUrl = `https://api.github.com/repos/${config.profile.githubUser}/${config.profile.githubRepo}`;
        fetch(repoUrl).then(response => { if (!response.ok) throw new Error("Repo not found"); return response.json(); })
            .then(data => { const date = new Date(data.pushed_at); const formattedDate = date.toLocaleDateString('fr-FR') + ' ' + date.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'}); updateEl.innerHTML = `Maj : ${formattedDate}`; })
            .catch(err => { console.warn("GitHub API Error:", err); updateEl.innerText = "System Ready"; });
    }
    
    initCursorHint();

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = "none");
            document.querySelectorAll('.pdf-container').forEach(el => { el.style.display='none'; el.innerHTML=''; });
            document.querySelectorAll('.cert-pdf-viewer').forEach(el => { el.style.display='none'; el.innerHTML=''; });
            document.querySelectorAll('.comp-dropdown-menu').forEach(el => el.style.display='none');
            document.querySelectorAll('.expanded').forEach(el => el.classList.remove('expanded'));
            document.querySelectorAll('.comp-toggle').forEach(el => el.classList.remove('active'));
        }
        if ((e.key === "d" || e.key === "D") && e.target.tagName !== 'INPUT') { document.getElementById("theme-toggle").click(); }
    });
});

function initCursorHint() {
    let hintEl = document.getElementById("cursor-hint");
    if (!hintEl) {
        hintEl = document.createElement("div");
        hintEl.id = "cursor-hint";
        document.body.appendChild(hintEl);
    }

    document.addEventListener("mousemove", (e) => {
        const x = e.clientX;
        const y = e.clientY;
        hintEl.style.transform = `translate(${x + 15}px, ${y + 15}px)`;
    });

    const interactiveElements = document.querySelectorAll('.interactive-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
            if (el.classList.contains('expanded')) return;
            const text = el.getAttribute('data-hint') || "Voir";
            hintEl.innerText = text;
            hintEl.classList.add("visible");
        });
        
        el.addEventListener("mousemove", (e) => {
            // SECURITE : Si on survole le bouton date, le curseur disparait
            if (e.target.closest('.info-btn')) {
                hintEl.classList.remove("visible");
                return;
            }

            if (el.classList.contains('expanded')) {
                hintEl.classList.remove("visible");
            } else {
                if (!hintEl.classList.contains("visible")) hintEl.classList.add("visible");
            }
        });
        
        el.addEventListener("mouseleave", () => {
            hintEl.classList.remove("visible");
        });

        el.addEventListener("click", () => {
             hintEl.classList.remove("visible");
        });
    });

    const noHintElements = document.querySelectorAll('[data-no-hint="true"]');
    noHintElements.forEach(btn => {
        btn.addEventListener("mouseenter", (e) => { e.stopPropagation(); hintEl.classList.remove("visible"); });
    });
}

// Fonction Modifiée : "Date d'ajout :"
function openProjectModal(proj, dateStr = "") {
    const modal = document.getElementById("project-modal");
    const titleEl = document.getElementById("modal-project-title");
    const descEl = document.getElementById("modal-project-desc");
    const tagsEl = document.getElementById("modal-project-tags");

    if(modal && titleEl && descEl && tagsEl) {
        titleEl.innerText = proj.title;
        
        let dateHtml = "";
        if (dateStr && dateStr !== "..." && dateStr !== "") {
            // "Date d'ajout :" ici
            dateHtml = `<div class="modal-date-display">Date d'ajout : ${dateStr}</div>`;
        }

        descEl.innerHTML = dateHtml + (proj.longDescription ? proj.longDescription : proj.description);
        
        tagsEl.innerHTML = "";
        if(proj.tags && proj.tags.length > 0) {
            proj.tags.forEach(tag => {
                const span = document.createElement("span");
                span.className = "project-tag";
                span.innerText = tag;
                tagsEl.appendChild(span);
            });
        } else {
            tagsEl.innerHTML = "<span style='color:var(--muted); font-size:0.8rem;'>Aucun tag</span>";
        }
        modal.style.display = "flex";
    }
}

function togglePDF(id, url) {
    const c = document.getElementById(id);
    const card = c.closest('.project-card'); 
    
    if (c.style.display === 'block') {
        c.style.display = 'none';
        c.innerHTML = '';
        if(card) card.classList.remove('expanded'); 
        return;
    }

    document.querySelectorAll('.pdf-container').forEach(el => {
        el.style.display = 'none';
        el.innerHTML = '';
        const parent = el.closest('.project-card');
        if(parent) parent.classList.remove('expanded');
    });

    c.innerHTML = `<iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true" width="100%" height="600px" style="border:none;"></iframe>`;
    c.style.display = 'block';
    
    if(card) card.classList.add('expanded');
    const hintEl = document.getElementById("cursor-hint");
    if(hintEl) hintEl.classList.remove("visible");
}

function toggleComp(id, headerEl) {
    const menu = document.getElementById(id);
    const btn = headerEl.querySelector('.comp-toggle'); 
    
    document.querySelectorAll('.comp-dropdown-menu').forEach(el => {
        if (el.id !== id) el.style.display = 'none';
    });
    document.querySelectorAll('.comp-toggle').forEach(el => {
        if (el !== btn) el.classList.remove('active');
    });

    if (menu.style.display === 'block') {
        menu.style.display = 'none';
        if (btn) btn.classList.remove('active');
    } else {
        menu.style.display = 'block';
        if (btn) btn.classList.add('active');
    }
}

function toggleCertPDF(id, url) {
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
}

function createToggleBtn(container, limit, txtMore) {
    const div = document.createElement("div");
    div.className = "load-more-container";
    const btn = document.createElement("button");
    btn.className = "load-more-btn";
    btn.innerHTML = `<span>↓</span> ${txtMore}`;
    let expanded = false;
    btn.addEventListener("click", () => {
        expanded = !expanded;
        const children = container.children;
        for (let i = 0; i < children.length; i++) {
            if (i >= limit) {
                if (expanded) {
                    children[i].classList.remove("hidden-item");
                    children[i].style.opacity = 0;
                    setTimeout(() => children[i].style.opacity = 1, 50);
                } else {
                    children[i].classList.add("hidden-item");
                    children[i].style.opacity = 0;
                }
            }
        }
        btn.innerHTML = expanded ? `<span>↑</span> Masquer` : `<span>↓</span> ${txtMore}`;
    });
    div.appendChild(btn);
    container.parentNode.insertBefore(div, container.nextSibling);
}
