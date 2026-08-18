import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const services = [
  { num: '01', title: 'Web Development', desc: 'Custom web applications built with modern frameworks — fast, scalable, and production-ready.', duration: '2–4 wks', icon: '✦' },
  { num: '02', title: 'Portfolio Designs', desc: 'Professional portfolio websites that showcase your work with stunning design and smooth animations.', duration: '1–2 wks', icon: '✦' },
  { num: '03', title: 'Scroll Animation Websites', desc: 'Engaging scroll-triggered animations that bring your content to life and captivate visitors.', duration: '1–2 wks', icon: '✦' },
  { num: '04', title: 'E-Commerce', desc: 'Full-featured online stores with secure payments, product management, and seamless checkout.', duration: '3–5 wks', icon: '✦' },
  { num: '05', title: 'Landing Pages', desc: 'High-converting landing pages designed to capture leads and drive engagement.', duration: '3–5 days', icon: '✦' },
  { num: '06', title: 'Video Editing', desc: 'Professional video editing services — cuts, transitions, effects, and color grading.', duration: 'Per project', icon: '✦' },
]

const GOLD = '#c9a84c'
const GOLD_BRIGHT = '#ffd700'

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0)
  const stepRefs = useRef([])

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        let active = 0
        let minTop = Infinity
        stepRefs.current.forEach((el, i) => {
          if (!el) return
          const top = el.getBoundingClientRect().top
          if (top > 90 && top < minTop) {
            minTop = top
            active = i
          }
        })
        if (minTop === Infinity && stepRefs.current.length > 0) {
          active = stepRefs.current.length - 1
        }
        setActiveIndex(active)
        ticking = false
      })
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const step = services[activeIndex]
  const progressPct = Math.round(((activeIndex + 1) / services.length) * 100)
  const CIRC = 2 * Math.PI * 50

  return (
    <section id="services" className="pt-16 md:pt-28 bg-[--background] relative">
      {/* ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[rgba(201,168,76,0.05)] blur-[60px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[rgba(201,168,76,0.03)] blur-[70px]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[0.68rem] tracking-[0.4em] text-[--gold] mb-4 uppercase">WHAT I DO</p>
          <h2 className="font-display text-[clamp(2rem,6vw,3.75rem)]">Services.</h2>
        </motion.div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-8 lg:gap-16 relative z-10 pb-16 md:pb-28">
        {/* Sticky progress card */}
        <div className="lg:w-[35%] lg:sticky lg:top-24 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl p-6 md:p-8 text-center border border-[rgba(201,168,76,0.12)] bg-[--card]/70"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-28 h-28">
                <svg width="112" height="112" viewBox="0 0 112 112" className="transform -rotate-90">
                  <circle cx="56" cy="56" r="50" stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" />
                  <circle
                    cx="56" cy="56" r="50"
                    stroke="url(#servicesGoldGrad)" strokeWidth="6" fill="none"
                    strokeLinecap="round"
                    strokeDasharray={CIRC}
                    strokeDashoffset={CIRC * (1 - (activeIndex + 1) / services.length)}
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                  />
                  <defs>
                    <linearGradient id="servicesGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={GOLD} />
                      <stop offset="100%" stopColor={GOLD_BRIGHT} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-display text-[--gold]">{String(activeIndex + 1).padStart(2, '0')}</span>
                </div>
              </div>
              <p className="text-[0.6rem] font-mono text-[--muted-foreground] tracking-widest uppercase">
                Service {activeIndex + 1} of {services.length}
              </p>
              <h3 className="text-xl font-display">{step.title}</h3>
              <p className="text-sm text-[--muted-foreground] font-light">{step.desc}</p>
              <div className="flex items-center gap-2 text-xs text-[--muted-foreground]">
                <span className="text-[--gold]">⏱</span>
                <span>{step.duration}</span>
              </div>
              <div className="w-full mt-4 pt-4 border-t border-[--border]">
                <div className="flex justify-between text-xs text-[--muted-foreground] mb-2">
                  <span>Progress</span>
                  <span className="font-mono">{progressPct}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[--gold-soft] to-[--gold-bright]"
                    style={{ width: `${progressPct}%`, transition: 'width 0.5s ease' }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                {services.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: 6,
                      height: 6,
                      background: i === activeIndex ? GOLD_BRIGHT : i < activeIndex ? '#22c55e' : 'rgba(255,255,255,0.1)',
                      boxShadow: i === activeIndex ? `0 0 8px ${GOLD_BRIGHT}66` : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="lg:w-[65%] relative">
          <svg className="pointer-events-none absolute left-[23px] top-0 h-full w-[2px] lg:left-[31px]" style={{ zIndex: 0 }}>
            <line x1="0" y1="0" x2="0" y2="100%" stroke="url(#servicesLineGrad)" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 6" />
            <defs>
              <linearGradient id="servicesLineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={GOLD} stopOpacity="0.8" />
                <stop offset="50%" stopColor={GOLD} stopOpacity="0.4" />
                <stop offset="100%" stopColor={GOLD} stopOpacity="0.08" />
              </linearGradient>
            </defs>
          </svg>
          <div className="space-y-6 relative">
            {services.map((s, i) => {
              const isActive = i === activeIndex
              const isCompleted = i < activeIndex
              const nodeSize = 'w-10 h-10 lg:w-12 lg:h-12'
              const leftOffset = 'left-[17px] lg:left-[21px]'
              return (
                <div key={s.num} ref={(el) => { stepRefs.current[i] = el }} className="group relative pl-16 lg:pl-20">
                  <div
                    className={`absolute ${leftOffset} top-0 ${nodeSize} rounded-full flex items-center justify-center z-10 transition-all duration-500 border-2 ${
                      isCompleted ? 'bg-green-500/20 border-green-500' : isActive ? 'bg-[rgba(201,168,76,0.2)] border-[--gold]' : 'bg-[--card]/60 border-[--border]'
                    }`}
                    style={isActive ? { boxShadow: `0 0 20px ${GOLD}88, 0 0 40px ${GOLD}44` } : {}}
                  >
                    {isCompleted ? (
                      <span className="text-[16px] text-green-400 font-bold">✓</span>
                    ) : (
                      <span className={`text-[16px] font-mono font-bold ${isActive ? 'text-[--gold]' : 'text-[--muted-foreground]'}`}>
                        {s.num}
                      </span>
                    )}
                  </div>
                  {isActive && (
                    <div
                      className={`absolute ${leftOffset} ${nodeSize} rounded-full pointer-events-none`}
                      style={{ border: `2px solid ${GOLD}`, animation: 'ping 2s ease-in-out infinite' }}
                    />
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
                    className={`relative rounded-2xl border overflow-hidden transition-all duration-500 ${
                      isActive ? 'border-[rgba(201,168,76,0.4)] bg-[--card]/70' : 'border-[--border] bg-[--card]/40'
                    } hover:border-[rgba(201,168,76,0.4)]`}
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl ${isCompleted ? 'bg-green-500' : 'bg-[--gold]'}`}
                      style={{ opacity: isCompleted ? 0.8 : isActive ? 1 : 0.4 }}
                    />
                    <div className="p-4 md:p-6 pl-5 md:pl-7">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-[--gold] text-sm">{s.icon}</span>
                              <h3 className={`text-base md:text-lg font-display ${isCompleted ? 'text-green-400' : 'text-[--foreground]'}`}>
                                {s.title}
                              </h3>
                            </div>
                            <span className={`text-[0.6rem] font-mono px-2.5 py-1 rounded-full border w-fit ${
                              isCompleted ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-[rgba(201,168,76,0.05)] text-[--gold] border-[rgba(201,168,76,0.2)]'
                            }`}>
                              ⏱ {s.duration}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed text-[--muted-foreground]">{s.desc}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )
            })}
            <div className="h-48 md:h-64" />
          </div>
        </div>
      </div>
    </section>
  )
}
