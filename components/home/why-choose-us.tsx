import { Award, Users, Clock, Shield } from 'lucide-react'

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Award,
      title: 'Profesionales Certificados',
      description: 'Nuestros barberos tienen años de experiencia y capacitación continua en técnicas modernas.',
    },
    {
      icon: Users,
      title: 'Atención Personalizada',
      description: 'Cada cliente recibe un trato especial y un corte adaptado a sus necesidades específicas.',
    },
    {
      icon: Clock,
      title: 'Reservas Fáciles',
      description: 'Reserva tu turno online en cualquier momento y evita filas. Sistema rápido y práctico.',
    },
    {
      icon: Shield,
      title: 'Higiene Garantizada',
      description: 'Utilizamos productos de calidad premium y mantenemos los más altos estándares de higiene.',
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Somos el lugar elegido por cientos de hombres en Rosario que buscan la mejor experiencia en cortes y afeitado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div
                key={index}
                className="flex gap-4 p-6 rounded-lg border border-border bg-card hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
