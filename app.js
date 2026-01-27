document.addEventListener("DOMContentLoaded", () => {
    
    // --- PROFIL ---
    document.title = `root@portfolio:~# ${config.profile.name}`;
    const avatarEl = document.getElementById("profile-avatar");
    if(avatarEl) avatarEl.src = config.profile.avatar;
    const nameEl = document.getElementById("profile-name");
    if(nameEl) nameEl.innerHTML = `${config.profile.name}<span class="cursor">_</span>`;
    const statusEl = document.getElementById("profile-status");
    if(statusEl) statusEl.innerText = config.profile.status;
    const bioEl = document.getElementById("profile-bio");
    if(bioEl) bioEl.innerText = config.profile.bio;
    const githubLink = document.getElementById("link-github");
    if(githubLink) githubLink.href = config.social.github;
    const linkedinLink = document.getElementById("link-linkedin");
    if(linkedinLink) linkedinLink.href = config.social.linkedin;
    const emailText = document.getElementById("email-text");
    if(emailText) emailText.innerText = config.profile.email;
    const footerEl = document.getElementById("footer-copy");
    if(footerEl) footerEl.innerHTML = `&copy; ${new Date().getFullYear()} ${config.profile.name} - GitHub Pages`;

    // Skills Header
    const skillsContainer = document.getElementById("skills-section");
    if(skillsContainer) {
        config.skills.forEach(skill => {
            const span = document.createElement("span");
            span.className = "skill-tag";
            span.innerText = skill;
            skillsContainer.appendChild(span);
        });
    }

    // Certifications
    const certList = document.getElementById("cert-list");
    if(certList) {
        config.certifications.forEach(cert => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="cert-name">${cert.name}</span>
                <a href="${cert.url}" target="_blank" class="cert-btn">Voir ➜</a>
            `;
            certList.appendChild(li);
        });
    }

    // Compétences (Dropdown)
    const compList = document.getElementById("comp-list");
    if(compList && config.competences) {
        config.competences.forEach((comp, index) => {
            const li = document.createElement("li");
            li.className = "comp-card-container"; 
            const detailsHTML = comp.details.map(d => `<li>• ${d}</li>`).join('');
            li.innerHTML = `
                <span class="cert-name">${comp.name}</span>
                <div class="comp-dropdown-wrapper">
                    <button class="cert-btn comp-toggle" onclick="toggleComp(event, 'comp-drop-${index}')">▼</button>
                    <ul id="comp-drop-${index}" class="comp-dropdown-menu">
                        ${detailsHTML}
                    </ul>
                </div>
            `;
            compList.appendChild(li);
        });
    }

    // Typewriter
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

    // --- PROJETS (AVEC FIX DOCUMENTS) ---
    const grid = document.getElementById("project-grid");

    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = `${window.location.origin}${path}Documents/`; // <-- Majuscule ici

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
                    <div class="arrow">▼</div>
                </div>
                <div id="${viewerId}" class="pdf-container"></div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });

    // Modal
    const emailTrigger = document.getElementById("email-trigger");
    if(emailTrigger) {
        emailTrigger.addEventListener("click", function(e) {
            e.preventDefault();
            document.getElementById("email-modal").style.display = "flex";
        });
    }

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.comp-dropdown-wrapper')) {
            document.querySelectorAll('.comp-dropdown-menu').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.comp-toggle').forEach(el => el.classList.remove('active'));
        }
    });
});

window.toggleComp = function(event, id) {
    event.stopPropagation(); 
    const menu = document.getElementById(id);
    const
