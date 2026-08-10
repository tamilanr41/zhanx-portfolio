import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageShell from './PageShell'
import StatsRow from './StatsRow'
import TelemetryPanel from './TelemetryPanel'
import { containerVariants, childVariants } from '../components/AnimatedSection'
import Footer from '../components/Footer'
import usePageMeta from '../hooks/usePageMeta'

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
  {
    quote: "From the first call to launch day, everything was organised and stress-free. The design feels premium and the site loads faster than my old one ever did.",
    name: "Preethi",
    company: "Nova Interiors",
    initials: "P",
  },
  {
    quote: "Zhanx Studio turned my rough idea into a real, working e-commerce store. Payments, catalog, checkout — all handled perfectly. My sales have been steady since launch.",
    name: "Arun",
    company: "FitLife Studio",
    initials: "A",
  },
  {
    quote: "I was nervous about redesigning my site, but nothing was lost and everything looked better. Modern, fast and beautiful. Clients now compliment the site constantly.",
    name: "Divya",
    company: "Bloom & Co",
    initials: "D",
  },
]

const stats = [
  { value: '06+', label: 'Happy Clients' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '03+', label: 'Years Experience' },
  { value: '5.0★', label: 'Average Rating' },
]

const highlights = [
  'On-time delivery on every single project',
  'Clear daily updates and honest timelines',
  'Post-launch support long after go-live',
  'Creative input beyond just coding',
]

export default function TestimonialsPage() {
  usePageMeta({
    title: 'Testimonials',
    description: 'Client reviews for Zhanx Studio — real feedback from clients who trusted the process and loved the result.',
  })

  return (
    <>
      <PageShell index="03" eyebrow="CLIENT WORDS" title="Testimonials.">
        <StatsRow stats={stats} />

        {/* Testimonial wall */}
        <div className="mb-20">
          <motion.div
            className="flex items-center justify-between gap-4 mb-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <span className="text-[0.62rem] font-mono text-[--gold] tracking-[0.3em] uppercase mb-2 block">
                // Client wall — 06 verified
              </span>
              <h2 className="font-display text-[clamp(1.5rem,4vw,2.8rem)]">
                Real words, <span style={{ color: 'var(--gold)' }}>real clients.</span>
              </h2>
            </div>
            <span className="hidden md:flex items-center gap-2 text-[0.65rem] font-mono text-[--muted-foreground] uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              All ratings verified
            </span>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={containerVariants}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={i % 2 === 0 ? childVariants.fadeLeft : childVariants.fadeRight}
                className="group relative p-6 md:p-8 bg-[--card]/50 border border-[--border] rounded-2xl flex flex-col hover:border-[rgba(201,168,76,0.45)] hover:bg-[--card] hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(0,0,0,0.3),0_0_30px_rgba(201,168,76,0.06)] transition-all duration-300 overflow-hidden"
              >
                <span className="text-[4.5rem] leading-none text-[--gold] opacity-10 font-display absolute top-3 right-5 select-none">"</span>
                <span className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.6)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-3.5 h-3.5 md:w-4 md:h-4 text-[--gold]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[0.6rem] font-mono text-[--muted-foreground] tracking-widest uppercase">Client {String(i + 1).padStart(2, '0')}</span>
                </div>

                <p className="text-[0.85rem] md:text-[0.9rem] text-[--muted-foreground] leading-relaxed flex-1 relative z-10">
                  "{t.quote}"
                </p>

                <div className="h-px bg-[--border] my-5 md:my-6 group-hover:bg-[rgba(201,168,76,0.2)] transition-colors" />

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.4)] flex items-center justify-center text-[--gold] font-display text-lg flex-shrink-0 group-hover:bg-[rgba(201,168,76,0.25)] transition-colors">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-sm tracking-wide group-hover:text-[--gold] transition-colors">{t.name}</p>
                    <p className="text-[0.7rem] text-[--gold]/80 tracking-[0.1em]">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* What clients love */}
        <motion.h2
          className="font-display text-[clamp(1.5rem,4vw,2.8rem)] mb-10"
          initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          What clients <span style={{ color: 'var(--gold)' }}>love.</span>
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              variants={i % 2 === 0 ? childVariants.fadeLeft : childVariants.fadeRight}
              className="flex items-center gap-4 p-5 md:p-6 border border-[rgba(201,168,76,0.12)] bg-[--card]/40 hover:border-[rgba(201,168,76,0.35)] transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-[--gold] text-[--background] flex items-center justify-center font-bold flex-shrink-0">✓</span>
              <p className="text-[0.95rem]">{h}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center p-8 md:p-14 border border-[rgba(201,168,76,0.2)] bg-[--card]/40"
        >
          <h3 className="font-display text-[clamp(1.4rem,4.5vw,2.6rem)] mb-4">
            Be our next happy <span style={{ color: 'var(--gold)' }}>client.</span>
          </h3>
          <p className="text-[--muted-foreground] text-[0.9rem] mb-6">
            Join the clients who trusted the process and loved the result.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[--gold] text-[--background] px-8 py-3 rounded-full text-[0.78rem] tracking-[0.15em] font-bold hover:scale-105 transition-transform"
          >
            LET'S WORK TOGETHER
          </Link>
        </motion.div>

        <div className="mt-24">
          <TelemetryPanel
            nodeName="Node: ZX-FDBK-09"
            streamLabel="Client Feedback Stream"
            logs={[
              '> Initializing feedback feed...',
              '> Rating sync: 5.0 avg',
              '> Testimonial digest: 06 loaded',
              '> Satisfaction index: syncing...',
              '> Referral loop: ACTIVE',
              '> Feedback encryption verified.',
              '> Stream healthy. 100%',
            ]}
            hubs={[
              'KMS Deccors: Rating 5.0 (Verified)',
              'Freelance Designer: Rating 5.0 (Verified)',
              'Tech Ventures: Rating 5.0 (Verified)',
              'Nova Interiors: Rating 5.0 (Verified)',
              'FitLife Studio: Rating 5.0 (Verified)',
              'Bloom & Co: Rating 5.0 (Verified)',
            ]}
            stats={[
              { label: 'Verified Reviews', value: '06' },
              { label: 'Satisfaction', value: '100%' },
              { label: 'Status', status: 'ACTIVE' },
            ]}
          />
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
