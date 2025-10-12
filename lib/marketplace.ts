// ==========================================
// FILE: lib/marketplace.ts
// Student Marketplace — mock data now + Supabase-ready skeleton (commented)
// ==========================================

export type ListingCategory =
  | "Accommodation" // optional cross-link
  | "Textbooks"
  | "Electronics"
  | "Furniture"
  | "Fashion"
  | "Services"
  | "Other";

export type ListingCondition = "New" | "Like New" | "Good" | "Fair" | "For Parts";

export interface ListingItem {
  id: string;
  title: string;
  description?: string;
  images: string[]; // public URLs (later: storage)
  price: number; // NGN minor units optional later
  currency?: "NGN";
  category: ListingCategory;
  condition: ListingCondition;
  schoolSlug?: string; // campus
  schoolName?: string;
  sellerId?: string; // user id
  sellerName?: string;
  contactWhatsApp?: string; // optional masked
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface ListingFilters {
  categories: ListingCategory[];
  conditions: ListingCondition[];
}

export interface GetListingsParams {
  q?: string;
  schoolSlug?: string;
  category?: ListingCategory | "";
  minPrice?: number;
  maxPrice?: number;
  condition?: ListingCondition | "";
}

let LISTINGS: ListingItem[] = [
  {
    id: "l1",
    title: "CSC201 Textbook (Data Structures) — Shaum's Outline",
    description: "Clean copy, few highlights. Pickup on campus.",
    images: [],
    price: 5500,
    currency: "NGN",
    category: "Textbooks",
    condition: "Good",
    schoolSlug: "unilag",
    schoolName: "University of Lagos (UNILAG)",
    sellerId: "u_demo",
    sellerName: "Ada",
    contactWhatsApp: "+2348012345678",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "l2",
    title: "Used HP Laptop 8GB/256GB",
    description: "Battery 4+ hours, perfect for coding.",
    images: [],
    price: 185000,
    currency: "NGN",
    category: "Electronics",
    condition: "Like New",
    schoolSlug: "ui",
    schoolName: "University of Ibadan (UI)",
    sellerId: "u_demo",
    sellerName: "Bayo",
    contactWhatsApp: "+2348098765432",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function norm(s?: string) { return (s || "").trim().toLowerCase(); }
function includes(h: string, q: string) { return norm(h).includes(norm(q)); }

export async function getListings(params: GetListingsParams = {}): Promise<ListingItem[]> {
  const { q = "", schoolSlug = "", category = "", minPrice, maxPrice, condition = "" } = params;

  // Supabase version (swap later)
  /*
  import { createClient } from '@supabase/supabase-js';
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  let query = supabase.from('marketplace_listings').select('*');
  if (q) query = query.ilike('title', `%${q}%`);
  if (schoolSlug) query = query.eq('school_slug', schoolSlug);
  if (category) query = query.eq('category', category);
  if (condition) query = query.eq('condition', condition);
  if (minPrice != null) query = query.gte('price', minPrice);
  if (maxPrice != null) query = query.lte('price', maxPrice);
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data as ListingItem[];
  */

  // Mock filter
  let out = LISTINGS.slice();
  if (q) out = out.filter(l => includes(l.title, q) || includes(l.description || "", q));
  if (schoolSlug) out = out.filter(l => l.schoolSlug === schoolSlug);
  if (category) out = out.filter(l => l.category === category);
  if (condition) out = out.filter(l => l.condition === condition);
  if (minPrice != null) out = out.filter(l => l.price >= minPrice);
  if (maxPrice != null) out = out.filter(l => l.price <= maxPrice);
  out.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return out;
}

export async function getListingById(id: string): Promise<ListingItem | null> {
  return LISTINGS.find(l => l.id === id) ?? null;
}

export async function getMarketplaceFilters(): Promise<ListingFilters> {
  return {
    categories: ["Accommodation","Textbooks","Electronics","Furniture","Fashion","Services","Other"],
    conditions: ["New","Like New","Good","Fair","For Parts"],
  };
}

export async function __addListingMock(l: ListingItem) {
  LISTINGS.unshift(l);
  return l;
}
