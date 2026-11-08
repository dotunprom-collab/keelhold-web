"use client";

import { useEffect, useState } from "react";
import { BigMark } from "@/components/brand/BigMark";
import type { Entity } from "@/lib/brand";

/** Mounts on the technology bar position, then settles to the group position. */
export function HeroMark({ className }: { className?: string }) {
  const [entity, setEntity] = useState<Entity>("technology");
  useEffect(() => {
    const t = setTimeout(() => setEntity("group"), 500);
    return () => clearTimeout(t);
  }, []);
  return <BigMark entity={entity} size={400} className={className} />;
}
