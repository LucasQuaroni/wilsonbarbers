"use client"

import Link from 'next/link'
import { ArrowRight, Scissors } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Hero() {
  const words = ["CORTES", "BARBAS", "ESTILOS", "ACTITUD"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-16 sm:pt-32 sm:pb-24">
      {/* Decorative barber pole animated background blocks */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0">
         <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-barber-red rounded-full blur-[120px] animate-pulse-slow"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-barber-blue rounded-full blur-[120px] animate-float"></div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 border border-barber-red/30 bg-barber-red/10 animate-scale-in">
            <Scissors className="w-4 h-4 text-barber-red" />
            <span className="text-sm font-bold tracking-widest uppercase text-foreground">Premium Barbershop</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-6xl sm:text-8xl lg:text-[10rem] text-foreground mb-4 leading-[0.85] uppercase tracking-wider animate-slide-up">
            WILSON<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-barber-red via-barber-white to-barber-blue">
              BARBERS
            </span>
          </h1>

          {/* Dynamic Typing Subheading */}
          <div className="h-16 sm:h-20 mb-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
            <p className="text-2xl sm:text-4xl font-heading tracking-widest text-muted-foreground uppercase">
              EXPERTOS EN <br className="sm:hidden" />
              <span className="text-barber-red transition-all duration-500 ease-in-out inline-block min-w-[200px]">
                {words[index]}
              </span>
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Link
              href="/turnos"
              className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 bg-foreground text-background font-heading text-xl uppercase tracking-widest hover:bg-barber-red hover:text-white transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Reservar Turno
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-2 sm:gap-8 mt-20 border-t border-white/10 pt-10">
            <div className="text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="font-heading text-4xl sm:text-5xl text-barber-blue mb-2 animate-pulse-slow">20+</div>
              <p className="font-heading tracking-widest text-muted-foreground uppercase text-xs sm:text-base">Años Exp</p>
            </div>
            <div className="text-center animate-slide-up border-x border-white/10" style={{ animationDelay: '450ms' }}>
              <div className="font-heading text-4xl sm:text-5xl text-barber-white mb-2 animate-pulse-slow">5K+</div>
              <p className="font-heading tracking-widest text-muted-foreground uppercase text-xs sm:text-base">Clientes</p>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '500ms' }}>
              <div className="font-heading text-4xl sm:text-5xl text-barber-red mb-2 animate-pulse-slow">3</div>
              <p className="font-heading tracking-widest text-muted-foreground uppercase text-xs sm:text-base">Expertos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
