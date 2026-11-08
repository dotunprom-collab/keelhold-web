import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BigMark } from "@/components/brand/BigMark";
import { Mark } from "@/components/brand/Mark";
import { Status } from "@/components/brand/Status";
import { ContactSection } from "@/components/contact/ContactSection";
import { Button, ButtonLink } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { BUSINESSES, FUNDCORRIDOR_URL, getBusinessBySlug, getNextBusiness } from "@/lib/businesses";
import styles from "./business.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return BUSINESSES.map((b) => ({ business: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[business]">): Promise<Metadata> {
  const business = getBusinessBySlug((await params).business);
  if (!business) return {};
  const title = `Keelhold ${business.name}`;
  return {
    title,
    description: business.description,
    alternates: { canonical: `/${business.slug}` },
    openGraph: { title: `${title} — Keelhold Capital Group`, description: business.description, url: `/${business.slug}` },
  };
}

export default async function BusinessPage({ params }: PageProps<"/[business]">) {
  const business = getBusinessBySlug((await params).business);
  if (!business) notFound();
  const next = getNextBusiness(business);

  return (
    <>
      <Header />
      <main id="main">
        <section className={styles.hero} aria-labelledby="business-heading">
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <Link href="/#companies" className={`rise ${styles.back}`} style={{ animationDelay: "80ms" }}>
                <Icon name="arrow-left" size={16} />
                All companies
              </Link>
              <p className={`eyebrow rise ${styles.eyebrow}`} style={{ animationDelay: "160ms" }}>
                {business.index} · {business.category}
              </p>
              <h1 id="business-heading" className={`rise ${styles.title}`} style={{ animationDelay: "240ms" }}>
                Keelhold {business.name}
              </h1>
              <div className={`rise ${styles.heroMeta}`} style={{ animationDelay: "320ms" }}>
                <p className={styles.description}>{business.description}</p>
                <Status operating={business.operating} label={business.status} tone="dark" />
              </div>
            </div>
            <div className={`rise ${styles.heroMark}`}>
              <BigMark entity={business.id} size={320} />
            </div>
          </div>
        </section>

        <section className={styles.body} aria-label={`About Keelhold ${business.name}`}>
          <div className={`container ${styles.bodyGrid}`}>
            <div className={styles.block}>
              <p className={`eyebrow ${styles.stone}`}>Status</p>
              <p className={styles.statement}>
                {business.operating
                  ? `Keelhold ${business.name} is one of the group’s initial operating businesses.`
                  : `Keelhold ${business.name} is a planned business line of the group and is not yet operational.`}
              </p>
            </div>

            <div className={styles.card}>
              {business.product ? (
                <>
                  <p className={`eyebrow ${styles.brass}`}>Featured product</p>
                  <p className={styles.product}>{business.product}</p>
                  <p className={styles.stone}>A Keelhold Technology product.</p>
                  <div>
                    {FUNDCORRIDOR_URL ? (
                      <ButtonLink
                        href={FUNDCORRIDOR_URL}
                        variant="secondary"
                        icon="arrow-up-right"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit {business.product}
                      </ButtonLink>
                    ) : (
                      <Button variant="secondary" icon="arrow-up-right" disabled title="Link available soon">
                        Visit {business.product}
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <p className={`eyebrow ${styles.brass}`}>Enquiries</p>
                  <p className={styles.statement}>
                    {business.operating
                      ? `Speak with the ${business.name} team.`
                      : `Opportunities relevant to ${business.name} are welcome.`}
                  </p>
                  <div>
                    <ButtonLink href="#contact" variant="primary" icon="arrow-right">
                      Get in touch
                    </ButtonLink>
                  </div>
                </>
              )}
            </div>

            <p className={styles.legal}>Provided by {business.legalEntity}.</p>
          </div>
        </section>

        <Link href={`/${next.slug}`} className={styles.next}>
          <span className={`container ${styles.nextInner}`}>
            <span className={styles.nextText}>
              <span className={`eyebrow ${styles.stone}`}>Next</span>
              <span className={styles.nextName}>Keelhold {next.name}</span>
            </span>
            <Mark entity={next.id} theme="light" size={48} />
          </span>
        </Link>

        <ContactSection defaultType={business.enquiryType} />
      </main>
      <Footer />
    </>
  );
}
