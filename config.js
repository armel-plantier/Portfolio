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
    skills: [ "🐧 Linux", "🪟 Windows", "🕸️ Réseau", "🛡️ Sécurité" ],

    // --- 4. PROJETS (AUTOMATISÉS) ---
    // Pas de date ni de isNew ici. Le script va chercher la date du commit sur GitHub.
    projects: [
{
        title: "Mise en place réseau TechNova",
        description: "Architecture, VLANs et documentation technique.",
        longDescription: "Refonte complète de l'architecture réseau PME : Segmentation en 5 VLANs, routage inter-VLAN sur cœur Cisco, ACLs strictes et documentation technique détaillée (50 pages).",
        path: "reseau-technova.pdf",
        // J'ai remplacé l'emoji par votre SVG ci-dessous (encadré par des backticks ` )
        icon: "<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 12H21M12 8V12M6.5 12V16M17.5 12V16M10.1 8H13.9C14.4601 8 14.7401 8 14.954 7.89101C15.1422 7.79513 15.2951 7.64215 15.391 7.45399C15.5 7.24008 15.5 6.96005 15.5 6.4V4.6C15.5 4.03995 15.5 3.75992 15.391 3.54601C15.2951 3.35785 15.1422 3.20487 14.954 3.10899C14.7401 3 14.4601 3 13.9 3H10.1C9.53995 3 9.25992 3 9.04601 3.10899C8.85785 3.20487 8.70487 3.35785 8.60899 3.54601C8.5 3.75992 8.5 4.03995 8.5 4.6V6.4C8.5 6.96005 8.5 7.24008 8.60899 7.45399C8.70487 7.64215 8.85785 7.79513 9.04601 7.89101C9.25992 8 9.53995 8 10.1 8ZM15.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7951 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V17.6C21 17.0399 21 16.7599 20.891 16.546C20.7951 16.3578 20.6422 16.2049 20.454 16.109C20.2401 16 19.9601 16 19.4 16H15.6C15.0399 16 14.7599 16 14.546 16.109C14.3578 16.2049 14.2049 16.3578 14.109 16.546C14 16.7599 14 17.0399 14 17.6V19.4C14 19.9601 14 20.2401 14.109 20.454C14.2049 20.6422 14.3578 20.7951 14.546 20.891C14.7599 21 15.0399 21 15.6 21ZM4.6 21H8.4C8.96005 21 9.24008 21 9.45399 20.891C9.64215 20.7951 9.79513 20.6422 9.89101 20.454C10 20.2401 10 19.9601 10 19.4V17.6C10 17.0399 10 16.7599 9.89101 16.546C9.79513 16.3578 9.64215 16.2049 9.45399 16.109C9.24008 16 8.96005 16 8.4 16H4.6C4.03995 16 3.75992 16 3.54601 16.109C3.35785 16.2049 3.20487 16.3578 3.10899 16.546C3 16.7599 3 17.0399 3 17.6V19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7951 3.54601 20.891C3.75992 21 4.03995 21 4.6 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>",
        tags: ["Cisco", "VLAN", "Switching", "OSPF", "ACL", "Visio"]
    },
        
        {
            title: "Gestion de l'Active Directory",
            description: "GPO, gestion des utilisateurs et DNS.", 
            longDescription: "Administration d'un parc de 200 utilisateurs. Création de GPO de sécurité et scripts PowerShell pour l'automatisation des comptes.",
            path: "active_directory.pdf", 
            icon: "🖥️",
            tags: ["Windows Server", "AD DS", "DNS", "PowerShell"]
        },
        {
            title: "Audit Sécurité Wi-Fi",
            description: "Test d'intrusion WPA3 et analyse de trames.",
            path: "audit_wifi.pdf",        
            icon: "🛡️",
            tags: ["Wireshark", "Kali Linux", "Aircrack"]
        },
        {
            title: "Hardening Linux",
            description: "Sécurisation SSH et Firewall.",
            path: "linux_hardening.pdf", 
            icon: "🐧",
            tags: ["Debian", "SSH", "Fail2Ban"]
        },
        {
            title: "Projet Serveur Web",
            description: "Configuration Apache/Nginx et Let's Encrypt.",
            path: "web_server.pdf", 
            icon: "🌍",
            tags: ["Apache", "Nginx", "SSL"]
        },
        {
            title: "Scripting Python Automation",
            description: "Automatisation des sauvegardes via API.",
            path: "python_script.pdf", 
            icon: "🐍",
            tags: ["Python", "API", "Backup"]
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
            details: [ "Linux Hardening (Debian, RHEL)", "Windows Server (AD, DNS, DHCP)", "Virtualisation (Proxmox, VMware)", "Scripting (Bash, Python)" ]
        },
        {
            icon: "🕸️",
            name: "Réseau & Sécurité",
            details: [ "Modèle OSI / TCP-IP", "Switching (VLAN, STP)", "Routing (OSPF, Static)", "Firewalling (pfSense, iptables)" ]
        },
        {
            icon: "🛠️",
            name: "Outils & DevOps",
            details: [ "Docker & Docker Compose", "Git & GitHub", "Ansible (Basiques)", "Monitoring (Zabbix)" ]
        },
        {
            icon: "🇬🇧",
            name: "Langues",
            details: [ "Anglais : B2 (Technique)", "Français : Langue maternelle" ]
        }
    ],

    // --- 7. CERTIFICATIONS ---
    certifications: [
        { name: "CCNA (En cours)", issuer: "Cisco", url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html", pdf: "" },
        { name: "SecNumAcadémie", issuer: "ANSSI", url: "https://secnumacademie.gouv.fr/", pdf: "secnum_anssi.pdf" },
        { name: "Certification Pix", issuer: "Gouv.fr", url: "https://pix.fr/", pdf: "resultats_pix.pdf" }
    ]
};
Object.freeze(config);
