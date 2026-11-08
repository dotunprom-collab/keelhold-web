import type { Entity } from "@/lib/brand";
import { Mark, frameColor, type Theme } from "./Mark";
import styles from "./Lockup.module.css";

interface LockupProps {
  entity?: Entity;
  theme?: Theme;
  size?: number;
  descriptor?: string;
}

export function Lockup({ entity = "group", theme = "light", size = 40, descriptor = "Capital Group" }: LockupProps) {
  return (
    <span className={styles.root} style={{ gap: size * 0.32 }}>
      <Mark entity={entity} theme={theme} size={size} />
      <span className={styles.text} style={{ gap: size * 0.08 }}>
        <span className={styles.name} style={{ fontSize: size * 0.64, color: frameColor(theme) }}>
          Keelhold
        </span>
        <span
          className={styles.descriptor}
          style={{ fontSize: Math.max(9, size * 0.17), color: theme === "dark" ? "#C9A464" : "#6B6558" }}
        >
          {descriptor}
        </span>
      </span>
    </span>
  );
}
