import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageShell from './PageShell'
import StatsRow from './StatsRow'
import TelemetryPanel from './TelemetryPanel'
import { containerVariants, childVariants } from '../components/AnimatedSection'
import Footer from '../components/Footer'
import usePageMeta from '../hooks/usePageMeta'

const services = [
  { num: '01', title: 'Web Development', desc: 'Custom web applications built with modern frameworks — fast, scalable, and production-ready.', tags: ['React', 'Node.js', 'MongoDB', 'API'] },
  { num: '02', title: 'Portfolio Designs', desc: 'Professional portfolio websites that showcase your work with stunning design and smooth animations.', tags: ['UI/UX', 'Framer Motion', 'Tailwind'] },
  { num: '03', title: 'Scroll Animation Websites', desc: 'Engaging scroll-triggered animations that bring your content to life and captivate visitors.', tags: ['GSAP', 'Scroll', 'Motion'] },
  { num: '04', title: 'E-Commerce', desc: 'Full-featured online stores with secure payments, product management, and seamless checkout.', tags: ['Stripe', 'Cart', 'Admin'] },
  { num: '05', title: 'Landing Pages', desc: 'High-converting landing pages designed to capture leads and drive engagement.', tags: ['SEO', 'Analytics', 'Copy'] },
  { num: '06', title: 'Video Editing', desc: 'Professional video editing services — cuts, transitions, effects, and color grading.', tags: ['Premiere', 'Effects', 'Sound'] },
]

const stats = [
  { value: '06+', label: 'Service Categories' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '24h', label: 'Avg. Response' },
  { value: '5.0★', label: 'Client Rating' },
]

const reasons = [
  { title: 'Pixel-Perfect Craft', desc: 'Every layout is hand-built to match the vision — no generic templates, no shortcuts.' },
  { title: 'Performance First', desc: 'Lighthouse-optimized builds with fast load times, smooth animations, and clean code.' },
  { title: 'Clear Communication', desc: 'Regular updates and honest timelines. You always know exactly where your project stands.' },
  { title: 'Long-Term Support', desc: 'Post-launch maintenance, updates, and feature additions whenever you need them.' },
]

export default function ServicesPage() {
  usePageMeta({
    title: 'Services',
    description: 'Web development services by Zhanx Studio — portfolios, landing pages, scroll-animation sites, e-commerce and video editing.',
  })
  return (
    <>
      <PageShell index="02" eyebrow="WHAT I DO" title="Services.">
        <StatsRow stats={stats} />

        <motion.div
          className="space-y-4 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              variants={i % 2 === 0 ? childVariants.fadeLeft : childVariants.fadeRight}
              className="group relative flex flex-col md:flex-row md:items-center gap-4 md:gap-10 p-6 md:p-8 border border-[rgba(201,168,76,0.08)] hover:border-[rgba(201,168,76,0.4)] transition-all duration-300 cursor-pointer"
            >
              <span className="font-display text-[3rem] md:text-[4rem] font-black text-[rgba(201,168,76,0.15)] group-hover:text-[--gold] transition-colors duration-500 select-none leading-none">
                {s.num}
              </span>
              <div className="flex-1">
                <h3 className="font-display text-xl md:text-3xl mb-2 group-hover:text-[--gold] transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-[0.85rem] text-[--muted-foreground] leading-relaxed mb-3">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map(tag => (
                    <span key={tag} className="text-[0.6rem] tracking-[0.15em] font-mono text-[--gold] bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-[--gold] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 hidden md:block">
                →
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Why work with me */}
        <motion.h2
          className="font-display text-[clamp(1.8rem,4vw,2.8rem)] mb-10"
          initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          Why work with <span style={{ color: 'var(--gold)' }}>me?</span>
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              variants={childVariants.scaleIn}
              className="p-8 border border-[rgba(201,168,76,0.12)] bg-[--card]/40 hover:border-[rgba(201,168,76,0.4)] hover:bg-[--card]/70 transition-all duration-300"
            >
              <span className="w-10 h-10 rounded-full bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[--gold] text-lg mb-5">
                ✦
              </span>
              <h3 className="font-display text-xl mb-2">{r.title}</h3>
              <p className="text-[0.85rem] text-[--muted-foreground] leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center p-10 md:p-14 border border-[rgba(201,168,76,0.2)] bg-[--card]/40"
        >
          <h3 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] mb-4">
            Not sure which service you need<span style={{ color: 'var(--gold)' }}>?</span>
          </h3>
          <p className="text-[--muted-foreground] text-[0.9rem] mb-6">
            Tell me about your project — I'll recommend the best approach, free of charge.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[--gold] text-[--background] px-8 py-3 rounded-full text-[0.78rem] tracking-[0.15em] font-bold hover:scale-105 transition-transform"
          >
            GET A FREE CONSULTATION
          </Link>
        </motion.div>

        <div className="mt-24">
          <TelemetryPanel
            nodeName="Node: ZX-SVC-04"
            streamLabel="Service Monitor Stream"
            logs={[
              '> Starting service registry...',
              '> Web dev service: healthy',
              '> E-commerce module: syncing...',
              '> Video pipeline: idle',
              '> Landing page builder: OK',
              '> Animation engine: 60fps stable',
              '> All services nominal.',
            ]}
            hubs={[
              'Web Dev: Production (Active)',
              'E-Commerce: Payment Bridge',
              'Video Editing: Render Farm (Batching)',
            ]}
            stats={[
              { label: 'Active Services', value: '06' },
              { label: 'Avg Turnaround', value: '4 days' },
              { label: 'Status', status: 'ACTIVE' },
            ]}
          />
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
