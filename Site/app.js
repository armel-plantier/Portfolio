// --- FONCTIONS GLOBALES (Déplacées ici pour éviter l'erreur de scope) ---

const escapeHTML = (str) => {
    if (!str) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

const renderIcon = (iconString) => {
    if (!iconString) return '';
    const lower = iconString.toLowerCase();
    if (lower.endsWith('.svg') || lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg')) {
        return `<img src="${iconString}" alt="icon" class="project-icon-img" style="width: 100%; height: 100%; object-fit: contain;">`;
    } else {
        return iconString;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    
    // --- VERIFICATION CONFIG ---
    if (typeof config === 'undefined') { 
        console.error("ERREUR : config.js n'est pas chargé."); 
        return; 
    }

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

    // --- 3. MODALES (CONTACT, LEGAL & INFO) ---
    function setupModal(triggerId, modalId, closeBtnId) {
        const trigger = document.getElementById(triggerId);
        const modal = document.getElementById(modalId);
        const closeBtn = document.getElementById(closeBtnId);
        if (trigger && modal) {
            trigger.addEventListener("click", (e) => { 
                e.preventDefault(); 
                modal.style.display = "flex"; 
                document.body.style.overflow = "hidden";
            });
        }
        const closeFn = () => { 
            if(modal) modal.style.display = "none"; 
            document.body.style.overflow = "auto";
        };
        if (closeBtn) closeBtn.addEventListener("click", closeFn);
        window.addEventListener("click", (e) => { if(e.target === modal) closeFn(); });
    }

    setupModal("email-trigger", "email-modal", "modal-close-btn");
    setupModal("legal-trigger", "legal-modal", "legal-close-btn");
    setupModal("info-trigger", "info-modal", "info-close-btn");

    // --- GESTION SPECIFIQUE EMAIL/CAPTCHA ---
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

    // --- MODALE PROJET (FERMETURE) ---
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

    // --- 6. COMPETENCES (HEADER TAGS) ---
    const skillsContainer = document.getElementById("skills-section");
    if(skillsContainer && config.skills) {
        config.skills.forEach(s => { const span = document.createElement("span"); span.className = "skill-tag"; span.innerText = s; skillsContainer.appendChild(span); });
    }

    // --- 7. PROJETS (AVEC RECHERCHE ET FILTRE) ---
    const grid = document.getElementById("project-grid");
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = `${window.location.origin}${path}Documents/Projet/`; 
    const PROJECT_LIMIT = 4; 

    if (grid && config.projects) {
        // 1. EXTRAIRE LES TAGS UNIQUES
        const allTags = new Set();
        config.projects.forEach(p => {
            if (p.tags) p.tags.forEach(t => allTags.add(t));
        });

        // 2. CRÉATION DE LA BARRE DE CONTRÔLE (Recherche + Filtre)
        const controlsContainer = document.createElement("div");
        controlsContainer.className = "project-controls";
        
        // Input de recherche
        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.id = "project-search";
        searchInput.className = "project-search-input";
        searchInput.placeholder = "Rechercher par mot-clé (titre, description...)";
        
        // Bouton et Menu Filtre
        const filterWrapper = document.createElement("div");
        filterWrapper.className = "filter-dropdown-wrapper";
        
        const filterBtn = document.createElement("button");
        filterBtn.className = "filter-toggle-btn";
        filterBtn.innerHTML = `Filtrer <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
        
        const filterMenu = document.createElement("div");
        filterMenu.className = "filter-dropdown-menu";
        
        let menuHTML = `<div class="filter-option active" data-tag="all">Tous les projets</div>`;
        allTags.forEach(tag => {
            menuHTML += `<div class="filter-option" data-tag="${escapeHTML(tag)}">${escapeHTML(tag)}</div>`;
        });
        filterMenu.innerHTML = menuHTML;
        
        filterWrapper.appendChild(filterBtn);
        filterWrapper.appendChild(filterMenu);
        
        controlsContainer.appendChild(searchInput);
        controlsContainer.appendChild(filterWrapper);
        
        // Insertion au-dessus de la grille
        grid.parentNode.insertBefore(controlsContainer, grid);

        // Message Aucun résultat
        const noResultMessage = document.createElement("div");
        noResultMessage.className = "no-result-msg";
        noResultMessage.style.display = "none";
        noResultMessage.innerHTML = "<p>Aucun projet ne correspond à votre recherche.</p>";
        grid.parentNode.insertBefore(noResultMessage, grid.nextSibling);

        // 3. VARIABLES D'ÉTAT DES FILTRES
        let currentSearchTerm = "";
        let currentFilterTag = "all";

        // 4. GÉNÉRATION DES CARTES
        config.projects.forEach((proj, index) => {
            const vid = `viewer_${index}`;
            const fullPdfUrl = baseUrl + proj.path;
            const badgeId = `badge-project-${index}`;
            const btnId = `info-btn-${index}`;

            let cardTagsHTML = '';
            if (proj.tags && Array.isArray(proj.tags) && proj.tags.length > 0) {
                cardTagsHTML = '<div class="tags-container">';
                proj.tags.slice(0, 3).forEach(tag => { cardTagsHTML += `<span class="project-tag">${escapeHTML(tag)}</span>`; });
                const remaining = proj.tags.length - 3;
                if (remaining > 0) cardTagsHTML += `<span class="project-tag" style="opacity: 0.7; font-weight: 700;">+${remaining}</span>`;
                cardTagsHTML += '</div>';
            }

            const div = document.createElement("div"); 
            div.className = "project-card interactive-card"; 
            div.setAttribute('data-hint', 'Voir le PDF 📄'); 
            
            // Attributs pour faciliter le filtrage JS
            div.setAttribute('data-title', escapeHTML(proj.title || ""));
            div.setAttribute('data-desc', escapeHTML(proj.description || proj.longDescription || ""));
            div.setAttribute('data-tags', JSON.stringify(proj.tags || [])); 

            if (index >= PROJECT_LIMIT) div.classList.add("hidden-item");

            const renderedIcon = renderIcon(proj.icon);
            div.innerHTML = `
                <span id="${badgeId}" class="badge-container-abs"></span>
                <button class="info-btn" id="${btnId}" title="Plus d'infos" data-no-hint="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                </button>
                <div class="card-header">
                    <div class="icon">${renderedIcon}</div>
                    <div class="meta">
                        <h4>${escapeHTML(proj.title)}</h4>
                        <p>${escapeHTML(proj.description)}</p>
                        ${cardTagsHTML}
                    </div>
                </div>
                <div id="${vid}" class="pdf-container"></div>
            `;
            
            if (config.profile.githubUser && config.profile.githubRepo && proj.path) {
                const apiUrl = `https://api.github.com/repos/${config.profile.githubUser}/${config.profile.githubRepo}/commits?path=Documents/Projet/${proj.path}&page=1&per_page=1`;
                fetch(apiUrl).then(res => res.json()).then(data => {
                    if (data && data.length > 0) {
                        const commitDate = new Date(data[0].commit.author.date);
                        const formattedDate = commitDate.toLocaleDateString('fr-FR');
                        const b = document.getElementById(btnId); if(b) b.setAttribute('data-date', formattedDate);
                        const diffDays = Math.ceil(Math.abs(new Date() - commitDate) / (1000 * 60 * 60 * 24)); 
                        if (diffDays <= 30) { const bad = document.getElementById(badgeId); if(bad) bad.innerHTML = `<span class="new-badge">Nouveau</span>`; }
                    }
                }).catch(() => {});
            }

            div.querySelector('.card-header').addEventListener("click", () => { togglePDF(vid, fullPdfUrl); });
            const infoB = div.querySelector(`#${btnId}`);
            if(infoB) infoB.addEventListener("click", (e) => { e.stopPropagation(); openProjectModal(proj, infoB.getAttribute('data-date') || ""); });

            grid.appendChild(div);
        });
        
        if (config.projects.length > PROJECT_LIMIT) createToggleBtn(grid, PROJECT_LIMIT, "Voir la suite");

        // 5. FONCTION CENTRALE DE FILTRAGE
        const applyFilters = () => {
            const allCards = grid.querySelectorAll(".project-card");
            const loadMoreContainer = grid.parentNode.querySelector(".load-more-container");
            const isFiltering = currentSearchTerm !== "" || currentFilterTag !== "all";
            let visibleCount = 0;

            allCards.forEach((card, i) => {
                const title = (card.getAttribute("data-title") || "").toLowerCase();
                const desc = (card.getAttribute("data-desc") || "").toLowerCase();
                const tagsData = JSON.parse(card.getAttribute("data-tags") || "[]");
                const tagsLower = tagsData.map(t => t.toLowerCase());
                
                // Vérifications
                const matchesSearch = title.includes(currentSearchTerm) || desc.includes(currentSearchTerm) || tagsLower.some(t => t.includes(currentSearchTerm));
                const matchesTag = currentFilterTag === "all" || tagsData.includes(currentFilterTag);
                
                // Reset état
                card.style.display = ""; 
                card.classList.remove("hidden-item");

                if (matchesSearch && matchesTag) {
                    visibleCount++;
                    // Si on ne filtre pas, on respecte la limite de pagination de base
                    if (!isFiltering && i >= PROJECT_LIMIT) {
                        const isExpanded = loadMoreContainer && loadMoreContainer.querySelector('button').innerText.includes('Masquer');
                        if(!isExpanded) card.classList.add("hidden-item");
                    } else {
                        card.style.display = "flex"; 
                    }
                } else {
                    card.style.display = "none";
                }
            });

            // Gérer le message "Aucun résultat"
            noResultMessage.style.display = (visibleCount === 0) ? "block" : "none";

            // Masquer "Voir la suite" si on est en train de rechercher/filtrer
            if (loadMoreContainer) {
                loadMoreContainer.style.display = (isFiltering || visibleCount === 0) ? "none" : "flex";
            }
        };

        // 6. ÉVÈNEMENTS INTERFACE
        searchInput.addEventListener("input", (e) => {
            currentSearchTerm = e.target.value.toLowerCase();
            applyFilters();
        });

        filterBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            filterMenu.classList.toggle("show");
            filterBtn.classList.toggle("active");
        });

        filterMenu.addEventListener("click", (e) => {
            if (e.target.classList.contains("filter-option")) {
                currentFilterTag = e.target.dataset.tag;
                
                // MAJ Visuelle du menu
                filterMenu.querySelectorAll(".filter-option").forEach(el => el.classList.remove("active"));
                e.target.classList.add("active");
                
                // MAJ du bouton
                filterBtn.innerHTML = currentFilterTag === "all" 
                    ? `Filtrer <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>` 
                    : `Tag: ${currentFilterTag} <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

                filterMenu.classList.remove("show");
                applyFilters();
            }
        });

        // Fermer le menu si clic à l'extérieur
        window.addEventListener("click", (e) => {
            if (!filterWrapper.contains(e.target)) {
                filterMenu.classList.remove("show");
                filterBtn.classList.remove("active", filterMenu.classList.contains("show"));
            }
        });
    }

    // --- 8. PARCOURS (AVEC POINTS VIOLETS AUTOMATIQUES) ---
    const expList = document.getElementById("exp-list");
    const EXP_LIMIT = 5;
    if(expList && config.experiences) {
        config.experiences.forEach((exp, index) => {
            const li = document.createElement("li"); li.className = "timeline-item";
            if (index >= EXP_LIMIT) li.classList.add("hidden-item");

            const lines = exp.description.split('\n');
            const listHtml = lines.map(line => {
                const cleanLine = line.trim();
                if (!cleanLine) return '';
                return `
                    <li style="display: flex; align-items: flex-start; margin-bottom: 6px;">
                        <span style="display: inline-block; min-width: 6px; height: 6px; background-color: #6366f1; border-radius: 50%; margin-top: 9px; margin-right: 12px; box-shadow: 0 0 5px rgba(99, 102, 241, 0.5);"></span>
                        <span style="line-height: 1.6;">${escapeHTML(cleanLine)}</span>
                    </li>`;
            }).join('');

            li.innerHTML = `
                <span class="timeline-date" style="color:#6366f1; font-weight:bold;">${escapeHTML(exp.date)}</span>
                <h4 class="timeline-title" style="margin-top:5px; margin-bottom:10px;">${escapeHTML(exp.role)} <span style="font-weight:400;opacity:0.8; font-size: 0.9em;">@ ${escapeHTML(exp.company)}</span></h4>
                <ul style="list-style: none; padding: 0; margin: 0; color: var(--text-secondary);">${listHtml}</ul>
            `;
            expList.appendChild(li);
        });
        if (config.experiences.length > EXP_LIMIT) createToggleBtn(expList, EXP_LIMIT, "Voir la suite");
    }

    // --- 9. COMPETENCES (SANS POINTS BLANCS) ---
    const compList = document.getElementById("comp-list");
    const COMP_LIMIT = 5;
    if(compList && config.competences) {
        config.competences.forEach((comp, index) => {
            const li = document.createElement("li"); li.className = "comp-card-container"; 
            if (index >= COMP_LIMIT) li.classList.add("hidden-item");
            const dropId = `comp-drop-${index}`;
            const details = comp.details.map(d => `<li>${escapeHTML(d)}</li>`).join(''); 
            const renderedIcon = renderIcon(comp.icon);

            li.innerHTML = `
                <div class="comp-header">
                    <div class="cert-icon-box">${renderedIcon}</div>
                    <span class="cert-name">${escapeHTML(comp.name)}</span>
                    <button class="cert-btn comp-toggle">▼</button>
                </div>
                <ul id="${dropId}" class="comp-dropdown-menu" style="display:none; list-style: none;">${details}</ul>
            `;
            const h = li.querySelector('.comp-header');
            h.addEventListener("click", () => { toggleComp(dropId, h); });
            compList.appendChild(li);
        });
        if (config.competences.length > COMP_LIMIT) createToggleBtn(compList, COMP_LIMIT, "Voir la suite");
    }

    // --- 10. CERTIFICATIONS ---
    const certSection = document.getElementById("certifications"); 
    const certList = document.getElementById("cert-list");
    const CERT_LIMIT = 5;
    const certBaseUrl = `${window.location.origin}${path}Documents/Certifs/`; 
    
    // 1. CRÉATION DU LECTEUR GLOBAL (Injecté avant la liste)
    let globalViewer = document.getElementById("global-cert-viewer");
    if (!globalViewer && certList) {
        globalViewer = document.createElement("div");
        globalViewer.id = "global-cert-viewer";
        certList.parentNode.insertBefore(globalViewer, certList);
    }

    if(certList && config.certifications) {
        config.certifications.forEach((cert, index) => {
            const li = document.createElement("li"); li.className = "cert-card-container";
            if (index >= CERT_LIMIT) li.classList.add("hidden-item");
            
            const issuer = cert.issuer ? cert.issuer : "Certification"; 
            const fullPdfUrl = cert.pdf ? certBaseUrl + cert.pdf : null;
            
            // Icône
            const iconDisplay = cert.icon ? renderIcon(cert.icon) : "🏆"; 
            
            let buttonsHtml = '';
            if (cert.url) buttonsHtml += `<a href="${cert.url}" target="_blank" class="cert-btn link-btn" title="Site officiel">🔗</a>`;
            
            li.innerHTML = `
                <div class="cert-header-row">
                    <div class="cert-icon-box">${iconDisplay}</div>
                    <div class="cert-info">
                        <span class="cert-name">${escapeHTML(cert.name)}</span>
                        <span class="cert-issuer">${escapeHTML(issuer)}</span>
                    </div>
                    <div class="cert-actions">${buttonsHtml}</div>
                </div>
            `;
            
            if (cert.pdf) {
                const act = li.querySelector('.cert-actions');
                const pBtn = document.createElement("button"); 
                pBtn.className = "cert-btn pdf-btn"; 
                pBtn.innerHTML = "📄";
                pBtn.addEventListener("click", (e) => { 
                    document.querySelectorAll('.pdf-btn').forEach(b => b.style.background = '');
                    pBtn.style.background = 'var(--primary)';
                    pBtn.style.color = 'white';
                    toggleGlobalPDF(fullPdfUrl); 
                });
                act.appendChild(pBtn);
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

    // --- 13. GITHUB API FOOTER ---
    const updateEl = document.getElementById("last-update");
    if(updateEl && config.profile.githubUser && config.profile.githubRepo) {
        fetch(`https://api.github.com/repos/${config.profile.githubUser}/${config.profile.githubRepo}`).then(r => r.json()).then(d => {
            const date = new Date(d.pushed_at);
            updateEl.innerHTML = `Maj : ${date.toLocaleDateString('fr-FR')} ${date.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}`;
        }).catch(() => { updateEl.innerText = "System Ready"; });
    }

    // --- 14. COMPTEUR DE VUES ---
    const viewCountEl = document.getElementById("view-count");
    if (viewCountEl && config.profile.githubUser) {
        const namespace = config.profile.githubUser.replace(/[^a-zA-Z0-9]/g, '');
        fetch(`https://api.countapi.xyz/hit/${namespace}/portfolio-visits`)
            .then(res => res.json()).then(data => { viewCountEl.innerHTML = `👁️ ${data.value} Vues`; })
            .catch(() => { viewCountEl.style.display = "none"; });
    }
    
    initCursorHint();

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = "none");
            document.querySelectorAll('.pdf-container, .cert-pdf-viewer').forEach(el => { el.style.display='none'; el.innerHTML=''; });
            document.querySelectorAll('.comp-dropdown-menu').forEach(el => el.style.display='none');
            document.querySelectorAll('.expanded').forEach(el => el.classList.remove('expanded'));
            document.querySelectorAll('.comp-toggle').forEach(el => el.classList.remove('active'));
        }
        if ((e.key === "d" || e.key === "D") && e.target.tagName !== 'INPUT') { document.getElementById("theme-toggle").click(); }
    });
});

