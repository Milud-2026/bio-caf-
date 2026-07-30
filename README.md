# BIO CAFE — Site vitrine

Site de présentation pour **BIO CAFE**, entreprise marocaine spécialisée dans la vente, l'installation, la gestion et la maintenance de distributeurs automatiques de café, boissons et snacks.

## Structure du projet

```
/
├── index.html          # Page principale
├── assets/
│   ├── css/style.css    # Styles personnalisés (tokens, animations, signature "vapeur")
│   ├── js/script.js     # Scripts (compteurs, slider, menu mobile, CTA)
│   └── images/          # Emplacement prévu pour vos photographies
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── README.md
```

## Stack technique

- HTML5 sémantique
- Classes utilitaires façon Tailwind, mais écrites à la main et auto-hébergées dans `assets/css/utilities.css` (pas de CDN, pas d'étape de build, aucune dépendance réseau)
- JavaScript vanille (aucune dépendance)
- Polices Google Fonts : **Fraunces** (titres) + **Manrope** (texte courant) — nécessitent une connexion internet ; le site reste fonctionnel sans elles (police de secours automatique)

> Remarque : la première version utilisait le CDN `cdn.tailwindcss.com`, qui peut être bloqué par certains aperçus, pare-feux ou bloqueurs de script. Il a été remplacé par une feuille de style autonome pour garantir un fonctionnement fiable partout.

## À faire avant mise en ligne

1. **Photographies** — le site utilise désormais de vraies photographies (distributeurs, café, équipe) hébergées sur Unsplash, sous licence Unsplash (usage commercial libre, aucune attribution obligatoire). Voir la liste complète des photos et de leurs auteurs ci-dessous. Pour un rendu 100 % sur-mesure, remplacez-les par vos propres photos de vos machines et de vos équipes, dans `assets/images/`.
2. **Logos clients** — la section « Ils nous font confiance » utilise des typogrammes stylisés (texte sur fond coloré) plutôt que les logos officiels de CNSS, Peugeot, Intelcia, Point S et Outsourcia, afin de ne pas reproduire des marques déposées sans autorisation. Remplacez-les par les fichiers logo officiels obtenus avec l'accord de chaque client.
3. **WhatsApp** — dans `assets/js/script.js`, renseignez `CONFIG.whatsappNumber` (ex. `"212664757055"`) pour activer les boutons d'appel à l'action.
4. **Domaine réel** — mettez à jour les balises `og:url`, `canonical` et le fichier `sitemap.xml` avec votre nom de domaine définitif.
5. **Analytics** — les emplacements pour Google Analytics et Meta Pixel sont commentés dans `script.js` et prêts à être complétés avec vos identifiants.

## Crédits photographiques

Toutes les photos sont hébergées sur `images.unsplash.com` et utilisées sous [licence Unsplash](https://unsplash.com/license) (gratuite, usage commercial autorisé, attribution non obligatoire). Elles sont chargées directement depuis Unsplash (pas de copie locale) — une connexion internet est donc nécessaire pour les afficher.

| Utilisation | Photographe |
|---|---|
| Fond du hero + galerie + carte "Boissons" | CHEN HENG |
| Section "Qui sommes-nous" + carte "Menu Expresso" | Krists Luhaers |
| Carte "Menu Café long" + carte "Machines à café" | Jordan Whitfield |
| Carte "Menu Cappuccino" | Bryan Burgos |
| Carte "Menu Chocolat chaud" | Elena Leya |
| Carte "Menu Café au lait / Café léger" | Annie Spratt |
| Carte "Menu Lait" | engin akyurt |
| Carte "Menu Thé citron" | Anna Teodoro |
| Carte "Distributeurs de snacks" + galerie | Zeke Tucker |
| Section "Image positive" + galerie + équipe | Vitaly Gariev |

Si vous préférez ne pas dépendre d'Unsplash en production, téléchargez ces photos (ou vos propres photos) dans `assets/images/` et remplacez les URLs `https://images.unsplash.com/...` dans `index.html` par des chemins relatifs, ex. `assets/images/hero.jpg`.

## Déploiement sur Vercel

1. Poussez ce dossier tel quel sur un dépôt GitHub.
2. Sur [vercel.com](https://vercel.com), importez le dépôt.
3. Aucun réglage de build n'est nécessaire (site statique) — laissez "Framework Preset" sur *Other*.
4. Déployez.

## Contact

BIO CAFE — Soufiane Mourad
Tél : 06 64 75 70 55 / 06 26 00 54 50
