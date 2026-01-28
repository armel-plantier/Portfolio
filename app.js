document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. GÉNÉRATION DE LA NAVBAR DYNAMIQUE ---
    const navList = document.getElementById("nav-list");
    if (navList && config.navigation) {
        config.navigation.forEach(navItem => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${navItem.link}">${navItem.title}</a>`;
            navList.appendChild(li);
        });
    }

    // --- 2. HEADER GAUCHE (Identité & Favicon) ---
    if(config.profile) {
        // Avatar, Nom, Statut, Bio
        const avatar = document.getElementById("profile-avatar");
        if(avatar) avatar.src = config.profile.avatar;

        const name = document.getElementById("profile-name");
        if(name) name.innerText = config.profile.name;

        const status = document.getElementById("profile-status");
        if(status) status.innerText = config.profile.status;

        const bio = document.getElementById("profile-bio");
        if(bio) bio.innerText = config.profile.bio;
        
        // Footer Copyright
        document.getElementById("footer-copy").innerText = "© " + new Date().getFullYear() + " " + config.profile.name;

        // GESTION DU FAVICON
        const favLink = document.getElementById("favicon-link");
        if(favLink && config.profile.favicon) {
            favLink.href = config.profile.favicon;
        }
    }

    // --- 3. TAGS SKILLS ---
    const skillsContainer = document.getElementById("skills-section");
    if(skillsContainer && config.skills) {
        config.skills.forEach(skill => {
            const span = document.createElement("span");
            span.className = "skill-tag";
            span.innerText = skill;
            skillsContainer.appendChild(span);
        });
    }

    // --- 4. RÉSEAUX SOCIAUX ---
    if(config.social) {
        document.getElementById("link-github").href = config.social.github;
        document.getElementById("link-linkedin").href = config.social.linkedin;
    }

    // --- 5. PROJETS (Avec correction chemin PDF) ---
    const grid = document.getElementById("project-grid");
    // Chemin relatif vers dossier Documents
    const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1) + "Documents/";
    
    if(grid && config.projects) {
        config.projects.forEach((proj, index) => {
            const viewerId = `pdf-viewer-${index}`;
            const div = document.createElement("div");
            div.className = "project-card";
            div.innerHTML = `
                <div class="card-header" onclick="togglePDF('${viewerId}', '${basePath + proj.path}')">
                    <div class="icon">${proj.icon}</div>
                    <div class="meta">
                        <h4>${proj.title}</h4>
                        <p>${proj.description}</p>
                    </div>
                </div>
                <div id="${viewerId}" class="pdf-container"></div>
            `;
            grid.appendChild(div);
        });
    }

    // --- 6. EXPÉRIENCES ---
    const expList = document.getElementById("exp-list");
    if(expList && config.experiences) {
        config.experiences.forEach(exp => {
            const li = document.createElement("li");
            li.className = "timeline-item";
            li.innerHTML = `
                <span class="timeline-date">${exp.date}</span>
                <h4 class="timeline-title">${exp.role} <span style="font-weight:400; opacity:0.7;">@ ${exp.company}</span></h4>
                <p class="timeline-desc">${exp.description}</p>
            `;
            expList.appendChild(li);
        });
    }

    // --- 7. COMPÉTENCES (Menu déroulant) ---
    const compList = document.getElementById("comp-list");
    if(compList && config.competences) {
        config.competences.forEach((comp, i) => {
            const li = document.createElement("li");
            li.className = "comp-item"; 
            const detailsHTML = comp.details.map(d => `<li>• ${d}</li>`).join("");

            li.innerHTML = `
                <div class="comp-header" onclick="toggleComp('comp-details-${i}')">
                    <span class="cert-name">${comp.name}</span>
                    <button class="cert-btn">▼</button>
                </div>
                <ul id="comp-details-${i}" class="comp-dropdown" style="display:none;">
                    ${detailsHTML}
                </ul>
            `;
            compList.appendChild(li);
        });
    }

    // --- 8. CERTIFICATIONS ---
    const certList = document.getElementById("cert-list");
    if(certList && config.certifications) {
        config.certifications.forEach(cert => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="cert-name">${cert.name}</span>
                <a href="${cert.url}" target="_blank" class="cert-btn">Voir</a>
            `;
            certList.appendChild(li);
        });
    }

    // --- 9. TYPEWRITER EFFECT ---
    const typeEl = document.getElementById("typewriter-area");
    if(typeEl && config.profile.typewriterText) {
        const text = config.profile.typewriterText;
        let i = 0;
        function type() {
            if(i < text.length) {
                typeEl.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        setTimeout(type, 500);
    }

    // --- 10. MODAL EMAIL ---
    document.getElementById("email-trigger").onclick = (e) => {
        e.preventDefault();
        document.getElementById("email-text").innerText = config.profile.email;
        document.getElementById("email-modal").style.display = "flex";
    };

    // --- 11. THÈME DARK/LIGHT ---
    const themeBtn = document.getElementById("theme-toggle");
    if(localStorage.getItem("theme") === "light") document.body.classList.add("light-mode");
    
    themeBtn.onclick = () => {
        document.body.classList.toggle("light-mode");
        localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
    };
});

// FONCTIONS GLOBALES
window.closeModal = () => document.getElementById("email-modal").style.display = "none";

window.togglePDF = (id, url) => {
    const el = document.getElementById(id);
    document.querySelectorAll('.pdf-container').forEach(d => { if(d.id !== id) {d.style.display='none'; d.innerHTML=''} });
    
    if(el.style.display === 'block') {
        el.style.display = 'none';
        el.innerHTML = '';
    } else {
        el.innerHTML = `<iframe src="${url}" width="100%" height="500px" style="border:none;"></iframe>`;
        el.style.display = 'block';
    }
};

window.toggleComp = (id) => {
    const el = document.getElementById(id);
    el.style.display = (el.style.display === 'block') ? 'none' : 'block';
};
