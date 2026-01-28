const config = {
    // --- 1. NAVIGATION ---
    navigation: [
        { title: "Accueil", link: "#" },
        { title: "Projets", link: "#projets" },
        { title: "Parcours", link: "#parcours" },
        { title: "Compétences", link: "#competences" },
        { title: "Certifs", link: "#certifications" }
    ],

    // --- 2. PROFIL & RÉSEAUX ---
    profile: {
        favicon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23151925%22/><text x=%2250%22 y=%2265%22 font-family=%22Arial, sans-serif%22 font-weight=%22bold%22 font-size=%2250%22 text-anchor=%22middle%22 fill=%22%236366f1%22>AP</text></svg>",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSga_rtaXowL4eH0pqlypM_kgAHCb_gGhUTLA&s",
        name: "Armel Plantier",
        typewriterText: "Etudiant Administrateur Système & Réseau | Passionné de Cybersécurité",
        bio: "Passionné par l'architecture réseau et le durcissement système. J'aime automatiser avec Bash, configurer des VLANs et analyser des trames Wireshark.",
        status: "Recherche active d'alternance",
        email: "armel.plantier@protonmail.com"
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
    projects: [
        {
            title: "Mise en place réseau TechNova",
            description: "Architecture, VLANs et documentation technique.",
            path: "reseau-technova.pdf", 
            icon: "🌐"
        },
        {
            title: "Gestion de l'Active Directory",
            description: "GPO, gestion des utilisateurs et DNS.", 
            path: "active_directory.pdf", 
            icon: "🖥️"
        },
        {
            title: "Audit Sécurité Wi-Fi",
            description: "Test d'intrusion WPA3 et analyse de trames.",
            path: "audit_wifi.pdf",      
            icon: "🛡️"
        },
        {
            title: "Hardening Linux",
            description: "Sécurisation SSH et Firewall.",
            path: "linux_hardening.pdf", 
            icon: "🐧"
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
            name: "🐧 Administration Système",
            details: [
                "Linux Hardening (Debian/RHEL)",
                "Windows Server & AD",
                "Gestion des droits (chmod/chown)",
                "Virtualisation (Proxmox/VMware)"
            ]
        },
        {
            name: "🕸️ Réseau & Infrastructure",
            details: [
                "Architecture LAN/WAN",
                "Cisco IOS (VLAN, OSPF, STP)",
                "Wireshark (Analyse de paquets)",
                "Supervision (Nagios/Zabbix)"
            ]
        },
        {
            name: "🛡️ Cybersécurité",
            details: [
                "Firewalling (iptables, pfsense)",
                "Analyse de vulnérabilités",
                "Durcissement SSH & Web",
                "SIEM & Logs"
            ]
        },
        {
            name: "📜 Scripting & DevOps",
            details: [
                "Bash Scripting",
                "Python pour le réseau",
                "Git & GitHub",
                "Docker Basics"
            ]
        }
    ],

    // --- 7. CERTIFICATIONS ---
    certifications: [
        { 
            name: "✅ Cisco CCNA 1 (En cours)", 
            url: "https://www.cisco.com/c/fr_fr/training-events/training-certifications/certifications/associate/ccna.html" 
        },
        { 
            name: "✅ MOOC ANSSI - SecNum", 
            url: "https://secnumacademie.gouv.fr/" 
        },
        { 
            name: "✅ Certification Pix", 
            url: "https://pix.fr/" 
        }
    ]
};
