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
        linkedin: "https://linkedin.com/in/armel-plantier"
    },

    // --- 2. TITRES DES SECTIONS (Nouveau !) ---
    titles: {
        skills: "⚡ Compétences Techniques",
        certifications: "🎓 Certifications & Formations",
        projects: "📂 /var/www/projects"
    },

    // --- 3. COMPÉTENCES (Tags) ---
    skills: [
        "🐧 Linux Hardening",
        "🪟 Windows Server",
        "🕸️ Architecture Réseau",
        "🔌 Cisco (VLAN/OSPF)",
        "🛡️ Firewalling",
        "🦈 Wireshark",
        "📜 Bash Scripting"
    ],

    // --- 4. CERTIFICATIONS ---
    certifications: [
        "✅ Cisco CCNA 1 (En cours)",
        "✅ MOOC ANSSI - SecNumAcadémie",
        "✅ Certification Pix"
    ],

    // --- 5. PROJETS (PDFs) ---
    // URL de base gérée dans app.js (vers Technova/Documents/)
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
    ]
};
