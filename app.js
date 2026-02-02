document.addEventListener("DOMContentLoaded", () => {
    
    if (typeof config === 'undefined') { console.error("ERREUR : config.js manquant"); return; }

    // SECURITE : Fonction pour échapper les caractères spéciaux HTML (Anti-XSS)
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

    // --- 2. PROFIL ---
    document.title = `${config.profile.name} | Portfolio`;
    const avatarEl = document.getElementById("profile-avatar");
    if(avatarEl) avatarEl.src = config.profile.avatar; 
    
    const faviconEl = document.getElementById("favicon-link");
    if(faviconEl && config.profile.favicon) {
        faviconEl.href = config.profile.favicon;
    }

    document.getElementById("profile-name").innerText = config.profile.name;
    document.getElementById("profile-status").innerText = config.profile.status;
    document.getElementById("profile-bio").innerText = config.profile.bio;
    
    const gh = document.getElementById("link-github");
    if(gh) gh.href = config.social.github;
    
    const lk = document.getElementById("link-linkedin");
    if(lk) lk.href = config.social.linkedin;
    
    document.getElementById("footer-copy").innerHTML = `&copy; ${new Date().getFullYear()} ${escapeHTML(config.profile.name)}.`;

    // --- 3. NAVIGATION ---
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

    // --- 4. TAGS HEADER ---
    const skillsContainer = document.getElementById("skills-section");
    if(skillsContainer && config.skills) {
        config.skills.forEach(s => {
            const span = document.createElement("span"); 
            span.className = "skill-tag"; 
            span.innerText = s;
            skillsContainer.appendChild(span);
        });
    }

    // --- 5. PROJETS (LIMIT 4) ---
    const grid = document.getElementById("project-grid");
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = `${window.location.origin}${path}Documents/`; 
    const PROJECT_LIMIT = 4; 

    if (grid && config.projects) {
        config.projects.forEach((proj, index) => {
            const vid = `viewer_${index}`;
            const div = document.createElement("div"); 
            div.className = "project-card";
            
            if (index >= PROJECT_LIMIT) div.classList.add("hidden-item");
            
            const fullPdfUrl = baseUrl + proj.path;
            const badgeHTML = proj.isNew ? `<span class="new-badge">Nouveau</span>` : '';

            div.innerHTML = `
                ${badgeHTML}
                <div class="card-header js-toggle-pdf">
                    <div class="icon">${escapeHTML(proj.icon)}</div>
                    <div class="meta">
                        <h4>${escapeHTML(proj.title)}</h4>
                        <p>${escapeHTML(proj.description)}</p>
                    </div>
                </div>
                <div id="${vid}" class="pdf-container"></div>
            `;
            
            const headerBtn = div.querySelector('.js-toggle-pdf');
            if(headerBtn) {
                headerBtn.addEventListener('click', () => togglePDF(vid, fullPdfUrl));
            }

            grid.appendChild(div);
        });
        
        if (config.projects.length > PROJECT_LIMIT) createToggleBtn(grid, PROJECT_LIMIT, "Voir la suite");
    }

    // --- 6. PARCOURS (LIMIT 5) ---
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

    // --- 7. COMPETENCES (LIMIT 5) ---
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
                <div class="comp-header js-comp-header">
                    <div class="cert-icon-box">${escapeHTML(comp.icon)}</div>
                    <span class="cert-name">${escapeHTML(comp.name)}</span>
                    <button class="cert-btn comp-toggle">▼</button>
                </div>
                <ul id="${dropId}" class="comp-dropdown-menu" style="display:none;">${details}</ul>
            `;
            
            const headerEl = li.querySelector('.js-comp-header');
            if(headerEl) {
                headerEl.addEventListener('click', (e) => toggleComp(e, dropId, headerEl));
            }

            compList.appendChild(li);
        });
        if (config.competences.length > COMP_LIMIT) createToggleBtn(compList, COMP_LIMIT, "Voir la suite");
    }

    // --- 8. CERTIFICATIONS ---
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

            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'cert-actions';

            if (cert.url) {
                const linkBtn = document.createElement('a');
                linkBtn.href = cert.url;
                linkBtn.target = "_blank";
                linkBtn.rel = "noopener noreferrer"; 
                linkBtn.className = "cert-btn link-btn";
                linkBtn.title = "Voir le site officiel";
                linkBtn.innerHTML = '<i class="fa-solid fa-link"></i> 🔗';
                actionsDiv.appendChild(linkBtn);
            }

            if (cert.pdf) {
                const pdfBtn = document.createElement('button');
                pdfBtn.className = "cert-btn pdf-btn";
                pdfBtn.title = "Voir le diplôme";
                pdfBtn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> 📄';
                pdfBtn.addEventListener('click', () => toggleCertPDF(viewerId, fullPdfUrl));
                actionsDiv.appendChild(pdfBtn);
            }

            li.innerHTML = `
                <div class="cert-header-row">
                    <div class="cert-icon-box">🏆</div>
                    <div class="cert-info">
                        <span class="cert-name">${escapeHTML(cert.name)}</span>
                        <span class="cert-issuer">${escapeHTML(issuer)}</span>
                    </div>
                </div>
                <div id="${viewerId}" class="cert-pdf-viewer"></div>
            `;
            
            li.querySelector('.cert-header-row').appendChild(actionsDiv);
            certList.appendChild(li);
        });
        if (config.certifications.length > CERT_LIMIT) createToggleBtn(certList, CERT_LIMIT, "Voir la suite");
    }

    // --- 9. TYPEWRITER ---
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

    // --- 10. GESTION EMAIL AVEC CAPTCHA ---
    const emailTrigger = document.getElementById("email-trigger");
    const captchaContainer = document.getElementById("captcha-container");
    const emailResultArea = document.getElementById("email-result-area");
    const emailText = document.getElementById("email-text");
    const captchaInstruction = document.getElementById("captcha-instruction");
    let widgetId = null;

    if(emailTrigger) {
        emailTrigger.addEventListener("click", function(e) {
            e.preventDefault();
            
            // 1. Reset de l'interface
            document.getElementById("email-modal").style.display = "flex";
            captchaContainer.style.display = "flex";
            emailResultArea.style.display = "none";
            captchaInstruction.style.display = "block";
            emailText.innerText = "";

            // 2. Si le widget existe déjà, on le reset, sinon on le crée
            if (widgetId !== null) {
                if(window.turnstile) turnstile.reset(widgetId);
            } else {
                if(window.turnstile) {
                    // Rendu explicite du widget
                    widgetId = turnstile.render('#captcha-container', {
                        sitekey: config.profile.turnstileSiteKey,
                        theme: localStorage.getItem("theme") === "light" ? "light" : "dark",
                        callback: function(token) {
                            // SUCCES ! Le captcha est validé.
                            // console.log("Captcha validé. Token:", token); 
                            
                            // 3. Décodage et affichage de l'email
                            try {
                                const decodedEmail = atob(config.profile.emailEncoded);
                                emailText.innerText = decodedEmail;
                                
                                // 4. Transition visuelle
                                captchaContainer.style.display = "none";
                                captchaInstruction.style.display = "none";
                                emailResultArea.style.display = "block";
                            } catch (err) {
                                console.error("Erreur décodage email");
                            }
                        }
                    });
                } else {
                    console.error("Erreur : Turnstile non chargé.");
                    captchaContainer.innerHTML = "<p style='color:red;'>Erreur chargement Captcha</p>";
                }
            }
        });
    }

    // Gestion fermeture modale
    const closeModalBtn = document.getElementById("modal-close-btn");
    if(closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.comp-card-container')) {
            document.querySelectorAll('.comp-dropdown-menu').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.comp-toggle').forEach(el => el.classList.remove('active'));
        }
        if(e.target == document.getElementById("email-modal")) {
            closeModal();
        }
    });

    // --- 11. SCROLL & MENU ---
    const header = document.querySelector('.app-header');
    const navCapsule = document.querySelector('.nav-capsule');
    const menuIcon = document.querySelector('.menu-icon'); 

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else { header.classList.remove('scrolled'); header.classList.remove('menu-open'); }
        });

        if (menuIcon) {
            menuIcon.addEventListener('click', (e) => { e.stopPropagation(); header.classList.toggle('menu-open'); });
        }

        document.addEventListener('click', (e) => {
            if (header.classList.contains('menu-open') && navCapsule && !navCapsule.contains(e.target)) {
                header.classList.remove('menu-open');
            }
        });
    }
});

// --- HELPER FUNCTIONS ---

function createToggleBtn(container, limit, txtMore) {
    const div = document.createElement("div"); div.className = "load-more-container"; 
    const btn = document.createElement("button"); btn.className = "load-more-btn";
    btn.innerHTML = `<span>↓</span> ${txtMore}`; 
    let expanded = false;
    btn.onclick = () => {
        expanded = !expanded;
        const children = container.children;
        for(let i=0; i<children.length; i++) {
            if(i >= limit) {
                if(expanded) { children[i].classList.remove("hidden-item"); children[i].style.opacity=0; setTimeout(()=>children[i].style.opacity=1, 50); } 
                else { children[i].classList.add("hidden-item"); children[i].style.opacity=0; }
            }
        }
        btn.innerHTML = expanded ? `<span>↑</span> Masquer` : `<span>↓</span> ${txtMore}`;
    };
    div.appendChild(btn); container.parentNode.insertBefore(div, container.nextSibling);
}

function toggleComp(e, id, triggerElement) {
    e.stopPropagation(); 
    const menu = document.getElementById(id); 
    const btn = triggerElement.querySelector('.comp-toggle');
    
    document.querySelectorAll('.comp-dropdown-menu').forEach(el => { if(el.id!==id) el.style.display='none'; });
    document.querySelectorAll('.comp-toggle').forEach(el => { if(el!==btn) el.classList.remove('active'); });
    
    if(menu.style.display==='block') { menu.style.display='none'; if(btn) btn.classList.remove('active'); } 
    else { menu.style.display='block'; if(btn) btn.classList.add('active'); }
}

function togglePDF(id, url) {
    const c = document.getElementById(id);
    if(c.style.display==='block') { c.style.display='none'; c.innerHTML=''; return; }
    document.querySelectorAll('.pdf-container').forEach(el => { el.style.display='none'; el.innerHTML=''; });
    
    const safeUrl = encodeURIComponent(url);
    c.innerHTML = `<iframe src="https://docs.google.com/viewer?url=${safeUrl}&embedded=true" width="100%" height="850px" style="border:none;"></iframe>`;
    c.style.display='block';
}

function toggleCertPDF(id, url) {
    const viewer = document.getElementById(id);
    if (viewer.style.display === 'block') { viewer.style.display = 'none'; viewer.innerHTML = ''; return; }
    document.querySelectorAll('.cert-pdf-viewer').forEach(el => { el.style.display = 'none'; el.innerHTML = ''; });
    
    const safeUrl = encodeURIComponent(url);
    viewer.style.display = 'block';
    viewer.innerHTML = `<iframe src="https://docs.google.com/viewer?url=${safeUrl}&embedded=true" width="100%" height="100%" style="border:none;"></iframe>`;
}

function closeModal() { 
    document.getElementById("email-modal").style.display = "none"; 
}
