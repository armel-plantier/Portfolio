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
        icon: `<svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" style="enable-background:new 0 0 32 32;">
<style type="text/css">
    .st0{fill:#FFFFFF;} .st1{fill:#3A559F;} .st2{fill:#F4F4F4;} .st3{fill:#FF0084;} .st4{fill:#0063DB;} .st5{fill:#00ACED;} .st6{fill:#FFEC06;} .st7{fill:#FF0000;} .st8{fill:#25D366;} .st9{fill:#0088FF;} .st10{fill:#314358;} .st11{fill:#EE6996;} .st12{fill:#01AEF3;} .st13{fill:#FFFEFF;} .st14{fill:#F06A35;} .st15{fill:#00ADEF;} .st16{fill:#1769FF;} .st17{fill:#1AB7EA;} .st18{fill:#6001D1;} .st19{fill:#E41214;} .st20{fill:#05CE78;} .st21{fill:#7B519C;} .st22{fill:#FF4500;} .st23{fill:#00F076;} .st24{fill:#FFC900;} .st25{fill:#00D6FF;} .st26{fill:#FF3A44;} .st27{fill:#FF6A36;} .st28{fill:#0061FE;} .st29{fill:#F7981C;} .st30{fill:#EE1B22;} .st31{fill:#EF3561;} .st32{fill:none;stroke:#FFFFFF;stroke-width:2;stroke-miterlimit:10;} .st33{fill:#0097D3;} .st34{fill:#01308A;} .st35{fill:#019CDE;} .st36{fill:#FFD049;} .st37{fill:#16A05D;} .st38{fill:#4486F4;} .st39{fill:none;} .st40{fill:#34A853;} .st41{fill:#4285F4;} .st42{fill:#FBBC05;} .st43{fill:#EA4335;}
</style>
<g><g><g><path class="st15" d="M30,15H17c-0.6,0-1-0.4-1-1V3.3c0-0.5,0.4-0.9,0.8-1l13-2.3c0.3,0,0.6,0,0.8,0.2C30.9,0.4,31,0.7,31,1v13 C31,14.6,30.6,15,30,15z"></path></g><g><path class="st15" d="M13,15H1c-0.6,0-1-0.4-1-1V6c0-0.5,0.4-0.9,0.8-1l12-2c0.3,0,0.6,0,0.8,0.2C13.9,3.4,14,3.7,14,4v10 C14,14.6,13.6,15,13,15z"></path></g><g><path class="st15" d="M30,32c-0.1,0-0.1,0-0.2,0l-13-2.3c-0.5-0.1-0.8-0.5-0.8-1V18c0-0.6,0.4-1,1-1h13c0.6,0,1,0.4,1,1v13 c0,0.3-0.1,0.6-0.4,0.8C30.5,31.9,30.2,32,30,32z"></path></g><g><path class="st15" d="M13,29c-0.1,0-0.1,0-0.2,0l-12-2C0.4,26.9,0,26.5,0,26v-8c0-0.6,0.4-1,1-1h12c0.6,0,1,0.4,1,1v10 c0,0.3-0.1,0.6-0.4,0.8C13.5,28.9,13.2,29,13,29z"></path></g></g></g></g></svg>`,
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
