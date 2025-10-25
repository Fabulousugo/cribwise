// List of Nigerian Universities
// Source: NUC (National Universities Commission)

export interface University {
  id: string
  name: string
  abbreviation?: string
  state: string
  type: 'federal' | 'state' | 'private'
}

export const nigerianUniversities: University[] = [
  // Federal Universities
  { id: 'unilag', name: 'University of Lagos', abbreviation: 'UNILAG', state: 'Lagos', type: 'federal' },
  { id: 'ui', name: 'University of Ibadan', abbreviation: 'UI', state: 'Oyo', type: 'federal' },
  { id: 'oau', name: 'Obafemi Awolowo University', abbreviation: 'OAU', state: 'Osun', type: 'federal' },
  { id: 'unn', name: 'University of Nigeria, Nsukka', abbreviation: 'UNN', state: 'Enugu', type: 'federal' },
  { id: 'abu', name: 'Ahmadu Bello University', abbreviation: 'ABU', state: 'Kaduna', type: 'federal' },
  { id: 'uniben', name: 'University of Benin', abbreviation: 'UNIBEN', state: 'Edo', type: 'federal' },
  { id: 'uniport', name: 'University of Port Harcourt', abbreviation: 'UNIPORT', state: 'Rivers', type: 'federal' },
  { id: 'unical', name: 'University of Calabar', abbreviation: 'UNICAL', state: 'Cross River', type: 'federal' },
  { id: 'unilorin', name: 'University of Ilorin', abbreviation: 'UNILORIN', state: 'Kwara', type: 'federal' },
  { id: 'unijos', name: 'University of Jos', abbreviation: 'UNIJOS', state: 'Plateau', type: 'federal' },
  { id: 'unimaid', name: 'University of Maiduguri', abbreviation: 'UNIMAID', state: 'Borno', type: 'federal' },
  { id: 'uniuyo', name: 'University of Uyo', abbreviation: 'UNIUYO', state: 'Akwa Ibom', type: 'federal' },
  { id: 'uniabuja', name: 'University of Abuja', abbreviation: 'UNIABUJA', state: 'FCT', type: 'federal' },
  { id: 'bayero', name: 'Bayero University Kano', abbreviation: 'BUK', state: 'Kano', type: 'federal' },
  { id: 'udusok', name: 'Usmanu Danfodiyo University', abbreviation: 'UDUSOK', state: 'Sokoto', type: 'federal' },
  { id: 'futa', name: 'Federal University of Technology, Akure', abbreviation: 'FUTA', state: 'Ondo', type: 'federal' },
  { id: 'futo', name: 'Federal University of Technology, Owerri', abbreviation: 'FUTO', state: 'Imo', type: 'federal' },
  { id: 'futminna', name: 'Federal University of Technology, Minna', abbreviation: 'FUTMINNA', state: 'Niger', type: 'federal' },
  { id: 'funaab', name: 'Federal University of Agriculture, Abeokuta', abbreviation: 'FUNAAB', state: 'Ogun', type: 'federal' },
  { id: 'fuam', name: 'Federal University of Agriculture, Makurdi', abbreviation: 'FUAM', state: 'Benue', type: 'federal' },
  { id: 'fupre', name: 'Federal University of Petroleum Resources', abbreviation: 'FUPRE', state: 'Delta', type: 'federal' },
  { id: 'noun', name: 'National Open University of Nigeria', abbreviation: 'NOUN', state: 'Lagos', type: 'federal' },
  { id: 'nda', name: 'Nigerian Defence Academy', abbreviation: 'NDA', state: 'Kaduna', type: 'federal' },
  { id: 'fuoye', name: 'Federal University Oye-Ekiti', abbreviation: 'FUOYE', state: 'Ekiti', type: 'federal' },
  { id: 'fudma', name: 'Federal University Dutsin-Ma', abbreviation: 'FUDMA', state: 'Katsina', type: 'federal' },
  { id: 'fulokoja', name: 'Federal University Lokoja', abbreviation: 'FULOKOJA', state: 'Kogi', type: 'federal' },
  { id: 'fuwukari', name: 'Federal University Wukari', abbreviation: 'FUWUKARI', state: 'Taraba', type: 'federal' },
  { id: 'funai', name: 'Federal University Ndufu-Alike', abbreviation: 'FUNAI', state: 'Ebonyi', type: 'federal' },
  { id: 'fulafia', name: 'Federal University Lafia', abbreviation: 'FULAFIA', state: 'Nasarawa', type: 'federal' },

  // State Universities
  { id: 'lasu', name: 'Lagos State University', abbreviation: 'LASU', state: 'Lagos', type: 'state' },
  { id: 'eksu', name: 'Ekiti State University', abbreviation: 'EKSU', state: 'Ekiti', type: 'state' },
  { id: 'aaua', name: 'Adekunle Ajasin University', abbreviation: 'AAUA', state: 'Ondo', type: 'state' },
  { id: 'delsu', name: 'Delta State University', abbreviation: 'DELSU', state: 'Delta', type: 'state' },
  { id: 'imsu', name: 'Imo State University', abbreviation: 'IMSU', state: 'Imo', type: 'state' },
  { id: 'esut', name: 'Enugu State University of Science and Technology', abbreviation: 'ESUT', state: 'Enugu', type: 'state' },
  { id: 'abuad', name: 'Afe Babalola University', abbreviation: 'ABUAD', state: 'Ekiti', type: 'state' },
  { id: 'lautech', name: 'Ladoke Akintola University of Technology', abbreviation: 'LAUTECH', state: 'Oyo', type: 'state' },
  { id: 'oou', name: 'Olabisi Onabanjo University', abbreviation: 'OOU', state: 'Ogun', type: 'state' },
  { id: 'osustech', name: 'Osun State University', abbreviation: 'UNIOSUN', state: 'Osun', type: 'state' },
  { id: 'kasu', name: 'Kaduna State University', abbreviation: 'KASU', state: 'Kaduna', type: 'state' },
  { id: 'ebsu', name: 'Ebonyi State University', abbreviation: 'EBSU', state: 'Ebonyi', type: 'state' },
  { id: 'aksu', name: 'Akwa Ibom State University', abbreviation: 'AKSU', state: 'Akwa Ibom', type: 'state' },
  { id: 'crutech', name: 'Cross River University of Technology', abbreviation: 'CRUTECH', state: 'Cross River', type: 'state' },
  { id: 'asutech', name: 'Abia State University', abbreviation: 'ABSU', state: 'Abia', type: 'state' },
  { id: 'rsust', name: 'Rivers State University', abbreviation: 'RSU', state: 'Rivers', type: 'state' },
  { id: 'gsu', name: 'Gombe State University', abbreviation: 'GSU', state: 'Gombe', type: 'state' },
  { id: 'ksusta', name: 'Kano University of Science and Technology', abbreviation: 'KUST', state: 'Kano', type: 'state' },
  { id: 'tasu', name: 'Taraba State University', abbreviation: 'TSU', state: 'Taraba', type: 'state' },
  { id: 'ysu', name: 'Yobe State University', abbreviation: 'YSU', state: 'Yobe', type: 'state' },

  // Popular Private Universities
  { id: 'covenant', name: 'Covenant University', state: 'Ogun', type: 'private' },
  { id: 'babcock', name: 'Babcock University', state: 'Ogun', type: 'private' },
  { id: 'landmark', name: 'Landmark University', state: 'Kwara', type: 'private' },
  { id: 'pan-atlantic', name: 'Pan-Atlantic University', abbreviation: 'PAU', state: 'Lagos', type: 'private' },
  { id: 'american-uni-nigeria', name: 'American University of Nigeria', abbreviation: 'AUN', state: 'Adamawa', type: 'private' },
  { id: 'ajayi-crowther', name: 'Ajayi Crowther University', state: 'Oyo', type: 'private' },
  { id: 'bingham', name: 'Bingham University', state: 'Nasarawa', type: 'private' },
  { id: 'bowen', name: 'Bowen University', state: 'Osun', type: 'private' },
  { id: 'caleb', name: 'Caleb University', state: 'Lagos', type: 'private' },
  { id: 'crawford', name: 'Crawford University', state: 'Ogun', type: 'private' },
  { id: 'igbinedion', name: 'Igbinedion University', state: 'Edo', type: 'private' },
  { id: 'redeemers', name: "Redeemer's University", state: 'Osun', type: 'private' },
  { id: 'lead-city', name: 'Lead City University', state: 'Oyo', type: 'private' },
  { id: 'madonna', name: 'Madonna University', state: 'Enugu', type: 'private' },
  { id: 'baze', name: 'Baze University', state: 'FCT', type: 'private' },
  { id: 'bells', name: 'Bells University of Technology', state: 'Ogun', type: 'private' },
  { id: 'caritas', name: 'Caritas University', state: 'Enugu', type: 'private' },
  { id: 'godfrey-okoye', name: 'Godfrey Okoye University', state: 'Enugu', type: 'private' },
  { id: 'paul', name: 'Paul University', state: 'Anambra', type: 'private' },
  { id: 'achievers', name: 'Achievers University', state: 'Ondo', type: 'private' },
]

// Helper function to get universities by state
export function getUniversitiesByState(state: string): University[] {
  return nigerianUniversities.filter(uni => uni.state.toLowerCase() === state.toLowerCase())
}

// Helper function to get universities by type
export function getUniversitiesByType(type: 'federal' | 'state' | 'private'): University[] {
  return nigerianUniversities.filter(uni => uni.type === type)
}

// Helper function to search universities
export function searchUniversities(query: string): University[] {
  const lowerQuery = query.toLowerCase()
  return nigerianUniversities.filter(uni => 
    uni.name.toLowerCase().includes(lowerQuery) ||
    uni.abbreviation?.toLowerCase().includes(lowerQuery) ||
    uni.state.toLowerCase().includes(lowerQuery)
  )
}

// Get all states with universities
export function getStatesWithUniversities(): string[] {
  return [...new Set(nigerianUniversities.map(uni => uni.state))].sort()
}