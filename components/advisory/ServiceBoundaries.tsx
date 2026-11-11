"use client";

import { useState } from "react";
import { LEGAL } from "@/content/advisory";
import styles from "./advisory.module.css";

export function ServiceBoundaries() {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.boundaries}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="service-boundaries"
        className={styles.boundaryToggle}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.smallCaps}>Service boundaries</span>
        <span className={styles.boundaryAction}>{open ? "Hide −" : "Show +"}</span>
      </button>
      <div id="service-boundaries" hidden={!open}>
        <table className={styles.boundaryTable}>
          <thead>
            <tr>
              <th scope="col">What we provide</th>
              <th scope="col">What it is not</th>
            </tr>
          </thead>
          <tbody>
            {LEGAL.boundaries.map((b) => (
              <tr key={b.provide}>
                <td>{b.provide}</td>
                <td>{b.not}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
