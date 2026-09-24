"use client"

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { useDashboardFilters } from "@/components/dashboard-filters"
import { formatCurrency, getPipeline } from "@/lib/data"
import { STAGE_COLORS } from "@/lib/stage-colors"

const chartConfig: ChartConfig = {
  value: { label: "Valor em negociação" },
}

export function PipelineFunnelCard() {
  const { view, period } = useDashboardFilters()
  const pipeline = getPipeline(view, period)

  const data = pipeline.map((p) => ({
    ...p,
    fill: STAGE_COLORS[p.stage],
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funil de vendas</CardTitle>
        <CardDescription>Negócios por etapa do pipeline</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="label"
              tick={{ fontSize: 12 }}
              width={110}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => (
                    <div className="flex w-full items-center justify-between gap-3">
                      <span className="text-muted-foreground">{item.payload.count} negócios</span>
                      <span className="font-mono font-medium">{formatCurrency(Number(value))}</span>
                    </div>
                  )}
                />
              }
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]}>
              {data.map((entry) => (
                <Cell key={entry.stage} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
