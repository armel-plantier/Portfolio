import feedparser
from google import genai
import os
from datetime import datetime
import markdown

# 1. Configuration
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

# 2. Lecture des flux depuis le fichier texte
chemin_flux = "Veille/flux-rss.txt"
feeds = []
if os.path.exists(chemin_flux):
    with open(chemin_flux, "r", encoding="utf-8") as f:
        feeds = [ligne.strip() for ligne in f if ligne.strip()]
else:
    print(f"Erreur : {chemin_flux} introuvable.")
    exit(1)

# 3. Récupération des articles (On prend les 20 derniers pour avoir toute la semaine)
articles_bruts = []
for url in feeds:
    try:
        feed = feedparser.parse(url)
        for entry in feed.entries[:20]: 
            date_publi = entry.get('published', 'Date inconnue')
            articles_bruts.append(f"- Date: {date_publi}\n  Titre: {entry.title}\n  Lien: {entry.link}\n  Résumé: {entry.description}\n")
    except Exception as e:
        print(f"Erreur avec le flux {url} : {e}")

if not articles_bruts:
    print("Aucun article trouvé.")
    exit(1)

contenu_brut = "\n".join(articles_bruts)
date_jour = datetime.now().strftime("%d/%m/%Y")

# 4. Le Prompt Cyber (Mode "Semaine" et strict sur le formatage)
prompt = f"""
Tu es un expert en cybersécurité. Nous sommes le {date_jour}.
Rédige un récapitulatif structuré et professionnel des événements majeurs de la semaine écoulée en cybersécurité.

RÈGLES STRICTES ABSOLUES :
1. AUCUNE INTRODUCTION NI CONCLUSION. Ne dis pas "Voici le résumé", commence directement par les informations.
2. AUCUN TITRE PRINCIPAL (#). Commence directement par des sous-titres (##) pour tes catégories (ex: ## Vulnérabilités Critiques).
3. Ne traite que les informations les plus critiques ou marquantes de la semaine.
4. Base-toi UNIQUEMENT sur le texte fourni.
5. Sors les numéros de CVE en gras.
6. Mets les liens cliquables.

Voici les données brutes de la semaine à traiter :
{contenu_brut}
"""

# 5. Appel à l'IA
print("Génération du résumé hebdomadaire en cours...")
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
    <title>Veille Hebdomadaire | Armel Plantier</title>
    <link rel="stylesheet" href="/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@500;700;800&display=swap" rel="stylesheet">
    <style>
        .veille-content h2 {{ color: var(--primary); margin-top: 35px; margin-bottom: 15px; font-family: 'Outfit', sans-serif; }}
        .veille-content h3 {{ color: var(--text); margin-top: 25px; margin-bottom: 10px; font-family: 'Outfit', sans-serif; }}
        .veille-content p {{ margin-bottom: 15px; line-height: 1.6; color: var(--muted); }}
        .veille-content ul {{ margin-bottom: 25px; padding-left: 20px; color: var(--muted); }}
        .veille-content li {{ margin-bottom: 10px; line-height: 1.5; }}
        .veille-content a {{ color: var(--primary); text-decoration: none; font-weight: 500; }}
        .veille-content a:hover {{ text-decoration: underline; }}
        .veille-content strong {{ color: var(--text); }}
    </style>
</head>
<body style="background: var(--bg);">
    <div class="container" style="padding-top: 40px; padding-bottom: 60px;">
        <a href="/" class="btn-home" style="display: inline-block; margin-bottom: 40px;">
            ↩ Retour au Portfolio
        </a>
        
        <h1 class="hero-title" style="text-align: left; margin-bottom: 40px;">🛡️ Veille Cyber - Semaine du {date_jour}</h1>
        
        <div class="veille-content" style="background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 40px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
            {contenu_html}
        </div>
    </div>
</body>
</html>
"""

os.makedirs("Veille", exist_ok=True)

# Sauvegarde
chemin_fichier = "Veille/index.html"
with open(chemin_fichier, "w", encoding="utf-8") as f:
    f.write(page_html)

print(f"Fichier {chemin_fichier} généré avec succès !")
