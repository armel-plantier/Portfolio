document.addEventListener('DOMContentLoaded', () => {
    // Vérification de sécurité de base
    if (typeof config === 'undefined') {
        console.error("Erreur: Le fichier config.js n'est pas chargé.");
        return;
    }

    initTheme();
    renderHeader();
    renderHero();
    renderProjects();
    renderTimeline();
    renderSkills();
    renderCertifications();
    renderFooter();
    initModal();
    initScrollEffects();
});

/* =========================================
   1. GESTION DU THÈME
   ========================================= */
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Vérifie le stockage local ou la préférence système
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeBtn.textContent = '🌙';
    } else {
        themeBtn.textContent = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        themeBtn.textContent = isLight ? '🌙' : '☀️';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

/* =========================================
   2. RENDU HEADER & NAV
   ========================================= */
function renderHeader() {
    // Favicon
    document.getElementById('favicon-link').href = config.profile.favicon;
    
    // Avatar & Info
    const avatarImg = document.getElementById('profile-avatar');
    avatarImg.src = config.profile.avatar;
    avatarImg.alt = `Avatar de ${config.profile.name}`;
    
    document.getElementById('profile-name').textContent = config.profile.name;
    document.getElementById('profile-status').textContent = config.profile.status;

    // Navigation
    const navList = document.getElementById('nav-list');
    config.navigation.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = item.title;
        a.href = item.link;
        li.appendChild(a);
        navList.appendChild(li);
    });

    // Mobile Menu Toggle
    const menuIcon = document.querySelector('.menu-icon');
    const header = document.querySelector('.app-header');
    
    menuIcon.addEventListener('click', () => {
        header.classList.toggle('menu-open');
    });
}

/* =========================================
   3. RENDU HERO (Typewriter & Social)
   ========================================= */
function renderHero() {
    // Typewriter Effect
    const typeWriterElement = document.getElementById('typewriter-area');
    const textToType = config.profile.typewriterText;
    let charIndex = 0;

    function type() {
        if (charIndex < textToType.length) {
            typeWriterElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, 50 + Math.random() * 50); // Vitesse aléatoire pour réalisme
        }
    }
    type();

    // Bio & Social
    document.getElementById('profile-bio').textContent = config.profile.bio;
    document.getElementById('link-github').href = config.social.github;
    document.getElementById('link-linkedin').href = config.social.linkedin;

    // Tags Compétences Rapides
    const skillsContainer = document.getElementById('skills-section');
    config.skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.textContent = skill;
        skillsContainer.appendChild(span);
    });
}

/* =========================================
   4. RENDU PROJETS (Grille + PDF)
   ========================================= */
function renderProjects() {
    const grid = document.getElementById('project-grid');
    
    config.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';

        // Badge "New"
        if (project.isNew) {
            const badge = document.createElement('span');
            badge.className = 'new-badge';
            badge.textContent = 'NOUVEAU';
            card.appendChild(badge);
        }

        // Header de la carte (Cliquable)
        const header = document.createElement('div');
        header.className = 'card-header';
        
        const iconDiv = document.createElement('div');
        iconDiv.className = 'icon';
        iconDiv.textContent = project.icon;

        const metaDiv = document.createElement('div');
        metaDiv.className = 'meta';
        
        const h4 = document.createElement('h4');
        h4.textContent = project.title;
        
        const p = document.createElement('p');
        p.textContent = project.description;

        metaDiv.appendChild(h4);
        metaDiv.appendChild(p);
        header.appendChild(iconDiv);
        header.appendChild(metaDiv);

        // Container PDF
        const pdfContainer = document.createElement('div');
        pdfContainer.className = 'pdf-container';
        
        // Logique Toggle PDF
        header.addEventListener('click', () => {
            const isVisible = pdfContainer.style.display === 'block';
            
            // Fermer tous les autres PDFs
            document.querySelectorAll('.pdf-container').forEach(el => el.style.display = 'none');
            
            if (!isVisible) {
                // Créer l'iframe seulement au clic (Performance)
                if (!pdfContainer.hasChildNodes()) {
                    const iframe = document.createElement('iframe');
                    iframe.src = project.path;
                    iframe.width = "100%";
                    iframe.height = "100%";
                    iframe.style.border = "none";
                    pdfContainer.appendChild(iframe);
                }
                pdfContainer.style.display = 'block';
            }
        });

        card.appendChild(header);
        card.appendChild(pdfContainer);
        grid.appendChild(card);
    });
}

/* =========================================
   5. RENDU PARCOURS (Timeline)
   ========================================= */
function renderTimeline() {
    const list = document.getElementById('exp-list');
    
    config.experiences.forEach(exp => {
        const li = document.createElement('li');
        li.className = 'timeline-item';

        const date = document.createElement('span');
        date.className = 'timeline-date';
        date.textContent = exp.date;

        const title = document.createElement('h4');
        title.className = 'timeline-title';
        title.textContent = `${exp.role} @ ${exp.company}`;

        const desc = document.createElement('p');
        desc.className = 'timeline-desc';
        desc.textContent = exp.description;

        li.appendChild(date);
        li.appendChild(title);
        li.appendChild(desc);
        list.appendChild(li);
    });
}

