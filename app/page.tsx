import type { Metadata } from "next";
import { Status } from "@/components/brand/Status";
import { ContactSection } from "@/components/contact/ContactSection";
import { ButtonLink } from "@/components/core/Button";
import { BusinessStrip } from "@/components/home/BusinessStrip";
import { CompaniesSelector } from "@/components/home/CompaniesSelector";
import { CompanySelectionProvider } from "@/components/home/CompanySelection";
import { HeroMark } from "@/components/home/HeroMark";
import { Letters } from "@/components/home/Letters";
import { NameBand } from "@/components/home/NameBand";
import { Footer } from "@/components/site/Footer";
import { CONTACT_EMAIL } from "@/lib/enquiry";
import { Header } from "@/components/site/Header";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_NAME, SITE_URL } from "@/lib/site";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { title: HOME_TITLE, description: HOME_DESCRIPTION, url: "/" },
};

const PRINCIPLES = [
  {
    title: "Patient capital",
    body: "We invest our own capital with a long-term perspective, prioritising enduring value over short-term exit timelines.",
  },
  {
    title: "One ownership philosophy",
    body: "Each business operates with disciplined capital allocation, shared standards and clear accountability, while maintaining its own financial and operational responsibilities.",
  },
  {
    title: "Owners, not speculators",
    body: "We approach businesses with an ownership mindset, aligning our interests with long-term value creation.",
  },
];

const CAPITAL = [
  { title: "Build", body: "Develop operating businesses, technology and scalable commercial platforms." },
  {
    title: "Acquire",
    body: "Acquire established businesses and assets where there is a compelling opportunity to create value.",
  },
  { title: "Invest", body: "Allocate proprietary capital into attractive businesses, opportunities and investments." },
  { title: "Hold", body: "Compound capital through disciplined ownership and long-term stewardship." },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description: HOME_DESCRIPTION,
  email: CONTACT_EMAIL,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
      />
      <Header overlay />
      <main id="main">
        <CompanySelectionProvider>
          {/* Hero */}
          <section className={styles.hero} aria-labelledby="hero-heading">
            <div className={`container ${styles.heroUpper}`}>
              <div className={styles.heroCopy}>
                <p className={`eyebrow rise ${styles.brass}`} style={{ animationDelay: "100ms" }}>
                  Keelhold Capital Group
                </p>
                <h1 id="hero-heading" className={`rise ${styles.heroTitle}`} style={{ animationDelay: "200ms" }}>
                  Capital held with a low centre of <em>gravity.</em>
                </h1>
                <p className={`rise ${styles.heroLede}`} style={{ animationDelay: "320ms" }}>
                  Keelhold is an independent business and investment group focused on financial advisory, technology and
                  long-term value creation. We help businesses and investors make better financial decisions through
                  rigorous analysis, practical advice and technology-enabled solutions.
                </p>
                <div className={`rise ${styles.ctas}`} style={{ animationDelay: "440ms" }}>
                  <ButtonLink href="#contact" variant="accent" size="lg" icon="arrow-right">
                    Speak with us
                  </ButtonLink>
                  <ButtonLink href="#companies" variant="ghost" size="lg" className={styles.ghostLight}>
                    Our companies
                  </ButtonLink>
                </div>
              </div>
              <div className={`rise ${styles.heroMark}`}>
                <HeroMark />
              </div>
            </div>
            <BusinessStrip />
          </section>

          {/* Approach */}
          <section id="approach" className={styles.approach} aria-labelledby="approach-heading">
            <div className={`container ${styles.approachGrid}`}>
              <div className={styles.stack20}>
                <p className={`eyebrow ${styles.stone}`}>Approach</p>
                <h2 id="approach-heading" className="h2">
                  Weight kept low, so we can stay the course.
                </h2>
              </div>
              <ol className={styles.principles}>
                {PRINCIPLES.map((p, i) => (
                  <li key={p.title} className={styles.principle}>
                    <span className={styles.principleNum}>{String(i + 1).padStart(2, "0")}</span>
                    <div className={styles.principleBody}>
                      <h3 className={styles.principleTitle}>{p.title}</h3>
                      <p className={styles.principleText}>{p.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* How we put capital to work */}
          <section id="capital" className={styles.capital} aria-labelledby="capital-heading">
            <div className={`container ${styles.capitalInner}`}>
              <div className={styles.capitalHeader}>
                <div className={styles.stack20}>
                  <p className={`eyebrow ${styles.brass}`}>Capital allocation</p>
                  <h2 id="capital-heading" className={`h2 ${styles.capitalTitle}`}>
                    How we put capital to work.
                  </h2>
                </div>
                <p className={styles.capitalLede}>The common philosophy connecting the group’s four business areas.</p>
              </div>
              <ol className={styles.capitalCols}>
                {CAPITAL.map((c, i) => (
                  <li key={c.title} className={styles.capitalCol}>
                    <span className={styles.tick} aria-hidden="true" />
                    <span className={styles.capitalNum}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className={styles.capitalColTitle}>{c.title}</h3>
                    <p className={styles.capitalText}>{c.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <NameBand />

          {/* Companies */}
          <section id="companies" className={styles.companies} aria-labelledby="companies-heading">
            <div className={`container ${styles.companiesInner}`}>
              <div className={styles.companiesHeader}>
                <div className={styles.stack20}>
                  <p className={`eyebrow ${styles.stone}`}>The group</p>
                  <h2 id="companies-heading" className="h2">
                    Four business areas. One mark.
                  </h2>
                </div>
                <div className={styles.legend}>
                  <Status operating label="Initial operating business" tone="light" />
                  <Status operating={false} label="Future investment business" tone="light" />
                </div>
              </div>
              <CompaniesSelector />
            </div>
          </section>
        </CompanySelectionProvider>

        {/* Letters & reports */}
        <section id="letters" className={styles.letters} aria-labelledby="letters-heading">
          <div className={`container ${styles.lettersInner}`}>
            <div className={styles.stack20}>
              <p className={`eyebrow ${styles.stone}`}>Publications</p>
              <h2 id="letters-heading" className="h2">
                Letters &amp; reports
              </h2>
            </div>
            <Letters />
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