// --- FONCTIONS AUXILIAIRES ---
function initCursorHint() {
    let hintEl = document.getElementById("cursor-hint");
    if (!hintEl) { hintEl = document.createElement("div"); hintEl.id = "cursor-hint"; document.body.appendChild(hintEl); }
    document.addEventListener("mousemove", (e) => { hintEl.style.transform = `translate(${e.clientX + 15}px, ${e.clientY + 15}px)`; });
    document.querySelectorAll('.interactive-card').forEach(el => {
        el.addEventListener("mouseenter", () => { if (!el.classList.contains('expanded')) { hintEl.innerText = el.getAttribute('data-hint') || "Voir"; hintEl.classList.add("visible"); } });
        el.addEventListener("mousemove", (e) => { if (e.target.closest('.info-btn') || el.classList.contains('expanded')) hintEl.classList.remove("visible"); else hintEl.classList.add("visible"); });
        el.addEventListener("mouseleave", () => hintEl.classList.remove("visible"));
        el.addEventListener("click", () => hintEl.classList.remove("visible"));
    });
}

function openProjectModal(proj, dateStr = "") {
    const modal = document.getElementById("project-modal");
    const titleEl = document.getElementById("modal-project-title");
    const descEl = document.getElementById("modal-project-desc");
    const tagsEl = document.getElementById("modal-project-tags");
    if(modal && titleEl && descEl && tagsEl) {
        titleEl.innerText = proj.title;
        let dateHtml = dateStr ? `<div class="modal-date-display" style="margin-bottom:10px; font-size:0.8rem; opacity:0.7;">📅 Ajouté le : ${dateStr}</div>` : "";
        descEl.innerHTML = dateHtml + (proj.longDescription ? proj.longDescription : proj.description);
        tagsEl.innerHTML = (proj.tags || []).map(t => `<span class="project-tag">${escapeHTML(t)}</span>`).join('') || "Aucun tag";
        modal.style.display = "flex";
    }
}

