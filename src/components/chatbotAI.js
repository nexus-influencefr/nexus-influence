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
  
  // COMMISSION
  if (/commission|prenez combien/.test(normalized)) {
    return `Entre 15-25% sur les collabs qu'on gère, ou forfait mensuel. Chaque cas est unique, toujours en transparence ! Pour ton cas : contact@nexusinfluence.fr`
  }
  
  // RENTABLE CRÉATEUR
  if (/rentable/.test(normalized)) {
    return `Très rentable ! Nos créateurs augmentent leurs revenus de 150-300% en moyenne. Meilleures négo, plus de collabs, nouvelles sources... L'investissement se rentabilise vite !`
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
  
  // TARIFS
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

