
import { NextRequest } from "next/server";
import { __addListingMock, type ListingItem, type ListingCategory, type ListingCondition } from "@/lib/marketplace";
import { getSchools } from "@/lib/admissions";

function id() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }

function getUserId(req: NextRequest) {
  // TODO: replace with real auth. For now read header (same as other mocks)
  return req.headers.get("x-demo-user") || "demo-user";
}

export async function POST(req: NextRequest) {
  try {
    const userId = getUserId(req);
    const form = await req.formData();

    const title = String(form.get("title") || "");
    const category = String(form.get("category") || "Other") as ListingCategory;
    const price = Number(form.get("price") || 0);
    const condition = String(form.get("condition") || "Good") as ListingCondition;
    const schoolSlug = String(form.get("schoolSlug") || "");
    const description = String(form.get("description") || "");

    if (!title || !category || !condition || !(price >= 0)) {
      return Response.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const schools = await getSchools();
    const school = schools.find(s => s.slug === schoolSlug);

    // Images (ignored for now to keep costs at zero)
    // const files = form.getAll('images') as File[];

    const row: ListingItem = {
      id: id(),
      title,
      description: description || undefined,
      images: [],
      price,
      currency: "NGN",
      category,
      condition,
      schoolSlug: schoolSlug || undefined,
      schoolName: school?.name || undefined,
      sellerId: userId,
      sellerName: undefined,
      contactWhatsApp: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await __addListingMock(row);

    return Response.redirect(new URL(`/marketplace/${row.id}`, req.url));
  } catch (e: any) {
    return Response.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
