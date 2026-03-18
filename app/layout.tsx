import type { Metadata } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'

import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas-neue' })

export const metadata: Metadata = {
  title: 'Wilson Barbers - Barbería Premium en Rosario',
  description: 'Wilson Barbers: Tu barbería premium en Rosario, Argentina. Servicios profesionales de corte, afeitado y grooming. Reserva tu turno online.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased bg-background text-foreground`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
