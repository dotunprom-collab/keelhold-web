"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/core/Button";
import { CONTACT_HREF, NAV_LINKS, isCurrent } from "./nav";
import styles from "./Header.module.css";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {NAV_LINKS.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={styles.link}
          aria-current={isCurrent(l.href, pathname) ? "page" : undefined}
        >
          {l.label}
        </Link>
      ))}
      <ButtonLink
        href={CONTACT_HREF}
        variant="inverse"
        size="sm"
        aria-current={isCurrent(CONTACT_HREF, pathname) ? "page" : undefined}
        className={styles.contact}
      >
        Contact
      </ButtonLink>
    </>
  );
}
