// Lightweight FR NLP: normalize → tokenize → expand to up to 10 synonyms per keyword.

const FRENCH_STOPWORDS = new Set([
  "le","la","les","un","une","des","du","de","d","au","aux","et","ou","mais","donc","or","ni","car",
  "je","tu","il","elle","on","nous","vous","ils","elles","me","te","se","y","en",
  "ce","cet","cette","ces","mon","ma","mes","ton","ta","tes","son","sa","ses","notre","nos","votre","vos","leur","leurs",
  "est","suis","es","sommes","êtes","sont","été","etre","être","ai","as","avons","avez","ont",
  "à","a","dans","sur","sous","chez","par","pour","avec","sans","vers","entre","deux","plus","moins","très","tres",
  "quoi","que","qui","quand","où","ou","comment","combien","pourquoi","quel","quelle","quels","quelles",
  "c","ca","ça","ceci","cela","là","la","aujourd","hui","aujourd'hui"
])

// Editable dictionary: ensure MAX 10 synonyms per key
export const SYNONYMS = {
  // thème agences/services
  "agence": ["cabinet","studio","collectif","bureau","structure","organisation","société","entreprise","groupement","maison"],
  "service": ["offre","prestation","solution","pack","formule","accompagnement","programme","assistance","aide","support"],
  "accompagnement": ["coaching","conseil","guidance","suivi","mentorat","pilotage","support","cadre","methodologie","plan"],
  "strategie": ["plan","vision","feuille de route","roadmap","approche","positionnement","tactique","orientation","cap","priorites"],
  "marque": ["entreprise","annonceur","client","enseigne","societe","brand","partenaire","organisation","commercant","maison"],
  "createur": ["influenceur","talent","auteur","artiste","producteur","tiktokeur","youtubeur","streamer","instagrammeur","profil"],
  "campagne": ["operation","activation","sponsoring","collaboration","partenariat","lancement","push","promo","brief","projet"],
  "mediakit": ["portfolio","dossier","presentation","press kit","kit media","deck","plaquette","profil","book","pdf"],
  "ugc": ["contenu genere utilisateur","contenu annonceur","video pub","assets pubs","crea ads","video courte","reel","tiktok","script","capsule"],
  
  // prix/devis
  "tarif": ["prix","cout","budget","honoraires","commission","remuneration","facturation","devis","forfait","grille"],
  "budget": ["enveloppe","cout","montant","capex","opex","plafond","moyens","ressources","investissement","range"],
  "devis": ["estimation","proposition","offre","quotation","chiffrage","proforma","evaluation","ordre de grandeur","fourchette","proposition commerciale"],
  "commission": ["pourcentage","fee","retrocommission","part","remuneration","honoraires","marge","prelevement","commissionnement","taux"],
  
  // contenus / formats
  "post": ["publication","story","reel","tiktok","video","carrousel","short","contenu","format","crea"],
  "contenu": ["creation","asset","visuel","video","texte","script","concept","format","production","livrable"],
  "format": ["reel","tiktok","short","story","post","long","live","carousel","capsule","hook"],
  
  // relation / process
  "brief": ["cahier des charges","consignes","instructions","attentes","ligne directrice","guidelines","specs","objectif","scope","requirements"],
  "kpi": ["indicateurs","mesures","metrics","retombees","resultats","portee","engagement","clics","vente","roi"],
  "contrat": ["accord","convention","cgv","cga","licence","cession","bon de commande","engagement","conditions","terms"],
  "paiement": ["reglement","virement","versement","acompte","solde","facture","echeancier","encaissement","paiements","remboursement"],
  
  // niches
  "mode": ["fashion","style","vetement","look","outfit","streetwear","accessoires","luxe","pret-a-porter","maroquinerie"],
  "sport": ["fitness","entrainement","musculation","running","bien-etre","sante","cardio","coaching sportif","performance","recovery"],
  "food": ["cuisine","resto","recette","gastronomie","alimentaire","snacking","boisson","nutrition","degustation","tasting"],
  
  // utilitaires
  "contact": ["email","mail","adresse","formulaire","message","dm","mp","whatsapp","coordonnees","prendre contact"],
  "disponible": ["libre","ouvert","slots","creneaux","planning","calendrier","agenda","date","creneau","dispo"],
  
  // créateurs
  "flo": ["floo","floobdc","floo.bdc"],
  "ola": ["olary","cocaola","cocaola___"],
  "alexis": ["legarspolyvalent","garspolyvalent"],
  "alice": ["rossetalice","rosset"],
  "geo": ["geoffroy","lifeofgeo","life_of_geo"],
  
  // partenaires
  "partenariat": ["collaboration","collab","sponsoring","deal","partnership","accord","contrat","cooperation","alliance","association"]
}

// ---------- Helpers ----------

export function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{Letter}\p{Number}\s@#+]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function singularize(token) {
  // ultra-simple FR singularization (best-effort)
  if (token.endsWith("aux")) return token.slice(0, -3) + "al"
  if (token.endsWith("eaux")) return token.slice(0, -1)
  if (token.endsWith("s") && token.length > 3) return token.slice(0, -1)
  return token
}

export function tokenize(text) {
  const raw = normalize(text).split(" ")
  const tokens = raw
    .filter(t => t && !FRENCH_STOPWORDS.has(t))
    .map(singularize)
  return Array.from(new Set(tokens))
}

export function expandSynonyms(tokens) {
  const out = new Set()
  for (const t of tokens) {
    out.add(t)
    const syns = SYNONYMS[t]
    if (syns && syns.length) {
      // cap to 10
      syns.slice(0, 10).forEach(s => out.add(normalize(s)))
    }
  }
  return Array.from(out)
}

export function extractKeywords(text) {
  const base = tokenize(text)
  const expanded = expandSynonyms(base)
  return { base, expanded }
}

export function matchesAny(haystack, needles) {
  const set = new Set(haystack)
  return needles.some(n => set.has(n))
}

