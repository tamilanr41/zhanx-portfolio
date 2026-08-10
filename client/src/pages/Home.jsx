import Hero from '../components/Hero'
import Work from '../components/Work'
import Services from '../components/Services'
import Experience from '../components/Experience'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import usePageMeta from '../hooks/usePageMeta'

export default function Home() {
  usePageMeta({
    title: 'Home',
    description: 'Zhanx Studio — Full Stack Developer crafting fast, animated, production-ready web experiences. Portfolios, landing pages, e-commerce and more.',
  })
  return (
    <>
      <Hero />
      <Work />
      <Services />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}
