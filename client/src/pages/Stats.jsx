import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageShell from './PageShell'
import StatsRow from './StatsRow'
import TelemetryPanel from './TelemetryPanel'
import { containerVariants, childVariants } from '../components/AnimatedSection'
import Footer from '../components/Footer'
import { Rocket, Users, Timer, Star, FolderGit2, Code2 } from 'lucide-react'
import CountUp from '../components/CountUp'
import usePageMeta from '../hooks/usePageMeta'

const stats = [
  { icon: FolderGit2, value: '50+', label: 'Projects Delivered', note: 'From landing pages to full-stack apps' },
  { icon: Timer, value: '03+', label: 'Years Experience', note: 'Building for the web since 2021' },
  { icon: Users, value: '20+', label: 'Happy Clients', note: 'Across India and worldwide' },
  { icon: Star, value: '5.0', label: 'Average Rating', note: 'Consistent on-time delivery' },
  { icon: Rocket, value: '24h', label: 'Response Time', note: 'Fast replies, no waiting' },
  { icon: Code2, value: '99.9%', label: 'Uptime', note: 'Hosted apps stay online' },
]

const miniStats = [
  { value: '06+', label: 'Tracked Metrics' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '03+', label: 'Years Experience' },
  { value: '5.0★', label: 'Average Rating' },
]

const highlights = [
  'Pixel-perfect, animation-rich interfaces',
  'Performance-first builds (fast load times)',
  'Responsive on every screen size',
  'SEO-friendly structure and metadata',
  'Clean, maintainable, documented code',
  'Post-launch support on every project',
]

export default function Stats() {
  usePageMeta({
    title: 'Stats',
    description: 'Zhanx Studio by the numbers — projects delivered, years of experience, client satisfaction and more.',
  })
  return (
    <>
      <PageShell index="08" eyebrow="BY THE NUMBERS" title="Stats.">
        <StatsRow stats={miniStats} />

        {/* Metrics grid header */}
        <motion.div
          className="flex items-center justify-between gap-4 mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="text-[0.62rem] font-mono text-[--gold] tracking-[0.3em] uppercase mb-2 block">
              // Live metrics — 06 tracked
            </span>
            <h2 className="font-display text-[clamp(1.5rem,4vw,2.8rem)]">
              The studio, <span style={{ color: 'var(--gold)' }}>by the numbers.</span>
            </h2>
          </div>
          <span className="hidden md:flex items-center gap-2 text-[0.65rem] font-mono text-[--muted-foreground] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            All data verified
          </span>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                variants={childVariants.flipUp}
                className="p-8 border border-[rgba(201,168,76,0.12)] bg-[--card]/40 hover:border-[rgba(201,168,76,0.4)] hover:-translate-y-1.5 transition-all duration-300 text-center group relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[rgba(201,168,76,0.05)] blur-2xl group-hover:bg-[rgba(201,168,76,0.12)] transition-all duration-500" />
                <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.25)] flex items-center justify-center group-hover:bg-[--gold] group-hover:text-[--primary-foreground] transition-all duration-300">
                  <Icon size={20} className="text-[--gold] group-hover:text-[--primary-foreground] transition-colors duration-300" />
                </div>
                <p className="font-display text-[2.75rem] md:text-[3.5rem] font-black text-[--gold] leading-none">
                  <CountUp value={s.value} />
                </p>
                <p className="mt-3 text-[0.7rem] tracking-[0.2em] uppercase text-[--foreground] font-bold font-mono">{s.label}</p>
                <p className="mt-1.5 text-[0.72rem] text-[--muted-foreground]">{s.note}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Highlights */}
        <motion.h2
          className="font-display text-[clamp(1.5rem,4vw,2.8rem)] mb-10"
          initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          Why the numbers <span style={{ color: 'var(--gold)' }}>stack up.</span>
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              variants={i % 2 === 0 ? childVariants.fadeLeft : childVariants.fadeRight}
              className="flex items-center gap-4 p-5 border border-[rgba(201,168,76,0.12)] bg-[--card]/40"
            >
              <span className="w-8 h-8 rounded-full bg-[--gold] text-[--background] flex items-center justify-center font-bold flex-shrink-0">✓</span>
              <p className="text-[0.9rem]">{h}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center p-8 md:p-14 border border-[rgba(201,168,76,0.2)] bg-[--card]/40"
        >
          <h3 className="font-display text-[clamp(1.4rem,4.5vw,2.6rem)] mb-4">
            Want results like <span style={{ color: 'var(--gold)' }}>these?</span>
          </h3>
          <p className="text-[--muted-foreground] text-[0.9rem] mb-6">
            The numbers come from real work — let's add yours to the list.
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
            nodeName="Node: ZX-MTR-15"
            streamLabel="Metrics Monitor Stream"
            logs={[
              '> Starting metrics aggregator...',
              '> Uptime index: 99.9%',
              '> Project counter: 50 synced',
              '> Satisfaction index: syncing...',
              '> Avg response: 24h',
              '> Metrics encryption verified.',
              '> All gauges nominal.',
            ]}
            hubs={[
              'Uptime: 99.9% (Stable)',
              'Response Time: 24h (Fast)',
              'Delivery Rate: 100% (Verified)',
            ]}
            stats={[
              { label: 'Metrics Tracked', value: '06' },
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
