import { DashboardShell } from "@/components/dashboard-shell"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { GoalProgressCard } from "@/components/dashboard/goal-progress-card"
import { CommercialSummaryCard } from "@/components/dashboard/commercial-summary-card"
import { PipelineFunnelCard } from "@/components/dashboard/pipeline-funnel-card"
import { FollowUpsCard } from "@/components/dashboard/follow-ups-card"
import { SalesByServiceChart } from "@/components/dashboard/sales-by-service-chart"
import { SalesByOriginChart } from "@/components/dashboard/sales-by-origin-chart"
import { LossReasonsChart } from "@/components/dashboard/loss-reasons-chart"
import { TeamComparisonCard } from "@/components/dashboard/team-comparison-card"

export default function DashboardPage() {
  return (
    <DashboardShell
      title="Dashboard comercial"
      description="Acompanhamento de metas, pipeline e resultados da equipe"
    >
      <KpiCards />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <GoalProgressCard />
        </div>
        <TeamComparisonCard />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PipelineFunnelCard />
        </div>
        <div className="flex flex-col gap-4">
          <CommercialSummaryCard />
          <FollowUpsCard />
        </div>
      </div>

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
