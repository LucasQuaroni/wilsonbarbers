import Link from 'next/link'
import { Scissors, Droplet, Zap } from 'lucide-react'

export default function ServicesPreview() {
  const services = [
    {
      id: 1,
      name: 'Corte Clásico',
      description: 'Corte tradicional con técnica de tijera. Perfecto para un look atemporal.',
      icon: Scissors,
      price: '$800',
    },
    {
      id: 2,
      name: 'Afeitado Clásico',
      description: 'Afeitado con navaja y crema de afeitar premium. Relajante y precisión total.',
      icon: Droplet,
      price: '$600',
    },
    {
      id: 3,
      name: 'Servicio Completo',
      description: 'Corte + Afeitado + Tratamiento capilar. El paquete completo de cuidado.',
      icon: Zap,
      price: '$1200',
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos una variedad de servicios profesionales para tu cuidado personal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className="group p-6 rounded-lg border border-border bg-card hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="mb-4">
                  <Icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {service.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {service.price}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="/servicios"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors"
          >
            Ver Todos los Servicios
          </Link>
        </div>
      </div>
    </section>
  )
}
