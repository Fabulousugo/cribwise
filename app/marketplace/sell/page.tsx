import Link from "next/link";
import { getSchools } from "@/lib/admissions";
import type { School } from "../../types/admissions";

export const dynamic = "force-dynamic";

export default async function SellPage() {
  const schools = await getSchools();

  return (
    <main className="max-w-3xl mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Sell an item</h1>
        <p className="text-slate-600">List textbooks, electronics, and more for fellow students.</p>
      </header>

      <form action="/api/marketplace/create" method="post" encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input name="title" required className="mt-1 w-full border rounded-md px-3 py-2" placeholder="e.g., CSC201 textbook" />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select title="category" name="category" required className="mt-1 w-full border rounded-md px-3 py-2">
            <option value="Textbooks">Textbooks</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Fashion">Fashion</option>
            <option value="Services">Services</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium">Price (₦)</label>
            <input title="price" name="price" type="number" min="0" required className="mt-1 w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Condition</label>
            <select title="condition" name="condition" required className="mt-1 w-full border rounded-md px-3 py-2">
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="For Parts">For Parts</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">School</label>
            <select title="school" name="schoolSlug" className="mt-1 w-full border rounded-md px-3 py-2">
              <option value="">—</option>
              {schools.map((s: School) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" rows={5} className="mt-1 w-full border rounded-md px-3 py-2" placeholder="Add details, condition notes, pickup location…" />
        </div>
        <div>
          <label className="block text-sm font-medium">Photos (up to 4)</label>
          <input title="photos" type="file" name="images" multiple accept="image/*" className="mt-1 w-full" />
          <p className="text-xs text-slate-500 mt-1">Images are optional for now. We'll wire storage later.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create listing</button>
          <Link href="/marketplace" className="text-sm text-blue-600 hover:underline">Cancel</Link>
        </div>
      </form>
    </main>
  );
}
