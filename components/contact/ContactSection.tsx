import { CONTACT_EMAIL, type EnquiryType } from "@/lib/enquiry";
import { REGISTERED_OFFICE } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import styles from "./ContactSection.module.css";

export function ContactSection({ defaultType }: { defaultType?: EnquiryType }) {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <p className={`eyebrow ${styles.eyebrow}`}>Contact</p>
          <h2 id="contact-heading" className={styles.heading}>
            Built to hold steady. <span className={styles.accent}>Let’s talk.</span>
          </h2>
          <div className={styles.details}>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <address className={styles.address}>
              {REGISTERED_OFFICE.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>
        <ContactForm defaultType={defaultType} />
      </div>
    </section>
  );
}
