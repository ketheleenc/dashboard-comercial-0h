"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { useDashboardFilters } from "@/components/dashboard-filters"
import { formatCurrency, getMonthlyResults } from "@/lib/data"

const chartConfig: ChartConfig = {
  goal: { label: "Meta", color: "var(--chart-2)" },
  achieved: { label: "Realizado", color: "var(--chart-1)" },
}

export function MonthlyHistoryChart() {
  const { view } = useDashboardFilters()
  const data = getMonthlyResults(view)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico mensal</CardTitle>
        <CardDescription>Meta x realizado nos últimos meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={data} margin={{ left: 0, right: 12 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <YAxis
              tickFormatter={(v) => formatCurrency(v)}
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => <span className="font-mono font-medium">{formatCurrency(Number(value))}</span>}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="goal" fill="var(--color-goal)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="achieved" fill="var(--color-achieved)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
