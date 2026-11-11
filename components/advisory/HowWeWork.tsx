"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { HOW_WE_WORK } from "@/content/advisory";
import styles from "./advisory.module.css";

const VIEWS = [
  { id: "approach", label: "Our approach" },
  { id: "engagement", label: "Engagement process" },
] as const;

type View = (typeof VIEWS)[number]["id"];
const pad = (i: number) => String(i + 1).padStart(2, "0");

export function HowWeWork() {
  const [view, setView] = useState<View>("approach");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + VIEWS.length) % VIEWS.length;
    setView(VIEWS[next].id);
    tabs.current[next]?.focus();
  }

  return (
    <>
      <div className={styles.howHeader}>
        <div className={styles.headingBlock}>
          <p className={`eyebrow ${styles.stone}`}>How we work</p>
          <h2 id="approach-heading" className={styles.h2}>
            {view === "approach" ? HOW_WE_WORK.approachHeading : HOW_WE_WORK.engagementHeading}
          </h2>
        </div>
        <div role="tablist" aria-label="How we work" className={styles.segmented}>
          {VIEWS.map((v, i) => (
            <button
              key={v.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`how-tab-${v.id}`}
              aria-selected={view === v.id}
              aria-controls="how-panel"
              tabIndex={view === v.id ? 0 : -1}
              className={`${styles.segment} ${view === v.id ? styles.segmentActive : ""}`}
              onClick={() => setView(v.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div id="how-panel" role="tabpanel" aria-labelledby={`how-tab-${view}`}>
        {view === "approach" ? (
          <ol className={styles.howGrid}>
            {HOW_WE_WORK.approach.map((s, i) => (
              <li key={s.title} className={styles.approachCol}>
                <span className={styles.tick} aria-hidden="true" />
                <span className={styles.monoDark}>{pad(i)}</span>
                <h3 className={styles.approachTitle}>{s.title}</h3>
                <p className={styles.bodyStone}>{s.body}</p>
              </li>
            ))}
          </ol>
        ) : (
          <>
            <ol className={styles.howGrid}>
              {HOW_WE_WORK.engagement.map((s, i) => (
                <li key={s.title} className={styles.stage}>
                  <span className={styles.timeline} aria-hidden="true">
                    <span className={styles.timelineSquare} />
                    <span className={styles.timelineLine} />
                  </span>
                  <span className={`${styles.monoDark} ${styles.stageNum}`}>{pad(i)}</span>
                  <h3 className={styles.stageTitle}>{s.title}</h3>
                  <p className={styles.bodyStone}>{s.body}</p>
                </li>
              ))}
            </ol>
            <p className={styles.engagementNote}>{HOW_WE_WORK.engagementNote}</p>
          </>
        )}
      </div>
    </>
  );
}
