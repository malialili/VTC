# Guide de Déploiement - VTC Bordeaux

## 📦 Structure du Projet

```
vtc-site/
├── index.html                    # Page d'accueil principale
├── 404.html                      # Page d'erreur 404
├── cgv.html                      # Conditions Générales de Vente
├── mentions-legales.html        # Mentions légales
├── politique-confidentialite.html # Politique de confidentialité
├── README.md                     # Documentation principale
├── DEPLOYMENT.md                 # Ce guide
├── robots.txt                    # Configuration SEO
├── sitemap.xml                   # Sitemap pour les moteurs de recherche
├── site.webmanifest              # Manifest pour PWA
├── .htaccess                     # Configuration Apache
├── .gitignore                    # Fichiers à ignorer par Git
├── css/
│   ├── style.css                 # Styles principaux
│   └── animations.css            # Animations CSS
├── js/
│   ├── main.js                   # JavaScript principal
│   └── calculator.js             # Calculateur de tarifs
└── images/                       # Dossier pour les images
```

## 🚀 Préparation avant déploiement

### 1. Personnaliser le contenu

#### Modifier les informations de contact
Ouvrez `index.html` et recherchez/replacez :
- Numéro de téléphone : `+33763628784`
- Email : `contact@vtc-bordeaux.fr`
- Lien WhatsApp : `https://wa.me/33763628784`

#### Personnaliser les tarifs
Éditez `js/calculator.js` et modifiez l'objet `tarifData` pour refléter vos tarifs réels.

#### Mettre à jour les informations légales
Modifiez les fichiers :
- `mentions-legales.html` : Adresse, SIRET, numéro de licence
- `cgv.html` : Conditions spécifiques à votre entreprise
- `politique-confidentialite.html` : Politique de confidentialité

### 2. Ajouter les images

Créez les images suivantes dans le dossier `images/` :

**Images principales :**
- `hero-desktop.jpg` (1920x1080) - Image d'en-tête desktop
- `hero-mobile.jpg` (800x600) - Image d'en-tête mobile
- `chauffeur-desktop.jpg` (1200x800) - Photo de chauffeur
- `chauffeur-mobile.jpg` (800x600) - Photo de chauffeur mobile

**Images des véhicules :**
- `berline.jpg` (800x600) - Berline VTC
- `van.jpg` (800x600) - Van VTC
- `tpmr.jpg` (800x600) - Véhicule TPMR

**Images des destinations :**
- `aeroport-bordeaux.jpg` (800x600)
- `gare-saint-jean.jpg` (800x600)
- `arcachon.jpg` (800x600)
- `cap-ferret.jpg` (800x600)
- `dune-du-pilat.jpg` (800x600)
- `lacanau.jpg` (800x600)
- `saint-emilion.jpg` (800x600)
- `biscarrosse.jpg` (800x600)

**Autres images :**
- `map-bordeaux.jpg` (1200x800) - Carte de Bordeaux
- `og-image.jpg` (1200x630) - Image pour les réseaux sociaux
- `hero-bg.jpg` (1920x1080) - Arrière-plan hero

**Favicons :**
- `favicon.ico` (32x32, 64x64, 128x128)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `favicon-48x48.png`
- `favicon-64x64.png`
- `favicon-96x96.png`
- `favicon-128x128.png`
- `favicon-192x192.png`
- `favicon-256x256.png`
- `favicon-384x384.png`
- `favicon-512x512.png`
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

### 3. Configurer le SEO

#### Mettre à jour les meta tags
Dans `index.html`, modifiez :
```html
<meta name="description" content="Votre description personnalisée">
<meta property="og:title" content="Votre titre">
<meta property="og:url" content="https://votre-domaine.fr">
```

#### Mettre à jour le sitemap
Éditez `sitemap.xml` pour inclure votre domaine :
```xml
<loc>https://votre-domaine.fr/</loc>
```

