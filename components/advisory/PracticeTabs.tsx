"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/core/Icon";
import { PRACTICES } from "@/content/advisory";
import styles from "./advisory.module.css";

const pad = (i: number) => String(i + 1).padStart(2, "0");

export function PracticeTabs() {
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = PRACTICES[index];

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const n = PRACTICES.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setIndex(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className={styles.practicePanel}>
      <div role="tablist" aria-label="Practices" aria-orientation="vertical" className={styles.practiceTabs}>
        {PRACTICES.map((item, i) => {
          const selected = i === index;
          return (
            <button
              key={item.label}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`practice-tab-${i}`}
              aria-selected={selected}
              aria-controls="practice-panel"
              tabIndex={selected ? 0 : -1}
              className={`${styles.practiceTab} ${selected ? styles.practiceTabActive : ""}`}
              onClick={() => setIndex(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <span className={styles.practiceNum}>{pad(i)}</span>
              <span className={styles.practiceStack}>
                <span className={styles.practiceKicker}>Practice {pad(i)}</span>
                <span className={styles.practiceName}>{item.label}</span>
              </span>
              <Icon name="arrow-right" size={18} color="#C9A464" className={styles.practiceArrow} />
            </button>
          );
        })}
      </div>

      <div id="practice-panel" role="tabpanel" aria-labelledby={`practice-tab-${index}`} className={styles.practiceBody}>
        <div className={styles.practiceTop}>
          <p className={`eyebrow ${styles.brassDark}`}>
            Practice {pad(index)} · {p.label}
          </p>
          <h3 className={styles.practiceHeadline}>{p.headline}</h3>
          <p className={styles.practiceIntro}>{p.intro}</p>
        </div>

        <div className={styles.practiceLists}>
          <div>
            <h4 className={`${styles.listHead} ${styles.listHeadNavy}`}>Services</h4>
            <ul className={styles.list}>
              {p.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`${styles.listHead} ${styles.listHeadBrass}`}>Typical deliverables</h4>
            <ul className={`${styles.list} ${styles.listSquares}`}>
              {p.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>

        {p.scope && (
          <div className={styles.scope}>
            <p className={styles.scopeLabel}>Scope of this practice</p>
            <p className={styles.scopeText}>{p.scope}</p>
          </div>
        )}

        <div className={styles.practiceFooter}>
          <Link href={`/contact?type=${encodeURIComponent(p.category)}`} className={styles.practiceButton}>
            Enquire about this practice
            <Icon name="arrow-right" size={16} />
          </Link>
          <span className={styles.practiceCount}>
            {p.services.length} services · {p.deliverables.length} typical deliverables
          </span>
        </div>
      </div>
    </div>
  );
}
