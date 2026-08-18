import { useEffect } from 'react'
import Lenis from 'lenis'

export default function useLenis() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const lenis = new Lenis({
      duration: isMobile ? 1.2 : 0.75,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: isMobile ? 0.8 : 1.2,
      infinite: false,
    })
    window.__lenis = lenis

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    const handleAnchor = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return
      const id = target.getAttribute('href').slice(1)
      const el = document.getElementById(id)
      if (el) {
        e.preventDefault()
        lenis.scrollTo(el, { offset: -80 })
      }
    }
    document.addEventListener('click', handleAnchor)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('click', handleAnchor)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])
}
