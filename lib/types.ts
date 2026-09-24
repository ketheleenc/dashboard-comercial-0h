export type SalespersonId = "ketheleen" | "priscila"
export type ViewId = SalespersonId | "team"

export interface Salesperson {
  id: SalespersonId
  name: string
  avatar: string
  monthlyGoal: number
}

export interface MonthlyResult {
  month: string
  label: string
  salespersonId: SalespersonId
  goal: number
  achieved: number
}

export type PipelineStage = "novos" | "qualificados" | "negociacao" | "quente" | "aprovados" | "perdidos"

export interface PipelineEntry {
  stage: PipelineStage
  label: string
  count: number
  value: number
}

export interface ServiceSales {
  service: string
  value: number
}

export interface OriginSales {
  origin: string
  count: number
  value: number
}

export interface LossReason {
  reason: string
  count: number
}

export interface FollowUpSummary {
  overdue: number
  today: number
  upcoming: number
}

export interface CommercialSummary {
  approvedCount: number
  approvedValue: number
  negotiationCount: number
  negotiationValue: number
  hotDealsCount: number
  hotDealsValue: number
  pipelineTotalCount: number
  pipelineTotalValue: number
}

export interface PeriodOption {
  value: string
  label: string
}
