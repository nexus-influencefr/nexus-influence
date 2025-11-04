# 📁 GUIDE COMPLET DES IMAGES REQUISES

## 🎨 LOGO PRINCIPAL

### Emplacement : `public/`

**Fichiers à ajouter :**
- `logo.svg` (PRIORITAIRE - format vectoriel)
- `logo.png` (fallback si pas de SVG)

**Utilisation :**
- Header (haut gauche avec "Nexus Influence.")
- Footer (bas avec "Nexus Influence.")
- Chatbot (avatar du bot, fond noir, rond)

**Specs :**
- SVG : fond transparent, blanc ou or
- PNG : 200x200px min, fond transparent

---

## 👥 PHOTOS DES CRÉATEURS

### Emplacement : `public/images/creators/`

**Fichiers à ajouter :**

1. **flo.jpg** 
   - Créateur : Flo (@floo.bdc)
   - Style : Lifestyle & Mode
   - Position : **top center** (recadrage vers le haut)
   - Dimensions : 800x1000px min

2. **ola.jpg**
   - Créatrice : Olary (@cocaola__)
   - Style : Food, Lifestyle & Twitch
   - Position : center center
   - Dimensions : 800x1000px min

3. **alexis.jpg**
   - Créateur : Alexis (@legarspolyvalent)
   - Style : Fitness & Bien-être
   - Position : center center
   - Dimensions : 800x1000px min

4. **alice.jpg**
   - Créatrice : Alice (@rossetalice)
   - Style : Mode & Modelling
   - Position : center center
   - Dimensions : 800x1000px min

**Format :** JPG
**Poids max :** 500KB par image
**Qualité :** Haute résolution, bien cadrées

**Où elles apparaissent :**
- Carousel page d'accueil (défilant)
- Mega-menu Créateurs (hover header)
- Page Créateurs (grille de cards)

---

## 🏢 LOGOS DES PARTENAIRES

### Emplacement : `public/images/partners/`

**Fichiers à ajouter :**

1. **italiancharms.jpg**
   - Partenaire : Italian Charms
   - Description : Bijoux italiens élégants

2. **rosalove.jpg**
   - Partenaire : Rosa Love
   - Description : Mode féminine élégante

3. **coffret.jpg**
   - Partenaire : Le Coffret à Montre
   - Description : Montres de luxe

**Format :** JPG (fond transparent si possible)
**Dimensions :** 300x300px (carré)
**Poids max :** 200KB par logo

**Effets appliqués automatiquement :**
- Coins arrondis 30 degrés
- Effet de surbrillance or au hover
- Drop shadow or au hover

**Où ils apparaissent :**
- Mega-menu Partenaires (scroll horizontal)
- Page Partenaires (carousel infini)

---

## 📰 IMAGES DES ARTICLES DE BLOG

### Emplacement : `public/images/blog/`

**Fichiers à ajouter :**

1. **article-1.jpg**
   - Article : "71% des marques préfèrent les micro-créateurs"
   - Emoji principal : 📊

2. **article-3.jpg**
   - Article : "Comment monétiser votre contenu en 2025"
   - Emoji principal : 💰

3. **article-4.jpg**
   - Article : "TikTok vs Instagram : Quelle plateforme choisir ?"
   - Emoji principal : 🎯

4. **article-5.jpg**
   - Article : "Les tendances influence 2025"
   - Emoji principal : 🚀

5. **article-6.jpg**
   - Article : "5 erreurs à éviter en tant que créateur"
   - Emoji principal : ⚠️

6. **article-8.jpg**
   - Article : "+42% de partenariats long terme en 2024"
   - Emoji principal : 📈

7. **article-9.jpg**
   - Article : "L'authenticité, clé du succès en 2025"
   - Emoji principal : 💎

**Format :** JPG
**Dimensions :** 1200x600px
**Poids max :** 300KB par image

**Note :** Les emojis restent l'élément visuel PRINCIPAL. Ces images sont optionnelles/décoratives.

**Où elles apparaissent :**
- Page Blog (cards d'articles)
- Modal d'article (header)

---

## 🎥 VIDÉO

### Emplacement : `public/videos/`

**Fichier à ajouter :**

**august.mp4**
- Créateur : August Vallat (@outdoorgingerchannel)
- Type : Témoignage client / Résultat campagne
- Lien Instagram : https://www.instagram.com/outdoorgingerchannel/

**Format :** MP4 (H.264)
**Dimensions :** Portrait (format Instagram)
**Durée :** 10-30 secondes
**Poids max :** 5MB
**Audio :** OUI (la vidéo se lit avec le son activé)

**Comportement :**
- Lecture auto quand visible à 75% (IntersectionObserver)
- Bouton Play rond au centre (disparaît après 1 sec)
- Bouton "Voir sur Instagram" en bas à droite (opacité basse)
- Click sur vidéo = pause/play
- Loop infini

**Où elle apparaît :**
- Page d'accueil, section "Des résultats qui parlent"
- À droite des 3 stats boxes

---

## 📋 CHECKLIST FINALE

Avant de lancer le site, vérifie que tu as :

### Logo
- [ ] `public/logo.svg` OU `public/logo.png`

### Créateurs (4 photos)
- [ ] `public/images/creators/flo.jpg`
- [ ] `public/images/creators/ola.jpg`
- [ ] `public/images/creators/alexis.jpg`
- [ ] `public/images/creators/alice.jpg`

### Partenaires (3 logos)
- [ ] `public/images/partners/italiancharms.jpg`
- [ ] `public/images/partners/rosalove.jpg`
- [ ] `public/images/partners/coffret.jpg`

### Blog (7 images - OPTIONNEL)
- [ ] `public/images/blog/article1.jpg`
- [ ] `public/images/blog/article3.jpg`
- [ ] `public/images/blog/article4.jpg`
- [ ] `public/images/blog/article5.jpg`
- [ ] `public/images/blog/article6.jpg`
- [ ] `public/images/blog/article8.jpg`
- [ ] `public/images/blog/article9.jpg`

### Vidéo
- [ ] `public/videos/august.mp4`

---

## 🚀 COMMENT TESTER

1. Lance le serveur : `npm run dev`
2. Ouvre http://localhost:5173
3. Vérifie chaque page :
   - **Home** : Carousel créateurs, vidéo August
   - **Créateurs** : 4 cards avec photos
   - **Partenaires** : 3 logos qui scrollent
   - **Blog** : Articles avec emojis
   - **Header** : Logo + mega-menus
   - **Footer** : Logo
   - **Chatbot** : Logo dans l'avatar

Si une image manque, un fallback s'affiche (emoji ou texte).

---

## ⚠️ IMPORTANT

- Les noms de fichiers doivent être EXACTEMENT comme indiqués (minuscules, tirets)
- Les extensions doivent être `.jpg` (pas .jpeg, .JPG, .png sauf pour le logo)
- Place les fichiers dans les bons dossiers
- Ne change PAS les noms dans le code, ajoute juste les images

