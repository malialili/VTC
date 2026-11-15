# VTC Bordeaux - Site Web Professionnel

## 📋 Description

Site web moderne et optimisé pour une entreprise de VTC (Véhicule de Tourisme avec Chauffeur) basée à Bordeaux. Ce site offre une alternative fiable aux taxis avec des prix fixes, une disponibilité 24h/24 et 7j/7, et un service professionnel.

## ✨ Fonctionnalités

### 🎯 Fonctionnalités Principales
- **Calculateur de tarifs** : Estimation des prix en temps réel
- **Réservation immédiate** : Par téléphone ou WhatsApp 24h/24
- **Gestion des destinations** : Transferts aéroport, gare, destinations touristiques
- **Flotte de véhicules** : Berlines, vans, véhicules TPMR
- **Témoignages clients** : Slider avec avis Google
- **FAQ interactive** : Réponses aux questions fréquentes
- **Formulaire de contact** : Avec validation et messages de confirmation

### 🚀 Optimisations
- **SEO** : Meta tags, Open Graph, schema.org markup
- **Performance** : Lazy loading, cache, compression
- **Accessibilité** : ARIA labels, navigation clavier, contraste
- **Responsive** : Adapté mobile, tablette, desktop
- **Sécurité** : HTTPS, CSP, headers de sécurité

### 🎨 Design
- Design moderne et épuré
- Palette de couleurs professionnelle
- Animations fluides
- Expérience utilisateur optimisée

## 📁 Structure du Projet

```
vtc-site/
├── index.html              # Page principale
├── css/
│   └── style.css           # Styles principaux
├── js/
│   ├── main.js             # JavaScript principal
│   └── calculator.js       # Calculateur de tarifs
├── images/                 # Images du site
├── .htaccess               # Configuration Apache
├── robots.txt              # Configuration SEO
└── README.md               # Documentation
```

## 🛠️ Installation

### Prérequis
- Serveur web (Apache, Nginx)
- PHP (optionnel, pour les formulaires)
- Node.js (optionnel, pour le développement)

### Installation locale
1. Cloner ou télécharger le projet
2. Placer les fichiers sur votre serveur
3. Créer un dossier `images/` et y ajouter les images
4. Configurer le fichier `.htaccess` si nécessaire

### Configuration
- Mettre à jour les numéros de téléphone dans `index.html`
- Configurer les emails dans le formulaire de contact
- Ajouter vos propres images dans le dossier `images/`

## 📱 Images Recommandées

Créer les images suivantes dans le dossier `images/` :
- `hero-desktop.jpg` (1920x1080) - Image principale desktop
- `hero-mobile.jpg` (800x600) - Image principale mobile
- `chauffeur-desktop.jpg` (1200x800) - Photo de chauffeur
- `chauffeur-mobile.jpg` (800x600) - Photo de chauffeur mobile
- `berline.jpg` (800x600) - Photo de berline
- `van.jpg` (800x600) - Photo de van
- `tpmr.jpg` (800x600) - Photo de véhicule TPMR
- `aeroport-bordeaux.jpg` (800x600) - Aéroport Bordeaux-Mérignac
- `gare-saint-jean.jpg` (800x600) - Gare Saint-Jean
- `arcachon.jpg` (800x600) - Bassin d'Arcachon
- `cap-ferret.jpg` (800x600) - Cap Ferret
- `dune-du-pilat.jpg` (800x600) - Dune du Pilat
- `lacanau.jpg` (800x600) - Lacanau
- `saint-emilion.jpg` (800x600) - Saint-Émilion
- `biscarrosse.jpg` (800x600) - Biscarrosse
- `map-bordeaux.jpg` (1200x800) - Carte de Bordeaux
- `og-image.jpg` (1200x630) - Image pour les réseaux sociaux
- `favicon.ico` (32x32, 64x64, 128x128) - Favicon

## 🎯 Personnalisation

### Modifier les tarifs
Éditer le fichier `js/calculator.js` et mettre à jour l'objet `tarifData` :
```javascript
const tarifData = {
    routes: {
        'Bordeaux Centre': {
            'Aéroport Bordeaux-Mérignac': { berline: 40, van: 65 },
            // ... autres routes
        }
    },
    // ... autres données
};
```

### Modifier les couleurs
Éditer les variables CSS dans `css/style.css` :
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    --accent-color: #f59e0b;
    /* ... autres variables */
}
```

### Modifier le contenu
Éditer directement le fichier `index.html` pour modifier les textes, services, etc.

## 🔍 SEO

### Optimisations déjà implémentées
- Balises meta (title, description, keywords)
- Open Graph pour les réseaux sociaux
- Schema.org markup pour les moteurs de recherche
- Sitemap (à générer)
- robots.txt
- URLs optimisées

### Pour aller plus loin
1. Créer un fichier `sitemap.xml`
2. Soumettre le site à Google Search Console
3. Configurer Google Analytics
4. Optimiser les balises alt des images
5. Ajouter des balises canoniques

## ♿ Accessibilité

### Fonctionnalités d'accessibilité
- **Navigation clavier** : Tous les éléments sont accessibles
- **ARIA labels** : Pour les éléments interactifs
- **Contraste** : Respect des normes WCAG
- **Liens "skip to content"** : Pour les lecteurs d'écran
- **Focus visible** : Styles de focus clairs
- **Sémantique HTML** : Balises appropriées

### Vérification
- Utiliser [WAVE](https://wave.webaim.org/) pour tester
- Vérifier avec [axe DevTools](https://www.deque.com/axe/devtools/)
- Tester la navigation au clavier

## 📊 Performance

### Optimisations implémentées
- Lazy loading des images
- Cache des assets statiques
- Compression Gzip
- Minification CSS/JS (à faire en production)
- Chargement asynchrone des scripts

### Outils de test
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

## 🚀 Déploiement

### Sur un serveur partagé
1. Télécharger les fichiers via FTP
2. Placer dans le dossier public_html
3. Configurer le .htaccess

### Sur un VPS
```bash
# Cloner le dépôt
 git clone https://github.com/votre-utilisateur/vtc-bordeaux.git

# Installer les dépendances (si nécessaire)
npm install

# Build (si nécessaire)
npm run build

# Configurer Apache/Nginx
# Voir .htaccess pour Apache
```

### Sur Netlify/Vercel
1. Connecter votre dépôt GitHub
2. Configurer les paramètres de build
3. Déployer

## 📞 Support

Pour toute question ou problème, contactez :
- Email : contact@vtc-bordeaux.fr
- Téléphone : +33 7 63 62 87 84
- WhatsApp : +33 7 63 62 87 84

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer.

## 🙏 Remerciements

- [Font Awesome](https://fontawesome.com/) pour les icônes
- [Google Fonts](https://fonts.google.com/) pour les polices
- [Inter Font](https://rsms.me/inter/) pour la typographie

---

**VTC Bordeaux** - Votre partenaire transport à Bordeaux et en Gironde
