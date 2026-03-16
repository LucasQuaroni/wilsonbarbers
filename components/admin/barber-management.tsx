'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, CheckCircle, Trash2, Edit2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Barber {
  id: string
  name: string
  role: string
  bio: string | null
  email: string | null
  is_active: boolean
}

export default function BarberManagement() {
  const supabase = createClient()
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    email: '',
  })

  // Cargar barberos
  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('barbers')
          .select('*')
          .order('display_order', { ascending: true })

        if (error) throw error
        setBarbers(data || [])
      } catch (err) {
        console.error('Error fetching barbers:', err)
        setError('Error al cargar barberos')
      } finally {
        setLoading(false)
      }
    }

    fetchBarbers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.name || !formData.role) {
      setError('Nombre y rol son requeridos')
      return
    }

    try {
      setSubmitting(true)

      if (editingId) {
        // Actualizar barbero
        const { error } = await supabase
          .from('barbers')
          .update({
            name: formData.name,
            role: formData.role,
            bio: formData.bio,
            email: formData.email,
          })
          .eq('id', editingId)

        if (error) throw error

        setBarbers(
          barbers.map((b) =>
            b.id === editingId
              ? {
                  ...b,
                  name: formData.name,
                  role: formData.role,
                  bio: formData.bio,
                  email: formData.email,
                }
              : b
          )
        )
        setSuccess('Barbero actualizado correctamente')
        setEditingId(null)
      } else {
        // Crear nuevo barbero
        const { data, error } = await supabase
          .from('barbers')
          .insert({
            name: formData.name,
            role: formData.role,
            bio: formData.bio,
            email: formData.email,
          })
          .select()

        if (error) throw error

        if (data && data[0]) {
          setBarbers([...barbers, data[0]])
        }
        setSuccess('Barbero creado correctamente')
      }

      setFormData({ name: '', role: '', bio: '', email: '' })
    } catch (err) {
      console.error('Error:', err)
      setError('Error al guardar el barbero')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (barber: Barber) => {
    setFormData({
      name: barber.name,
      role: barber.role,
      bio: barber.bio || '',
      email: barber.email || '',
    })
    setEditingId(barber.id)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este barbero?')) return

    try {
      const { error } = await supabase.from('barbers').delete().eq('id', id)

      if (error) throw error

      setBarbers(barbers.filter((b) => b.id !== id))
      setSuccess('Barbero eliminado correctamente')
    } catch (err) {
      console.error('Error:', err)
      setError('Error al eliminar el barbero')
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({ name: '', role: '', bio: '', email: '' })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>{editingId ? 'Editar Barbero' : 'Agregar Nuevo Barbero'}</CardTitle>
          <CardDescription>
            {editingId
              ? 'Actualiza la información del barbero'
              : 'Crea un nuevo perfil de barbero'}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre *
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Juan García"
                  className="bg-secondary border-border text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Rol *</label>
                <Input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Barbero / Maestro Barbero"
                  className="bg-secondary border-border text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="juan@barberia.com"
                className="bg-secondary border-border text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Descripción/Biografía
              </label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Cuéntanos sobre este profesional..."
                className="bg-secondary border-border text-foreground min-h-24"
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {submitting ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear Barbero'}
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

      {/* Lista de barberos */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Lista de Barberos</CardTitle>
          <CardDescription>Gestiona los profesionales de tu barbería</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Cargando...</p>
          ) : barbers.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No hay barberos registrados aún
            </p>
          ) : (
            <div className="space-y-3">
              {barbers.map((barber) => (
                <div
                  key={barber.id}
                  className="flex items-start justify-between p-4 bg-secondary rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{barber.name}</h3>
                    <p className="text-sm text-muted-foreground">{barber.role}</p>
                    {barber.email && (
                      <p className="text-sm text-muted-foreground">{barber.email}</p>
                    )}
                    {barber.bio && (
                      <p className="text-sm text-muted-foreground mt-2">{barber.bio}</p>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(barber)}
                      className="border-border"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(barber.id)}
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
