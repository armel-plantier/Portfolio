document.addEventListener("DOMContentLoaded", () => {
    
    // --- 0. INITIALISATION ANIMATION ---
    // On ajoute la classe 'hidden-start' pour cacher les éléments UNIQUEMENT si le JS fonctionne
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('hidden-start'));

    // --- 1. CHARGEMENT CONFIG (MODE SÉCURISÉ) ---
    let data = {};
    try {
        if (typeof config === 'undefined') throw new Error("Config non trouvée");
        data = config;
    } catch (e) {
        console.error("Erreur Config:", e);
        data = {
            profile: { name: "Erreur", job: "Système", status: "Error", bio: "Fichier config.js introuvable ou erreur de syntaxe.", email: "error", avatar: "" },
            social: { github: "#", linkedin: "#" },
            skills: ["Erreur"], projects: [], certifications: [], history: []
        };
    }

    const { profile, social, skills, projects, certifications, history } = data;

    // --- 2. REMPLISSAGE ---
    const safeSetText = (id, text) => { if(document.getElementById(id)) document.getElementById(id).textContent = text; };
    const safeSetHTML = (id, html) => { if(document.getElementById(id)) document.getElementById(id).innerHTML = html; };

    safeSetText('profile-name', profile.name);
    
    const avatarImg = document.getElementById('profile-avatar');
    if(avatarImg) avatarImg.src = profile.avatar || "https://via.placeholder.com/150";
    
    safeSetHTML('profile-status', `<span class="status-dot"></span>${profile.status}`);
    safeSetHTML('profile-bio', profile.bio ? profile.bio.replace(/\n/g, "<br>") : "");

    // Typewriter
    const typeWriterElement = document.getElementById('typewriter-area');
    if (typeWriterElement && profile.job) {
        let i = 0;
        const txt = profile.job; 
        function typeWriter() {
            if (i < txt.length) {
                typeWriterElement.innerHTML += txt.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    }

    // Liens
    const ghLink = document.getElementById('link-github');
    const liLink = document.getElementById('link-linkedin');
    if(ghLink) ghLink.href = social.github;
    if(liLink) liLink.href = social.linkedin;

    // Modale Email
    const modal = document.getElementById('email-modal');
    const emailTrigger = document.getElementById('email-trigger');
    if(emailTrigger && modal) {
        emailTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            const emailTxt = document.getElementById('email-text');
            if(emailTxt) emailTxt.textContent = profile.email;
            modal.style.display = 'flex';
        });
    }

    // Sections
    const skillsContainer = document.getElementById('skills-section');
    if(skillsContainer && skills) {
        skills.forEach(skill => {
            const span = document.createElement('span');
            span.className = 'skill-tag';
            span.textContent = skill;
            skillsContainer.appendChild(span);
        });
    }

    const projectContainer = document.getElementById('project-grid');
    if(projectContainer && projects) {
        projects.forEach((proj, index) => {
            const card = document.createElement('article');
            card.className = 'project-card';
            let pdfBlock = proj.pdf ? `<div id="pdf-${index}" class="pdf-container"><iframe src="${proj.pdf}" width="100%" height="100%" style="border:none;"></iframe></div>` : '';
            card.innerHTML = `
                <div class="card-header" onclick="toggleProject(${index})">
                    <div class="icon">${proj.icon}</div>
                    <div class="meta"><h4>${proj.title}</h4><p>${proj.desc}</p></div>
                    ${proj.pdf ? '<span class="arrow">▼</span>' : ''}
                </div>
                ${pdfBlock}
            `;
            projectContainer.appendChild(card);
        });
    }

    const historyContainer = document.getElementById('exp-list');
    if(historyContainer && history) {
        history.forEach(item => {
            const li = document.createElement('li');
            li.className = 'timeline-item';
            li.innerHTML = `<span class="timeline-date">${item.date}</span><h4 class="timeline-title">${item.title}</h4><div class="timeline-company">${item.company}</div><p class="timeline-desc">${item.desc}</p>`;
            historyContainer.appendChild(li);
        });
    }

    const certContainer = document.getElementById('cert-list');
    if(certContainer && certifications) {
        certifications.forEach(cert => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="cert-name">${cert.name}</span><span class="cert-btn">${cert.date}</span>`;
            certContainer.appendChild(li);
        });
    }

    // --- THEME ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    if(localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        if(themeBtn) themeBtn.textContent = '🌙';
    }
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');
            themeBtn.textContent = isLight ? '🌙' : '☀️';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // Footer
    safeSetHTML('footer-copy', `&copy; ${new Date().getFullYear()} ${profile.name} | Tous droits réservés.`);
    safeSetText('client-os', navigator.platform);

    // --- ANIMATION APPARITION (FIX) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.classList.remove('hidden-start'); // On enlève le cache
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
});

// FONCTIONS GLOBALES
function toggleProject(index) {
    const pdf = document.getElementById(`pdf-${index}`);
    const head = pdf ? pdf.previousElementSibling : null;
    if (pdf) {
        const visible = pdf.style.display === "block";
        document.querySelectorAll('.pdf-container').forEach(e => e.style.display = 'none');
        document.querySelectorAll('.card-header').forEach(e => e.classList.remove('active'));
        if (!visible) {
            pdf.style.display = "block";
            if(head) head.classList.add('active');
        }
    }
}
function closeModal() { document.getElementById('email-modal').style.display = 'none'; }
function copyEmail() {
    const email = document.getElementById('email-text').textContent;
    navigator.clipboard.writeText(email).then(() => {
        const fb = document.getElementById('copy-feedback');
        if(fb) { fb.textContent = "Copié !"; setTimeout(() => fb.textContent = "", 2000); }
    });
}
