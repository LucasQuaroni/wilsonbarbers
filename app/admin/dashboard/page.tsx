'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LogOut, Users, Scissors, Calendar, Settings } from 'lucide-react'
import BarberManagement from '@/components/admin/barber-management'
import ServiceManagement from '@/components/admin/service-management'
import AppointmentsView from '@/components/admin/appointments-view'
import BusinessSettings from '@/components/admin/business-settings'

export default function AdminDashboard() {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/admin/login')
      } else {
        setUser(user)
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in pb-20 sm:pb-0">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">Wilson Barbers Admin</h1>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{user?.email}</p>
          </div>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2 border-border text-foreground hover:bg-secondary transition-all duration-300 btn-press min-h-11 w-full sm:w-auto"
          >
            <LogOut className="h-4 w-4" />
            <span className="sm:inline">Cerrar Sesión</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card border border-border overflow-x-auto">
            <TabsTrigger value="appointments" className="gap-1 sm:gap-2 text-xs sm:text-sm min-h-10 sm:min-h-12">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Turnos</span>
            </TabsTrigger>
            <TabsTrigger value="barbers" className="gap-1 sm:gap-2 text-xs sm:text-sm min-h-10 sm:min-h-12">
              <Users className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Barberos</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="gap-1 sm:gap-2 text-xs sm:text-sm min-h-10 sm:min-h-12">
              <Scissors className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Servicios</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-1 sm:gap-2 text-xs sm:text-sm min-h-10 sm:min-h-12">
              <Settings className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Config</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-4">
            <AppointmentsView />
          </TabsContent>

          <TabsContent value="barbers" className="space-y-4">
            <BarberManagement />
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <ServiceManagement />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <BusinessSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
