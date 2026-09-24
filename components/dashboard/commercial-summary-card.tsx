"use client"

import { CheckCircle2Icon, FlameIcon, HandshakeIcon, TargetIcon, XCircleIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDashboardFilters } from "@/components/dashboard-filters"
import { formatCurrency, getCommercialSummary } from "@/lib/data"
import { STAGE_COLORS, STAGE_LABELS } from "@/lib/stage-colors"

export function CommercialSummaryCard() {
  const { view, period } = useDashboardFilters()
  const summary = getCommercialSummary(view, period)

  const rows = [
    {
      label: STAGE_LABELS.prospect,
      count: summary.prospectCount,
      value: summary.prospectValue,
      icon: TargetIcon,
      color: STAGE_COLORS.prospect,
    },
    {
      label: STAGE_LABELS.negociacao,
      count: summary.negotiationCount,
      value: summary.negotiationValue,
      icon: HandshakeIcon,
      color: STAGE_COLORS.negociacao,
    },
    {
      label: STAGE_LABELS.quente,
      count: summary.hotDealsCount,
      value: summary.hotDealsValue,
      icon: FlameIcon,
      color: STAGE_COLORS.quente,
    },
    {
      label: STAGE_LABELS.aprovados,
      count: summary.approvedCount,
      value: summary.approvedValue,
      icon: CheckCircle2Icon,
      color: STAGE_COLORS.aprovados,
    },
    {
      label: STAGE_LABELS.reprovado,
      count: summary.reprovedCount,
      value: summary.reprovedValue,
      icon: XCircleIcon,
      color: STAGE_COLORS.reprovado,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo comercial</CardTitle>
        <CardDescription>Situação atual dos negócios por status</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-3 rounded-lg border p-3">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${row.color}26`, color: row.color }}
            >
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
