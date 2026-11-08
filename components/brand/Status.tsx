import styles from "./Status.module.css";

interface StatusProps {
  operating: boolean;
  label: string;
  /** Ground the status sits on. */
  tone?: "dark" | "light";
}

export function Status({ operating, label, tone = "dark" }: StatusProps) {
  return (
    <span className={`${styles.root} ${styles[tone]}`}>
      <span className={`${styles.square} ${operating ? styles.operating : styles.planned}`} aria-hidden="true" />
      {label}
    </span>
  );
}
