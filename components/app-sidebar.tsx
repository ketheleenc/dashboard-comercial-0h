"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboardIcon, FileBarChartIcon, TrendingUpIcon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/relatorios", label: "Relatórios", icon: FileBarChartIcon },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold">Atto</span>
            <span className="text-xs text-muted-foreground">Modelo de Gestão</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Comercial</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-2 py-1.5 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          Painel comercial · Ketheleen &amp; Priscila
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
