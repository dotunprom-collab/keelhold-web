import Link from "next/link";
import { Lockup } from "@/components/brand/Lockup";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
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
          <NavLinks />
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
