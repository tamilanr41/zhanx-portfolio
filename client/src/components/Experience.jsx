import { motion } from 'framer-motion'

const experiences = [
  { year: '2026 — Present', role: 'Full Stack Developer', company: 'Freelance & Open Source', desc: 'Building high-performance web apps with React, Node.js and the MERN stack. Shipping pixel-perfect, animated interfaces.' },
  { year: '2024', role: 'B.Tech Information Technology', company: 'Excel Engineering College', desc: 'Graduated with a focus on full-stack development, UI engineering, and distributed systems.' },
  { year: '2022', role: 'Web Developer Intern', company: 'Tech Startup', desc: 'Contributed to production React apps, optimized Core Web Vitals, and built reusable component libraries.' },
  { year: '2021', role: 'Self-Taught Beginnings', company: 'JavaScript Universe', desc: 'Fell in love with JavaScript. Built first React apps and discovered the joy of building for the web.' },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function Experience() {
  return (
    <section id="experience" className="py-12 md:py-24 bg-[--background]">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-12 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-display text-[clamp(2.5rem,6vw,3.75rem)]">
            Working<br />Experiences
          </h2>
          <div className="hidden md:block h-px flex-1 bg-[rgba(201,168,76,0.4)] mb-4" />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-px"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {experiences.map((e, i) => (
            <motion.div
              key={i}
              variants={item}
              className="p-8 bg-[--background] hover:bg-[--card] transition-colors duration-300 group border border-transparent hover:border-[--border]"
            >
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-[--gold] text-[0.78rem] font-bold tracking-[0.15em]">{e.year}</span>
                <span className="h-px flex-1 bg-[--border]" />
              </div>
              <h3 className="font-display text-xl mb-1 group-hover:text-[--gold] transition-colors duration-300">{e.role}</h3>
              <p className="text-[0.82rem] text-[rgba(201,168,76,0.8)] mb-3">{e.company}</p>
              <p className="text-[0.85rem] text-[--muted-foreground] leading-relaxed">{e.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
