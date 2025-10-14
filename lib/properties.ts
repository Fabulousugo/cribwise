// lib/properties.ts

// ---------- Types ----------
export type PropertyType = "Apartment" | "Self-Contain" | "Flat" | "Shared" | "Studio"

export type Landlord = {
  name: string
  phone: string
  verified: boolean
}

export type Property = {
  id: number
  title: string
  description: string
  location: string           // e.g. "Akoka, Lagos"
  university: string         // e.g. "University of Lagos (UNILAG)"
  price: number              // yearly NGN
  type: PropertyType
  bedrooms: number
  bathrooms: number
  amenities: string[]
  images: string[]
  verified: boolean
  landlord: Landlord
  address: string
  available: boolean
  lat?: number
  lng?: number
  createdAt?: string
  mapZoom?: number     // optional per-listing
  mapRadius?: number   // optional per-listing (meters)
}

// ---------- Data ----------
export const properties: Property[] = [
  {
    id: 1,
    title: "Modern 2 Bedroom Apartment",
    description:
      "Spacious 2-bedroom apartment with modern fittings, located in a secure estate just 10 minutes walk from UNILAG main gate. Features include 24/7 security, backup generator, and ample parking space.",
    location: "Akoka, Lagos",
    university: "University of Lagos (UNILAG)",
    price: 180000,
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["WiFi", "Generator", "Security", "Parking", "Water Supply"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
    ],
    verified: true,
    landlord: { name: "Mr. Adebayo", phone: "0803-XXX-XXXX", verified: true },
    address: "15 Iwaya Road, Akoka",
    available: true,
    lat: 6.517,  // approx Akoka
    lng: 3.39,
    createdAt: "2025-09-20T09:12:00.000Z",
  },
  {
    id: 2,
    title: "Affordable Self-Contain",
    description:
      "Clean and comfortable self-contain room perfect for students. Includes basic furniture, shared kitchen access, and reliable power supply.",
    location: "Bodija, Ibadan",
    university: "University of Ibadan (UI)",
    price: 85000,
    type: "Self-Contain",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Furnished", "Shared Kitchen", "Security"],
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
    ],
    verified: true,
    landlord: { name: "Mrs. Okafor", phone: "0805-XXX-XXXX", verified: true },
    address: "22 Awolowo Avenue, Bodija",
    available: true,
    lat: 7.4416,  // approx Bodija
    lng: 3.896,
    createdAt: "2025-10-01T14:05:00.000Z",
  },
  {
    id: 3,
    title: "Spacious 3 Bedroom Flat",
    description:
      "Large 3-bedroom flat ideal for students who want to share. Located in a quiet neighborhood with easy access to campus. All rooms are en-suite.",
    location: "Ota, Ogun State",
    university: "Covenant University",
    price: 250000,
    type: "Flat",
    bedrooms: 3,
    bathrooms: 3,
    amenities: ["WiFi", "Generator", "Security", "Parking", "Serviced"],
    images: [
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
    ],
    verified: true,
    landlord: { name: "Chief Akinola", phone: "0807-XXX-XXXX", verified: true },
    address: "Covenant University Road, Km 10",
    available: true,
    lat: 6.697,   // approx Ota
    lng: 3.236,
    createdAt: "2025-08-29T11:30:00.000Z",
  },
  {
    id: 4,
    title: "Budget Friendly Shared Room",
    description:
      "Shared accommodation for 2 students. Perfect for those on a tight budget. Includes study desk, wardrobe, and reliable internet.",
    location: "Ile-Ife, Osun",
    university: "Obafemi Awolowo University (OAU)",
    price: 45000,
    type: "Shared",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Furnished", "Study Area"],
    images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800"],
    verified: false,
    landlord: { name: "Mr. Bakare", phone: "0809-XXX-XXXX", verified: false },
    address: "Mayfair Area, OAU",
    available: true,
    lat: 7.487,
    lng: 4.556,
    createdAt: "2025-07-18T10:00:00.000Z",
  },
  {
    id: 5,
    title: "Luxury Studio Apartment",
    description:
      "Premium studio apartment with all modern amenities. Fully furnished with air conditioning, smart TV, and high-speed internet. Located in upscale area.",
    location: "Ugbowo, Benin City",
    university: "University of Benin (UNIBEN)",
    price: 150000,
    type: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "AC", "Fully Furnished", "Generator", "Security", "Smart TV"],
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
    ],
    verified: true,
    landlord: { name: "Dr. Eze", phone: "0806-XXX-XXXX", verified: true },
    address: "Ring Road, Ugbowo",
    available: true,
    lat: 6.335,
    lng: 5.603,
    createdAt: "2025-06-30T08:45:00.000Z",
  },
  {
    id: 6,
    title: "2 Bedroom Duplex",
    description:
      "Beautiful duplex with 2 bedrooms upstairs and living area downstairs. Perfect for students who want privacy and comfort. Gated compound with 24/7 security.",
    location: "Yaba, Lagos",
    university: "University of Lagos (UNILAG)",
    price: 280000,
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Generator", "Security", "Parking", "Gated Estate"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    ],
    verified: true,
    landlord: { name: "Mrs. Ibrahim", phone: "0802-XXX-XXXX", verified: true },
    address: "Herbert Macaulay Way, Yaba",
    available: false,
    lat: 6.509,
    lng: 3.378,
    createdAt: "2025-10-03T12:20:00.000Z",
  },
  {
    id: 7,
    title: "Single Room Self-Contain",
    description:
      "Compact self-contain perfect for solo students. Clean, safe, and affordable. Includes basic furniture and shared laundry area.",
    location: "Nsukka, Enugu",
    university: "University of Nigeria, Nsukka (UNN)",
    price: 70000,
    type: "Self-Contain",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Security", "Water Supply", "Furnished"],
    images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800"],
    verified: true,
    landlord: { name: "Mr. Nwachukwu", phone: "0808-XXX-XXXX", verified: true },
    address: "University Road, Nsukka",
    available: true,
    lat: 6.8568,
    lng: 7.3997,
    mapZoom: 17,
    mapRadius: 120,
    createdAt: "2025-09-10T09:00:00.000Z",
  },
  {
    id: 8,
    title: "3 Bedroom Apartment Near Campus",
    description:
      "Newly renovated 3-bedroom apartment just 5 minutes from campus gate. Ideal for students sharing. Includes kitchen appliances and furniture.",
    location: "Zaria, Kaduna",
    university: "Ahmadu Bello University (ABU)",
    price: 200000,
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["Furnished", "Generator", "Security", "Kitchen Appliances"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800",
    ],
    verified: true,
    landlord: { name: "Alhaji Musa", phone: "0810-XXX-XXXX", verified: true },
    address: "Samaru, Zaria",
    available: true,
    lat: 11.151,
    lng: 7.654,
    createdAt: "2025-09-28T16:10:00.000Z",
  },
]

