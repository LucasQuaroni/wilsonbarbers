'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface WorkingHours {
  id: string
  day_of_week: number
  open_time: string | null
  close_time: string | null
  is_closed: boolean
}

const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export default function BusinessSettings() {
  const supabase = createClient()
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [businessConfig, setBusinessConfig] = useState({
    businessName: 'Mi Barbería',
    phone: '+54 341 123-4567',
    email: 'info@barberia.com',
    address: 'Calle Principal 123, Rosario',
  })

  // Cargar configuración
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true)

        // Cargar horarios de trabajo
        const { data: hoursData, error: hoursError } = await supabase
          .from('working_hours')
          .select('*')
          .order('day_of_week', { ascending: true })

        if (hoursError) throw hoursError

        // Si no hay datos, crear valores por defecto
        if (!hoursData || hoursData.length === 0) {
          const defaultHours = Array.from({ length: 7 }, (_, i) => ({
            id: `temp-${i}`,
            day_of_week: i,
            open_time: i === 0 || i === 6 ? null : '09:00',
            close_time: i === 0 || i === 6 ? null : '19:00',
            is_closed: i === 0 || i === 6,
          }))
          setWorkingHours(defaultHours)
        } else {
          setWorkingHours(hoursData)
        }

        // Cargar configuración del negocio
        const { data: configData, error: configError } = await supabase
          .from('business_config')
          .select('key, value')

        if (configError) throw configError

        if (configData && configData.length > 0) {
          const configObj: any = {}
          configData.forEach((item) => {
            if (item.key === 'businessName') configObj.businessName = item.value
            if (item.key === 'phone') configObj.phone = item.value
            if (item.key === 'email') configObj.email = item.value
            if (item.key === 'address') configObj.address = item.value
          })
          setBusinessConfig((prev) => ({ ...prev, ...configObj }))
        }
      } catch (err) {
        console.error('Error fetching settings:', err)
        setError('Error al cargar configuración')
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleWorkingHoursChange = (
    dayIndex: number,
    field: 'open_time' | 'close_time' | 'is_closed',
    value: any
  ) => {
    const updated = [...workingHours]
    updated[dayIndex] = {
      ...updated[dayIndex],
      [field]: value,
    }
    setWorkingHours(updated)
  }

  const handleSave = async () => {
    setError('')
    setSuccess('')

    try {
      setSaving(true)

      // Guardar horarios de trabajo
      for (const hours of workingHours) {
        if (hours.id.startsWith('temp-')) {
          // Crear nuevo
          await supabase.from('working_hours').insert({
            day_of_week: hours.day_of_week,
            open_time: hours.is_closed ? null : hours.open_time,
            close_time: hours.is_closed ? null : hours.close_time,
            is_closed: hours.is_closed,
          })
        } else {
          // Actualizar existente
          await supabase
            .from('working_hours')
            .update({
              open_time: hours.is_closed ? null : hours.open_time,
              close_time: hours.is_closed ? null : hours.close_time,
              is_closed: hours.is_closed,
            })
            .eq('id', hours.id)
        }
      }

      // Guardar configuración del negocio
      for (const [key, value] of Object.entries(businessConfig)) {
        const configKey = key.charAt(0).toUpperCase() + key.slice(1)
        configKey[0] = configKey[0].toLowerCase()

        await supabase
          .from('business_config')
          .upsert({
            key: key,
            value: String(value),
          })
          .eq('key', key)
      }

      setSuccess('Configuración guardada correctamente')
    } catch (err) {
      console.error('Error saving settings:', err)
      setError('Error al guardar configuración')
    } finally {
      setSaving(false)
    }
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

      {/* Información del negocio */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Información del Negocio</CardTitle>
          <CardDescription>Datos generales de tu barbería</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nombre de la Barbería
            </label>
            <Input
              type="text"
              value={businessConfig.businessName}
              onChange={(e) =>
                setBusinessConfig((prev) => ({
                  ...prev,
                  businessName: e.target.value,
                }))
              }
              className="bg-secondary border-border text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Teléfono
              </label>
              <Input
                type="tel"
                value={businessConfig.phone}
                onChange={(e) =>
                  setBusinessConfig((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                className="bg-secondary border-border text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input
                type="email"
                value={businessConfig.email}
                onChange={(e) =>
                  setBusinessConfig((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="bg-secondary border-border text-foreground"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Dirección</label>
            <Input
              type="text"
              value={businessConfig.address}
              onChange={(e) =>
                setBusinessConfig((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              className="bg-secondary border-border text-foreground"
            />
          </div>
        </CardContent>
      </Card>

      {/* Horarios de trabajo */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Horarios de Trabajo</CardTitle>
          <CardDescription>Configura los horarios de atención por día</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Cargando...</p>
          ) : (
            <div className="space-y-3">
              {workingHours.map((hours, idx) => (
                <div key={idx} className="p-4 bg-secondary rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-3">{DAYS[hours.day_of_week]}</h4>

                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={hours.is_closed}
                            onChange={(e) =>
                              handleWorkingHoursChange(idx, 'is_closed', e.target.checked)
                            }
                            className="rounded"
                          />
                          <span className="text-sm text-foreground">Cerrado</span>
                        </label>

                        {!hours.is_closed && (
                          <div className="flex gap-2 flex-1">
                            <div>
                              <label className="text-xs text-muted-foreground">Abre</label>
                              <Input
                                type="time"
                                value={hours.open_time || '09:00'}
                                onChange={(e) =>
                                  handleWorkingHoursChange(idx, 'open_time', e.target.value)
                                }
                                className="bg-background border-border text-foreground w-20"
                              />
                            </div>

                            <div>
                              <label className="text-xs text-muted-foreground">Cierra</label>
                              <Input
                                type="time"
                                value={hours.close_time || '19:00'}
                                onChange={(e) =>
                                  handleWorkingHoursChange(idx, 'close_time', e.target.value)
                                }
                                className="bg-background border-border text-foreground w-20"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Botón de guardar */}
      <div className="flex gap-2">
        <Button
          onClick={handleSave}
          disabled={saving || loading}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {saving ? 'Guardando...' : 'Guardar Configuración'}
        </Button>
      </div>
    </div>
  )
}
