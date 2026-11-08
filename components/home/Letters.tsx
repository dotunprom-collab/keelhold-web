"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/core/Button";
import { Tabs } from "@/components/layout/Tabs";
import { PUBLICATION_CATEGORIES, PUBLICATIONS, type PublicationCategory } from "@/content/publications";
import { PREFILL_EVENT, type PrefillDetail } from "@/lib/enquiry";
import styles from "./Letters.module.css";

type Filter = "all" | PublicationCategory;

const TAB_ITEMS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  ...PUBLICATION_CATEGORIES.map((c) => ({ value: c, label: c })),
];

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

function requestUpdates() {
  const detail: PrefillDetail = { type: "general", message: "Please add me to publication updates." };
  window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail }));
}

export function Letters() {
  const [filter, setFilter] = useState<Filter>("all");
  const items = PUBLICATIONS.filter((p) => filter === "all" || p.category === filter).sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <>
      <Tabs idPrefix="letters-tab" label="Publication categories" items={TAB_ITEMS} value={filter} onChange={setFilter} panelId="letters-panel" />
      <div id="letters-panel" role="tabpanel" aria-labelledby={`letters-tab-${filter}`}>
        {items.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>Publications will appear here as they are released.</p>
            <ButtonLink href="#contact" variant="secondary" icon="arrow-right" className={styles.emptyAction} onClick={requestUpdates}>
              Request updates
            </ButtonLink>
          </div>
        ) : (
          <ul className={styles.list}>
            {items.map((p) => (
              <li key={p.slug} className={styles.item}>
                <p className={styles.meta}>
                  <span>{p.category}</span>
                  <time dateTime={p.date}>{dateFormat.format(new Date(p.date))}</time>
                </p>
                <h3 className={styles.title}>
                  {p.file ? <a href={p.file}>{p.title}</a> : p.title}
                </h3>
                <p className={styles.summary}>{p.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
