'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const images = [
    {
      id: 1,
      title: 'Corte Fade',
      description: 'Estilo moderno con degradado perfecto.',
      src: '/gallery-1.jpg',
    },
    {
      id: 2,
      title: 'Perfilado de Barba',
      description: 'Líneas limpias y definición exacta.',
      src: '/gallery-2.jpg',
    },
    {
      id: 3,
      title: 'Afeitado Clásico',
      description: 'Ritual tradicional con toalla caliente.',
      src: '/gallery-3.jpg',
    },
    {
      id: 4,
      title: 'Texturizado',
      description: 'Volumen y movimiento para tu cabello.',
      src: '/gallery-4.jpg',
    },
  ]

  return (
    <section className="py-20 sm:py-32 bg-secondary border-y border-white/5 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 border border-barber-blue bg-barber-blue/10">
            <span className="font-heading tracking-widest uppercase text-sm text-barber-blue">Portfolio</span>
          </div>
          <h2 className="font-heading text-5xl sm:text-7xl text-foreground mb-6 uppercase tracking-wider">
            NUESTRO <span className="text-barber-white">TRABAJO</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto uppercase tracking-widest font-semibold text-sm">
            El arte de la barbería en cada detalle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden bg-background aspect-[4/3] cursor-pointer"
              onClick={() => setSelectedImage(image.id)}
            >
              {/* Image */}
              <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Overlay styling */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-heading text-3xl text-white mb-2 uppercase tracking-wider">{image.title}</h3>
                <p className="text-barber-red font-semibold uppercase tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{image.description}</p>
              </div>

              {/* Barber pole accent line on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-barber-red via-barber-white to-barber-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Modal Preview */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="bg-secondary border border-white/10 overflow-hidden max-w-4xl w-full relative" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9]">
                <Image
                  src={images.find((img) => img.id === selectedImage)?.src || ''}
                  alt={images.find((img) => img.id === selectedImage)?.title || ''}
                  fill
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="font-heading text-5xl text-white mb-2 uppercase tracking-wide">
                    {images.find((img) => img.id === selectedImage)?.title}
                  </h3>
                  <p className="text-barber-red tracking-widest uppercase font-bold">
                    {images.find((img) => img.id === selectedImage)?.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-background/50 hover:bg-barber-red text-white transition-colors rounded-full backdrop-blur-sm"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
