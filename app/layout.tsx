import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DashboardFiltersProvider } from '@/components/dashboard-filters'
import './globals.css'

export const metadata: Metadata = {
  title: 'Atto | Dashboard Comercial',
  description: 'Acompanhamento gerencial e comercial da equipe Atto Modelo de Gestão.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f6f7f8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <TooltipProvider delayDuration={200}>
          <DashboardFiltersProvider>{children}</DashboardFiltersProvider>
        </TooltipProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
