"use client"

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDashboardFilters } from "@/components/dashboard-filters"
import { formatCurrency, getMonthlyResults } from "@/lib/data"
import { cn } from "@/lib/utils"

export function MonthlyHistoryTable() {
  const { view } = useDashboardFilters()
  const rows = getMonthlyResults(view)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhamento por mês</CardTitle>
        <CardDescription>Meta, realizado e atingimento mês a mês</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mês</TableHead>
              <TableHead className="text-right">Meta</TableHead>
              <TableHead className="text-right">Realizado</TableHead>
              <TableHead className="text-right">Atingimento</TableHead>
              <TableHead className="text-right">Variação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => {
              const pct = row.goal > 0 ? Math.round((row.achieved / row.goal) * 100) : 0
              const prev = i > 0 ? rows[i - 1].achieved : null
              const delta = prev && prev > 0 ? Math.round(((row.achieved - prev) / prev) * 100) : null

              return (
                <TableRow key={row.month}>
                  <TableCell className="font-medium">{row.label}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{formatCurrency(row.goal)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(row.achieved)}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={pct >= 100 ? "default" : "secondary"}>{pct}%</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {delta === null ? (
                      <span className="text-muted-foreground">—</span>
                    ) : (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 font-medium",
                          delta >= 0 ? "text-success" : "text-danger",
                        )}
                      >
                        {delta >= 0 ? (
                          <TrendingUpIcon className="size-3.5" />
                        ) : (
                          <TrendingDownIcon className="size-3.5" />
                        )}
                        {Math.abs(delta)}%
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
