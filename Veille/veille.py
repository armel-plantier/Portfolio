import feedparser
import google.generativeai as genai
import os
from datetime import datetime, timedelta
import markdown
import requests
import time 

# 1. Configuration Google Gemini
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")

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

# --- MOTS-CLÉS POUR LES FUITES DE DONNÉES ---
mots_cles_fuites = [
    "fuite", "leak", "breach", "vol de", "exfiltration", 
    "dump", "données exposées", "compromission", "piratage",
    "base de données", "database", "hacked", "ransomware"
]
# --------------------------------------------

# 3. Récupération et filtrage STRICT des articles (Dates + Mots-clés)
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
                    titre = entry.title
                    
                    # FILTRE MOTS-CLÉS : On cherche dans le titre et le résumé (en minuscules)
                    texte_analyse = (titre + " " + resume).lower()
                    
                    if any(mot in texte_analyse for mot in mots_cles_fuites):
                        if len(resume) > 150:
                            resume = resume[:150] + "..."
                            
                        articles_bruts.append(f"- Date: {date_publi_str}\n  Source: {nom_site}\n  Titre: {titre}\n  Lien: {entry.link}\n  Résumé: {resume}\n")
    except Exception as e:
        print(f"Erreur avec le flux {url} : {e}")

if not articles_bruts:
    print("Aucune fuite de données trouvée cette semaine. Arrêt du script.")
    exit(0)

MAX_ARTICLES = 70
if len(articles_bruts) > MAX_ARTICLES:
    print(f"Trop d'articles ({len(articles_bruts)}). Réduction aux {MAX_ARTICLES} premiers pour respecter les quotas.")
    articles_bruts = articles_bruts[:MAX_ARTICLES]

contenu_brut = "\n".join(articles_bruts)
print(f"Nombre d'articles (orientés fuites) envoyés à l'IA : {len(articles_bruts)}")

# 4. Le Prompt Cyber (Spécialisé FUITES DE DONNÉES + Structure HTML Forcée)
prompt = f"""
Tu es un analyste en Threat Intelligence spécialisé dans les fuites de données (Data Breaches). Nous sommes le {str_aujourdhui}.
Ton objectif est de créer un bulletin d'alerte recensant UNIQUEMENT les fuites de données, vols d'informations ou attaques par ransomware ayant entraîné une compromission, entre le {str_lundi} et aujourd'hui.

RÈGLES STRICTES DE FORMATAGE (À RESPECTER IMPÉRATIVEMENT SOUS PEINE D'ERREUR) :
1. AUCUNE INTRODUCTION NI CONCLUSION. Commence directement.
2. Utilise un Titre 2 (##) EXCLUSIVEMENT pour chaque JOUR où des fuites ont eu lieu (ex: ## Lundi 2 Mars).
3. SOUS chaque jour, utilise un Titre 3 (###) pour les NOMS DES ENTITÉS TOUCHÉES (entreprises, hôpitaux, etc.).
4. POUR CHAQUE INCIDENT, tu DOIS obligatoirement générer ce bloc HTML exact (ne fais aucun paragraphe classique en dehors de ce bloc) :

<div class="article-box">
<p><strong>Détails de l'incident</strong> : Ton paragraphe explicatif ici (type de données, ampleur, groupe de hackers si connu).</p>
<a href="URL_DE_L_ARTICLE" class="btn-source" target="_blank">🔗 Lire sur NOM_DE_LA_SOURCE</a>
</div>

Voici les données pré-filtrées à analyser et organiser :
{contenu_brut}
"""

# 5. Appel à l'IA Gemini
print(f"Génération du bulletin Data Leaks du {str_lundi} au {str_aujourdhui} via Gemini...")
try:
    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(temperature=0.3)
    )
    reponse_texte = response.text
except Exception as e:
    print(f"Erreur lors de l'appel à l'API Gemini : {e}")
    exit(1)

# 6. CONVERSION ET CRÉATION DE LA PAGE HTML (Statique, sans JS)
contenu_html = markdown.markdown(reponse_texte)

page_html = f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alerte Data Leaks | Du {str_lundi} au {str_aujourdhui}</title>
    
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23151925%22/><text x=%2250%22 y=%2265%22 font-family=%22Arial, sans-serif%22 font-weight=%22bold%22 font-size=%2250%22 text-anchor=%22middle%22 fill=%22%23ef4444%22>DL</text></svg>">
    
    <link rel="stylesheet" href="/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@500;700;800&display=swap" rel="stylesheet">
    <style>
        .veille-content h2 {{ color: #ef4444; margin-top: 40px; margin-bottom: 20px; font-family: 'Outfit', sans-serif; border-bottom: 2px solid var(--border); padding-bottom: 10px; font-size: 1.8rem; }}
        .veille-content h3 {{ color: var(--text); margin-top: 25px; margin-bottom: 15px; font-family: 'Outfit', sans-serif; font-size: 1.3rem; border-left: 3px solid #ef4444; padding-left: 10px; }}
        
        /* DESIGN DES ARTICLES (Mode Alerte Rouge) */
        .article-box {{
            background: rgba(239, 68, 68, 0.05); /* Fond légèrement rouge */
            border-left: 4px solid #ef4444;
            padding: 15px 20px;
            margin-bottom: 20px;
            border-radius: 0 8px 8px 0;
        }}
        .article-box p {{
            margin-top: 0;
            margin-bottom: 15px;
            line-height: 1.6;
            color: var(--muted);
        }}
        
        .btn-source {{
            display: inline-block; 
            background-color: #ef4444; 
            color: #ffffff !important; 
            padding: 6px 16px;
            border-radius: 30px; 
            font-size: 0.85em;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
        }}
        .btn-source:hover {{ transform: translateY(-3px); box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4); text-decoration: none; }}
        
        .veille-content strong {{ color: var(--text); }}
        .veille-content a:not(.btn-source) {{ color: #ef4444; text-decoration: none; font-weight: 500; }}
        .veille-content a:not(.btn-source):hover {{ text-decoration: underline; }}
    </style>
</head>
<body style="background: var(--bg);">
    <div class="container" style="padding-top: 40px; padding-bottom: 60px;">
        <a href="/" class="btn-home" style="display: inline-block; margin-bottom: 40px;">
            ↩ Retour au Portfolio
        </a>
        
        <h1 class="hero-title" style="text-align: left; margin-bottom: 30px;">🚨 Alerte Data Leaks : du {str_lundi} au {str_aujourdhui}</h1>
        
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
        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 10px; border-top: 5px solid #ef4444;">
            <h2 style="color: #ef4444; border-bottom: 2px solid #eee; padding-bottom: 10px;">🚨 Alerte Data Leaks de la semaine</h2>
            <p>Voici les dernières fuites de données recensées du <strong>{str_lundi}</strong> au <strong>{str_aujourdhui}</strong> :</p>
            
            {contenu_html}
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="text-align: center; font-size: 12px; color: #888;">
                Généré automatiquement par le Portfolio de <a href="https://armel-plantier.com" style="color: #ef4444;">Armel Plantier</a>.<br>
                <a href="{{{{ unsubscribe }}}}" style="color: #888; text-decoration: underline;">Se désabonner</a>
            </p>
        </div>
    </body>
    </html>
    """

    payload = {
        "name": f"Alerte Data Leaks - {str_aujourdhui}",
        "subject": f"🚨 Alerte Data Leaks ({str_lundi} - {str_aujourdhui})",
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
