document.addEventListener("DOMContentLoaded", () => {
    
    // Vérification de sécurité de la config
    if (typeof config === 'undefined') { console.error("ERREUR CRITIQUE : Fichier de configuration introuvable."); return; }

    // --- HELPER : Création sécurisée d'éléments (Remplace innerHTML) ---
    const createElement = (tag, className, text = null) => {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (text) el.textContent = text;
        return el;
    };

    // --- HELPER : Validation des URLs (Anti-Javascript Injection) ---
    const safeHref = (url) => {
        if (!url) return "#";
        if (url.trim().toLowerCase().startsWith("javascript:")) return "#";
        return url;
    };

    // --- 1. THEME ---
    const themeBtn = document.getElementById("theme-toggle");
    const body = document.body;
    
    // Application sécurisée du thème stocké
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light") {
        body.classList.add("light-mode");
        if(themeBtn) themeBtn.textContent = "🌙"; 
    }
    
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            body.classList.toggle("light-mode");
            const isLight = body.classList.contains("light-mode");
            themeBtn.textContent = isLight ? "🌙" : "☀️"; 
            localStorage.setItem("theme", isLight ? "light" : "dark");
        });
    }

    // --- 2. PROFIL ---
    document.title = `${config.profile.name} | Portfolio`;
    
    const avatarEl = document.getElementById("profile-avatar");
    if(avatarEl) avatarEl.src = safeHref(config.profile.avatar); // Sécurisation source image
    
    const faviconEl = document.getElementById("favicon-link");
    if(faviconEl && config.profile.favicon) {
        // Pour les favicons data-uri, on laisse passer, sinon on nettoie
        faviconEl.href = config.profile.favicon.startsWith("data:") ? config.profile.favicon : safeHref(config.profile.favicon);
    }

    // Utilisation de textContent pour éviter l'injection HTML
    const setSafeText = (id, text) => {
        const el = document.getElementById(id);
        if(el) el.textContent = text;
    };

    setSafeText("profile-name", config.profile.name);
    setSafeText("profile-status", config.profile.status);
    setSafeText("profile-bio", config.profile.bio);
    
    const setupSocialLink = (id, url) => {
        const el = document.getElementById(id);
        if(el) {
            el.href = safeHref(url);
            el.rel = "noopener noreferrer"; // Sécurité Tabnabbing
        }
    };
    setupSocialLink("link-github", config.social.github);
    setupSocialLink("link-linkedin", config.social.linkedin);
    
    const footerCopy = document.getElementById("footer-copy");
    if(footerCopy) footerCopy.textContent = `© ${new Date().getFullYear()} ${config.profile.name}.`;

    // --- 3. NAVIGATION ---
    const navList = document.getElementById("nav-list");
    if(navList && config.navigation) {
        config.navigation.forEach(item => {
            const li = createElement("li");
            const a = createElement("a", null, item.title);
            a.href = safeHref(item.link);
            
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
            skillsContainer.appendChild(createElement("span", "skill-tag", s));
        });
    }

    // --- 5. PROJETS (CONSTRUCTION DOM SÉCURISÉE) ---
    const grid = document.getElementById("project-grid");
    // Calcul sécurisé du chemin de base
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = `${window.location.origin}${path}Documents/`; 
    const PROJECT_LIMIT = 4; 

    // Helper Iframe PDF sécurisé
    const createPdfViewer = (url) => {
        const iframe = createElement("iframe");
        iframe.src = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
        iframe.style.width = "100%";
        iframe.style.height = "850px";
        iframe.style.border = "none";
        // Sandbox pour limiter les actions de l'iframe (sécurité accrue)
        iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-popups");
        return iframe;
    };

    if (grid && config.projects) {
        config.projects.forEach((proj, index) => {
            const div = createElement("div", "project-card");
            if (index >= PROJECT_LIMIT) div.classList.add("hidden-item");
            
            // Badge Nouveau
            if(proj.isNew) {
                div.appendChild(createElement("span", "new-badge", "Nouveau"));
            }

            // Header Card
            const header = createElement("div", "card-header");
            const iconDiv = createElement("div", "icon", proj.icon);
            
            const metaDiv = createElement("div", "meta");
            metaDiv.appendChild(createElement("h4", null, proj.title));
            metaDiv.appendChild(createElement("p", null, proj.description));

            header.appendChild(iconDiv);
            header.appendChild(metaDiv);

            // Container PDF
            const pdfContainer = createElement("div", "pdf-container");
            pdfContainer.style.display = "none";

            // Event Listener (Fermeture de Scope)
            header.addEventListener("click", () => {
                const isOpen = pdfContainer.style.display === 'block';
                
                // Reset tous les autres
                document.querySelectorAll('.pdf-container').forEach(el => {
                    el.style.display = 'none';
                    el.innerHTML = ''; // Nettoyage mémoire
                });

                if (!isOpen) {
                    const fullPdfUrl = baseUrl + proj.path;
                    pdfContainer.appendChild(createPdfViewer(fullPdfUrl));
                    pdfContainer.style.display = 'block';
                }
            });

            div.appendChild(header);
            div.appendChild(pdfContainer);
            grid.appendChild(div);
        });
        
        if (config.projects.length > PROJECT_LIMIT) createToggleBtn(grid, PROJECT_LIMIT, "Voir la suite");
    }

    // --- 6. PARCOURS ---
    const expList = document.getElementById("exp-list");
    const EXP_LIMIT = 5;
    
    if(expList && config.experiences) {
        config.experiences.forEach((exp, index) => {
            const li = createElement("li", "timeline-item");
            if (index >= EXP_LIMIT) li.classList.add("hidden-item");
            
            li.appendChild(createElement("span", "timeline-date", exp.date));
            
            const h4 = createElement("h4", "timeline-title");
            // Construction fine pour éviter innerHTML même ici
            h4.textContent = exp.role + " ";
            const spanCompany = createElement("span", null, `@ ${exp.company}`);
            spanCompany.style.fontWeight = "400";
            spanCompany.style.opacity = "0.8";
            h4.appendChild(spanCompany);
            
            li.appendChild(h4);
            li.appendChild(createElement("p", "timeline-desc", exp.description));
            
            expList.appendChild(li);
        });
        if (config.experiences.length > EXP_LIMIT) createToggleBtn(expList, EXP_LIMIT, "Voir la suite");
    }

    // --- 7. COMPETENCES ---
    const compList = document.getElementById("comp-list");
    const COMP_LIMIT = 5;

    if(compList && config.competences) {
        config.competences.forEach((comp, index) => {
            const li = createElement("li", "comp-card-container");
            if (index >= COMP_LIMIT) li.classList.add("hidden-item");
            
            // Header
            const header = createElement("div", "comp-header");
            header.appendChild(createElement("div", "cert-icon-box", comp.icon));
            header.appendChild(createElement("span", "cert-name", comp.name));
            const arrowBtn = createElement("button", "cert-btn comp-toggle", "▼");
            header.appendChild(arrowBtn);

            // Dropdown List
            const ul = createElement("ul", "comp-dropdown-menu");
            ul.style.display = "none";
            
            comp.details.forEach(detail => {
                const itemLi = createElement("li", null, detail);
                // On ajoute manuellement la puce ou style spécifique si besoin
                // Mais CSS ::before gère déjà les puces colorées
                ul.appendChild(itemLi);
            });

            // Logic Toggle
            header.addEventListener("click", (e) => {
                e.stopPropagation();
                const isOpen = ul.style.display === 'block';

                // Reset
                document.querySelectorAll('.comp-dropdown-menu').forEach(el => el.style.display = 'none');
                document.querySelectorAll('.comp-toggle').forEach(el => el.classList.remove('active'));

                if(!isOpen) {
                    ul.style.display = 'block';
                    arrowBtn.classList.add('active');
                }
            });

            li.appendChild(header);
            li.appendChild(ul);
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
            const li = createElement("li", "cert-card-container");
            if (index >= CERT_LIMIT) li.classList.add("hidden-item");

            const row = createElement("div", "cert-header-row");
            
            // Icon & Info
            row.appendChild(createElement("div", "cert-icon-box", "🏆"));
            const info = createElement("div", "cert-info");
            info.appendChild(createElement("span", "cert-name", cert.name));
            info.appendChild(createElement("span", "cert-issuer", cert.issuer || "Certification"));
            row.appendChild(info);

            // Actions
            const actions = createElement("div", "cert-actions");
            
            if (cert.url) {
                const linkBtn = createElement("a", "cert-btn link-btn", "🔗");
                linkBtn.href = safeHref(cert.url);
                linkBtn.target = "_blank";
                linkBtn.rel = "noopener noreferrer"; // Sécurité
                linkBtn.title = "Voir le site officiel";
                actions.appendChild(linkBtn);
            }

            // Viewer PDF Container
            const pdfViewer = createElement("div", "cert-pdf-viewer");
            pdfViewer.style.display = "none";

            if (cert.pdf) {
                const pdfBtn = createElement("button", "cert-btn pdf-btn", "📄");
                pdfBtn.title = "Voir le diplôme";
                pdfBtn.addEventListener("click", () => {
                    const isOpen = pdfViewer.style.display === 'block';
                    
                    document.querySelectorAll('.cert-pdf-viewer').forEach(el => {
                        el.style.display = 'none';
                        el.innerHTML = '';
                    });

                    if(!isOpen) {
                        const fullPdfUrl = certBaseUrl + cert.pdf;
                        // Réutilisation de la fonction iframe sécurisée, style height ajusté
                        const iframe = createPdfViewer(fullPdfUrl);
                        iframe.style.height = "100%";
                        pdfViewer.appendChild(iframe);
                        pdfViewer.style.display = 'block';
                    }
                });
                actions.appendChild(pdfBtn);
            }

            row.appendChild(actions);
            li.appendChild(row);
            li.appendChild(pdfViewer);
            certList.appendChild(li);
        });
        if (config.certifications.length > CERT_LIMIT) createToggleBtn(certList, CERT_LIMIT, "Voir la suite");
    }

    // --- 9. TYPEWRITER & EMAIL (OBFUSCATION BASE64) ---
    const textEl = document.getElementById("typewriter-area");
    if(textEl && config.profile.typewriterText) {
        const txt = config.profile.typewriterText; 
        textEl.textContent = ""; 
        let i=0;
        function type() { 
            if(i < txt.length) { 
                textEl.textContent += txt.charAt(i); // Safe text addition
                i++; 
                setTimeout(type, 50); 
            } 
        }
        setTimeout(type, 500);
    }

    const emailTrigger = document.getElementById("email-trigger");
    const emailModal = document.getElementById("email-modal");
    
    if(emailTrigger && emailModal) {
        emailTrigger.addEventListener("click", function(e) {
            e.preventDefault();
            const emailSpan = document.getElementById("email-text");
            
            // SECURITE : Décodage Base64 à la volée
            // Les robots qui lisent le code source ne voient pas l'email.
            // L'email n'apparaît dans le DOM que si l'utilisateur clique.
            try {
                if(config.profile.emailEncoded) {
                    const decoded = atob(config.profile.emailEncoded);
                    emailSpan.textContent = decoded;
                    emailModal.style.display = "flex";
                } else {
                    emailSpan.textContent = "Email non configuré";
                }
            } catch (err) {
                console.error("Erreur de décodage email", err);
                emailSpan.textContent = "Erreur d'affichage";
            }
        });

        // Fermeture Modal
        const closeBtn = emailModal.querySelector('.close-btn');
        if(closeBtn) closeBtn.addEventListener('click', () => emailModal.style.display = "none");
        
        window.addEventListener('click', (e) => {
            if(e.target === emailModal) emailModal.style.display = "none";
        });
    }

    // Click Outside pour fermer les compétences
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.comp-card-container')) {
            document.querySelectorAll('.comp-dropdown-menu').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.comp-toggle').forEach(el => el.classList.remove('active'));
        }
    });

    // --- 10. SCROLL & MENU ---
    const header = document.querySelector('.app-header');
    const navCapsule = document.querySelector('.nav-capsule');
    const menuIcon = document.querySelector('.menu-icon'); 

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else { header.classList.remove('scrolled'); header.classList.remove('menu-open'); }
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

    // --- LOAD MORE FUNCTION (Interne au scope) ---
    function createToggleBtn(container, limit, txtMore) {
        const div = createElement("div", "load-more-container");
        const btn = createElement("button", "load-more-btn");
        
        // Gestion sécurisée du contenu du bouton (Texte + flèche)
        const updateBtnText = (expanded) => {
            btn.textContent = ""; // Clear
            const arrow = createElement("span", null, expanded ? "↑" : "↓");
            btn.appendChild(arrow);
            btn.appendChild(document.createTextNode(expanded ? " Masquer" : ` ${txtMore}`));
        };
        
        updateBtnText(false);

        let expanded = false;
        btn.onclick = () => {
            expanded = !expanded;
            const children = container.children;
            for(let i=0; i<children.length; i++) {
                if(i >= limit) {
                    if(expanded) { 
                        children[i].classList.remove("hidden-item"); 
                        children[i].style.opacity = 0; 
                        setTimeout(() => children[i].style.opacity = 1, 50); 
                    } 
                    else { 
                        children[i].classList.add("hidden-item"); 
                        children[i].style.opacity = 0; 
                    }
                }
            }
            updateBtnText(expanded);
        };
        div.appendChild(btn); 
        container.parentNode.insertBefore(div, container.nextSibling);
    }
});
