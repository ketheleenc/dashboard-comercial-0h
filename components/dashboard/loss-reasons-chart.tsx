"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { useDashboardFilters } from "@/components/dashboard-filters"
import { getLossReasons } from "@/lib/data"

const chartConfig: ChartConfig = {
  count: { label: "Negócios perdidos", color: "var(--chart-5)" },
}

export function LossReasonsChart() {
  const { view, period } = useDashboardFilters()
  const reasons = getLossReasons(view, period)
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Motivos de perda</CardTitle>
        <CardDescription>Por que os negócios não avançaram</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <BarChart data={reasons} layout="vertical" margin={{ left: 8, right: 24 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="reason"
              tick={{ fontSize: 12 }}
              width={170}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => <span className="font-medium">{value} negócios</span>}
                />
              }
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
