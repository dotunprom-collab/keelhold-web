"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { SECTION_LINKS } from "@/content/advisory";
import styles from "./advisory.module.css";

const NAV_HEIGHT = 54;

/**
 * On-page section links. Pinned with JS rather than `position: sticky`, so it works
 * regardless of how tall its parent is: once the marker scrolls past the top, the nav
 * becomes fixed and the marker takes its height so content doesn't jump.
 */
export function SectionNav() {
  const marker = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState<string>(SECTION_LINKS[0].id);

  useEffect(() => {
    const onScroll = () => {
      if (marker.current) setPinned(marker.current.getBoundingClientRect().top < 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_LINKS.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  function go(e: MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 55, behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <>
      <div ref={marker} style={{ height: pinned ? NAV_HEIGHT : 0 }} aria-hidden="true" />
      <nav aria-label="On this page" className={`${styles.secNav} ${pinned ? styles.secNavPinned : ""}`}>
        <div className={`container ${styles.secRow}`}>
          <span className={styles.secLabel}>
            <span className={styles.secSquare} aria-hidden="true" />
            Advisory
          </span>
          {SECTION_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={styles.secLink}
              aria-current={active === l.id ? "location" : undefined}
              onClick={(e) => go(e, l.id)}
            >
              {l.label}
            </a>
          ))}
          <Link href="/contact" className={styles.secCta}>
            Discuss your requirements →
          </Link>
        </div>
      </nav>
    </>
  );
}