#### Configurer robots.txt
Modifiez `robots.txt` si nécessaire :
```
Sitemap: https://votre-domaine.fr/sitemap.xml
```

### 4. Configurer le .htaccess

Le fichier `.htaccess` est déjà configuré pour :
- Forcer HTTPS
- Supprimer les trailing slashes
- Cache des assets statiques
- Compression Gzip
- Headers de sécurité

Si vous utilisez Nginx, créez un fichier `nginx.conf` avec ces directives.

## 🌐 Déploiement

### Option 1 : Hébergement partagé (OVH, Hostinger, etc.)

1. **Télécharger les fichiers** :
   - Compressez le dossier `vtc-site` en ZIP
   - Ou utilisez Git : `git clone https://github.com/votre-repo/vtc-bordeaux.git`

2. **Transférer par FTP** :
   - Utilisez FileZilla ou un client FTP
   - Connectez-vous à votre serveur
   - Transférez tous les fichiers dans `public_html/` ou `www/`

3. **Configurer le domaine** :
   - Pointez votre domaine vers votre hébergement
   - Activez SSL (Let's Encrypt gratuit)

4. **Tester** :
   - Visitez `https://votre-domaine.fr`
   - Vérifiez que tout fonctionne

### Option 2 : VPS (DigitalOcean, Linode, etc.)

1. **Installer Apache/Nginx** :
   ```bash
   # Pour Apache
   sudo apt update
   sudo apt install apache2
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

2. **Configurer le VirtualHost** :
   ```apache
   <VirtualHost *:80>
       ServerName votre-domaine.fr
       ServerAlias www.votre-domaine.fr
       DocumentRoot /var/www/vtc-bordeaux
       <Directory /var/www/vtc-bordeaux>
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
       ErrorLog ${APACHE_LOG_DIR}/error.log
       CustomLog ${APACHE_LOG_DIR}/access.log combined
   </VirtualHost>
   ```

3. **Activer SSL avec Let's Encrypt** :
   ```bash
   sudo apt install certbot python3-certbot-apache
   sudo certbot --apache -d votre-domaine.fr -d www.votre-domaine.fr
   ```

4. **Transférer les fichiers** :
   ```bash
   sudo cp -r vtc-site/* /var/www/vtc-bordeaux/
   sudo chown -R www-data:www-data /var/www/vtc-bordeaux/
   ```

5. **Redémarrer Apache** :
   ```bash
   sudo systemctl restart apache2
   ```

### Option 3 : Netlify (Hébergement gratuit)

1. **Créer un dépôt GitHub** :
   ```bash
   cd vtc-site
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/votre-utilisateur/vtc-bordeaux.git
   git push -u origin main
   ```

2. **Configurer Netlify** :
   - Allez sur [Netlify](https://www.netlify.com/)
   - Connectez votre compte GitHub
   - Sélectionnez le dépôt `vtc-bordeaux`
   - Déployez

3. **Configurer le domaine** :
   - Dans Netlify, allez dans Domain settings
   - Ajoutez votre domaine personnalisé
   - Configurez DNS chez votre registrar

### Option 4 : Vercel

1. **Poussez sur GitHub** (comme ci-dessus)
2. **Importez sur Vercel** :
   - Allez sur [Vercel](https://vercel.com/)
   - Importez votre dépôt GitHub
   - Déployez

## 🔧 Configuration Post-Déploiement

### 1. Configurer Google Analytics

1. Créez un compte sur [Google Analytics](https://analytics.google.com/)
2. Ajoutez le code de suivi dans `index.html` :
```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Configurer Google Search Console

1. Allez sur [Google Search Console](https://search.google.com/search-console)
2. Ajoutez votre domaine
3. Vérifiez la propriété (via fichier HTML ou DNS)
4. Soumettez le sitemap : `https://votre-domaine.fr/sitemap.xml`

### 3. Configurer les réseaux sociaux

Mettez à jour les liens dans le footer et le header :
```html
<a href="https://facebook.com/votre-page" target="_blank">Facebook</a>
<a href="https://instagram.com/votre-compte" target="_blank">Instagram</a>
```

### 4. Configurer le formulaire de contact

Le formulaire utilise actuellement une simulation. Pour le rendre fonctionnel :

**Option A : Formspree (gratuit)**
1. Allez sur [Formspree](https://formspree.io/)
2. Créez un compte
3. Modifiez le formulaire dans `index.html` :
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option B : PHP (nécessite un serveur)**
1. Créez un fichier `send-mail.php` :
```php
<?php
$to = "contact@vtc-bordeaux.fr";
$subject = "Nouveau message du site VTC Bordeaux";
$message = "Nom: " . $_POST['nom'] . "\n";
$message .= "Email: " . $_POST['email'] . "\n";
$message .= "Message: " . $_POST['message'] . "\n";

mail($to, $subject, $message);
header("Location: /?success=1");
?>
```
2. Modifiez le formulaire :
```html
<form action="/send-mail.php" method="POST">
```

## 📊 Vérifications après déploiement

### 1. Tester le site
- [ ] Accueil charge correctement
- [ ] Navigation fonctionne
- [ ] Formulaire de contact fonctionne
- [ ] Calculateur de tarifs fonctionne
- [ ] Pages légales sont accessibles
- [ ] Liens vers WhatsApp et téléphone fonctionnent
- [ ] Design responsive sur mobile

### 2. Tester les performances
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### 3. Tester l'accessibilité
- [WAVE](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- Navigation au clavier

### 4. Tester le SEO
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [SEO Minion](https://www.seominion.com/) (extension Chrome)

## 🔄 Mises à jour

### Mettre à jour le contenu
1. Modifiez les fichiers HTML directement
2. Poussez les modifications :
```bash
git add .
git commit -m "Mise à jour du contenu"
git push
```

### Mettre à jour les tarifs
1. Éditez `js/calculator.js`
2. Modifiez l'objet `tarifData`
3. Testez le calculateur

### Ajouter de nouvelles destinations
1. Ajoutez dans `index.html` (section destinations)
2. Ajoutez les tarifs dans `js/calculator.js`
3. Ajoutez les images dans `images/`

## 🛠️ Dépannage

### Problème : Le site ne charge pas
- Vérifiez que tous les fichiers sont transférés
- Vérifiez les permissions (755 pour les dossiers, 644 pour les fichiers)
- Vérifiez le .htaccess (désactivez-le temporairement pour tester)

### Problème : Les styles ne s'appliquent pas
- Vérifiez que les chemins CSS sont corrects
- Vérifiez que le cache du navigateur est vide
- Vérifiez les erreurs 404 dans la console

### Problème : Le JavaScript ne fonctionne pas
- Vérifiez que les fichiers JS sont chargés
- Vérifiez les erreurs dans la console
- Vérifiez que jQuery n'est pas requis (ce site n'utilise pas jQuery)

### Problème : Les images ne s'affichent pas
- Vérifiez que les images sont dans le bon dossier
- Vérifiez les permissions des images
- Vérifiez les chemins dans le HTML

### Problème : Le calculateur de tarifs ne fonctionne pas
- Vérifiez que `js/calculator.js` est chargé
- Vérifiez les erreurs dans la console
- Vérifiez que les IDs des éléments correspondent

## 📞 Support

Pour toute question ou problème :
- Email : contact@vtc-bordeaux.fr
- Téléphone : +33 7 63 62 87 84

## 📚 Ressources

- [Documentation HTML](https://developer.mozilla.org/fr/docs/Web/HTML)
- [Documentation CSS](https://developer.mozilla.org/fr/docs/Web/CSS)
- [Documentation JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)
- [Google SEO Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Accessibility Guide](https://developer.mozilla.org/fr/docs/Web/Accessibility)

---

**VTC Bordeaux** - Votre partenaire transport à Bordeaux et en Gironde
