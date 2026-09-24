"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { DEFAULT_PERIOD } from "@/lib/data"
import type { ViewId } from "@/lib/types"

interface DashboardFiltersState {
  view: ViewId
  setView: (view: ViewId) => void
  period: string
  setPeriod: (period: string) => void
}

const DashboardFiltersContext = createContext<DashboardFiltersState | null>(null)

export function DashboardFiltersProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<ViewId>("team")
  const [period, setPeriod] = useState<string>(DEFAULT_PERIOD)

  const value = useMemo(() => ({ view, setView, period, setPeriod }), [view, period])

  return <DashboardFiltersContext.Provider value={value}>{children}</DashboardFiltersContext.Provider>
}

export function useDashboardFilters() {
  const ctx = useContext(DashboardFiltersContext)
  if (!ctx) {
    throw new Error("useDashboardFilters must be used within a DashboardFiltersProvider")
  }
  return ctx
}
