document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. CONFIGURATION DU PROFIL ---
    document.title = `root@portfolio:~# ${config.profile.name}`;
    
    // Avatar & Textes
    const avatarEl = document.getElementById("profile-avatar");
    if(avatarEl) avatarEl.src = config.profile.avatar;

    const nameEl = document.getElementById("profile-name");
    if(nameEl) nameEl.innerHTML = `${config.profile.name}<span class="cursor">_</span>`;

    const statusEl = document.getElementById("profile-status");
    if(statusEl) statusEl.innerText = config.profile.status;

    const bioEl = document.getElementById("profile-bio");
    if(bioEl) bioEl.innerText = config.profile.bio;

    // Liens
    const githubLink = document.getElementById("link-github");
    if(githubLink) githubLink.href = config.social.github;

    const linkedinLink = document.getElementById("link-linkedin");
    if(linkedinLink) linkedinLink.href = config.social.linkedin;

    // --- 2. INJECTION DES TITRES DE SECTION (CORRIGÉ) ---
    // On affiche directement ce qu'il y a dans le config, sans rajouter d'icône en dur
    const titleCerts = document.getElementById("title-certs");
    if(titleCerts) titleCerts.innerHTML = config.titles.certifications;

    const titleProjects = document.getElementById("title-projects");
    if(titleProjects) titleProjects.innerHTML = config.titles.projects;

    // --- 3. SKILLS & CERTIFS ---
    const skillsContainer = document.getElementById("skills-section");
    if(skillsContainer) {
        config.skills.forEach(skill => {
            const span = document.createElement("span");
            span.className = "skill-tag";
            span.innerText = skill;
            skillsContainer.appendChild(span);
        });
    }

    const certList = document.getElementById("cert-list");
    if(certList) {
        config.certifications.forEach(cert => {
            const li = document.createElement("li");
            li.innerText = cert;
            certList.appendChild(li);
        });
    }

    // --- 4. MACHINE À ÉCRIRE ---
    const textElement = document.getElementById("typewriter-area");
    const textToType = config.profile.typewriterText;
    
    if(textElement) {
        textElement.innerText = ""; 
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < textToType.length) {
                textElement.innerHTML += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 500);
    }

    // --- 5. GÉNÉRATION DES PROJETS ---
    const grid = document.getElementById("project-grid");
    const baseUrl = `https://armel-plantier.github.io/Technova/Documents/`;

    config.projects.forEach((project, index) => {
        const viewerId = `viewer_${index}`;
        const fullPdfUrl = baseUrl + project.path;
        
        const cardHTML = `
            <div class="project-card">
                <div class="card-header" onclick="togglePDF('${viewerId}', '${fullPdfUrl}')">
                    <div class="icon">${project.icon}</div>
                    <div class="meta">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                    </div>
                    <a href="${fullPdfUrl}" target="_blank" class="external-btn" onclick="event.stopPropagation()" title="Ouvrir">↗</a>
                    <div class="arrow">▼</div>
                </div>
                <div id="${viewerId}" class="pdf-container"></div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });

    // --- 6. MODAL EMAIL ---
    const emailTrigger = document.getElementById("email-trigger");
    const emailText = document.getElementById("email-text");
    if(emailText) emailText.innerText = config.profile.email; 

    if(emailTrigger) {
        emailTrigger.addEventListener("click", function(e) {
            e.preventDefault();
            document.getElementById("email-modal").style.display = "flex";
        });
    }
    
    // Footer
    const footerEl = document.getElementById("footer-copy");
    if(footerEl) footerEl.innerHTML = `&copy; ${new Date().getFullYear()} ${config.profile.name} - GitHub Pages`;
});

// --- FONCTIONS GLOBALES ---
window.togglePDF = function(containerId, url) {
    const container = document.getElementById(containerId);
    const header = container.previousElementSibling;

    if (container.style.display === "block") {
        container.style.display = "none";
        container.innerHTML = "";
        header.classList.remove("active");
        return;
    }

    document.querySelectorAll('.pdf-container').forEach(el => {
        el.style.display = 'none';
        el.innerHTML = '';
    });
    document.querySelectorAll('.card-header').forEach(el => el.classList.remove('active'));

    const viewerUrl = "https://docs.google.com/viewer?url=" + encodeURIComponent(url) + "&embedded=true";
    const iframe = document.createElement('iframe');
    iframe.src = viewerUrl;
    iframe.width = "100%";
    iframe.height = "600px";
    iframe.style.border = "none";
    container.appendChild(iframe);
    container.style.display = "block";
    header.classList.add("active");
};

window.closeModal = function() {
    document.getElementById("email-modal").style.display = "none";
    document.getElementById("copy-feedback").innerText = "";
};

window.onclick = function(event) {
    const modal = document.getElementById("email-modal");
    if (event.target == modal) closeModal();
};

window.copyEmail = function() {
    const emailText = document.getElementById("email-text").innerText;
    navigator.clipboard.writeText(emailText).then(() => {
        const feedback = document.getElementById("copy-feedback");
        if(feedback) {
            feedback.innerText = "Adresse copiée ! ✅";
            setTimeout(closeModal, 2000);
        }
    });
};
