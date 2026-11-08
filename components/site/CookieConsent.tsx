"use client";

import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/core/Button";
import styles from "./CookieConsent.module.css";

export type Consent = "essential" | "analytics";

const COOKIE = "kh_consent";
const MAX_AGE = 60 * 60 * 24 * 365; // 12 months
const CHANGE_EVENT = "kh:consent-change";
const OPEN_EVENT = "kh:cookie-settings";

function readConsent(): Consent | null {
  const match = document.cookie.match(/(?:^|;\s*)kh_consent=(essential|analytics)/);
  return (match?.[1] as Consent) ?? null;
}

function writeConsent(value: Consent) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(CHANGE_EVENT, cb);
  return () => window.removeEventListener(CHANGE_EVENT, cb);
}

/** "unknown" during SSR/hydration so nothing renders until the stored choice is read. */
function useConsent(): Consent | null | "unknown" {
  return useSyncExternalStore(subscribe, readConsent, () => "unknown");
}

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export function CookieConsent() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const onOpen = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  function choose(value: Consent) {
    const hadAnalytics = consent === "analytics";
    writeConsent(value);
    setReopened(false);
    // Already-loaded analytics can't be unloaded; reload to drop it.
    if (hadAnalytics && value === "essential") window.location.reload();
  }

  const showBar = consent === null || (consent !== "unknown" && reopened);

  return (
    <>
      {consent === "analytics" && PLAUSIBLE_DOMAIN && (
        <Script src="https://plausible.io/js/script.js" data-domain={PLAUSIBLE_DOMAIN} strategy="afterInteractive" />
      )}
      {showBar && (
        <section className={styles.bar} aria-label="Cookie consent">
          <div className={styles.inner}>
            <p className={styles.text}>
              We use essential cookies to run this site and, with your consent, analytics cookies to understand how it
              is used.
            </p>
            <div className={styles.actions}>
              <Button size="sm" variant="primary" onClick={() => choose("analytics")}>
                Accept analytics
              </Button>
              <Button size="sm" variant="secondary" onClick={() => choose("essential")}>
                Essential only
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}
