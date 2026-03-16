'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, CheckCircle, Calendar } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Barber {
  id: string
  name: string
  role: string
}

interface Service {
  id: string
  name: string
  duration_minutes: number
  price: number
}

export default function TurnosPage() {
  const supabase = createClient()
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    barberId: '',
    serviceId: '',
    appointmentDate: '',
    appointmentTime: '',
    notes: '',
  })

  // Cargar barberos y servicios
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [barbersRes, servicesRes] = await Promise.all([
          supabase
            .from('barbers')
            .select('id, name, role')
            .eq('is_active', true)
            .order('display_order', { ascending: true }),
          supabase
            .from('services')
            .select('id, name, duration_minutes, price')
            .eq('is_active', true)
            .order('display_order', { ascending: true }),
        ])

        if (barbersRes.error) throw barbersRes.error
        if (servicesRes.error) throw servicesRes.error

        setBarbers(barbersRes.data || [])
        setServices(servicesRes.data || [])
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Error al cargar barberos y servicios')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (
      !formData.clientName ||
      !formData.clientEmail ||
      !formData.barberId ||
      !formData.serviceId ||
      !formData.appointmentDate ||
      !formData.appointmentTime
    ) {
      setError('Por favor, completa todos los campos obligatorios.')
      return
    }

    try {
      setSubmitting(true)

      // Llamar al API route para crear el turno y enviar emails
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: formData.clientName,
          clientEmail: formData.clientEmail,
          clientPhone: formData.clientPhone,
          barberId: formData.barberId,
          serviceId: formData.serviceId,
          appointmentDate: formData.appointmentDate,
          appointmentTime: formData.appointmentTime,
          notes: formData.notes,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al crear el turno')
      }

      setSuccess(true)
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        barberId: '',
        serviceId: '',
        appointmentDate: '',
        appointmentTime: '',
        notes: '',
      })

      // Limpiar el mensaje de éxito después de 5 segundos
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error('Error creating appointment:', err)
      setError('Error al reservar el turno. Por favor, intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8 pb-20 sm:pb-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 animate-slide-down">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">Wilson Barbers - Reserva tu Turno</h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Elige tu barbero, servicio y horario preferido
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 animate-scale-in">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 bg-green-900/20 border-green-800 animate-scale-in">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              ¡Turno reservado correctamente! Recibirás un email de confirmación en breve.
            </AlertDescription>
          </Alert>
        )}

        <Card className="bg-card border-border animate-scale-in">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-2xl sm:text-3xl text-primary">Formulario de Reserva</CardTitle>
            <CardDescription>Completa los datos para reservar tu turno</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Cargando información...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Datos del cliente */}
                <div className="space-y-4 sm:space-y-5">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">Tus Datos</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nombre Completo *
                      </label>
                      <Input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        placeholder="Tu nombre"
                        className="bg-secondary border-border text-foreground text-base sm:text-sm min-h-12 sm:min-h-10 px-4"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="clientEmail"
                        value={formData.clientEmail}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                        className="bg-secondary border-border text-foreground text-base sm:text-sm min-h-12 sm:min-h-10 px-4"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Teléfono (opcional)
                    </label>
                    <Input
                      type="tel"
                      name="clientPhone"
                      value={formData.clientPhone}
                      onChange={handleInputChange}
                      placeholder="+54 341 123 4567"
                      className="bg-secondary border-border text-foreground text-base sm:text-sm min-h-12 sm:min-h-10 px-4"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                {/* Selección de servicio y barbero */}
                <div className="space-y-4 sm:space-y-5">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">Servicio y Profesional</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Servicio *
                      </label>
                      <Select
                        value={formData.serviceId}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            serviceId: value,
                          }))
                        }
                      >
                        <SelectTrigger className="bg-secondary border-border text-base sm:text-sm min-h-12 sm:min-h-10">
                          <SelectValue placeholder="Elige un servicio" />
                        </SelectTrigger>
                        <SelectContent className="bg-secondary border-border">
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.id} className="min-h-10">
                              {service.name} ({service.duration_minutes} min)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Barbero *
                      </label>
                      <Select
                        value={formData.barberId}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            barberId: value,
                          }))
                        }
                      >
                        <SelectTrigger className="bg-secondary border-border text-base sm:text-sm min-h-12 sm:min-h-10">
                          <SelectValue placeholder="Elige un barbero" />
                        </SelectTrigger>
                        <SelectContent className="bg-secondary border-border">
                          {barbers.map((barber) => (
                            <SelectItem key={barber.id} value={barber.id} className="min-h-10">
                              {barber.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Fecha y hora */}
                <div className="space-y-4 sm:space-y-5">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">Fecha y Hora</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Fecha *
                      </label>
                      <Input
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="bg-secondary border-border text-foreground text-base sm:text-sm min-h-12 sm:min-h-10 px-4"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Hora *
                      </label>
                      <Input
                        type="time"
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleInputChange}
                        className="bg-secondary border-border text-foreground text-base sm:text-sm min-h-12 sm:min-h-10 px-4"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Notas */}
                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Notas o comentarios (opcional)
                    </label>
                    <Textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Cuéntanos si tienes preferencias especiales..."
                      className="bg-secondary border-border text-foreground text-base sm:text-sm min-h-24 sm:min-h-32 px-4 py-3"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitting || loading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base sm:text-sm min-h-14 sm:min-h-11 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 btn-press mt-6 sm:mt-8"
                >
                  {submitting ? 'Reservando...' : 'Reservar Turno'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Info section */}
        <Card className="bg-card border-border mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Calendar className="h-5 w-5" />
              Información importante
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>• Recibirás un email de confirmación con los detalles de tu turno</p>
            <p>• Recibirás un recordatorio 15 minutos antes de tu cita</p>
            <p>• Si necesitas cambiar o cancelar, contáctanos al (341) 123-4567</p>
            <p>• Los turnos son sin costo, solo necesitas reservar tu horario</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
