import type { Metadata } from "next";
import Link from "next/link";
import { Applications } from "@/components/advisory/Applications";
import { HowWeWork } from "@/components/advisory/HowWeWork";
import { PracticeTabs } from "@/components/advisory/PracticeTabs";
import { SectionNav } from "@/components/advisory/SectionNav";
import { ServiceBoundaries } from "@/components/advisory/ServiceBoundaries";
import styles from "@/components/advisory/advisory.module.css";
import { BigMark } from "@/components/brand/BigMark";
import { Mark } from "@/components/brand/Mark";
import { ButtonLink } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CLIENTS, HERO, INTRO, LEGAL, SERVICES, SHOW_HERO_MARK, TECHNOLOGY } from "@/content/advisory";
import { FUNDCORRIDOR_URL, getBusiness } from "@/lib/businesses";
import { REGISTERED_OFFICE } from "@/lib/site";

const TITLE = "Keelhold Advisory — Financial Advisory. Transaction Support. Investment Technology.";
const DESCRIPTION =
  "Keelhold Advisory provides financial analysis, modelling, transaction support and technology-enabled solutions to businesses, investors and smaller investment firms.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/advisory" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/advisory" },
};

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default function AdvisoryPage() {
  const software = getBusiness("software");

  return (
    <>
      <Header />
      <main id="main">
        {/* 2. Hero */}
        <section className={styles.hero} aria-labelledby="advisory-heading" data-screen-label="01 Hero">
          <div className={`container ${styles.heroInner}`}>
            <Link href="/#companies" className={styles.back}>
              <Icon name="arrow-left" size={16} />
              All companies
            </Link>
            <div className={styles.heroRow}>
              <div className={`rise ${styles.heroLeft}`} style={{ animationDelay: "80ms" }}>
                <p className={`eyebrow ${styles.brass}`}>{HERO.eyebrow}</p>
                <h1 id="advisory-heading" className={styles.heroTitle} aria-label={HERO.lines.join(" ")}>
                  {HERO.lines.flatMap((line, i) =>
                    line.split(" ").map((word) =>
                      i === HERO.lines.length - 1 ? <em key={word}>{word}</em> : <span key={word}>{word}</span>,
                    ),
                  )}
                </h1>
              </div>
              <div className={`rise ${styles.heroRight}`} style={{ animationDelay: "200ms" }}>
                {SHOW_HERO_MARK ? <BigMark entity="advisory" size={132} frame={11} /> : <span aria-hidden="true" />}
                <div className={styles.heroBottom}>
                  <span className={styles.heroRule} aria-hidden="true" />
                  <p className={styles.heroBody}>{HERO.body}</p>
                  <div className={styles.heroCtas}>
                    <ButtonLink href="/contact" variant="accent" size="lg" icon="arrow-right">
                      Discuss your requirements
                    </ButtonLink>
                    <ButtonLink href="#services" variant="outlineInverse" size="lg">
                      Explore our services
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.descriptors}>
            <ul className={`container ${styles.descriptorGrid}`}>
              {HERO.descriptors.map((d, i) => (
                <li key={d} className={styles.descriptor}>
                  <span className={styles.descriptorNum}>{pad(i)}</span>
                  <span className={styles.descriptorLabel}>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Section links */}
        <SectionNav />

        {/* 4. Introduction */}
        <section id="overview" className={`${styles.section} ${styles.paper}`} aria-labelledby="overview-heading">
          <div className={`container ${styles.introGrid}`}>
            <div className={styles.headingBlock}>
              <p className={`eyebrow ${styles.brassDark}`}>Introduction</p>
              <h2 id="overview-heading" className={styles.h2}>
                {INTRO.heading}
              </h2>
            </div>
            <div className={styles.introBody}>
              <p className={styles.lead}>{INTRO.lead}</p>
              {INTRO.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Who we work with */}
        <section id="clients" className={`${styles.section} ${styles.sunk}`} aria-labelledby="clients-heading">
          <div className={`container ${styles.stack56}`}>
            <div className={styles.headingBlock}>
              <p className={`eyebrow ${styles.stone}`}>Who we work with</p>
              <h2 id="clients-heading" className={`${styles.h2} ${styles.max720}`}>
                {CLIENTS.heading}
              </h2>
            </div>
            <ol className={styles.clientGrid}>
              {CLIENTS.items.map((c, i) => (
                <li key={c.title} className={`${styles.clientCard} ${c.primary ? styles.clientPrimary : ""}`}>
                  {c.primary && <span className={styles.clientTick} aria-hidden="true" />}
                  <span className={styles.clientNumRow}>
                    <span className={styles.clientNum}>{pad(i)}</span>
                    {c.primary && <span className={styles.primaryTag}>Primary focus</span>}
                  </span>
                  <h3 className={styles.clientTitle}>{c.title}</h3>
                  <p className={styles.clientBody}>{c.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6. Services */}
        <section id="services" className={`${styles.section} ${styles.paper}`} aria-labelledby="services-heading">
          <div className={`container ${styles.stack56}`}>
            <div className={styles.splitHeader}>
              <div className={styles.headingBlock}>
                <p className={`eyebrow ${styles.brassDark}`}>Our services</p>
                <h2 id="services-heading" className={styles.h2}>
                  {SERVICES.heading}
                </h2>
              </div>
              <p className={styles.servicesAside}>{SERVICES.aside}</p>
            </div>
            <PracticeTabs />
          </div>
        </section>

        {/* 7. Technology */}
        <section id="technology" className={`${styles.section} ${styles.deep}`} aria-labelledby="technology-heading">
          <div className={`container ${styles.stack56}`}>
            <div className={styles.techIntro}>
              <div className={styles.headingBlock}>
                <p className={`eyebrow ${styles.brass}`}>{TECHNOLOGY.eyebrow}</p>
                <h2 id="technology-heading" className={styles.h2}>
                  {TECHNOLOGY.heading}
                </h2>
              </div>
              <p className={styles.techBody}>{TECHNOLOGY.body}</p>
            </div>

            <Applications />

            <div className={styles.fc}>
              <div className={styles.fcMain}>
                <p className={styles.fcTags}>
                  <span className={styles.brass}>Associated platform</span>
                  <span>A Keelhold Software product</span>
                </p>
                <p className={styles.fcName}>fundCorridor</p>
                <p className={styles.fcBody}>{TECHNOLOGY.fundCorridor.body}</p>
                {FUNDCORRIDOR_URL && (
                  <div>
                    <a href={FUNDCORRIDOR_URL} target="_blank" rel="noopener" className={styles.fcButton}>
                      Explore fundCorridor
                      <Icon name="arrow-up-right" size={16} />
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  </div>
                )}
              </div>
              <dl className={styles.fcAside}>
                {TECHNOLOGY.fundCorridor.rows.map((r) => (
                  <div key={r.label} className={styles.fcRow}>
                    <dt>{r.label}</dt>
                    <dd>{r.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* 8. How we work */}
        <section id="approach" className={`${styles.section} ${styles.sunk}`} aria-labelledby="approach-heading">
          <div className={`container ${styles.stack48}`}>
            <HowWeWork />
          </div>
        </section>

        {/* Team section can be added here, between How we work and Enquiries, once real. */}

        {/* 9. Enquiries strip */}
        <section className={styles.strip} aria-labelledby="strip-heading">
          <div className={`container ${styles.stripInner}`}>
            <div className={styles.stripText}>
              <p className={`eyebrow ${styles.brass}`}>Enquiries</p>
              <h2 id="strip-heading" className={styles.stripHeading}>
                Have a financial or commercial challenge <em>to solve?</em>
              </h2>
            </div>
            <ButtonLink href="/contact" variant="accent" size="lg" icon="arrow-right">
              Discuss your requirements
            </ButtonLink>
          </div>
        </section>

        {/* 10. Legal & regulatory */}
        <section id="legal" className={styles.legal} aria-labelledby="legal-heading">
          <div className={`container ${styles.legalInner}`}>
            <div className={styles.legalLeft}>
              <p className={`eyebrow ${styles.stone}`}>Legal &amp; regulatory</p>
              <h2 id="legal-heading" className={styles.legalHeading}>
                {LEGAL.heading}
              </h2>
              <p className={styles.legalText}>
                {LEGAL.provider} Registered office: {REGISTERED_OFFICE.join(", ")}.
              </p>
              <p className={styles.legalSmall}>{LEGAL.disclaimer}</p>
            </div>
            <div className={styles.legalRight}>
              <ServiceBoundaries />
            </div>
          </div>
        </section>

        {/* 11. Next */}
        <Link href={`/${software.slug}`} className={styles.next}>
          <span className={`container ${styles.nextInner}`}>
            <span className={styles.nextText}>
              <span className={`eyebrow ${styles.stone}`}>Next</span>
              <span className={styles.nextName}>Keelhold {software.name}</span>
            </span>
            <Mark entity="software" theme="light" size={48} />
          </span>
        </Link>
      </main>
      <Footer />
    </>
  );
}
