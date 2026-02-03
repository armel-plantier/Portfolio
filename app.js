document.addEventListener("DOMContentLoaded", () => {
    
    // --- VERIFICATION CONFIG ---
    if (typeof config === 'undefined') { 
        console.error("ERREUR : config.js n'est pas chargé."); 
        return; 
    }

    // Fonction de sécurité (Nettoyage texte)
    const escapeHTML = (str) => {
        if (!str) return '';
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
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


    // --- 3. BOUTON CONTACT (MODALE + CAPTCHA + COPIER) ---
    const emailTrigger = document.getElementById("email-trigger");
    const emailModal = document.getElementById("email-modal");
    const closeModalBtn = document.getElementById("modal-close-btn");
    const captchaContainer = document.getElementById("captcha-container");
    const emailResultArea = document.getElementById("email-result-area");
    const emailText = document.getElementById("email-text");
    const captchaInstruction = document.getElementById("captcha-instruction");
    const copyBtn = document.getElementById("copy-email-btn");
    
    let widgetId = null; 
    let decodedEmail = ""; 

    if(emailTrigger && emailModal) {
        emailTrigger.addEventListener("click", (e) => {
            e.preventDefault();
            
            // 1. Reset de l'interface
            emailModal.style.display = "flex";
            if(captchaContainer) captchaContainer.style.display = "flex";
            if(emailResultArea) emailResultArea.style.display = "none";
            if(captchaInstruction) captchaInstruction.style.display = "block";
            if(emailText) emailText.innerText = "";
            
            // Reset visuel du bouton copier
            if(copyBtn) {
                copyBtn.innerText = "Copier";
                copyBtn.style.backgroundColor = ""; 
                copyBtn.style.borderColor = "";
            }

            // 2. Initialisation ou Reset du Captcha
            if (window.turnstile) {
                if (widgetId !== null) {
                    turnstile.reset(widgetId);
                } else {
                    try {
                        widgetId = turnstile.render('#captcha-container', {
                            sitekey: config.profile.turnstileSiteKey, 
                            theme: localStorage.getItem("theme") === "light" ? "light" : "dark",
                            callback: function(token) {
                                // SUCCES !
                                try {
                                    decodedEmail = atob(config.profile.emailEncoded);
                                    if(emailText) emailText.innerText = decodedEmail;
                                    
                                    if(captchaContainer) captchaContainer.style.display = "none";
                                    if(captchaInstruction) captchaInstruction.style.display = "none";
                                    if(emailResultArea) emailResultArea.style.display = "block";
                                } catch (err) {
                                    console.error("Erreur décodage email");
                                }
                            }
                        });
                    } catch (e) {
                        console.error("Erreur rendu Turnstile:", e);
                        if(captchaContainer) captchaContainer.innerHTML = "Erreur chargement sécurité.";
                    }
                }
            }
        });

        // Fonction Copier et Fermer
        if(copyBtn) {
            copyBtn.addEventListener("click", () => {
                if(decodedEmail) {
                    navigator.clipboard.writeText(decodedEmail).then(() => {
                        // Feedback visuel
                        copyBtn.innerText = "Copié ! ✅";
                        copyBtn.style.backgroundColor = "#10b981"; 
                        copyBtn.style.borderColor = "#10b981";

                        // Délai 2s avant fermeture
                        setTimeout(() => {
                            emailModal.style.display = "none";
                            copyBtn.innerText = "Copier"; 
                            copyBtn.style.backgroundColor = "";
                            copyBtn.style.borderColor = "";
                        }, 2000); 

                    }).catch(err => { console.error('Erreur copie :', err); });
                }
            });
        }

        // Fermeture Modale
        const closeFn = () => { emailModal.style.display = "none"; };
        if(closeModalBtn) closeModalBtn.addEventListener("click", closeFn);
        window.addEventListener("click", (e) => {
            if(e.target === emailModal) closeFn();
        });
    }

    // --- 4. MODALE MENTIONS LEGALES ---
    const legalTrigger = document.getElementById("legal-trigger");
    const legalModal = document.getElementById("legal-modal");
    const legalCloseBtn = document.getElementById("legal-close-btn");

    if (legalTrigger && legalModal) {
        legalTrigger.addEventListener("click", (e) => {
            e.preventDefault();
            legalModal.style.display = "flex";
        });
        const closeLegal = () => { legalModal.style.display = "none"; };
        if (legalCloseBtn) legalCloseBtn.addEventListener("click", closeLegal);
        window.addEventListener("click", (e) => {
            if(e.target === legalModal) closeLegal();
        });
    }

    // --- 5. NAVIGATION ---
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

    // --- 6. COMPETENCES (HEADER TAGS) ---
    const skillsContainer = document.getElementById("skills-section");
    if(skillsContainer && config.skills) {
        config.skills.forEach(s => {
            const span = document.createElement("span"); 
            span.className = "skill-tag"; 
            span.innerText = s;
            skillsContainer.appendChild(span);
        });
    }

    // --- 7. PROJETS (MODIFIÉ POUR LA DATE) ---
    const grid = document.getElementById("project-grid");
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = `${window.location.origin}${path}Documents/`; 
    const PROJECT_LIMIT = 4; 

    if (grid && config.projects) {
        config.projects.forEach((proj, index) => {
            const vid = `viewer_${index}`;
            const fullPdfUrl = baseUrl + proj.path;
            
            // Gestion du Badge "Nouveau"
            const badgeHTML = proj.isNew ? `<span class="new-badge">Nouveau</span>` : '';
            
            // Gestion de la Date
            const dateClass = proj.isNew ? "project-date with-badge" : "project-date";
            const dateHTML = proj.date ? `<span class="${dateClass}">${escapeHTML(proj.date)}</span>` : '';

            const div = document.createElement("div"); 
            div.className = "project-card";
            if (index >= PROJECT_LIMIT) div.classList.add("hidden-item");

            div.innerHTML = `
                ${badgeHTML}
                ${dateHTML}
                <div class="card-header" style="cursor: pointer;">
                    <div class="icon">${escapeHTML(proj.icon)}</div>
                    <div class="meta">
                        <h4>${escapeHTML(proj.title)}</h4>
                        <p>${escapeHTML(proj.description)}</p>
                    </div>
                </div>
                <div id="${vid}" class="pdf-container"></div>
            `;
            
            const headerDiv = div.querySelector('.card-header');
            headerDiv.addEventListener("click", () => {
                togglePDF(vid, fullPdfUrl);
            });

            grid.appendChild(div);
        });
        
        if (config.projects.length > PROJECT_LIMIT) createToggleBtn(grid, PROJECT_LIMIT, "Voir la suite");
    }

    // --- 8. PARCOURS ---
    const expList = document.getElementById("exp-list");
    const EXP_LIMIT = 5;
    
    if(expList && config.experiences) {
        config.experiences.forEach((exp, index) => {
            const li = document.createElement("li"); 
            li.className = "timeline-item";
            if (index >= EXP_LIMIT) li.classList.add("hidden-item");
            
            li.innerHTML = `
                <span class="timeline-date">${escapeHTML(exp.date)}</span>
                <h4 class="timeline-title">${escapeHTML(exp.role)} <span style="font-weight:400;opacity:0.8;">@ ${escapeHTML(exp.company)}</span></h4>
                <p class="timeline-desc">${escapeHTML(exp.description)}</p>
            `;
            expList.appendChild(li);
        });
        if (config.experiences.length > EXP_LIMIT) createToggleBtn(expList, EXP_LIMIT, "Voir la suite");
    }

    // --- 9. COMPETENCES (DROPDOWN) ---
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
            headerEl.addEventListener("click", (e) => {
                toggleComp(dropId, headerEl);
            });

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
            const li = document.createElement("li");
            li.className = "cert-card-container";
            if (index >= CERT_LIMIT) li.classList.add("hidden-item");
            
            const issuer = cert.issuer ? cert.issuer : "Certification"; 
            const viewerId = `cert_view_${index}`;
            const fullPdfUrl = cert.pdf ? certBaseUrl + cert.pdf : null;

            let buttonsHtml = '';
            if (cert.url) {
                buttonsHtml += `
                    <a href="${cert.url}" target="_blank" class="cert-btn link-btn" title="Site officiel">
                        🔗
                    </a>`;
            }
            
            li.innerHTML = `
                <div class="cert-header-row">
                    <div class="cert-icon-box">🏆</div>
                    <div class="cert-info">
                        <span class="cert-name">${escapeHTML(cert.name)}</span>
                        <span class="cert-issuer">${escapeHTML(issuer)}</span>
                    </div>
                    <div class="cert-actions">
                        ${buttonsHtml}
                    </div>
                </div>
                <div id="${viewerId}" class="cert-pdf-viewer"></div>
            `;
            
            if (cert.pdf) {
                const actionsDiv = li.querySelector('.cert-actions');
                const pdfBtn = document.createElement("button");
                pdfBtn.className = "cert-btn pdf-btn";
                pdfBtn.title = "Voir le diplôme";
                pdfBtn.innerHTML = "📄";
                
                pdfBtn.addEventListener("click", () => {
                    toggleCertPDF(viewerId, fullPdfUrl);
                });
                
                actionsDiv.appendChild(pdfBtn);
            }

            certList.appendChild(li);
        });
        if (config.certifications.length > CERT_LIMIT) createToggleBtn(certList, CERT_LIMIT, "Voir la suite");
    }

    // --- 11. MACHINE A ECRIRE ---
    const textEl = document.getElementById("typewriter-area");
    if(textEl && config.profile.typewriterText) {
        const txt = config.profile.typewriterText; 
        textEl.innerText = ""; 
        let i=0;
        function type() { 
            if(i<txt.length) { 
                textEl.textContent += txt.charAt(i); 
                i++; 
                setTimeout(type, 50); 
            } 
        }
        setTimeout(type, 500);
    }

    // --- 12. HEADER SCROLL & MOBILE ---
    const header = document.querySelector('.app-header');
    const menuIcon = document.querySelector('.menu-icon'); 
    const navCapsule = document.querySelector('.nav-capsule');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else { 
                header.classList.remove('scrolled'); 
                header.classList.remove('menu-open'); 
            }
        });

        if (menuIcon) {
            menuIcon.addEventListener('click', (e) => { 
                e.stopPropagation(); 
                header.classList.toggle('menu-open'); 
            });
        }
        
        document.addEventListener('click', (e) => {
            if (header.classList.contains('menu-open') && navCapsule && !navCapsule.contains(e.target)) {
                header.classList.remove('menu-open');
            }
        });
    }

    // --- 13. DERNIERE MISE A JOUR (GITHUB API) ---
    const updateEl = document.getElementById("last-update");
    if(updateEl && config.profile.githubUser && config.profile.githubRepo) {
        const repoUrl = `https://api.github.com/repos/${config.profile.githubUser}/${config.profile.githubRepo}`;
        
        fetch(repoUrl)
            .then(response => {
                if (!response.ok) throw new Error("Repo not found");
                return response.json();
            })
            .then(data => {
                const date = new Date(data.pushed_at);
                const formattedDate = date.toLocaleDateString('fr-FR') + ' ' + date.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'});
                updateEl.innerHTML = `Maj : ${formattedDate}`;
            })
            .catch(err => {
                console.warn("GitHub API Error:", err);
                updateEl.innerText = "System Ready";
            });
    }
    
    // --- 14. RACCOURCIS CLAVIER ---
    document.addEventListener('keydown', (e) => {
        // ESC = Ferme tout
        if (e.key === "Escape") {
            const emailModal = document.getElementById("email-modal");
            if(emailModal) emailModal.style.display = "none";
            const legalModal = document.getElementById("legal-modal");
            if(legalModal) legalModal.style.display = "none";
            
            document.querySelectorAll('.pdf-container').forEach(el => { el.style.display='none'; el.innerHTML=''; });
            document.querySelectorAll('.cert-pdf-viewer').forEach(el => { el.style.display='none'; el.innerHTML=''; });
            document.querySelectorAll('.comp-dropdown-menu').forEach(el => el.style.display='none');
            document.querySelectorAll('.comp-toggle').forEach(el => el.classList.remove('active'));
        }
        // D = Dark/Light Mode
        if ((e.key === "d" || e.key === "D") && e.target.tagName !== 'INPUT') {
            document.getElementById("theme-toggle").click();
        }
    });
});

