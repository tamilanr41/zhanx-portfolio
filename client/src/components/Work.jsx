import { useRef } from 'react'
import { motion } from 'framer-motion'
import work1 from '../assets/work-1.jpg'
import work2 from '../assets/work-2.jpg'
import work3 from '../assets/work-3.jpg'
import extra1 from '../assets/extra-1.png'
import extra2v2 from '../assets/extra-2-v2.png'
import extra3 from '../assets/extra-3.png'

function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const handleMouse = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`
  }
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }
  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={handleLeave} className={className}>
      {children}
    </div>
  )
}

const mainProjects = [
  { img: work1, label: '01 / REACT', title: 'Birthday Special', url: 'https://birthday-specialonee.netlify.app' },
  { img: work2, label: '02 / UI DESIGN', title: 'Lively Torte', url: 'https://lively-torte-a4e687.netlify.app' },
  { img: work3, label: '03 / E-COMMERCE', title: 'Zhanx Fashion', url: 'https://tamilan-fashion.netlify.app' },
]

const extraProjects = [
  { img: extra1, label: '04 / FULL STACK', title: 'Zhanx Job Portal', url: 'https://tamilan-jobportal.netlify.app' },
  { img: extra2v2, label: '05 / LANDING PAGE', title: 'Zhanx Gedda', url: 'https://gedda.netlify.app' },
  { img: extra3, label: '06 / BAKERY SITE', title: 'Zhanx Cake Shop', url: 'https://cake-shop-me.netlify.app' },
]

export default function Work() {
  return (
    <section id="work" className="py-12 md:py-24 bg-[--background] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* ── Header: Alkemy-style char + word reveal ── */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-end mb-12">
          <div>
            {/* Eyebrow: character-by-character blur+slide */}
            <p className="text-[0.68rem] tracking-[0.4em] text-[--gold] mb-4 uppercase font-mono overflow-hidden">
              {'SELECTED PROJECTS · 2024—2025'.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  viewport={{ once: true, margin: '50px' }}
                  transition={{ duration: 0.5, delay: i * 0.025, ease: [0.16, 1, 0.3, 1] }}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
            </p>

            {/* Title: word-by-word blur+slide up */}
            <h2 className="font-display text-[clamp(2.5rem,6vw,3.75rem)]">
              <span className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, filter: 'blur(12px)', y: 50 }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  viewport={{ once: true, margin: '50px' }}
                  transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  My
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, filter: 'blur(12px)', y: 50 }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  viewport={{ once: true, margin: '50px' }}
                  transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  Latest
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, filter: 'blur(12px)', y: 50 }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  viewport={{ once: true, margin: '50px' }}
                  transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span style={{
                    WebkitTextFillColor: 'transparent',
                    background: 'linear-gradient(135deg, #c9a84c, #f5c76e, #c9a84c)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                  }}>Projects.</span>
                </motion.span>
              </span>
            </h2>
          </div>

          <motion.p
            className="text-[--muted-foreground] text-[0.9rem] self-end"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '50px' }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            A selection of live projects built across full stack development, REST APIs, and production deployments.
          </motion.p>
        </div>

        {/* ── Main project cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {mainProjects.map((p, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, filter: 'blur(6px)', y: 50 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true, margin: '50px' }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden group ${i === 0 ? 'md:col-span-7' : 'md:col-span-5'}`}
            >
              <a href={p.url} target="_blank" rel="noreferrer">
                <TiltCard className="w-full h-[20rem] md:h-[26rem] overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[0.55rem] md:text-[0.6rem] tracking-[0.15em] text-[--gold] bg-[--background]/80 backdrop-blur-sm px-2.5 py-1 rounded font-mono">
                      {p.label}
                    </span>
                  </div>
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[--background] to-transparent p-6 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-[0.68rem] text-[--gold] tracking-[0.15em] mb-1">{p.label}</p>
                    <p className="font-display text-lg md:text-xl">{p.title}</p>
                  </figcaption>
                </TiltCard>
              </a>
            </motion.figure>
          ))}

          <motion.div
            initial={{ opacity: 0, filter: 'blur(6px)', y: 50 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '50px' }}
            transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 relative bg-[--background] p-6 md:p-10 border border-[--border] flex flex-col justify-between overflow-hidden min-h-[12rem] md:min-h-[26rem] hover:border-[rgba(201,168,76,0.5)] transition-colors duration-300"
          >
            <div className="absolute right-[-1rem] top-[-1rem] w-32 h-24 md:w-44 md:h-32 opacity-50 pointer-events-none diagonal-lines" />
            <div className="absolute bottom-[-4rem] left-[-4rem] w-32 h-32 md:w-48 md:h-48 rounded-full border border-[rgba(201,168,76,0.4)] pointer-events-none" />
            <p className="text-[0.68rem] text-[--gold] tracking-[0.15em] relative">04 / CONTACT</p>
            <div className="relative">
              <h3 className="font-display text-2xl md:text-[2.5rem] leading-tight mb-4">
                Have a project<br />in mind?
              </h3>
              <p className="text-[--muted-foreground] text-[0.85rem] max-w-md mb-6">
                Let's collaborate and build something amazing together. Get in touch and let's discuss your ideas.
              </p>
              <motion.a
                href="#contact"
                className="inline-block text-[--gold] text-[0.85rem] tracking-[0.15em] border-b border-[--gold] pb-1"
                whileHover={{ letterSpacing: '0.25em' }}
                transition={{ duration: 0.2 }}
              >
                GET IN TOUCH →
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* ── Extra project cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12">
          {extraProjects.map((p, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, filter: 'blur(6px)', y: 50 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true, margin: '50px' }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden group ${i === 0 ? 'md:col-span-7' : 'md:col-span-5'}`}
            >
              <a href={p.url} target="_blank" rel="noreferrer">
                <TiltCard className="w-full h-[20rem] md:h-[26rem] overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[0.55rem] md:text-[0.6rem] tracking-[0.15em] text-[--gold] bg-[--background]/80 backdrop-blur-sm px-2.5 py-1 rounded font-mono">
                      {p.label}
                    </span>
                  </div>
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[--background] to-transparent p-6 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-[0.68rem] text-[--gold] tracking-[0.15em] mb-1">{p.label}</p>
                    <p className="font-display text-lg md:text-xl">{p.title}</p>
                  </figcaption>
                </TiltCard>
              </a>
            </motion.figure>
          ))}

          <motion.div
            initial={{ opacity: 0, filter: 'blur(6px)', y: 50 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '50px' }}
            transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 relative bg-[--background] p-6 md:p-10 border border-[--border] flex flex-col justify-between overflow-hidden min-h-[12rem] md:min-h-[26rem] hover:border-[rgba(201,168,76,0.5)] transition-colors duration-300"
          >
            <div className="absolute right-[-1rem] top-[-1rem] w-32 h-24 md:w-44 md:h-32 opacity-50 pointer-events-none diagonal-lines" />
            <div className="absolute bottom-[-4rem] left-[-4rem] w-32 h-32 md:w-48 md:h-48 rounded-full border border-[rgba(201,168,76,0.4)] pointer-events-none" />
            <p className="text-[0.68rem] text-[--gold] tracking-[0.15em] relative">07 / LETS TALK</p>
            <div className="relative">
              <h3 className="font-display text-2xl md:text-[2.5rem] leading-tight mb-4">
                Want to work<br />together?
              </h3>
              <p className="text-[--muted-foreground] text-[0.85rem] max-w-md mb-6">
                I'm always open to new projects and collaborations. Reach out and let's create something great.
              </p>
              <motion.a
                href="#contact"
                className="inline-block text-[--gold] text-[0.85rem] tracking-[0.15em] border-b border-[--gold] pb-1"
                whileHover={{ letterSpacing: '0.25em' }}
                transition={{ duration: 0.2 }}
              >
                GET IN TOUCH →
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
