import feedparser
from mistralai import Mistral
import os
from datetime import datetime, timedelta
import markdown
import requests
import time

# ==============================================================================
# 1. CONFIGURATION GÉNÉRALE
# ==============================================================================

client = Mistral(api_key=os.environ.get("MISTRAL_API_KEY"))

maintenant = datetime.now()
jours_depuis_lundi = maintenant.weekday()
date_lundi = maintenant - timedelta(days=jours_depuis_lundi)
date_lundi_debut = date_lundi.replace(hour=0, minute=0, second=0, microsecond=0)
str_aujourdhui = maintenant.strftime("%d/%m/%Y")
str_lundi = date_lundi.strftime("%d/%m/%Y")

MAX_ARTICLES = 60

# ==============================================================================
# 2. DÉFINITION DES 4 CATÉGORIES
# ==============================================================================

CATEGORIES = [
    {
        "id": "securite",
        "nom": "Sécurité",
        "emoji": "🛡️",
        "couleur": "#ef4444",
        "couleur_rgba": "239, 68, 68",
        "initiales": "SEC",
        "titre_page": "Exploits & Menaces",
        "sous_titre": "0-days, fuites de données, ransomwares et correctifs critiques",
        "dossier": "Veille/securite",
        "flux": [
            "https://www.cert.ssi.gouv.fr/avis/feed/",
            "https://www.cert.ssi.gouv.fr/alerte/feed/",
            "https://www.zataz.com/feed/",
            "https://www.bleepingcomputer.com/feed/",
            "https://feeds.feedburner.com/TheHackersNews",
            "https://www.darkreading.com/rss.xml",
            "https://www.securityweek.com/feed/",
            "https://www.cyberscoop.com/feed/",
            "https://krebsonsecurity.com/feed/",
            "https://securelist.com/feed/",
            "https://blog.talosintelligence.com/rss/",
            "https://unit42.paloaltonetworks.com/feed/",
            "https://www.cisa.gov/cybersecurity-advisories/all.xml",
            "https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss.xml",
            "https://msrc.microsoft.com/blog/feed/",
            "https://www.infosecurity-magazine.com/rss/news/",
        ],
        "mots_cles": [
            "exploit", "0-day", "zero-day", "cve", "vulnerability", "vulnérabilité",
            "fuite", "leak", "breach", "ransomware", "malware", "phishing",
            "hacked", "piratage", "backdoor", "injection", "patch", "correctif",
            "cyberattaque", "attack", "compromise", "données exposées", "alerte",
        ],
        "prompt_role": "un analyste en Threat Intelligence spécialisé en cybersécurité offensive et défensive",
        "prompt_consigne": (
            "Recense UNIQUEMENT les exploits, CVE critiques, fuites de données, "
            "ransomwares, malwares et correctifs de sécurité urgents de la semaine. "
            "Pour chaque incident, précise : le CVE si disponible, les systèmes affectés, "
            "le niveau de criticité et si un patch est disponible."
        ),
    },
    {
        "id": "techno",
        "nom": "Techno",
        "emoji": "💻",
        "couleur": "#6366f1",
        "couleur_rgba": "99, 102, 241",
        "initiales": "TECH",
        "titre_page": "Updates & Outils",
        "sous_titre": "Nouvelles releases, outils émergents et évolutions DevOps/Infra",
        "dossier": "Veille/techno",
        "flux": [
            "https://www.it-connect.fr/feed/",
            "https://www.lemagit.fr/rss/Securite.xml",
            "https://portswigger.net/daily-swig/rss",
            "https://www.schneier.com/feed/atom/",
            "https://msrc.microsoft.com/blog/feed/",
            "https://feeds.feedburner.com/TheHackersNews",
            "https://www.lemondeinformatique.fr/flux-rss/thematique/securite/rss.xml",
            "https://www.silicon.fr/feed",
            "https://www.journaldunet.com/feed/",
            "https://www.01net.com/rss/info/flux-toutes-les-actualites.xml",
            "https://linuxfr.org/news.atom",
            "https://www.phoronix.com/rss.php",
        ],
        "mots_cles": [
            "release", "update", "mise à jour", "version", "sortie",
            "outil", "tool", "framework", "library", "librairie",
            "kubernetes", "docker", "linux", "windows", "debian", "ubuntu",
            "devops", "infra", "cloud", "ansible", "terraform", "open source",
            "github", "api", "sdk", "plugin", "extension", "déploiement",
        ],
        "prompt_role": "un ingénieur DevOps et architecte systèmes passionné de veille technologique",
        "prompt_consigne": (
            "Recense les nouvelles versions logicielles importantes, les sorties d'outils, "
            "les évolutions majeures des stacks DevOps/Cloud/Infra et les projets open source "
            "notables de la semaine. Mets en avant l'intérêt pratique pour un administrateur système."
        ),
    },
    {
        "id": "legale",
        "nom": "Légale",
        "emoji": "⚖️",
        "couleur": "#eab308",
        "couleur_rgba": "234, 179, 8",
        "initiales": "LEG",
        "titre_page": "Lois & Compliance",
        "sous_titre": "Réglementation, RGPD, NIS2 et décisions des autorités de contrôle",
        "dossier": "Veille/legale",
        "flux": [
            "https://www.cnil.fr/fr/rss.xml",
            "https://www.cert.ssi.gouv.fr/avis/feed/",
            "https://www.legifrance.gouv.fr/contenu/pied-de-page/flux-rss",
            "https://www.village-justice.com/articles/rss.php",
            "https://www.dalloz-actualite.fr/rss.xml",
            "https://www.europe-politique.eu/rss.xml",
            "https://eur-lex.europa.eu/rss-feed.html",
            "https://www.cyberscoop.com/feed/",
            "https://www.securityweek.com/feed/",
        ],
        "mots_cles": [
            "rgpd", "gdpr", "cnil", "sanction", "amende", "compliance",
            "règlement", "directive", "loi", "décret", "arrêté",
            "nis2", "dora", "ai act", "ia act", "cyber resilience",
            "protection des données", "data protection", "autorité",
            "mise en demeure", "délibération", "jurisprudence",
        ],
        "prompt_role": "un juriste spécialisé en droit du numérique et en conformité RGPD/NIS2",
        "prompt_consigne": (
            "Recense les nouvelles lois, directives européennes, sanctions prononcées par la CNIL "
            "ou d'autres autorités, décisions de justice notables et évolutions réglementaires "
            "en matière de protection des données, cybersécurité et conformité numérique. "
            "Mentionne les montants des amendes si disponibles."
        ),
    },
    {
        "id": "hardware",
        "nom": "Hardware",
        "emoji": "🖥️",
        "couleur": "#10b981",
        "couleur_rgba": "16, 185, 129",
        "initiales": "HW",
        "titre_page": "Serveurs & Composants",
        "sous_titre": "Nouvelles architectures, vulnérabilités firmware et tendances datacenter",
        "dossier": "Veille/hardware",
        "flux": [
            "https://www.anandtech.com/rss/",
            "https://www.tomshardware.com/feeds/all",
            "https://www.servethehome.com/feed/",
            "https://www.nextplatform.com/feed/",
            "https://www.phoronix.com/rss.php",
            "https://www.hardware.fr/flux/rss/articles/all/",
            "https://www.clubic.com/feed/rss",
            "https://www.techpowerup.com/rss/news",
            "https://www.datacenterdynamics.com/en/rss/",
            "https://www.silicon.fr/feed",
        ],
        "mots_cles": [
            "cpu", "gpu", "processeur", "serveur", "server",
            "amd", "intel", "nvidia", "arm", "risc-v",
            "firmware", "bios", "uefi", "microcode",
            "datacenter", "data center", "rack", "composant",
            "mémoire", "memory", "ssd", "nvme", "stockage",
            "architecture", "chipset", "socket", "tdp",
        ],
        "prompt_role": "un ingénieur infrastructure spécialisé en architectures serveur et matériel datacenter",
        "prompt_consigne": (
            "Recense les nouvelles sorties de processeurs/composants serveur, les vulnérabilités "
            "firmware critiques, les évolutions d'architectures matérielles et les tendances "
            "datacenter notables de la semaine. Précise les constructeurs concernés et l'impact "
            "potentiel pour les infrastructures d'entreprise."
        ),
    },
]