/* =========================================
   6. RENDU COMPÉTENCES (Dropdowns)
   ========================================= */
function renderSkills() {
    const list = document.getElementById('comp-list'); // C'est une div grid maintenant

    config.competences.forEach(comp => {
        const container = document.createElement('div');
        container.className = 'comp-card-container';

        // Header du menu déroulant
        const header = document.createElement('div');
        header.className = 'comp-header';
        
        const icon = document.createTextNode(comp.icon + " ");
        const title = document.createElement('span');
        title.textContent = comp.name;
        
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'comp-toggle';
        toggleBtn.innerHTML = '▼'; // Caractère simple, sûr.

        header.appendChild(icon);
        header.appendChild(title);
        header.appendChild(toggleBtn);

        // Liste des détails (Cachée par défaut via CSS/JS logic)
        const ul = document.createElement('ul');
        ul.className = 'comp-dropdown-menu';
        ul.style.display = 'none';

        comp.details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            ul.appendChild(li);
        });

        // Event Listener pour l'accordéon
        header.addEventListener('click', () => {
            const isOpen = ul.style.display === 'block';
            ul.style.display = isOpen ? 'none' : 'block';
            toggleBtn.classList.toggle('active', !isOpen);
        });

        container.appendChild(header);
        container.appendChild(ul);
        list.appendChild(container);
    });
}

/* =========================================
   7. RENDU CERTIFICATIONS
   ========================================= */
function renderCertifications() {
    const list = document.getElementById('cert-list');

    config.certifications.forEach(cert => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'cert-card-container';
        
        // Ligne supérieure (Icone, Infos, Boutons)
        const headerRow = document.createElement('div');
        headerRow.className = 'cert-header-row';

        const iconBox = document.createElement('div');
        iconBox.className = 'cert-icon-box';
        iconBox.textContent = '📜'; 

        const infoDiv = document.createElement('div');
        infoDiv.className = 'cert-info';
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'cert-name';
        nameSpan.textContent = cert.name;
        
        const issuerSpan = document.createElement('span');
        issuerSpan.className = 'cert-issuer';
        issuerSpan.textContent = cert.issuer;

        infoDiv.appendChild(nameSpan);
        infoDiv.appendChild(issuerSpan);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'cert-actions';

        // Bouton Lien externe
        if (cert.url) {
            const linkBtn = document.createElement('a');
            linkBtn.href = cert.url;
            linkBtn.target = '_blank';
            linkBtn.rel = 'noopener noreferrer';
            linkBtn.className = 'cert-btn link-btn';
            linkBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';
            actionsDiv.appendChild(linkBtn);
        }

        // Bouton PDF
        let pdfViewer = null;
        if (cert.pdf) {
            const pdfBtn = document.createElement('button');
            pdfBtn.className = 'cert-btn pdf-btn';
            pdfBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>';
            
            // Viewer Container
            pdfViewer = document.createElement('div');
            pdfViewer.className = 'cert-pdf-viewer'; // Cache par défaut via CSS

            pdfBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Évite de déclencher d'autres clics
                const isVisible = pdfViewer.style.display === 'block';
                
                // Reset autres viewers
                document.querySelectorAll('.cert-pdf-viewer').forEach(el => el.style.display = 'none');

                if (!isVisible) {
                    if (!pdfViewer.hasChildNodes()) {
                        const iframe = document.createElement('iframe');
                        iframe.src = cert.pdf;
                        iframe.width = "100%";
                        iframe.height = "100%";
                        iframe.style.border = "none";
                        pdfViewer.appendChild(iframe);
                    }
                    pdfViewer.style.display = 'block';
                }
            });
            actionsDiv.appendChild(pdfBtn);
        }

        headerRow.appendChild(iconBox);
        headerRow.appendChild(infoDiv);
        headerRow.appendChild(actionsDiv);

        cardContainer.appendChild(headerRow);
        if (pdfViewer) cardContainer.appendChild(pdfViewer);
        
        // Wrapper li pour la grille
        const li = document.createElement('li');
        li.appendChild(cardContainer);
        list.appendChild(li);
    });
}

/* =========================================
   8. FOOTER & MODAL & SCROLL
   ========================================= */
function renderFooter() {
    const year = new Date().getFullYear();
    document.getElementById('footer-copy').textContent = `© ${year} ${config.profile.name}. Tous droits réservés.`;
    document.getElementById('email-text').textContent = config.profile.email;
}

function initModal() {
    const modal = document.getElementById('email-modal');
    const trigger = document.getElementById('email-trigger');
    const closeBtn = document.getElementById('close-modal-btn');

    const openModal = (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
    };

    const closeModal = () => {
        modal.style.display = 'none';
    };

    trigger.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    // Fermer si on clique en dehors
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function initScrollEffects() {
    const header = document.querySelector('.app-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled', 'menu-open');
        }
    });
}
