document.addEventListener("DOMContentLoaded", () => {
    
    // --- VERIFICATION CONFIG ---
    if (typeof config === 'undefined') { console.error("Config missing"); return; }
    const escapeHTML = (str) => {
        if (!str) return '';
        return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    };

    // --- 1. THEME ---
    const themeBtn = document.getElementById("theme-toggle");
    const body = document.body;
    if (localStorage.getItem("theme") === "light") { body.classList.add("light-mode"); if(themeBtn) themeBtn.innerText = "🌙"; }
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            body.classList.toggle("light-mode");
            if (body.classList.contains("light-mode")) { themeBtn.innerText = "🌙"; localStorage.setItem("theme", "light"); } 
            else { themeBtn.innerText = "☀️"; localStorage.setItem("theme", "dark"); }
        });
    }

    // --- 2. PROFIL ---
    document.title = `${config.profile.name} | Portfolio`;
    if(document.getElementById("profile-avatar")) document.getElementById("profile-avatar").src = config.profile.avatar;
    if(document.getElementById("profile-name")) document.getElementById("profile-name").innerText = config.profile.name;
    if(document.getElementById("profile-status")) document.getElementById("profile-status").innerText = config.profile.status;
    if(document.getElementById("profile-bio")) document.getElementById("profile-bio").innerText = config.profile.bio;
    if(document.getElementById("footer-copy")) document.getElementById("footer-copy").innerHTML = `&copy; ${new Date().getFullYear()} ${escapeHTML(config.profile.name)}.`;
    if(document.getElementById("link-github")) document.getElementById("link-github").href = config.social.github;
    if(document.getElementById("link-linkedin")) document.getElementById("link-linkedin").href = config.social.linkedin;

    // --- 3. MODALE INFO PROJET ---
    const projModal = document.getElementById("project-modal");
    const projClose = document.getElementById("proj-close-btn");
    const projTitle = document.getElementById("proj-modal-title");
    const projDesc = document.getElementById("proj-modal-desc");
    const projTags = document.getElementById("proj-modal-tags");

    const closeProjModal = () => { if(projModal) projModal.style.display = "none"; };
    if(projClose) projClose.addEventListener("click", closeProjModal);
    window.addEventListener("click", (e) => { if(e.target === projModal) closeProjModal(); });


    // --- 4. NAVIGATION ---
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

    // --- 5. SKILLS HEADER ---
    const skillsContainer = document.getElementById("skills-section");
    if(skillsContainer && config.skills) {
        config.skills.forEach(s => {
            const span = document.createElement("span"); span.className = "skill-tag"; span.innerText = s; skillsContainer.appendChild(span);
        });
    }

    // --- 6. PROJETS ---
    const grid = document.getElementById("project-grid");
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = `${window.location.origin}${path}Documents/`; 
    const PROJECT_LIMIT = 4; 

    if (grid && config.projects) {
        config.projects.forEach((proj, index) => {
            const vid = `viewer_${index}`;
            const fullPdfUrl = baseUrl + proj.path;
            const badgeHTML = proj.isNew ? `<span class="new-badge">Nouveau</span>` : '';

            // Gestion Tags : Max 3 sur la carte
            let tagsHTML = '';
            if(proj.tags && proj.tags.length > 0) {
                const visibleTags = proj.tags.slice(0, 3); // MAX 3
                tagsHTML = visibleTags.map(tag => `<span class="proj-mini-tag">${escapeHTML(tag)}</span>`).join('');
                if(proj.tags.length > 3) tagsHTML += `<span class="proj-mini-tag" style="opacity:0.5;">+${proj.tags.length - 3}</span>`;
            }

            // Date
            const dateHTML = proj.date ? `<span class="proj-date">📅 ${escapeHTML(proj.date)}</span>` : '';

            const div = document.createElement("div"); 
            div.className = "project-card";
            if (index >= PROJECT_LIMIT) div.classList.add("hidden-item");

            div.innerHTML = `
                <div class="card-header">
                    <div class="icon">${escapeHTML(proj.icon)}</div>
                    
                    <div class="meta">
                        <h4>${escapeHTML(proj.title)}</h4>
                        <p>${escapeHTML(proj.description)}</p>
                        
                        <div class="meta-footer">
                            <div class="proj-tags-row">${tagsHTML}</div>
                            ${dateHTML}
                        </div>
                    </div>

                    <div class="actions-right">
                        ${badgeHTML}
                        <button class="btn-info-modal" title="Détails & Tags">ℹ️</button>
                    </div>
                </div>
                <div id="${vid}" class="pdf-container"></div>
            `;
            
            // 1. Clic sur tout le Header => Ouvre l'accordéon (PDF)
            const headerDiv = div.querySelector('.card-header');
            const infoBtn = div.querySelector('.btn-info-modal');

            headerDiv.addEventListener("click", () => { 
                togglePDF(vid, fullPdfUrl); // On ouvre le PDF en cliquant sur la carte
            });
            
            // 2. Clic sur l'Info => Ouvre la Modale (Infos) et STOP le PDF
            infoBtn.addEventListener("click", (e) => {
                e.stopPropagation(); // EMPÊCHE L'OUVERTURE DU PDF
                
                if(projTitle) projTitle.innerText = proj.title;
                if(projDesc) projDesc.innerText = proj.longDescription ? proj.longDescription : proj.description;
                
                // Tous les tags dans la modale
                if(projTags && proj.tags) {
                    projTags.innerHTML = proj.tags.map(tag => `<span class="proj-mini-tag">${escapeHTML(tag)}</span>`).join('');
                }
                
                if(projModal) projModal.style.display = "flex";
            });

            grid.appendChild(div);
        });
        
        if (config.projects.length > PROJECT_LIMIT) createToggleBtn(grid, PROJECT_LIMIT, "Voir la suite");
    }

    // --- 7. PARCOURS & AUTRES ---
    // (Identique au code précédent)
    const expList = document.getElementById("exp-list");
    if(expList && config.experiences) {
        config.experiences.forEach((exp, i) => {
            const li = document.createElement("li"); li.className = "timeline-item"; if (i >= 5) li.classList.add("hidden-item");
            li.innerHTML = `<span class="timeline-date">${escapeHTML(exp.date)}</span><h4 class="timeline-title">${escapeHTML(exp.role)} <span style="font-weight:400;opacity:0.8;">@ ${escapeHTML(exp.company)}</span></h4><p class="timeline-desc">${escapeHTML(exp.description)}</p>`;
            expList.appendChild(li);
        });
        if (config.experiences.length > 5) createToggleBtn(expList, 5, "Voir la suite");
    }

    // Competences & Certifs...
    const compList = document.getElementById("comp-list");
    if(compList && config.competences) {
        config.competences.forEach((comp, i) => {
            const li = document.createElement("li"); li.className = "comp-card-container"; if (i >= 5) li.classList.add("hidden-item");
            const dropId = `comp-drop-${i}`;
            const details = comp.details.map(d => `<li>• ${escapeHTML(d)}</li>`).join('');
            li.innerHTML = `<div class="comp-header"><div class="cert-icon-box">${escapeHTML(comp.icon)}</div><span class="cert-name">${escapeHTML(comp.name)}</span><button class="cert-btn comp-toggle">▼</button></div><ul id="${dropId}" class="comp-dropdown-menu" style="display:none;">${details}</ul>`;
            li.querySelector('.comp-header').addEventListener("click", () => toggleComp(dropId, li.querySelector('.comp-header')));
            compList.appendChild(li);
        });
        if (config.competences.length > 5) createToggleBtn(compList, 5, "Voir la suite");
    }

    const certList = document.getElementById("cert-list");
    const certBaseUrl = `${window.location.origin}${path}Documents/Certifs/`; 
    if(certList && config.certifications) {
        config.certifications.forEach((cert, i) => {
            const li = document.createElement("li"); li.className = "cert-card-container"; if (i >= 5) li.classList.add("hidden-item");
            const vid = `cert_view_${i}`;
            const url = cert.pdf ? certBaseUrl + cert.pdf : null;
            let btns = cert.url ? `<a href="${cert.url}" target="_blank" class="cert-btn link-btn">🔗</a>` : '';
            li.innerHTML = `<div class="cert-header-row"><div class="cert-icon-box">🏆</div><div class="cert-info"><span class="cert-name">${escapeHTML(cert.name)}</span><span class="cert-issuer">${escapeHTML(cert.issuer)}</span></div><div class="cert-actions">${btns}</div></div><div id="${vid}" class="cert-pdf-viewer"></div>`;
            if (cert.pdf) {
                const b = document.createElement("button"); b.className = "cert-btn pdf-btn"; b.innerHTML = "📄";
                b.addEventListener("click", () => toggleCertPDF(vid, url));
                li.querySelector('.cert-actions').appendChild(b);
            }
            certList.appendChild(li);
        });
        if (config.certifications.length > 5) createToggleBtn(certList, 5, "Voir la suite");
    }

    // Typewriter
    const textEl = document.getElementById("typewriter-area");
    if(textEl && config.profile.typewriterText) {
        const txt = config.profile.typewriterText; textEl.innerText = ""; let i=0;
        function type() { if(i<txt.length) { textEl.textContent += txt.charAt(i); i++; setTimeout(type, 50); } }
        setTimeout(type, 500);
    }

    // Modal Contact / Mentions
    const eTrig = document.getElementById("email-trigger"), eMod = document.getElementById("email-modal"), eClose = document.getElementById("modal-close-btn");
    const lTrig = document.getElementById("legal-trigger"), lMod = document.getElementById("legal-modal"), lClose = document.getElementById("legal-close-btn");
    
    if(eTrig && eMod) {
        eTrig.addEventListener("click", (e) => { e.preventDefault(); eMod.style.display = "flex"; if(window.turnstile) window.turnstile.reset(); });
        if(eClose) eClose.addEventListener("click", () => eMod.style.display = "none");
    }
    if(lTrig && lMod) {
        lTrig.addEventListener("click", (e) => { e.preventDefault(); lMod.style.display = "flex"; });
        if(lClose) lClose.addEventListener("click", () => lMod.style.display = "none");
    }
    window.addEventListener("click", (e) => {
        if(e.target === eMod) eMod.style.display = "none";
        if(e.target === lMod) lMod.style.display = "none";
    });

    // Maj GitHub
    const upEl = document.getElementById("last-update");
    if(upEl) {
        fetch(`https://api.github.com/repos/${config.profile.githubUser}/${config.profile.githubRepo}`)
            .then(r=>r.ok?r.json():Promise.reject()).then(d=>{
                const dt = new Date(d.pushed_at); upEl.innerHTML = `Maj : ${dt.toLocaleDateString('fr-FR')}`;
            }).catch(()=>upEl.innerText = "System Ready");
    }

    // Scroll
    const head = document.querySelector('.app-header');
    window.addEventListener('scroll', () => { if(window.scrollY > 50) head.classList.add('scrolled'); else head.classList.remove('scrolled'); });
});