# ==============================================================================
# 3. FONCTIONS UTILITAIRES
# ==============================================================================

def recuperer_articles(flux_list, mots_cles):
    """Récupère et filtre les articles depuis une liste de flux RSS."""
    articles = []
    for url in flux_list:
        try:
            feed = feedparser.parse(url)
            nom_site = feed.feed.get("title", "Source externe")
            for entry in feed.entries:
                if hasattr(entry, "published_parsed") and entry.published_parsed:
                    dt_publi = datetime.fromtimestamp(time.mktime(entry.published_parsed))
                    if dt_publi >= date_lundi_debut:
                        titre = entry.get("title", "")
                        resume = entry.get("description", "")
                        texte = (titre + " " + resume).lower()
                        if any(mot in texte for mot in mots_cles):
                            if len(resume) > 200:
                                resume = resume[:200] + "..."
                            date_str = dt_publi.strftime("%d/%m/%Y")
                            articles.append(
                                f"- Date: {date_str}\n"
                                f"  Source: {nom_site}\n"
                                f"  Titre: {titre}\n"
                                f"  Lien: {entry.link}\n"
                                f"  Résumé: {resume}\n"
                            )
        except Exception as e:
            print(f"  ⚠️ Erreur flux {url} : {e}")
    return articles


def generer_contenu_ia(articles, cat):
    """Appelle Mistral pour générer le contenu HTML de la veille."""
    if not articles:
        return "<p style='color: var(--muted); text-align:center; padding: 40px 0;'>Aucun article pertinent trouvé cette semaine pour cette catégorie.</p>"

    contenu_brut = "\n".join(articles[:MAX_ARTICLES])
    couleur = cat["couleur"]

    prompt = f"""
Tu es {cat["prompt_role"]}. Nous sommes le {str_aujourdhui}.
{cat["prompt_consigne"]}
Période couverte : du {str_lundi} au {str_aujourdhui}.

RÈGLES STRICTES DE FORMATAGE :
1. AUCUNE INTRODUCTION NI CONCLUSION. Commence directement.
2. Utilise ## (Titre 2) UNIQUEMENT pour chaque JOUR (ex: ## Lundi 2 Juin). Ordre chronologique obligatoire.
3. Utilise ### (Titre 3) pour le nom ou sujet principal de chaque article.
4. Pour CHAQUE article, génère EXACTEMENT ce bloc HTML (rien d'autre) :

<div class="article-box">
<p><strong>Résumé</strong> : Ton paragraphe explicatif ici (2-4 phrases, concis et factuel).</p>
<a href="URL_DE_L_ARTICLE" class="btn-source" target="_blank">🔗 Lire sur NOM_DE_LA_SOURCE</a>
</div>

Données à analyser :
{contenu_brut}
"""

    try:
        response = client.chat.complete(
            model="mistral-small-latest",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
        )
        return markdown.markdown(response.choices[0].message.content)
    except Exception as e:
        print(f"  ❌ Erreur API Mistral : {e}")
        return f"<p>Erreur lors de la génération du contenu : {e}</p>"


