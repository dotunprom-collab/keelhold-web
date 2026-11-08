"use client";

import Script from "next/script";
import { useCallback, useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: { sitekey: string; theme?: "light" | "dark" | "auto"; size?: string }) => string;
      reset: (id?: string) => void;
      remove: (id: string) => void;
      getResponse: (id?: string) => string | undefined;
    };
  }
}

export interface TurnstileHandle {
  getToken: () => string | undefined;
  reset: () => void;
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** Cloudflare Turnstile widget. Renders nothing unless NEXT_PUBLIC_TURNSTILE_SITE_KEY is set. */
export function Turnstile({ ref }: { ref: Ref<TurnstileHandle> }) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [ready, setReady] = useState(() => typeof window !== "undefined" && !!window.turnstile);

  useImperativeHandle(ref, () => ({
    getToken: () => (widgetId.current ? window.turnstile?.getResponse(widgetId.current) : undefined),
    reset: () => {
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    },
  }));

  const render = useCallback(() => {
    if (!SITE_KEY || !container.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(container.current, { sitekey: SITE_KEY, theme: "light" });
  }, []);

  useEffect(() => {
    if (ready) render();
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [ready, render]);

  if (!SITE_KEY) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
      <div ref={container} />
    </>
  );
}
