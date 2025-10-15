// app/properties/page.tsx
import { Suspense } from "react";
import PropertiesPageClient from "./properties-client";

export const dynamic = "force-dynamic"; // ok to remove if you don't rely on query at build

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4 text-slate-600">Loading…</div>}>
      <PropertiesPageClient />
    </Suspense>
  );
}
