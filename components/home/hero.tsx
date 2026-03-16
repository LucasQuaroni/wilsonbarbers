import Link from 'next/link'
import { ArrowRight, Scissors } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary via-background to-background pt-20 pb-16 sm:pt-32 sm:pb-24">
      {/* Decorative elements with animation */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-float" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl animate-pulse-slow" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-scale-in hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
            <Scissors className="w-4 h-4 text-primary animate-float" />
            <span className="text-sm font-medium text-primary">Wilson Barbers - Premium en Rosario</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-slide-up">
            Bienvenido a <span className="text-primary animate-pulse-slow">Wilson Barbers</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '150ms' }}>
            Profesionales especializados en cortes modernos, afeitados clásicos y cuidados capilares de la más alta calidad.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Link
              href="/turnos"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 btn-press min-h-12"
            >
              Reservar Turno
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-all duration-300 btn-press min-h-12"
            >
              Ver Servicios
            </Link>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-16">
            <div className="text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="text-3xl font-bold text-primary mb-2 animate-pulse-slow">20+</div>
              <p className="text-sm text-muted-foreground">Años de Experiencia</p>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '450ms' }}>
              <div className="text-3xl font-bold text-primary mb-2 animate-pulse-slow">5000+</div>
              <p className="text-sm text-muted-foreground">Clientes Satisfechos</p>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '500ms' }}>
              <div className="text-3xl font-bold text-primary mb-2 animate-pulse-slow">3</div>
              <p className="text-sm text-muted-foreground">Profesionales</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