def generer_page_html(cat, contenu_html):
    """Génère la page HTML complète pour une catégorie."""
    couleur = cat["couleur"]
    couleur_rgba = cat["couleur_rgba"]
    return f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Veille {cat["nom"]} | {cat["titre_page"]} — {str_lundi} au {str_aujourdhui}</title>

    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23151925%22/><text x=%2250%22 y=%2265%22 font-family=%22Arial, sans-serif%22 font-weight=%22bold%22 font-size=%2228%22 text-anchor=%22middle%22 fill=%22{couleur}%22>{cat["initiales"]}</text></svg>">

    <link rel="stylesheet" href="/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@500;700;800&display=swap" rel="stylesheet">
    <style>
        .veille-content h2 {{
            color: {couleur};
            margin-top: 40px; margin-bottom: 20px;
            font-family: 'Outfit', sans-serif;
            border-bottom: 2px solid var(--border);
            padding-bottom: 10px; font-size: 1.6rem;
        }}
        .veille-content h3 {{
            color: var(--text);
            margin-top: 25px; margin-bottom: 15px;
            font-family: 'Outfit', sans-serif; font-size: 1.15rem;
            border-left: 3px solid {couleur}; padding-left: 10px;
        }}
        .article-box {{
            background: rgba({couleur_rgba}, 0.05);
            border-left: 4px solid {couleur};
            padding: 15px 20px; margin-bottom: 20px;
            border-radius: 0 8px 8px 0;
        }}
        .article-box p {{ margin-top: 0; margin-bottom: 15px; line-height: 1.6; color: var(--muted); }}
        .btn-source {{
            display: inline-block;
            background-color: {couleur};
            color: #ffffff !important;
            padding: 6px 16px; border-radius: 30px;
            font-size: 0.85em; font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba({couleur_rgba}, 0.2);
        }}
        .btn-source:hover {{ transform: translateY(-3px); box-shadow: 0 6px 20px rgba({couleur_rgba}, 0.4); }}
        .veille-content strong {{ color: var(--text); }}
        .veille-content a:not(.btn-source) {{ color: {couleur}; text-decoration: none; font-weight: 500; }}
        .veille-content a:not(.btn-source):hover {{ text-decoration: underline; }}

        .veille-header-badge {{
            display: inline-flex; align-items: center; gap: 8px;
            background: rgba({couleur_rgba}, 0.1);
            border: 1px solid rgba({couleur_rgba}, 0.3);
            color: {couleur}; padding: 6px 16px; border-radius: 30px;
            font-size: 0.85rem; font-weight: 700;
            text-transform: uppercase; letter-spacing: 0.05em;
            margin-bottom: 16px;
        }}
        .veille-nav {{ display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 40px; margin-top: 20px; }}
        .veille-nav a {{
            padding: 8px 18px; border-radius: 30px; font-size: 0.85rem; font-weight: 600;
            border: 1px solid var(--border); color: var(--muted);
            text-decoration: none; transition: all 0.2s;
        }}
        .veille-nav a:hover {{ border-color: {couleur}; color: {couleur}; background: rgba({couleur_rgba}, 0.05); }}
        .veille-nav a.active {{ background: {couleur}; color: white; border-color: {couleur}; }}
    </style>
