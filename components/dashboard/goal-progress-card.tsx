"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useDashboardFilters } from "@/components/dashboard-filters"
import { formatCurrency, getAchieved, getDaysRemaining, getGoal, getPeriodMeta, getProjectedAchieved } from "@/lib/data"
import { cn } from "@/lib/utils"

export function GoalProgressCard() {
  const { view, period } = useDashboardFilters()

  const goal = getGoal(view)
  const achieved = getAchieved(view, period)
  const meta = getPeriodMeta(period)
  const projected = getProjectedAchieved(view, period)
  const daysRemaining = getDaysRemaining(period)

  const pct = goal > 0 ? Math.min(100, Math.round((achieved / goal) * 100)) : 0
  const projectedPct = goal > 0 ? Math.round((projected / goal) * 100) : 0
  const gap = Math.max(goal - achieved, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meta x Realizado</CardTitle>
        <CardDescription>{meta.label}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <div className="text-3xl font-semibold tracking-tight">{formatCurrency(achieved)}</div>
            <p className="text-sm text-muted-foreground">de {formatCurrency(goal)} de meta</p>
          </div>
          <div
            className={cn(
              "rounded-full px-3 py-1 text-sm font-semibold",
              pct >= 100 ? "bg-success/15 text-success" : "bg-accent text-accent-foreground",
            )}
          >
            {pct}%
          </div>
        </div>

        <Progress value={pct} className="h-2.5" />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border bg-muted/40 p-3">
            <p className="text-xs text-muted-foreground">Falta para a meta</p>
            <p className="mt-1 text-sm font-semibold">{gap > 0 ? formatCurrency(gap) : "Meta atingida"}</p>
          </div>
          <div className="rounded-lg border bg-muted/40 p-3">
            <p className="text-xs text-muted-foreground">
              {meta.isCurrent ? "Projeção ao fim do mês" : "Resultado final"}
            </p>
            <p className="mt-1 text-sm font-semibold">
              {formatCurrency(projected)} <span className="text-muted-foreground">({projectedPct}%)</span>
            </p>
          </div>
          <div className="rounded-lg border bg-muted/40 p-3">
            <p className="text-xs text-muted-foreground">Dias restantes</p>
            <p className="mt-1 text-sm font-semibold">
              {meta.isCurrent ? `${daysRemaining} de ${meta.daysInMonth} dias` : "Período encerrado"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
