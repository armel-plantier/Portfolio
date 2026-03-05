import feedparser
from groq import Groq
import os
from datetime import datetime, timedelta
import markdown
import requests

# 1. Configuration Groq
# On récupère la clé API Groq depuis les variables d'environnement
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

# 3. Récupération des articles
articles_bruts = []
for url in feeds:
    try:
        feed = feedparser.parse(url)
        for entry in feed.entries[:30]: 
            date_publi = entry.get('published', 'Date inconnue')
            articles_bruts.append(f"- Date: {date_publi}\n  Titre: {entry.title}\n  Lien: {entry.link}\n  Résumé: {entry.description}\n")
    except Exception as e:
        print(f"Erreur avec le flux {url} : {e}")

if not articles_bruts:
    print("Aucun article trouvé.")
    exit(1)

contenu_brut = "\n".join(articles_bruts)

# --- CALCUL DES DATES DE LA SEMAINE ---
maintenant = datetime.now()
jours_depuis_lundi = maintenant.weekday() 
date_lundi = maintenant - timedelta(days=jours_depuis_lundi)

str_aujourdhui = maintenant.strftime("%d/%m/%Y")
str_lundi = date_lundi.strftime("%d/%m/%Y")
# --------------------------------------

# 4. Le Prompt Cyber (Mode TIMELINE)
prompt = f"""
Tu es un expert en cybersécurité. Nous sommes le {str_aujourdhui}.
Ton objectif est de créer un résumé de la semaine en cours, structuré JOUR PAR JOUR.
Tu dois analyser les articles fournis et NE GARDER STRICTEMENT QUE CEUX publiés entre le lundi {str_lundi} et aujourd'hui {str_aujourdhui}. Ignore les événements datant d'avant le {str_lundi}.

RÈGLES STRICTES DE FORMATAGE :
1. AUCUNE INTRODUCTION NI CONCLUSION. Commence directement par le premier jour.
2. Structure ton résumé de chronologique (du plus récent au plus ancien).
3. Utilise un Titre 2 (##) EXCLUSIVEMENT pour chaque JOUR (ex: ## Lundi 2 Mars).
4. SOUS chaque jour, utilise un Titre 3 (###) pour les CATÉGORIES.
5. Ne garde que les infos les plus importantes. Sors les numéros de CVE en gras.
6. RÈGLE ABSOLUE POUR LES LIENS : À la fin de chaque explication d'article, tu dois OBLIGATOIREMENT intégrer ce code HTML exact pour faire le bouton (remplace juste l'URL) :
<a href="URL_DE_L_ARTICLE" class="btn-source" target="_blank">🔗 Lire la source</a>

Voici les données brutes à filtrer et organiser :
{contenu_brut}
"""

# 5. Appel à l'IA Groq
print(f"Génération du journal du {str_lundi} au {str_aujourdhui} via Groq...")
try:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",  # 👈 C'est cette ligne qu'il faut changer !
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.3 # Température basse pour rester factuel
    )
    reponse_texte = response.choices[0].message.content
except Exception as e:
    print(f"Erreur lors de l'appel à l'API Groq : {e}")
    exit(1)

# 6. CONVERSION ET CRÉATION DE LA PAGE HTML
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
        .veille-content h2 {{ color: var(--primary); margin-top: 40px; margin-bottom: 20px; font-family: 'Outfit', sans-serif; border-bottom: 2px solid var(--border); padding-bottom: 10px; font-size: 1.8rem; }}
        .veille-content h3 {{ color: var(--text); margin-top: 25px; margin-bottom: 15px; font-family: 'Outfit', sans-serif; font-size: 1.3rem; border-left: 3px solid var(--primary); padding-left: 10px; }}
        .veille-content p {{ margin-bottom: 15px; line-height: 1.6; color: var(--muted); }}
        .veille-content ul {{ margin-bottom: 25px; padding-left: 20px; color: var(--muted); }}
        .veille-content li {{ margin-bottom: 15px; line-height: 1.6; }}
        
        /* --- LE CSS DU VRAI BOUTON (ORDONNÉ) --- */
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
            margin-top: 12px;
            margin-bottom: 25px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }}
        .btn-source:hover {{
            transform: translateY(-3px); 
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4); 
            text-decoration: none;
        }}
        /* ----------------------------- */
        
        .veille-content strong {{ color: var(--text); }}
        .veille-content a:not(.btn-source) {{ color: var(--primary); text-decoration: none; font-weight: 500; }}
        .veille-content a:not(.btn-source):hover {{ text-decoration: underline; }}
    </style>
</head>
<body style="background: var(--bg);">
    <div class="container" style="padding-top: 40px; padding-bottom: 60px;">
        <a href="/" class="btn-home" style="display: inline-block; margin-bottom: 40px;">
            ↩ Retour au Portfolio
        </a>
        
        <h1 class="hero-title" style="text-align: left; margin-bottom: 40px;">🛡️ Journal de Veille : du {str_lundi} au {str_aujourdhui}</h1>
        
        <div class="veille-content" style="background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 40px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
            {contenu_html}
        </div>
    </div>
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
    
    # ⚠️ PARAMÈTRES À MODIFIER ICI ⚠️
    LIST_ID = 2  # L'ID de ta liste de contacts sur Brevo
    SENDER_EMAIL = "newsletter@armel-plantier.com" # Ton email expéditeur validé sur Brevo

    url_campaign = "https://api.brevo.com/v3/emailCampaigns"
    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json"
    }
    
    # Le design de l'email
    mail_html = f"""
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 10px; border-top: 5px solid #6366f1;">
            <h2 style="color: #6366f1; border-bottom: 2px solid #eee; padding-bottom: 10px;">🛡️ Ta Veille Cyber de la semaine</h2>
            <p>Voici les dernières actualités du <strong>{str_lundi}</strong> au <strong>{str_aujourdhui}</strong> :</p>
            
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

    # Création de la campagne
    response_create = requests.post(url_campaign, json=payload, headers=headers)
    
    if response_create.status_code == 201:
        campaign_id = response_create.json().get("id")
        print(f"Campagne {campaign_id} créée. Envoi en cours...")
        
        # Envoi immédiat
        url_send = f"https://api.brevo.com/v3/emailCampaigns/{campaign_id}/sendNow"
        response_send = requests.post(url_send, headers=headers)
        
        if response_send.status_code == 204:
            print("✅ Newsletter envoyée avec succès à tous les abonnés !")
        else:
            print(f"Erreur lors de l'envoi : {response_send.text}")
    else:
        print(f"Erreur lors de la création de la campagne : {response_create.text}")
else:
    print("⚠️ Pas de clé BREVO trouvée. L'action GitHub ne l'a pas transmise ou elle n'est pas configurée dans les secrets.")
