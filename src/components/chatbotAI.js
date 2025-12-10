// Système IA pour NexusBot avec NLP
import { extractKeywords, matchesAny } from '../nlp/nlp'

export const analyzeAndRespond = (userMessage) => {
  const msg = userMessage.toLowerCase().trim()
  
  // Extraction des mots-clés avec synonymes
  const { base, expanded } = extractKeywords(userMessage)
  
  const normalized = msg
    .replace(/influance|influens/g, 'influence')
    .replace(/\bsa\b/g, 'ca')
    .replace(/\bc\b/g, 'cest')
    .replace(/\bki\b/g, 'qui')
    .replace(/\bkoi\b/g, 'quoi')
    .replace(/\bpr\b/g, 'pour')
    .replace(/\bpk\b/g, 'pourquoi')
    .replace(/\bvs\b/g, 'vous')
  
  // TARIFS DES CRÉATEURS SPÉCIFIQUES (PRIORITÉ - AVANT LA DESCRIPTION)
  // Utilise NLP pour détecter les intentions de tarifs/prix
  const isPricing = matchesAny(expanded, ["tarif","prix","cout","combien","partenariat","budget","devis","honoraire","remuneration","facturation"])
  const isCreatorMentioned = /flo|ola|olary|alice|alexis|geo|geoffroy|florian|kovana|lucas/.test(normalized)
  
  if (isPricing && isCreatorMentioned) {
    return `Pour connaître les tarifs de nos créateurs et discuter d'un partenariat, envoie-nous un DM sur Instagram @nexus__circle ou un email à contact@nexuscircle.fr ! Tu peux aussi passer directement par notre page Contact sur le site. On te répond rapidement avec tous les détails ! 💰📩`
  }

  // ENGAGEMENT
  if (/taux.*engagement|engagement.*de/.test(normalized) && /alice|flo|olary|alexis|geo|florian|kovana|lucas/.test(normalized)) {
    return `Les taux d'engagement de nos créateurs sont confidentiels ! Mais tous ont un excellent engagement. Pour en savoir plus : contact@nexuscircle.fr ! 📊`
  }

  // CRÉATEURS SPÉCIFIQUES - Vérifier d'abord qu'il ne s'agit PAS d'une question de prix
  if (!isPricing) {
    if (/\bflo\b/.test(normalized)) {
      return `Flo (@floo.bdc), créateur lifestyle & mode ! 4.6K abonnés. Il partage du contenu style et créativité. On l'accompagne sur ses collabs. Tu veux voir son profil ?`
    }
    
    if (/\bola\b|olary/.test(normalized)) {
      return `Olary (@cocaola___), créatrice lifestyle, échecs & Twitch ! 23.3K abonnés. Contenu authentique et passion pour les échecs. On bosse ensemble sur sa stratégie ! Curieux ?`
    }
    
    if (/\balexis\b/.test(normalized)) {
      return `Alexis (@legarspolyvalent), expert fitness & bien-être ! 1.5K abonnés. Il inspire sa commu. On l'accompagne ! Tu es dans le fitness ?`
    }
    
    if (/\balice\b/.test(normalized)) {
      return `Alice (@rossetalice), créatrice mode & mannequinat ! 2.8K abonnés. Mannequin professionnelle avec un style unique. On gère sa stratégie mode ! Joli profil non ?`
    }

    if (/\bgeo\b|geoffroy/.test(normalized)) {
      return `Geoffroy (@life_of_geo_), jeune entrepreneur passionné d'horlogerie ! 300 abonnés. Il a monté sa propre boîte en horlogerie et partage son aventure entrepreneuriale. On l'accompagne sur sa croissance ! Passionnant non ?`
    }

    if (/\bflorian\b|floflodesmontagnes/.test(normalized)) {
      return `Florian (@floflodesmontagnes), créateur outdoor passionné de randonnée et haute montagne ! Il partage des vidéos autour de l'exploration, des paysages et de l'aventure en pleine nature. On l'accompagne sur ses collabs outdoor ! Tu aimes la montagne ?`
    }

    if (/\bkovana\b|sors2cheztoi/.test(normalized)) {
      return `Kovana (@sors2cheztoi), créateur de contenu outdoor et exploration ! Vidéos de randonnée, nature et aventures en plein air pour inspirer sa communauté à sortir et découvrir. On bosse ensemble sur sa stratégie ! Tu es fan d'outdoor ?`
    }

    if (/\blucas\b|elchicolatine/.test(normalized)) {
      return `Lucas (@elchicolatine), créateur sportif spécialisé en basket ! Vidéos de trickshots, défis et contenus dynamiques pour une communauté passionnée de sport. On l'accompagne sur ses collabs sport ! Tu es dans le sport ?`
    }

    if (/august|outdoor|ginger/.test(normalized)) {
      return `August Vallat (@outdoorgingerchannel) ! Un créateur outdoor qu'on a accompagné avant même de lancer Nexus Circle officiellement. Il a bossé avec Pierre et Vasco sur sa stratégie et ses partenariats. Un vrai succès ! Tu le connais ?`
    }
  }
  
  // PARTENAIRES
  if (/avec qui|partenaires|italian|rosa|coffret/.test(normalized)) {
    return `On travaille avec Italian Charms, Rosa Love, et Le Coffret à Montre ! Des marques quali. Tu peux les voir sur notre site onglet Partenaires ! 👀`
  }
  
  // COMMISSION & POURCENTAGE
  if (/commission|pourcentage|prenez combien/.test(normalized)) {
    return `On prend entre 15-25% sur les collabs qu'on gère, ou on peut travailler en forfait mensuel. Tout dépend du créateur et du type d'accompagnement. Toujours transparent ! 💰`
  }
  
  // RENTABLE CRÉATEUR
  if (/rentable/.test(normalized)) {
    return `Très rentable ! Nos créateurs augmentent leurs revenus de 150-300% en moyenne. Meilleures négo, plus de collabs, nouvelles sources... L'investissement se rentabilise vite !`
  }

  // GRILLE TARIFAIRE / FORMULES
  if (/grille.*tarifaire|formule.*fixe|tarif.*fixe/.test(normalized)) {
    return `On n'a pas de grille fixe ! Chaque créateur est unique, donc on adapte nos tarifs selon ton profil, ta commu, et tes objectifs. Contacte-nous pour un devis personnalisé : contact@nexuscircle.fr 📋`
  }

  // TARIFS VARIABLES
  if (/tarif.*varient|prix.*varient|different.*selon/.test(normalized)) {
    return `Oui, nos tarifs s'adaptent à chaque créateur ! Ton nombre d'abonnés, ton engagement, tes objectifs... Chaque profil est unique. On te fait une offre sur-mesure ! 🎯`
  }

  // MENSUEL OU MISSION
  if (/mensuel|mission|paiement.*mensuel/.test(normalized)) {
    return `On propose les deux ! Soit un forfait mensuel pour un accompagnement continu, soit un tarif à la mission ponctuelle. On s'adapte à ce qui te convient le mieux ! 📅`
  }

  // COÛT D'ENTRÉE / PAYER AVANT
  if (/cout.*entree|frais.*entree|payer.*avant|payer.*rejoindre/.test(normalized)) {
    return `Aucun frais d'entrée ! Tu ne payes qu'une fois qu'on a validé ton profil et défini ensemble l'accompagnement. Pas de mauvaise surprise ! 🚀`
  }

  // FRAIS CACHÉS
  if (/frais.*caches|cout.*supplementaire|frais.*supplementaire/.test(normalized)) {
    return `Zéro frais caché ! Ce qu'on te dit au début, c'est ce que tu payes. Total transparence, c'est notre règle n°1. Si des coûts apparaissent, on t'en parle AVANT ! ✨`
  }

  // PETITS CRÉATEURS SANS BUDGET
  if (/petit.*createur|sans.*budget|pas.*budget/.test(normalized)) {
    return `On accompagne aussi les micro-créateurs ! Si ton budget est limité, on peut adapter notre modèle (commission uniquement, ou plan évolutif). L'important c'est ton potentiel ! 💪`
  }

  // PAIEMENT DES COLLABS
  if (/paiement.*collaboration|comment.*paye|qui.*paye/.test(normalized)) {
    return `Les marques te payent directement ! On gère la négo et le suivi, mais l'argent va direct sur ton compte. On prend notre % après. Simple et clair ! 💸`
  }

  // PACKS / ABONNEMENTS
  if (/pack|abonnement/.test(normalized)) {
    return `On a des formules mensuelles récurrentes et des packs ponctuels. Ça dépend de ce dont tu as besoin : accompagnement long terme ou coup de boost rapide ? Parlons-en ! 📦`
  }

  // MEDIA KIT INCLUS
  if (/media.*kit.*inclus|tarif.*media.*kit/.test(normalized)) {
    return `Oui ! Le media kit est souvent inclus dans nos formules d'accompagnement. On te fait un dossier de présentation pro pour séduire les marques. Beau et efficace ! 📄`
  }

  // BUDGET MINIMUM MARQUE
  if (/budget.*minimum|campagne.*minimum/.test(normalized)) {
    return `Pas de budget minimum fixe ! On s'adapte. Que tu sois une petite marque ou un gros annonceur, on trouve des solutions. Contacte-nous pour en discuter : contact@nexuscircle.fr 💼`
  }

  // DEVIS / FORFAIT MARQUE
  if (/devis|forfait.*marque|sur.*mesure/.test(normalized)) {
    return `On fait uniquement du sur-mesure ! Chaque campagne est différente. Dis-nous ton projet, tes objectifs, ton budget, et on te prépare un devis personnalisé. contact@nexuscircle.fr ✉️`
  }

  // COÛT CAMPAGNE
  if (/cout.*campagne|combien.*campagne|prix.*campagne/.test(normalized)) {
    return `Ça dépend du nombre de créateurs, du type de contenu, de la durée... Une campagne peut aller de quelques centaines à plusieurs milliers d'euros. On te fait un devis précis selon ton projet ! 📊`
  }

  // UGC / CRÉATION CONTENU
  if (/ugc|creation.*contenu/.test(normalized)) {
    return `Pour de la création de contenu UGC, nos tarifs varient selon le créateur, le nombre de contenus, et l'usage. On te met en relation avec le bon profil ! Contacte-nous : contact@nexuscircle.fr 🎥`
  }

  // RÉDUCTIONS LONG TERME
  if (/reduction|remise|longue.*duree/.test(normalized)) {
    return `Oui ! On encourage les collabs sur le long terme. Si tu veux un accompagnement récurrent ou une campagne longue, on peut discuter de tarifs avantageux ! 🤝`
  }

  // FRAIS D'AGENCE
  if (/frais.*agence/.test(normalized)) {
    return `Nos frais sont clairs : soit un % sur les collabs (15-25%), soit un forfait mensuel. Tout est négocié dès le départ. Pas de surprise ! 💼`
  }

  // MOYENS DE PAIEMENT
  if (/moyen.*paiement|comment.*payer/.test(normalized)) {
    return `Virement bancaire, PayPal, ou autre selon ce qui t'arrange ! On est flexibles. Une fois qu'on démarre ensemble, on te donne tous les détails. 💳`
  }

  // ACOMPTE
  if (/acompte|avance/.test(normalized)) {
    return `Ça dépend de l'accompagnement ! Pour certaines missions, on peut demander un acompte. Mais tout est discuté et validé ensemble avant. Toujours transparent ! 🤝`
  }

  // PAIEMENT ÉCHELONNÉ
  if (/paiement.*echelonne|payer.*plusieurs.*fois/.test(normalized)) {
    return `Oui, c'est possible ! Surtout pour les accompagnements longs. On peut étaler les paiements pour faciliter. On s'adapte à toi ! 📅`
  }

  // TVA
  if (/tva/.test(normalized)) {
    return `Oui, nos tarifs sont HT (hors taxes). La TVA s'ajoute selon la législation en vigueur. On te fait un devis clair avec tout détaillé ! 📝`
  }

  // OBTENIR DEVIS
  if (/obtenir.*devis|demander.*devis/.test(normalized)) {
    return `Super simple ! Envoie-nous un message à contact@nexuscircle.fr avec ton projet, tes besoins, et on te prépare un devis sur-mesure sous 48h max ! ✉️`
  }
  
  // SERVICES
  if (/service|offre|proposez/.test(normalized)) {
    return `On propose : stratégie & audit, media kit pro, négo avec marques, monétisation, conseil business... Tout sur-mesure ! Un service t'intéresse ?`
  }
  
  // DEVENIR CRÉATEUR
  if (/(devenir|rejoindre).*(createur|nexus)/.test(normalized)) {
    return `Envoie ton profil à contact@nexuscircle.fr avec 2-3 lignes sur toi ! On étudie chaque profil et on revient vite. Tu as déjà une commu ?`
  }
  
  // FONDATEURS
  if (/fondateur|pierre|vasco/.test(normalized)) {
    return `Pierre O'Neill et Vasco Preun, deux jeunes entrepreneurs passionnés ! Leur mission : rendre l'influence plus humaine et pro. 🚀`
  }
  
  // CONTACT
  if (/contact|email|mail/.test(normalized)) {
    return `Email : contact@nexuscircle.fr ou tél : 06 26 45 21 65. On répond vite ! Tu as un projet ?`
  }
  
  // TARIFS GÉNÉRAUX (seulement si pas de créateur mentionné)
  if (/tarif|prix|coute/.test(normalized) && !isCreatorMentioned) {
    return `Nos conditions varient selon l'accompagnement. Toujours équitable et transparent ! Pour ton cas : contact@nexuscircle.fr`
  }
  
  // TYPES DE CRÉATEURS
  if (/type.*createur|quels.*createur/.test(normalized)) {
    return `On travaille avec tous types de créateurs : lifestyle, mode, fitness, gaming, food, tech... Micro et macro-influenceurs ! L'important c'est ton engagement et ton authenticité. 🎯`
  }

  // MICRO VS MACRO
  if (/micro.*influenceur|macro.*influenceur/.test(normalized)) {
    return `On est spécialisés dans les MICRO-influenceurs (1K-50K) ! C'est là que l'engagement est le meilleur. Mais on accompagne aussi des profils plus gros si le projet nous parle ! 📈`
  }

  // CRITÈRES DE SÉLECTION
  if (/critere|comment.*choisir|selection/.test(normalized)) {
    return `On regarde ton engagement, ton authenticité, ta régularité, et tes valeurs ! Les abonnés c'est bien, mais l'engagement et la vraie commu c'est mieux. On veut des créateurs passionnés ! ✨`
  }

  // NOMBRE D'ABONNÉS MINIMUM
  if (/nombre.*abonnes|combien.*abonnes|minimum.*abonnes/.test(normalized)) {
    return `Pas de minimum strict ! Même avec 500 abonnés si ton engagement est top et ton contenu quali, on peut bosser ensemble. On croit au potentiel, pas juste aux chiffres ! 💪`
  }

  // PLATEFORMES (TikTok, YouTube, Twitch, LinkedIn)
  if (/tiktok|youtube|twitch|linkedin|plateforme/.test(normalized)) {
    return `Oui on accompagne sur toutes les plateformes ! Instagram, TikTok, YouTube, Twitch, LinkedIn... Peu importe où tu crées, on s'adapte à ton univers ! 📱`
  }

  // DÉBUTANTS
  if (/debutant|commencer|nouveau.*createur/.test(normalized)) {
    return `On peut accompagner les débutants motivés ! Si tu as une vraie passion, un projet clair et que tu veux te professionnaliser, contacte-nous. On évalue chaque profil ! 🚀`
  }

  // DOMAINES DES CRÉATEURS
  if (/domaine|secteur|niche/.test(normalized)) {
    return `Nos créateurs sont variés : mode, lifestyle, fitness, horlogerie, échecs, gaming... On aime la diversité ! Check notre page Créateurs pour voir nos profils ! 🎨`
  }

  // LISTE DES CRÉATEURS
  if (/liste.*createur|voir.*createur/.test(normalized)) {
    return `Oui ! Va sur notre page Créateurs, tu verras Flo, Olary, Alexis, Alice, Geoffroy, Florian, Kovana, Lucas... et d'autres à venir ! Check leurs profils ! 👥`
  }

  // EXCLUSIVITÉ
  if (/exclusif|exclusivite/.test(normalized)) {
    return `Non, pas d'exclusivité obligatoire ! Nos créateurs restent libres de leurs autres collabs. On privilégie la confiance et l'authenticité à l'exclusivité. 🤝`
  }

  // CONTRAT
  if (/contrat|signer/.test(normalized)) {
    return `Oui, on signe toujours un contrat clair ! Ça protège le créateur ET nous. Tout est écrit noir sur blanc : services, tarifs, durée... Zéro flou ! 📄`
  }

  // NOMBRE DE CRÉATEURS
  if (/combien.*createur/.test(normalized) && !/combien.*coute/.test(normalized)) {
    return `On a une dizaine de créateurs actuellement, et on grandit ! On préfère la qualité à la quantité. Chaque créateur a un vrai suivi personnalisé ! 🌟`
  }

  // ACCOMPAGNEMENT / COMMENT ÇA SE PASSE
  if (/comment.*accompagnement|deroulement/.test(normalized)) {
    return `On commence par un audit complet de ton profil, puis on définit ta stratégie ensemble. Ensuite : media kit, recherche de marques, négo, suivi... On est là à chaque étape ! 🎯`
  }

  // IMAGE DE MARQUE
  if (/image.*marque|branding/.test(normalized)) {
    return `Oui carrément ! On t'aide à définir ton positionnement, ton message, ton style... Pour que les marques te reconnaissent instantanément. C'est la base ! 🎨`
  }

  // STRATÉGIE CONTENU
  if (/strategie.*contenu/.test(normalized)) {
    return `Oui ! On analyse ton contenu actuel et on te donne des axes d'amélioration. Calendrier éditorial, types de posts, storytelling... Tout pour maximiser ton impact ! 📅`
  }

  // NÉGO CONTRATS
  if (/negociation|negocier/.test(normalized)) {
    return `C'est notre spécialité ! On négocie POUR toi avec les marques : tarifs, conditions, livrables... On s'assure que tu sois payé à ta juste valeur ! 💪`
  }

  // GESTION PAIEMENTS
  if (/gestion.*paiement/.test(normalized)) {
    return `On suit les paiements ! On s'assure que la marque paye dans les temps, on relance si besoin, et on vérifie que tout est conforme au contrat. Tu restes serein ! ✅`
  }

  // FORMATION BUSINESS
  if (/formation|apprendre|business/.test(normalized)) {
    return `On te forme ! Facturation, négociation, positionnement, monétisation... Tu deviens un vrai pro indépendant. Notre mission : te rendre autonome ! 📚`
  }

  // SUIVI RÉGULIER
  if (/suivi|regulier|accompagnement.*long/.test(normalized)) {
    return `Oui ! Calls réguliers, check des perfs, ajustements de stratégie... On est pas là juste pour une mission, on construit avec toi sur la durée ! 📞`
  }

  // PROFESSIONNALISATION (statut, factures)
  if (/professionnaliser|statut|facture|administratif/.test(normalized)) {
    return `On te guide sur tout l'administratif ! Quel statut choisir, comment facturer, gérer la compta... Tu deviens un créateur pro qui gère son business ! 💼`
  }

  // MISE EN RELATION
  if (/mise.*relation|trouver.*marque/.test(normalized)) {
    return `On identifie les marques qui matchent avec ton univers, on les contacte, on présente ton profil... Et on gère toute la relation jusqu'à la signature ! 🤝`
  }

  // MATCHING MARQUE-CRÉATEUR
  if (/matching|correspondance/.test(normalized)) {
    return `On analyse l'ADN de la marque et ton profil : valeurs, audience, style... On cherche l'alignement parfait pour des collabs authentiques et efficaces ! 🎯`
  }

  // MARQUES PEUVENT CHOISIR
  if (/marque.*choisir|choix.*createur/.test(normalized)) {
    return `Les marques peuvent exprimer leurs préférences, mais on conseille toujours le bon match ! On connaît nos créateurs mieux que personne. Confiance = résultats ! ✨`
  }

  // MARQUES FRANÇAISES/INTERNATIONALES
  if (/marque.*francaise|marque.*internationale/.test(normalized)) {
    return `On travaille principalement avec des marques françaises, mais on est ouverts à l'international ! Si une marque étrangère veut bosser avec nos créateurs, no problem ! 🌍`
  }

  // PLUSIEURS CRÉATEURS PAR CAMPAGNE
  if (/plusieurs.*createur|combien.*createur.*campagne/.test(normalized)) {
    return `Ça dépend de la campagne ! Ça peut aller d'1 créateur pour une collab ciblée à 5-10 pour une grosse campagne multi-profils. On s'adapte aux besoins ! 🎬`
  }

  // CAMPAGNES SUR-MESURE
  if (/campagne.*mesure|personnalise/.test(normalized)) {
    return `100% sur-mesure ! Chaque campagne est unique. On écoute tes objectifs, ton budget, ton message... Et on crée une stratégie qui te ressemble ! 🎨`
  }

  // ROI / PERFORMANCES
  if (/retour.*investissement|roi|performance|resultats/.test(normalized)) {
    return `On track tout ! Vues, engagement, conversions, portée... Tu as un reporting complet avec des KPIs clairs pour mesurer l'impact de chaque collab ! 📊`
  }

  // VALIDATION CONTENU MARQUES
  if (/validation.*contenu|droit.*regard/.test(normalized)) {
    return `Les marques peuvent valider le contenu avant publication si c'est dans le contrat. Mais on encourage la liberté créative ! Un créateur authentique = meilleurs résultats ! ✅`
  }

  // GESTION VALIDATION
  if (/gerer.*validation/.test(normalized)) {
    return `On facilite les échanges ! Le créateur envoie son contenu, on le transmet à la marque, on collecte les retours, et on ajuste si besoin. Tout fluide ! 🔄`
  }

  // QUALITÉ GARANTIE
  if (/qualite|garantie/.test(normalized)) {
    return `On sélectionne des créateurs pros et on fait un brief détaillé avant chaque collab. Si un contenu ne va pas, on le refait. Ta satisfaction = notre priorité ! ⭐`
  }

  // RESPECT DÉLAIS
  if (/delai|livraison/.test(normalized)) {
    return `On définit un planning clair dès le début. On suit les créateurs de près pour que tout soit livré à temps. Si problème, on gère et on te tient informé ! ⏰`
  }

  // REPORTING
  if (/reporting|rapport|suivi.*performance/.test(normalized)) {
    return `Oui ! Après chaque campagne, tu reçois un rapport avec toutes les stats : vues, likes, commentaires, portée, engagement... Résultats mesurables ! 📈`
  }

  // DROITS UTILISATION UGC
  if (/droit.*utilisation|ugc.*droit/.test(normalized)) {
    return `C'est négocié au cas par cas dans le contrat ! Usage unique, réutilisation, durée... On s'assure que créateur ET marque sont d'accord sur les droits ! 📜`
  }

  // CONFIDENTIALITÉ
  if (/confidentialite|secret/.test(normalized)) {
    return `Total respect de la confidentialité ! Les infos stratégiques des marques restent confidentielles. Accord de confidentialité possible si nécessaire ! 🔒`
  }

  // LITIGES
  if (/litige|probleme|conflit/.test(normalized)) {
    return `On est là pour gérer ! On fait la médiation entre créateur et marque, on trouve des solutions à l'amiable. Notre rôle : éviter les conflits et résoudre vite si ça arrive ! 🤝`
  }

  // BRIEF CAMPAGNE
  if (/brief|ligne.*directrice/.test(normalized)) {
    return `Oui ! On aide les marques à créer un brief clair : message, ton, format, objectifs... Un bon brief = un bon contenu. On accompagne sur tout ! 📋`
  }

  // DURÉE COLLABORATION
  if (/duree.*collaboration|combien.*temps/.test(normalized)) {
    return `Ça varie ! Une collab ponctuelle = 2-4 semaines. Un accompagnement continu = plusieurs mois. On s'adapte à tes besoins et ton planning ! ⏳`
  }

  // CAMPAGNES RÉCURRENTES
  if (/recurrent|regulier/.test(normalized)) {
    return `Oui ! On adore les collabs récurrentes. Ça crée de la stabilité pour le créateur et de meilleurs résultats pour la marque. Win-win sur la durée ! 🔄`
  }

  // PARTENARIATS LONG TERME
  if (/long.*terme|partenariat.*durable/.test(normalized)) {
    return `Absolument ! On privilégie même le long terme. Des relations solides = confiance = meilleurs résultats. On construit des vraies partnerships ! 🌱`
  }

  // TESTER UN CRÉATEUR
  if (/tester|essai|periode.*test/.test(normalized)) {
    return `Oui ! Une marque peut commencer par une collab test (1 post, 1 vidéo) avant de s'engager sur du plus long. Logique et sans risque ! ✅`
  }

  // MARQUES
  if (/marque/.test(normalized)) {
    return `On trouve des marques pertinentes pour toi, on négocie, on gère tout ! Des partenariats qui ont du sens. Tu es créateur ou marque ?`
  }
  
  // NEXUS INFLUENCE (ancien nom)
  if (/nexus.*influence|influence.*nexus/.test(normalized)) {
    return `Nexus Influence était notre ancien nom ! On a évolué vers Nexus Circle, qui représente mieux notre vision : créer un cercle vertueux où créateurs, marques et communautés sont connectés. Le "Circle" symbolise l'union, la continuité, l'équilibre... Un écosystème complet et harmonieux plutôt qu'une simple "influence". Plus humain, plus authentique ! 🔄✨`
  }

  // NEXUS GÉNÉRAL
  if (/cest quoi|quest-ce|nexus/.test(normalized)) {
    return `Nexus Circle : agence d'accompagnement de créateurs. On t'aide à te professionnaliser, monétiser, et trouver des collabs quali. Mission : créer un cercle vertueux entre créateurs, marques et communautés ! Qu'est-ce qui t'intéresse ? 🔄`
  }
  
  // SALUT
  if (/^(salut|bonjour|hey|yo|cc)$/.test(normalized)) {
    return `Hey ! 👋 Qu'est-ce que je peux faire pour toi ?`
  }
  
  // MERCI
  if (/merci|thank/.test(normalized)) {
    return `Avec plaisir ! 😊 D'autres questions ?`
  }

  // ÂGE (attention à ne pas confondre avec engagement)
  if (/\bage\b/.test(normalized) && !/engagement/.test(normalized)) {
    return `Pour les questions d'âge ou autres détails persos de nos créateurs, contacte-nous directement ! On respecte leur vie privée. 😊`
  }
  
  // DÉFAUT
  return `Hmm, je suis pas sûr d'avoir bien compris. Tu peux reformuler ? Ou demande-moi des infos sur nos services, créateurs, tarifs, comment nous rejoindre... Je suis là ! 💬`
}

