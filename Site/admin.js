// ============================================================================
// CONFIG
// ============================================================================
const GITHUB_OWNER = 'armel-plantier';
const GITHUB_REPO  = 'Portfolio';
const ALLOWED_USER = 'armel-plantier';
const PROC_DIR     = 'Documents/Procédures';
const PROJ_DIR     = 'Documents/Projet';
const CONFIG_PATH  = 'Site/config.js';

// Available icons (SVG strings)
const ICON_LIBRARY = [
    { name: 'Serveur', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>' },
    { name: 'Réseau', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18M12 8v4M6.5 12v4M17.5 12v4"/><rect x="8.5" y="3" width="7" height="5" rx="1"/><rect x="14" y="16" width="7" height="5" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>' },
    { name: 'Terminal', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>' },
    { name: 'Cadenas', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>' },
    { name: 'Bouclier', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
    { name: 'Bouclier OK', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>' },
    { name: 'Globe', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
    { name: 'Base de données', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>' },
    { name: 'Utilisateurs', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { name: 'Document', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>' },
    { name: 'Ecran', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>' },
    { name: 'Alerte', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
    { name: 'Dossier', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>' },
    { name: 'Clé', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>' },
    { name: 'Upload', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>' },
    { name: 'Monitoring', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' },
    { name: 'Couches', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="4" rx="1"/><rect x="2" y="10" width="20" height="4" rx="1"/><rect x="2" y="18" width="20" height="4" rx="1"/></svg>' },
    { name: 'Interdit', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14"/></svg>' },
    { name: 'Flux', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>' },
    { name: 'Carte', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>' },
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
        
        // Vérification : seul le propriétaire peut accéder
        if (user.login.toLowerCase() !== ALLOWED_USER.toLowerCase()) {
            throw new Error('Accès refusé : ce compte n\'est pas autorisé.');
        }

        // Vérifier l'accès au repo
        await ghAPI(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}`);

        ghUser = user.login;
        sessionStorage.setItem('gh_pat', token);
        $('session-user').textContent = ghUser;
        $('lock-screen').style.display = 'none';
        $('admin-panel').style.display = 'block';

    } catch (err) {
        ghToken = null;
        $('lock-error-text').textContent = err.message;
        $('lock-error').style.display = 'flex';
    } finally {
        $('login-btn').textContent = 'Se connecter';
        $('login-btn').disabled = false;
    }
}

// Auto-login from sessionStorage
(function() {
    const stored = sessionStorage.getItem('gh_pat');
    if (stored) {
        $('pat-input').value = stored;
        doLogin();
    }
})();

// Logout
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
// ICON GRIDS
// ============================================================================
function renderIconGrid(containerId, onSelect) {
    const grid = $(containerId);
    ICON_LIBRARY.forEach((icon, i) => {
        const div = document.createElement('div');
        div.className = 'icon-option' + (i === 0 ? ' selected' : '');
        div.innerHTML = icon.svg;
        div.title = icon.name;
        div.addEventListener('click', () => {
            grid.querySelectorAll('.icon-option').forEach(o => o.classList.remove('selected'));
            div.classList.add('selected');
            onSelect(i);
        });
        grid.appendChild(div);
    });
}
renderIconGrid('proc-icons', i => { selectedProcIcon = i; updatePreview('proc'); });
renderIconGrid('proj-icons', i => { selectedProjIcon = i; updatePreview('proj'); });

// ============================================================================
// TAGS
// ============================================================================
function setupTags(containerId, set, onChange) {
    $(containerId).querySelectorAll('.tag-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const tag = chip.dataset.tag;
            if (set.has(tag)) { set.delete(tag); chip.classList.remove('selected'); }
            else { set.add(tag); chip.classList.add('selected'); }
            onChange();
        });
    });
}
setupTags('proc-tags', selectedProcTags, () => { validateForm('proc'); updatePreview('proc'); });
setupTags('proj-tags', selectedProjTags, () => { validateForm('proj'); updatePreview('proj'); });

// ============================================================================
// FILE UPLOAD
// ============================================================================
function setupUpload(zoneId, inputId, onFile) {
    const zone = $(zoneId);
    const input = $(inputId);

    zone.addEventListener('click', () => input.click());
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', e => {
        e.preventDefault(); zone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') onFile(file);
        else toast('Fichier PDF requis', 'error');
    });
    input.addEventListener('change', () => {
        if (input.files[0]) onFile(input.files[0]);
    });
}

function setUploadState(zoneId, file) {
    const zone = $(zoneId);
    if (file) {
        zone.classList.add('has-file');
        const sizeMB = (file.size / 1024 / 1024).toFixed(1);
        zone.querySelector('p').innerHTML = `<strong>${file.name}</strong> (${sizeMB} Mo)`;
    } else {
        zone.classList.remove('has-file');
        zone.querySelector('p').innerHTML = '<span class="browse">Parcourir</span> ou glisser-déposer';
    }
}

setupUpload('proc-upload', 'proc-file', f => {
    procFile = f; setUploadState('proc-upload', f); validateForm('proc'); updatePreview('proc');
});
setupUpload('proj-upload', 'proj-file', f => {
    projFile = f; setUploadState('proj-upload', f); validateForm('proj'); updatePreview('proj');
});

// ============================================================================
// VALIDATION & PREVIEW
// ============================================================================
['proc-title', 'proc-desc'].forEach(id => $(id).addEventListener('input', () => { validateForm('proc'); updatePreview('proc'); }));
['proj-title', 'proj-desc'].forEach(id => $(id).addEventListener('input', () => { validateForm('proj'); updatePreview('proj'); }));

function validateForm(type) {
    const title = $(type + '-title').value.trim();
    const tags = type === 'proc' ? selectedProcTags : selectedProjTags;
    const file = type === 'proc' ? procFile : projFile;
    const btn = $(type + '-submit');
    btn.disabled = !(title && tags.size > 0 && file);
}

function updatePreview(type) {
    const title = $(type + '-title').value.trim();
    const desc = $(type + '-desc').value.trim();
    const tags = type === 'proc' ? selectedProcTags : selectedProjTags;
    const iconIdx = type === 'proc' ? selectedProcIcon : selectedProjIcon;
    const file = type === 'proc' ? procFile : projFile;
    const container = $(type + '-preview');
    const content = $(type + '-preview-content');

    if (!title) { container.style.display = 'none'; return; }
    container.style.display = '';

    const tagsHTML = [...tags].map(t => `<span>${t}</span>`).join('');
    content.innerHTML = `
        <div class="p-icon">${ICON_LIBRARY[iconIdx].svg}</div>
        <div class="p-meta">
            <h4>${title}</h4>
            <p>${desc || 'Aucune description'}</p>
            ${file ? `<p style="color:var(--success);font-size:0.75rem;margin-top:4px;">📎 ${file.name}</p>` : ''}
            <div class="preview-tags">${tagsHTML}</div>
        </div>
    `;
}

// ============================================================================
// RESET
// ============================================================================
function resetForm(type) {
    $(type + '-title').value = '';
    $(type + '-desc').value = '';
    (type === 'proc' ? selectedProcTags : selectedProjTags).clear();
    $(type + '-tags').querySelectorAll('.tag-chip').forEach(c => c.classList.remove('selected'));
    if (type === 'proc') { procFile = null; selectedProcIcon = 0; }
    else { projFile = null; selectedProjIcon = 0; }
    setUploadState(type + '-upload', null);
    $(type + '-icons').querySelectorAll('.icon-option').forEach((o,i) => {
        o.classList.toggle('selected', i === 0);
    });
    $(type + '-preview').style.display = 'none';
    validateForm(type);
}
$('proc-reset').addEventListener('click', () => resetForm('proc'));
$('proj-reset').addEventListener('click', () => resetForm('proj'));

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
function hideProgress() {
    $('progress').classList.remove('active');
}
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
    const title = $(type + '-title').value.trim();
    const desc = $(type + '-desc').value.trim();
    const tags = [...(type === 'proc' ? selectedProcTags : selectedProjTags)];
    const iconIdx = type === 'proc' ? selectedProcIcon : selectedProjIcon;
    const file = type === 'proc' ? procFile : projFile;
    const dir = type === 'proc' ? PROC_DIR : PROJ_DIR;
    const section = type === 'proc' ? 'procedures' : 'projects';

    try {
        // --- STEP 1: Upload PDF ---
        showProgress('Publication en cours...', 'Upload du PDF vers GitHub...', 20);
        const b64 = await fileToBase64(file);
        const pdfPath = `${dir}/${file.name}`;

        await ghAPI(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodeURIComponent(pdfPath)}`, {
            method: 'PUT',
            body: JSON.stringify({
                message: `[admin] Ajout ${type === 'proc' ? 'procédure' : 'projet'} : ${title}`,
                content: b64
            })
        });

        // --- STEP 2: Update config.js ---
        showProgress('Publication en cours...', 'Mise à jour de config.js...', 60);

        // Fetch current config.js
        const configData = await ghAPI(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONFIG_PATH}`);
        const currentContent = atob(configData.content.replace(/\n/g, ''));

        // Build the new entry
        const iconSvg = escapeForJS(ICON_LIBRARY[iconIdx].svg);
        const entry = `{
    title: "${escapeForJS(title)}",
    longDescription: "${escapeForJS(desc)}",
    path: "${escapeForJS(file.name)}",
    icon: \`${iconSvg}\`,
    tags: [${tags.map(t => `"${escapeForJS(t)}"`).join(', ')}]
}`;

        // Find the section array and append the entry
        const sectionRegex = new RegExp(`(${section}:\\s*\\[)([\\s\\S]*?)(\\])`);
        const match = currentContent.match(sectionRegex);
        if (!match) throw new Error(`Section "${section}" non trouvée dans config.js`);

        const existingEntries = match[2].trim();
        const separator = existingEntries.endsWith(',') || existingEntries === '' ? '\n' : ',\n';
        const newContent = currentContent.replace(sectionRegex,
            `${match[1]}${match[2]}${existingEntries ? separator : '\n'}${entry}\n${match[3]}`
        );

        showProgress('Publication en cours...', 'Commit de config.js...', 85);

        await ghAPI(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONFIG_PATH}`, {
            method: 'PUT',
            body: JSON.stringify({
                message: `[admin] config.js : ajout ${title}`,
                content: btoa(unescape(encodeURIComponent(newContent))),
                sha: configData.sha
            })
        });

        showProgress('Publication en cours...', 'Déploiement GitHub Pages...', 100);
        progressSuccess(`"${title}" sera en ligne dans ~1 min (GitHub Pages rebuild).`);
        resetForm(type);

    } catch (err) {
        console.error(err);
        progressError(err.message);
    }
}

$('proc-submit').addEventListener('click', () => publish('proc'));
$('proj-submit').addEventListener('click', () => publish('proj'));
