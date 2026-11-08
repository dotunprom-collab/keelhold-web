"use client";

import { Icon } from "@/components/core/Icon";
import styles from "./Toast.module.css";

export type ToastTone = "positive" | "negative" | "neutral";

interface ToastProps {
  tone?: ToastTone;
  title: string;
  message?: string;
  onDismiss: () => void;
}

export function Toast({ tone = "neutral", title, message, onDismiss }: ToastProps) {
  const icon = tone === "positive" ? "check" : tone === "negative" ? "alert-triangle" : "info";
  return (
    <div role="status" className={styles.toast}>
      <span className={`${styles.bar} ${styles[tone]}`} aria-hidden="true" />
      <Icon name={icon} size={18} color={tone === "neutral" ? "#C9A464" : "#FBF9F5"} className={styles.icon} />
      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        {message && <p className={styles.message}>{message}</p>}
      </div>
      <button type="button" className={styles.dismiss} aria-label="Dismiss" onClick={onDismiss}>
        <Icon name="x" size={16} />
      </button>
    </div>
  );
}
