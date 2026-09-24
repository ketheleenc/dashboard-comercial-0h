import type {
  CommercialSummary,
  FollowUpSummary,
  LossReason,
  MonthlyResult,
  OriginSales,
  PeriodOption,
  PipelineEntry,
  PipelineStage,
  Salesperson,
  SalespersonId,
  ServiceSales,
  ViewId,
} from "./types"
import { STAGE_LABELS } from "./stage-colors"

export const SALESPEOPLE: Salesperson[] = [
  {
    id: "ketheleen",
    name: "Ketheleen Santos",
    avatar: "/avatars/ketheleen-santos.png",
    monthlyGoal: 100000,
  },
  {
    id: "priscila",
    name: "Priscila Suzane",
    avatar: "/avatars/priscila-suzane.png",
    monthlyGoal: 100000,
  },
]

export const TEAM_MONTHLY_GOAL = 200000

export const PERIODS: (PeriodOption & { daysInMonth: number; daysElapsed: number; isCurrent?: boolean })[] = [
  { value: "2025-01", label: "Janeiro 2025", daysInMonth: 31, daysElapsed: 31 },
  { value: "2025-02", label: "Fevereiro 2025", daysInMonth: 28, daysElapsed: 28 },
  { value: "2025-03", label: "Março 2025", daysInMonth: 31, daysElapsed: 31 },
  { value: "2025-04", label: "Abril 2025", daysInMonth: 30, daysElapsed: 30 },
  { value: "2025-05", label: "Maio 2025", daysInMonth: 31, daysElapsed: 31 },
  { value: "2025-06", label: "Junho 2025", daysInMonth: 30, daysElapsed: 18, isCurrent: true },
]

export const DEFAULT_PERIOD = PERIODS[PERIODS.length - 1].value

// Achieved revenue per salesperson per month (mock, ready to be replaced by real CRM data).
const ACHIEVED: Record<SalespersonId, Record<string, number>> = {
  ketheleen: {
    "2025-01": 72000,
    "2025-02": 88000,
    "2025-03": 95000,
    "2025-04": 54000,
    "2025-05": 97000,
    "2025-06": 64000,
  },
  priscila: {
    "2025-01": 65000,
    "2025-02": 79000,
    "2025-03": 91000,
    "2025-04": 58000,
    "2025-05": 88000,
    "2025-06": 59000,
  },
}

export function getGoal(view: ViewId): number {
  if (view === "team") return TEAM_MONTHLY_GOAL
  return SALESPEOPLE.find((s) => s.id === view)?.monthlyGoal ?? 0
}

export function getAchieved(view: ViewId, period: string): number {
  if (view === "team") {
    return SALESPEOPLE.reduce((sum, s) => sum + (ACHIEVED[s.id][period] ?? 0), 0)
  }
  return ACHIEVED[view]?.[period] ?? 0
}

export function getMonthlyResults(view: ViewId): MonthlyResult[] {
  return PERIODS.map((p) => ({
    month: p.value,
    label: p.label.split(" ")[0],
    salespersonId: view === "team" ? ("ketheleen" as SalespersonId) : view,
    goal: getGoal(view),
    achieved: getAchieved(view, p.value),
  }))
}

export function getDaysRemaining(period: string): number {
  const p = PERIODS.find((x) => x.value === period)
  if (!p) return 0
  if (p.isCurrent) return Math.max(p.daysInMonth - p.daysElapsed, 0)
  const latest = PERIODS[PERIODS.length - 1]
  return p.value < latest.value ? 0 : Math.max(p.daysInMonth - p.daysElapsed, 0)
}

export function getPeriodMeta(period: string) {
  return PERIODS.find((p) => p.value === period) ?? PERIODS[PERIODS.length - 1]
}

export function getPreviousAchieved(view: ViewId, period: string): number | null {
  const idx = PERIODS.findIndex((p) => p.value === period)
  if (idx <= 0) return null
  return getAchieved(view, PERIODS[idx - 1].value)
}

export function getProjectedAchieved(view: ViewId, period: string): number {
  const meta = getPeriodMeta(period)
  const achieved = getAchieved(view, period)
  if (!meta.isCurrent || meta.daysElapsed === 0) return achieved
  return Math.round((achieved / meta.daysElapsed) * meta.daysInMonth)
}

