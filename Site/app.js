// --- FONCTIONS GLOBALES ---


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
    
    // --- SCROLL REVEAL (Animation d'apparition) ---
    const sections = document.querySelectorAll('.section-wrapper');
    sections.forEach(sec => sec.classList.add('reveal'));
    const revealSections = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        document.querySelectorAll('.reveal').forEach(reveal => {
            if (reveal.getBoundingClientRect().top < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealSections);
    revealSections(); // Déclenchement initial

    // --- VERIFICATION CONFIG ---
    if (typeof config === 'undefined') { 
        console.error("ERREUR : config.js n'est pas chargé."); 
        return; 
    }

    // --- 1. THEME ---
    const themeBtn = document.getElementById("theme-toggle");
    const body = document.body;
    
    // Si aucun thème enregistré, on suit la préférence système
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        if (prefersLight) {
            body.classList.add("light-mode");
            if(themeBtn) themeBtn.innerText = "🌙";
        }
    } else if (savedTheme === "light") {
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
    setupModal("rss-trigger", "rss-modal", "rss-close-btn");
    
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

    // --- 7. PROJETS (AVEC RECHERCHE ET FILTRE) ---
    const grid = document.getElementById("project-grid");
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = `https://raw.githubusercontent.com/${config.profile.githubUser}/${config.profile.githubRepo}/main/Documents/Projet/`;
    const PROJECT_LIMIT = 4; 

    if (grid && config.projects) {
        // BADGE COMPTEUR
        const projTitle = document.querySelector('#projets h3');
        if (projTitle) {
            const badge = document.createElement('span');
            badge.className = 'section-count-badge';
            badge.textContent = config.projects.length;
            projTitle.appendChild(badge);
        }

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
            div.setAttribute('data-desc', escapeHTML(proj.longDescription || ""));
            div.setAttribute('data-tags', JSON.stringify(proj.tags || [])); 

            if (index >= PROJECT_LIMIT) div.classList.add("hidden-item");

            const renderedIcon = renderIcon(proj.icon);
            div.innerHTML = `
                <span id="${badgeId}" class="badge-container-abs"></span>
                <button class="info-btn" id="${btnId}" title="Plus d'infos" data-no-hint="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                </button>
                <button class="copy-link-btn" data-no-hint="true" title="Copier le lien">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                </button>
                <div class="card-header">
                    <div class="icon">${renderedIcon}</div>
                    <div class="meta">
                        <h4>${escapeHTML(proj.title)}</h4>
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
                    }
                }).catch(() => {});
            }

            div.querySelector('.card-header').addEventListener("click", () => { togglePDF(vid, fullPdfUrl); });
            div.querySelector('.copy-link-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                const slug = proj.title
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // accents → ascii
                    .toLowerCase()
                    .replace(/[''\(\)]/g, '')       // apostrophes, parenthèses
                    .replace(/\s+/g, '-')            // espaces → tirets
                    .replace(/[^a-z0-9\-]/g, '')    // reste → supprimé
                    .replace(/-+/g, '-')              // tirets multiples → un seul
                    .replace(/^-|-$/g, '');           // tirets en début/fin
                const link = window.location.origin + '/projet-technova/' + slug;
                copyToClipboard(link, e.currentTarget);
            });
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


    // --- GITHUB AUTH HEADERS ---
    const ghHeaders = config.githubToken
        ? { headers: { 'Authorization': 'token ' + config.githubToken } }
        : {};

    // --- PROCEDURES (Chargement statique depuis config.procedures) ---
    const procedureGrid = document.getElementById('procedure-grid');
    const PROC_LIMIT = 4;
    const PROC_BASE_URL = `https://raw.githubusercontent.com/${config.profile.githubUser}/${config.profile.githubRepo}/main/Documents/Proc%C3%A9dures/`;

    if (procedureGrid && config.procedures && config.procedures.length > 0) {
        procedureGrid.innerHTML = '';

        // BADGE COMPTEUR
        const procTitle = document.querySelector('#procedures h3');
        if (procTitle) {
            const badge = document.createElement('span');
            badge.className = 'section-count-badge';
            badge.textContent = config.procedures.length;
            procTitle.appendChild(badge);
        }

        // --- CONTRÔLES : recherche + filtre par tag ---
        const allProcTags = new Set();
        config.procedures.forEach(p => { if (p.tags) p.tags.forEach(t => allProcTags.add(t)); });

        const procControlsContainer = document.createElement('div');
        procControlsContainer.className = 'project-controls';

        const procSearchInput = document.createElement('input');
        procSearchInput.type = 'text';
        procSearchInput.id = 'proc-search';
        procSearchInput.className = 'project-search-input';
        procSearchInput.placeholder = 'Rechercher une procédure...';

        const procFilterWrapper = document.createElement('div');
        procFilterWrapper.className = 'filter-dropdown-wrapper';

        const procFilterBtn = document.createElement('button');
        procFilterBtn.className = 'filter-toggle-btn';
        procFilterBtn.innerHTML = `Filtrer <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

        const procFilterMenu = document.createElement('div');
        procFilterMenu.className = 'filter-dropdown-menu';

        let procMenuHTML = `<div class="filter-option active" data-tag="all">Toutes les procédures</div>`;
        allProcTags.forEach(tag => {
            procMenuHTML += `<div class="filter-option" data-tag="${escapeHTML(tag)}">${escapeHTML(tag)}</div>`;
        });
        procFilterMenu.innerHTML = procMenuHTML;

        procFilterWrapper.appendChild(procFilterBtn);
        procFilterWrapper.appendChild(procFilterMenu);
        procControlsContainer.appendChild(procSearchInput);
        procControlsContainer.appendChild(procFilterWrapper);

        const procNoResult = document.createElement('p');
        procNoResult.className = 'no-results-message';
        procNoResult.style.cssText = 'display:none; color:var(--muted); font-style:italic; padding: 20px 0;';
        procNoResult.textContent = 'Aucune procédure ne correspond à votre recherche.';

        procedureGrid.parentNode.insertBefore(procControlsContainer, procedureGrid);
        procedureGrid.parentNode.insertBefore(procNoResult, procedureGrid.nextSibling);

        let currentProcSearch = '';
        let currentProcTag = 'all';

        function filterProcedures() {
            const allCards = procedureGrid.querySelectorAll('.project-card');
            const isFiltering = currentProcSearch || currentProcTag !== 'all';
            let visibleCount = 0;
            allCards.forEach(card => {
                const title = (card.querySelector('h4')?.textContent || '').toLowerCase();
                const desc = (card.getAttribute('data-desc') || '').toLowerCase();
                const tagsData = JSON.parse(card.getAttribute('data-tags') || '[]');
                const tagsLower = tagsData.map(t => t.toLowerCase());
                const matchesSearch = !currentProcSearch || title.includes(currentProcSearch) || desc.includes(currentProcSearch) || tagsLower.some(t => t.includes(currentProcSearch));
                const matchesTag = currentProcTag === 'all' || tagsData.includes(currentProcTag);
                const matches = matchesSearch && matchesTag;
                // Si on filtre : afficher toutes les cartes qui matchent (ignorer hidden-item)
                // Si on ne filtre plus : remettre hidden-item sur les cartes au-delà de la limite
                if (isFiltering) {
                    card.style.display = matches ? '' : 'none';
                } else {
                    card.style.display = '';
                    if (parseInt(card.dataset.index) >= PROC_LIMIT) card.classList.add('hidden-item');
                    else card.classList.remove('hidden-item');
                }
                if (matches && (!card.classList.contains('hidden-item') || isFiltering)) visibleCount++;
            });
            procNoResult.style.display = visibleCount === 0 ? 'block' : 'none';
            // Cacher le bouton "Voir la suite" pendant la recherche/filtre
            const loadMoreBtn = procedureGrid.parentNode.querySelector('.load-more-container');
            if (loadMoreBtn) loadMoreBtn.style.display = isFiltering ? 'none' : '';
        }

        procSearchInput.addEventListener('input', (e) => {
            currentProcSearch = e.target.value.toLowerCase().trim();
            filterProcedures();
        });

        procFilterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            procFilterMenu.classList.toggle('show');
            procFilterBtn.classList.toggle('active');
        });

        procFilterMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-option')) {
                currentProcTag = e.target.dataset.tag;
                filterProcedures();
                procFilterMenu.querySelectorAll('.filter-option').forEach(el => el.classList.remove('active'));
                e.target.classList.add('active');
                procFilterBtn.innerHTML = currentProcTag === 'all'
                    ? `Filtrer <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>`
                    : `${escapeHTML(currentProcTag)} <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
                procFilterMenu.classList.remove('show');
                procFilterBtn.classList.remove('active');
            }
        });

        document.addEventListener('click', (e) => {
            if (!procFilterWrapper.contains(e.target)) {
                procFilterMenu.classList.remove('show');
                procFilterBtn.classList.remove('active');
            }
        });

        // --- RENDU DES CARTES ---
        config.procedures.forEach((proc, index) => {
            const fullPdfUrl = PROC_BASE_URL + encodeURIComponent(proc.path);
            const vid = `proc_viewer_${index}`;
            const btnId = `proc-info-btn-${index}`;
            const badgeId = `badge-proc-${index}`;

            const renderedIcon = proc.icon ? renderIcon(proc.icon) : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="48" height="48"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`;

            let cardTagsHTML = '';
            if (proc.tags && proc.tags.length > 0) {
                cardTagsHTML = '<div class="tags-container">';
                proc.tags.slice(0, 3).forEach(tag => { cardTagsHTML += `<span class="project-tag">${escapeHTML(tag)}</span>`; });
                cardTagsHTML += '</div>';
            }

            const div = document.createElement('div');
            div.className = 'project-card interactive-card';
            div.setAttribute('data-hint', 'Voir le PDF 📄');
            div.setAttribute('data-tags', JSON.stringify(proc.tags || []));
            div.setAttribute('data-desc', escapeHTML(proc.longDescription || proc.description || ""));
            div.dataset.index = index;
            if (index >= PROC_LIMIT) div.classList.add('hidden-item');

            div.innerHTML = `
                <span id="${badgeId}" class="badge-container-abs"></span>
                <button class="info-btn" id="${btnId}" title="Plus d'infos" data-no-hint="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                </button>
                <button class="copy-link-btn proc-copy-btn" data-no-hint="true" title="Copier le lien">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                </button>
                <div class="card-header">
                    <div class="icon">${renderedIcon}</div>
                    <div class="meta">
                        <h4>${escapeHTML(proc.title)}</h4>
                        ${cardTagsHTML}
                    </div>
                </div>
                <div id="${vid}" class="pdf-container"></div>
            `;

            div.querySelector('.card-header').addEventListener('click', () => { togglePDF(vid, fullPdfUrl); });
            div.querySelector('.proc-copy-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                const slug = proc.title
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
                    .replace(/[''\(\)]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9\-]/g, '')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '');
                const link = window.location.origin + '/procedures/' + slug;
                copyToClipboard(link, e.currentTarget);
            });

            // Récupération date du dernier commit via GitHub API
            if (config.profile.githubUser && config.profile.githubRepo) {
                const commitUrl = `https://api.github.com/repos/${config.profile.githubUser}/${config.profile.githubRepo}/commits?path=Documents/Proc%C3%A9dures/${encodeURIComponent(proc.path)}&page=1&per_page=1`;
                fetch(commitUrl, ghHeaders).then(r => r.json()).then(commits => {
                    if (commits && commits.length > 0) {
                        const date = new Date(commits[0].commit.author.date);
                        const formatted = date.toLocaleDateString('fr-FR');
                        const btn = document.getElementById(btnId);
                        if (btn) btn.setAttribute('data-date', formatted);
                    }
                }).catch(() => {});
            }

            // Bouton info → modale
            const infoB = div.querySelector(`#${btnId}`);
            if (infoB) infoB.addEventListener('click', (e) => {
                e.stopPropagation();
                openProjectModal(proc, infoB.getAttribute('data-date') || '');
            });

            procedureGrid.appendChild(div);
        });

        if (config.procedures.length > PROC_LIMIT) createToggleBtn(procedureGrid, PROC_LIMIT, 'Voir la suite');

    } else if (procedureGrid) {
        procedureGrid.innerHTML = '<p style="color: var(--muted); font-style: italic;">Aucune procédure disponible pour le moment.</p>';
    }

    // --- 8. PARCOURS (AVEC POINTS VIOLETS AUTOMATIQUES) ---
    const expList = document.getElementById("exp-list");
    const EXP_LIMIT = 5;
    if(expList && config.experiences) {
        config.experiences.forEach((exp, index) => {
            const li = document.createElement("li"); li.className = "timeline-item";
            if (index >= EXP_LIMIT) li.classList.add("hidden-item");

            const lines = exp.longDescription.split('\n');
            const listHtml = lines.map(line => {
                const cleanLine = line.trim();
                if (!cleanLine) return '';
                return `<li><span class="bullet"></span><span>${escapeHTML(cleanLine)}</span></li>`;
            }).join('');

            li.innerHTML = `
                <div class="timeline-header">
                    <span class="timeline-date">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        ${escapeHTML(exp.date)}
                    </span>
                    <span class="timeline-company">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        ${escapeHTML(exp.company)}
                    </span>
                </div>
                <h4 class="timeline-title">${escapeHTML(exp.role)}</h4>
                <ul class="timeline-missions">${listHtml}</ul>
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
    const certBaseUrl = `https://raw.githubusercontent.com/${config.profile.githubUser}/${config.profile.githubRepo}/main/Documents/Certifs/`;
    
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

            // ── Root-Me : stats dépliables au clic ───────────────────────────
            if (cert.issuer === "root-me.org" && cert.rootmeStats) {
                const stats = cert.rootmeStats;
                if (stats.themes && stats.themes.length > 0) {
                    const maxCount = stats.themes[0].count;

                    // Chevron
                    const headerRow = li.querySelector(".cert-header-row");
                    const chevron = document.createElement("span");
                    chevron.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
                    chevron.style.cssText = "display:flex;align-items:center;color:var(--muted);transition:transform 0.3s ease;margin-left:6px;flex-shrink:0;";
                    headerRow.appendChild(chevron);

                    const statsDiv = document.createElement("div");
                    statsDiv.className = "rootme-stats";
                    statsDiv.style.display = "none";

                    // Badges
                    const badgeRow = document.createElement("div");
                    badgeRow.className = "rootme-badges";
                    const topBadge = (stats.top_percent !== null && stats.top_percent !== undefined)
                        ? `<span class="rootme-badge rootme-badge-top">Top ${stats.top_percent}%</span>`
                        : `<span class="rootme-badge rootme-badge-top">\uD83C\uDF0D #${stats.position.toLocaleString("fr-FR")}</span>`;
                    badgeRow.innerHTML = topBadge
                        + (stats.rang ? `<span class="rootme-badge rootme-badge-rang">${escapeHTML(stats.rang)}</span>` : "")
                        + (stats.score ? `<span class="rootme-badge rootme-badge-score">${stats.score} pts</span>` : "");
                    statsDiv.appendChild(badgeRow);

                    // Total + date
                    const header = document.createElement("div");
                    header.className = "rootme-stats-header";
                    const totalEl = document.createElement("span");
                    totalEl.className = "rootme-total";
                    totalEl.textContent = `${stats.total} challenges r\u00E9solus`;
                    header.appendChild(totalEl);
                    statsDiv.appendChild(header);

                    // Themes : nom + nb challenges realises (moved before date)

                    // Themes : nom + nb challenges realises
                    stats.themes.forEach(t => {
                        const row = document.createElement("div");
                        row.className = "rootme-bar-row";
                        row.innerHTML = `<span class="rootme-bar-label" title="${escapeHTML(t.name)}">${escapeHTML(t.name)}</span><span class="rootme-bar-count">${t.count} chall réalisé${t.count > 1 ? "s" : ""}</span>`;
                        statsDiv.appendChild(row);
                    });

                    // MAJ date en bas
                    if (stats.updated_at) {
                        const updRow = document.createElement("div");
                        updRow.className = "rootme-upd-row";
                        const dateStr = new Date(stats.updated_at)
                            .toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
                        updRow.innerHTML = `<span class="rootme-upd-dot"></span><span class="rootme-upd-text">MAJ : ${dateStr}</span>`;
                        statsDiv.appendChild(updRow);
                    }

                    li.appendChild(statsDiv);

                    // Toggle
                    let expanded = false;
                    li.style.cursor = "pointer";
                    li.addEventListener("click", (e) => {
                        if (e.target.closest("a, button")) return;
                        expanded = !expanded;
                        statsDiv.style.display = expanded ? "" : "none";
                        chevron.style.transform = expanded ? "rotate(180deg)" : "rotate(0deg)";
                    });
                }
            }
            // ─────────────────────────────────────────────────────────────────

            certList.appendChild(li);
        });
        if (config.certifications.length > CERT_LIMIT) createToggleBtn(certList, CERT_LIMIT, "Voir la suite");
    }

    // --- DOCUMENTS E5 ---
    const e5Grid = document.getElementById('e5-grid');
    if (e5Grid && config.documentsE5 && config.documentsE5.length > 0) {
        const e5Title = document.querySelector('#documents-e5 h3');
        if (e5Title) {
            const badge = document.createElement('span');
            badge.className = 'section-count-badge';
            badge.textContent = config.documentsE5.length;
            e5Title.appendChild(badge);
        }
        e5Grid.innerHTML = '';
        config.documentsE5.forEach(doc => {
            const card = document.createElement('a');
            card.className = 'e5-card';
            const rawBase = 'https://raw.githubusercontent.com/' + config.profile.githubUser + '/' + config.profile.githubRepo + '/main/Documents/';
            card.href = rawBase + doc.path.split('/').map(p => encodeURIComponent(p)).join('/');
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
            // Force download for non-PDF files
            const fileName = doc.path.split('/').pop();
            if (doc.type !== 'pdf') {
                card.setAttribute('download', fileName);
                card.addEventListener('click', function(e) {
                    e.preventDefault();
                    fetch(card.href)
                        .then(r => r.blob())
                        .then(blob => {
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url; a.download = fileName;
                            document.body.appendChild(a); a.click();
                            document.body.removeChild(a); URL.revokeObjectURL(url);
                        })
                        .catch(() => window.open(card.href, '_blank'));
                });
            }
            card.innerHTML = `
                <div class="e5-card-icon">${doc.icon}</div>
                <div class="e5-card-body">
                    <h4>${doc.title}</h4>
                    <p>${doc.description}</p>
                </div>
                <span class="e5-card-badge">${doc.type.toUpperCase()}</span>
                <div class="e5-card-dl">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </div>
            `;
            e5Grid.appendChild(card);
        });
    } else if (e5Grid) {
        e5Grid.innerHTML = '<p style="color: var(--muted); font-style: italic;">Aucun document disponible pour le moment.</p>';
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
        fetch(`https://api.github.com/repos/${config.profile.githubUser}/${config.profile.githubRepo}`, ghHeaders).then(r => r.json()).then(d => {
            const date = new Date(d.pushed_at);
            updateEl.innerHTML = `Maj : ${date.toLocaleDateString('fr-FR')} ${date.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}`;
        }).catch(() => { updateEl.innerText = "System Ready"; });
    }

    // --- OUVERTURE AUTO VIA URL (?proc= ou ?proj=) ---
    const urlParams = new URLSearchParams(window.location.search);

    const projParam = urlParams.get('proj');
    if (projParam) {
        const waitAndOpenProj = setInterval(() => {
            const cards = document.querySelectorAll('#project-grid .project-card');
            cards.forEach(card => {
                const title = card.querySelector('h4');
                if (!title) return;
                const cardSlug = title.innerText
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
                    .replace(/[''\(\)]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9\-]/g, '')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '');
                const paramSlug = decodeURIComponent(projParam).toLowerCase();
                if (cardSlug === paramSlug) {
                    clearInterval(waitAndOpenProj);
                    const section = document.getElementById('projets');
                    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setTimeout(() => { card.querySelector('.card-header').click(); }, 600);
                    window.history.replaceState({}, '', '/');
                }
            });
        }, 300);
        setTimeout(() => clearInterval(waitAndOpenProj), 5000);
    }

    const procParam = urlParams.get('proc');
    if (procParam) {
        const makeSlug = (str) => str
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[\u2019\u2018'`\(\)]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

        const paramSlug = makeSlug(decodeURIComponent(procParam));

        const tryOpen = () => {
            const cards = document.querySelectorAll('#procedure-grid .project-card');
            let found = false;
            cards.forEach(card => {
                const titleEl = card.querySelector('h4');
                if (!titleEl) return;
                const cardSlug = makeSlug(titleEl.innerText);
                if (cardSlug === paramSlug) {
                    found = true;
                    card.classList.remove('hidden-item');
                    card.style.display = 'flex';
                    const section = document.getElementById('procedures');
                    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setTimeout(() => { card.querySelector('.card-header').click(); }, 600);
                    window.history.replaceState({}, '', '/');
                }
            });
            return found;
        };

        setTimeout(() => {
            if (!tryOpen()) {
                const waitAndOpen = setInterval(() => {
                    if (tryOpen()) clearInterval(waitAndOpen);
                }, 300);
                setTimeout(() => clearInterval(waitAndOpen), 5000);
            }
        }, 1000);
    }

    initCursorHint();

    // --- BOUTON RETOUR EN HAUT ---
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

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
        descEl.innerHTML = dateHtml + (proj.longDescription || "");
        tagsEl.innerHTML = (proj.tags || []).map(t => `<span class="project-tag">${escapeHTML(t)}</span>`).join('') || "Aucun tag";
        modal.style.display = "flex";
    }
}

