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

// --- POSITION DE DÉFILEMENT AU CHARGEMENT ---
// Un rechargement doit repartir de l'accroche. Deux choses l'en empêchent :
// la restauration automatique du navigateur, qui vise une position calculée
// avant que le JS n'injecte le contenu, et l'ancre que le menu laisse dans
// l'URL. Une ancre partagée est honorée une fois, puis retirée de l'URL pour
// que le rechargement suivant reparte du haut lui aussi.
(function () {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    const cleanHash = () => history.replaceState({}, '', window.location.pathname + window.location.search);

    window.addEventListener('load', function () {
        const hash = window.location.hash;
        let target = null;
        if (hash && hash.length > 1) {
            try { target = document.querySelector(hash); } catch (e) { target = null; }
        }
        if (!target) { window.scrollTo(0, 0); if (hash) cleanHash(); return; }
        // Le contenu est injecté par JS et l'écran de vérification bloque le
        // défilement : on attend qu'il disparaisse avant de viser l'ancre.
        let tries = 0;
        (function goToTarget() {
            const splash = document.getElementById('splash-screen');
            const blocked = splash && splash.offsetParent !== null;
            if (blocked && tries++ < 40) { setTimeout(goToTarget, 150); return; }
            // 'instant' : au chargement on se place, on n'anime pas (html a scroll-behavior: smooth)
            target.scrollIntoView({ block: 'start', behavior: 'instant' });
            cleanHash();
        })();
    });

    // Le menu interne navigue par ancre : on nettoie l'URL une fois le saut fait.
    document.addEventListener('click', function (e) {
        const link = e.target.closest('a[href^="#"]');
        if (link && link.getAttribute('href').length > 1) setTimeout(cleanHash, 800);
    });
})();

