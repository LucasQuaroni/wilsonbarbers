'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, CheckCircle, Trash2, Edit2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Service {
  id: string
  name: string
  description: string | null
  price: number | null
  duration_minutes: number
  is_active: boolean
}

export default function ServiceManagement() {
  const supabase = createClient()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration_minutes: '30',
  })

  // Cargar servicios
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('display_order', { ascending: true })

        if (error) throw error
        setServices(data || [])
      } catch (err) {
        console.error('Error fetching services:', err)
        setError('Error al cargar servicios')
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.name || !formData.duration_minutes) {
      setError('Nombre y duración son requeridos')
      return
    }

    try {
      setSubmitting(true)

      const serviceData = {
        name: formData.name,
        description: formData.description || null,
        price: formData.price ? parseFloat(formData.price) : null,
        duration_minutes: parseInt(formData.duration_minutes),
      }

      if (editingId) {
        // Actualizar servicio
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingId)

        if (error) throw error

        setServices(
          services.map((s) =>
            s.id === editingId
              ? {
                  ...s,
                  ...serviceData,
                }
              : s
          )
        )
        setSuccess('Servicio actualizado correctamente')
        setEditingId(null)
      } else {
        // Crear nuevo servicio
        const { data, error } = await supabase
          .from('services')
          .insert(serviceData)
          .select()

        if (error) throw error

        if (data && data[0]) {
          setServices([...services, data[0]])
        }
        setSuccess('Servicio creado correctamente')
      }

      setFormData({ name: '', description: '', price: '', duration_minutes: '30' })
    } catch (err) {
      console.error('Error:', err)
      setError('Error al guardar el servicio')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (service: Service) => {
    setFormData({
      name: service.name,
      description: service.description || '',
      price: service.price ? service.price.toString() : '',
      duration_minutes: service.duration_minutes.toString(),
    })
    setEditingId(service.id)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este servicio?')) return

    try {
      const { error } = await supabase.from('services').delete().eq('id', id)

      if (error) throw error

      setServices(services.filter((s) => s.id !== id))
      setSuccess('Servicio eliminado correctamente')
    } catch (err) {
      console.error('Error:', err)
      setError('Error al eliminar el servicio')
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({ name: '', description: '', price: '', duration_minutes: '30' })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>{editingId ? 'Editar Servicio' : 'Agregar Nuevo Servicio'}</CardTitle>
          <CardDescription>
            {editingId ? 'Actualiza la información del servicio' : 'Crea un nuevo servicio'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 bg-green-900/20 border-green-800">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nombre del Servicio *
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Corte Clásico"
                className="bg-secondary border-border text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Descripción
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe el servicio..."
                className="bg-secondary border-border text-foreground min-h-20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Duración (minutos) *
                </label>
                <Input
                  type="number"
                  value={formData.duration_minutes}
                  onChange={(e) =>
                    setFormData({ ...formData, duration_minutes: e.target.value })
                  }
                  min="15"
                  step="5"
                  className="bg-secondary border-border text-foreground"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Precio (opcional)
                </label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="bg-secondary border-border text-foreground"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {submitting ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear Servicio'}
              </Button>

              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="border-border"
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Lista de servicios */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Lista de Servicios</CardTitle>
          <CardDescription>Gestiona los servicios disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Cargando...</p>
          ) : services.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No hay servicios registrados aún
            </p>
          ) : (
            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-start justify-between p-4 bg-secondary rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{service.name}</h3>
                    {service.description && (
                      <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                    )}
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <span>⏱ {service.duration_minutes} min</span>
                      {service.price && <span>💰 ${service.price.toFixed(2)}</span>}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(service)}
                      className="border-border"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(service.id)}
                      className="border-border text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
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