function togglePDF(id, url) {
    const c = document.getElementById(id);
    const isClosed = c.style.display === 'none' || c.style.display === '';
    document.querySelectorAll('.pdf-container').forEach(el => { el.style.display = 'none'; el.innerHTML = ''; });
    if(isClosed) {
        c.innerHTML = `<iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true" width="100%" height="600px" style="border:none;"></iframe>`;
        c.style.display = 'block';
    }
}
function toggleComp(id, headerEl) {
    const m = document.getElementById(id); const b = headerEl.querySelector('.comp-toggle');
    document.querySelectorAll('.comp-dropdown-menu').forEach(el => { if(el.id !== id) el.style.display = 'none'; });
    document.querySelectorAll('.comp-toggle').forEach(el => { if(el !== b) el.classList.remove('active'); });
    if(m.style.display === 'block') { m.style.display = 'none'; if(b) b.classList.remove('active'); } 
    else { m.style.display = 'block'; if(b) b.classList.add('active'); }
}
function toggleCertPDF(id, url) {
    const v = document.getElementById(id);
    if (v.style.display === 'block') { v.style.display = 'none'; v.innerHTML = ''; return; }
    document.querySelectorAll('.cert-pdf-viewer').forEach(el => { el.style.display = 'none'; el.innerHTML = ''; });
    v.style.display = 'block'; v.innerHTML = `<iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true" width="100%" height="100%" style="border:none;"></iframe>`;
}
function createToggleBtn(c, l, t) {
    const d = document.createElement("div"); d.className = "load-more-container"; 
    const b = document.createElement("button"); b.className = "load-more-btn"; b.innerHTML = `<span>↓</span> ${t}`; 
    let exp = false;
    b.addEventListener("click", () => {
        exp = !exp; const ch = c.children;
        for(let i=0; i<ch.length; i++) {
            if(i >= l) { if(exp) { ch[i].classList.remove("hidden-item"); ch[i].style.opacity = 0; setTimeout(()=>ch[i].style.opacity=1, 50); } else { ch[i].classList.add("hidden-item"); } }
        }
        b.innerHTML = exp ? `<span>↑</span> Masquer` : `<span>↓</span> ${t}`;
    });
    d.appendChild(b); c.parentNode.insertBefore(d, c.nextSibling);
}
