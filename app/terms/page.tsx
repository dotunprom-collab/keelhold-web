import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms governing use of the Keelhold Capital Group website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPage title="Terms of Use" />;
}
