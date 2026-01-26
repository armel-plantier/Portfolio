const config = {
    // Ton pseudo GitHub (pour construire les liens absolus)
    githubUser: "armel-plantier",

    // La liste de tes projets. Copie-colle un bloc {} pour ajouter un nouveau PDF.
    projects: [
        {
            title: "Mise en place réseau TechNova",
            description: "Architecture, VLANs et documentation technique.",
            // Le chemin EXACT depuis la racine de ton dépôt GitHub
            path: "TechNova/Documentation/Mise-en-place-du-reseau-TechNova.pdf",
            icon: "🌐" 
        },
        {
            title: "Audit Sécurité Wi-Fi",
            description: "Pentest WPA3 et rapport de vulnérabilité.",
            path: "TechNova/Documentation/audit_wifi.pdf", // Exemple à modifier
            icon: "🛡️"
        },
        {
            title: "Hardening Serveur Linux",
            description: "Sécurisation SSH, Fail2Ban et IPTables.",
            path: "TechNova/Documentation/linux_hardening.pdf", // Exemple à modifier
            icon: "🐧"
        }
    ]
};
