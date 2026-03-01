import feedparser
from google import genai
import os
from datetime import datetime, timedelta
import markdown

# 1. Configuration
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

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

# 4. Le Prompt Cyber (L'IA va maintenant générer un vrai bouton HTML)
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

# 5. Appel à l'IA
print(f"Génération du journal du {str_lundi} au {str_aujourdhui}...")
response = client.models.generate_content(
    model='gemini-2.5-flash',
    contents=prompt
)

# 6. CONVERSION ET CRÉATION DE LA PAGE HTML
contenu_html = markdown.markdown(response.text)

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
        .veille-content h3 {{ color: var(--text); margin-top: 20px; margin-bottom: 10px; font-family: 'Outfit', sans-serif; font-size: 1.3rem; border-left: 3px solid var(--primary); padding-left: 10px; }}
        .veille-content p {{ margin-bottom: 15px; line-height: 1.6; color: var(--muted); }}
        .veille-content ul {{ margin-bottom: 25px; padding-left: 20px; color: var(--muted); }}
        .veille-content li {{ margin-bottom: 15px; line-height: 1.6; }}
        
        /* --- LE CSS DU VRAI BOUTON --- */
        .btn-source {{
            display: inline-block;
            background-color: var(--primary); /* La même couleur que ton thème */
            color: #ffffff !important; /* Texte en blanc pour le contraste */
            padding: 6px 16px;
            border-radius: 30px; /* Forme pilule comme ton bouton Retour */
            font-size: 0.85em;
            font-weight: 600;
            text-decoration: none;
            margin-top: 8px;
            margin-left: 5px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }}
        .btn-source:hover {{
            transform: translateY(-3px); /* Effet de soulèvement */
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4); /* Ombre violette stylée */
            text-decoration: none;
        }}
        /* ----------------------------- */
        
        .veille-content strong {{ color: var(--text); }}
        /* Pour s'assurer que si l'IA génère d'autres liens dans le texte (comme des CVE), ils restent normaux */
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

print(f"Fichier {chemin_fichier} généré avec succès !")
