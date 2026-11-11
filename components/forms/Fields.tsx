import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Icon } from "@/components/core/Icon";
import styles from "./Fields.module.css";

interface FieldShellProps {
  id: string;
  label: ReactNode;
  error?: string;
  hint?: string;
  children: ReactNode;
}

function FieldShell({ id, label, error, hint, children }: FieldShellProps) {
  const note = error ?? hint;
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {children}
      {note && (
        <p id={`${id}-hint`} className={`${styles.hint} ${error ? styles.hintError : ""}`}>
          {note}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  return error || hint ? `${id}-hint` : undefined;
}

type InputProps = { id: string; label: ReactNode; error?: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>;

export function Input({ id, label, error, hint, className, ...rest }: InputProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint}>
      <input
        id={id}
        className={[styles.control, styles.input, error && styles.invalid, className].filter(Boolean).join(" ")}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...rest}
      />
    </FieldShell>
  );
}

type TextareaProps = { id: string; label: ReactNode; error?: string; hint?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ id, label, error, hint, className, ...rest }: TextareaProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint}>
      <textarea
        id={id}
        className={[styles.control, styles.textarea, error && styles.invalid, className].filter(Boolean).join(" ")}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...rest}
      />
    </FieldShell>
  );
}

type SelectProps = {
  id: string;
  label: ReactNode;
  error?: string;
  hint?: string;
  options: readonly { value: string; label: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ id, label, error, hint, options, className, ...rest }: SelectProps) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint}>
      <div className={styles.selectWrap}>
        <select
          id={id}
          className={[styles.control, styles.input, styles.select, error && styles.invalid, className].filter(Boolean).join(" ")}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" size={18} color="#6B6558" className={styles.chevron} />
      </div>
    </FieldShell>
  );
}

type CheckboxProps = {
  id: string;
  children: ReactNode;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "children">;

export function Checkbox({ id, children, error, ...rest }: CheckboxProps) {
  return (
    <div className={styles.field}>
      <div className={styles.checkRow}>
        <input
          id={id}
          type="checkbox"
          className={styles.checkInput}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-hint` : undefined}
          {...rest}
        />
        <span className={`${styles.checkBox} ${error ? styles.invalid : ""}`} aria-hidden="true">
          <Icon name="check" size={14} color="#C9A464" className={styles.checkIcon} />
        </span>
        <label htmlFor={id} className={styles.checkLabel}>
          {children}
        </label>
      </div>
      {error && (
        <p id={`${id}-hint`} className={`${styles.hint} ${styles.hintError}`}>
          {error}
        </p>
      )}
    </div>
  );
}
