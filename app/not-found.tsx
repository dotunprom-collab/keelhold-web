import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="container" style={{ paddingBlock: 128, display: "flex", flexDirection: "column", gap: 24 }}>
        <p className="eyebrow" style={{ color: "var(--stone-500)" }}>
          Page not found
        </p>
        <h1 className="h2">This page could not be found.</h1>
        <p>
          <Link href="/" style={{ textDecoration: "underline", textDecorationColor: "var(--brass-500)", textUnderlineOffset: 4 }}>
            Return to the homepage
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
