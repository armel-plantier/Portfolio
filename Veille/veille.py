import feedparser
from groq import Groq
import os
from datetime import datetime, timedelta
import markdown
import requests
import time 

# 1. Configuration Groq
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# 2. Lecture des flux
chemin_flux = "Veille/flux-rss.txt"
feeds = []
if os.path.exists(chemin_flux):
    with open(chemin_flux, "r", encoding="utf-8") as f:
        feeds = [ligne.strip() for ligne in f if ligne.strip()]
else:
    print(f"Erreur : {chemin_flux} introuvable.")
    exit(1)

# --- CALCUL DES DATES DE LA SEMAINE ---
maintenant = datetime.now()
jours_depuis_lundi = maintenant.weekday() 
date_lundi = maintenant - timedelta(days=jours_depuis_lundi)
date_lundi_debut = date_lundi.replace(hour=0, minute=0, second=0, microsecond=0)

str_aujourdhui = maintenant.strftime("%d/%m/%Y")
str_lundi = date_lundi.strftime("%d/%m/%Y")
# --------------------------------------

# 3. Récupération des articles
articles_bruts = []
for url in feeds:
    try:
        feed = feedparser.parse(url)
        nom_site = feed.feed.get('title', 'Lien externe')
        
        for entry in feed.entries:
            if hasattr(entry, 'published_parsed') and entry.published_parsed:
                dt_publi = datetime.fromtimestamp(time.mktime(entry.published_parsed))
                
                if dt_publi >= date_lundi_debut:
                    date_publi_str = dt_publi.strftime("%d/%m/%Y")
                    resume = entry.get('description', '')
                    
                    if len(resume) > 150:
                        resume = resume[:150] + "..."
                        
                    articles_bruts.append(f"- Date: {date_publi_str}\n  Source: {nom_site}\n  Titre: {entry.title}\n  Lien: {entry.link}\n  Résumé: {resume}\n")
    except Exception as e:
        print(f"Erreur avec le flux {url} : {e}")

if not articles_bruts:
    print("Aucun article récent trouvé cette semaine. Arrêt du script.")
    exit(0)

MAX_ARTICLES = 70
if len(articles_bruts) > MAX_ARTICLES:
    print(f"Trop d'articles ({len(articles_bruts)}). Réduction aux {MAX_ARTICLES} premiers pour respecter les quotas.")
    articles_bruts = articles_bruts[:MAX_ARTICLES]

contenu_brut = "\n".join(articles_bruts)
print(f"Nombre d'articles envoyés à l'IA : {len(articles_bruts)}")

# 4. Le Prompt Cyber (Classification Stricte)
prompt = f"""
Tu es un expert en cybersécurité. Nous sommes le {str_aujourdhui}.
Ton objectif est de créer un résumé de la semaine en cours, structuré JOUR PAR JOUR, puis par CATÉGORIES.

RÈGLES STRICTES DE FORMATAGE (À RESPECTER IMPÉRATIVEMENT) :
1. AUCUNE INTRODUCTION NI CONCLUSION. Commence directement.
2. Utilise un Titre 2 (##) EXCLUSIVEMENT pour chaque JOUR (ex: ## Lundi 2 Mars).
3. SOUS chaque jour, tu dois CLASSER les articles en utilisant EXACTEMENT ces Titres 3 (###) :
   - ### Vulnérabilités (pour les CVE, failles, patchs)
   - ### Fuites de données (pour les leaks, ransomwares, piratages)
   - ### Actualités (pour le reste: IA, lois, rachats, etc.)
4. POUR CHAQUE ARTICLE, suis cette structure exacte :
   - Rédige un court paragraphe explicatif.
   - SAUTE UNE LIGNE.
   - Insère le bouton HTML : <a href="URL_DE_L_ARTICLE" class="btn-source" target="_blank">🔗 Lire sur NOM_DE_LA_SOURCE</a>
   - SAUTE DEUX LIGNES avant l'article suivant.

Voici les données à analyser et organiser :
{contenu_brut}
"""

# 5. Appel à l'IA Groq
print(f"Génération du journal du {str_lundi} au {str_aujourdhui} via Groq...")
try:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )
    reponse_texte = response.choices[0].message.content
except Exception as e:
    print(f"Erreur lors de l'appel à l'API Groq : {e}")
    exit(1)

