import { motion } from 'framer-motion'
import CountUp from '../components/CountUp'

export default function StatsRow({ stats }) {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
    >
      {stats.map((s, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, scale: 0.6, rotateX: 60 },
            visible: { opacity: 1, scale: 1, rotateX: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="p-5 md:p-8 border border-[rgba(201,168,76,0.15)] bg-[--card]/40 hover:border-[rgba(201,168,76,0.45)] hover:bg-[--card]/70 transition-all duration-300"
        >
          <p className="font-display text-[1.9rem] md:text-[3.5rem] font-black text-[--gold] leading-none">
            <CountUp value={s.value} />
          </p>
          <p className="mt-3 text-[0.65rem] md:text-[0.68rem] tracking-[0.2em] uppercase text-[--muted-foreground] font-mono">{s.label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
