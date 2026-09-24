import { DashboardShell } from "@/components/dashboard-shell"
import { MonthlyHistoryChart } from "@/components/dashboard/monthly-history-chart"
import { MonthlyHistoryTable } from "@/components/dashboard/monthly-history-table"
import { SalesByServiceChart } from "@/components/dashboard/sales-by-service-chart"
import { SalesByOriginChart } from "@/components/dashboard/sales-by-origin-chart"
import { LossReasonsChart } from "@/components/dashboard/loss-reasons-chart"

export default function RelatoriosPage() {
  return (
    <DashboardShell
      title="Relatórios"
      description="Histórico de metas, resultados e distribuição de vendas"
    >
      <MonthlyHistoryChart />
      <MonthlyHistoryTable />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SalesByServiceChart />
        <SalesByOriginChart />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <LossReasonsChart />
      </div>
    </DashboardShell>
  )
}
