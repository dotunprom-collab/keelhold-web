"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { BusinessId } from "@/lib/brand";

type Ctx = { selected: BusinessId; select: (id: BusinessId) => void };

const SelectionContext = createContext<Ctx | null>(null);

/** Shares the selected business between the hero strip and the Companies selector. */
export function CompanySelectionProvider({ children }: { children: ReactNode }) {
  const [selected, select] = useState<BusinessId>("advisory");
  return <SelectionContext value={{ selected, select }}>{children}</SelectionContext>;
}

export function useCompanySelection(): Ctx {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useCompanySelection must be used within CompanySelectionProvider");
  return ctx;
}
