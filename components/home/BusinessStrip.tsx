"use client";

import { Mark } from "@/components/brand/Mark";
import { BUSINESSES } from "@/lib/businesses";
import { useCompanySelection } from "./CompanySelection";
import styles from "./BusinessStrip.module.css";

export function BusinessStrip() {
  const { select } = useCompanySelection();
  return (
    <div className={styles.strip}>
      <div className={`container ${styles.grid}`}>
        {BUSINESSES.map((b) => (
          <a key={b.id} href="#companies" className={styles.item} onClick={() => select(b.id)}>
            <Mark entity={b.id} theme="dark" mono={!b.operating} size={24} />
            <span className={styles.text}>
              <span className={styles.name}>
                {b.index} — {b.name}
              </span>
              <span className={styles.status}>{b.operating ? "Operating" : "Planned"}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
