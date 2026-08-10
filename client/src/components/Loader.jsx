import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onFinish }) {
  const [phase, setPhase] = useState('enter')
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 1800)
    const t2 = setTimeout(() => setPhase('exit'), 2800)
    const t3 = setTimeout(onFinish, 3400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onFinish])

  useEffect(() => {
    const start = Date.now()
    const duration = 3400
    const tick = setInterval(() => {
      const p = Math.min(100, Math.round(((Date.now() - start) / duration) * 100))
      setPercent(p)
      if (p >= 100) clearInterval(tick)
    }, 34)
    return () => clearInterval(tick)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[--background] flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative flex flex-col items-center">
        {/* Decorative line top */}
        <motion.div
          className="h-px bg-[--gold] mb-10"
          initial={{ width: 0 }}
          animate={{ width: phase === 'exit' ? 0 : 120 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* ZHANX — staggered letters */}
        <div className="flex overflow-hidden mb-2">
          {'ZHANX'.split('').map((letter, i) => (
            <motion.span
              key={letter}
              className="font-display text-[clamp(3.5rem,10vw,6rem)] font-bold text-[--foreground] inline-block"
              initial={{ y: 120, rotate: 15 }}
              animate={
                phase === 'exit'
                  ? { y: -120, rotate: -15, opacity: 0 }
                  : { y: 0, rotate: 0 }
              }
              transition={{
                duration: 0.5,
                delay: phase === 'exit' ? i * 0.06 : i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* STUDIO — slides up */}
        <motion.span
          className="font-display text-sm tracking-[0.6em] text-[--gold]"
          initial={{ opacity: 0, y: 20 }}
          animate={
            phase === 'exit'
              ? { opacity: 0, y: -20 }
              : { opacity: 1, y: 0 }
          }
          transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          STUDIO
        </motion.span>

        {/* Decorative line bottom */}
        <motion.div
          className="h-px bg-[--gold] mt-10"
          initial={{ width: 0 }}
          animate={{ width: phase === 'exit' ? 0 : 120 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </div>

        {/* Dot indicators */}
        <div className="flex gap-2 mt-12">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[--gold]"
              animate={{
                opacity: phase === 'exit' ? 0 : [0.2, 1, 0.2],
                scale: phase === 'exit' ? 0 : [1, 1.3, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: phase === 'exit' ? 0 : Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Progress percentage */}
        <div className="mt-8 flex items-center gap-3 w-44">
          <div className="h-px flex-1 bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[--gold-soft] to-[--gold-bright] transition-all duration-100" style={{ width: `${percent}%` }} />
          </div>
          <span className="font-mono text-xs text-[--gold] tabular-nums">{percent}%</span>
        </div>
    </motion.div>
  )
}
