"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDashboardFilters } from "@/components/dashboard-filters"
import { PERIODS, SALESPEOPLE } from "@/lib/data"
import type { ViewId } from "@/lib/types"

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function DashboardHeader({ title, description }: { title: string; description?: string }) {
  const { view, setView, period, setPeriod } = useDashboardFilters()

  return (
    <header className="sticky top-0 z-10 flex flex-col gap-3 border-b bg-background/95 px-4 py-3 backdrop-blur supports-backdrop-filter:bg-background/70 sm:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-5" />
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold tracking-tight">{title}</h1>
          {description ? <p className="hidden truncate text-sm text-muted-foreground sm:block">{description}</p> : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:ml-auto sm:mt-[-2.25rem] sm:justify-end">
        <Select value={view} onValueChange={(v) => setView(v as ViewId)}>
          <SelectTrigger className="w-[220px]" aria-label="Selecionar visão">
            <SelectValue placeholder="Selecionar visão">
              {(value: ViewId) => {
                if (value === "team") {
                  return (
                    <span className="flex items-center gap-2">
                      <span className="flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                        E
                      </span>
                      Equipe (visão geral)
                    </span>
                  )
                }
                const person = SALESPEOPLE.find((s) => s.id === value)
                if (!person) return "Selecionar visão"
                return (
                  <span className="flex items-center gap-2">
                    <Avatar className="size-5">
                      <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                      <AvatarFallback className="text-[10px]">{initials(person.name)}</AvatarFallback>
                    </Avatar>
                    {person.name}
                  </span>
                )
              }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="team">
                <span className="flex items-center gap-2">
                  <span className="flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                    E
                  </span>
                  Equipe (visão geral)
                </span>
              </SelectItem>
              {SALESPEOPLE.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  <span className="flex items-center gap-2">
                    <Avatar className="size-5">
                      <AvatarImage src={s.avatar || "/placeholder.svg"} alt={s.name} />
                      <AvatarFallback className="text-[10px]">{initials(s.name)}</AvatarFallback>
                    </Avatar>
                    {s.name}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[160px]" aria-label="Selecionar período">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {PERIODS.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                  {p.isCurrent ? " (atual)" : ""}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </header>
  )
}
