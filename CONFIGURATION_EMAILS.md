# 📧 Configuration du Système d'Emails

## Vue d'ensemble

Le site utilise **Formspree** pour gérer l'envoi d'emails automatiques depuis les formulaires. C'est un service gratuit (jusqu'à 50 emails/mois) qui ne nécessite pas de backend.

---

## 🚀 Configuration Formspree (Étape par Étape)

### Étape 1 : Créer un compte Formspree

1. Va sur **https://formspree.io/**
2. Clique sur **"Sign Up"**
3. Crée un compte avec ton email (ex: contact@nexuscircle.fr)
4. Vérifie ton email

### Étape 2 : Créer un formulaire

1. Une fois connecté, clique sur **"New Form"**
2. Donne un nom au formulaire : **"Contact Nexus Circle"**
3. Entre l'email où tu veux recevoir les messages : **contact@nexuscircle.fr**
4. Clique sur **"Create Form"**
5. Formspree te donne un **Form ID** qui ressemble à : `xyzabc123`

### Étape 3 : Obtenir l'endpoint

L'endpoint complet sera : `https://formspree.io/f/xyzabc123`

### Étape 4 : Intégrer dans le code

Ouvre le fichier : `src/pages/Contact.jsx`

Remplace **toutes les occurrences** de :
```javascript
'https://formspree.io/f/YOUR_FORMSPREE_ID'
```

Par :
```javascript
'https://formspree.io/f/xyzabc123'  // Ton vrai Form ID
```

Il y a **2 endroits** à modifier :
- Ligne 55 : Formulaire de contact principal
- Ligne 90 : Formulaire de demande de brochure

---

## 📨 Ce que tu recevras par email

### 1. Formulaire de Contact Principal

Quand quelqu'un envoie un message, tu recevras un email avec :
- **Nom** : Le nom de la personne
- **Email** : Son adresse email (tu peux répondre directement)
- **Sujet** : Le sujet sélectionné (Partenariat, Création, Info, Autre)
- **Message** : Le message complet

**Format de l'objet** : `Nouveau message de [Nom] - [Sujet]`

### 2. Formulaire de Demande de Brochure

Quand quelqu'un demande la brochure, tu recevras :
- **Prénom** : Le prénom de la personne
- **Nom** : Son nom
- **Email** : Son adresse email
- **Type** : Créateur ou Marque

**Format de l'objet** : `Demande de brochure - [Prénom] [Nom] (Créateur/Marque)`

---

## 🔧 Options Avancées (Optionnel)

### Réponse automatique

Dans les paramètres de ton formulaire Formspree, tu peux activer une **réponse automatique** qui sera envoyée à la personne après soumission.

Exemple de message :
```
Bonjour,

Merci pour votre message ! Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.

L'équipe Nexus Circle
```

### Redirection après soumission

Tu peux aussi configurer une page de remerciement personnalisée si tu veux.

### Intégration avec d'autres outils

Formspree peut s'intégrer avec :
- **Google Sheets** : Pour stocker automatiquement les réponses
- **Slack** : Pour recevoir des notifications
- **Zapier** : Pour connecter à d'autres services

---

## 🆓 Limites du plan gratuit

- **50 soumissions/mois**
- 1 formulaire
- Emails illimités

Si tu dépasses 50 messages/mois, tu peux passer au plan payant (10$/mois) ou utiliser une alternative.

---

## 🔐 Sécurité

✅ Les emails sont envoyés de manière sécurisée via HTTPS
✅ Formspree gère le spam filtering automatiquement
✅ Pas besoin d'exposer ton email dans le code

---

## 🛠️ Alternative : EmailJS

Si tu préfères une autre solution, **EmailJS** est aussi une bonne option :
- https://www.emailjs.com/
- Même principe, configuration similaire
- 200 emails/mois gratuits

---

## 📝 Récapitulatif

1. Crée un compte sur **https://formspree.io/**
2. Crée un formulaire et note ton **Form ID**
3. Remplace `YOUR_FORMSPREE_ID` dans `src/pages/Contact.jsx` (2 endroits)
4. Teste en envoyant un message depuis ton site
5. Vérifie que tu reçois bien l'email sur **contact@nexuscircle.fr**

---

## ❓ Support

Si tu as des problèmes :
- Documentation Formspree : https://help.formspree.io/
- Ou contacte-moi pour que je t'aide !

---

**Une fois configuré, tous les messages du formulaire de contact et toutes les demandes de brochure te seront automatiquement envoyés par email ! 📧✨**

