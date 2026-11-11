"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/core/Icon";
import { ButtonLink } from "@/components/core/Button";
import { CONTACT_HREF, NAV_LINKS, isCurrent } from "./nav";
import styles from "./MobileMenu.module.css";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState<string | null>(null);
  const pathname = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Close on route change.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 721px)");
    const onResize = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <div className={styles.root}>
      <button
        ref={button}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        {open ? <Icon name="x" size={18} /> : <span className={styles.burger} aria-hidden="true" />}
      </button>
      <div id="mobile-menu" ref={panel} className={styles.panel} hidden={!open}>
        <nav aria-label="Mobile" className={`container ${styles.nav}`}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={styles.link}
              aria-current={isCurrent(l.href, pathname) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <ButtonLink href={CONTACT_HREF} variant="inverse" size="lg" onClick={() => setOpen(false)}>
            Contact
          </ButtonLink>
        </nav>
      </div>
    </div>
  );
}
