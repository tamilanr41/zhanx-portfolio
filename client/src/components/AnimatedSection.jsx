import { motion } from 'framer-motion'

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  },
  blurUp: {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 40 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -6, scale: 0.9, y: 30 },
    visible: { opacity: 1, rotate: 0, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  },
  flipUp: {
    hidden: { opacity: 0, rotateX: 75, y: 60, transformPerspective: 900 },
    visible: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 1.4 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  },
  clipUp: {
    hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)', y: 30 },
    visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)', y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const childVariants = {
  fadeUp: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } },
  fadeLeft: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } },
  fadeRight: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } },
  scaleIn: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } },
  flipUp: { hidden: { opacity: 0, rotateX: 75, y: 50, transformPerspective: 900 }, visible: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } },
  blurUp: { hidden: { opacity: 0, filter: 'blur(10px)', y: 40 }, visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } },
  rotateIn: { hidden: { opacity: 0, rotate: -8, scale: 0.9 }, visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } },
}

export default function AnimatedSection({ children, variant = 'fadeUp', delay = 0, className = '', stagger = false, ...props }) {
  if (stagger) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { childVariants, containerVariants }
