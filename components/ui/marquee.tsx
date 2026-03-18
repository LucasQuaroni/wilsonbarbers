import React from 'react'

export default function Marquee() {
  const items = [
    "WILSON BARBERS", "ESTILO", "TRADICIÓN", "PASIÓN", 
    "WILSON BARBERS", "ESTILO", "TRADICIÓN", "PASIÓN"
  ];

  return (
    <div className="relative flex overflow-hidden bg-barber-red text-background py-4 border-y border-barber-white/20 select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex space-x-12 px-6">
            {items.map((item, index) => (
              <div key={index} className="flex items-center space-x-12">
                <span className="font-heading text-2xl tracking-widest uppercase">
                  {item}
                </span>
                <span className="font-heading text-xl text-background/50">
                  •
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
