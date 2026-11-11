export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/advisory", label: "Advisory" },
  { href: "/software", label: "Software" },
  { href: "/#insights", label: "Insights" },
  // No About page yet (needs approved copy); points to the group's philosophy section for now.
  { href: "/#approach", label: "About" },
] as const;

export const CONTACT_HREF = "/contact";

/** True when `href` is a page route (not the homepage or an anchor) matching the current path. */
export function isCurrent(href: string, pathname: string | null): boolean {
  return href !== "/" && !href.includes("#") && pathname === href;
}