</head>
<body>
    <div class="container" style="padding-top: 40px; padding-bottom: 60px;">
        <a href="/" class="btn-home" style="display: inline-block; margin-bottom: 30px;">↩ Retour au Portfolio</a>

        <div class="veille-header-badge">{cat["emoji"]} {cat["nom"]}</div>
        <h1 class="hero-title" style="text-align: left; margin-bottom: 10px;">{cat["titre_page"]}</h1>
        <p style="color: var(--muted); margin-bottom: 8px;">{cat["sous_titre"]}</p>
        <p style="color: var(--muted); font-size: 0.85rem; opacity: 0.7;">Semaine du {str_lundi} au {str_aujourdhui} · Généré par IA</p>

        <nav class="veille-nav">
            <a href="/Veille/securite" {"class='active'" if cat["id"] == "securite" else ""}>🛡️ Sécurité</a>
            <a href="/Veille/techno"   {"class='active'" if cat["id"] == "techno"   else ""}>💻 Techno</a>
            <a href="/Veille/legale"   {"class='active'" if cat["id"] == "legale"   else ""}>⚖️ Légale</a>
            <a href="/Veille/hardware" {"class='active'" if cat["id"] == "hardware" else ""}>🖥️ Hardware</a>
        </nav>

        <div class="veille-content" style="background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            {contenu_html}
        </div>
    </div>
