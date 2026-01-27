const config = {
    // --- 1. PROFIL & RÉSEAUX ---
    profile: {
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSga_rtaXowL4eH0pqlypM_kgAHCb_gGhUTLA&s",
        name: "armel_plantier",
        typewriterText: "> Etudiant Administrateur Système & Réseau | Passionné de Cybersécurité",
        bio: "Passionné par l'architecture réseau et le durcissement système. J'aime automatiser avec Bash, configurer des VLANs et analyser des trames Wireshark.",
        status: "Recherche active d'alternance concernant la Cybersécuritée.",
        email: "armel.plantier@protonmail.com"
    },

    social: {
        github: "https://github.com/armel-plantier",
        linkedin: "https://linkedin.com/in/armel-plantier",
    },

    // --- 2. TAGS HEADER (Aperçu) ---
    skills: [
        "🐧 Linux",
        "🪟 Windows",
        "🕸️ Réseau",
        "🛡️ Sécurité"
    ],

    // --- 3. PROJETS (Position 1) ---
    projects: [
        {
            title: "Mise en place réseau TechNova",
            description: "Architecture, VLANs et documentation technique.",
            path: "reseau-technova.pdf", 
            icon: "🌐"
        },
        {
            title: "Audit Sécurité Wi-Fi",
            description: "Test d'intrusion WPA3.",
            path: "audit_wifi.pdf",      
            icon: "🛡️"
        },
        {
            title: "Audit Sécurité Wi-Fi",
            description: "Test d'intrusion WPA3.",
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

    // --- 4. COMPÉTENCES DÉTAILLÉES (Position 3) ---
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

    // --- 5. CERTIFICATIONS (Position 4) ---
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
    ],

    // --- 6. EXPÉRIENCES (NOUVEAU - System Logs) ---
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
    ]
};
