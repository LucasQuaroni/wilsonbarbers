'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/quienes-somos', label: 'Quiénes Somos' },
    { href: '/contacto', label: 'Contacto' },
    { href: '/turnos', label: 'Turnos', special: true },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-slide-down">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300">
              <span className="text-sm font-bold text-primary-foreground">WB</span>
            </div>
            <span className="hidden text-lg font-bold text-primary sm:inline">Wilson Barbers</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden gap-1 md:flex">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 animate-fade-in ${
                  item.special
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 btn-press'
                    : 'text-foreground hover:bg-secondary link-hover'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:bg-secondary transition-all duration-300 active:scale-95 min-h-12 min-w-12"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-border md:hidden animate-slide-down">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 75}ms` }}
                  className={`block px-3 py-3 rounded-md text-base font-medium transition-all duration-300 min-h-12 animate-slide-up ${
                    item.special
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 active:scale-95'
                      : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
