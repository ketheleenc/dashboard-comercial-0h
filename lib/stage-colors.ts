import type { PipelineStage } from "./types"

// Exact CRM status labels — do not swap for synonyms.
export const STAGE_LABELS: Record<PipelineStage, string> = {
  prospect: "PROSPECT",
  negociacao: "EM NEGOCIAÇÃO",
  quente: "NEGÓCIO QUENTE",
  aprovados: "APROVADO",
  reprovado: "REPROVADO",
}

// Gradual green progression from prospect to approved, red for reproved.
export const STAGE_COLORS: Record<PipelineStage, string> = {
  prospect: "#dcfce7",
  negociacao: "#86efac",
  quente: "#22c55e",
  aprovados: "#15803d",
  reprovado: "#dc2626",
}

export const STAGE_ORDER: PipelineStage[] = ["prospect", "negociacao", "quente", "aprovados", "reprovado"]