// ---------- (Optional) helpers ----------
export function getPropertyById(id: number) {
  return properties.find((p) => p.id === id)
}

export function listProperties(opts?: {
  q?: string
  max?: number
  type?: PropertyType | "all"
  verifiedOnly?: boolean
  sort?: "recommended" | "price-asc" | "price-desc" | "newest"
}) {
  const { q = "", max, type = "all", verifiedOnly = false, sort = "recommended" } = opts || {}
  const ql = q.trim().toLowerCase()

  let result = properties.filter((p) => {
    const matchesQ =
      !ql || p.location.toLowerCase().includes(ql) || p.university.toLowerCase().includes(ql)
    const matchesMax = typeof max === "number" ? p.price <= max : true
    const matchesType = type === "all" ? true : p.type === type
    const matchesVerified = verifiedOnly ? p.verified : true
    return matchesQ && matchesMax && matchesType && matchesVerified
  })

  result = result.sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "newest": {
        const at = a.createdAt ? new Date(a.createdAt).getTime() : a.id
        const bt = b.createdAt ? new Date(b.createdAt).getTime() : b.id
        return bt - at
      }
      case "recommended":
      default:
        if (a.verified !== b.verified) return a.verified ? -1 : 1
        return a.price - b.price
    }
  })

  return result
}
