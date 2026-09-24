"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useDashboardFilters } from "@/components/dashboard-filters"
import { formatCurrency, getAchieved, getGoal } from "@/lib/data"
import { SALESPEOPLE } from "@/lib/data"

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function TeamComparisonCard() {
  const { period, setView } = useDashboardFilters()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparativo da equipe</CardTitle>
        <CardDescription>Desempenho individual no período</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {SALESPEOPLE.map((person) => {
          const goal = getGoal(person.id)
          const achieved = getAchieved(person.id, period)
          const pct = goal > 0 ? Math.min(100, Math.round((achieved / goal) * 100)) : 0

          return (
            <button
              key={person.id}
              type="button"
              onClick={() => setView(person.id)}
              className="flex flex-col gap-2 rounded-lg border p-3 text-left transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <Avatar className="size-9">
                  <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                  <AvatarFallback>{initials(person.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{person.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(achieved)} de {formatCurrency(goal)}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold">{pct}%</span>
              </div>
              <Progress value={pct} className="h-2" />
            </button>
          )
        })}
      </CardContent>
    </Card>
  )
}
