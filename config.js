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
            icon: "<svg viewBox="0 -201.4 490.41 490.41" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#00adef"> <path d="M40 6.91C55.75 4.5 71.53 2.23 87.31.04c.01 13.83 0 27.65.01 41.48-15.77.06-31.54.3-47.32.35-.01-11.66-.01-23.31 0-34.96zM0 12.49c11.86-1.83 23.771-3.41 35.681-4.9.01 11.47.01 22.93.02 34.4-11.9-.01-23.801.17-35.701.14V12.49zM188.42 14.42c3.12-1.99 7.11 2.16 5.29 5.28-.88 2.29-4.1 3.16-5.92 1.48-2.28-1.55-1.96-5.67.63-6.76zM270.13 14.01c2-.01 4-.01 6-.01v56h-5.979c.01-2.03-.03-4.061-.17-6.09-4.33 7.779-15.91 9.5-22.53 3.73-4.729-4.07-6.17-10.69-5.92-16.681.05-6.08 2.05-12.54 6.89-16.51 6.29-5.18 17.44-4.88 21.75 2.73-.081-7.729-.011-15.449-.041-23.169m-12.92 22.14c-4.8.76-8.05 5.14-8.949 9.67-1.181 5.46-.971 11.779 2.47 16.42 3.72 4.939 11.93 5.05 15.91.38 2.71-2.82 3.479-6.86 3.5-10.64.029-3.99.37-8.49-2.28-11.82-2.341-3.33-6.711-4.83-10.651-4.01zM447.341 16.15c.529-.07 1.59-.22 2.109-.29.03 18.04.011 36.09.011 54.14h-5.92c.039-15.02-.101-30.05.069-45.07-3.77 2.61-7.84 4.84-12.27 6.08.029-2 .05-4 .069-6 5.802-1.97 11.081-5.15 15.932-8.86zM471.33 16.13c5.2-.87 10.971 1.03 14.061 5.45 4.39 6.2 4.8 14.15 5.02 21.48-.149 7.74-1 16.129-5.939 22.44-4.55 5.97-13.87 7.37-19.971 2.98-4.949-3.57-6.89-9.801-7.77-15.57-1-8.57-.91-17.56 2.07-25.74 1.879-5.55 6.519-10.33 12.529-11.04m-.92 5.37c-5.33 2.16-6.859 8.46-7.6 13.58-.78 7.14-.96 14.5.74 21.529.85 3.461 2.64 7.131 6.069 8.65 3.891 1.96 9.091.271 11.141-3.57 3.27-5.649 3.35-12.43 3.39-18.779-.13-6.19-.38-12.85-3.8-18.23-2.03-3.28-6.4-4.6-9.94-3.18zM113.95 16.99c2.25.01 4.5.01 6.76.04 3.511 12.68 6.971 25.38 10.49 38.069a53.239 53.239 0 0 1 1.64 8.141c3.66-15.57 8.66-30.81 12.86-46.25 1.95.01 3.9.01 5.851.02 3.09 10.99 5.979 22.03 9.039 33.03 1.131 4.38 2.591 8.7 3.051 13.229 3.31-15.55 8.029-30.79 11.779-46.239 2.22-.03 4.44-.03 6.66-.03-4.84 17.69-9.88 35.33-14.779 53h-7.211c-3.55-12.689-7.069-25.391-10.659-38.06-.601-2.05-.851-4.17-1.04-6.29-.28 1.83-.54 3.68-1.011 5.47-3.63 12.92-7.31 25.819-10.84 38.76-2.399.13-4.8.14-7.2.12-5.15-17.66-10.26-35.34-15.39-53.01zM209.06 38.12c3.43-6.11 11.43-8.92 17.88-6.09 5.13 2 7.04 7.939 7.2 13 .279 8.319.05 16.649.12 24.97-2 0-4 0-6-.01-.091-7.99.21-16-.141-23.99-.16-3.96-1.84-8.72-6.149-9.73-6.29-1.9-12.57 3.77-12.771 9.99-.18 7.91-.01 15.83-.07 23.74h-6c.011-12.67.011-25.33 0-38h6.011c-.01 2.04-.02 4.08-.08 6.12zM299.47 31.06c5.35-.47 11.279.37 15.3 4.24 4.54 4.19 5.89 10.7 5.64 16.65-.07 5.35-2.05 10.78-5.97 14.51-8.18 7.44-23.37 5.81-28.561-4.42-4.079-8.57-3.26-20.43 4.19-26.94 2.671-2.26 6.051-3.29 9.401-4.04m-1.08 5.44c-8.811 2.71-10.301 14.22-7.551 21.79 2.19 6.72 10.73 9.7 16.86 6.56 4.15-1.91 6.04-6.59 6.44-10.88.449-5.01.05-10.689-3.49-14.6-2.999-3.38-8.079-4.11-12.259-2.87zM390.46 31.04c3.75-.26 7.57.1 11.101 1.48.979 1.86.22 4.3.45 6.39-4.21-2.63-10.011-4.31-14.58-1.63-3.13 1.7-3.28 6.729-.23 8.6 4.37 2.83 9.92 3.57 13.8 7.21 4.28 4.12 3.24 12.04-1.77 15.13-6.09 3.88-14.11 3.5-20.49.54 0-2.24-.01-4.479-.05-6.72 4.54 3.46 10.92 5.38 16.35 2.92 3.17-1.59 3.33-6.46.54-8.51-4.37-3.22-10.359-3.73-14.24-7.75-3.829-3.86-3.14-10.96 1.131-14.23 2.208-2.03 5.198-2.64 7.988-3.43zM187.13 32.01c2-.01 4-.01 6-.01v38h-6c0-12.67.01-25.33 0-37.99zM322.91 32h6.26c2.48 9.05 4.881 18.12 7.41 27.16.51 1.699.7 3.46.88 5.22 2.83-10.899 6.41-21.6 9.62-32.39l5.471.03c2.75 10.8 6.17 21.44 8.449 32.35 2.351-10.851 5.69-21.46 8.301-32.25 2.01-.1 4.02-.13 6.039-.15-3.81 12.671-7.46 25.38-11.289 38.03h-6.221c-2.7-10.3-6.2-20.4-8.39-30.81-2.61 10.4-6.23 20.52-9.21 30.81h-6.01c-3.76-12.67-7.6-25.311-11.31-38zM0 45.74c11.891-.04 23.78.15 35.67.13 0 11.5.03 23 .011 34.5C23.801 78.609 11.9 77.07 0 75.46V45.74zM39.93 46.2h47.38c.02 13.79 0 27.58 0 41.38-15.75-2.36-31.53-4.55-47.31-6.689-.02-11.561-.05-23.121-.07-34.691z"></path> </g> </g></svg>",
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
