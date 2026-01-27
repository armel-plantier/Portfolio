document.addEventListener("DOMContentLoaded", () => {
    
    // Vérification de sécurité
    if (typeof config === 'undefined') {
        console.error("Config.js introuvable");
        return;
    }

    const { profile, social, skills, projects, certifications, history } = config;

    // 1. Profil
    document.getElementById('profile-name').textContent = profile.name;
    document.getElementById('profile-avatar').src = profile.avatar || "https://via.placeholder.com/150";
    document.getElementById('profile-status').textContent = profile.status;
    document.getElementById('profile-bio').innerHTML = profile.bio.replace(/\n/g, "<br>");
    document.getElementById('job-title').textContent = profile.job;

    // 2. Liens Sociaux
    document.getElementById('link-github').href = social.github;
    document.getElementById('link-linkedin').href = social.linkedin;

    // 3. Compétences
    const skillsContainer = document.getElementById('skills-section');
    skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.textContent = skill;
        skillsContainer.appendChild(span);
    });

    // 4. Projets
    const projectContainer = document.getElementById('project-grid');
    projects.forEach((proj, index) => {
        const card = document.createElement('article');
        card.className = 'project-card';
        
        let pdfBlock = '';
        if (proj.pdf) {
            pdfBlock = `<div id="pdf-${index}" class="pdf-container"><iframe src="${proj.pdf}" width="100%" height="100%" style="border:none;"></iframe></div>`;
        }

        card.innerHTML = `
            <div class="card-header" onclick="toggleProject(${index})">
                <div class="icon">${proj.icon}</div>
                <div class="meta"><h4>${proj.title}</h4><p>${proj.desc}</p></div>
            </div>
            ${pdfBlock}
        `;
        projectContainer.appendChild(card);
    });

    // 5. Parcours
    const historyContainer = document.getElementById('exp-list');
    history.forEach(item => {
        const li = document.createElement('li');
        li.className = 'timeline-item';
        li.innerHTML = `<span class="timeline-date">${item.date}</span><br><strong>${item.title}</strong> - ${item.company}<br><span style="font-size:0.9em; color:#8b949e;">${item.desc}</span>`;
        historyContainer.appendChild(li);
    });

    // 6. Certifications
    const certContainer = document.getElementById('cert-list');
    certifications.forEach(cert => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${cert.name}</span><span>${cert.date}</span>`;
        certContainer.appendChild(li);
    });

    // 7. Thème
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });

    // 8. Modale Email
    document.getElementById('email-trigger').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('email-text').textContent = profile.email;
        document.getElementById('email-modal').style.display = 'flex';
    });

    document.getElementById('footer-copy').innerHTML = `&copy; ${new Date().getFullYear()} ${profile.name}`;
});

// Fonctions globales
function toggleProject(index) {
    const pdf = document.getElementById(`pdf-${index}`);
    if(pdf) pdf.style.display = (pdf.style.display === "block") ? "none" : "block";
}

function closeModal() {
    document.getElementById('email-modal').style.display = 'none';
}

function copyEmail() {
    const email = document.getElementById('email-text').textContent;
    navigator.clipboard.writeText(email).then(() => {
        document.getElementById('copy-feedback').textContent = "Copié !";
    });
}
