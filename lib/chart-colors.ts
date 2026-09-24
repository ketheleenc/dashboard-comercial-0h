export const CATEGORY_PALETTE = [
  "#f2b705",
  "#1b1b1d",
  "#16a34a",
  "#2563eb",
  "#dc2626",
  "#7c3aed",
  "#0d9488",
  "#ea580c",
  "#64748b",
  "#db2777",
]

export function paletteColor(index: number): string {
  return CATEGORY_PALETTE[index % CATEGORY_PALETTE.length]
}
