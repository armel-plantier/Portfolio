import feedparser
from google import genai
import os
from datetime import datetime
import markdown # NOUVEAU : Le convertisseur magique

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

# 3. Récupération
articles_bruts = []
for url in feeds:
    try:
        feed = feedparser.parse(url)
        for entry in feed.entries[:10]: 
            date_publi = entry.get('published', 'Date inconnue')
            articles_bruts.append(f"- Date: {date_publi}\n  Titre: {entry.title}\n  Lien: {entry.link}\n  Résumé: {entry.description}\n")
    except Exception as e:
        print(f"Erreur avec le flux {url} : {e}")

if not articles_bruts:
    print("Aucun article trouvé.")
    exit(1)

contenu_brut = "\n".join(articles_bruts)
date_jour = datetime.now().strftime("%d/%m/%Y")

# 4. Prompt
prompt = f"""
Tu es un expert en cybersécurité. Nous sommes le {date_jour}.
Rédige un résumé de veille technologique clair en Markdown.
RÈGLES :
1. N'invente rien. Base-toi UNIQUEMENT sur le texte fourni.
2. Sors les numéros de CVE en gras.
3. Mets les liens cliquables.
4. Classe les infos par catégories avec des sous-titres (##).
Voici les données :
{contenu_brut}
"""

# 5. Appel IA
print("Génération en cours...")
response = client.models.generate_content(
    model='gemini-2.5-flash',
    contents=prompt
)

# 6. CONVERSION ET CRÉATION DE LA PAGE HTML
# On transforme le texte de l'IA en code HTML pur
contenu_html = markdown.markdown(response.text)

# On fabrique la page finale avec ton design exact
page_html = f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Veille Cyber | Armel Plantier</title>
    <link rel="stylesheet" href="/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@500;700;800&display=swap" rel="stylesheet">
    <style>
        /* Ajustements pour que le texte de l'IA s'intègre parfaitement à ton style */
        .veille-content h2 {{ color: var(--primary); margin-top: 35px; margin-bottom: 15px; font-family: 'Outfit', sans-serif; }}
        .veille-content h3 {{ color: var(--text); margin-top: 25px; margin-bottom: 10px; font-family: 'Outfit', sans-serif; }}
        .veille-content p {{ margin-bottom: 15px; line-height: 1.6; color: var(--muted); }}
        .veille-content ul {{ margin-bottom: 25px; padding-left: 20px; color: var(--muted); }}
        .veille-content li {{ margin-bottom: 10px; }}
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
        
        <h1 class="hero-title" style="text-align: left; margin-bottom: 40px;">🛡️ Veille Cyber du {date_jour}</h1>
        
        <div class="veille-content" style="background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 40px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
            {contenu_html}
        </div>
    </div>
</body>
</html>
"""

os.makedirs("Veille", exist_ok=True)

# ON SAUVEGARDE DIRECTEMENT EN .HTML
chemin_fichier = "Veille/index.html"
with open(chemin_fichier, "w", encoding="utf-8") as f:
    f.write(page_html)

print(f"Fichier {chemin_fichier} généré avec succès !")
