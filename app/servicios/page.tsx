import { Scissors, Droplet, Zap, Sparkles, Flame, Clock } from 'lucide-react'
import Link from 'next/link'

export default function Servicios() {
  const title = 'Wilson Barbers - Nuestros Servicios'
  
  const services = [
    {
      id: 1,
      name: 'Corte Clásico',
      description: 'Corte tradicional con técnica de tijera. Perfecto para un look atemporal y elegante.',
      price: '$800',
      duration: '30-40 min',
      icon: Scissors,
    },
    {
      id: 2,
      name: 'Afeitado Clásico',
      description: 'Afeitado con navaja clásica y crema de afeitar premium. Relajante y con precisión total.',
      price: '$600',
      duration: '20-30 min',
      icon: Droplet,
    },
    {
      id: 3,
      name: 'Servicio Completo',
      description: 'Corte + Afeitado + Tratamiento capilar. El paquete completo de cuidado personal.',
      price: '$1200',
      duration: '60 min',
      icon: Zap,
    },
    {
      id: 4,
      name: 'Tratamiento Capilar',
      description: 'Tratamiento hidratante con productos premium. Ideal para reparar y revitalizar el cabello.',
      price: '$400',
      duration: '20-30 min',
      icon: Sparkles,
    },
    {
      id: 5,
      name: 'Coloración Capilar',
      description: 'Tinte profesional y coloración de canas. Trabajamos con las mejores marcas del mercado.',
      price: '$600',
      duration: '45-60 min',
      icon: Flame,
    },
    {
      id: 6,
      name: 'Perfilado de Barba',
      description: 'Perfilado profesional de barba con precisión de detalles. Mantén tu barba impecable.',
      price: '$300',
      duration: '15-20 min',
      icon: Clock,
    },
  ]

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="py-12 sm:py-16 bg-secondary border-b border-border animate-slide-down">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">Wilson Barbers - Servicios</h1>
          <p className="text-muted-foreground text-base sm:text-lg">Ofrecemos una variedad completa de servicios profesionales para tu cuidado personal.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={service.id}
                  style={{ animationDelay: `${index * 75}ms` }}
                  className="p-6 rounded-lg border border-border bg-card hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex flex-col animate-slide-up card-hover min-h-full"
                >
                  <div className="mb-4">
                    <Icon className="w-12 h-12 text-primary animate-float" />
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {service.name}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Precio:</span>
                      <span className="text-2xl font-bold text-primary">
                        {service.price}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Duración:</span>
                      <span className="text-sm text-foreground font-medium">
                        {service.duration}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-secondary animate-fade-in" style={{ animationDelay: '300ms' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 animate-slide-up">
            ¿Interesado en alguno de nuestros servicios?
          </h2>
          <Link
            href="/turnos"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 btn-press min-h-12 animate-slide-up"
            style={{ animationDelay: '150ms' }}
          >
            Reservar Turno Ahora
          </Link>
        </div>
      </section>
    </div>
  )
}
