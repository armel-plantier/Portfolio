// --- MODALE CONTACT & UPDATE EMAIL ---
    const contactBtn = document.getElementById("contact-btn");
    const contactModal = document.getElementById("contact-modal");
    const closeModalBtn = document.querySelector(".close-btn");

    // Fonction pour ouvrir la modale
    if (contactBtn && contactModal) {
        contactBtn.addEventListener("click", (e) => {
            e.preventDefault();
            
            // C'est ici qu'on définit le nouveau mail
            const emailSpan = document.getElementById("email-text");
            const user = "contact";
            const domain = "armel-plantier.com";
            
            if (emailSpan) {
                // Injection propre (sécurité anti-spam basique)
                emailSpan.innerText = `${user}@${domain}`;
            }

            // Affiche la modale avec une petite animation
            contactModal.style.display = "flex";
            // Force un petit délai pour l'opacité (transition fluide)
            setTimeout(() => {
                contactModal.style.opacity = "1";
            }, 10);
        });
    }
