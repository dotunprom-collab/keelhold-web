import { BAR, type Entity } from "@/lib/brand";

export type Theme = "light" | "dark";

export const frameColor = (theme: Theme) => (theme === "dark" ? "#FBF9F5" : "#14213A");

interface MarkProps {
  entity?: Entity;
  theme?: Theme;
  /** Bar drawn in the frame colour instead of brass (planned businesses). */
  mono?: boolean;
  size?: number;
  /** Accessible name; omit for decorative use. */
  title?: string;
  className?: string;
}

export function Mark({ entity = "group", theme = "light", mono = false, size = 40, title, className }: MarkProps) {
  const frame = frameColor(theme);
  const [x, y, w, h] = BAR[entity];
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      <rect x={5} y={5} width={90} height={90} fill="none" stroke={frame} strokeWidth={8} />
      <rect x={x} y={y} width={w} height={h} fill={mono ? frame : "#C9A464"} />
    </svg>
  );
}
