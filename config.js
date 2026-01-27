const config = {
    // --- 1. PROFIL & RÉSEAUX ---
    profile: {
        avatar: "https://github.com/armel-plantier.png",
        name: "armel_plantier",
        typewriterText: "> Admin Sys & Réseau | Passionné de Cybersécurité",
        bio: "Passionné par l'architecture réseau et le durcissement système. J'aime automatiser avec Bash, configurer des VLANs et analyser des trames Wireshark.",
        status: "Recherche active d'alternance / CDD",
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
            title: "Hardening Linux",
            description: "Sécurisation SSH et Firewall.",
            path: "linux_hardening.pdf", 
            icon: "🐧"
        }
    ],

    // --- 4. COMPÉTENCES DÉTAILLÉES (Position 2 - Menu) ---
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

    // --- 5. CERTIFICATIONS (Position 3) ---
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