// ==========================================
// FONCTIONS UTILITAIRES
// ==========================================

function togglePDF(id, url) {
    const c = document.getElementById(id);
    if(c.style.display === 'block') { 
        c.style.display = 'none'; 
        c.innerHTML = ''; 
        return; 
    }
    document.querySelectorAll('.pdf-container').forEach(el => { 
        el.style.display = 'none'; 
        el.innerHTML = ''; 
    });
    c.innerHTML = `<iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true" width="100%" height="600px" style="border:none;"></iframe>`;
    c.style.display = 'block';
}

function toggleComp(id, headerEl) {
    const menu = document.getElementById(id);
    const btn = headerEl.querySelector('.comp-toggle');
    document.querySelectorAll('.comp-dropdown-menu').forEach(el => { 
        if(el.id !== id) el.style.display = 'none'; 
    });
    document.querySelectorAll('.comp-toggle').forEach(el => { 
        if(el !== btn) el.classList.remove('active'); 
    });
    if(menu.style.display === 'block') { 
        menu.style.display = 'none'; 
        if(btn) btn.classList.remove('active'); 
    } else { 
        menu.style.display = 'block'; 
        if(btn) btn.classList.add('active'); 
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
        for(let i=0; i<children.length; i++) {
            if(i >= limit) {
                if(expanded) { 
                    children[i].classList.remove("hidden-item"); 
                    children[i].style.opacity = 0; 
                    setTimeout(()=>children[i].style.opacity=1, 50); 
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
