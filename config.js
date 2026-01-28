const config = {
    // 1. PROFIL & IDENTITÉ
    profile: {
        name: "Armel Plantier",
        // C'est ce texte qui s'affichera sous le point vert
        status: "En recherche d'alternance", 
        // Le texte qui s'écrit tout seul (machine à écrire)
        typewriterText: "Développeur Web & Mobile", 
        bio: "Passionné par le développement d'interfaces modernes et performantes. J'aime transformer des problèmes complexes en solutions simples et élégantes.",
        avatar: "assets/avatar.jpg", // ⚠️ Assure-toi d'avoir une image ici ou change le chemin
        email: "armel.plantier@email.com"
    },

    // 2. BARRE DE NAVIGATION (DYNAMIQUE)
    // Tu peux changer l'ordre ou les titres ici
    navigation: [
        { title: "Projets", link: "#projets" },
        { title: "Parcours", link: "#parcours" },
        { title: "Skills", link: "#competences" },
        { title: "Certifs", link: "#certifications" }
    ],

    // 3. LIENS RÉSEAUX SOCIAUX
    social: {
        github: "https://github.com/ton-pseudo",
        linkedin: "https://linkedin.com/in/ton-profil"
    },

    // 4. TAGS (Affichés sous la bio)
    skills: ["React", "JavaScript", "HTML/CSS", "Node.js", "Git", "UI/UX"],

    // 5. SECTION PROJETS
    // ⚠️ IMPORTANT : Crée un dossier nommé "Documents" à la racine du site pour tes PDF
    projects: [
        {
            title: "Site E-Commerce",
            description: "Plateforme de vente en ligne avec gestion de panier et paiement Stripe.",
            icon: "🛍️", 
            path: "projet1.pdf" // Doit correspondre au fichier dans le dossier Documents/
        },
        {
            title: "Application Météo",
            description: "App consommant une API externe pour afficher les prévisions en temps réel.",
            icon: "☀️",
            path: "projet2.pdf"
        },
        {
            title: "Portfolio Personnel",
            description: "Conception et développement d'un portfolio interactif et responsive.",
            icon: "🎨",
            path: "projet3.pdf"
        }
    ],

    // 6. SECTION PARCOURS (TIMELINE)
    experiences: [
        {
            date: "2023 - PRÉSENT",
            role: "Développeur Freelance",
            company: "Indépendant",
            description: "Création de sites vitrines et maintenance web pour divers clients locaux."
        },
        {
            date: "2022 - 2023",
            role: "Stage Développeur Front-End",
            company: "Agence WebTech",
            description: "Intégration de maquettes Figma et optimisation des performances web."
        }
    ],

    // 7. SECTION COMPÉTENCES (MENU DÉROULANT)
    competences: [
        {
            name: "Langages Web",
            details: [
                "HTML5 & CSS3 (Sass)",
                "JavaScript (ES6+)",
                "TypeScript"
            ]
        },
        {
            name: "Frameworks & Outils",
            details: [
                "React.js / Vue.js",
                "Node.js / Express",
                "Git / GitHub"
            ]
        },
        {
            name: "Design & UX",
            details: [
                "Figma / Adobe XD",
                "Design Responsive",
                "Accessibilité Web"
            ]
        }
    ],

    // 8. SECTION CERTIFICATIONS
    certifications: [
        {
            name: "Certification OpenClassrooms - JS",
            url: "https://openclassrooms.com"
        },
        {
            name: "FreeCodeCamp - Responsive Design",
            url: "https://freecodecamp.org"
        }
    ]
};
