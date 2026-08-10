import { motion } from 'framer-motion'
import PageShell from './PageShell'
import TelemetryPanel from './TelemetryPanel'
import { containerVariants, childVariants } from '../components/AnimatedSection'
import Footer from '../components/Footer'
import Contact from '../components/Contact'
import usePageMeta from '../hooks/usePageMeta'

const channels = [
  { label: 'Email', value: 'zhanxstudio@gmail.com', href: 'mailto:zhanxstudio@gmail.com', note: 'Best for project briefs' },
  { label: 'Location', value: 'Tamil Nadu, India', href: '#', note: 'Remote worldwide' },
]

const responseTimes = [
  { label: 'Email', value: '< 24 hours' },
  { label: 'Project Quote', value: '24 – 48 hours' },
]

const faqs = [
  { q: 'How much does a website cost?', a: 'It depends on scope and complexity. Portfolio sites, landing pages, and full web apps all differ — share your requirements and I\u2019ll send an honest quote within 24\u201348 hours.' },
  { q: 'How long does a project take?', a: 'A landing page typically takes 3\u20135 days, a portfolio 1\u20132 weeks, and full-stack applications 3\u20136 weeks depending on features.' },
  { q: 'Do you provide support after launch?', a: 'Yes. Every project includes post-launch support — bug fixes, updates, and new features whenever you need them.' },
  { q: 'Can you work with my existing design?', a: 'Absolutely. I can build from your Figma files, sketches, or a reference site, and add my own creative polish on top.' },
]

export default function ContactPage() {
  usePageMeta({
    title: 'Contact',
    description: 'Get in touch with Zhanx Studio — project quotes within 24–48 hours. Currently available for new projects.',
  })
  return (
    <>
      <PageShell index="04" eyebrow="LET'S COLLABORATE" title="Contact.">
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {channels.map((c, i) => (
            <motion.a
              key={i}
              href={c.href}
              variants={childVariants.flipUp}
              className="p-8 border border-[rgba(201,168,76,0.12)] bg-[--card]/40 hover:border-[rgba(201,168,76,0.4)] hover:bg-[--card]/70 transition-all duration-300 group"
            >
              <p className="text-[0.65rem] tracking-[0.3em] text-[--gold] font-mono uppercase mb-3">{c.label}</p>
              <p className="font-display text-lg md:text-xl mb-2 group-hover:text-[--gold] transition-colors">{c.value}</p>
              <p className="text-[0.78rem] text-[--muted-foreground]">{c.note}</p>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="flex items-center gap-3 mb-16 p-5 border border-[--border] rounded-xl bg-[--background] max-w-md"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse inline-block" />
          <span className="text-sm text-[--muted-foreground]">Currently available for new projects</span>
        </motion.div>

        <motion.h2
          className="font-display text-[clamp(1.8rem,4vw,2.8rem)] mb-8"
          initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          Response <span style={{ color: 'var(--gold)' }}>time.</span>
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {responseTimes.map((r, i) => (
            <motion.div
              key={i}
              variants={childVariants.rotateIn}
              className="p-6 border border-[rgba(201,168,76,0.12)] bg-[--card]/40 text-center"
            >
              <p className="font-display text-2xl text-[--gold] mb-2">{r.value}</p>
              <p className="text-[0.68rem] tracking-[0.2em] uppercase text-[--muted-foreground] font-mono">{r.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.h2
          className="font-display text-[clamp(1.8rem,4vw,2.8rem)] mb-8 text-center"
          initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          FAQ<span style={{ color: 'var(--gold)' }}>.</span>
        </motion.h2>
        <motion.div
          className="space-y-4 mb-20 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              variants={childVariants.fadeUp}
              className="p-6 border border-[--border] bg-[--card]/40 hover:border-[rgba(201,168,76,0.35)] transition-all duration-300 text-center"
            >
              <p className="font-display text-lg mb-2">{f.q}</p>
              <p className="text-[0.85rem] text-[--muted-foreground] leading-relaxed">{f.a}</p>
            </motion.div>
          ))}
        </motion.div>

        <TelemetryPanel
          nodeName="Node: ZX-COMMS-07"
          streamLabel="Comms Channel Stream"
          logs={[
            '> Establishing comms tunnel...',
            '> Email gateway: connected',
            '> Inbox sync: 0 unread',
            '> Response queue: syncing...',
            '> Encryption: AES-256 verified',
            '> Channel ready for handshake.',
          ]}
          hubs={[
            'Email Hub: zhanxstudio@gmail.com (Active)',
            'WhatsApp Bridge: Response < 1h',
          ]}
          stats={[
            { label: 'Avg Response', value: '< 24h' },
            { label: 'Open Slots', value: '03' },
            { label: 'Status', status: 'ONLINE' },
          ]}
        />
      </PageShell>
      <Contact />
      <Footer />
    </>
  )
}