</body>
</html>
"""


# ==============================================================================
# 4. BOUCLE PRINCIPALE — GÉNÉRATION DES 4 PAGES
# ==============================================================================

resultats = {}  # Stocke les contenus HTML pour la newsletter

for cat in CATEGORIES:
    print(f"\n{'='*60}")
    print(f"  {cat['emoji']}  Catégorie : {cat['nom'].upper()}")
    print(f"{'='*60}")

    print("  → Récupération des articles RSS...")
    articles = recuperer_articles(cat["flux"], cat["mots_cles"])
    print(f"  → {len(articles)} articles filtrés.")

    print("  → Génération IA en cours...")
    contenu_html = generer_contenu_ia(articles, cat)

    resultats[cat["id"]] = {
        "html": contenu_html,
        "cat": cat,
        "nb_articles": len(articles),
    }

    print("  → Écriture du fichier HTML...")
    os.makedirs(cat["dossier"], exist_ok=True)
    chemin = os.path.join(cat["dossier"], "index.html")
    with open(chemin, "w", encoding="utf-8") as f:
        f.write(generer_page_html(cat, contenu_html))
    print(f"  ✅ {chemin} généré.")


# ==============================================================================
# 5. NEWSLETTER COMBINÉE VIA BREVO
# ==============================================================================

BREVO_API_KEY = os.environ.get("BREVO_API_KEY")

if BREVO_API_KEY:
    print(f"\n{'='*60}")
    print("  📬  Préparation de la newsletter combinée...")
    print(f"{'='*60}")

    def section_newsletter(cat, contenu_html):
        c = cat["couleur"]
        cr = cat["couleur_rgba"]
        return f"""
        <div style="margin-bottom: 40px;">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px; padding-bottom:12px; border-bottom:2px solid {c};">
                <span style="font-size:1.4rem;">{cat["emoji"]}</span>
                <div>
                    <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:{c};">{cat["nom"]}</div>
                    <div style="font-size:1.1rem; font-weight:700; color:#f1f5f9;">{cat["titre_page"]}</div>
                </div>
            </div>
            <div style="padding-left: 4px;">
                {contenu_html}
            </div>
            <div style="text-align:right; margin-top:10px;">
                <a href="https://armel-plantier.com/Veille/{cat['id']}"
                   style="font-size:0.82rem; color:{c}; text-decoration:none; font-weight:600;">
                    Voir toute la veille {cat["nom"]} →
                </a>
            </div>
        </div>
        """

    corps_newsletter = "".join(
        section_newsletter(r["cat"], r["html"]) for r in resultats.values()
    )

    mail_html = f"""
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #0b0d14; padding: 20px; color: #f1f5f9;">
        <div style="max-width: 680px; margin: 0 auto; background: #151925; padding: 36px; border-radius: 12px; border-top: 5px solid #6366f1;">

            <h1 style="font-size:1.5rem; color:#f1f5f9; margin-bottom:4px;">🔍 Veille Cyber & Tech</h1>
            <p style="color:#94a3b8; font-size:0.9rem; margin-top:0; margin-bottom:32px;">
                Semaine du <strong style="color:#6366f1;">{str_lundi}</strong> au <strong style="color:#6366f1;">{str_aujourdhui}</strong>
                &nbsp;·&nbsp; Généré automatiquement par IA
            </p>

            {corps_newsletter}

            <hr style="border:none; border-top:1px solid #2d3748; margin:32px 0;">
            <p style="text-align:center; font-size:12px; color:#64748b;">
                Généré par le Portfolio de
                <a href="https://armel-plantier.com" style="color:#6366f1; text-decoration:none;">Armel Plantier</a>.<br>
                <a href="{{{{ unsubscribe }}}}" style="color:#64748b; text-decoration:underline;">Se désabonner</a>
            </p>
        </div>
    </body>
    </html>
    """

    LIST_ID = 2
    SENDER_EMAIL = "newsletter@armel-plantier.com"
    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
    }

    payload = {
        "name": f"Veille Cyber & Tech — {str_aujourdhui}",
        "subject": f"🔍 Veille Cyber & Tech : semaine du {str_lundi}",
        "sender": {"name": "Armel Plantier", "email": SENDER_EMAIL},
        "htmlContent": mail_html,
        "recipients": {"listIds": [LIST_ID]},
    }

    r_create = requests.post("https://api.brevo.com/v3/emailCampaigns", json=payload, headers=headers)

    if r_create.status_code == 201:
        campaign_id = r_create.json().get("id")
        print(f"  → Campagne #{campaign_id} créée. Envoi en cours...")
        r_send = requests.post(
            f"https://api.brevo.com/v3/emailCampaigns/{campaign_id}/sendNow",
            headers=headers,
        )
        if r_send.status_code == 204:
            print("  ✅ Newsletter combinée envoyée avec succès !")
        else:
            print(f"  ❌ Erreur envoi : {r_send.text}")
    else:
        print(f"  ❌ Erreur création campagne : {r_create.text}")
else:
    print("\n⚠️  Pas de clé BREVO trouvée — newsletter ignorée.")


# ==============================================================================
# 6. RÉSUMÉ FINAL
# ==============================================================================

print(f"\n{'='*60}")
print("  📊  RÉSUMÉ DE LA GÉNÉRATION")
print(f"{'='*60}")
for r in resultats.values():
    cat = r["cat"]
    print(f"  {cat['emoji']} {cat['nom']:10} → {r['nb_articles']:3} articles  →  {cat['dossier']}/index.html")
print(f"\n  Période : {str_lundi} → {str_aujourdhui}")
print("="*60)
