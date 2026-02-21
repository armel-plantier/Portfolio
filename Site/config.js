const config = {
// --- 1. NAVIGATION ---
    navigation: [
        { title: "Accueil", link: "#" },
        // CORRECTION ICI : #projets au lieu de #projects
        { title: "Projet TechNova", link: "#projets" }, 
        { title: "Parcours", link: "#parcours" },
        { title: "Compétences", link: "#competences" },
        // CORRECTION ICI : #certifications au lieu de #certifs
        { title: "Certifs", link: "#certifications" } 
    ],

    // --- 2. PROFIL & RÉSEAUX ---
    profile: {
        githubUser: "armel-plantier", 
        githubRepo: "Portfolio", 

        favicon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23151925%22/><text x=%2250%22 y=%2265%22 font-family=%22Arial, sans-serif%22 font-weight=%22bold%22 font-size=%2250%22 text-anchor=%22middle%22 fill=%22%236366f1%22>AP</text></svg>",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSga_rtaXowL4eH0pqlypM_kgAHCb_gGhUTLA&s",
        name: "Armel Plantier",
        typewriterText: "Etudiant Admin Sys & Réseau | Passionné de Cybersécurité",
        bio: "Passionné par l'architecture réseau, le durcissement système et la cybersécurité, j'aime construire des environnements robustes, automatisés et sécurisés dès la conception",
        status: "Recherche active d'alternance",
        
        emailEncoded: "Y29udGFjdEBhcm1lbC1wbGFudGllci5jb20=",
        turnstileSiteKey: "0x4AAAAAACWdXwpSGlIddb_k" 
    },

    social: {
        github: "https://github.com/armel-plantier",
        linkedin: "https://fr.linkedin.com/in/armel-plantier-9372a2360",
    },

    // --- 3. TAGS HEADER ---
   // skills: [ "🐧 Linux", "🪟 Windows", "🕸️ Réseau", "🛡️ Sécurité" ],

    // --- 4. PROJETS (AUTOMATISÉS) ---
    // Pas de date ni de isNew ici. Le script va chercher la date du commit sur GitHub.
projects: [
{
    title: "Mise en place du réseau TechNova",
    longDescription: "Simulation d'une refonte complète de l'architecture réseau PME. Dans cette procédure vous trouverez l'essentiel de la mise en place du réseau. Le contenu est évolutif.",
    path: "Mise_en_place_du_réseau_TechNova.pdf",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 12H21M12 8V12M6.5 12V16M17.5 12V16M10.1 8H13.9C14.4601 8 14.7401 8 14.954 7.89101C15.1422 7.79513 15.2951 7.64215 15.391 7.45399C15.5 7.24008 15.5 6.96005 15.5 6.4V4.6C15.5 4.03995 15.5 3.75992 15.391 3.54601C15.2951 3.35785 15.1422 3.20487 14.954 3.10899C14.7401 3 14.4601 3 13.9 3H10.1C9.53995 3 9.25992 3 9.04601 3.10899C8.85785 3.20487 8.70487 3.35785 8.60899 3.54601C8.5 3.75992 8.5 4.03995 8.5 4.6V6.4C8.5 6.96005 8.5 7.24008 8.60899 7.45399C8.70487 7.64215 8.85785 7.79513 9.04601 7.89101C9.25992 8 9.53995 8 10.1 8ZM15.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7951 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V17.6C21 17.0399 21 16.7599 20.891 16.546C20.7951 16.3578 20.6422 16.2049 20.454 16.109C20.2401 16 19.9601 16 19.4 16H15.6C15.0399 16 14.7599 16 14.546 16.109C14.3578 16.2049 14.2049 16.3578 14.109 16.546C14 16.7599 14 17.0399 14 17.6V19.4C14 19.9601 14 20.2401 14.109 20.454C14.2049 20.6422 14.3578 20.7951 14.546 20.891C14.7599 21 15.0399 21 15.6 21ZM4.6 21H8.4C8.96005 21 9.24008 21 9.45399 20.891C9.64215 20.7951 9.79513 20.6422 9.89101 20.454C10 20.2401 10 19.9601 10 19.4V17.6C10 17.0399 10 16.7599 9.89101 16.546C9.79513 16.3578 9.64215 16.2049 9.45399 16.109C9.24008 16 8.96005 16 8.4 16H4.6C4.03995 16 3.75992 16 3.54601 16.109C3.35785 16.2049 3.20487 16.3578 3.10899 16.546C3 16.7599 3 17.0399 3 17.6V19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7951 3.54601 20.891C3.75992 21 4.03995 21 4.6 21Z" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,
    tags: ["Administration Réseau (pfSense/Aruba)", "Administration Système (Windows/Linux)", "Virtualisation (VMware/Proxmox)"]
}, 
{
    title: "Gestion avancée de l'Active Directory",
    longDescription: "Après avoir configuré le minimum de l'AD dans la partie précédente, la configuration doit être d'avantage poussée.",
    path: "Gestion_avancée_de_l’AD.pdf",
    icon: `<svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#FFFFFF;} .st1{fill:#3A559F;} .st2{fill:#F4F4F4;} .st3{fill:#FF0084;} .st4{fill:#0063DB;} .st5{fill:#00ACED;} .st6{fill:#FFEC06;} .st7{fill:#FF0000;} .st8{fill:#25D366;} .st9{fill:#0088FF;} .st10{fill:#314358;} .st11{fill:#EE6996;} .st12{fill:#01AEF3;} .st13{fill:#FFFEFF;} .st14{fill:#F06A35;} .st15{fill:#00ADEF;} .st16{fill:#1769FF;} .st17{fill:#1AB7EA;} .st18{fill:#6001D1;} .st19{fill:#E41214;} .st20{fill:#05CE78;} .st21{fill:#7B519C;} .st22{fill:#FF4500;} .st23{fill:#00F076;} .st24{fill:#FFC900;} .st25{fill:#00D6FF;} .st26{fill:#FF3A44;} .st27{fill:#FF6A36;} .st28{fill:#0061FE;} .st29{fill:#F7981C;} .st30{fill:#EE1B22;} .st31{fill:#EF3561;} .st32{fill:none;stroke:#FFFFFF;stroke-width:2;stroke-miterlimit:10;} .st33{fill:#0097D3;} .st34{fill:#01308A;} .st35{fill:#019CDE;} .st36{fill:#FFD049;} .st37{fill:#16A05D;} .st38{fill:#4486F4;} .st39{fill:none;} .st40{fill:#34A853;} .st41{fill:#4285F4;} .st42{fill:#FBBC05;} .st43{fill:#EA4335;} </style> <g> <g> <g> <path class="st15" d="M30,15H17c-0.6,0-1-0.4-1-1V3.3c0-0.5,0.4-0.9,0.8-1l13-2.3c0.3,0,0.6,0,0.8,0.2C30.9,0.4,31,0.7,31,1v13 C31,14.6,30.6,15,30,15z"></path> </g> <g> <path class="st15" d="M13,15H1c-0.6,0-1-0.4-1-1V6c0-0.5,0.4-0.9,0.8-1l12-2c0.3,0,0.6,0,0.8,0.2C13.9,3.4,14,3.7,14,4v10 C14,14.6,13.6,15,13,15z"></path> </g> <g> <path class="st15" d="M30,32c-0.1,0-0.1,0-0.2,0l-13-2.3c-0.5-0.1-0.8-0.5-0.8-1V18c0-0.6,0.4-1,1-1h13c0.6,0,1,0.4,1,1v13 c0,0.3-0.1,0.6-0.4,0.8C30.5,31.9,30.2,32,30,32z"></path> </g> <g> <path class="st15" d="M13,29c-0.1,0-0.1,0-0.2,0l-12-2C0.4,26.9,0,26.5,0,26v-8c0-0.6,0.4-1,1-1h12c0.6,0,1,0.4,1,1v10 c0,0.3-0.1,0.6-0.4,0.8C13.5,28.9,13.2,29,13,29z"></path> </g> </g> </g> </g></svg>`,
    tags: ["Administration Système", "Active Directory", "GPO"]
},
{
    title: "Mise en place d’un serveur de journalisation Graylog",
    longDescription: "Graylog est une solution de gestion centralisée des logs qui permet de collecter, indexer et analyser vos données machine en temps réel",
    path: "Mise_en_place_d_un_serveur_de_journalisation_(Graylog).pdf",
    icon: `<svg viewBox="0 -4 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M128.002368,0 C202.384366,0 256.00329,57.2695747 256.00329,123.893941 C256.00329,191.659134 205.122353,247.559715 128.002368,247.559715 C50.8823831,247.559715 0.000720818792,191.659134 0.000720818792,123.893941 C-0.226719402,57.2695747 53.3922051,0 128.002368,0 Z M43.3529171,123.893941 C43.3529171,169.298902 82.3692409,209.227888 127.774203,209.227888 C173.179164,209.227888 212.195488,169.298902 212.195488,123.893941 C212.195488,74.8383287 173.179164,38.1036613 127.774203,38.1036613 C82.5974066,38.1036613 43.3529171,74.8383287 43.3529171,123.893941 Z" fill="#FF3633"> </path> <path d="M73.9271124,117.048971 C77.3495969,117.048971 80.3157502,118.874297 81.9129097,121.84045 L89.4423757,121.84045 L101.306989,93.3197452 C101.76332,91.9507514 103.132314,90.8099232 104.501308,90.353592 C107.01113,89.8972607 109.520952,91.2662545 109.977283,93.7760765 L122.526393,148.992161 L135.303669,74.6101631 L135.303669,74.6101631 C135.531834,72.784838 136.900828,71.4158442 138.726153,70.9595129 C141.235975,70.275016 143.745797,71.8721754 144.430294,74.3819974 L158.120232,130.282578 L165.193367,109.519505 C165.421533,108.606843 166.106029,107.69418 167.018692,107.009683 C169.072183,105.64069 172.038336,106.097021 173.40733,108.150512 L179.339636,116.59264 C179.567802,118.646131 179.567802,120.699622 179.567802,122.753112 C179.567802,125.4911 179.339636,128.229088 179.111471,130.73891 C178.198808,130.510744 177.514311,129.826247 176.829814,129.14175 L176.829814,129.14175 L170.897508,120.927787 L161.770882,148.535829 C160.85822,151.045651 158.348398,152.186479 155.838576,151.501983 C154.241416,151.045651 153.100588,149.676657 152.872423,148.307664 L152.872423,148.307664 L140.551478,98.5675549 L127.546037,174.09038 C127.089706,176.600202 124.808049,178.197362 122.298227,177.969196 C120.244737,177.741031 118.875743,176.143871 118.419411,174.09038 L104.501308,110.204002 L96.9718417,128.229088 C96.2873448,130.054413 94.4620197,131.195241 92.6366946,131.195241 L92.6366946,131.195241 L81.9129097,131.195241 C80.3157502,133.933229 77.3495969,135.758554 73.9271124,135.758554 C68.9074684,135.758554 64.5723213,131.651572 64.5723213,126.403763 C64.8004869,121.384119 68.9074684,117.048971 73.9271124,117.048971 Z" fill="#A6AFBD"> </path> </g> </g></svg>`,
    tags: ["Administration Système", "Cybersécurité"]
}
],

    // --- 5. EXPÉRIENCES ---
experiences: [
        {
            date: "Décembre 2025 - Février 2026",
            role: "Stage Administrateur Système et réseau (7 semaines)",
            company: "Fondation Hospitalière de la Miséricorde",
            // J'ai mis les \n ici pour toi :
            description: "Mise en place du protocole 802.1x sur 3 éphad \nMasterisation et déploiement d'images Windows 25h2 via FOG, avec automatisation de la configuration de l'administrateur local.\n WSUS : Mise à jour du script pour Windows 11 25h2"
        },
        {
            date: "Mai 2025 - Juin 2026",
            role: "Stage Administrateur Système et réseau orienté cybersécurité (5 semaines)",
            company: "Ellix Informatique",
            // Idem ici :
            description: "Un serveur DNS Pi-Hole (Blocklist / Analyse DNS) \n Serveur Graylog (Centralisation des logs) \n Active Directory (GPO, Audits, UO) \n Routeur Netgate (pfSense) \n Serveur DHCP (Windows & Debian)"
        }
    ],

    // --- 6. COMPÉTENCES DÉTAILLÉES ---
    competences: [
        {
            icon: `<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M529.024595 370.352223c0-7.446623-4.534177-16.11014-10.118548-19.334549L208.567367 171.84387C199.260874 166.46906 191.702326 172.184409 191.702326 184.59386v642.162307c0 9.928037 6.046363 21.480186 13.492986 25.780986l276.603832 159.696373c26.064372 15.048037 47.225451-0.947795 47.225451-35.701879V370.352223z" fill="#4E6FBB"></path><path d="M831.552298 190.544967c0-4.608-2.805284-6.729823-6.260689-4.734214l-300.586865 173.544187c-3.455405 1.995609-6.26307 7.35613-6.26307 11.96413v617.019535c0 25.345191 15.433823 37.011647 34.442121 26.035795l272.407814-157.272112c3.455405-1.995609 6.260688-7.358512 6.260689-11.966511V190.544967z" fill="#4D6FBB"></path><path d="M540.207628 9.082642c-19.01306-10.978233-47.8208-12.171312-64.288149-2.664782L204.514233 163.113674c-16.464967 9.50653-14.397916 26.138195 4.617525 37.116428l275.613172 159.124838c19.01306 10.978233 47.8208 12.173693 64.288149 2.664781l271.405247-156.695814c16.467349-9.50653 14.397916-26.138195-4.615145-37.116428L540.207628 9.082642z" fill="#6D8ACA"></path><path d="M540.207628 663.661544c-19.01306-10.978233-47.8208-12.173693-64.288149-2.664781L204.514233 817.692577c-16.464967 9.50653-14.397916 26.138195 4.617525 37.116428l275.613172 159.124837c19.01306 10.978233 47.8208 12.173693 64.288149 2.664781l271.405247-156.695814c16.467349-9.50653 14.397916-26.138195-4.615145-37.116428l-275.615553-159.124837z" fill="#4D6FBB"></path><path d="M513.252614 533.239665L193.40026 348.571981v36.425824l319.852354 184.665302v-36.423442zM815.780316 358.573842l-302.527702 174.665823v36.423442l302.527702-174.663442v-36.425823z" fill="#4467AE"></path><path d="M454.636949 659.105935c0-2.138493-1.300242-4.62467-2.902921-5.551033l-210.898754-121.760744c-1.602679-0.926363-2.905302 0.057153-2.905302 2.195647v69.703442c0 2.136112 1.302623 4.622288 2.905302 5.548651l210.898754 121.763125c1.602679 0.923981 2.902921-0.059535 2.902921-2.195646v-69.703442zM454.636949 809.276726c0-2.136112-1.300242-4.622288-2.902921-5.548652l-210.898754-121.763125c-1.602679-0.923981-2.905302 0.059535-2.905302 2.195646v69.703442c0 2.138493 1.302623 4.62467 2.905302 5.548651l210.898754 121.763126c1.602679 0.926363 2.902921-0.057153 2.902921-2.195647v-69.703441z" fill="#6D8ACA"></path><path d="M440.348577 355.316093c7.887181 4.550847 14.288372 18.879702 14.288372 31.977377 0 13.095293-6.401191 20.032298-14.288372 15.47907-7.8848-4.553228-14.288372-18.882084-14.288372-31.977377 0-13.097674 6.403572-20.032298 14.288372-15.47907zM440.348577 421.995163c7.887181 4.550847 14.288372 18.879702 14.288372 31.977377 0 13.095293-6.401191 20.032298-14.288372 15.479069-7.8848-4.553228-14.288372-18.882084-14.288372-31.977376 0-13.097674 6.403572-20.032298 14.288372-15.47907z" fill="#EDEEF0"></path></g></svg>`,
            name: "Administration Système",
            details: [ "Administration Windows Server (Active Directory / GPO / DHCP / DNS / Unités Organisationnelles)", "Administration Linux (DNS/DHCP/LDAP/HaProxt/Samba/FTP/PostFix/Squid)", "Outils de virtualisation (Hyper V, VirtualBox, Proxmox)" ]
        },
        {
            icon: `<svg viewBox="0 -127 1278 1278" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M186.97049 390.020858c249.283591-143.926213 654.058848-143.926213 903.342438 0 249.283591 143.921015 249.283591 377.621133 0 521.542148-249.283591 143.926213-654.058848 143.926213-903.342438 0-249.288789-143.921015-249.288789-377.621133 0-521.542148z" fill="#4467AE"></path><path d="M0.005198 368.719633h1277.273022v282.072299H0.005198z" fill="#4467AE"></path><path d="M186.97049 107.948559c249.283591-143.926213 654.058848-143.926213 903.342438 0 249.283591 143.921015 249.283591 377.621133 0 521.542148-249.283591 143.926213-654.058848 143.926213-903.342438 0-249.288789-143.921015-249.288789-377.621133 0-521.542148z" fill="#6D8ACA"></path><path d="M436.243685 524.263279l57.323062 33.095388-164.5621-6.819719-11.814955-95.008246 57.323063 33.095388 148.037797-85.475194 61.73093 35.642386-148.037797 85.469997zM846.320857 216.221989l-57.323063-33.09019 164.562101 6.819719 11.814954 95.008246-57.323062-33.095388-148.037797 85.469996-61.73093-35.637188 148.037797-85.475195zM445.418078 199.744468l57.323062-33.09019-164.5621 6.819718-11.814955 95.008246 57.323063-33.095388 148.042995 85.469997 61.730929-35.637189L445.418078 199.744468zM865.501316 513.560686l-57.323063 33.095388 164.5621-6.819718 11.814955-95.008246-57.323062 33.095388-148.037797-85.469997-61.73093 35.637189 148.037797 85.469996z" fill="#FFFFFF"></path></g></svg>`,
            name: "Réseau",
            details: [ "Gestion de routeur : Routage statique et dynamique via RIP / Implémentation du DHCP / Agent relais DHCP / Gestion d'ACL / Gestion NAT et PAT / Tunnel VPN (IPSec)", "Gestion de switch : Trunking / VTP / Gestion VLAN / Port mirroring / Sécurisation / SSH / TELNET / 802.1x"]
        },
        {
            icon: `<svg version="1.1" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" overflow="visible" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g transform="translate(4.000000, 1.000000)"> <path fill="#85A4E6" d="M8,0l-9,4v6c0,5.6,3.8,10.7,9,12c5.2-1.3,9-6.4,9-12V4L8,0z M8,11h7c-0.5,4.1-3.3,7.8-7,8.9V11l-7,0V5.3 l7-3.1V11z"></path> <path fill="#5C85DE" d="M8,0v22c5.2-1.3,9-6.4,9-12V4L8,0z M15,11c-0.5,4.1-3.3,7.8-7,8.9V11L15,11z"></path> <path fill-rule="evenodd" fill="#3367D6" d="M17,11h-2c0,0,0,0.3-0.1,0.6L17,11z"></path> <polygon fill-rule="evenodd" fill="#3367D6" points="-1,11 1,11 1,10.4 "></polygon> </g> </g> </g></svg>`,
            name: "Cybersécurité",
            details: [ "Attaque + contre-mesure : DoS SYN Flood (Cisco TCP Intercept), MITM SSH (ARP Poisoning),Rogue DHCP (Snooping)" ]
        }
    ],

// --- 7. CERTIFICATIONS ---
    certifications: [
        { 
            name: "RootMe (En cours)", 
            issuer: "root-me.org", 
            url: "https://www.root-me.org/", 
            pdf: "",
            // Icône Terminal / Hacker
            icon: `<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" x="0px" y="0px" style="enable-background:new 0 0 595.3 595.3;" xml:space="preserve" id="svg72" sodipodi:docname="logo_rm_noir.svg" inkscape:version="0.92.2 2405546, 2018-03-11" viewBox="111.2 58.76 371.76 476.44" fill="#6366f2" width="100%" height="100%"><metadata id="metadata78"/><defs id="defs76">
	
	
</defs>
<style type="text/css" id="style2">
	.st0{fill:#9d9d9b;}
	.st1{fill:#585856;}
</style>
<g id="Calque_2">
</g>
<g id="g13" transform="matrix(1.8928864,0,0,1.8928864,-264.72593,-165.92773)">
		<path inkscape:connector-curvature="0" id="path5" d="m 299.2,319.9 c 0,0 0,0 0,0 -0.1,-0.1 -0.2,-0.2 -0.2,-0.3 -0.1,-0.1 -0.1,-0.1 -0.2,-0.2 0,0 0,0 0,0 -0.1,0 -0.1,-0.1 -0.2,-0.1 -0.1,-0.1 -0.2,-0.1 -0.3,-0.2 -0.1,0 -0.2,-0.1 -0.3,-0.1 -0.1,0 -0.2,-0.1 -0.2,-0.1 -0.1,0 -0.2,0 -0.3,-0.1 -0.1,0 -0.2,0 -0.3,0 -0.1,0 -0.2,0 -0.3,0 -0.1,0 -0.2,0 -0.3,0 -0.1,0 -0.2,0 -0.3,0 -0.1,0 -0.2,0 -0.3,0.1 -0.1,0 -0.2,0.1 -0.2,0.1 -0.1,0 -0.2,0.1 -0.3,0.1 -0.1,0 -0.2,0.1 -0.3,0.2 -0.1,0 -0.1,0.1 -0.2,0.1 0,0 0,0 0,0 -0.1,0.1 -0.1,0.1 -0.2,0.2 -0.1,0.1 -0.2,0.2 -0.2,0.2 0,0 0,0 0,0 l -8.1,10.1 c -1,1.3 -0.8,3.1 0.5,4.1 0.5,0.4 1.2,0.6 1.8,0.6 0.9,0 1.7,-0.4 2.3,-1.1 l 0.1,-0.1 c 3,-3.7 8.6,-3.7 11.5,0 l 0.1,0.1 c 0.6,0.7 1.4,1.1 2.3,1.1 0.6,0 1.3,-0.2 1.8,-0.6 1.3,-1 1.5,-2.9 0.5,-4.1 z"/>
		<path inkscape:connector-curvature="0" id="path7" d="m 285.7,149.1 c -4.1,0 -7.5,3.2 -7.7,7.3 l -15.3,5.6 c -0.8,0.3 -1.4,1 -1.4,1.9 v 9.7 H 249 c -0.9,-3.3 -3.8,-5.7 -7.4,-5.7 -4.2,0 -7.7,3.4 -7.7,7.7 0,4.2 3.4,7.7 7.7,7.7 3.6,0 6.5,-2.4 7.4,-5.7 h 14.3 c 1.1,0 2,-0.9 2,-2 v -10.3 l 13.5,-5 c 1.3,2.5 3.9,4.2 6.8,4.2 4.2,0 7.7,-3.4 7.7,-7.7 0.1,-4.2 -3.4,-7.7 -7.6,-7.7 z"/>
		<path style="fill:#9d9d9b" inkscape:connector-curvature="0" id="path9" d="m 269.5,292.3 c -2.5,-0.9 -4.9,-1.8 -7.2,-2.8 -1.7,-0.8 -3.4,-1.6 -5,-2.4 3.8,3.8 13,10.6 22.9,10.8 0.6,-0.7 1.1,-1.4 1.5,-2.3 -1.5,-0.3 -3,-0.6 -4.5,-1 -2.7,-0.7 -5.2,-1.4 -7.7,-2.3 z" class="st0"/>
		<path inkscape:connector-curvature="0" id="path11" d="m 395,222.5 c 0,-4.7 -0.3,-9.4 -1,-13.9 0,-0.3 -0.1,-0.6 -0.1,-0.9 -6.1,-39.7 -36.2,-72.3 -75.8,-81 -1,-4.5 -5,-7.9 -9.8,-7.9 -5.6,0 -10.1,4.5 -10.1,10.1 0,4.8 3.4,8.8 7.9,9.8 v 36.9 c 0,0.6 0.3,1.2 0.8,1.6 0.3,0.2 0.7,0.3 1.1,0.3 0.2,0 0.5,0 0.7,-0.1 l 14.8,-5.6 c 1,1.5 2.5,2.5 4.3,3 v 17.4 c -7.5,9.2 -16.8,17.5 -26.7,24.9 l -11.3,-26.2 c 2.1,-1.4 3.5,-3.7 3.5,-6.4 0,-4.2 -3.4,-7.7 -7.7,-7.7 -4.2,0 -7.7,3.4 -7.7,7.7 0,4.2 3.4,7.7 7.7,7.7 0.1,0 0.3,0 0.4,0 l 11.8,27.3 c -6.9,5 -14,9.5 -21,13.6 L 243.2,223 c -0.4,-0.1 -0.8,-0.1 -1.2,0.1 l -10,3.9 c -1.4,-1.9 -3.6,-3.1 -6.2,-3.1 -4.2,0 -7.7,3.4 -7.7,7.7 0,4.2 3.4,7.7 7.7,7.7 4.2,0 7.7,-3.4 7.7,-7.7 0,-0.3 -0.1,-0.6 -0.1,-0.9 l 9.4,-3.7 29.3,8.8 c -25,14 -47.4,22.1 -51.1,23.4 l -1.8,0.6 c -1.6,-1.2 -3.6,-1.9 -5.8,-1.9 -0.1,0 -0.2,0 -0.3,0 -4.7,-11.1 -7.1,-23.2 -7.1,-35.3 0,-6 0.6,-11.9 1.7,-17.6 h 43.9 c 0.9,3.3 3.8,5.7 7.4,5.7 4.2,0 7.7,-3.4 7.7,-7.7 0,-4.2 -3.4,-7.7 -7.7,-7.7 -3.6,0 -6.5,2.4 -7.4,5.7 h -43 c 8.1,-32.9 34.1,-59.2 67.7,-67 1.8,2.9 5,4.9 8.6,4.9 5.6,0 10.1,-4.5 10.1,-10.1 0,-5.6 -4.5,-10.1 -10.1,-10.1 -4.9,0 -8.9,3.5 -9.9,8 -44.1,10 -76.4,49.7 -76.4,95.7 0,13.1 2.6,26.2 7.7,38.2 -1.9,1.8 -3,4.4 -3,7.2 0,4.5 2.9,8.2 6.9,9.6 v 39.4 c 0,0.7 0.2,1.4 0.6,2 l 2.2,1.5 29.9,21.1 v 25.2 c 0,2.1 1.7,3.8 3.8,3.8 h 100 c 2.1,0 3.8,-1.7 3.8,-3.8 v -25.2 l 30,-21.1 2.2,-1.6 c 0.4,-0.6 0.6,-1.3 0.6,-2 V 277 c 3.7,-1.5 6.3,-5.1 6.3,-9.3 0,-2.6 -1,-5 -2.6,-6.8 5.3,-11.9 8,-25.1 8,-38.4 z M 281.4,125.6 c 0.9,-1 2.2,-1.6 3.6,-1.6 2.7,0 4.9,2.2 4.9,4.9 0,2.7 -2.2,4.9 -4.9,4.9 -1,0 -1.9,-0.3 -2.7,-0.8 -1.3,-0.9 -2.2,-2.4 -2.2,-4 0,-1.4 0.5,-2.6 1.3,-3.4 z m 22,3.2 c 0,-2.7 2.2,-4.9 4.9,-4.9 1.4,0 2.6,0.6 3.5,1.5 0.8,0.9 1.3,2 1.3,3.3 0,1.6 -0.8,3.1 -2.1,4 -0.8,0.6 -1.7,0.9 -2.8,0.9 -2.6,0.1 -4.8,-2.1 -4.8,-4.8 z m 18.8,38.5 c 0,0.3 0.1,0.5 0.1,0.7 l -12.2,4.6 v -34 c 3,-0.5 5.5,-2.3 6.9,-4.8 10.7,2.4 20.7,6.7 29.6,12.6 -0.1,14.8 -5.8,28.4 -14.8,40.7 v -12.4 c 3.3,-0.9 5.7,-3.8 5.7,-7.4 0,-4.2 -3.4,-7.7 -7.7,-7.7 -4.2,0.1 -7.6,3.5 -7.6,7.7 z M 213.5,272.7 c -1.2,0 -2.3,-0.5 -3.2,-1.2 -1,-0.9 -1.7,-2.2 -1.7,-3.6 0,-0.6 0.1,-1.2 0.3,-1.7 0.7,-1.8 2.5,-3.1 4.5,-3.1 0.9,0 1.7,0.3 2.4,0.7 1.4,0.8 2.4,2.4 2.4,4.2 0,0.9 -0.3,1.7 -0.7,2.4 -0.7,1.4 -2.2,2.3 -4,2.3 z m 170,-1.9 c -0.9,1.1 -2.3,1.9 -3.8,1.9 -1.4,0 -2.6,-0.6 -3.5,-1.5 -0.8,-0.9 -1.3,-2 -1.3,-3.3 0,-2.1 1.3,-3.9 3.2,-4.5 0.5,-0.2 1.1,-0.3 1.7,-0.3 2.3,0 4.3,1.7 4.8,3.9 0.1,0.3 0.1,0.6 0.1,1 -0.2,1 -0.6,2 -1.2,2.8 z m -3,-13 c -0.3,0 -0.6,0 -0.9,0 -5.6,0 -10.1,4.5 -10.1,10.1 0,4.3 2.7,8 6.6,9.4 v 36.8 l -31.5,22.2 c -1,0.7 -1.6,1.9 -1.6,3.1 v 21.2 c 0,1.2 -1,2.2 -2.2,2.2 h -11.7 c -1.2,0 -2.2,-1 -2.2,-2.2 V 353 c 0,-2 -1.4,-3.8 -3.4,-4 -2.3,-0.2 -4.2,1.6 -4.2,3.8 v 7.9 c 0,1.2 -1,2.2 -2.2,2.2 h -14.3 c -1.2,0 -2.2,-1 -2.2,-2.2 V 349 c 0,-2 -1.4,-3.8 -3.4,-4 -2.3,-0.2 -4.2,1.6 -4.2,3.8 v 12 c 0,1.2 -1,2.2 -2.2,2.2 h -14.3 c -1.2,0 -2.2,-1 -2.2,-2.2 V 353 c 0,-2 -1.4,-3.8 -3.4,-4 -2.3,-0.2 -4.2,1.6 -4.2,3.8 v 7.9 c 0,1.2 -1,2.2 -2.2,2.2 h -11.7 c -1.2,0 -2.2,-1 -2.2,-2.2 v -21.2 c 0,-1.2 -0.6,-2.4 -1.6,-3.1 L 217.6,314.2 V 277 c 3.5,-1.6 5.9,-5.1 5.9,-9.2 0,-0.6 -0.1,-1.2 -0.2,-1.8 4,-1.4 34.5,-12.3 64.5,-31 40.6,-25.3 63.1,-54 65.7,-83.5 17.5,14.1 29.6,34.5 33.1,57.4 -0.5,50.1 -87.8,81 -88.7,81.3 -0.2,0.1 -0.7,0.2 -1.1,0.4 -1.1,-0.2 -2.2,-0.4 -3.4,-0.6 -0.8,-0.2 -1.7,-0.3 -2.5,-0.5 -1.3,-0.2 -2.6,-0.5 -3.9,-0.8 -0.2,-0.1 -0.5,-0.1 -0.7,-0.1 -0.5,-0.1 -1,-0.2 -1.5,-0.3 -0.6,-0.1 -1.2,-0.3 -1.8,-0.4 -1.4,-0.3 -2.8,-0.6 -4.1,-1 -2.5,-0.6 -4.9,-1.3 -7.3,-1.9 -2.3,-0.7 -4.7,-1.3 -6.9,-2 -0.1,0 -0.1,0 -0.2,0 -1.7,-0.5 -3.3,-1 -4.9,-1.6 -0.5,-0.2 -1.1,-0.4 -1.6,-0.5 -0.8,-0.3 -1.5,-0.5 -2.2,-0.7 -1.3,-0.4 -2.5,-0.8 -3.6,-1.3 0,0 -0.1,0 -0.1,0 -1.8,-0.6 -3.4,-1.2 -4.8,-1.8 -1.5,-0.6 -2.8,-1.1 -3.8,-1.5 -1,-0.5 -1.9,-0.8 -2.4,-1.1 -0.6,-0.3 -0.9,-0.4 -0.9,-0.4 0,0 0.2,0.3 0.6,0.7 0.4,0.5 1,1.2 1.9,2 0.8,0.8 1.9,1.8 3.2,2.8 1.3,1 2.8,2.1 4.4,3.2 0,0 0,0 0.1,0 -0.6,2 -1,4.2 -1,6.4 0,11.5 9.4,20.9 20.9,20.9 8.9,0 16.5,-5.6 19.5,-13.5 1,0.1 2.1,0.2 3.1,0.3 1.8,0.1 3.5,0.1 5.1,0.1 0.1,0 0.2,0.1 0.3,0.1 l 16.9,17.2 c 4.3,4.3 11,5 16,1.7 l 26.4,-14.8 c 2.3,-1.5 3.8,-4.1 3.8,-6.9 v -30.4 c 10.2,-8.1 19.4,-17.7 25.4,-28.6 -1.1,7.9 -3.2,15.4 -6.3,22.5 z m -98.8,37.8 c -0.4,0.8 -1,1.6 -1.5,2.3 v 0 c -2.4,2.8 -6,4.6 -10,4.6 -4,0 -7.6,-1.8 -10,-4.6 -2,-2.3 -3.1,-5.3 -3.1,-8.5 0,-0.8 0.1,-1.5 0.2,-2.3 0,0 0,0 0,0 1.6,0.8 3.3,1.6 5,2.4 2.3,1 4.7,2 7.2,2.8 2.5,0.9 5.1,1.6 7.7,2.3 1.5,0.4 3,0.7 4.5,1 z"/>
	</g>
</svg>`
        },
        { 
            name: "Cyber101", 
            issuer: "cyber101.com", 
            url: "https://www.cyber101.com/fr/", 
            pdf: "cyber101.pdf",
            // Icône Bouclier / Sécurité
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
        },
        { 
            name: "SecNumAcadémie", 
            issuer: "ANSSI", 
            url: "https://secnumacademie.gouv.fr/", 
            pdf: "SecNum.pdf",
            // Icône Médaille / Gouvernementale
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`
        }
    ]
    
};
Object.freeze(config);
