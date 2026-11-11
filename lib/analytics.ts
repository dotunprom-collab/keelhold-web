type Plausible = (event: string, options?: { props?: Record<string, string> }) => void;

/** Sends a custom event when analytics is loaded (only after the visitor accepts analytics cookies). */
export function trackEvent(name: string, props?: Record<string, string>) {
  (window as Window & { plausible?: Plausible }).plausible?.(name, props ? { props } : undefined);
}
