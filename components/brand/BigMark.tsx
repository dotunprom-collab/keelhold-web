import { BAR, type Entity } from "@/lib/brand";
import styles from "./BigMark.module.css";

interface BigMarkProps {
  entity: Entity;
  size: number;
  /** Frame thickness in px; defaults to 8% of the mark's width. */
  frame?: number;
  className?: string;
}

/** Large mark built from divs so the bar can tween between entity positions. Decorative. */
export function BigMark({ entity, size, frame, className }: BigMarkProps) {
  const [x, y, w, h] = BAR[entity];
  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")} style={{ width: size }} aria-hidden="true">
      <div className={styles.frame} style={frame === undefined ? undefined : { borderWidth: frame }} />
      <div className={styles.bar} style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }} />
    </div>
  );
}