function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
        btn.classList.add('copied');
        setTimeout(() => { btn.innerHTML = original; btn.classList.remove('copied'); }, 2000);
    });
}

// === MODAL PDF PLEIN ÉCRAN ===
// Crée la modal une seule fois et la réutilise
function ensurePDFModal() {
    let modal = document.getElementById('pdf-modal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'pdf-modal';
    modal.className = 'pdf-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="pdf-modal-overlay"></div>
        <div class="pdf-modal-content" role="document">
            <div class="pdf-modal-header">
                <h3 class="pdf-modal-title">Document</h3>
                <div class="pdf-modal-actions">
                    <a class="pdf-modal-btn" id="pdf-modal-open" target="_blank" rel="noopener" title="Ouvrir dans un nouvel onglet">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        <span>Nouvel onglet</span>
                    </a>
                    <a class="pdf-modal-btn" id="pdf-modal-download" download title="Télécharger le PDF">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        <span>Télécharger</span>
                    </a>
                    <button class="pdf-modal-close" id="pdf-modal-close" title="Fermer (Échap)" aria-label="Fermer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </div>
            </div>
            <div class="pdf-modal-body">
                <div class="pdf-modal-loader">Chargement du document...</div>
                <iframe class="pdf-modal-iframe" title="Visionneuse PDF"></iframe>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Fermeture par l'overlay, le bouton X et la touche Échap
    modal.querySelector('.pdf-modal-overlay').addEventListener('click', closePDFModal);
    modal.querySelector('#pdf-modal-close').addEventListener('click', closePDFModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closePDFModal();
    });

    return modal;
}

