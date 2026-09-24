"use client"

import { AlertTriangleIcon, CalendarClockIcon, CalendarIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDashboardFilters } from "@/components/dashboard-filters"
import { getFollowUpSummary } from "@/lib/data"

export function FollowUpsCard() {
  const { view } = useDashboardFilters()
  const summary = getFollowUpSummary(view)

  const rows = [
    {
      label: "Atrasados",
      count: summary.overdue,
      icon: AlertTriangleIcon,
      tone: "text-danger bg-danger/15",
    },
    {
      label: "Para hoje",
      count: summary.today,
      icon: CalendarIcon,
      tone: "text-warning bg-warning/20",
    },
    {
      label: "Próximos 7 dias",
      count: summary.upcoming,
      icon: CalendarClockIcon,
      tone: "text-muted-foreground bg-muted",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Follow-ups</CardTitle>
        <CardDescription>Contatos que precisam de atenção</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-3 rounded-lg border p-3">
            <div className={`flex size-9 shrink-0 items-center justify-center rounded-full ${row.tone}`}>
              <row.icon className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{row.label}</p>
            </div>
            <div className="text-lg font-semibold">{row.count}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
