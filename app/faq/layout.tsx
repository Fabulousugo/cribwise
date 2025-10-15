// ==========================================
// FILE: app/faq/layout.tsx
// Shared layout for all /faq pages
// ==========================================
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "FAQ | CribWise",
    template: "%s | CribWise",
  },
  description:
    "Frequently asked questions about CribWise. Learn how students and agents verify, book, pay, and stay safe.",
  alternates: { canonical: "/faq" },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen bg-background">{children}</main>;
}
