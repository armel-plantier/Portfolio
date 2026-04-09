// ============================================================================
// CONFIG
// ============================================================================
const GITHUB_OWNER = 'armel-plantier';
const GITHUB_REPO  = 'Portfolio';
const ALLOWED_USER = 'armel-plantier';
const PROC_DIR     = 'Documents/Procédures';
const PROJ_DIR     = 'Documents/Projet';
const CONFIG_PATH  = 'Site/config.js';

// ============================================================================
// ICON LIBRARY (50+)
// ============================================================================
const ICON_LIBRARY = [
    { name: 'Serveur', cat: 'infra', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>' },
    { name: 'Cloud', cat: 'infra', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>' },
    { name: 'Base de données', cat: 'infra', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>' },
    { name: 'Disque dur', cat: 'infra', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg>' },
    { name: 'CPU', cat: 'infra', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>' },
    { name: 'Couches', cat: 'infra', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>' },
    { name: 'Conteneur', cat: 'infra', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>' },
    { name: 'Rack', cat: 'infra', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="4" rx="1"/><rect x="2" y="10" width="20" height="4" rx="1"/><rect x="2" y="18" width="20" height="4" rx="1"/></svg>' },
    { name: 'Réseau', cat: 'réseau', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18M12 8v4M6.5 12v4M17.5 12v4"/><rect x="8.5" y="3" width="7" height="5" rx="1"/><rect x="14" y="16" width="7" height="5" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>' },
    { name: 'Globe', cat: 'réseau', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
    { name: 'Wi-Fi', cat: 'réseau', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>' },
    { name: 'Signal RSS', cat: 'réseau', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>' },
    { name: 'Flux', cat: 'réseau', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>' },
    { name: 'Routeur', cat: 'réseau', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="14" width="20" height="7" rx="2"/><path d="M6 14V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"/><line x1="6" y1="18" x2="6.01" y2="18"/><line x1="10" y1="18" x2="10.01" y2="18"/></svg>' },
    { name: 'Bluetooth', cat: 'réseau', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"/></svg>' },
    { name: 'Cadenas', cat: 'sécurité', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>' },
    { name: 'Cadenas ouvert', cat: 'sécurité', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>' },
    { name: 'Bouclier', cat: 'sécurité', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
    { name: 'Bouclier OK', cat: 'sécurité', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>' },
    { name: 'Bouclier alerte', cat: 'sécurité', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' },
    { name: 'Clé', cat: 'sécurité', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>' },
    { name: 'Empreinte', cat: 'sécurité', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"/><path d="M5 19.5C5.5 18 6 15 6 12c0-3.5 2.5-6 6-6"/><path d="M12 12c0 5-2 7-5 9"/><path d="M18 12c0 2-1 4-2 6"/><path d="M22 12a10 10 0 0 1-4 8"/><path d="M12 12a6 6 0 0 0-6 6"/></svg>' },
    { name: 'Oeil', cat: 'sécurité', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' },
    { name: 'Oeil barré', cat: 'sécurité', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>' },
    { name: 'Alerte', cat: 'sécurité', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
    { name: 'Interdit', cat: 'sécurité', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14"/></svg>' },
    { name: 'Bug', cat: 'sécurité', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="6" width="8" height="14" rx="4"/><path d="M19 9h2M3 9h2M19 15h2M3 15h2M12 6V2M8 6l-2-2M16 6l2-2"/></svg>' },
    { name: 'Terminal', cat: 'système', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>' },
    { name: 'Document', cat: 'système', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>' },
    { name: 'Dossier', cat: 'système', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>' },
    { name: 'Code', cat: 'système', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>' },
    { name: 'Git branch', cat: 'système', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>' },
    { name: 'Ecran', cat: 'système', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>' },
    { name: 'Smartphone', cat: 'système', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>' },
    { name: 'Paramètres', cat: 'système', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>' },
    { name: 'Outil', cat: 'système', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>' },
    { name: 'Presse-papiers', cat: 'système', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>' },
    { name: 'Archive', cat: 'système', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>' },
    { name: 'Utilisateur', cat: 'utilisateurs', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
    { name: 'Utilisateurs', cat: 'utilisateurs', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { name: 'Utilisateur +', cat: 'utilisateurs', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>' },
    { name: 'Utilisateur -', cat: 'utilisateurs', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="23" y1="11" x2="17" y2="11"/></svg>' },
    { name: 'Monitoring', cat: 'monitoring', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' },
    { name: 'Graphique', cat: 'monitoring', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
    { name: 'Camembert', cat: 'monitoring', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>' },
    { name: 'Horloge', cat: 'monitoring', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
    { name: 'Cloche', cat: 'monitoring', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>' },
    { name: 'Loupe', cat: 'monitoring', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' },
    { name: 'Upload', cat: 'divers', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>' },
    { name: 'Download', cat: 'divers', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/></svg>' },
    { name: 'Lien', cat: 'divers', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>' },
    { name: 'Mail', cat: 'divers', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' },
    { name: 'Carte', cat: 'divers', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>' },
    { name: 'Zap', cat: 'divers', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>' },
    { name: 'Etoile', cat: 'divers', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
    { name: 'Check', cat: 'divers', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' },
    { name: 'Recharger', cat: 'divers', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>' },
    { name: 'Poubelle', cat: 'divers', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' },
    { name: 'Ampoule', cat: 'divers', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>' },
    { name: 'Livre', cat: 'divers', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>' },
];

// ============================================================================
// STATE
// ============================================================================
let ghToken = null;
let ghUser = null;
let selectedProcTags = new Set();
let selectedProjTags = new Set();
let selectedProcIcon = 0;
let selectedProjIcon = 0;
let procFile = null;
let projFile = null;

// ============================================================================
// UTILS
// ============================================================================
function $(id) { return document.getElementById(id); }
function toast(msg, type='success') {
    const t = $('toast');
    t.textContent = msg; t.className = 'toast ' + type;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
}

async function ghAPI(path, opts = {}) {
    const url = path.startsWith('http') ? path : `https://api.github.com${path}`;
    const res = await fetch(url, {
        ...opts,
        headers: {
            'Authorization': `Bearer ${ghToken}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            ...(opts.headers || {})
        }
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `GitHub API error ${res.status}`);
    }
    return res.status === 204 ? null : res.json();
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function escapeForJS(str) {
    return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

// ============================================================================
// AUTH
// ============================================================================
$('login-btn').addEventListener('click', doLogin);
$('pat-input').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

async function doLogin() {
    const token = $('pat-input').value.trim();
    if (!token) return;
    $('login-btn').textContent = 'Vérification...';
    $('login-btn').disabled = true;
    $('lock-error').style.display = 'none';
    try {
        ghToken = token;
        const user = await ghAPI('/user');
        if (user.login.toLowerCase() !== ALLOWED_USER.toLowerCase()) {
            throw new Error('Accès refusé : ce compte n\'est pas autorisé.');
        }
        await ghAPI(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}`);
        ghUser = user.login;
        sessionStorage.setItem('gh_pat', token);
        $('session-user').textContent = ghUser;
        $('lock-screen').style.display = 'none';
        $('admin-panel').style.display = 'block';
        loadDashboard();
    } catch (err) {
        ghToken = null;
        $('lock-error-text').textContent = err.message;
        $('lock-error').style.display = 'flex';
    } finally {
        $('login-btn').textContent = 'Se connecter';
        $('login-btn').disabled = false;
    }
}

(function() {
    const stored = sessionStorage.getItem('gh_pat');
    if (stored) { $('pat-input').value = stored; doLogin(); }
})();

$('logout-btn').addEventListener('click', () => {
    sessionStorage.removeItem('gh_pat');
    ghToken = null; ghUser = null;
    $('admin-panel').style.display = 'none';
    $('lock-screen').style.display = '';
    $('pat-input').value = '';
});

// ============================================================================
// TABS
// ============================================================================
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        $('tab-' + btn.dataset.tab).classList.add('active');
    });
});

// ============================================================================
// ICON GRIDS (with search + category filter)
// ============================================================================
const ICON_CATEGORIES = [...new Set(ICON_LIBRARY.map(i => i.cat))];

function renderIconGrid(containerId, searchId, onSelect) {
    const grid = $(containerId);
    const searchInput = $(searchId);
    let selected = 0;

    function render(filter, cat) {
        filter = filter || '';
        cat = cat || '';
        grid.innerHTML = '';
        const lf = filter.toLowerCase();
        const filtered = ICON_LIBRARY.filter(function(icon) {
            return icon.name.toLowerCase().includes(lf) && (!cat || icon.cat === cat);
        });
        if (filtered.length === 0) {
            grid.innerHTML = '<p style="grid-column:1/-1;color:var(--muted);font-size:0.85rem;text-align:center;padding:16px 0;">Aucune icône trouvée</p>';
            return;
        }
        filtered.forEach(function(icon) {
            var realIdx = ICON_LIBRARY.indexOf(icon);
            var div = document.createElement('div');
            div.className = 'icon-option' + (realIdx === selected ? ' selected' : '');
            div.innerHTML = icon.svg;
            div.title = icon.name;
            div.addEventListener('click', function() {
                selected = realIdx;
                grid.querySelectorAll('.icon-option').forEach(function(o) { o.classList.remove('selected'); });
                div.classList.add('selected');
                onSelect(realIdx);
            });
            grid.appendChild(div);
        });
    }

    var catBar = document.createElement('div');
    catBar.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;';
    var activeCat = '';

    var allPill = document.createElement('span');
    allPill.className = 'tag-chip selected';
    allPill.textContent = 'Tout';
    allPill.style.cssText = 'font-size:0.78rem;padding:5px 12px;cursor:pointer;';
    allPill.addEventListener('click', function() {
        activeCat = '';
        catBar.querySelectorAll('.tag-chip').forEach(function(c) { c.classList.remove('selected'); });
        allPill.classList.add('selected');
        render(searchInput.value, '');
    });
    catBar.appendChild(allPill);

    ICON_CATEGORIES.forEach(function(cat) {
        var pill = document.createElement('span');
        pill.className = 'tag-chip';
        pill.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        pill.style.cssText = 'font-size:0.78rem;padding:5px 12px;cursor:pointer;';
        pill.addEventListener('click', function() {
            activeCat = cat;
            catBar.querySelectorAll('.tag-chip').forEach(function(c) { c.classList.remove('selected'); });
            pill.classList.add('selected');
            render(searchInput.value, cat);
        });
        catBar.appendChild(pill);
    });

    grid.parentNode.insertBefore(catBar, grid);
    searchInput.addEventListener('input', function() { render(searchInput.value, activeCat); });
    render();

    return {
        getSelected: function() { return selected; },
        reset: function() { selected = 0; searchInput.value = ''; activeCat = ''; catBar.querySelectorAll('.tag-chip').forEach(function(c) { c.classList.remove('selected'); }); allPill.classList.add('selected'); render(); }
    };
}

var procIconGrid = renderIconGrid('proc-icons', 'proc-icon-search', function(i) { selectedProcIcon = i; updatePreview('proc'); });
var projIconGrid = renderIconGrid('proj-icons', 'proj-icon-search', function(i) { selectedProjIcon = i; updatePreview('proj'); });

// ============================================================================
// TAGS (with custom tag input)
// ============================================================================
function setupTags(containerId, inputId, set, onChange) {
    var container = $(containerId);
    var input = $(inputId);

    container.querySelectorAll('.tag-chip').forEach(function(chip) {
        chip.addEventListener('click', function() {
            var tag = chip.dataset.tag;
            if (!tag) return;
            if (set.has(tag)) { set.delete(tag); chip.classList.remove('selected'); }
            else { set.add(tag); chip.classList.add('selected'); }
            onChange();
        });
    });

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            var val = input.value.trim();
            if (!val) return;
            var existing = container.querySelector('[data-tag="' + CSS.escape(val) + '"]');
            if (existing) {
                if (!set.has(val)) { set.add(val); existing.classList.add('selected'); }
                input.value = '';
                onChange();
                return;
            }
            var chip = document.createElement('span');
            chip.className = 'tag-chip selected';
            chip.dataset.tag = val;
            chip.textContent = val;
            chip.addEventListener('click', function() {
                if (set.has(val)) { set.delete(val); chip.classList.remove('selected'); }
                else { set.add(val); chip.classList.add('selected'); }
                onChange();
            });
            container.insertBefore(chip, container.querySelector('.tag-input-wrap'));
            set.add(val);
            input.value = '';
            onChange();
        }
    });
}

setupTags('proc-tags', 'proc-custom-tag', selectedProcTags, function() { validateForm('proc'); updatePreview('proc'); });
setupTags('proj-tags', 'proj-custom-tag', selectedProjTags, function() { validateForm('proj'); updatePreview('proj'); });

// ============================================================================
// FILE UPLOAD
// ============================================================================
function setupUpload(zoneId, inputId, onFile) {
    var zone = $(zoneId);
    var input = $(inputId);
    zone.addEventListener('click', function() { input.click(); });
    zone.addEventListener('dragover', function(e) { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', function() { zone.classList.remove('dragover'); });
    zone.addEventListener('drop', function(e) {
        e.preventDefault(); zone.classList.remove('dragover');
        var file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') onFile(file);
        else toast('Fichier PDF requis', 'error');
    });
    input.addEventListener('change', function() { if (input.files[0]) onFile(input.files[0]); });
}

function setUploadState(zoneId, file) {
    var zone = $(zoneId);
    if (file) {
        zone.classList.add('has-file');
        var sizeMB = (file.size / 1024 / 1024).toFixed(1);
        zone.querySelector('p').innerHTML = '<strong>' + file.name + '</strong> (' + sizeMB + ' Mo)';
    } else {
        zone.classList.remove('has-file');
        zone.querySelector('p').innerHTML = '<span class="browse">Parcourir</span> ou glisser-déposer';
    }
}

setupUpload('proc-upload', 'proc-file', function(f) { procFile = f; setUploadState('proc-upload', f); validateForm('proc'); updatePreview('proc'); });
setupUpload('proj-upload', 'proj-file', function(f) { projFile = f; setUploadState('proj-upload', f); validateForm('proj'); updatePreview('proj'); });

// ============================================================================
// VALIDATION & PREVIEW
// ============================================================================
['proc-title', 'proc-desc'].forEach(function(id) { $(id).addEventListener('input', function() { validateForm('proc'); updatePreview('proc'); }); });
['proj-title', 'proj-desc'].forEach(function(id) { $(id).addEventListener('input', function() { validateForm('proj'); updatePreview('proj'); }); });

function validateForm(type) {
    var title = $(type + '-title').value.trim();
    var tags = type === 'proc' ? selectedProcTags : selectedProjTags;
    var file = type === 'proc' ? procFile : projFile;
    $(type + '-submit').disabled = !(title && tags.size > 0 && file);
}

function updatePreview(type) {
    var title = $(type + '-title').value.trim();
    var desc = $(type + '-desc').value.trim();
    var tags = type === 'proc' ? selectedProcTags : selectedProjTags;
    var iconIdx = type === 'proc' ? selectedProcIcon : selectedProjIcon;
    var file = type === 'proc' ? procFile : projFile;
    var container = $(type + '-preview');
    var content = $(type + '-preview-content');
    if (!title) { container.style.display = 'none'; return; }
    container.style.display = '';
    var tagsHTML = Array.from(tags).map(function(t) { return '<span>' + t + '</span>'; }).join('');
    content.innerHTML = '<div class="p-icon">' + ICON_LIBRARY[iconIdx].svg + '</div><div class="p-meta"><h4>' + title + '</h4><p>' + (desc || 'Aucune description') + '</p>' + (file ? '<p style="color:var(--success);font-size:0.75rem;margin-top:4px;">' + file.name + '</p>' : '') + '<div class="preview-tags">' + tagsHTML + '</div></div>';
}

// ============================================================================
// RESET
// ============================================================================
function resetForm(type) {
    $(type + '-title').value = '';
    $(type + '-desc').value = '';
    var tagSet = type === 'proc' ? selectedProcTags : selectedProjTags;
    tagSet.clear();
    $(type + '-tags').querySelectorAll('.tag-chip').forEach(function(c) { c.classList.remove('selected'); });
    $(type + '-custom-tag').value = '';
    if (type === 'proc') { procFile = null; selectedProcIcon = 0; procIconGrid.reset(); }
    else { projFile = null; selectedProjIcon = 0; projIconGrid.reset(); }
    setUploadState(type + '-upload', null);
    $(type + '-preview').style.display = 'none';
    validateForm(type);
}
$('proc-reset').addEventListener('click', function() { resetForm('proc'); });
$('proj-reset').addEventListener('click', function() { resetForm('proj'); });

// ============================================================================
// PUBLISH
// ============================================================================
function showProgress(title, status, pct) {
    $('progress').classList.add('active');
    $('progress-card').className = 'progress-card';
    $('progress-spinner').style.display = '';
    $('progress-title').textContent = title;
    $('progress-status').textContent = status;
    $('progress-fill').style.width = pct + '%';
}
function hideProgress() { $('progress').classList.remove('active'); }
function progressSuccess(msg) {
    $('progress-card').classList.add('success');
    $('progress-spinner').style.display = 'none';
    $('progress-title').textContent = 'Publié avec succès !';
    $('progress-status').textContent = msg;
    setTimeout(hideProgress, 2500);
}
function progressError(msg) {
    $('progress-card').classList.add('error');
    $('progress-spinner').style.display = 'none';
    $('progress-title').textContent = 'Erreur';
    $('progress-status').textContent = msg;
    setTimeout(hideProgress, 4000);
}

async function publish(type) {
    var title = $(type + '-title').value.trim();
    var desc = $(type + '-desc').value.trim();
    var tags = Array.from(type === 'proc' ? selectedProcTags : selectedProjTags);
    var iconIdx = type === 'proc' ? selectedProcIcon : selectedProjIcon;
    var file = type === 'proc' ? procFile : projFile;
    var dir = type === 'proc' ? PROC_DIR : PROJ_DIR;
    var section = type === 'proc' ? 'procedures' : 'projects';
    try {
        showProgress('Publication en cours...', 'Upload du PDF vers GitHub...', 20);
        var b64 = await fileToBase64(file);
        var pdfPath = dir + '/' + file.name;
        await ghAPI('/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/contents/' + encodeURIComponent(pdfPath), {
            method: 'PUT',
            body: JSON.stringify({ message: '[admin] Ajout ' + (type === 'proc' ? 'procédure' : 'projet') + ' : ' + title, content: b64 })
        });
        showProgress('Publication en cours...', 'Mise à jour de config.js...', 60);
        var configData = await ghAPI('/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/contents/' + CONFIG_PATH);
        var rawPub = configData.content.replace(/\n/g, '');
        var bytesPub = Uint8Array.from(atob(rawPub), function(c) { return c.charCodeAt(0); });
        var currentContent = new TextDecoder('utf-8').decode(bytesPub);
        var iconSvg = escapeForJS(ICON_LIBRARY[iconIdx].svg);
        var entry = '{\n    title: "' + escapeForJS(title) + '",\n    longDescription: "' + escapeForJS(desc) + '",\n    path: "' + escapeForJS(file.name) + '",\n    icon: `' + iconSvg + '`,\n    tags: [' + tags.map(function(t) { return '"' + escapeForJS(t) + '"'; }).join(', ') + ']\n}';
        var sectionRegex = new RegExp('(' + section + ':\\s*\\[)([\\s\\S]*?)(\\])');
        var match = currentContent.match(sectionRegex);
        if (!match) throw new Error('Section "' + section + '" non trouvée dans config.js');
        var existingEntries = match[2].trim();
        var separator = existingEntries.endsWith(',') || existingEntries === '' ? '\n' : ',\n';
        var newContent = currentContent.replace(sectionRegex, match[1] + match[2] + (existingEntries ? separator : '\n') + entry + '\n' + match[3]);
        showProgress('Publication en cours...', 'Commit de config.js...', 85);
        await ghAPI('/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/contents/' + CONFIG_PATH, {
            method: 'PUT',
            body: JSON.stringify({ message: '[admin] config.js : ajout ' + title, content: btoa(Array.from(new TextEncoder().encode(newContent), function(b) { return String.fromCharCode(b); }).join('')), sha: configData.sha })
        });
        showProgress('Publication en cours...', 'Déploiement GitHub Pages...', 100);
        progressSuccess('"' + title + '" sera en ligne dans ~1 min (GitHub Pages rebuild).');
        resetForm(type);
    } catch (err) {
        console.error(err);
        progressError(err.message);
    }
}

$('proc-submit').addEventListener('click', function() { publish('proc'); });
$('proj-submit').addEventListener('click', function() { publish('proj'); });

// ============================================================================
// DASHBOARD
// ============================================================================
async function loadDashboard() {
    try {
        // 1. Fetch config.js to count entries
        var configData = await ghAPI('/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/contents/' + CONFIG_PATH);
        var raw = configData.content.replace(/\n/g, '');
        var bytes = Uint8Array.from(atob(raw), function(c) { return c.charCodeAt(0); });
        var configContent = new TextDecoder('utf-8').decode(bytes);

        // Robust section extractor: finds "key: [" then counts bracket depth
        function extractSection(content, key) {
            var startPattern = key + ':';
            var idx = content.indexOf(startPattern);
            if (idx === -1) return '';
            // Find the opening bracket
            var bracketStart = content.indexOf('[', idx);
            if (bracketStart === -1) return '';
            var depth = 0;
            var i = bracketStart;
            while (i < content.length) {
                if (content[i] === '[') depth++;
                else if (content[i] === ']') { depth--; if (depth === 0) break; }
                i++;
            }
            return content.substring(bracketStart, i + 1);
        }

        // Count top-level objects by counting "title:" or "name:" at the right depth
        function countEntries(sectionStr, key) {
            // Count occurrences of the key pattern outside of nested arrays
            var re = new RegExp('\\b' + key + '\\s*:', 'g');
            return (sectionStr.match(re) || []).length;
        }

        var procSection = extractSection(configContent, 'procedures');
        $('dash-proc-count').textContent = countEntries(procSection, 'title');

        var projSection = extractSection(configContent, 'projects');
        $('dash-proj-count').textContent = countEntries(projSection, 'title');

        var certSection = extractSection(configContent, 'certifications');
        $('dash-cert-count').textContent = countEntries(certSection, 'name');

        // 2. Fetch recent commits
        var commits = await ghAPI('/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/commits?per_page=8');
        if (commits && commits.length > 0) {
            // Last commit date
            var lastDate = new Date(commits[0].commit.author.date);
            var now = new Date();
            var diffMs = now - lastDate;
            var diffMins = Math.floor(diffMs / 60000);
            var diffHours = Math.floor(diffMs / 3600000);
            var diffDays = Math.floor(diffMs / 86400000);
            var timeAgo;
            if (diffMins < 1) timeAgo = "à l'instant";
            else if (diffMins < 60) timeAgo = 'il y a ' + diffMins + ' min';
            else if (diffHours < 24) timeAgo = 'il y a ' + diffHours + 'h';
            else timeAgo = 'il y a ' + diffDays + 'j';
            $('dash-last-commit').textContent = timeAgo;

            // Commit list
            var commitHTML = '<div class="commit-list">';
            commits.forEach(function(c) {
                var d = new Date(c.commit.author.date);
                var dateStr = d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
                var msg = c.commit.message.split('\n')[0];
                if (msg.length > 80) msg = msg.substring(0, 80) + '...';
                var sha = c.sha.substring(0, 7);
                commitHTML += '<div class="commit-item">';
                commitHTML += '<div class="commit-dot"></div>';
                commitHTML += '<div>';
                commitHTML += '<div class="commit-msg">' + msg + '</div>';
                commitHTML += '<div class="commit-meta">' + sha + ' — ' + dateStr + ' par ' + (c.commit.author.name || 'inconnu') + '</div>';
                commitHTML += '</div></div>';
            });
            commitHTML += '</div>';
            $('dash-commits').innerHTML = commitHTML;
        }

        // 3. Fetch deploy status (GitHub Pages workflow)
        try {
            var workflows = await ghAPI('/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/actions/runs?per_page=1');
            if (workflows && workflows.workflow_runs && workflows.workflow_runs.length > 0) {
                var run = workflows.workflow_runs[0];
                var status = run.conclusion || run.status;
                var deployDate = new Date(run.updated_at);
                var deployDateStr = deployDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
                var badgeClass = 'pending';
                var statusText = 'En cours...';
                if (status === 'success') { badgeClass = 'success'; statusText = 'Déployé avec succès'; }
                else if (status === 'failure') { badgeClass = 'failure'; statusText = 'Échec du déploiement'; }
                else if (status === 'in_progress' || status === 'queued') { badgeClass = 'pending'; statusText = 'Déploiement en cours...'; }

                $('dash-deploy').innerHTML = '<div class="deploy-badge ' + badgeClass + '">' +
                    '<span class="deploy-dot"></span>' +
                    '<span>' + statusText + '</span>' +
                    '<span style="color:var(--muted);font-size:0.8rem;margin-left:8px;">' + deployDateStr + '</span>' +
                    '</div>';
            } else {
                $('dash-deploy').innerHTML = '<span style="color:var(--muted);font-size:0.85rem;">Aucun workflow trouvé</span>';
            }
        } catch (e) {
            $('dash-deploy').innerHTML = '<span style="color:var(--muted);font-size:0.85rem;">Impossible de charger le statut (scope Actions requis)</span>';
        }

    } catch (err) {
        console.error('Dashboard error:', err);
    }
}

// ============================================================================
// CERTIFICATIONS
// ============================================================================
var selectedCertIcon = 0;
var certFile = null;

var certIconGrid = renderIconGrid('cert-icons', 'cert-icon-search', function(i) { selectedCertIcon = i; });

setupUpload('cert-upload', 'cert-file', function(f) {
    certFile = f; setUploadState('cert-upload', f);
});

['cert-name', 'cert-issuer'].forEach(function(id) {
    $(id).addEventListener('input', function() {
        var name = $('cert-name').value.trim();
        var issuer = $('cert-issuer').value.trim();
        $('cert-submit').disabled = !(name && issuer);
    });
});

$('cert-reset').addEventListener('click', function() {
    $('cert-name').value = '';
    $('cert-issuer').value = '';
    $('cert-url').value = '';
    certFile = null;
    selectedCertIcon = 0;
    setUploadState('cert-upload', null);
    certIconGrid.reset();
    $('cert-submit').disabled = true;
});

$('cert-submit').addEventListener('click', async function() {
    var name = $('cert-name').value.trim();
    var issuer = $('cert-issuer').value.trim();
    var url = $('cert-url').value.trim();
    var pdfName = '';

    try {
        // Upload cert PDF if provided
        if (certFile) {
            showProgress('Publication en cours...', 'Upload du certificat PDF...', 20);
            var b64 = await fileToBase64(certFile);
            var pdfPath = 'Documents/Certifs/' + certFile.name;
            await ghAPI('/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/contents/' + encodeURIComponent(pdfPath), {
                method: 'PUT',
                body: JSON.stringify({ message: '[admin] Ajout certif PDF : ' + name, content: b64 })
            });
            pdfName = certFile.name;
        }

        showProgress('Publication en cours...', 'Mise à jour de config.js...', 60);
        var configData = await ghAPI('/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/contents/' + CONFIG_PATH);
        var raw = configData.content.replace(/\n/g, '');
        var bytes = Uint8Array.from(atob(raw), function(c) { return c.charCodeAt(0); });
        var currentContent = new TextDecoder('utf-8').decode(bytes);

        var iconSvg = escapeForJS(ICON_LIBRARY[selectedCertIcon].svg);
        var entry = '{ \n            name: "' + escapeForJS(name) + '", \n            issuer: "' + escapeForJS(issuer) + '", \n            url: "' + escapeForJS(url) + '", \n            pdf: "' + escapeForJS(pdfName) + '",\n            icon: `' + iconSvg + '`\n        }';

        var sectionRegex = /(certifications:\s*\[)([\s\S]*?)(\]\s*\n?\s*};?\s*$)/;
        var match = currentContent.match(sectionRegex);
        if (!match) {
            // Fallback: try simpler regex
            sectionRegex = /(certifications:\s*\[)([\s\S]*?)(\][\s\S]*Object\.freeze)/;
            match = currentContent.match(sectionRegex);
        }
        if (!match) throw new Error('Section "certifications" non trouvée dans config.js');

        var existingEntries = match[2].trim();
        var separator = existingEntries.endsWith(',') || existingEntries === '' ? '\n        ' : ',\n        ';
        var newContent = currentContent.replace(sectionRegex, match[1] + match[2] + (existingEntries ? separator : '\n        ') + entry + '\n    ' + match[3]);

        showProgress('Publication en cours...', 'Commit de config.js...', 85);
        var encoded = btoa(Array.from(new TextEncoder().encode(newContent), function(b) { return String.fromCharCode(b); }).join(''));
        await ghAPI('/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/contents/' + CONFIG_PATH, {
            method: 'PUT',
            body: JSON.stringify({ message: '[admin] config.js : ajout certif ' + name, content: encoded, sha: configData.sha })
        });

        progressSuccess('"' + name + '" sera en ligne dans ~1 min.');
        $('cert-name').value = '';
        $('cert-issuer').value = '';
        $('cert-url').value = '';
        certFile = null;
        selectedCertIcon = 0;
        setUploadState('cert-upload', null);
        certIconGrid.reset();
        $('cert-submit').disabled = true;

    } catch (err) {
        console.error(err);
        progressError(err.message);
    }
});

// ============================================================================
// MANAGE ENTRIES (list + delete)
// ============================================================================
var manageConfigSha = null;
var manageConfigContent = '';

// Load entries when switching to manage tab
document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        if (btn.dataset.tab === 'manage' && ghToken) {
            loadManageEntries();
        }
    });
});

async function loadManageEntries() {
    $('manage-loading').style.display = 'flex';
    $('manage-content').style.display = 'none';

    try {
        var configData = await ghAPI('/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/contents/' + CONFIG_PATH);
        manageConfigSha = configData.sha;
        var raw = configData.content.replace(/\n/g, '');
        var bytes = Uint8Array.from(atob(raw), function(c) { return c.charCodeAt(0); });
        manageConfigContent = new TextDecoder('utf-8').decode(bytes);

        // Parse entries using title/name patterns
        function parseEntries(content, sectionKey, nameKey) {
            var section = extractSection(content, sectionKey);
            if (!section) return [];
            var entries = [];
            var re = new RegExp(nameKey + '\\s*:\\s*"([^"]*)"', 'g');
            var m;
            while ((m = re.exec(section)) !== null) {
                entries.push(m[1]);
            }
            return entries;
        }

        // Reuse extractSection from dashboard
        function extractSection(content, key) {
            var startPattern = key + ':';
            var idx = content.indexOf(startPattern);
            if (idx === -1) return '';
            var bracketStart = content.indexOf('[', idx);
            if (bracketStart === -1) return '';
            var depth = 0;
            var i = bracketStart;
            while (i < content.length) {
                if (content[i] === '[') depth++;
                else if (content[i] === ']') { depth--; if (depth === 0) break; }
                i++;
            }
            return content.substring(bracketStart, i + 1);
        }

        var procedures = parseEntries(manageConfigContent, 'procedures', 'title');
        var projects = parseEntries(manageConfigContent, 'projects', 'title');
        var certifications = parseEntries(manageConfigContent, 'certifications', 'name');

        var html = '';

        // Procedures
        html += '<div class="manage-section-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> Procédures <span class="count-badge">' + procedures.length + '</span></div>';
        html += '<div class="entry-list">';
        procedures.forEach(function(title, i) {
            html += '<div class="entry-row">';
            html += '<div class="e-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>';
            html += '<div class="e-info"><div class="e-title">' + title + '</div><div class="e-sub">Procédure #' + (i + 1) + '</div></div>';
            html += '<div class="e-actions"><button class="btn-icon danger" onclick="confirmDelete(\'procedures\',\'title\',\'' + escapeForJS(title).replace(/'/g, "\\'") + '\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div>';
            html += '</div>';
        });
        html += '</div>';

        // Projects
        html += '<div class="manage-section-title" style="margin-top:32px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><path d="M3 12h18M12 8v4M6.5 12v4M17.5 12v4"/><rect x="8.5" y="3" width="7" height="5" rx="1"/><rect x="14" y="16" width="7" height="5" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg> Projets <span class="count-badge">' + projects.length + '</span></div>';
        html += '<div class="entry-list">';
        projects.forEach(function(title, i) {
            html += '<div class="entry-row">';
            html += '<div class="e-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M3 12h18M12 8v4M6.5 12v4M17.5 12v4"/><rect x="8.5" y="3" width="7" height="5" rx="1"/></svg></div>';
            html += '<div class="e-info"><div class="e-title">' + title + '</div><div class="e-sub">Projet #' + (i + 1) + '</div></div>';
            html += '<div class="e-actions"><button class="btn-icon danger" onclick="confirmDelete(\'projects\',\'title\',\'' + escapeForJS(title).replace(/'/g, "\\'") + '\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div>';
            html += '</div>';
        });
        html += '</div>';

        // Certifications
        html += '<div class="manage-section-title" style="margin-top:32px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg> Certifications <span class="count-badge">' + certifications.length + '</span></div>';
        html += '<div class="entry-list">';
        certifications.forEach(function(name, i) {
            html += '<div class="entry-row">';
            html += '<div class="e-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg></div>';
            html += '<div class="e-info"><div class="e-title">' + name + '</div><div class="e-sub">Certification #' + (i + 1) + '</div></div>';
            html += '<div class="e-actions"><button class="btn-icon danger" onclick="confirmDelete(\'certifications\',\'name\',\'' + escapeForJS(name).replace(/'/g, "\\'") + '\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div>';
            html += '</div>';
        });
        html += '</div>';

        $('manage-content').innerHTML = html;
        $('manage-loading').style.display = 'none';
        $('manage-content').style.display = 'block';

    } catch (err) {
        console.error(err);
        $('manage-loading').innerHTML = '<span style="color:var(--danger);">Erreur : ' + err.message + '</span>';
    }
}

// Confirm delete flow
var pendingDelete = null;

function confirmDelete(section, key, value) {
    pendingDelete = { section: section, key: key, value: value };
    $('confirm-title').textContent = 'Supprimer cette entrée ?';
    $('confirm-msg').textContent = 'Voulez-vous supprimer "' + value + '" de la section ' + section + ' ? Cette action modifiera config.js.';
    $('confirm-delete').classList.add('active');
}

$('confirm-cancel').addEventListener('click', function() {
    $('confirm-delete').classList.remove('active');
    pendingDelete = null;
});

$('confirm-ok').addEventListener('click', async function() {
    $('confirm-delete').classList.remove('active');
    if (!pendingDelete) return;

    var section = pendingDelete.section;
    var key = pendingDelete.key;
    var value = pendingDelete.value;
    pendingDelete = null;

    try {
        showProgress('Suppression...', 'Mise à jour de config.js...', 40);

        // Re-fetch config to get latest SHA
        var configData = await ghAPI('/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/contents/' + CONFIG_PATH);
        var raw = configData.content.replace(/\n/g, '');
        var bytes = Uint8Array.from(atob(raw), function(c) { return c.charCodeAt(0); });
        var content = new TextDecoder('utf-8').decode(bytes);

        // Find the entry block and remove it
        // Strategy: find the key:"value" pattern, then expand to the full { ... } object
        var searchStr = key + ': "' + value + '"';
        var idx = content.indexOf(searchStr);
        if (idx === -1) {
            // Try with extra spaces
            searchStr = key + ':"' + value + '"';
            idx = content.indexOf(searchStr);
        }
        if (idx === -1) throw new Error('Entrée "' + value + '" non trouvée');

        // Walk backwards to find the opening {
        var start = idx;
        while (start > 0 && content[start] !== '{') start--;

        // Walk forwards to find the closing }
        var depth = 0;
        var end = start;
        while (end < content.length) {
            if (content[end] === '{') depth++;
            else if (content[end] === '}') { depth--; if (depth === 0) break; }
            end++;
        }

        // Include trailing comma and whitespace
        var afterEnd = end + 1;
        while (afterEnd < content.length && (content[afterEnd] === ',' || content[afterEnd] === ' ' || content[afterEnd] === '\n' || content[afterEnd] === '\r' || content[afterEnd] === '\t')) {
            afterEnd++;
            if (content[afterEnd - 1] === ',') break; // Stop after the comma
        }

        // Also check for leading comma
        var beforeStart = start;
        while (beforeStart > 0 && (content[beforeStart - 1] === ' ' || content[beforeStart - 1] === '\n' || content[beforeStart - 1] === '\r' || content[beforeStart - 1] === '\t')) {
            beforeStart--;
        }
        if (beforeStart > 0 && content[beforeStart - 1] === ',') {
            beforeStart--;
        }

        var newContent = content.substring(0, beforeStart) + content.substring(afterEnd);

        showProgress('Suppression...', 'Commit...', 75);
        var encoded = btoa(Array.from(new TextEncoder().encode(newContent), function(b) { return String.fromCharCode(b); }).join(''));
        await ghAPI('/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO + '/contents/' + CONFIG_PATH, {
            method: 'PUT',
            body: JSON.stringify({ message: '[admin] Suppression : ' + value, content: encoded, sha: configData.sha })
        });

        progressSuccess('"' + value + '" supprimé.');
        // Reload manage entries
        setTimeout(function() { loadManageEntries(); }, 1500);

    } catch (err) {
        console.error(err);
        progressError(err.message);
    }
});
