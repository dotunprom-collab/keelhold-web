import Link from "next/link";
import { Lockup } from "@/components/brand/Lockup";
import { Icon } from "@/components/core/Icon";
import { BUSINESSES, FUNDCORRIDOR_URL } from "@/lib/businesses";
import { CONTACT_EMAIL } from "@/lib/enquiry";
import { REGISTERED_OFFICE } from "@/lib/site";
import { CookieSettingsButton } from "./CookieConsent";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" aria-label="Keelhold Capital Group — home" className={styles.home}>
              <Lockup theme="dark" size={36} />
            </Link>
          </div>

          <nav aria-labelledby="footer-companies" className={styles.col}>
            <h2 id="footer-companies" className={`eyebrow ${styles.heading}`}>
              Companies
            </h2>
            <ul className={styles.list}>
              {BUSINESSES.map((b) => (
                <li key={b.id}>
                  <Link href={`/${b.slug}`}>Keelhold {b.name}</Link>
                </li>
              ))}
              <li className={styles.muted}>
                {FUNDCORRIDOR_URL ? (
                  <a href={FUNDCORRIDOR_URL} target="_blank" rel="noopener noreferrer" className={styles.external}>
                    fundCorridor
                    <Icon name="arrow-up-right" size={14} />
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                ) : (
                  "fundCorridor"
                )}
              </li>
            </ul>
          </nav>

          <div className={styles.col}>
            <h2 className={`eyebrow ${styles.heading}`}>Contact</h2>
            <ul className={styles.list}>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
              <li className={styles.muted}>
                <address className={styles.address}>
                  {REGISTERED_OFFICE.map((line, i) => (
                    <span key={line}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            </ul>
          </div>

          <nav aria-labelledby="footer-legal" className={styles.col}>
            <h2 id="footer-legal" className={`eyebrow ${styles.heading}`}>
              Legal
            </h2>
            <ul className={styles.list}>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Use</Link>
              </li>
              <li>
                <CookieSettingsButton className={styles.linkButton} />
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.disclosure}>
            Keelhold Capital Group is the trading name of [legal entity name], a company registered in [jurisdiction]
            under number [company number]. Services are provided by the legal entity identified on each business page.
            [Regulatory status statement to be confirmed by counsel.] Nothing on this website constitutes an offer,
            solicitation or recommendation to buy or sell any investment.
          </p>
          <p>© {new Date().getFullYear()} Keelhold Capital Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