// --- GESTION DES URLs DIRECTES (bypass Cloudflare 404) ---
(function() {
    var segments = window.location.pathname.split('/').filter(Boolean);
    if (segments[0] === 'procedures' && segments[1]) {
        window.history.replaceState({}, '', '/?proc=' + encodeURIComponent(segments[1]));
    } else if (segments[0] === 'projet-technova' && segments[1]) {
        window.history.replaceState({}, '', '/?proj=' + encodeURIComponent(segments[1]));
    }
})();

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
    
    // Sombre par défaut, sauf si l'utilisateur a explicitement choisi le clair
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
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
    const faviconEl = document.getElementById("favicon-link");
    if(faviconEl && config.profile.favicon) faviconEl.href = config.profile.favicon;
    const heroAvatarEl = document.getElementById("hero-avatar");
    if(heroAvatarEl) heroAvatarEl.src = config.profile.avatar;
    const heroNameEl = document.getElementById("hero-name");
    if(heroNameEl) heroNameEl.innerText = config.profile.name;
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

    // --- 6b. MON PROFIL (texte à gauche, faits à droite) ---
    const profilEl = document.getElementById("profil-content");
    if (profilEl && config.profileSection) {
        const p = config.profileSection;
        // Formation et alternance viennent des sections existantes : une seule
        // source de vérité, elles suivent toute mise à jour du parcours.
        const formation = (config.formations || [])[0];
        const alternance = (config.experiences || []).find(e => /alternance/i.test(e.role || ""));

        // Le logo (repris des photos de la timeline) est passé en variable CSS :
        // il devient une tuile de tête alignée sur toute la hauteur du bloc,
        // sans casser la structure dt/dd de la liste de définitions.
        const facts = [];
        if (formation) facts.push({ label: "Formation", value: formation.role, logo: formation.photo });
        if (alternance) facts.push({ label: "Alternance", value: alternance.company, logo: alternance.photo });
        if (p.location) facts.push({ label: "Localisation", value: p.location });
        if (p.availability) {
            facts.push({
                label: "Disponibilité",
                value: `<span class="profil-dispo"><span class="profil-pulse"></span>${escapeHTML(p.availability)}</span>`,
                raw: true
            });
        }

        const paragraphs = (p.text || "")
            .split(/\n\s*\n/)
            .filter(Boolean)
            .map(t => `<p>${escapeHTML(t.trim())}</p>`)
            .join('');

        profilEl.innerHTML = `
            <div class="profil-text">
                ${p.heading ? `<h4>${escapeHTML(p.heading)}</h4>` : ''}
                ${paragraphs}
            </div>
            <div class="profil-facts">
                <dl>
                    ${facts.map(f => `
                        <div class="profil-fact${f.logo ? ' has-logo' : ''}"${f.logo ? ` style="--profil-logo:url('assets/${encodeURI(f.logo)}')"` : ''}>
                            <dt>${escapeHTML(f.label)}</dt>
                            <dd>${f.raw ? f.value : escapeHTML(f.value)}</dd>
                        </div>`).join('')}
                </dl>
                <div class="profil-actions">
                    <button type="button" class="profil-btn profil-btn-main" id="profil-contact">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg>
                        Me contacter
                    </button>
                    ${p.cvUrl ? `
                        <a class="profil-btn" href="${escapeHTML(p.cvUrl)}" download>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M4 21h16"/></svg>
                            Mon CV
                        </a>` : `
                        <span class="profil-btn is-disabled" aria-disabled="true" title="Le CV sera ajouté prochainement">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M4 21h16"/></svg>
                            CV bientôt disponible
                        </span>`}
                </div>
            </div>
        `;

        // On réutilise le déclencheur du hero : même modale, même captcha,
        // une seule logique de dévoilement de l'adresse.
        profilEl.querySelector('#profil-contact')?.addEventListener('click', () => {
            document.getElementById('email-trigger')?.click();
        });
    }

    // --- 7. PROJETS (AVEC RECHERCHE ET FILTRE) ---
    const grid = document.getElementById("project-grid");
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = `https://raw.githubusercontent.com/${config.profile.githubUser}/${config.profile.githubRepo}/main/Documents/Projet/`;
    // La grille vit dans une popup dédiée : on y affiche tout, sans pagination.
    const PROJECT_LIMIT = (config.projects || []).length;

    if (grid && config.projects) {
        // POPUP DES DOCUMENTS : ouverte depuis la carte TechNova des projets perso
        const docsModal = document.getElementById('docs-modal');
        if (docsModal) {
            let lastDocsTrigger = null;
            const openDocs = (trigger) => {
                lastDocsTrigger = trigger instanceof HTMLElement ? trigger : null;
                docsModal.classList.add('open');
                docsModal.setAttribute('aria-hidden', 'false');
                document.body.classList.add('pdf-modal-open');
                // Les cartes n'ont jamais croisé le viewport tant que la popup
                // était masquée : on lève l'animation d'apparition à la main.
                docsModal.querySelectorAll('.project-card').forEach(c => c.classList.add('card-revealed'));
                document.getElementById('docs-modal-close')?.focus();
            };
            const closeDocs = () => {
                docsModal.classList.remove('open');
                docsModal.setAttribute('aria-hidden', 'true');
                // On ne rend le défilement que si aucune autre popup n'est ouverte
                if (!document.querySelector('.pdf-modal.open')) document.body.classList.remove('pdf-modal-open');
                lastDocsTrigger?.focus();
            };
            window.openDocsModal = openDocs;

            document.getElementById('docs-modal-close')?.addEventListener('click', closeDocs);
            docsModal.querySelector('.pdf-modal-overlay')?.addEventListener('click', closeDocs);
            document.addEventListener('keydown', (e) => {
                // Échap ferme d'abord le lecteur PDF s'il est ouvert par-dessus
                if (e.key === 'Escape' && docsModal.classList.contains('open') && !document.getElementById('pdf-modal')?.classList.contains('open')) {
                    closeDocs();
                }
            });
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
            div.className = "project-card interactive-card doc-card";
            div.setAttribute('data-hint', 'Voir le PDF 📄');

            // Attributs pour faciliter le filtrage JS
            div.setAttribute('data-title', escapeHTML(proj.title || ""));
            div.setAttribute('data-desc', escapeHTML(proj.longDescription || ""));
            div.setAttribute('data-tags', JSON.stringify(proj.tags || []));

            if (index >= PROJECT_LIMIT) div.classList.add("hidden-item");

            const renderedIcon = renderIcon(proj.icon);
            div.innerHTML = buildDocCardHTML({
                pdfUrl: fullPdfUrl,
                iconHTML: renderedIcon,
                title: proj.title,
                desc: proj.longDescription || "",
                tagsHTML: cardTagsHTML,
                badgeId: badgeId,
                infoBtnId: btnId,
                viewerId: vid
            });

            wireDocCard(div, {
                viewerId: vid,
                pdfUrl: fullPdfUrl,
                shareUrl: window.location.origin + '/projet-technova/' + slugifyDoc(proj.title),
                title: proj.title
            });

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
            div.className = 'project-card interactive-card doc-card';
            div.setAttribute('data-hint', 'Voir le PDF 📄');
            div.setAttribute('data-tags', JSON.stringify(proc.tags || []));
            div.setAttribute('data-desc', escapeHTML(proc.longDescription || proc.description || ""));
            div.dataset.index = index;
            if (index >= PROC_LIMIT) div.classList.add('hidden-item');

            div.innerHTML = buildDocCardHTML({
                pdfUrl: fullPdfUrl,
                iconHTML: renderedIcon,
                title: proc.title,
                desc: proc.longDescription || proc.description || "",
                tagsHTML: cardTagsHTML,
                badgeId: badgeId,
                infoBtnId: btnId,
                viewerId: vid
            });

            wireDocCard(div, {
                viewerId: vid,
                pdfUrl: fullPdfUrl,
                shareUrl: window.location.origin + '/procedures/' + slugifyDoc(proc.title),
                title: proc.title
            });

            // Récupération date du dernier commit via GitHub API
            if (config.profile.githubUser && config.profile.githubRepo) {
                const commitUrl = `https://api.github.com/repos/${config.profile.githubUser}/${config.profile.githubRepo}/commits?path=Documents/Proc%C3%A9dures/${encodeURIComponent(proc.path)}&page=1&per_page=1`;
                fetch(commitUrl).then(r => r.json()).then(commits => {
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

    // --- PROJETS PERSO (cartes type GitHub : titre, description, stack, liens) ---
    const persoGrid = document.getElementById('perso-project-grid');
    const persoEmptyMsg = document.getElementById('perso-project-empty');
    const githubIconSvg = `<svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`;
    const defaultPersoIconSvg = `<svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;

    if (persoGrid && config.personalProjects && config.personalProjects.length > 0) {
        if (persoEmptyMsg) persoEmptyMsg.style.display = 'none';

        // Carte TechNova : elle ouvre la popup des documents au lieu d'un lien externe
        const technovaCount = (config.projects || []).length;
        if (technovaCount > 0) {
            const card = document.createElement('div');
            card.className = 'project-card perso-card';
            card.innerHTML = `
                <div class="card-header" style="cursor: default;">
                    <div class="icon">${renderIcon('assets/technova.png')}</div>
                    <div class="meta">
                        <h4>Projets TechNova</h4>
                        <p>Simulation d'une refonte complète de l'architecture réseau d'une PME, documentée pas à pas.</p>
                    </div>
                </div>
                <div class="perso-card-links">
                    <button type="button" class="perso-link-btn perso-link-demo" id="projects-entry" aria-haspopup="dialog">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                        Voir les ${technovaCount} documents
                    </button>
                </div>
            `;
            card.querySelector('#projects-entry').addEventListener('click', (e) => {
                if (window.openDocsModal) window.openDocsModal(e.currentTarget);
            });
            persoGrid.appendChild(card);
        }

        const persoTitle = document.querySelector('#projets-perso h3');
        if (persoTitle) {
            const badge = document.createElement('span');
            badge.className = 'section-count-badge';
            badge.textContent = config.personalProjects.length + (technovaCount > 0 ? 1 : 0);
            persoTitle.appendChild(badge);
        }

        // Les tags ne sont plus affichés sur ces cartes, mais restent dans
        // config.js : la palette Cmd+K s'en sert pour la recherche.
        config.personalProjects.forEach((proj) => {
            let linksHTML = '';
            if (proj.github) {
                linksHTML += `<a href="${escapeHTML(proj.github)}" target="_blank" rel="noopener noreferrer" class="perso-link-btn">${githubIconSvg} GitHub</a>`;
            }
            if (proj.demo) {
                linksHTML += `<a href="${escapeHTML(proj.demo)}" target="_blank" rel="noopener noreferrer" class="perso-link-btn perso-link-demo"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Voir le site</a>`;
            }

            const div = document.createElement('div');
            div.className = 'project-card perso-card';
            div.innerHTML = `
                <div class="card-header" style="cursor: default;">
                    <div class="icon">${proj.icon ? renderIcon(proj.icon) : defaultPersoIconSvg}</div>
                    <div class="meta">
                        <h4>${escapeHTML(proj.title)}</h4>
                        <p>${escapeHTML(proj.description || '')}</p>
                    </div>
                </div>
                ${linksHTML ? `<div class="perso-card-links">${linksHTML}</div>` : ''}
            `;
            persoGrid.appendChild(div);
        });
    } else if (persoGrid) {
        if (persoEmptyMsg) persoEmptyMsg.style.display = 'block';
    }

    // --- 8. PARCOURS (AVEC POINTS VIOLETS AUTOMATIQUES) ---
    const EXP_LIMIT = 5;
    function renderTimeline(listEl, data, limit) {
        if (!listEl || !data) return;
        data.forEach((exp, index) => {
            const li = document.createElement("li"); li.className = "timeline-item";
            if (index >= limit) li.classList.add("hidden-item");

            const lines = (exp.longDescription || "").split('\n');
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
            listEl.appendChild(li);
        });
        if (data.length > limit) createToggleBtn(listEl, limit, "Voir la suite");
    }
    renderTimeline(document.getElementById("exp-list"), config.experiences, EXP_LIMIT);
    renderTimeline(document.getElementById("formation-list"), config.formations, EXP_LIMIT);

    // --- 9. COMPETENCES (ONGLETS VERTICAUX, COULEUR PAR DOMAINE) ---
    const compList = document.getElementById("comp-list");
    // Couleur d'accent par domaine. Surchargeable dans config.js via
    // competences[].accent ; sinon la palette tourne dans cet ordre.
    const COMP_ACCENTS = ['#6366f1', '#0ea5e9', '#8b5cf6', '#ef4444', '#10b981'];

    if (compList && config.competences && config.competences.length) {
        const accentOf = (comp, i) => comp.accent || COMP_ACCENTS[i % COMP_ACCENTS.length];

        const tabsHTML = config.competences.map((comp, i) => `
            <button type="button" class="comp-tab" data-i="${i}" role="tab"
                    aria-selected="${i === 0}" aria-controls="comp-panel"
                    style="--comp-accent:${accentOf(comp, i)}">
                <span class="comp-tab-icon">${renderIcon(comp.icon)}</span>
                <span class="comp-tab-name">${escapeHTML(comp.name)}</span>
            </button>`).join('');

        compList.innerHTML = `
            <div class="comp-tablist" role="tablist" aria-label="Domaines de compétences">${tabsHTML}</div>
            <div class="comp-panel" id="comp-panel" role="tabpanel"></div>
        `;

        const panel = compList.querySelector('#comp-panel');
        const tabs = Array.from(compList.querySelectorAll('.comp-tab'));
        let current = 0;

        const blockHTML = (comp, i) => {
            const n = comp.details.length;
            return `
                <div class="comp-panel-head" style="--comp-accent:${accentOf(comp, i)}">
                    <span class="comp-panel-icon">${renderIcon(comp.icon)}</span>
                    <h4>${escapeHTML(comp.name)}</h4>
                    <span class="comp-panel-count">${n} item${n > 1 ? 's' : ''}</span>
                </div>
                <ul class="comp-panel-list" style="--comp-accent:${accentOf(comp, i)}">
                    ${comp.details.map(d => `<li>${escapeHTML(d)}</li>`).join('')}
                </ul>`;
        };

        const showComp = (i) => {
            current = i;
            panel.style.setProperty('--comp-accent', accentOf(config.competences[i], i));
            panel.innerHTML = blockHTML(config.competences[i], i);
            tabs.forEach((t, j) => {
                t.classList.toggle('active', j === i);
                t.setAttribute('aria-selected', String(j === i));
            });
        };

        // À l'impression, les onglets n'ont plus de sens : on déplie les cinq
        // domaines pour ne pas perdre quatre cinquièmes du contenu sur papier.
        window.addEventListener('beforeprint', () => {
            panel.innerHTML = config.competences.map((c, i) => blockHTML(c, i)).join('');
        });
        window.addEventListener('afterprint', () => showComp(current));

        tabs.forEach((t, i) => {
            t.addEventListener('click', () => showComp(i));
            // Flèches haut/bas pour parcourir les domaines au clavier
            t.addEventListener('keydown', (e) => {
                if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
                e.preventDefault();
                const next = (i + (e.key === 'ArrowDown' ? 1 : -1) + tabs.length) % tabs.length;
                tabs[next].focus();
                showComp(next);
            });
        });

        showComp(0);
    }

    // --- 10. CERTIFICATIONS (Root-Me en vedette, attestations en rangées) ---
    const certList = document.getElementById("cert-list");
    const certBaseUrl = `https://raw.githubusercontent.com/${config.profile.githubUser}/${config.profile.githubRepo}/main/Documents/Certifs/`;

    if (certList && config.certifications) {
        const isFeatured = c => c.issuer === "root-me.org" && c.rootmeStats;
        const featured = config.certifications.find(isFeatured);
        const others = config.certifications.filter(c => !isFeatured(c));

        const linkBtn = (cert, label) => cert.url
            ? `<a class="cert-btn-ghost" href="${escapeHTML(cert.url)}" target="_blank" rel="noopener noreferrer">
                   <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   ${escapeHTML(label)}
               </a>`
            : '';

        // ── Bloc vedette : les statistiques Root-Me, toujours visibles ──
        if (featured) {
            const s = featured.rootmeStats;
            const themes = s.themes || [];
            const maxCount = themes.reduce((m, t) => Math.max(m, t.count), 1);
            const maj = s.updated_at
                ? new Date(s.updated_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })
                : "";
            const rank = (s.top_percent !== null && s.top_percent !== undefined)
                ? { value: `Top ${s.top_percent}%`, label: "Classement mondial" }
                : { value: `#${(s.position || 0).toLocaleString("fr-FR")}`, label: "Classement mondial" };

            const hero = document.createElement("article");
            hero.className = "cert-hero";
            hero.innerHTML = `
                <div class="cert-hero-top">
                    <span class="cert-hero-logo">${renderIcon(featured.icon)}</span>
                    <div class="cert-hero-id">
                        <h4>${escapeHTML(featured.name)}</h4>
                        <span>${escapeHTML(featured.issuer)}${s.rang ? ` · rang « ${escapeHTML(s.rang)} »` : ''}</span>
                    </div>
                    ${linkBtn(featured, "Profil public")}
                </div>
                <div class="cert-nums">
                    <div class="cert-num"><b>${s.total}</b><span>Challenges résolus</span></div>
                    <div class="cert-num"><b>${s.score}</b><span>Points</span></div>
                    <div class="cert-num"><b>${rank.value}</b><span>${rank.label}</span></div>
                </div>
                ${themes.length ? `<div class="cert-themes">${themes.map(t => `
                    <div class="cert-theme">
                        <span class="cert-theme-name">${escapeHTML(t.name)}</span>
                        <span class="cert-bar"><i style="width:${Math.round(t.count / maxCount * 100)}%"></i></span>
                        <b>${t.count}</b>
                    </div>`).join('')}</div>` : ''}
                ${maj ? `<p class="cert-upd"><span class="cert-upd-dot"></span>Synchronisé chaque jour · dernière mise à jour le ${maj}</p>` : ''}
            `;
            certList.appendChild(hero);
        }

        // ── Rangées : aperçu de l'attestation à gauche, identité à droite ──
        if (others.length) {
            const rows = document.createElement("div");
            rows.className = "cert-rows";

            others.forEach(cert => {
                const pdfUrl = cert.pdf ? certBaseUrl + encodeURIComponent(cert.pdf) : null;
                const row = document.createElement("article");
                row.className = "cert-row";
                row.innerHTML = `
                    <div class="cert-thumb card-thumb${pdfUrl ? '' : ' cert-thumb-empty'}"${pdfUrl ? ` data-pdf-url="${pdfUrl}" role="button" tabindex="0" aria-label="Voir l'attestation ${escapeHTML(cert.name)}"` : ''}>
                        <span class="cert-thumb-fallback" aria-hidden="true">${renderIcon(cert.icon)}</span>
                    </div>
                    <div class="cert-row-body">
                        <div class="cert-row-head">
                            <span class="cert-row-logo">${renderIcon(cert.icon)}</span>
                            <div class="cert-row-id">
                                <h4>${escapeHTML(cert.name)}</h4>
                                <span>${escapeHTML(cert.issuer || "Certification")}</span>
                            </div>
                        </div>
                        <div class="cert-row-actions">
                            ${pdfUrl ? `<button type="button" class="cert-btn-main">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
                                Voir l'attestation
                            </button>` : ''}
                            ${linkBtn(cert, "Site officiel")}
                        </div>
                    </div>
                `;

                if (pdfUrl) {
                    const open = () => openPDFModal(pdfUrl, cert.name);
                    const thumb = row.querySelector('.cert-thumb');
                    thumb.addEventListener('click', open);
                    thumb.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
                    });
                    row.querySelector('.cert-btn-main').addEventListener('click', open);
                    if (window.observePdfThumb) window.observePdfThumb(thumb);
                }

                rows.appendChild(row);
            });

            certList.appendChild(rows);
        }
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
    // Sans date à afficher, on retire la mention et son séparateur plutôt que
    // de laisser un texte de remplissage dans le pied de page.
    const dropLastUpdate = () => {
        const sep = updateEl.previousElementSibling;
        if (sep && sep.classList.contains('separator')) sep.remove();
        updateEl.remove();
    };
    if(updateEl && config.profile.githubUser && config.profile.githubRepo) {
        fetch(`https://api.github.com/repos/${config.profile.githubUser}/${config.profile.githubRepo}`).then(r => {
            if (!r.ok) throw new Error('GitHub API error ' + r.status);
            return r.json();
        }).then(d => {
            const date = new Date(d.pushed_at);
            if (isNaN(date.getTime())) throw new Error('Invalid pushed_at');
            updateEl.innerHTML = `Maj : ${date.toLocaleDateString('fr-FR')} ${date.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}`;
        }).catch(dropLastUpdate);
    } else if (updateEl) {
        dropLastUpdate();
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
                    const section = document.getElementById('projets-perso');
                    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // La grille est dans la popup : on l'ouvre pour que la fermeture
                    // du PDF ramène le visiteur sur la liste des documents.
                    if (window.openDocsModal) window.openDocsModal();
                    setTimeout(() => { (card.querySelector('.doc-read-btn') || card.querySelector('.card-header')).click(); }, 600);
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
                    setTimeout(() => { (card.querySelector('.doc-read-btn') || card.querySelector('.card-header')).click(); }, 600);
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
        el.addEventListener("mousemove", (e) => { if (e.target.closest('.info-btn, .doc-card-actions') || el.classList.contains('expanded')) hintEl.classList.remove("visible"); else hintEl.classList.add("visible"); });
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
        descEl.innerHTML = dateHtml + escapeHTML(proj.longDescription || "");
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

// === CARTES DOCUMENT (projets & procédures) ===
// Preview A4 à gauche, barre d'actions Lire / Partager / Infos à droite.

const DOC_ICONS = {
    read:  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
    share: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
    info:  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    link:  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    linkedin: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C21.4 8.75 22 11.1 22 14.2V21h-4v-6c0-1.5-.03-3.4-2.1-3.4-2.1 0-2.42 1.6-2.42 3.3V21h-4z"/></svg>',
    mail:  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg>'
};

// Titre → slug d'URL (accents, apostrophes et ponctuation retirés)
function slugifyDoc(title) {
    return (title || "")
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[''\(\)]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

/**
 * Contenu HTML d'une carte document.
 * @param {{pdfUrl:string, iconHTML:string, title:string, desc:string,
 *          tagsHTML:string, badgeId:string, infoBtnId:string, viewerId:string}} opts
 */
function buildDocCardHTML(opts) {
    const safeTitle = escapeHTML(opts.title);
    return `
        <div class="card-thumb" data-pdf-url="${opts.pdfUrl}" role="button" tabindex="0" aria-label="Lire le PDF : ${safeTitle}">
            <span class="doc-thumb-fallback" aria-hidden="true">${opts.iconHTML || ''}</span>
            <span class="doc-thumb-pages" hidden></span>
        </div>
        <div class="doc-card-body">
            <div class="doc-card-top meta">
                <h4>${safeTitle}</h4>
                <span id="${opts.badgeId}" class="badge-container-abs"></span>
            </div>
            ${opts.desc ? `<p class="doc-card-desc">${escapeHTML(opts.desc)}</p>` : ''}
            ${opts.tagsHTML || ''}
            <div class="doc-card-actions">
                <button class="doc-btn doc-btn-main doc-read-btn" type="button" data-no-hint="true">
                    ${DOC_ICONS.read}<span class="doc-btn-label">Lire</span>
                </button>
                <div class="doc-share">
                    <button class="doc-btn doc-share-btn" type="button" data-no-hint="true" aria-haspopup="true" aria-expanded="false">
                        ${DOC_ICONS.share}<span class="doc-btn-label">Partager</span>
                    </button>
                    <div class="doc-share-menu" role="menu">
                        <button class="doc-share-item" type="button" role="menuitem" data-share="copy">${DOC_ICONS.link}Copier le lien</button>
                        <button class="doc-share-item" type="button" role="menuitem" data-share="linkedin">${DOC_ICONS.linkedin}Partager sur LinkedIn</button>
                        <button class="doc-share-item" type="button" role="menuitem" data-share="mail">${DOC_ICONS.mail}Envoyer par mail</button>
                        <div class="doc-share-sep"></div>
                        <p class="doc-share-hint">Lien direct vers le document.</p>
                    </div>
                </div>
                <button class="doc-btn doc-btn-icon doc-info-btn" type="button" id="${opts.infoBtnId}" title="Plus d'infos" aria-label="Plus d'infos" data-no-hint="true">
                    ${DOC_ICONS.info}
                </button>
            </div>
        </div>
        <div id="${opts.viewerId}" class="pdf-container"></div>
    `;
}

// Ferme tous les menus Partager ouverts
function closeAllDocShare() {
    document.querySelectorAll('.doc-share.open').forEach(wrap => {
        wrap.classList.remove('open');
        wrap.closest('.doc-card')?.classList.remove('share-open');
        wrap.querySelector('.doc-share-btn')?.setAttribute('aria-expanded', 'false');
    });
}
document.addEventListener('click', () => closeAllDocShare());
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllDocShare(); });

/**
 * Branche les interactions d'une carte document.
 * @param {HTMLElement} card
 * @param {{viewerId:string, pdfUrl:string, shareUrl:string, title:string}} opts
 */
function wireDocCard(card, opts) {
    const open = () => togglePDF(opts.viewerId, opts.pdfUrl);
    const thumb = card.querySelector('.card-thumb');

    thumb.addEventListener('click', open);
    thumb.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
    card.querySelector('.doc-card-top h4').addEventListener('click', open);
    card.querySelector('.doc-read-btn').addEventListener('click', (e) => { e.stopPropagation(); open(); });
    if (window.observePdfThumb) window.observePdfThumb(thumb);

    // --- Partager ---
    const wrap = card.querySelector('.doc-share');
    const shareBtn = wrap.querySelector('.doc-share-btn');

    shareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Au doigt, on préfère la feuille de partage du système quand elle existe
        if (navigator.share && window.matchMedia('(pointer: coarse)').matches) {
            navigator.share({ title: opts.title, url: opts.shareUrl }).catch(() => {});
            return;
        }
        const willOpen = !wrap.classList.contains('open');
        closeAllDocShare();
        wrap.classList.toggle('open', willOpen);
        card.classList.toggle('share-open', willOpen);
        shareBtn.setAttribute('aria-expanded', String(willOpen));
    });

    wrap.querySelectorAll('.doc-share-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            switch (item.dataset.share) {
                case 'copy':
                    navigator.clipboard.writeText(opts.shareUrl)
                        .then(() => window.showToast && window.showToast('Lien copié dans le presse-papier', 'success'))
                        .catch(() => window.showToast && window.showToast('Copie impossible', 'error'));
                    break;
                case 'linkedin':
                    window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(opts.shareUrl), '_blank', 'noopener');
                    break;
                case 'mail':
                    window.location.href = 'mailto:?subject=' + encodeURIComponent(opts.title)
                        + '&body=' + encodeURIComponent(opts.title + '\n' + opts.shareUrl);
                    break;
            }
            closeAllDocShare();
        });
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

    const showHint = () => {
        const hint = modal.querySelector('.pdf-hint');
        if (hint) hint.style.display = 'block';
    };

    let loaded = false;
    iframe.onload = () => {
        loaded = true;
        loader.style.display = 'none';
        iframe.style.opacity = '1';
        setTimeout(showHint, 500);
    };

    // Fallback : si l'iframe n'a pas chargé en 8s, afficher le hint aussi
    modal._timeoutId = setTimeout(() => {
        if (!loaded) {
            loader.innerHTML = '⚠️ Le chargement a échoué, il est conseillé de cliquer sur <strong>"Nouvel onglet"</strong> ci-dessus.';
        }
        showHint();
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
    // Un bouton #back-to-top peut déjà exister dans le HTML (styles inline).
    // On le récupère s'il existe, sinon on le crée.
    function initBackToTop() {
        let btn = document.getElementById('back-to-top');
        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'back-to-top';
            btn.setAttribute('aria-label', 'Retour en haut');
            btn.title = 'Retour en haut';
            btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
            document.body.appendChild(btn);
        }

        const toggle = () => {
            if (window.scrollY > 500) btn.classList.add('visible');
            else btn.classList.remove('visible');
        };

        // Évite de doubler les listeners si le HTML en avait déjà branché
        if (!btn._backToTopBound) {
            btn._backToTopBound = true;
            window.addEventListener('scroll', toggle, { passive: true });
            btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
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
            (config.personalProjects || []).forEach(p => {
                items.push({
                    type: 'Projet Perso',
                    icon: '💻',
                    title: p.title,
                    desc: p.description || '',
                    tags: p.tags || [],
                    action: () => {
                        window.open(p.github || p.demo || '#', '_blank', 'noopener,noreferrer');
                    }
                });
            });
            // Sections (nav interne)
            ['projets','parcours','competences','certifications','procedures','projets-perso','veille'].forEach(sec => {
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
        if (typeof config === 'undefined' || !config.profile) {
            console.warn('[JSON-LD] config ou config.profile indisponible');
            return;
        }
        const existing = document.querySelector('script[type="application/ld+json"][data-auto]');
        if (existing) return;

        // Les liens sociaux sont dans config.social, pas config.profile
        const social = config.social || {};
        const sameAs = [
            social.github || (config.profile.githubUser ? `https://github.com/${config.profile.githubUser}` : null),
            social.linkedin || null
        ].filter(Boolean);

        const data = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": config.profile.name || "",
            "jobTitle": config.profile.status || "",
            "description": config.profile.bio || "",
            "url": window.location.origin,
            "image": config.profile.avatar ? new URL(config.profile.avatar, window.location.href).href : "",
            "sameAs": sameAs
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-auto', 'true');
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
        console.info('[JSON-LD] Données structurées injectées');
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

/* ==========================================================
   PWA — Service Worker + Stats live
   ========================================================== */
(function() {
    'use strict';

    // --- ENREGISTREMENT DU SERVICE WORKER ---
    function registerSW() {
        if (!('serviceWorker' in navigator)) return;
        // On attend que la page soit chargée pour ne pas voler de bande passante
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => {
                    console.info('[SW] Enregistré, scope:', reg.scope);
                    // Détection d'une mise à jour dispo
                    reg.addEventListener('updatefound', () => {
                        const newWorker = reg.installing;
                        if (!newWorker) return;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.info('[SW] Nouvelle version disponible');
                                showUpdateToast(reg);
                            }
                        });
                    });
                })
                .catch(err => console.warn('[SW] Erreur enregistrement:', err));
        });
    }

    function showUpdateToast(reg) {
        const toast = document.createElement('div');
        toast.id = 'sw-update-toast';
        toast.innerHTML = `
            <span>🔄 Nouvelle version disponible</span>
            <button id="sw-update-btn">Actualiser</button>
            <button id="sw-update-close" aria-label="Fermer">×</button>
        `;
        document.body.appendChild(toast);
        document.getElementById('sw-update-btn').addEventListener('click', () => {
            if (reg.waiting) reg.waiting.postMessage('SKIP_WAITING');
            window.location.reload();
        });
        document.getElementById('sw-update-close').addEventListener('click', () => toast.remove());
    }

    // --- BOUTON PARTAGER SUR LA MODAL PDF ---
    // Ajoute un bouton "Copier le lien" qui reconstruit un lien partageable
    function enhancePDFModal() {
        // Attendre que la modal soit créée (au premier clic)
        const observer = new MutationObserver(() => {
            const modal = document.getElementById('pdf-modal');
            if (!modal || modal.dataset.shareEnhanced) return;
            modal.dataset.shareEnhanced = 'true';

            const actions = modal.querySelector('.pdf-modal-actions');
            if (!actions) return;
            const dl = modal.querySelector('#pdf-modal-download');
            if (!dl) return;

            const shareBtn = document.createElement('button');
            shareBtn.className = 'pdf-modal-btn';
            shareBtn.id = 'pdf-modal-share';
            shareBtn.title = 'Copier le lien de partage';
            shareBtn.type = 'button';
            shareBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                <span>Partager</span>
            `;
            actions.insertBefore(shareBtn, dl);

            shareBtn.addEventListener('click', () => {
                const titleEl = modal.querySelector('.pdf-modal-title');
                const title = titleEl ? titleEl.textContent.trim() : '';
                const slug = title
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
                    .replace(/[\u2019\u2018'`\(\)]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9\-]/g, '')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '');
                // Détecter si c'est une procédure ou un projet
                const isProc = (config.procedures || []).some(p => p.title && p.title.toLowerCase() === title.toLowerCase());
                const path = isProc ? '/procedures/' : '/projet-technova/';
                // Procédures → query param direct (pas de pretty URL = pas de 404)
                const url = isProc
                    ? window.location.origin + '/?proc=' + encodeURIComponent(slug)
                    : window.location.origin + path + slug;

                navigator.clipboard.writeText(url).then(() => {
                    const original = shareBtn.innerHTML;
                    shareBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>Copié !</span>`;
                    shareBtn.classList.add('copied');
                    setTimeout(() => {
                        shareBtn.innerHTML = original;
                        shareBtn.classList.remove('copied');
                    }, 2000);
                }).catch(() => {
                    alert('Lien : ' + url);
                });
            });

            observer.disconnect();
        });
        observer.observe(document.body, { childList: true, subtree: false });
    }

    // --- INIT ---
    const start = () => {
        try { registerSW(); } catch(e) { console.warn('SW:', e); }
        try { enhancePDFModal(); } catch(e) { console.warn('pdf share:', e); }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();

/* ==========================================================
   AMÉLIORATIONS VISUELLES — Timeline enrichie / Toast
   ========================================================== */
(function() {
    'use strict';

    // =========================================================
    // 1. SYSTÈME DE TOAST GLOBAL (réutilisable)
    // =========================================================
    function ensureToastContainer() {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    /**
     * Affiche un toast discret
     * @param {string} message - Message à afficher
     * @param {'success'|'info'|'error'} [type='success']
     * @param {number} [duration=3000] - Durée en ms
     */
    window.showToast = function(message, type = 'success', duration = 3000) {
        const container = ensureToastContainer();
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        const icons = {
            success: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
            info:    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
            error:   '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
        };
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-msg">${message}</span>
        `;
        container.appendChild(toast);

        // Animation d'apparition
        requestAnimationFrame(() => toast.classList.add('visible'));

        // Disparition
        setTimeout(() => {
            toast.classList.remove('visible');
            toast.classList.add('leaving');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    };

    // --- Brancher le toast sur la copie d'email ---
    function wireEmailCopyToast() {
        const copyBtn = document.getElementById('copy-email-btn');
        if (!copyBtn || copyBtn._toastWired) return;
        copyBtn._toastWired = true;

        copyBtn.addEventListener('click', () => {
            // Un toast est affiché en plus du comportement existant
            setTimeout(() => {
                window.showToast('Adresse e-mail copiée !', 'success');
            }, 50);
        }, { capture: true });
    }

    // --- Brancher le toast sur les boutons "copy-link" (projets, procs) ---
    function wireCopyLinkToast() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.copy-link-btn, #pdf-modal-share');
            if (!btn) return;
            // Laisser le comportement original s'exécuter, puis toast
            setTimeout(() => {
                window.showToast('Lien copié dans le presse-papier', 'success');
            }, 50);
        }, { capture: false });
    }


    // =========================================================
    // 2. TIMELINE PARCOURS — design enrichi
    // =========================================================
    function enhanceTimeline(listId) {
        const expList = document.getElementById(listId || 'exp-list');
        if (!expList) return;
        if (expList.classList.contains('timeline-enhanced')) return;
        expList.classList.add('timeline-enhanced');

        const items = Array.from(expList.querySelectorAll('.timeline-item'));
        if (items.length === 0) return;

        // Helper : extraire une durée depuis un titre de rôle/description (ex. "5 semaines", "2 mois")
        const extractDuration = (text) => {
            if (!text) return null;
            const match = text.match(/(\d+)\s*(semaine|mois|année|an)s?/i);
            return match ? match[0] : null;
        };

        // Helper : initiales d'une entreprise
        const makeInitials = (name) => {
            if (!name) return '?';
            const cleaned = name.replace(/[^A-Za-zÀ-ÿ\s]/g, ' ').trim();
            const words = cleaned.split(/\s+/).filter(w => w.length > 2);
            if (words.length === 0) return cleaned.substring(0, 2).toUpperCase();
            if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
            return (words[0][0] + words[1][0]).toUpperCase();
        };

        // Couleurs pour les badges d'entreprise (hash-based, déterministe)
        const badgeColors = [
            ['#6366f1', '#a855f7'],
            ['#06b6d4', '#3b82f6'],
            ['#10b981', '#14b8a6'],
            ['#f59e0b', '#ef4444'],
            ['#ec4899', '#8b5cf6']
        ];
        const colorFor = (str) => {
            let hash = 0;
            for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) | 0;
            return badgeColors[Math.abs(hash) % badgeColors.length];
        };

        items.forEach((item, idx) => {
            if (item.dataset.enhanced) return;
            item.dataset.enhanced = 'true';

            // Récupérer les infos du rendu existant
            const dateEl = item.querySelector('.timeline-date');
            const companyEl = item.querySelector('.timeline-company');
            const titleEl = item.querySelector('.timeline-title');
            const missionsEl = item.querySelector('.timeline-missions');

            if (!dateEl || !companyEl || !titleEl) return;

            const dateText = dateEl.textContent.trim();
            const companyName = companyEl.textContent.trim();
            const roleText = titleEl.textContent.trim();
            const duration = extractDuration(roleText) || extractDuration(dateText);

            // Badge entreprise (initiales + dégradé)
            const [c1, c2] = colorFor(companyName);
            const initials = makeInitials(companyName);

            // Reconstruction interne : header enrichi
            const header = item.querySelector('.timeline-header');
            if (header) header.remove();
            if (titleEl.parentNode === item) titleEl.remove();

            // Badge "En cours" sur le plus récent (premier = plus récent dans ta config)
            const isCurrent = idx === 0;

            const newHeader = document.createElement('div');
            newHeader.className = 'tl-header';
            newHeader.innerHTML = `
                <div class="tl-badge" style="background: linear-gradient(135deg, ${c1}, ${c2});" aria-hidden="true">
                    <span>${initials}</span>
                </div>
                <div class="tl-header-text">
                    <div class="tl-top-row">
                        <span class="tl-company">${companyName}</span>
                        ${isCurrent ? '<span class="tl-current-badge"><span class="tl-pulse-dot"></span>Récent</span>' : ''}
                    </div>
                    <h4 class="tl-role">${roleText}</h4>
                    <div class="tl-meta">
                        <span class="tl-chip tl-date-chip">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            ${dateText}
                        </span>
                        ${duration ? `<span class="tl-chip tl-duration-chip">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            ${duration}
                        </span>` : ''}
                    </div>
                </div>
            `;

            // Dot sur la ligne verticale
            const dot = document.createElement('span');
            dot.className = 'tl-dot';
            if (isCurrent) dot.classList.add('tl-dot-current');

            // Missions : transformer les bullets en liste avec icônes check
            if (missionsEl) {
                missionsEl.classList.add('tl-missions');
                missionsEl.querySelectorAll('li').forEach(li => {
                    const bullet = li.querySelector('.bullet');
                    if (bullet) {
                        bullet.outerHTML = `<span class="tl-check">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>`;
                    }
                });
            }

            // Nettoyage et ré-insertion dans le bon ordre
            item.insertBefore(dot, item.firstChild);
            item.insertBefore(newHeader, missionsEl);

            // Classes d'état
            item.classList.add('tl-item');
            if (isCurrent) item.classList.add('tl-item-current');
        });
    }

    // =========================================================
    // INIT
    // =========================================================
    const start = () => {
        try { wireEmailCopyToast(); } catch(e) { console.warn('email toast:', e); }
        try { wireCopyLinkToast(); } catch(e) { console.warn('copy link toast:', e); }

        // Les rendus des sections se font dans le DOMContentLoaded principal
        // Petit délai pour s'assurer que tout est en place
        setTimeout(() => {
            try { enhanceTimeline('exp-list'); } catch(e) { console.warn('timeline:', e); }
            try { enhanceTimeline('formation-list'); } catch(e) { console.warn('timeline formations:', e); }
            try { wireEmailCopyToast(); } catch(e) {}
            // Inject company/school photos after enhanceTimeline has rebuilt the DOM
            function injectTimelinePhotos(listId, data) {
                if (!data) return;
                const items = document.querySelectorAll('#' + listId + ' .timeline-item');
                data.forEach((exp, i) => {
                    if (!exp.photo || !items[i]) return;
                    const badge = items[i].querySelector('.tl-badge');
                    if (!badge) return;
                    const img = document.createElement('img');
                    img.src = 'assets/' + exp.photo;
                    img.alt = exp.company || '';
                    img.style.cssText = 'align-self: stretch; height: 100%; width: 56px; min-height: 52px; border-radius: 10px; object-fit: cover; border: 1px solid rgba(255,255,255,0.1); flex-shrink: 0;';
                    img.onerror = function() { this.remove(); };
                    badge.replaceWith(img);
                });
            }
            try { injectTimelinePhotos('exp-list', config.experiences); } catch(e) { console.warn('photo inject:', e); }
            try { injectTimelinePhotos('formation-list', config.formations); } catch(e) { console.warn('photo inject formations:', e); }
        }, 400);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
