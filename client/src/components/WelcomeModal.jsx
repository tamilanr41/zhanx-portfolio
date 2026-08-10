import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

const BOOT_LINE = '> Establishing secure connection to Zhanx Studio...'

const TITLE = 'ZHANX STUDIO'

export default function WelcomeModal({ onClose }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [boot, setBoot] = useState('')
  const [showCard, setShowCard] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!open) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setBoot(BOOT_LINE.slice(0, i))
      if (i >= BOOT_LINE.length) {
        clearInterval(interval)
        setTimeout(() => setShowCard(true), 250)
      }
    }, 22)
    return () => clearInterval(interval)
  }, [open])

  const close = () => {
    setOpen(false)
    if (onClose) onClose()
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1010] flex items-center justify-center p-3 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={close} />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-3xl border border-[rgba(201,168,76,0.35)] bg-[#051410]/95 shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* corner frames */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[--gold] opacity-60 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[--gold] opacity-60 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[--gold] opacity-60 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[--gold] opacity-60 rounded-br-lg pointer-events-none" />

            {/* ambient glows */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[rgba(201,168,76,0.08)] blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[rgba(201,168,76,0.05)] blur-3xl pointer-events-none" />

            <button
              onClick={() => close(true)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[--border] text-[--muted-foreground] hover:text-[--gold] hover:border-[rgba(201,168,76,0.4)] flex items-center justify-center text-sm transition-all cursor-pointer z-10 bg-[--card]/60"
              aria-label="Close welcome"
            >
              ×
            </button>

            <div className="relative p-6 md:p-10 text-center">
              {/* boot line */}
              <div className="mx-auto mb-5 md:mb-7 max-w-xs">
                <p className="text-[10px] font-mono text-green-400 text-left tracking-wide min-h-[16px]">
                  {boot}
                  <span className="inline-block w-[2px] h-3 bg-green-400 ml-0.5 align-middle animate-pulse" />
                </p>
                <div className="h-px mt-3 bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.4)] to-transparent" />
              </div>

              {/* logo badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-[--card] border border-[rgba(201,168,76,0.4)] flex items-center justify-center mx-auto mb-4 md:mb-5 shadow-[0_0_28px_rgba(201,168,76,0.25)] overflow-hidden"
              >
                <span className="absolute inset-0 rounded-full border border-[--gold]" style={{ animation: 'ping 2.5s ease-in-out infinite' }} />
                <img src={logo} alt="Zhanx Studio" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
              </motion.div>

              {/* title */}
              <AnimatePresence>
                {showCard && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-[0.6rem] tracking-[0.4em] text-[--gold] uppercase font-mono mb-3">
                      Welcome to
                    </p>
                    <h2 className="font-display text-[clamp(1.5rem,7vw,2.6rem)] leading-none mb-3 md:mb-4">
                      {TITLE.split(' ').map((word, wi) => (
                        <span key={wi} className="inline-block whitespace-nowrap">
                          {wi > 0 && <span className="inline-block w-3" />}
                          {word.split('').map((ch, ci) => (
                            <motion.span
                              key={ci}
                              className={wi === 1 ? 'inline-block text-[--gold]' : 'inline-block'}
                              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                              transition={{ duration: 0.35, delay: 0.05 + (wi * 6 + ci) * 0.03, ease: [0.16, 1, 0.3, 1] }}
                            >
                              {ch}
                            </motion.span>
                          ))}
                        </span>
                      ))}
                    </h2>
                    <p className="text-[0.85rem] text-[--muted-foreground] leading-relaxed max-w-sm mx-auto">
                      Full Stack Developer crafting fast, animated web experiences. Explore the work or reach out to start your project.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2.5 md:gap-3 justify-center mt-5 md:mt-7">
                      <button
                        onClick={close}
                        className="px-6 py-2.5 md:px-7 md:py-3 rounded-full bg-[--gold] text-[--primary-foreground] text-[0.75rem] font-bold tracking-[0.15em] hover:bg-[#d4b05a] transition-all cursor-pointer"
                      >
                        ENTER SITE →
                      </button>
                      <button
                        onClick={() => { close(); navigate('/contact') }}
                        className="px-6 py-2.5 md:px-7 md:py-3 rounded-full border border-[rgba(201,168,76,0.4)] text-[--gold] text-[0.75rem] font-bold tracking-[0.15em] hover:bg-[rgba(201,168,76,0.1)] transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        CONTACT US
                      </button>
                    </div>

                    <p className="text-[0.55rem] font-mono text-[--muted-foreground]/70 tracking-[0.25em] uppercase mt-5 md:mt-6">
                      System Online · Node ZX-01 · Support 24/7
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
