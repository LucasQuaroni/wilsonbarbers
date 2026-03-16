'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Aquí iría la lógica de envío del formulario
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 3000)
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="py-12 sm:py-16 bg-secondary border-b border-border animate-slide-down">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">Wilson Barbers - Contacto</h1>
          <p className="text-muted-foreground text-base sm:text-lg">Comunícate con nosotros. Estamos aquí para responder tus preguntas.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {/* Contact Info Cards */}
            <div className="p-6 sm:p-8 rounded-lg border border-border bg-card animate-slide-up card-hover" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                  <Phone className="w-6 h-6 text-primary animate-float" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Teléfono</h3>
              </div>
              <p className="text-foreground font-semibold mb-1 text-lg">(0341) XXXX-XXXX</p>
              <p className="text-sm text-muted-foreground">Llamanos de lunes a sábado</p>
            </div>

            <div className="p-6 sm:p-8 rounded-lg border border-border bg-card animate-slide-up card-hover" style={{ animationDelay: '150ms' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                  <Mail className="w-6 h-6 text-primary animate-float" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Email</h3>
              </div>
              <p className="text-foreground font-semibold mb-1">info@barberia.com</p>
              <p className="text-sm text-muted-foreground">Te responderemos en 24 horas</p>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Horarios</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Lunes - Viernes: 09:00 - 19:00</p>
              <p className="text-sm text-muted-foreground">Sábado: 09:00 - 14:00</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulario */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Envíanos un Mensaje</h2>
              
              {submitted && (
                <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-primary font-semibold">¡Mensaje enviado exitosamente! Te contactaremos pronto.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="(0341) XXXX-XXXX"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="Tu mensaje aquí..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>

            {/* Mapa e Información */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Ubicación</h2>
              
              <div className="mb-6 rounded-lg overflow-hidden border border-border">
                <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground font-semibold">San Juan 1234, Rosario</p>
                    <p className="text-sm text-muted-foreground">Centro de Rosario</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Información de la Ubicación
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Dirección</p>
                      <p className="text-sm text-muted-foreground">San Juan 1234, Rosario, Santa Fe</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Teléfono</p>
                      <p className="text-sm text-muted-foreground">(0341) XXXX-XXXX</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Horarios</p>
                      <p className="text-sm text-muted-foreground">Lunes - Viernes: 09:00 - 19:00</p>
                      <p className="text-sm text-muted-foreground">Sábado: 09:00 - 14:00</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
