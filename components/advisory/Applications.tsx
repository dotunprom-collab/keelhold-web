"use client";

import { useState } from "react";
import { TECHNOLOGY } from "@/content/advisory";
import styles from "./advisory.module.css";

/** Accordion: one row open at a time; row 01 starts open; clicking the open row closes it. */
export function Applications() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={styles.apps}>
      <div className={styles.appsHeader}>
        <p className={styles.smallCaps}>{TECHNOLOGY.applicationsLabel}</p>
        <p className={styles.appsNote}>{TECHNOLOGY.applicationsNote}</p>
      </div>
      {TECHNOLOGY.applications.map((a, i) => {
        const expanded = open === i;
        return (
          <div key={a.title} className={styles.appRow}>
            <h3 className={styles.appHeading}>
              <button
                type="button"
                id={`app-btn-${i}`}
                aria-expanded={expanded}
                aria-controls={`app-body-${i}`}
                className={styles.appButton}
                onClick={() => setOpen(expanded ? null : i)}
              >
                <span className={styles.appNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.appTitle}>{a.title}</span>
                <span className={styles.appSign} aria-hidden="true">
                  {expanded ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div id={`app-body-${i}`} role="region" aria-labelledby={`app-btn-${i}`} hidden={!expanded} className={styles.appBody}>
              {a.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}
