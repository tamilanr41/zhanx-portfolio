import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const testimonials = [
  {
    quote: "It was great working with the Zhanx Studio team on this project. Communication was clear, feedback was helpful, and the entire process went smoothly. Happy to be part of bringing your idea to life.",
    name: "Moovendhan",
    company: "KMS Deccors",
    initials: "M",
  },
  {
    quote: "The portfolio website Zhanx Studio built exceeded my expectations. Attention to detail and smooth animations really made it stand out. Highly recommended.",
    name: "Sathish",
    company: "Freelance Designer",
    initials: "S",
  },
  {
    quote: "Professional, creative, and delivered on time. The Zhanx Studio team understood exactly what I needed and brought it to life perfectly. Will definitely work together again.",
    name: "Vignesh",
    company: "Tech Ventures",
    initials: "V",
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [maxShift, setMaxShift] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setMaxShift(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShift])

  return (
    <section id="testimonials" ref={sectionRef} className="relative h-[320vh] bg-[--background]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Header */}
        <div className="absolute top-10 md:top-14 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
          <p className="text-[0.68rem] tracking-[0.4em] text-[--gold] mb-3 uppercase">CLIENT WORDS</p>
          <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] whitespace-nowrap">
            What Clients<span className="text-[--gold]"> Say.</span>
          </h2>
        </div>

        {/* Horizontal track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 md:gap-12 pl-[8vw] pr-[20vw] w-max items-stretch"
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="relative w-[88vw] md:w-[420px] lg:w-[480px] p-6 md:p-10 bg-[--card] border border-[--border] rounded-2xl flex flex-col flex-shrink-0 group hover:border-[rgba(201,168,76,0.5)] transition-all duration-300"
            >
              <span className="text-[4rem] md:text-[5rem] leading-none text-[--gold] opacity-20 font-display absolute top-4 right-6 select-none">"</span>
              <span className="text-[0.6rem] font-mono text-[--muted-foreground] tracking-widest uppercase mb-4">
                Client 0{i + 1}
              </span>

              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-3.5 h-3.5 md:w-4 md:h-4 text-[--gold]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-[0.88rem] md:text-[0.95rem] text-[--muted-foreground] leading-relaxed flex-1 relative z-10">
                "{t.quote}"
              </p>

              <div className="h-px bg-[--border] my-5 md:my-6" />

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.4)] flex items-center justify-center text-[--gold] font-display text-lg flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-sm tracking-wide">{t.name}</p>
                  <p className="text-[0.75rem] text-[--gold] tracking-[0.1em]">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom progress + hint */}
        <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
          <span className="text-[0.6rem] font-mono tracking-[0.3em] text-[--muted-foreground] uppercase">Scroll to explore</span>
          <div className="w-44 h-px bg-white/10 overflow-hidden">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-gradient-to-r from-[--gold-soft] to-[--gold-bright]" />
          </div>
          <span className="text-[--gold] text-lg animate-bounce">↓</span>
        </div>
      </div>
    </section>
  )
}
