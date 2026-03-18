import { Award, Users, Clock, Shield } from 'lucide-react'

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Award,
      title: 'Profesionales Certificados',
      description: 'Nuestros barberos experimentados dominan técnicas clásicas y modernas.',
    },
    {
      icon: Users,
      title: 'Atención Personalizada',
      description: 'Asesoría de imagen para encontrar el estilo que mejor te represente.',
    },
    {
      icon: Clock,
      title: 'Reservas Sin Demoras',
      description: 'Sistema online rápido. Tu tiempo vale, nosotros lo respetamos.',
    },
    {
      icon: Shield,
      title: 'Higiene Premium',
      description: 'Herramientas esterilizadas y productos de primera línea internacional.',
    },
  ]

  return (
    <section className="py-20 sm:py-32 bg-background relative border-b border-white/5">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 border border-barber-red bg-barber-red/10 animate-pulse-slow">
            <span className="font-heading tracking-widest uppercase text-sm text-barber-red">La Diferencia</span>
          </div>
          <h2 className="font-heading text-5xl sm:text-7xl text-foreground mb-6 uppercase tracking-wider">
            ¿POR QUÉ <span className="text-barber-blue">ELEGIRNOS?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto uppercase tracking-wider font-semibold">
            Calidad, tradición y el mejor ambiente de la ciudad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div
                key={index}
                className="group flex flex-col sm:flex-row gap-6 p-8 rounded-none border border-white/10 bg-secondary/20 hover:bg-barber-blue/10 hover:border-barber-blue/50 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 bg-background border border-white/10 group-hover:border-barber-red transition-colors duration-300">
                    <Icon className="w-8 h-8 text-barber-red group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl text-foreground mb-3 uppercase tracking-wide group-hover:text-barber-red transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
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