function togglePDF(id, url) {
    const c = document.getElementById(id);
    const card = c.closest('.project-card'); 
    if (c.style.display === 'block') { c.style.display = 'none'; c.innerHTML = ''; if(card) card.classList.remove('expanded'); return; }
    document.querySelectorAll('.pdf-container').forEach(el => { el.style.display = 'none'; el.innerHTML = ''; const p = el.closest('.project-card'); if(p) p.classList.remove('expanded'); });
    c.innerHTML = `<iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true" width="100%" height="600px" style="border:none;"></iframe>`;
    c.style.display = 'block';
    if(card) { card.classList.add('expanded'); setTimeout(() => { window.scrollTo({top: card.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth'}); }, 100); }
}

function toggleComp(id, headerEl) {
    const menu = document.getElementById(id);
    const btn = headerEl.querySelector('.comp-toggle'); 
    document.querySelectorAll('.comp-dropdown-menu').forEach(el => { if (el.id !== id) el.style.display = 'none'; });
    document.querySelectorAll('.comp-toggle').forEach(el => { if (el !== btn) el.classList.remove('active'); });
    const isOpened = menu.style.display === 'block';
    menu.style.display = isOpened ? 'none' : 'block';
    if(btn) isOpened ? btn.classList.remove('active') : btn.classList.add('active');
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
        Array.from(container.children).forEach((child, i) => {
            if (i >= limit) {
                if (expanded) { child.classList.remove("hidden-item"); child.style.opacity = 0; setTimeout(() => child.style.opacity = 1, 50); }
                else { child.classList.add("hidden-item"); child.style.opacity = 0; }
            }
        });
        btn.innerHTML = expanded ? `<span>↑</span> Masquer` : `<span>↓</span> ${txtMore}`;
    });
    div.appendChild(btn);
    container.parentNode.insertBefore(div, container.nextSibling);
}

function toggleGlobalPDF(url) {
    const viewer = document.getElementById("global-cert-viewer");
    
    if (!viewer) return;

    const encodedUrl = encodeURIComponent(url);
    const currentIframe = viewer.querySelector('iframe');

    const closeViewer = () => {
        viewer.style.display = 'none';
        viewer.innerHTML = ''; 
        document.querySelectorAll('.pdf-btn').forEach(b => { 
            b.style.background = ''; 
            b.style.color = ''; 
        });
    };

    if (viewer.style.display === 'block' && currentIframe && currentIframe.src.includes(encodedUrl)) {
        closeViewer();
        return;
    }

    viewer.style.display = 'block';
    
    viewer.innerHTML = `
        <button id="btn-close-viewer" class="global-close-btn" title="Fermer le document">×</button>
        <iframe src="https://docs.google.com/viewer?url=${encodedUrl}&embedded=true"></iframe>
    `;

    const closeBtn = document.getElementById("btn-close-viewer");
    if (closeBtn) {
        closeBtn.addEventListener("click", closeViewer);
    }

    const headerOffset = 120;
    const elementPosition = viewer.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
}