function openPDFModal(url, title) {
    const modal = ensurePDFModal();
    const iframe = modal.querySelector('.pdf-modal-iframe');
    const loader = modal.querySelector('.pdf-modal-loader');
    const titleEl = modal.querySelector('.pdf-modal-title');
    const openBtn = modal.querySelector('#pdf-modal-open');
    const dlBtn = modal.querySelector('#pdf-modal-download');

    titleEl.textContent = title || 'Document';
    openBtn.href = url;
    dlBtn.href = url;

    loader.style.display = 'block';
    loader.innerHTML = 'Chargement du document...';
    iframe.style.opacity = '0';
    iframe.src = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

    // Nettoyer tout timeout précédent
    if (modal._timeoutId) clearTimeout(modal._timeoutId);

    let loaded = false;
    iframe.onload = () => {
        loaded = true;
        loader.style.display = 'none';
        iframe.style.opacity = '1';
    };

    // Fallback : si l'iframe n'a pas chargé en 8s, on propose d'ouvrir en nouvel onglet
    modal._timeoutId = setTimeout(() => {
        if (!loaded) {
            loader.innerHTML = `
                <div style="margin-bottom: 14px;">⚠️ Le visualiseur met du temps à charger.</div>
                <a href="${url}" target="_blank" rel="noopener" class="pdf-modal-btn" style="display:inline-flex; color: var(--primary); border-color: var(--primary);">
                    Ouvrir directement le PDF →
                </a>
            `;
            // Supprimer l'animation du spinner
            loader.style.setProperty('--no-spinner', '1');
        }
    }, 8000);

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('pdf-modal-open');
}

