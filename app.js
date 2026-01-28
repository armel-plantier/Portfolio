document.addEventListener("DOMContentLoaded", () => {
    
    if (typeof config === 'undefined') { console.error("ERREUR : config.js manquant"); return; }

    // --- 0. NAVIGATION (AJOUTÉ) ---
    const navContainer = document.getElementById("nav-list");
    if (navContainer && config.navigation) {
        config.navigation.forEach(link => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.innerText = link.title;
            a.href = link.link;
            li.appendChild(a);
            navContainer.appendChild(li);
        });
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

    // --- 2. PROFIL ---
    document.title = `${config.profile.name} | Portfolio`;
    // Ajout FAVICON
    const favLink = document.getElementById("favicon-link");
    if(favLink && config.profile.favicon) favLink.href = config.profile.favicon;

    const avatarEl = document.getElementById("profile-avatar");
    if(avatarEl) avatarEl.src = config.profile.avatar;
    
    document.getElementById("profile-name").innerText = config.profile.name;
    document.getElementById("profile-status").innerText = config.profile.status;
    document.getElementById("profile-bio").innerText = config.profile.bio;
    
    const gh = document.getElementById("link-github");
    if(gh) gh.href = config.social.github;
    
    const lk = document.getElementById("link-linkedin");
    if(lk) lk.href = config.social.linkedin;
    
    document.getElementById("footer-copy").innerHTML = `&copy; ${new Date().getFullYear()} ${config.profile.name}.`;

    // --- 3. HEADER SKILLS ---
    const skillsContainer = document.getElementById("skills-section");
    if(skillsContainer && config.skills) {
        config.skills.forEach(s => {
            const span = document.createElement("span"); 
            span.className = "skill-tag"; 
            span.innerText = s;
            skillsContainer.appendChild(span);
        });
    }

    // --- 4. PROJETS ---
    const grid = document.getElementById("project-grid");
    
    // Calcul de l'URL absolue nécessaire pour Google Viewer
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = `${window.location.origin}${path}Documents/`; 
    
    const PROJECT_LIMIT = 3;

    if (grid && config.projects) {
        config.projects.forEach((proj, index) => {
            const vid = `viewer_${index}`;
            const div = document.createElement("div"); 
            div.className = "project-card";
            
            if (index >= PROJECT_LIMIT) div.classList.add("hidden-item");
            
            const fullPdfUrl = baseUrl + proj.path;

            div.innerHTML = `
                <div class="card-header" onclick="togglePDF('${vid}', '${fullPdfUrl}')">
                    <div class="icon">${proj.icon}</div>
                    <div class="meta">
                        <h4>${proj.title}</h4>
                        <p>${proj.description}</p>
                    </div>
                </div>
                <div id="${vid}" class="pdf-container"></div>
            `;
            grid.appendChild(div);
        });
        
        if (config.projects.length > PROJECT_LIMIT) {
            createToggleBtn(grid, PROJECT_LIMIT, "Voir tous les projets");
        }
    }

    // --- 5. PARCOURS ---
    const expList = document.getElementById("exp-list");
    const EXP_LIMIT = 3;
    if(expList && config.experiences) {
        config.experiences.forEach((exp, index) => {
            const li = document.createElement("li"); 
            li.className = "timeline-item";
            if (index >= EXP_LIMIT) li.classList.add("hidden-item");
            
            li.innerHTML = `
                <span class="timeline-date">${exp.date}</span>
                <h4 class="timeline-title">${exp.role} <span style="font-weight:400;opacity:0.8;">@ ${exp.company}</span></h4>
                <p class="timeline-desc">${exp.description}</p>
            `;
            expList.appendChild(li);
        });
        if (config.experiences.length > EXP_LIMIT) createToggleBtn(expList, EXP_LIMIT, "Historique complet");
    }

    // --- 6. COMPETENCES ---
    const compList = document.getElementById("comp-list");
    const COMP_LIMIT = 4;
    if(compList && config.competences) {
        config.competences.forEach((comp, index) => {
            const li = document.createElement("li"); 
            li.className = "comp-card-container";
            if (index >= COMP_LIMIT) li.classList.add("hidden-item");
            
            const details = comp.details.map(d => `<li>• ${d}</li>`).join('');
            
            li.innerHTML = `
                <div class="comp-header">
                    <span class="cert-name">${comp.name}</span>
                    <button class="cert-btn comp-toggle" onclick="toggleComp(event, 'comp-drop-${index}')">▼</button>
                </div>
                <ul id="comp-drop-${index}" class="comp-dropdown-menu" style="display:none;">${details}</ul>
            `;
            compList.appendChild(li);
        });
        if (config.competences.length > COMP_LIMIT) createToggleBtn(compList, COMP_LIMIT, "Voir toutes");
    }

    // --- 7. CERTIFICATIONS ---
    const certList = document.getElementById("cert-list");
    const CERT_LIMIT = 4;
    if(certList && config.certifications) {
        config.certifications.forEach((cert, index) => {
            const li = document.createElement("li");
            if (index >= CERT_LIMIT) li.classList.add("hidden-item");
            
            li.innerHTML = `<span class="cert-name">${cert.name}</span><a href="${cert.url}" target="_blank" class="cert-btn">Voir ➜</a>`;
            certList.appendChild(li);
        });
        if (config.certifications.length > CERT_LIMIT) createToggleBtn(certList, CERT_LIMIT, "Voir toutes");
    }

    // --- 8. TYPEWRITER ---
    const textEl = document.getElementById("typewriter-area");
    if(textEl && config.profile.typewriterText) {
        const txt = config.profile.typewriterText; textEl.innerText = ""; let i=0;
        function type() { if(i<txt.length) { textEl.innerHTML += txt.charAt(i); i++; setTimeout(type, 50); } }
        setTimeout(type, 500);
    }

    // --- 9. MODALE EMAIL ---
    const emailTrigger = document.getElementById("email-trigger");
    if(emailTrigger) {
        emailTrigger.addEventListener("click", function(e) {
            e.preventDefault();
            const emailSpan = document.getElementById("email-text");
            emailSpan.innerText = config.profile.email || "armel.plantier@protonmail.com";
            document.getElementById("email-modal").style.display = "flex";
        });
    }

    // Clic extérieur pour fermer les menus compétences
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.comp-card-container')) {
            document.querySelectorAll('.comp-dropdown-menu').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.comp-toggle').forEach(el => el.classList.remove('active'));
        }
    });
});

