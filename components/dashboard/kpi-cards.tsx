"use client"

import { TargetIcon, TrendingUpIcon, TrendingDownIcon, WalletIcon, BellIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useDashboardFilters } from "@/components/dashboard-filters"
import {
  formatCurrency,
  formatPercent,
  getAchieved,
  getFollowUpSummary,
  getGoal,
  getPipelineTotal,
  getPipeline,
  getPreviousAchieved,
} from "@/lib/data"
import { cn } from "@/lib/utils"

export function KpiCards() {
  const { view, period } = useDashboardFilters()

  const goal = getGoal(view)
  const achieved = getAchieved(view, period)
  const previous = getPreviousAchieved(view, period)
  const pipeline = getPipelineTotal(getPipeline(view, period))
  const followUps = getFollowUpSummary(view)

  const goalPct = goal > 0 ? Math.round((achieved / goal) * 100) : 0
  const delta = previous !== null && previous > 0 ? Math.round(((achieved - previous) / previous) * 100) : null
  const pendingFollowUps = followUps.overdue + followUps.today

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Meta do mês</CardTitle>
          <div className="flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <TargetIcon className="size-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight">{formatCurrency(goal)}</div>
          <p className="mt-1 text-xs text-muted-foreground">Objetivo definido para o período</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Realizado</CardTitle>
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-primary">
            <WalletIcon className="size-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight">{formatCurrency(achieved)}</div>
          <div className="mt-1 flex items-center gap-2 text-xs">
            <Badge variant="secondary" className="font-medium">
              {formatPercent(goalPct)} da meta
            </Badge>
            {delta !== null && (
              <span
                className={cn(
                  "flex items-center gap-0.5 font-medium",
                  delta >= 0 ? "text-success" : "text-danger",
                )}
              >
                {delta >= 0 ? <TrendingUpIcon className="size-3" /> : <TrendingDownIcon className="size-3" />}
                {Math.abs(delta)}% vs mês anterior
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Pipeline em aberto</CardTitle>
          <div className="flex size-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <TrendingUpIcon className="size-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight">{formatCurrency(pipeline.value)}</div>
          <p className="mt-1 text-xs text-muted-foreground">{pipeline.count} negócios em andamento</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Follow-ups pendentes</CardTitle>
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-full",
              followUps.overdue > 0 ? "bg-danger/15 text-danger" : "bg-secondary text-secondary-foreground",
            )}
          >
            <BellIcon className="size-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tracking-tight">{pendingFollowUps}</div>
          <p className="mt-1 text-xs text-muted-foreground">
            {followUps.overdue > 0 ? `${followUps.overdue} atrasados · ` : ""}
            {followUps.today} para hoje
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
