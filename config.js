const config = {
    profile: {
        name: "Admin Sys", // Mets ton nom ici
        status: "En recherche d'alternance",
        avatar: "assets/avatar.jpg", // Chemin vers ta photo
        favicon: "assets/favicon.ico",
        // Texte qui s'écrit tout seul :
        typewriterText: "Passionné de Réseaux & Cybersécurité",
        bio: "J'administre des serveurs Linux, je configure des routeurs Cisco et j'automatise tout ce qui bouge.",
        // Clé publique Cloudflare (Laisse celle-ci ou mets la tienne)
        turnstileSiteKey: "0x4AAAAAAA-GK0H8Uj0H8Uj0", 
        // Ton email encodé en base64 pour éviter le spam (ici: test@example.com)
        emailEncoded: "dGVzdEBleGFtcGxlLmNvbQ==" 
    },
    social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com"
    },
    navigation: [
        { title: "Accueil", link: "#accueil" },
        { title: "Projets", link: "#projets" },
        { title: "Parcours", link: "#parcours" },
        { title: "Compétences", link: "#competences" }
    ],
    skills: ["Linux", "Docker", "Python", "Cisco", "Windows Server"],
    projects: [
        {
            title: "Serveur Web Sécurisé",
            description: "Mise en place d'un serveur Nginx avec HTTPS et Pare-feu.",
            icon: "🔒",
            path: "projet1.pdf", // Nom du fichier PDF dans assets/pdf/
            isNew: true
        },
        {
            title: "Automatisation Backup",
            description: "Script Bash pour sauvegarder les bases de données SQL.",
            icon: "💾",
            path: "projet2.pdf",
            isNew: false
        }
    ],
    experiences: [
        {
            role: "Technicien Support",
            company: "Entreprise XYZ",
            date: "2023 - Présent",
            description: "Gestion des tickets, AD, déploiement de postes."
        },
        {
            role: "Stage Réseau",
            company: "Mairie de Paris",
            date: "2022",
            description: "Câblage et configuration de switchs."
        }
    ],
    competences: [
        {
            name: "Système",
            icon: "💻",
            details: ["Linux (Debian/RedHat)", "Windows Server 2019", "Active Directory"]
        },
        {
            name: "Réseau",
            icon: "🌐",
            details: ["TCP/IP", "VLAN", "Routing (OSPF)", "Wireshark"]
        }
    ],
    certifications: [
        {
            name: "CCNA",
            issuer: "Cisco",
            pdf: "ccna.pdf",
            url: "https://cisco.com"
        }
    ]
};