function closePDFModal() {
    const modal = document.getElementById('pdf-modal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('pdf-modal-open');
    // Vider l'iframe pour stopper le chargement
    const iframe = modal.querySelector('.pdf-modal-iframe');
    if (iframe) iframe.src = 'about:blank';
    // Réinitialiser les boutons de certifs (effet visuel actif)
    document.querySelectorAll('.pdf-btn').forEach(b => { b.style.background = ''; b.style.color = ''; });
}

// Wrappers pour conserver la compatibilité avec les appels existants
function togglePDF(id, url) {
    // id était l'ancien conteneur inline ; on récupère un titre depuis la carte si possible
    const container = document.getElementById(id);
    let title = 'Document';
    if (container) {
        const card = container.closest('.project-card');
        const h = card ? card.querySelector('.meta h4') : null;
        if (h) title = h.textContent.trim();
    }
    openPDFModal(url, title);
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
    openPDFModal(url, 'Certification');
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
    openPDFModal(url, 'Certification');
}

/* ==========================================================
   AMÉLIORATIONS UX — ajoutées le 2026-04-18
   Tout auto-initialisé, zéro modif HTML nécessaire
   ========================================================== */
(function() {
    'use strict';

    // --- 1. SCROLL PROGRESS BAR (barre de progression en haut) ---
    function initScrollProgress() {
        const bar = document.createElement('div');
        bar.id = 'scroll-progress';
        document.body.appendChild(bar);

        let ticking = false;
        const update = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const pct = height > 0 ? (scrollTop / height) * 100 : 0;
            bar.style.width = pct + '%';
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });
        update();
    }

    // --- 2. BOUTON RETOUR EN HAUT ---
    function initBackToTop() {
        const btn = document.createElement('button');
        btn.id = 'back-to-top';
        btn.setAttribute('aria-label', 'Retour en haut');
        btn.title = 'Retour en haut';
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
        document.body.appendChild(btn);

        const toggle = () => {
            if (window.scrollY > 500) btn.classList.add('visible');
            else btn.classList.remove('visible');
        };

        window.addEventListener('scroll', toggle, { passive: true });
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        toggle();
    }

    // --- 3. REVEAL ANIMATION SUR LES CARTES (IntersectionObserver) ---
    function initCardReveal() {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('card-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        // Observer les cartes existantes ET celles ajoutées après
        const observeCards = () => {
            document.querySelectorAll('.project-card:not(.card-reveal-init), .cert-list li:not(.card-reveal-init)').forEach(card => {
                card.classList.add('card-reveal-init');
                observer.observe(card);
            });
        };

        observeCards();
        // Re-scan périodique pour les cartes chargées dynamiquement (projets, procédures, certifs)
        const scanInterval = setInterval(observeCards, 500);
        setTimeout(() => clearInterval(scanInterval), 8000); // stop après 8s
    }

    // --- 4. RECHERCHE GLOBALE CMD+K / CTRL+K ---
    function initGlobalSearch() {
        if (typeof config === 'undefined') return;

        // Créer la palette
        const palette = document.createElement('div');
        palette.id = 'cmdk-palette';
        palette.innerHTML = `
            <div class="cmdk-overlay"></div>
            <div class="cmdk-content" role="dialog" aria-label="Recherche globale">
                <div class="cmdk-header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input type="text" id="cmdk-input" placeholder="Rechercher un projet, une procédure, une certif..." autocomplete="off">
                    <kbd class="cmdk-esc">Échap</kbd>
                </div>
                <div class="cmdk-results" id="cmdk-results"></div>
                <div class="cmdk-footer">
                    <span><kbd>↑</kbd><kbd>↓</kbd> naviguer</span>
                    <span><kbd>↵</kbd> ouvrir</span>
                    <span><kbd>Échap</kbd> fermer</span>
                </div>
            </div>
        `;
        document.body.appendChild(palette);

        const input = palette.querySelector('#cmdk-input');
        const results = palette.querySelector('#cmdk-results');
        const overlay = palette.querySelector('.cmdk-overlay');
        let selectedIndex = 0;
        let currentItems = [];

        // Construire l'index recherchable
        const buildIndex = () => {
            const items = [];
            (config.projects || []).forEach(p => {
                items.push({
                    type: 'Projet',
                    icon: '📁',
                    title: p.title,
                    desc: p.shortDescription || p.longDescription || '',
                    tags: p.tags || [],
                    action: () => {
                        const baseUrl = `https://raw.githubusercontent.com/${config.profile.githubUser}/${config.profile.githubRepo}/main/Documents/Projet/`;
                        openPDFModal(baseUrl + p.path, p.title);
                    }
                });
            });
            (config.procedures || []).forEach(p => {
                items.push({
                    type: 'Procédure',
                    icon: '📋',
                    title: p.title,
                    desc: p.shortDescription || p.longDescription || p.description || '',
                    tags: p.tags || [],
                    action: () => {
                        const baseUrl = `https://raw.githubusercontent.com/${config.profile.githubUser}/${config.profile.githubRepo}/main/Documents/Proc%C3%A9dures/`;
                        openPDFModal(baseUrl + encodeURIComponent(p.path), p.title);
                    }
                });
            });
            (config.certifications || []).forEach(c => {
                if (!c.pdf) return;
                items.push({
                    type: 'Certif',
                    icon: '🎓',
                    title: c.title || c.name,
                    desc: c.issuer || c.description || '',
                    tags: [],
                    action: () => {
                        const baseUrl = `https://raw.githubusercontent.com/${config.profile.githubUser}/${config.profile.githubRepo}/main/Documents/Certifs/`;
                        openPDFModal(baseUrl + c.pdf, c.title || c.name);
                    }
                });
            });
            // Sections (nav interne)
            ['projets','parcours','competences','certifications','procedures','veille','documents-e5'].forEach(sec => {
                const el = document.getElementById(sec);
                if (!el) return;
                const h = el.querySelector('h3');
                if (!h) return;
                items.push({
                    type: 'Section',
                    icon: '📍',
                    title: h.textContent.trim(),
                    desc: 'Aller à la section',
                    tags: [],
                    action: () => {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
            return items;
        };

        let fullIndex = null;

        const normalize = (s) => (s || '').toString().toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const render = (query) => {
            if (!fullIndex) fullIndex = buildIndex();
            const q = normalize(query.trim());
            currentItems = !q ? fullIndex.slice(0, 8) : fullIndex.filter(item => {
                const hay = normalize(item.title + ' ' + item.desc + ' ' + (item.tags || []).join(' ') + ' ' + item.type);
                return hay.includes(q);
            }).slice(0, 12);
            selectedIndex = 0;

            if (currentItems.length === 0) {
                results.innerHTML = `<div class="cmdk-empty">Aucun résultat pour "${escapeHTML(query)}"</div>`;
                return;
            }
            results.innerHTML = currentItems.map((item, i) => `
                <div class="cmdk-item ${i === 0 ? 'selected' : ''}" data-idx="${i}">
                    <span class="cmdk-icon">${item.icon}</span>
                    <div class="cmdk-text">
                        <div class="cmdk-title">${escapeHTML(item.title)}</div>
                        <div class="cmdk-desc">${escapeHTML(item.desc).slice(0, 90)}${item.desc.length > 90 ? '…' : ''}</div>
                    </div>
                    <span class="cmdk-type">${item.type}</span>
                </div>
            `).join('');

            results.querySelectorAll('.cmdk-item').forEach(el => {
                el.addEventListener('click', () => {
                    const idx = parseInt(el.dataset.idx, 10);
                    executeItem(idx);
                });
                el.addEventListener('mouseenter', () => {
                    selectedIndex = parseInt(el.dataset.idx, 10);
                    updateSelection();
                });
            });
        };

        const updateSelection = () => {
            results.querySelectorAll('.cmdk-item').forEach((el, i) => {
                el.classList.toggle('selected', i === selectedIndex);
                if (i === selectedIndex) {
                    el.scrollIntoView({ block: 'nearest' });
                }
            });
        };

        const executeItem = (idx) => {
            const item = currentItems[idx];
            if (!item) return;
            close();
            setTimeout(() => item.action(), 100);
        };

        const open = () => {
            palette.classList.add('open');
            document.body.classList.add('cmdk-open');
            input.value = '';
            render('');
            setTimeout(() => input.focus(), 50);
        };

        const close = () => {
            palette.classList.remove('open');
            document.body.classList.remove('cmdk-open');
        };

        // Raccourcis clavier
        document.addEventListener('keydown', (e) => {
            // Cmd+K ou Ctrl+K
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                palette.classList.contains('open') ? close() : open();
                return;
            }
            if (!palette.classList.contains('open')) return;
            if (e.key === 'Escape') { e.preventDefault(); close(); }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, currentItems.length - 1);
                updateSelection();
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, 0);
                updateSelection();
            }
            if (e.key === 'Enter') {
                e.preventDefault();
                executeItem(selectedIndex);
            }
        });

        input.addEventListener('input', (e) => render(e.target.value));
        overlay.addEventListener('click', close);

        // Bouton flottant pour mobile/découvrabilité
        const fab = document.createElement('button');
        fab.id = 'cmdk-fab';
        fab.setAttribute('aria-label', 'Ouvrir la recherche');
        fab.title = 'Recherche (Ctrl+K)';
        fab.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
        fab.addEventListener('click', open);
        document.body.appendChild(fab);
    }

    // --- 5. SCHEMA.ORG JSON-LD (SEO) ---
    function initStructuredData() {
        if (typeof config === 'undefined' || !config.profile) return;
        const existing = document.querySelector('script[type="application/ld+json"][data-auto]');
        if (existing) return;

        const data = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": config.profile.name || "",
            "jobTitle": config.profile.status || "",
            "description": config.profile.bio || "",
            "url": window.location.origin,
            "image": config.profile.avatar || "",
            "sameAs": [
                config.profile.github ? `https://github.com/${config.profile.githubUser}` : null,
                config.profile.linkedin || null
            ].filter(Boolean)
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-auto', 'true');
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    }

    // --- INIT ---
    const start = () => {
        try { initScrollProgress(); } catch(e) { console.warn('scroll progress:', e); }
        try { initBackToTop(); } catch(e) { console.warn('back to top:', e); }
        try { initCardReveal(); } catch(e) { console.warn('card reveal:', e); }
        try { initGlobalSearch(); } catch(e) { console.warn('global search:', e); }
        try { initStructuredData(); } catch(e) { console.warn('structured data:', e); }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
