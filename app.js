document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. CHARGEMENT DES DONNÉES DEPUIS CONFIG.JS ---
    // Si config n'existe pas, on met des valeurs par défaut pour éviter le bug
    const safeConfig = (typeof config !== 'undefined') ? config : {
        profile: { name: "Erreur Config", job: "Check config.js", status: "Offline", bio: "Fichier config.js introuvable.", email: "error@system.local", avatar: "" },
        social: { github: "#", linkedin: "#" },
        skills: [], projects: [], certifications: [], history: []
    };

    const { profile, social, skills, projects, certifications, history } = safeConfig;

    // --- 2. REMPLISSAGE DU PROFIL ---
    document.getElementById('profile-name').textContent = profile.name;
    document.getElementById('profile-avatar').src = profile.avatar || "https://via.placeholder.com/150";
    document.getElementById('profile-status').innerHTML = `<span class="status-dot"></span>${profile.status}`;
    document.getElementById('profile-bio').innerHTML = profile.bio.replace(/\n/g, "<br>");
    
    // Typewriter Effect
    const typeWriterElement = document.getElementById('typewriter-area');
    let i = 0;
    const txt = profile.job; 
    const speed = 100;

    function typeWriter() {
        if (i < txt.length) {
            typeWriterElement.innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();

    // Liens Sociaux
    document.getElementById('link-github').href = social.github;
    document.getElementById('link-linkedin').href = social.linkedin;
    
    // Email Modale
    const modal = document.getElementById('email-modal');
    const emailTrigger = document.getElementById('email-trigger');
    
    if(emailTrigger) {
        emailTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('email-text').textContent = profile.email;
            modal.style.display = 'flex';
        });
    }

    // --- 3. GÉNÉRATION DES SECTIONS ---

    // SKILLS (Tags)
    const skillsContainer = document.getElementById('skills-section');
    skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.textContent = skill;
        skillsContainer.appendChild(span);
    });

    // PROJETS
    const projectContainer = document.getElementById('project-grid');
    projects.forEach((proj, index) => {
        const card = document.createElement('article');
        card.className = 'project-card';
        
        let pdfBlock = '';
        if (proj.pdf) {
            pdfBlock = `
                <div id="pdf-${index}" class="pdf-container">
                    <iframe src="${proj.pdf}" width="100%" height="100%" style="border:none;"></iframe>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="card-header" onclick="toggleProject(${index})">
                <div class="icon">${proj.icon}</div>
                <div class="meta">
                    <h4>${proj.title}</h4>
                    <p>${proj.desc}</p>
                </div>
                ${proj.pdf ? '<span class="arrow">▼</span>' : ''}
            </div>
            ${pdfBlock}
        `;
        projectContainer.appendChild(card);
    });

    // PARCOURS (TIMELINE)
    const historyContainer = document.getElementById('exp-list');
    history.forEach(item => {
        const li = document.createElement('li');
        li.className = 'timeline-item';
        li.innerHTML = `
            <span class="timeline-date">${item.date}</span>
            <h4 class="timeline-title">${item.title}</h4>
            <div class="timeline-company">${item.company}</div>
            <p class="timeline-desc">${item.desc}</p>
        `;
        historyContainer.appendChild(li);
    });

    // COMPÉTENCES (LISTE DÉROULANTE)
    const compContainer = document.getElementById('comp-list');
    // On suppose ici que "certifications" dans config contient aussi les compétences techniques sous forme d'objet
    // Sinon, utilise une autre variable si tu en as une.
    // Pour l'exemple, j'utilise une variable fictive ou je réutilise certifications si besoin.
    // Si tu as une liste "competences" dans config.js, utilise-la ici.
    
    // Exemple simple si pas de données spécifiques :
    // (Tu peux adapter selon ton config.js)

    // CERTIFICATIONS
    const certContainer = document.getElementById('cert-list');
    certifications.forEach(cert => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="cert-name">${cert.name}</span>
            <span class="cert-btn">${cert.date}</span>
        `;
        certContainer.appendChild(li);
    });


    // --- 4. GESTION DU THEME ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check préférence
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeBtn.textContent = '🌙';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        themeBtn.textContent = isLight ? '🌙' : '☀️';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // --- 5. INFOS SYSTÈME FOOTER ---
    document.getElementById('footer-copy').innerHTML = `&copy; ${new Date().getFullYear()} ${profile.name} | Tous droits réservés.`;
    document.getElementById('client-os').textContent = navigator.platform;


    // --- 6. SCROLL REVEAL (Le correctif pour l'écran noir) ---
    const observerOptions = {
        threshold: 0.1 // 10% visible suffit pour déclencher
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // On arrête d'observer une fois affiché
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

});

// FONCTIONS GLOBALES
function toggleProject(index) {
    const pdfContainer = document.getElementById(`pdf-${index}`);
    const header = pdfContainer.previousElementSibling;
    
    if (pdfContainer) {
        const isVisible = pdfContainer.style.display === "block";
        
        // Reset tous
        document.querySelectorAll('.pdf-container').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.card-header').forEach(el => el.classList.remove('active'));

        if (!isVisible) {
            pdfContainer.style.display = "block";
            header.classList.add('active');
        }
    }
}

function closeModal() {
    document.getElementById('email-modal').style.display = 'none';
}

function copyEmail() {
    const email = document.getElementById('email-text').textContent;
    navigator.clipboard.writeText(email).then(() => {
        const feedback = document.getElementById('copy-feedback');
        feedback.textContent = "Copié dans le presse-papier !";
        setTimeout(() => feedback.textContent = "", 2000);
    });
}
