'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'

export default function QuienesSomos() {
  const team = [
    {
      id: 1,
      name: 'Carlos Martínez',
      role: 'Fundador & Barbero Principal',
      bio: 'Con más de 20 años de experiencia en barbería, Carlos es especialista en cortes clásicos y modernos.',
      specialty: 'Cortes Clásicos',
    },
    {
      id: 2,
      name: 'Juan López',
      role: 'Barbero',
      bio: 'Experto en afeitado clásico con navaja. Juan es conocido por su precisión y atención al detalle.',
      specialty: 'Afeitado Clásico',
    },
    {
      id: 3,
      name: 'Roberto García',
      role: 'Barbero Especialista',
      bio: 'Especialista en diseños personalizados y coloración capilar. Siempre innovando en estilos.',
      specialty: 'Diseños y Coloración',
    },
    {
      id: 4,
      name: 'Miguel Rodríguez',
      role: 'Barbero Junior',
      bio: 'Joven barbero con técnicas modernas y pasión por su trabajo. Excelente trato al cliente.',
      specialty: 'Cortes Modernos',
    },
  ]

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="py-12 sm:py-16 bg-secondary border-b border-border animate-slide-down">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">Wilson Barbers - Equipo</h1>
          <p className="text-muted-foreground text-base sm:text-lg">Conoce al equipo de profesionales detrás de tu barbería de confianza.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24 bg-background animate-slide-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Wilson Barbers - Nuestra Historia</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              En 2004, Carlos Martínez abrió las puertas de nuestra barbería con un sueño simple pero ambicioso: ofrecerle a los hombres de Rosario un lugar donde sentirse valorados y cuidados.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Comenzamos como un pequeño local en el centro de la ciudad, con apenas dos barberos. A través de los años, nuestro compromiso con la calidad y la satisfacción del cliente nos permitió crecer hasta convertirns en una de las barbería más reconocidas de la región.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hoy, contamos con un equipo de profesionales certificados, técnicas modernas y los mejores productos disponibles en el mercado. Pero lo más importante: seguimos manteniendo esos valores que nos caracterizaban desde el día uno: atención personalizada, calidad inigualable e higiene garantizada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 rounded-lg bg-card border border-border animate-slide-up card-hover" style={{ animationDelay: '100ms' }}>
              <h3 className="text-2xl font-bold text-primary mb-4 animate-pulse-slow">20+</h3>
              <p className="text-foreground font-semibold mb-2">Años de Experiencia</p>
              <p className="text-muted-foreground">Dos décadas de trayectoria profesional y dedicación a nuestros clientes.</p>
            </div>
            <div className="p-8 rounded-lg bg-card border border-border animate-slide-up card-hover" style={{ animationDelay: '150ms' }}>
              <h3 className="text-2xl font-bold text-primary mb-4 animate-pulse-slow">5000+</h3>
              <p className="text-foreground font-semibold mb-2">Clientes Satisfechos</p>
              <p className="text-muted-foreground">Miles de hombres que confían en nosotros para su cuidado personal.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-12 text-center animate-slide-up" style={{ animationDelay: '200ms' }}>Nuestro Equipo</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <div
                key={member.id}
                style={{ animationDelay: `${250 + index * 75}ms` }}
                className="p-6 sm:p-8 rounded-lg border border-border bg-card hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 animate-slide-up card-hover"
              >
                {/* Avatar Placeholder */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center mb-4 text-4xl animate-float">
                  👨‍💼
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-semibold mb-3">
                  {member.role}
                </p>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 sm:p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-xs text-muted-foreground flex-shrink-0">Especialidad:</span>
                  <span className="text-sm font-semibold text-primary">
                    {member.specialty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-24 bg-secondary animate-fade-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center animate-slide-up">
            Nuestros Valores
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                <Star className="w-8 h-8 text-primary animate-pulse-slow" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Calidad Premium
              </h3>
              <p className="text-muted-foreground">
                Cada corte es una obra de arte. Usamos solo los mejores productos y técnicas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Atención Personalizada
              </h3>
              <p className="text-muted-foreground">
                Tu satisfacción es nuestra prioridad. Escuchamos y entendemos tus necesidades.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Profesionalismo
              </h3>
              <p className="text-muted-foreground">
                Nuestro equipo está en constante capacitación en las últimas técnicas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
