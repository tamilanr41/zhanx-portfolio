import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageShell from './PageShell'
import StatsRow from './StatsRow'
import TelemetryPanel from './TelemetryPanel'
import { containerVariants, childVariants } from '../components/AnimatedSection'
import Footer from '../components/Footer'
import usePageMeta from '../hooks/usePageMeta'
import work1 from '../assets/work-1.jpg'
import work2 from '../assets/work-2.jpg'
import work3 from '../assets/work-3.jpg'
import extra1 from '../assets/extra-1.png'
import extra2v2 from '../assets/extra-2-v2.png'
import extra3 from '../assets/extra-3.png'

const projects = [
  { img: work1, label: '01 / REACT', title: 'Birthday Special', url: 'https://birthday-specialonee.netlify.app', tech: 'React · Tailwind · Framer Motion' },
  { img: work2, label: '02 / UI DESIGN', title: 'Lively Torte', url: 'https://lively-torte-a4e687.netlify.app', tech: 'React · UI/UX · Animation' },
  { img: work3, label: '03 / E-COMMERCE', title: 'Zhanx Fashion', url: 'https://tamilan-fashion.netlify.app', tech: 'React · Node · Stripe' },
  { img: extra1, label: '04 / FULL STACK', title: 'Zhanx Job Portal', url: 'https://tamilan-jobportal.netlify.app', tech: 'MERN · REST API · Auth' },
  { img: extra2v2, label: '05 / LANDING PAGE', title: 'Zhanx Gedda', url: 'https://gedda.netlify.app', tech: 'React · Vite · GSAP' },
  { img: extra3, label: '06 / BAKERY SITE', title: 'Zhanx Cake Shop', url: 'https://cake-shop-me.netlify.app', tech: 'React · Node · CMS' },
]

const stats = [
  { value: '06+', label: 'Live Projects' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '03+', label: 'Years Experience' },
  { value: '100%', label: 'Client Satisfaction' },
]

const stack = [
  { group: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vite'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Auth'] },
  { group: 'Tooling', items: ['Git', 'Vercel', 'Netlify', 'Postman', 'Figma'] },
]

const process = [
  { num: '01', title: 'Discover', desc: 'We map your goals, audience, and requirements into a clear project blueprint.' },
  { num: '02', title: 'Design', desc: 'Wireframes and high-fidelity UI with your brand at the center — no generic templates.' },
  { num: '03', title: 'Develop', desc: 'Clean, scalable code with modern frameworks and performance budgets from day one.' },
  { num: '04', title: 'Deploy', desc: 'Production rollout with CI/CD, monitoring, and post-launch support.' },
]

export default function Projects() {
  usePageMeta({
    title: 'Projects',
    description: 'Selected projects by Zhanx Studio — e-commerce, job portals, fashion stores and web applications built end to end.',
  })
  return (
    <>
      <PageShell index="01" eyebrow="SELECTED PROJECTS · 2024—2025" title="Projects.">
        <StatsRow stats={stats} />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {projects.map((p, i) => (
            <motion.a
              key={i}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              variants={childVariants.fadeUp}
              className={`group relative overflow-hidden ${i % 3 === 0 ? 'md:row-span-2' : ''}`}
            >
              <div className="relative h-[18rem] md:h-[24rem] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[--background] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[0.65rem] tracking-[0.2em] text-[--gold] font-mono mb-2">{p.label}</p>
                  <h3 className="font-display text-xl md:text-2xl">{p.title}</h3>
                  <p className="text-[0.75rem] text-[--muted-foreground] mt-1">{p.tech}</p>
                </div>
                <div className="absolute inset-0 border border-transparent group-hover:border-[rgba(201,168,76,0.5)] transition-colors duration-300" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Process */}
        <motion.h2
          className="font-display text-[clamp(1.8rem,4vw,2.8rem)] mb-10"
          initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          How we <span style={{ color: 'var(--gold)' }}>build.</span>
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {process.map((s, i) => (
            <motion.div
              key={i}
              variants={childVariants.flipUp}
              className="p-6 border border-[rgba(201,168,76,0.12)] hover:border-[rgba(201,168,76,0.4)] transition-all duration-300"
            >
              <p className="font-display text-3xl font-black text-[rgba(201,168,76,0.25)] mb-4">{s.num}</p>
              <h3 className="font-display text-lg mb-2">{s.title}</h3>
              <p className="text-[0.82rem] text-[--muted-foreground] leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stack */}
        <motion.h2
          className="font-display text-[clamp(1.8rem,4vw,2.8rem)] mb-10"
          initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          Tech <span style={{ color: 'var(--gold)' }}>stack.</span>
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {stack.map((g, i) => (
            <motion.div
              key={i}
              variants={childVariants.fadeUp}
              className="p-6 border border-[--border] bg-[--card]/40"
            >
              <p className="text-[0.65rem] tracking-[0.3em] text-[--gold] font-mono uppercase mb-4">{g.group}</p>
              <ul className="space-y-2">
                {g.items.map(item => (
                  <li key={item} className="text-[0.9rem] text-[--muted-foreground] flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[--gold]" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-center"
        >
          <p className="text-[--muted-foreground] text-[0.9rem] mb-4">
            Want to see your idea built like these?
          </p>
          <Link
            to="/contact"
            className="inline-block border border-[--gold] text-[--gold] px-8 py-3 rounded-full text-[0.78rem] tracking-[0.15em] hover:bg-[--gold] hover:text-[--background] transition-all duration-300"
          >
            START A PROJECT
          </Link>
        </motion.div>

        <div className="mt-24">
          <TelemetryPanel
            nodeName="Node: ZX-DEPLOY-01"
            streamLabel="Build Telemetry Stream"
            logs={[
              '> Compiling project assets...',
              '> Bundle optimization: OK',
              '> Deploying to production cluster...',
              '> SSL handshake verified.',
              '> Edge cache warmed. 100%',
              '> Uptime check: 99.99%',
              '> DNS propagation complete.',
            ]}
            hubs={[
              'Vercel Edge: Frankfurt (Primary)',
              'Netlify CDN: Mumbai (Bridge)',
              'GitHub Actions: Build Runner (Active)',
            ]}
            stats={[
              { label: 'Deploys', value: '142' },
              { label: 'Build Time', value: '38s avg' },
              { label: 'Status', status: 'ACTIVE' },
            ]}
          />
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
