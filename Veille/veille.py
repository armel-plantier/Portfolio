import feedparser
from google import genai
import os
from datetime import datetime

# 1. Configuration du client Gemini
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

# 2. Lecture des sources depuis le fichier texte
chemin_flux = "veille/flux-rss.txt"
feeds = []

# On vérifie si le fichier flux-rss.txt existe bien
if os.path.exists(chemin_flux):
    with open(chemin_flux, "r", encoding="utf-8") as f:
        # On lit chaque ligne, on enlève les espaces, et on ignore les lignes vides
        feeds = [ligne.strip() for ligne in f if ligne.strip()]
else:
    print(f"Erreur : Le fichier {chemin_flux} n'existe pas.")
    exit(1)

# 3. Récupération des données brutes avec les dates
articles_bruts = []
for url in feeds:
    try:
        feed = feedparser.parse(url)
        # On prend les 10 derniers articles par flux
        for entry in feed.entries[:10]: 
            date_publi = entry.get('published', 'Date inconnue')
            articles_bruts.append(f"- Date: {date_publi}\n  Titre: {entry.title}\n  Lien: {entry.link}\n  Résumé: {entry.description}\n")
    except Exception as e:
        print(f"Erreur lors de la lecture du flux {url} : {e}")

# Si aucun article n'a été trouvé, on arrête le script
if not articles_bruts:
    print("Aucun article trouvé dans les flux.")
    exit(1)

contenu_brut = "\n".join(articles_bruts)
date_jour = datetime.now().strftime("%d/%m/%Y")

# 4. Le Prompt Cyber
prompt = f"""
Tu es un expert en cybersécurité (SOC Analyst/Pentester). Nous sommes le {date_jour}.
Voici les dernières alertes et actualités brutes extraites de flux RSS.

RÈGLES ABSOLUES :
1. Rédige un résumé de veille technologique hebdomadaire clair et structuré en Markdown.
2. N'INVENTE AUCUNE INFORMATION. Base-toi UNIQUEMENT sur le texte brut fourni ci-dessous.
3. Ne fais pas référence à des événements passés (comme 2023 ou 2024) sauf si c'est explicitement écrit dans le résumé brut.
4. Sors les numéros de CVE en gras si tu les trouves.
5. Mets les liens cliquables vers les sources.
6. Classe les infos par catégories pertinentes (ex: Vulnérabilités, Acteurs de la menace, Outils).

Voici les données brutes à traiter :
{contenu_brut}
"""

# 5. Appel à l'IA
print("Génération de la veille par Gemini en cours...")
response = client.models.generate_content(
    model='gemini-2.5-flash',
    contents=prompt
)

# 6. Écriture du fichier Markdown DANS LE DOSSIER
en_tete = f"---\ntitle: Veille Cyber du {date_jour}\n---\n\n# 🛡️ Veille Cyber Hebdomadaire\n\n"

os.makedirs("veille", exist_ok=True)

# On sauvegarde le fichier sous le nom index.md
chemin_fichier = "veille/index.md"
with open(chemin_fichier, "w", encoding="utf-8") as f:
    f.write(en_tete + response.text)

print(f"Fichier {chemin_fichier} généré avec succès !")
