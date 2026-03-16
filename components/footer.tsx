'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Branding */}
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                <span className="text-sm font-bold text-primary-foreground">WB</span>
              </div>
              <h3 className="text-lg font-bold text-foreground">Wilson Barbers</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Tu barbería premium en Rosario, Argentina. Servicios profesionales desde 2020.
            </p>
          </div>

          {/* Links */}
          <div className="animate-slide-up" style={{ animationDelay: '150ms' }}>
            <h4 className="font-semibold text-foreground mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary link-hover transition-colors">Inicio</Link></li>
              <li><Link href="/servicios" className="text-sm text-muted-foreground hover:text-primary link-hover transition-colors">Servicios</Link></li>
              <li><Link href="/quienes-somos" className="text-sm text-muted-foreground hover:text-primary link-hover transition-colors">Quiénes Somos</Link></li>
              <li><Link href="/contacto" className="text-sm text-muted-foreground hover:text-primary link-hover transition-colors">Contacto</Link></li>
              <li><Link href="/turnos" className="text-sm text-muted-foreground hover:text-primary link-hover transition-colors">Reservar Turno</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="flex gap-2 items-start hover:text-primary transition-colors duration-300 cursor-pointer">
                <Phone size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">(0341) XXXX-XXXX</span>
              </li>
              <li className="flex gap-2 items-start hover:text-primary transition-colors duration-300 cursor-pointer">
                <Mail size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">info@barberia.com</span>
              </li>
              <li className="flex gap-2 items-start hover:text-primary transition-colors duration-300 cursor-pointer">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">San Juan 1234, Rosario</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="animate-slide-up" style={{ animationDelay: '250ms' }}>
            <h4 className="font-semibold text-foreground mb-4">Horarios</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex justify-between gap-4">
                <span>Lunes - Viernes</span>
                <span className="font-semibold text-primary">09:00 - 19:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Sábado</span>
                <span className="font-semibold text-primary">09:00 - 14:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Domingo</span>
                <span className="font-semibold text-destructive">Cerrado</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Wilson Barbers. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacidad
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
