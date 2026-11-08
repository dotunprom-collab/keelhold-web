import Link from "next/link";
import { ContactSection } from "@/components/contact/ContactSection";
import { Icon } from "@/components/core/Icon";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import styles from "./LegalPage.module.css";

export function LegalPage({ title }: { title: string }) {
  return (
    <>
      <Header />
      <main id="main">
        <article className={styles.article}>
          <Link href="/" className={styles.back}>
            <Icon name="arrow-left" size={16} />
            Home
          </Link>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.body}>
            <p>[Final text to be supplied by counsel.]</p>
          </div>
        </article>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