// --- FONCTIONS UTILS ---

function createToggleBtn(container, limit, txt) {
    const div = document.createElement("div"); 
    div.className = "load-more-container";
    const btn = document.createElement("button"); 
    btn.className = "load-more-btn"; 
    btn.innerText = `↓ ${txt}`;
    let expanded = false;
    
    btn.onclick = () => {
        expanded = !expanded;
        const children = container.children;
        for(let i=0; i<children.length; i++) {
            if(i>=limit) {
                if(expanded) { 
                    children[i].classList.remove("hidden-item"); 
                    children[i].style.opacity=0; 
                    setTimeout(()=>children[i].style.opacity=1, 50); 
                } else { 
                    children[i].classList.add("hidden-item"); 
                }
            }
        }
        btn.innerText = expanded ? `↑ Voir moins` : `↓ ${txt}`;
    };
    div.appendChild(btn); 
    container.parentNode.insertBefore(div, container.nextSibling);
}

window.toggleComp = function(e, id) {
    e.stopPropagation(); 
    const menu = document.getElementById(id); 
    const btn = e.currentTarget;
    
    document.querySelectorAll('.comp-dropdown-menu').forEach(el => { if(el.id!==id) el.style.display='none'; });
    document.querySelectorAll('.comp-toggle').forEach(el => { if(el!==btn) el.classList.remove('active'); });
    
    if(menu.style.display==='block') { 
        menu.style.display='none'; 
        btn.classList.remove('active'); 
    } else { 
        menu.style.display='block'; 
        btn.classList.add('active'); 
    }
};

window.togglePDF = function(id, url) {
    const c = document.getElementById(id);
    if(c.style.display==='block') { 
        c.style.display='none'; 
        c.innerHTML=''; 
        return; 
    }
    document.querySelectorAll('.pdf-container').forEach(el => { 
        el.style.display='none'; 
        el.innerHTML=''; 
    });
    c.innerHTML = `<iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true" width="100%" height="500px" style="border:none;"></iframe>`;
    c.style.display='block';
};

window.closeModal = function() { 
    document.getElementById("email-modal").style.display = "none"; 
};

window.onclick = function(e) { 
    if(e.target == document.getElementById("email-modal")) window.closeModal(); 
};

window.copyEmail = function() {
    const emailSpan = document.getElementById("email-text");
    const email = emailSpan.innerText;
    
    navigator.clipboard.writeText(email).then(() => {
        const fb = document.getElementById("copy-feedback");
        if (fb) {
            fb.innerText = "Adresse copiée ! ✅";
            setTimeout(() => {
                fb.innerText = "";
                window.closeModal();
            }, 1500);
        } else {
            const original = emailSpan.innerText;
            emailSpan.innerText = "Copié ! ✅";
            emailSpan.style.color = "#10b981";
            setTimeout(() => {
                emailSpan.innerText = original;
                emailSpan.style.color = "";
                window.closeModal();
            }, 1500);
        }
    });
};
