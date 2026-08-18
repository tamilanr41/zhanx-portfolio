import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[9998]"
      style={{ scaleX, background: 'linear-gradient(90deg, var(--gold-soft), var(--gold-bright))' }}
    />
  )
}
