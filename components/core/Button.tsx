import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "accent" | "inverse" | "outlineInverse";
export type ButtonSize = "sm" | "md" | "lg";

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Trailing icon. */
  icon?: IconName;
  children: ReactNode;
}

function classes(variant: ButtonVariant, size: ButtonSize, extra?: string) {
  return [styles.button, styles[variant], styles[size], extra].filter(Boolean).join(" ");
}

function Content({ children, icon }: Pick<CommonProps, "children" | "icon">) {
  return (
    <>
      <span>{children}</span>
      {icon && <Icon name={icon} size={16} />}
    </>
  );
}

type ButtonProps = CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function Button({ variant = "primary", size = "md", icon, children, className, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={classes(variant, size, className)} {...rest}>
      <Content icon={icon}>{children}</Content>
    </button>
  );
}

type ButtonLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> & {
    href: string;
    /** Render a plain <a> (in-page anchors, external links) instead of next/link. */
    native?: boolean;
  };

export function ButtonLink({ variant = "primary", size = "md", icon, children, className, href, native, ...rest }: ButtonLinkProps) {
  const cls = classes(variant, size, className);
  if (native || href.startsWith("#") || /^https?:/.test(href)) {
    return (
      <a href={href} className={cls} {...rest}>
        <Content icon={icon}>{children}</Content>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      <Content icon={icon}>{children}</Content>
    </Link>
  );
}
