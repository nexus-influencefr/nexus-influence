// Système IA pour NexusBot
export const analyzeAndRespond = (userMessage) => {
  const msg = userMessage.toLowerCase().trim()
  
  const normalized = msg
    .replace(/influance|influens/g, 'influence')
    .replace(/\bsa\b/g, 'ca')
    .replace(/\bc\b/g, 'cest')
    .replace(/\bki\b/g, 'qui')
    .replace(/\bkoi\b/g, 'quoi')
    .replace(/\bpr\b/g, 'pour')
    .replace(/\bpk\b/g, 'pourquoi')
    .replace(/\bvs\b/g, 'vous')
  
  // CRÉATEURS SPÉCIFIQUES
  if (/\bflo\b/.test(normalized)) {
    return `Flo (@floo.bdc), créateur lifestyle & mode ! 4.6K abonnés. Il partage du contenu style et créativité. On l'accompagne sur ses collabs. Tu veux voir son profil ?`
  }
  
  if (/\bola\b|olary/.test(normalized)) {
    return `Olary (@cocaola__), créatrice lifestyle, échecs & Twitch ! 23.3K abonnés. Contenu authentique et passion pour les échecs. On bosse ensemble sur sa stratégie ! Curieux ?`
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

  if (/august|outdoor|ginger/.test(normalized)) {
    return `August Vallat (@outdoorgingerchannel) ! Un créateur outdoor qu'on a accompagné avant même de lancer Nexus Influence officiellement. Il a bossé avec Pierre et Vasco sur sa stratégie et ses partenariats. Un vrai succès ! Tu le connais ?`
  }
  
  // ENGAGEMENT
  if (/taux.*engagement|engagement.*de/.test(normalized) && /alice|flo|olary|alexis|geo/.test(normalized)) {
    return `Les taux d'engagement de nos créateurs sont confidentiels ! Mais tous ont un excellent engagement. Pour en savoir plus : contact@nexusinfluence.fr ! 📊`
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
    return `On n'a pas de grille fixe ! Chaque créateur est unique, donc on adapte nos tarifs selon ton profil, ta commu, et tes objectifs. Contacte-nous pour un devis personnalisé : contact@nexusinfluence.fr 📋`
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
    return `Pas de budget minimum fixe ! On s'adapte. Que tu sois une petite marque ou un gros annonceur, on trouve des solutions. Contacte-nous pour en discuter : contact@nexusinfluence.fr 💼`
  }

  // DEVIS / FORFAIT MARQUE
  if (/devis|forfait.*marque|sur.*mesure/.test(normalized)) {
    return `On fait uniquement du sur-mesure ! Chaque campagne est différente. Dis-nous ton projet, tes objectifs, ton budget, et on te prépare un devis personnalisé. contact@nexusinfluence.fr ✉️`
  }

  // COÛT CAMPAGNE
  if (/cout.*campagne|combien.*campagne|prix.*campagne/.test(normalized)) {
    return `Ça dépend du nombre de créateurs, du type de contenu, de la durée... Une campagne peut aller de quelques centaines à plusieurs milliers d'euros. On te fait un devis précis selon ton projet ! 📊`
  }

  // UGC / CRÉATION CONTENU
  if (/ugc|creation.*contenu/.test(normalized)) {
    return `Pour de la création de contenu UGC, nos tarifs varient selon le créateur, le nombre de contenus, et l'usage. On te met en relation avec le bon profil ! Contacte-nous : contact@nexusinfluence.fr 🎥`
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
    return `Super simple ! Envoie-nous un message à contact@nexusinfluence.fr avec ton projet, tes besoins, et on te prépare un devis sur-mesure sous 48h max ! ✉️`
  }
  
  // SERVICES
  if (/service|offre|proposez/.test(normalized)) {
    return `On propose : stratégie & audit, media kit pro, négo avec marques, monétisation, conseil business... Tout sur-mesure ! Un service t'intéresse ?`
  }
  
  // DEVENIR CRÉATEUR
  if (/(devenir|rejoindre).*(createur|nexus)/.test(normalized)) {
    return `Envoie ton profil à contact@nexusinfluence.fr avec 2-3 lignes sur toi ! On étudie chaque profil et on revient vite. Tu as déjà une commu ?`
  }
  
  // FONDATEURS
  if (/fondateur|pierre|vasco/.test(normalized)) {
    return `Pierre O'Neill et Vasco Preun, deux jeunes entrepreneurs passionnés ! Leur mission : rendre l'influence plus humaine et pro. 🚀`
  }
  
  // CONTACT
  if (/contact|email|mail/.test(normalized)) {
    return `Email : contact@nexusinfluence.fr ou tél : 06 26 45 21 65. On répond vite ! Tu as un projet ?`
  }
  
  // TARIFS DES CRÉATEURS SPÉCIFIQUES
  if (/(tarif|prix|coute|combien)/.test(normalized) && /flo|ola|alice|alexis|geo|geoffroy/.test(normalized)) {
    return `Pour découvrir les tarifs de nos créateurs, contacte-nous par email à contact@nexusinfluence.fr ou sur Instagram @nexus__influence ! On te donnera tous les détails. 💰`
  }
  
  // TARIFS GÉNÉRAUX
  if (/tarif|prix|coute/.test(normalized)) {
    return `Nos conditions varient selon l'accompagnement. Toujours équitable et transparent ! Pour ton cas : contact@nexusinfluence.fr`
  }
  
  // MARQUES
  if (/marque/.test(normalized)) {
    return `On trouve des marques pertinentes pour toi, on négocie, on gère tout ! Des partenariats qui ont du sens. Tu es créateur ou marque ?`
  }
  
  // NEXUS GÉNÉRAL
  if (/cest quoi|quest-ce|nexus/.test(normalized)) {
    return `Nexus Influence : agence d'accompagnement de créateurs. On t'aide à te professionnaliser, monétiser, et trouver des collabs quali. Mission : rendre l'influence plus humaine ! Qu'est-ce qui t'intéresse ?`
  }
  
  // SALUT
  if (/^(salut|bonjour|hey|yo|cc)$/.test(normalized)) {
    return `Hey ! 👋 Qu'est-ce que je peux faire pour toi ?`
  }
  
  // MERCI
  if (/merci|thank/.test(normalized)) {
    return `Avec plaisir ! 😊 D'autres questions ?`
  }
  
  // DÉFAUT
  return `Hmm, je suis pas sur d'avoir bien compris. Tu peux reformuler ? Ou demande-moi des infos sur nos services, créateurs, comment nous rejoindre... Je suis la !`
}

