"use client"

import { Cell, Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { useDashboardFilters } from "@/components/dashboard-filters"
import { formatCurrency, getServiceSales } from "@/lib/data"
import { paletteColor } from "@/lib/chart-colors"

export function SalesByServiceChart() {
  const { view, period } = useDashboardFilters()
  const sales = getServiceSales(view, period).filter((s) => s.value > 0)

  const chartConfig: ChartConfig = Object.fromEntries(
    sales.map((s, i) => [s.service, { label: s.service, color: paletteColor(i) }]),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas por serviço</CardTitle>
        <CardDescription>Distribuição do faturamento realizado</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[220px] w-full max-w-[220px]">
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="service"
                  formatter={(value) => <span className="font-mono font-medium">{formatCurrency(Number(value))}</span>}
                />
              }
            />
            <Pie data={sales} dataKey="value" nameKey="service" innerRadius={45} outerRadius={80} strokeWidth={2}>
              {sales.map((s, i) => (
                <Cell key={s.service} fill={paletteColor(i)} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <ul className="flex flex-1 flex-col gap-1.5 text-sm">
          {sales.map((s, i) => (
            <li key={s.service} className="flex items-center gap-2">
              <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: paletteColor(i) }} />
              <span className="min-w-0 flex-1 truncate text-muted-foreground">{s.service}</span>
              <span className="shrink-0 font-medium">{formatCurrency(s.value)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
