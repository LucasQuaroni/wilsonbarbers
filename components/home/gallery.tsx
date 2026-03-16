'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const images = [
    {
      id: 1,
      title: 'Nuestro Local',
      description: 'Espacio moderno y acogedor con equipamiento de calidad.',
      src: '/gallery-1.jpg',
    },
    {
      id: 2,
      title: 'Corte Profesional',
      description: 'Técnicas precisas con herramientas especializadas.',
      src: '/gallery-2.jpg',
    },
    {
      id: 3,
      title: 'Afeitado Clásico',
      description: 'Servicio tradicional con navaja de acero.',
      src: '/gallery-3.jpg',
    },
    {
      id: 4,
      title: 'Área de Recepción',
      description: 'Zona de espera confortable y elegante.',
      src: '/gallery-4.jpg',
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Galería de Trabajos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Algunos de nuestros mejores trabajos realizados por nuestros profesionales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg bg-card border border-border cursor-pointer aspect-square"
              onClick={() => setSelectedImage(image.id)}
            >
              {/* Real Image */}
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                  <p className="text-white/80 text-sm">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Preview */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="bg-card rounded-lg overflow-hidden max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full aspect-square">
                <Image
                  src={images.find((img) => img.id === selectedImage)?.src || ''}
                  alt={images.find((img) => img.id === selectedImage)?.title || ''}
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {images.find((img) => img.id === selectedImage)?.title}
                </h3>
                <p className="text-foreground/80 mb-4">
                  {images.find((img) => img.id === selectedImage)?.description}
                </p>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