// --- Pipeline -------------------------------------------------------------

const PIPELINE_BASE: Record<SalespersonId, { stage: PipelineStage; label: string; count: number; value: number }[]> = {
  ketheleen: [
    { stage: "prospect", label: STAGE_LABELS.prospect, count: 12, value: 104000 },
    { stage: "negociacao", label: STAGE_LABELS.negociacao, count: 4, value: 64000 },
    { stage: "quente", label: STAGE_LABELS.quente, count: 3, value: 51000 },
    { stage: "aprovados", label: STAGE_LABELS.aprovados, count: 2, value: 40000 },
    { stage: "reprovado", label: STAGE_LABELS.reprovado, count: 3, value: 32000 },
  ],
  priscila: [
    { stage: "prospect", label: STAGE_LABELS.prospect, count: 9, value: 76000 },
    { stage: "negociacao", label: STAGE_LABELS.negociacao, count: 4, value: 56000 },
    { stage: "quente", label: STAGE_LABELS.quente, count: 2, value: 34000 },
    { stage: "aprovados", label: STAGE_LABELS.aprovados, count: 2, value: 38000 },
    { stage: "reprovado", label: STAGE_LABELS.reprovado, count: 2, value: 21000 },
  ],
}

const PERIOD_SCALE: Record<string, number> = {
  "2025-01": 0.72,
  "2025-02": 0.8,
  "2025-03": 0.9,
  "2025-04": 0.68,
  "2025-05": 0.95,
  "2025-06": 1,
}

function scalePipeline(entries: (typeof PIPELINE_BASE)["ketheleen"], scale: number): PipelineEntry[] {
  return entries.map((e) => ({
    ...e,
    count: Math.max(1, Math.round(e.count * scale)),
    value: Math.round((e.value * scale) / 1000) * 1000,
  }))
}

export function getPipeline(view: ViewId, period: string): PipelineEntry[] {
  const scale = PERIOD_SCALE[period] ?? 1
  if (view === "team") {
    const a = scalePipeline(PIPELINE_BASE.ketheleen, scale)
    const b = scalePipeline(PIPELINE_BASE.priscila, scale)
    return a.map((entry, i) => ({
      stage: entry.stage,
      label: entry.label,
      count: entry.count + b[i].count,
      value: entry.value + b[i].value,
    }))
  }
  return scalePipeline(PIPELINE_BASE[view], scale)
}

export function getPipelineTotal(pipeline: PipelineEntry[]) {
  const open = pipeline.filter((p) => p.stage !== "reprovado" && p.stage !== "aprovados")
  return {
    count: open.reduce((s, p) => s + p.count, 0),
    value: open.reduce((s, p) => s + p.value, 0),
  }
}

// --- Serviços e origens -----------------------------------------------------

const SERVICE_SHARE: { service: string; ketheleen: number; priscila: number }[] = [
  { service: "Terceirização da Qualidade", ketheleen: 0.3, priscila: 0.24 },
  { service: "Implantação ISO 9001", ketheleen: 0.2, priscila: 0.24 },
  { service: "Manutenção/Evolução do SGQ", ketheleen: 0.13, priscila: 0.15 },
  { service: "Auditoria", ketheleen: 0.12, priscila: 0.08 },
  { service: "Treinamentos", ketheleen: 0.06, priscila: 0.11 },
  { service: "Certificação", ketheleen: 0.08, priscila: 0.08 },
  { service: "IATF", ketheleen: 0.06, priscila: 0.04 },
  { service: "ISO 14001", ketheleen: 0.03, priscila: 0.04 },
  { service: "Outros", ketheleen: 0.02, priscila: 0.02 },
]

export function getServiceSales(view: ViewId, period: string): ServiceSales[] {
  if (view === "team") {
    const k = getServiceSales("ketheleen", period)
    const p = getServiceSales("priscila", period)
    return k.map((entry, i) => ({ service: entry.service, value: entry.value + p[i].value }))
  }
  const achieved = getAchieved(view, period)
  return SERVICE_SHARE.map((s) => ({
    service: s.service,
    value: Math.round((achieved * s[view]) / 500) * 500,
  }))
}

