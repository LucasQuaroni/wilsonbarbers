import Hero from '@/components/home/hero'
import ServicesPreview from '@/components/home/services-preview'
import Gallery from '@/components/home/gallery'
import WhyChooseUs from '@/components/home/why-choose-us'
import CTASection from '@/components/home/cta-section'

export default function Home() {
  return (
    <div>
      <Hero />
      <ServicesPreview />
      <Gallery />
      <WhyChooseUs />
      <CTASection />
    </div>
  )
}
