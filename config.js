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
        // --- API GITHUB ---
        githubUser: "armel-plantier", 
        githubRepo: "Portfolio", 

        favicon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23151925%22/><text x=%2250%22 y=%2265%22 font-family=%22Arial, sans-serif%22 font-weight=%22bold%22 font-size=%2250%22 text-anchor=%22middle%22 fill=%22%236366f1%22>AP</text></svg>",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSga_rtaXowL4eH0pqlypM_kgAHCb_gGhUTLA&s",
        name: "Armel Plantier",
        typewriterText: "Etudiant Admin Sys & Réseau | Passionné de Cyber",
        bio: "Passionné par l'architecture réseau et le durcissement système. J'aime automatiser avec Bash, configurer des VLANs et analyser des trames Wireshark.",
        status: "Recherche active d'alternance",
        
        // Email : contact@armel-plantier.com (Encodé Base64)
        emailEncoded: "Y29udGFjdEBhcm1lbC1wbGFudGllci5jb20=",
        
        // CLOUDFLARE TURNSTILE (Captcha)
        turnstileSiteKey: "0x4AAAAAACWdXwpSGlIddb_k" 
    },

    social: {
        github: "https://github.com/armel-plantier",
        linkedin: "https://fr.linkedin.com/in/armel-plantier-9372a2360",
    },

    // --- 3. TAGS HEADER ---
    skills: [
        "🐧 Linux",
        "🪟 Windows",
        "🕸️ Réseau",
        "🛡️ Sécurité"
    ],

    // --- 4. PROJETS (Documents PDF) ---
    // Les dates sont maintenant gérées automatiquement par app.js via l'API GitHub
    projects: [
        {
            title: "Mise en place réseau TechNova",
            description: "Architecture, VLANs et documentation technique.",
            path: "reseau-technova.pdf", 
            icon: "🌐",
            isNew: true
        },
        {
            title: "Gestion de l'Active Directory",
            description: "GPO, gestion des utilisateurs et DNS.", 
            path: "active_directory.pdf", 
            icon: "🖥️",
            isNew: false
        },
        {
            title: "Audit Sécurité Wi-Fi",
            description: "Test d'intrusion WPA3 et analyse de trames.",
            path: "audit_wifi.pdf",        
            icon: "🛡️",
            isNew: false
        },
        {
            title: "Hardening Linux",
            description: "Sécurisation SSH et Firewall.",
            path: "linux_hardening.pdf", 
            icon: "🐧",
            isNew: false
        },
        {
            title: "Projet Serveur Web",
            description: "Configuration Apache/Nginx et Let's Encrypt.",
            path: "web_server.pdf", 
            icon: "🌍",
            isNew: false
        },
        {
            title: "Scripting Python Automation",
            description: "Automatisation des sauvegardes via API.",
            path: "python_script.pdf", 
            icon: "🐍",
            isNew: false
        }
    ],

    // --- 5. EXPÉRIENCES ---
    experiences: [
        {
            date: "2023 - Présent",
            role: "Administrateur Système Junior",
            company: "Entreprise A",
            description: "Gestion Active Directory, Support N2, déploiement de VM sur Proxmox."
        },
        {
            date: "2022 - 2023",
            role: "Technicien Support",
            company: "Entreprise B",
            description: "Assistance utilisateurs, ticketing (GLPI), maintenance parc informatique."
        },
        {
            date: "2020 - 2022",
            role: "Projets Personnels",
            company: "Home Lab",
            description: "Création d'un serveur NAS, auto-hébergement (Nextcloud), apprentissage Linux."
        }
    ],

    // --- 6. COMPÉTENCES DÉTAILLÉES ---
    competences: [
        {
            icon: "🐧",
            name: "Administration Système",
            details: [
                "Linux Hardening (Debian, RHEL)",
                "Windows Server (AD, DNS, DHCP)",
                "Virtualisation (Proxmox, VMware)",
                "Scripting (Bash, Python)"
            ]
        },
        {
            icon: "🕸️",
            name: "Réseau & Sécurité",
            details: [
                "Modèle OSI / TCP-IP",
                "Switching (VLAN, STP)",
                "Routing (OSPF, Static)",
                "Firewalling (pfSense, iptables)"
            ]
        },
        {
            icon: "🛠️",
            name: "Outils & DevOps",
            details: [
                "Docker & Docker Compose",
                "Git & GitHub",
                "Ansible (Basiques)",
                "Monitoring (Zabbix)"
            ]
        },
        {
            icon: "🇬🇧",
            name: "Langues",
            details: [
                "Anglais : B2 (Technique)",
                "Français : Langue maternelle"
            ]
        }
    ],

    // --- 7. CERTIFICATIONS ---
    certifications: [
        { 
            name: "CCNA (En cours)", 
            issuer: "Cisco", 
            url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html",
            pdf: "" 
        },
        { 
            name: "SecNumAcadémie", 
            issuer: "ANSSI", 
            url: "https://secnumacademie.gouv.fr/",
            pdf: "secnum_anssi.pdf" 
        },
        { 
            name: "Certification Pix", 
            issuer: "Gouv.fr", 
            url: "https://pix.fr/",
            pdf: "resultats_pix.pdf"
        }
    ]
};

// Sécurisation
Object.freeze(config);
