import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageShell from './PageShell'
import Footer from '../components/Footer'
import { containerVariants, childVariants } from '../components/AnimatedSection'
import { Code2, Server, Wrench, Sparkles } from 'lucide-react'
import usePageMeta from '../hooks/usePageMeta'

const categories = [
  {
    icon: Code2,
    title: 'Frontend',
    tagline: 'Pixel-perfect, animated interfaces',
    skills: [
      { name: 'React.js', level: 92 },
      { name: 'JavaScript (ES6+)', level: 95 },
      { name: 'TypeScript', level: 82 },
      { name: 'Tailwind CSS', level: 94 },
      { name: 'Framer Motion', level: 88 },
      { name: 'HTML5 / CSS3', level: 96 },
    ],
  },
  {
    icon: Server,
    title: 'Backend',
    tagline: 'Scalable, secure server logic',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 88 },
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 76 },
      { name: 'REST APIs', level: 90 },
      { name: 'Firebase', level: 80 },
    ],
  },
  {
    icon: Wrench,
    title: 'Tools & Workflow',
    tagline: 'Ship fast with modern tooling',
    skills: [
      { name: 'Git / GitHub', level: 92 },
      { name: 'Vite', level: 90 },
      { name: 'Figma', level: 78 },
      { name: 'Docker', level: 70 },
      { name: 'Vercel / Netlify', level: 88 },
      { name: 'Postman', level: 84 },
    ],
  },
]

const stack = [
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'JavaScript',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'HTML5',
  'CSS3',
  'Git',
  'Vite',
  'REST APIs',
  'Figma',
]

export default function Skills() {
  usePageMeta({
    title: 'Skills',
    description: 'Explore the skills and tech stack behind Zhanx Studio — React, Node.js, MongoDB, TypeScript, Tailwind CSS, Framer Motion and more.',
  })
  return (
    <>
      <PageShell index="07" eyebrow="CAPABILITIES" title="Skills.">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <p className="text-[0.9rem] text-[--muted-foreground] leading-relaxed">
            The tools I reach for every day — from rapid frontend prototyping to production-grade backends.
          </p>
        </motion.div>

        {/* Skill categories */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.title}
                variants={childVariants.flipUp}
                className="p-6 md:p-7 border border-[rgba(201,168,76,0.12)] bg-[--card]/40 hover:border-[rgba(201,168,76,0.4)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.25)] flex items-center justify-center">
                    <Icon size={18} className="text-[--gold]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg">{cat.title}</h3>
                    <p className="text-[0.7rem] text-[--muted-foreground]">{cat.tagline}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((s, i) => (
                    <div key={s.name}>
                      <div className="flex justify-between items-baseline mb-1.5">
                        <span className="text-[0.82rem] font-bold">{s.name}</span>
                        <span className="text-[0.72rem] font-mono text-[--gold]">{s.level}%</span>
                      </div>
                      <div className="h-1.5 bg-[--background] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[--gold-soft] to-[--gold-bright]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Tech stack */}
        <motion.h2
          className="font-display text-[clamp(1.8rem,4vw,2.8rem)] mb-8 text-center"
          initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          Tech <span style={{ color: 'var(--gold)' }}>stack.</span>
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
        >
          {stack.map((tech) => (
            <motion.span
              key={tech}
              variants={{
                hidden: { opacity: 0, scale: 0.7 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="px-5 py-2.5 border border-[rgba(201,168,76,0.2)] bg-[--card]/40 text-[0.8rem] font-mono text-[--muted-foreground] hover:text-[--gold] hover:border-[--gold] hover:shadow-[0_0_16px_rgba(201,168,76,0.15)] transition-all duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center p-8 md:p-10 border border-[rgba(201,168,76,0.2)] bg-[--card]/40 max-w-3xl mx-auto flex flex-col items-center gap-3"
        >
          <Sparkles size={24} className="text-[--gold]" />
          <h3 className="font-display text-xl md:text-2xl">Got a project that needs these skills?</h3>
          <p className="text-[0.85rem] text-[--muted-foreground] max-w-md">
            I build fast, animated, production-ready web experiences end to end.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-2 border border-[--gold] text-[--gold] px-8 py-3 rounded-full text-[0.78rem] tracking-[0.15em] hover:bg-[--gold] hover:text-[--background] transition-all duration-300"
          >
            START A PROJECT
          </Link>
        </motion.div>
      </PageShell>
      <Footer />
    </>
  )
}
