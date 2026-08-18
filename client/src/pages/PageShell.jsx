import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

export default function PageShell({ index, eyebrow, title, children }) {
  return (
    <section className="relative min-h-screen pt-28 pb-20 overflow-hidden bg-[--background]">
      {!isMobile && (
        <>
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            initial={{ y: 0 }}
            animate={{ y: -60 }}
            transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
          >
            <span className="text-[clamp(10rem,30vw,26rem)] font-display font-black text-[rgba(201,168,76,0.04)] leading-none">
              {index}
            </span>
          </motion.div>
          <motion.div
            className="absolute right-0 top-32 w-72 h-72 rounded-full border border-[rgba(201,168,76,0.25)] pointer-events-none"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -left-10 bottom-24 w-48 h-48 rounded-full border border-[rgba(201,168,76,0.15)] pointer-events-none"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.25em] font-mono text-[--muted-foreground] hover:text-[--gold] transition-colors mb-10"
        >
          ← BACK TO HOME
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="text-[0.68rem] tracking-[0.4em] text-[--gold] mb-4 uppercase font-mono">{eyebrow}</p>
          <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] uppercase">{title}</h1>
          <div className="h-0.5 w-24 bg-[--gold] mt-6" />
        </motion.div>

        {children}
      </div>
    </section>
  )
}