# 6. CONVERSION ET CRÉATION DE LA PAGE HTML (Avec Menu JavaScript Corrigé)
contenu_html = markdown.markdown(reponse_texte)

page_html = f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Veille Cyber | Du {str_lundi} au {str_aujourdhui}</title>
    
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23151925%22/><text x=%2250%22 y=%2265%22 font-family=%22Arial, sans-serif%22 font-weight=%22bold%22 font-size=%2250%22 text-anchor=%22middle%22 fill=%22%236366f1%22>AP</text></svg>">
    
    <link rel="stylesheet" href="/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@500;700;800&display=swap" rel="stylesheet">
    <style>
        /* CSS DU MENU DE TRI */
        .filter-menu {{
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }}
        .filter-btn {{
            background: var(--card, #1e293b);
            color: var(--text, #f8fafc);
            border: 1px solid var(--border, #334155);
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
            transition: all 0.3s ease;
        }}
        .filter-btn:hover {{
            background: var(--border, #334155);
        }}
        .filter-btn.active {{
            background: var(--primary, #6366f1);
            color: white;
            border-color: var(--primary, #6366f1);
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }}

        .veille-content h2 {{ color: var(--primary); margin-top: 40px; margin-bottom: 20px; font-family: 'Outfit', sans-serif; border-bottom: 2px solid var(--border); padding-bottom: 10px; font-size: 1.8rem; }}
        .veille-content h3 {{ color: var(--text); margin-top: 25px; margin-bottom: 15px; font-family: 'Outfit', sans-serif; font-size: 1.3rem; border-left: 3px solid var(--primary); padding-left: 10px; }}
        .veille-content p {{ margin-bottom: 10px; line-height: 1.6; color: var(--muted); }}
        .veille-content ul {{ margin-bottom: 25px; padding-left: 20px; color: var(--muted); }}
        .veille-content li {{ margin-bottom: 15px; line-height: 1.6; }}
        
        .btn-source {{
            display: block; 
            width: fit-content;
            background-color: var(--primary); 
            color: #ffffff !important; 
            padding: 6px 16px;
            border-radius: 30px; 
            font-size: 0.85em;
            font-weight: 600;
            text-decoration: none;
            margin-top: 8px;
            margin-bottom: 35px; 
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }}
        .btn-source:hover {{ transform: translateY(-3px); box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4); text-decoration: none; }}
        .veille-content strong {{ color: var(--text); }}
        .veille-content a:not(.btn-source) {{ color: var(--primary); text-decoration: none; font-weight: 500; }}
    </style>
</head>
<body style="background: var(--bg);">
    <div class="container" style="padding-top: 40px; padding-bottom: 60px;">
        <a href="/" class="btn-home" style="display: inline-block; margin-bottom: 40px;">
            ↩ Retour au Portfolio
        </a>
        
        <h1 class="hero-title" style="text-align: left; margin-bottom: 30px;">🛡️ Journal de Veille : du {str_lundi} au {str_aujourdhui}</h1>
        
        <div class="filter-menu" id="filterMenu">
            <button class="filter-btn active" onclick="filterData('all', this)">Tout voir</button>
            <button class="filter-btn" onclick="filterData('vuln', this)">🔓 Vulnérabilités</button>
            <button class="filter-btn" onclick="filterData('leak', this)">🚨 Fuites de données</button>
            <button class="filter-btn" onclick="filterData('actu', this)">📰 Actualités</button>
        </div>

        <div class="veille-content" id="veilleContent" style="background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 40px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
            {contenu_html}
        </div>
    </div>

    <script>
        // On tague les éléments dès que la page est chargée
        document.addEventListener("DOMContentLoaded", function() {{
            const container = document.getElementById('veilleContent');
            if (!container) return;
            const elements = Array.from(container.children);
            let currentCategory = 'actu'; 
            
            elements.forEach(el => {{
                if (el.tagName.toLowerCase() === 'h3') {{
                    let text = el.innerText.toLowerCase();
                    if (text.includes('vuln')) currentCategory = 'vuln';
                    else if (text.includes('fuite') || text.includes('leak')) currentCategory = 'leak';
                    else if (text.includes('actu')) currentCategory = 'actu';
                    el.setAttribute('data-category', currentCategory);
                }} else if (el.tagName.toLowerCase() === 'h2') {{
                    el.setAttribute('data-category', 'date');
                }} else {{
                    el.setAttribute('data-category', currentCategory);
                }}
            }});
        }});

        function filterData(category, btnElement) {{
            // 1. Mise à jour visuelle des boutons
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            btnElement.classList.add('active');

            const container = document.getElementById('veilleContent');
            const elements = Array.from(container.children);

            // 2. Masquer/Afficher le contenu selon la catégorie
            elements.forEach(el => {{
                let cat = el.getAttribute('data-category');
                if (cat !== 'date') {{ // On ne touche pas aux dates (H2) ici
                    if (category === 'all' || cat === category) {{
                        el.style.display = '';
                    }} else {{
                        el.style.display = 'none';
                    }}
                }}
            }});

            // 3. Masquer/Afficher les dates (H2) si elles sont vides
            let currentH2 = null;
            let hasVisibleContent = false;
            
            for (let i = 0; i < elements.length; i++) {{
                let el = elements[i];
                if (el.tagName.toLowerCase() === 'h2') {{
                    if (currentH2) {{
                        currentH2.style.display = hasVisibleContent ? '' : 'none';
                    }}
                    currentH2 = el;
                    hasVisibleContent = false;
                }} else {{
                    if (el.style.display !== 'none') {{
                        hasVisibleContent = true;
                    }}
                }}
            }}
            // Vérifier la dernière date de la liste
            if (currentH2) {{
                currentH2.style.display = hasVisibleContent ? '' : 'none';
            }}
        }}
    </script>
</body>
</html>
"""

os.makedirs("Veille", exist_ok=True)
chemin_fichier = "Veille/index.html"
with open(chemin_fichier, "w", encoding="utf-8") as f:
    f.write(page_html)

print(f"Fichier HTML {chemin_fichier} généré avec succès !")


# --- 7. ENVOI DE LA NEWSLETTER VIA BREVO ---
BREVO_API_KEY = os.environ.get("BREVO_API_KEY")

if BREVO_API_KEY:
    print("Préparation de l'envoi de la newsletter...")
    
    LIST_ID = 2 
    SENDER_EMAIL = "newsletter@armel-plantier.com" 

    url_campaign = "https://api.brevo.com/v3/emailCampaigns"
    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json"
    }
    
    mail_html = f"""
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 10px; border-top: 5px solid #6366f1;">
            <h2 style="color: #6366f1; border-bottom: 2px solid #eee; padding-bottom: 10px;">🛡️ Ta Veille Cyber de la semaine</h2>
            <p>Voici les dernières actualités classées du <strong>{str_lundi}</strong> au <strong>{str_aujourdhui}</strong> :</p>
            
            {contenu_html}
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="text-align: center; font-size: 12px; color: #888;">
                Généré automatiquement par le Portfolio de <a href="https://armel-plantier.com" style="color: #6366f1;">Armel Plantier</a>.<br>
                <a href="{{{{ unsubscribe }}}}" style="color: #888; text-decoration: underline;">Se désabonner</a>
            </p>
        </div>
    </body>
    </html>
    """

    payload = {
        "name": f"Veille Cyber - {str_aujourdhui}",
        "subject": f"🛡️ Ta Veille Cyber ({str_lundi} - {str_aujourdhui})",
        "sender": {"name": "Armel Plantier", "email": SENDER_EMAIL},
        "htmlContent": mail_html,
        "recipients": {"listIds": [LIST_ID]}
    }

    response_create = requests.post(url_campaign, json=payload, headers=headers)
    
    if response_create.status_code == 201:
        campaign_id = response_create.json().get("id")
        print(f"Campagne {campaign_id} créée. Envoi en cours...")
        
        url_send = f"https://api.brevo.com/v3/emailCampaigns/{campaign_id}/sendNow"
        response_send = requests.post(url_send, headers=headers)
        
        if response_send.status_code == 204:
            print("✅ Newsletter envoyée avec succès à tous les abonnés !")
        else:
            print(f"Erreur lors de l'envoi : {response_send.text}")
    else:
        print(f"Erreur lors de la création de la campagne : {response_create.text}")
else:
    print("⚠️ Pas de clé BREVO trouvée.")
