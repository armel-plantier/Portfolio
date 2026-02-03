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
        githubUser: "armel-plantier", 
        githubRepo: "Portfolio", 
        favicon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23151925%22/><text x=%2250%22 y=%2265%22 font-family=%22Arial, sans-serif%22 font-weight=%22bold%22 font-size=%2250%22 text-anchor=%22middle%22 fill=%22%236366f1%22>AP</text></svg>",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSga_rtaXowL4eH0pqlypM_kgAHCb_gGhUTLA&s",
        name: "Armel Plantier",
        typewriterText: "Etudiant Admin Sys & Réseau | Passionné de Cyber",
        bio: "Passionné par l'architecture réseau et le durcissement système. J'aime automatiser avec Bash, configurer des VLANs et analyser des trames Wireshark.",
        status: "Recherche active d'alternance",
        emailEncoded: "Y29udGFjdEBhcm1lbC1wbGFudGllci5jb20=", 
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

    // --- 4. PROJETS ---
    projects: [
        {
            title: "Mise en place réseau TechNova",
            description: "Architecture, VLANs et documentation technique.",
            longDescription: "Ce projet consistait à refondre l'infrastructure réseau d'une PME. J'ai configuré des switchs Cisco, mis en place 5 VLANs distincts pour la segmentation, et configuré le routage inter-VLAN (Router-on-a-stick). Documentation complète sous LaTeX.",
            path: "reseau-technova.pdf", 
            icon: "🌐",
            isNew: true,
            date: "12 Fév 2024",
            tags: ["Cisco", "VLAN", "Packet Tracer", "Routing", "Switching"]
        },
        {
            title: "Gestion de l'Active Directory",
            description: "GPO, gestion des utilisateurs et DNS.", 
            longDescription: "Administration d'un domaine Windows Server 2019. Création de scripts PowerShell pour l'automatisation de la création d'utilisateurs. Mise en place de GPO de sécurité pour le verrouillage des sessions et la complexité des mots de passe.",
            path: "active_directory.pdf", 
            icon: "🖥️",
            isNew: false,
            date: "10 Jan 2024",
            tags: ["Windows Server", "AD DS", "Powershell", "DNS"]
        },
        {
            title: "Audit Sécurité Wi-Fi",
            description: "Test d'intrusion WPA3 et analyse de trames.",
            longDescription: "Simulation d'attaques sur un réseau Wi-Fi personnel pour comprendre les vulnérabilités WEP et WPA2. Capture de handshake et analyse via Wireshark. Rapport de préconisation pour passage en WPA3.",
            path: "audit_wifi.pdf",        
            icon: "🛡️",
            isNew: false,
            date: "05 Déc 2023",
            tags: ["Kali Linux", "Aircrack-ng", "Wireshark"]
        },
        {
            title: "Hardening Linux",
            description: "Sécurisation SSH et Firewall.",
            longDescription: "Durcissement d'un serveur Debian exposé. Configuration de SSH (Clés uniquement, port modifié), installation et configuration de Fail2Ban et UFW.",
            path: "linux_hardening.pdf", 
            icon: "🐧",
            isNew: false,
            date: "20 Nov 2023",
            tags: ["Debian", "SSH", "Fail2Ban"]
        },
        {
            title: "Projet Serveur Web",
            description: "Configuration Apache/Nginx et Let's Encrypt.",
            longDescription: "Mise en ligne d'un site statique. Configuration du VirtualHost Apache, redirection HTTPS forcée et génération de certificat SSL gratuit via Certbot.",
            path: "web_server.pdf", 
            icon: "🌍",
            isNew: false,
            date: "15 Oct 2023",
            tags: ["Apache", "SSL/TLS", "Web"]
        },
        {
            title: "Scripting Python Automation",
            description: "Automatisation des sauvegardes via API.",
            longDescription: "Développement d'un script Python interrogeant une API REST pour récupérer des données et les sauvegarder localement sous format JSON compressé.",
            path: "python_script.pdf", 
            icon: "🐍",
            isNew: false,
            date: "01 Sep 2023",
            tags: ["Python", "API", "Automation"]
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
            details: ["Linux Hardening", "Windows Server", "Virtualisation", "Scripting"]
        },
        {
            icon: "🕸️",
            name: "Réseau & Sécurité",
            details: ["Modèle OSI", "VLAN/STP", "OSPF", "Firewalling"]
        },
        {
            icon: "🛠️",
            name: "Outils & DevOps",
            details: ["Docker", "Git", "Ansible", "Zabbix"]
        },
        {
            icon: "🇬🇧",
            name: "Langues",
            details: ["Anglais : B2", "Français : Natif"]
        }
    ],

    // --- 7. CERTIFICATIONS ---
    certifications: [
        { 
            name: "CCNA (En cours)", issuer: "Cisco", 
            url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html", pdf: "" 
        },
        { 
            name: "SecNumAcadémie", issuer: "ANSSI", 
            url: "https://secnumacademie.gouv.fr/", pdf: "secnum_anssi.pdf" 
        },
        { 
            name: "Certification Pix", issuer: "Gouv.fr", 
            url: "https://pix.fr/", pdf: "resultats_pix.pdf"
        }
    ]
};
Object.freeze(config);
