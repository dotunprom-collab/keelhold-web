import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Info, TriangleAlert, X } from "lucide-react";

const ICONS = {
  "arrow-right": ArrowRight,
  "arrow-left": ArrowLeft,
  "arrow-up-right": ArrowUpRight,
  "chevron-down": ChevronDown,
  check: Check,
  x: X,
  "alert-triangle": TriangleAlert,
  info: Info,
} as const;

export type IconName = keyof typeof ICONS;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
  /** Accessible name; omit for decorative icons. */
  label?: string;
}

export function Icon({ name, size = 16, color, className, label }: IconProps) {
  const Component = ICONS[name];
  return (
    <Component
      size={size}
      color={color}
      strokeWidth={2}
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      focusable="false"
    />
  );
}
