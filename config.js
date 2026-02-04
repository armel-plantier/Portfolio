const config = {
    // --- 1. NAVIGATION ---
    navigation: [
        { title: "Accueil", link: "#" },
        { title: "Projets", link: "#projects" },
        { title: "Parcours", link: "#parcours" },
        { title: "Compétences", link: "#competences" },
        { title: "Certifs", link: "#certifs" }
    ],

    // --- 2. PROFIL & RÉSEAUX ---
    profile: {
        name: "Armel Plantier",
        status: "Étudiant Admin Sys & Réseau",
        bio: "Passionné par l'infrastructure, la virtualisation et la sécurité. En route vers l'expertise DevOps.",
        avatar: "image_d427db.png", // Votre image
        favicon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%236366f1%22/><text x=%2250%22 y=%2265%22 font-family=%22Arial%22 font-weight=%22bold%22 font-size=%2250%22 text-anchor=%22middle%22 fill=%22white%22>AP</text></svg>",
        
        // Configuration GitHub pour l'API (Mettez vos vrais infos)
        githubUser: "armel-plantier", 
        githubRepo: "Portfolio", 

        // Sécurité Email (Optionnel)
        emailEncoded: "Y29udGFjdDFAYXJtZWwtcGxhbnRpZXIuY29t", // Exemple base64
        turnstileSiteKey: "" 
    },

    social: {
        github: "https://github.com/",
        linkedin: "https://linkedin.com/"
    },

    // --- 3. PROJETS (AVEC SVG) ---
    projects: [
        {
            title: "Infrastructure HA",
            // ICONE SVG : SERVEUR
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,
            description: "Cluster Proxmox haute disponibilité avec Ceph.",
            path: "Projet1.pdf",
            tags: ["Proxmox", "Ceph", "Debian", "Cluster", "HA"] 
        },
        {
            title: "Monitoring Stack",
            // ICONE SVG : GRAPHIQUE / ACTIVITÉ
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
            description: "Déploiement Zabbix & Grafana via Ansible.",
            path: "Projet2.pdf",
            tags: ["Zabbix", "Grafana", "Ansible"]
        },
        // Ajoutez vos autres projets avec des SVG ici...
    ],

    // --- 4. PARCOURS ---
    experiences: [
        {
            date: "2023 - Présent",
            role: "Alternant Administrateur Système",
            company: "Entreprise X",
            description: "Gestion du parc informatique, support N2/N3, déploiement de solutions de sécurité."
        },
        {
            date: "2021 - 2023",
            role: "BTS SIO (SISR)",
            company: "Lycée Y",
            description: "Apprentissage des bases réseaux (Cisco), systèmes Windows/Linux et cybersécurité."
        }
    ],

    // --- 5. COMPÉTENCES (AVEC SVG) ---
    competences: [
        {
            // ICONE SVG : TERMINAL
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`,
            name: "Système",
            details: [ "Linux (Debian, RHEL)", "Windows Server", "Bash / PowerShell" ]
        },
        {
            // ICONE SVG : RESEAU (GLOBE)
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
            name: "Réseau",
            details: [ "Cisco (Switching/Routing)", "Firewall (pfSense)", "VPN (Wireguard)" ]
        },
        {
            // ICONE SVG : OUTILS (CLÉ)
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
            name: "DevOps & Outils",
            details: [ "Docker", "Git", "Proxmox" ]
        },
        {
            // ICONE SVG : LANGUE (MESSAGE)
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
            name: "Langues",
            details: [ "Anglais Technique", "Français" ]
        }
    ],

    // --- 6. CERTIFICATIONS (AVEC SVG) ---
    certifications: [
        { 
            name: "CCNA", 
            issuer: "Cisco", 
            url: "#", 
            pdf: "",
            // ICONE SVG : TROPHEE
            customIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`
        },
        { 
            name: "SecNumAcadémie", 
            issuer: "ANSSI", 
            url: "#", 
            pdf: "",
            // ICONE SVG : MEDAILLE
            customIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`
        }
    ]
};
