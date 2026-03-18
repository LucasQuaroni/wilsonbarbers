import Link from 'next/link'
import { Phone, Calendar } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-24 sm:py-32 bg-barber-blue relative overflow-hidden">
      {/* Texture / Pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      {/* Barber Pole Accent line */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-barber-red via-barber-white to-barber-blue"></div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-5xl sm:text-8xl text-white mb-6 uppercase tracking-wider leading-none">
            ¿LISTO PARA UN <br />
            <span className="text-barber-red">CORTE IMPECABLE?</span>
          </h2>

          <p className="text-xl sm:text-2xl text-white/80 mb-10 leading-relaxed font-heading tracking-widest uppercase">
            Reserva tu turno hoy y experimenta el servicio premium que mereces.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/turnos"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-barber-red text-white font-heading text-2xl uppercase tracking-widest hover:bg-white hover:text-barber-red transition-all duration-300"
            >
              <Calendar className="w-6 h-6" />
              <span>Reservar Turno</span>
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/20 text-white font-heading text-2xl uppercase tracking-widest hover:bg-white/10 transition-all duration-300"
            >
              <Phone className="w-6 h-6" />
              <span>Llamanos</span>
            </Link>
          </div>

          <div className="mt-16 inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-12 p-6 sm:p-8 bg-black/20 backdrop-blur-sm border border-white/10">
            <div className="text-center sm:text-left">
              <p className="font-heading uppercase tracking-widest text-barber-red text-sm mb-1">Dirección</p>
              <p className="text-white font-medium">Corrientes 2280, Rosario</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/10"></div>
            <div className="text-center sm:text-left">
              <p className="font-heading uppercase tracking-widest text-barber-red text-sm mb-1">Teléfono</p>
              <p className="text-white font-medium">+54 9 341 620-8801</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
