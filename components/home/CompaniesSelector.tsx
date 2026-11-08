"use client";

import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import { BigMark } from "@/components/brand/BigMark";
import { Status } from "@/components/brand/Status";
import { ButtonLink } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { BUSINESSES, getBusiness, type Business } from "@/lib/businesses";
import { useCompanySelection } from "./CompanySelection";
import styles from "./CompaniesSelector.module.css";

/** The selector shows the technology business as "Software"; elsewhere it is "Technology". */
const SELECTOR_NAMES: Partial<Record<Business["id"], string>> = { technology: "Software" };
const selectorName = (b: Business) => SELECTOR_NAMES[b.id] ?? b.name;

export function CompaniesSelector() {
  const { selected, select } = useCompanySelection();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const business = getBusiness(selected);

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const n = BUSINESSES.length;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    select(BUSINESSES[next].id);
    tabs.current[next]?.focus();
  }

  // Hover selects with a mouse only; touch and pen select on tap.
  function onPointerEnter(e: PointerEvent, id: (typeof BUSINESSES)[number]["id"]) {
    if (e.pointerType === "mouse") select(id);
  }

  return (
    <div className={styles.panel}>
      <div role="tablist" aria-label="Business areas" aria-orientation="vertical" className={styles.tablist}>
        {BUSINESSES.map((b, i) => {
          const active = b.id === selected;
          return (
            <button
              key={b.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`company-tab-${b.id}`}
              aria-selected={active}
              aria-controls="company-panel"
              tabIndex={active ? 0 : -1}
              className={`${styles.tab} ${active ? styles.active : ""}`}
              onClick={() => select(b.id)}
              onPointerEnter={(e) => onPointerEnter(e, b.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <span className={styles.num}>{b.index}</span>
              <span className={styles.label}>
                <span className={styles.name}>{selectorName(b)}</span>
                <span className={styles.status}>{b.operating ? "Operating" : "Planned"}</span>
              </span>
              <Icon name="arrow-right" size={20} color="#C9A464" className={styles.arrow} />
            </button>
          );
        })}
      </div>

      <div id="company-panel" role="tabpanel" aria-labelledby={`company-tab-${business.id}`} className={styles.detail}>
        <BigMark entity={business.id} size={200} />
        <div className={styles.content}>
          <p className={`eyebrow ${styles.category}`}>{business.category}</p>
          <h3 className={styles.title}>Keelhold {selectorName(business)}</h3>
          <p className={styles.description}>{business.description}</p>
          {business.product && (
            <p className={styles.product}>
              <span>Featured product</span> <span className={styles.productName}>{business.product}</span>
            </p>
          )}
          <Status operating={business.operating} label={business.status} tone="dark" />
          <div className={styles.cta}>
            <ButtonLink href={`/${business.slug}`} variant="accent" icon="arrow-right">
              Explore {selectorName(business)}
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
