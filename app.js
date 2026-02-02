document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialiser le profil
    document.getElementById("profile-name").textContent = config.profile.name;
    document.getElementById("bio-text").textContent = config.profile.bio;
    document.getElementById("github-link").href = config.social.github;
    document.getElementById("linkedin-link").href = config.social.linkedin;

    // 2. Machine à écrire
    const text = config.profile.typewriterText;
    const target = document.getElementById("typewriter-text");
    let i = 0;
    function type() {
        if (i < text.length) {
            target.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    type();

    // 3. Navigation
    const navList = document.getElementById("nav-list");
    config.navigation.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${item.link}">${item.title}</a>`;
        navList.appendChild(li);
    });

    // 4. Projets
    const projGrid = document.getElementById("projects-grid");
    config.projects.forEach((proj, idx) => {
        const div = document.createElement("div");
        div.className = "project-card";
        div.innerHTML = `
            <h3>${proj.icon} ${proj.title}</h3>
            <p>${proj.description}</p>
            <button id="btn-proj-${idx}" class="btn">Voir le PDF</button>
            <div id="pdf-proj-${idx}" style="display:none; margin-top:10px;"></div>
        `;
        projGrid.appendChild(div);

        // Ajout événement clic
        document.getElementById(`btn-proj-${idx}`).addEventListener("click", () => {
            const container = document.getElementById(`pdf-proj-${idx}`);
            if (container.style.display === "none") {
                container.style.display = "block";
                container.innerHTML = `<iframe src="assets/pdf/${proj.path}" width="100%" height="300px"></iframe>`;
            } else {
                container.style.display = "none";
                container.innerHTML = "";
            }
        });
    });

    // 5. Parcours
    const timeline = document.querySelector(".timeline-list");
    config.experiences.forEach(exp => {
        const li = document.createElement("li");
        li.className = "timeline-item";
        li.innerHTML = `<strong>${exp.date}</strong> : ${exp.role} chez ${exp.company}`;
        timeline.appendChild(li);
    });

    // 6. Compétences
    const compGrid = document.getElementById("competences-grid");
    config.competences.forEach(comp => {
        const div = document.createElement("div");
        div.className = "comp-card-container";
        div.innerHTML = `<h4>${comp.icon} ${comp.name}</h4><ul>${comp.details.map(d => `<li>${d}</li>`).join('')}</ul>`;
        compGrid.appendChild(div);
    });

    // 7. Certifications
    const certList = document.querySelector(".cert-list");
    config.certifications.forEach(cert => {
        const li = document.createElement("li");
        li.innerHTML = `📜 ${cert.name} (${cert.issuer})`;
        certList.appendChild(li);
    });

    // 8. Contact & Modal
    const modal = document.getElementById("contact-modal");
    const btnContact = document.getElementById("contact-btn");
    const close = document.querySelector(".close-btn");

    btnContact.addEventListener("click", () => {
        modal.style.display = "flex";
        // Rendu Captcha
        if(window.turnstile) {
            document.getElementById("captcha-container").innerHTML = "";
            turnstile.render('#captcha-container', {
                sitekey: config.profile.turnstileSiteKey,
                callback: function(token) {
                    document.getElementById("email-result-area").style.display = "block";
                    document.getElementById("email-text").innerText = atob(config.profile.emailEncoded);
                }
            });
        }
    });

    close.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (e) => { if (e.target == modal) modal.style.display = "none"; });

    // 9. Thème Sombre/Clair
    const themeBtn = document.getElementById("theme-toggle");
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
});
