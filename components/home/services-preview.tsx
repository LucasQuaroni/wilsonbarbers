import Link from 'next/link'
import { Scissors, Droplet, Zap } from 'lucide-react'

export default function ServicesPreview() {
  const services = [
    {
      id: 1,
      name: 'Corte Clásico',
      description: 'Corte tradicional con técnica de tijera. Perfecto para un look atemporal.',
      icon: Scissors,
      price: '$8.000',
    },
    {
      id: 2,
      name: 'Afeitado Clásico',
      description: 'Afeitado con navaja y toalla caliente. Relajación y precisión total.',
      icon: Droplet,
      price: '$6.000',
    },
    {
      id: 3,
      name: 'Servicio Premium',
      description: 'Corte + Afeitado + Tratamiento capilar. El paquete completo de cuidado.',
      icon: Zap,
      price: '$12.000',
    },
  ]

  return (
    <section className="py-20 sm:py-32 bg-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-secondary/20 -skew-x-12 translate-x-1/2 pointer-events-none"></div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl sm:text-7xl text-foreground mb-6 uppercase tracking-wider">
            Nuestros <span className="text-barber-red">Servicios</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto uppercase tracking-wider font-semibold">
            Tratamientos profesionales para tu cuidado personal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className="group relative p-8 bg-secondary/30 backdrop-blur-sm border border-white/5 hover:border-barber-red/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-barber-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border border-white/10 group-hover:border-barber-red transition-colors duration-300">
                    <Icon className="w-8 h-8 text-barber-red group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-heading text-3xl text-foreground mb-3 uppercase tracking-wide group-hover:text-barber-red transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="/servicios"
            className="inline-flex items-center justify-center px-10 py-5 bg-transparent border-2 border-barber-red text-barber-red font-heading text-xl uppercase tracking-widest hover:bg-barber-red hover:text-white transition-all duration-300"
          >
            Ver Todos los Servicios
          </Link>
        </div>
      </div>
    </section>
  )
}
