import feedparser
from google import genai
import os
from datetime import datetime

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

# 4. Le Prompt Cyber
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

# 5. Appel à l'IA
print("Génération en cours...")
response = client.models.generate_content(
    model='gemini-2.5-flash',
    contents=prompt
)

# 6. INJECTION DU DESIGN DU PORTFOLIO
# On ajoute les liens vers tes polices et ton style.css, et on utilise tes classes CSS.
en_tete = f"""---
title: Veille Cyber du {date_jour}
---
<link rel="stylesheet" href="/style.css">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@500;700;800&display=swap" rel="stylesheet">

<div class="container" style="padding-top: 40px;" markdown="1">

<a href="/" class="btn-home" style="display: inline-block; margin-bottom: 40px;">
    ↩ Retour au Portfolio
</a>

<h1 class="hero-title" style="text-align: left; margin-bottom: 40px;">🛡️ Veille Cyber du {date_jour}</h1>

"""

pied_de_page = "\n</div>\n"

# Écriture du fichier
os.makedirs("Veille", exist_ok=True)
chemin_fichier = "Veille/index.md"
with open(chemin_fichier, "w", encoding="utf-8") as f:
    f.write(en_tete + response.text + pied_de_page)

print(f"Fichier {chemin_fichier} généré avec succès !")
