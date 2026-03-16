'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Trash2, CheckCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'

interface Appointment {
  id: string
  client_name: string
  client_email: string
  client_phone: string | null
  appointment_date: string
  appointment_time: string
  status: string
  notes: string | null
  barber: { name: string }
  service: { name: string }
}

export default function AppointmentsView() {
  const supabase = createClient()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0])

  // Cargar turnos
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('appointments')
          .select(
            `
            *,
            barber:barber_id(name),
            service:service_id(name)
          `
          )
          .gte('appointment_date', filterDate)
          .order('appointment_date', { ascending: true })
          .order('appointment_time', { ascending: true })

        if (error) throw error
        setAppointments(data || [])
      } catch (err) {
        console.error('Error fetching appointments:', err)
        setError('Error al cargar los turnos')
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [filterDate])

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este turno?')) return

    try {
      const { error } = await supabase.from('appointments').delete().eq('id', id)

      if (error) throw error

      setAppointments(appointments.filter((a) => a.id !== id))
      setSuccess('Turno eliminado correctamente')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('Error:', err)
      setError('Error al eliminar el turno')
    }
  }

  const handleMarkComplete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'completed' })
        .eq('id', id)

      if (error) throw error

      setAppointments(
        appointments.map((a) => (a.id === id ? { ...a, status: 'completed' } : a))
      )
      setSuccess('Turno marcado como completado')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('Error:', err)
      setError('Error al actualizar el turno')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-900/20 text-blue-600 border-blue-800'
      case 'completed':
        return 'bg-green-900/20 text-green-600 border-green-800'
      case 'cancelled':
        return 'bg-red-900/20 text-red-600 border-red-800'
      default:
        return 'bg-gray-900/20 text-gray-600'
    }
  }

  const formatTime = (time: string) => {
    return time.substring(0, 5)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-AR', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-900/20 border-green-800">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">{success}</AlertDescription>
        </Alert>
      )}

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Turnos Agendados</CardTitle>
              <CardDescription>Gestiona los turnos de tus clientes</CardDescription>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mr-2">Desde:</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="bg-secondary border border-border text-foreground rounded px-2 py-1 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Cargando turnos...</p>
          ) : appointments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No hay turnos agendados para esta fecha
            </p>
          ) : (
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 bg-secondary rounded-lg border border-border"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{appointment.client_name}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.client_email}</p>
                    </div>
                    <Badge className={`${getStatusColor(appointment.status)} border`}>
                      {appointment.status === 'confirmed'
                        ? 'Confirmado'
                        : appointment.status === 'completed'
                          ? 'Completado'
                          : 'Cancelado'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Fecha</p>
                      <p className="font-semibold text-foreground">
                        {formatDate(appointment.appointment_date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Hora</p>
                      <p className="font-semibold text-foreground">
                        {formatTime(appointment.appointment_time)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Barbero</p>
                      <p className="font-semibold text-foreground">{appointment.barber?.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Servicio</p>
                      <p className="font-semibold text-foreground">{appointment.service?.name}</p>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mb-3 p-2 bg-background rounded text-sm text-muted-foreground">
                      <p className="font-medium mb-1">Notas:</p>
                      <p>{appointment.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {appointment.status === 'confirmed' && (
                      <Button
                        size="sm"
                        onClick={() => handleMarkComplete(appointment.id)}
                        className="bg-green-700 hover:bg-green-800"
                      >
                        Marcar como completado
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(appointment.id)}
                      className="border-border text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
