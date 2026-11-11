import type { Metadata } from "next";
import Link from "next/link";
import { AdvisoryEnquiryForm } from "@/components/contact/AdvisoryEnquiryForm";
import { Icon } from "@/components/core/Icon";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CONTACT_EMAIL } from "@/lib/enquiry";
import { REGISTERED_OFFICE } from "@/lib/site";
import styles from "./contact.module.css";

const TITLE = "Contact — Keelhold Advisory";
const DESCRIPTION = "Discuss your financial, transaction or finance automation requirements with Keelhold Advisory.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main" className={styles.section}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.intro}>
            <Link href="/advisory" className={styles.back}>
              <Icon name="arrow-left" size={16} />
              Keelhold Advisory
            </Link>
            <p className={`eyebrow ${styles.brass}`}>Enquiries</p>
            <h1 className={styles.title}>
              Have a financial or commercial challenge <em>to solve?</em>
            </h1>
            <p className={styles.text}>
              Tell us what you are working on. We would be pleased to discuss your requirements and determine whether our
              services are appropriate.
            </p>
            <div className={styles.details}>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <p>{REGISTERED_OFFICE.join(", ")}</p>
            </div>
          </div>
          <AdvisoryEnquiryForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