const ORIGIN_SHARE: { origin: string; share: number; avgTicket: number }[] = [
  { origin: "Indicação", share: 0.27, avgTicket: 15000 },
  { origin: "Eventos", share: 0.21, avgTicket: 13000 },
  { origin: "Google", share: 0.2, avgTicket: 9500 },
  { origin: "LinkedIn", share: 0.17, avgTicket: 11000 },
  { origin: "Recuperação de negociação antiga", share: 0.1, avgTicket: 14000 },
  { origin: "Outros", share: 0.05, avgTicket: 8000 },
]

export function getOriginSales(view: ViewId, period: string): OriginSales[] {
  const achieved = getAchieved(view, period)
  return ORIGIN_SHARE.map((o) => {
    const value = Math.round((achieved * o.share) / 500) * 500
    return {
      origin: o.origin,
      value,
      count: Math.max(1, Math.round(value / o.avgTicket)),
    }
  })
}

// --- Motivos de perda -------------------------------------------------------

const LOSS_BASE: Record<SalespersonId, { reason: string; count: number }[]> = {
  ketheleen: [
    { reason: "Sem retorno", count: 4 },
    { reason: "Fechou com outra empresa", count: 2 },
    { reason: "Projeto adiado", count: 2 },
    { reason: "Preço", count: 5 },
    { reason: "Projeto cancelado", count: 1 },
    { reason: "Outros", count: 2 },
  ],
  priscila: [
    { reason: "Sem retorno", count: 3 },
    { reason: "Fechou com outra empresa", count: 1 },
    { reason: "Projeto adiado", count: 1 },
    { reason: "Preço", count: 5 },
    { reason: "Projeto cancelado", count: 1 },
    { reason: "Outros", count: 2 },
  ],
}

export function getLossReasons(view: ViewId, period: string): LossReason[] {
  const scale = PERIOD_SCALE[period] ?? 1
  if (view === "team") {
    const a = getLossReasons("ketheleen", period)
    const b = getLossReasons("priscila", period)
    return a.map((entry, i) => ({ reason: entry.reason, count: entry.count + b[i].count }))
  }
  return LOSS_BASE[view].map((l) => ({ reason: l.reason, count: Math.max(0, Math.round(l.count * scale)) }))
}

// --- Follow-ups ---------------------------------------------------------

const FOLLOWUP_BASE: Record<SalespersonId, FollowUpSummary> = {
  ketheleen: { overdue: 3, today: 2, upcoming: 6 },
  priscila: { overdue: 2, today: 1, upcoming: 5 },
}

export function getFollowUpSummary(view: ViewId): FollowUpSummary {
  if (view === "team") {
    const a = FOLLOWUP_BASE.ketheleen
    const b = FOLLOWUP_BASE.priscila
    return {
      overdue: a.overdue + b.overdue,
      today: a.today + b.today,
      upcoming: a.upcoming + b.upcoming,
    }
  }
  return FOLLOWUP_BASE[view]
}

// --- Resumo comercial ---------------------------------------------------

export function getCommercialSummary(view: ViewId, period: string): CommercialSummary {
  const pipeline = getPipeline(view, period)
  const prospect = pipeline.find((p) => p.stage === "prospect")
  const negotiation = pipeline.find((p) => p.stage === "negociacao")
  const hot = pipeline.find((p) => p.stage === "quente")
  const approved = pipeline.find((p) => p.stage === "aprovados")
  const reproved = pipeline.find((p) => p.stage === "reprovado")
  const total = getPipelineTotal(pipeline)

  return {
    prospectCount: prospect?.count ?? 0,
    prospectValue: prospect?.value ?? 0,
    negotiationCount: negotiation?.count ?? 0,
    negotiationValue: negotiation?.value ?? 0,
    hotDealsCount: hot?.count ?? 0,
    hotDealsValue: hot?.value ?? 0,
    approvedCount: approved?.count ?? 0,
    approvedValue: approved?.value ?? 0,
    reprovedCount: reproved?.count ?? 0,
    reprovedValue: reproved?.value ?? 0,
    pipelineTotalCount: total.count,
    pipelineTotalValue: total.value,
  }
}

// --- Formatação -----------------------------------------------------------

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPercent(value: number): string {
  return `${value.toFixed(0)}%`
}
