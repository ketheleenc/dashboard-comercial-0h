import type { ReactNode } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export function DashboardShell({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader title={title} description={description} />
        <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
