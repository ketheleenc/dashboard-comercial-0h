"use client"

import { CheckCircle2Icon, FlameIcon, HandshakeIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDashboardFilters } from "@/components/dashboard-filters"
import { formatCurrency, getCommercialSummary } from "@/lib/data"

export function CommercialSummaryCard() {
  const { view, period } = useDashboardFilters()
  const summary = getCommercialSummary(view, period)

  const rows = [
    {
      label: "Negócios aprovados",
      count: summary.approvedCount,
      value: summary.approvedValue,
      icon: CheckCircle2Icon,
      tone: "text-success bg-success/15",
    },
    {
      label: "Negócios quentes",
      count: summary.hotDealsCount,
      value: summary.hotDealsValue,
      icon: FlameIcon,
      tone: "text-danger bg-danger/15",
    },
    {
      label: "Em negociação",
      count: summary.negotiationCount,
      value: summary.negotiationValue,
      icon: HandshakeIcon,
      tone: "text-primary bg-primary/15",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo comercial</CardTitle>
        <CardDescription>Situação atual dos negócios em aberto</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-3 rounded-lg border p-3">
            <div className={`flex size-9 shrink-0 items-center justify-center rounded-full ${row.tone}`}>
              <row.icon className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{row.label}</p>
              <p className="text-xs text-muted-foreground">{row.count} negócios</p>
            </div>
            <div className="shrink-0 text-sm font-semibold">{formatCurrency(row.value)}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
