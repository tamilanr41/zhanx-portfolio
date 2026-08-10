import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Cookie } from 'lucide-react'

export default function CookieConsent({ started }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!started) return
    const t = setTimeout(() => setShow(true), 900)
    return () => clearTimeout(t)
  }, [started])

  const accept = () => {
    document.cookie = 'cookie_consent=accepted;path=/;max-age=' + 60 * 60 * 24 * 365
    setShow(false)
  }

  const reject = () => {
    document.cookie = 'cookie_consent=rejected;path=/;max-age=' + 60 * 60 * 24 * 365
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1020] flex items-end justify-center p-4 pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className="w-full max-w-sm pointer-events-auto"
          >
            <div
              className="relative overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.3)] shadow-[0_24px_70px_rgba(0,0,0,0.55)]"
              style={{ background: 'linear-gradient(135deg, rgba(4,18,10,0.98), rgba(9,28,17,0.97))' }}
            >
              {/* top accent line */}
              <div className="h-0.5 bg-gradient-to-r from-[--gold] via-[#ffe9a8] to-[--gold]/30" />
              <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[rgba(201,168,76,0.07)] blur-2xl" />

              {/* corner frames */}
              <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[rgba(201,168,76,0.5)] rounded-tl" />
              <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[rgba(201,168,76,0.5)] rounded-tr" />
              <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[rgba(201,168,76,0.5)] rounded-bl" />
              <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[rgba(201,168,76,0.5)] rounded-br" />

              <div className="relative p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[--gold] to-[--gold-bright] flex items-center justify-center shadow-[0_0_16px_rgba(201,168,76,0.35)]">
                    <Cookie size={22} strokeWidth={2} className="text-[--primary-foreground]" />
                  </div>
                  <div>
                    <p className="text-[0.55rem] font-mono text-[--gold] tracking-[0.3em] uppercase mb-1">Privacy Protocol</p>
                    <p className="text-sm font-bold font-display text-[--foreground]">Cookie Notice</p>
                  </div>
                </div>

                <div className="space-y-1.5 mb-5">
                  <p className="text-[0.72rem] font-mono text-green-400">{'>'} handshake: user.device connected</p>
                  <p className="text-[0.72rem] font-mono text-[--muted-foreground] leading-relaxed">
                    {`>`} we use a single cookie to remember your preferences &amp; keep the experience fast. no tracking, no crumbs. 🍪
                  </p>
                  <p className="text-[0.72rem] font-mono text-[--muted-foreground] leading-relaxed">
                    &gt; read our <Link to="/terms" className="text-[--gold] hover:underline underline-offset-2">Terms &amp; Conditions</Link> and{' '}
                    <Link to="/privacy" className="text-[--gold] hover:underline underline-offset-2">Privacy Policy</Link>.
                  </p>
                </div>

                <div className="flex gap-2.5">
                  <button
                    onClick={accept}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[--gold] text-[--primary-foreground] text-[0.65rem] font-bold tracking-widest uppercase hover:brightness-110 hover:shadow-[0_0_14px_rgba(201,168,76,0.4)] transition-all cursor-pointer"
                  >
                    Accept
                  </button>
                  <button
                    onClick={reject}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[rgba(201,168,76,0.3)] text-[--muted-foreground] text-[0.65rem] font-bold tracking-widest uppercase hover:bg-[rgba(201,168,76,0.08)] hover:text-[--gold] transition-all cursor-pointer"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
