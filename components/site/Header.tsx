import Link from "next/link";
import { Lockup } from "@/components/brand/Lockup";
import { ButtonLink } from "@/components/core/Button";
import { MobileMenu } from "./MobileMenu";
import { CONTACT_HREF, NAV_LINKS } from "./nav";
import styles from "./Header.module.css";

/** `overlay` sits transparently over the homepage hero; otherwise a static navy bar. */
export function Header({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={`${styles.header} ${overlay ? styles.overlay : styles.solid}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.home} aria-label="Keelhold Capital Group — home">
          <Lockup theme="dark" size={40} />
        </Link>
        <nav aria-label="Primary" className={styles.nav}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </Link>
          ))}
          <ButtonLink href={CONTACT_HREF} variant="inverse" size="sm">
            Contact
          </ButtonLink>
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
