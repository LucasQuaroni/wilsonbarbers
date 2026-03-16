import Link from 'next/link'
import { Phone, Calendar } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full translate-y-1/2 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            ¿Listo para un Corte Impecable?
          </h2>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            No esperes más. Reserva tu turno hoy y experimenta el servicio premium que merecés. Nuestros profesionales están listos para darte el mejor corte.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/turnos"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Reservar Turno
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Llamanos
            </Link>
          </div>

          <div className="mt-12 p-6 rounded-lg bg-card border border-border">
            <p className="text-sm text-muted-foreground mb-2">
              Dirección: San Juan 1234, Rosario
            </p>
            <p className="text-sm text-muted-foreground">
              Teléfono: <span className="text-primary font-semibold">(0341) XXXX-XXXX</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
