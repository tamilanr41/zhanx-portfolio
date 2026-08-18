import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import heroPortrait from '../assets/hero-portrait.jpg'
import zhanxPortrait from '../assets/zhanx-portrait.jpeg'
const roles = ['FULL STACK DEVELOPER', 'MERN SPECIALIST', 'UI CRAFTSMAN', 'PROBLEM SOLVER']

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const imgRef = useRef(null)
  const [mask, setMask] = useState('')

  const handleMouseMove = (e) => {
    if (isMobile) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMask(`radial-gradient(circle at ${x}px ${y}px, transparent 70px, rgba(0,0,0,1) 71px)`)
  }

  const handleMouseLeave = () => setMask('')

  useEffect(() => {
    const current = roles[roleIndex]
    let timer
    if (!deleting && displayText.length < current.length) {
      timer = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 60)
    } else if (!deleting && displayText.length === current.length) {
      timer = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayText.length > 0) {
      timer = setTimeout(() => setDisplayText(current.slice(0, displayText.length - 1)), 30)
    } else if (deleting && displayText.length === 0) {
      setDeleting(false)
      setRoleIndex((roleIndex + 1) % roles.length)
    }
    return () => clearTimeout(timer)
  }, [displayText, deleting, roleIndex])

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  }

  const { scrollYProgress } = useScroll()
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, -140])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const gx = useMotionValue(0)
  const gy = useMotionValue(0)
  const hoverStrength = useMotionValue(0)
  const [tiltActive, setTiltActive] = useState(false)

  const rotateY = useSpring(useTransform(mx, [-1, 1], [-7, 7]), { stiffness: 140, damping: 16 })
  const rotateX = useSpring(useTransform(my, [-1, 1], [7, -7]), { stiffness: 140, damping: 16 })
  const translateX = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 110, damping: 14 })
  const translateY = useSpring(useTransform(my, [-1, 1], [-10, 10]), { stiffness: 110, damping: 14 })
  const glowOpacity = useSpring(useTransform(hoverStrength, [0, 1], [0, 1]), { stiffness: 130, damping: 18 })

  const handleTitleMove = (e) => {
    if (isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top
    mx.set((px / rect.width) * 2 - 1)
    my.set((py / rect.height) * 2 - 1)
    gx.set(px)
    gy.set(py)
  }
  const handleTitleEnter = () => {
    hoverStrength.set(1)
    setTiltActive(true)
  }
  const handleTitleLeave = () => {
    mx.set(0)
    my.set(0)
    gx.set(-130)
    gy.set(-130)
    hoverStrength.set(0)
    setTiltActive(false)
  }

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-24 min-h-screen flex items-center bg-[--background]">
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ y: watermarkY }}
      >
        <span className="text-[clamp(6rem,20vw,16rem)] font-display font-black text-[rgba(201,168,76,0.04)] whitespace-nowrap leading-none">
          TAMILAN
        </span>
      </motion.div>
      <motion.div
        className="absolute right-0 top-24 w-72 h-72 rounded-full border border-[rgba(201,168,76,0.4)] pointer-events-none"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-10 bottom-40 w-48 h-48 rounded-full border border-[rgba(201,168,76,0.2)] pointer-events-none"
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute right-10 top-44 w-44 h-28 opacity-60 pointer-events-none diagonal-lines" />

      <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="relative z-10"
          variants={container}
          initial="hidden"
          animate="visible"
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.p variants={item} className="text-[0.68rem] tracking-[0.4em] text-[--gold] mb-6 uppercase font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-[--gold] animate-pulse mr-2" />
            {displayText}<span className="animate-pulse">|</span>
          </motion.p>
          <motion.h1
            variants={item}
            onMouseMove={handleTitleMove}
            onMouseEnter={handleTitleEnter}
            onMouseLeave={handleTitleLeave}
            className={`font-display leading-[0.9] text-[clamp(3rem,10vw,7rem)] uppercase relative cursor-default select-none ${tiltActive ? 'text-glow-hero' : ''}`}
            style={{ rotateX, rotateY, x: translateX, y: translateY, transformPerspective: 800 }}
          >
            <motion.div
              className="absolute pointer-events-none rounded-full"
              style={{
                x: gx,
                y: gy,
                left: -130,
                top: -130,
                width: 260,
                height: 260,
                opacity: glowOpacity,
                background: 'radial-gradient(circle, rgba(201,168,76,0.32) 0%, rgba(201,168,76,0.1) 45%, transparent 72%)',
                filter: 'blur(8px)',
              }}
            />
            Zhanx<br />
            <span className="text-[--gold]">Studio.</span>
          </motion.h1>
          <motion.p variants={item} className="mt-8 max-w-[28rem] text-[--muted-foreground] text-base leading-relaxed">
            Full Stack Developer building scalable web apps using React, Node.js, and modern web technologies. Delivering production systems with 99.9% uptime.
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <motion.a
              href="#work"
              className="bg-[--gold] text-[--primary-foreground] px-6 py-3 rounded-full text-[0.78rem] font-semibold tracking-[0.12em]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              VIEW PROJECTS
            </motion.a>
            <motion.a
              href="#contact"
              className="border border-[rgba(245,244,240,0.4)] text-[--foreground] px-6 py-3 rounded-full text-[0.78rem] tracking-[0.12em]"
              whileHover={{ scale: 1.05, y: -2, borderColor: 'var(--gold)', color: 'var(--gold)' }}
              whileTap={{ scale: 0.97 }}
            >
              HIRE ME
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          style={{ y: portraitY }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative" ref={imgRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="absolute -top-4 -left-4 right-0 bottom-0 border border-[--gold] pointer-events-none" />
            <img
              src={zhanxPortrait}
              alt=""
              className="block w-full h-[32rem] max-sm:h-[22rem] object-cover"
              style={{ filter: 'grayscale(1) contrast(1.05) brightness(0.9)' }}
            />
            <img
              src={heroPortrait}
              alt="Zhanx Studio"
              className="hero-image absolute inset-0 pointer-events-none"
              style={{
                WebkitMaskImage: isMobile ? 'radial-gradient(circle at 50% 50%, black 60%, transparent 100%)' : (mask || 'none'),
                maskImage: isMobile ? 'radial-gradient(circle at 50% 50%, black 60%, transparent 100%)' : (mask || 'none'),
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                filter: 'grayscale(1) contrast(1.2) brightness(0.65)',
              }}
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-20 diagonal-lines opacity-60 pointer-events-none" />
          </div>

          <motion.div
            className="absolute -left-6 bottom-16 hidden lg:block bg-[--card] border border-[--border] px-4 py-3 rounded-xl shadow-xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
          >
            <p className="text-[0.65rem] tracking-[0.15em] text-[--gold] font-bold">AVAILABLE FOR</p>
            <p className="text-sm font-bold tracking-wide mt-0.5">HIRE</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
