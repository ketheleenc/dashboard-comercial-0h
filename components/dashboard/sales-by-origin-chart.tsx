"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { useDashboardFilters } from "@/components/dashboard-filters"
import { formatCurrency, getOriginSales } from "@/lib/data"

const chartConfig: ChartConfig = {
  value: { label: "Faturamento", color: "var(--chart-2)" },
}

export function SalesByOriginChart() {
  const { view, period } = useDashboardFilters()
  const origins = getOriginSales(view, period).sort((a, b) => b.value - a.value)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas por origem</CardTitle>
        <CardDescription>De onde vieram os negócios fechados</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <BarChart data={origins} layout="vertical" margin={{ left: 8, right: 24 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="origin"
              tick={{ fontSize: 12 }}
              width={150}
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
            <Bar dataKey="value" fill="var(--color-value)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
