import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [telemetryLogs, setTelemetryLogs] = useState([
    '> Establishing quantum tunnel...',
    '> Key exchange complete.',
    '> Node verification signature: OK',
    '> Mainframe streaming active...'
  ])
  const [isProcessing, setIsProcessing] = useState(false)

  const location = useLocation()

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      setCurrentTime(new Date().toLocaleTimeString('en-US', options))
    }
    updateTime()
    const clockInterval = setInterval(updateTime, 1000)

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearInterval(clockInterval)
    }
  }, [])

  useEffect(() => {
    const logInterval = setInterval(() => {
      if (menuOpen && !isProcessing) {
        const events = [
          '> Routing packet via Dharmapuri node...',
          '> Routing packet via Salem node...',
          '> Synchronizing node data ledger...',
          '> Ping check: 24ms SLA ok',
          '> Re-encrypting quantum data streams...',
          '> Telemetry sync complete.'
        ]
        const newLog = events[Math.floor(Math.random() * events.length)]
        setTelemetryLogs(prev => [...prev.slice(-6), newLog])
      }
    }, 4000)
    return () => clearInterval(logInterval)
  }, [menuOpen, isProcessing])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      if (window.__lenis) window.__lenis.stop()
      return () => {
        document.body.style.overflow = ''
        if (window.__lenis) window.__lenis.start()
      }
    }
  }, [menuOpen])

  const links = [
    { to: '/projects', label: 'PROJECTS' },
    { to: '/skills', label: 'SKILLS' },
    { to: '/services', label: 'SERVICES' },
    { to: '/testimonials', label: 'TESTIMONIALS' },
    { to: '/stats', label: 'STATS' },
    { to: '/ai-mentor', label: 'AI MENTOR' },
    { to: '/contact', label: 'CONTACT' },
  ]

  const headerLinks = [
    { to: '/projects', label: 'PROJECTS' },
    { to: '/services', label: 'SERVICES' },
    { to: '/testimonials', label: 'TESTIMONIALS' },
    { to: '/contact', label: 'CONTACT' },
  ]

  const handleHandshake = () => {
    setIsProcessing(true)
    setTelemetryLogs(prev => [...prev, '> Starting custom handshake check...'])

    const steps = [
      '> Initializing secure node authorization...',
      '> Tunnel path: VX-NODE -> SLM-NODE -> ZHANX-GATEWAY',
      '> Verifying credentials...',
      '> Handshake verified. Sandbox node operational.'
    ]

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setTelemetryLogs(prev => [...prev.slice(-6), step])
        if (idx === steps.length - 1) setIsProcessing(false)
      }, (idx + 1) * 800)
    })
  }

  const isActive = to => location.pathname === to

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-[--background]/90 border-b border-[--border] backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-3 items-center">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 group w-fit col-span-2 lg:col-span-1">
            <img src={logo} alt="Zhanx Studio" className="h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-105" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[0.9rem] sm:text-[0.95rem] tracking-wide text-[--foreground] group-hover:text-[--gold] transition-colors whitespace-nowrap">ZHANX STUDIO</span>
              <span className="hidden sm:block text-[0.55rem] font-mono text-[--muted-foreground] tracking-[0.28em] mt-1 uppercase">Full Stack Developer</span>
            </span>
          </Link>

          <nav className="hidden lg:flex justify-center">
            <ul className="flex gap-8 list-none">
              {headerLinks.map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`text-[0.78rem] tracking-[0.12em] font-bold transition-colors duration-200 ${
                      isActive(l.to) ? 'text-[--gold]' : 'hover:text-[--gold]'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-6">
            <Link
              to="/contact"
              className="hidden md:inline-block px-5 py-2 rounded-full border border-[--gold]/40 text-[--gold] hover:bg-[--gold] hover:text-[--background] font-bold font-mono text-xs tracking-wider transition-all uppercase"
            >
              Hire Me
            </Link>

            <button
              onClick={() => setMenuOpen(v => !v)}
              className="relative w-10 h-10 flex flex-col justify-center items-center group cursor-pointer border-none bg-transparent"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-[2px] bg-[--foreground] transition-all duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-[2px]' : 'mb-1.5 group-hover:w-4'
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-[--foreground] transition-all duration-300 origin-center ${
                  menuOpen ? '-rotate-45' : 'group-hover:w-5'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[--background]/98 backdrop-blur-2xl overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        data-lenis-prevent
      >
        <div className="absolute inset-0 diagonal-lines opacity-10 pointer-events-none" />

        <div className="w-full max-w-[1280px] mx-auto px-6 pt-24 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 min-h-full">
          {/* LEFT COLUMN: Telemetry Console */}
          <div className="lg:col-span-4 hidden lg:block space-y-6">
            <div className="p-6 rounded-[24px] border border-[--border] bg-[--card]/60 backdrop-blur-md relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-[--border] pb-3 mb-4">
                <span className="text-[10px] font-mono text-[--gold] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Node Telemetry Stream
                </span>
                <span className="text-[9px] font-mono text-[--muted-foreground]">Node: ZX-SEC-72</span>
              </div>

              <div className="bg-black/90 rounded-xl p-4 font-mono text-[11px] text-green-400 min-h-[160px] flex flex-col justify-between overflow-hidden shadow-inner border border-[--border]">
                <div className="space-y-1.5">
                  {telemetryLogs.map((log, idx) => (
                    <p key={idx} className={log.includes('credentials') ? 'text-yellow-500' : 'text-green-400'}>
                      {log}
                    </p>
                  ))}
                  {isProcessing && (
                    <p className="text-yellow-500 animate-pulse">&gt; Auth handshake in progress...</p>
                  )}
                </div>
              </div>

              <button
                onClick={handleHandshake}
                disabled={isProcessing}
                className="w-full mt-4 py-3 rounded-xl border border-[--gold]/30 text-[--gold] hover:bg-[--gold] hover:text-[--background] font-bold font-mono text-[11px] uppercase transition-all tracking-wider disabled:opacity-50 cursor-pointer bg-transparent"
              >
                Trigger Handshake Test
              </button>
            </div>

            <div className="p-6 rounded-[24px] border border-[--border] bg-[--card]/30">
              <h5 className="text-[11px] font-mono text-[--gold] font-bold uppercase tracking-wider mb-2">Operational Hubs</h5>
              <div className="text-xs text-[--muted-foreground] space-y-1 font-mono">
                <p>📍 India Hub: 12.1211° N (Active)</p>
                <p>📍 London HQ: 51.5074° W (Bridge)</p>
                <p>📍 Singapore Hub: 1.3521° E (Edge Routing)</p>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Giant Navigation Links */}
          <div className="lg:col-span-5 flex flex-col justify-center max-lg:text-center">
            <span className="text-[10px] font-mono text-[--gold] font-bold tracking-[0.3em] uppercase mb-4 block">
              NAVIGATIONAL MAIN
            </span>
            <nav className="space-y-3 md:space-y-4">
              {links.map(link => (
                <div key={link.to} className="overflow-hidden">
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`block font-display text-[clamp(2rem,6vw,4.25rem)] font-extrabold tracking-tight leading-none uppercase transition-all duration-300 hover:text-[--gold] hover:translate-x-3 max-lg:hover:translate-x-0 ${
                      isActive(link.to) ? 'text-[--gold]' : 'text-[--foreground]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* RIGHT COLUMN: Clock & Stats */}
          <div className="lg:col-span-3 space-y-8 flex flex-col justify-between h-full py-6 text-sm border-t lg:border-t-0 lg:border-l border-[--border] max-lg:pt-8 lg:pl-10">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-[--muted-foreground] tracking-widest uppercase block mb-1">LOCAL TIME</span>
                <span className="font-mono text-2xl md:text-3xl font-extrabold text-[--gold] tracking-wider">{currentTime || '00:00:00'}</span>
                <span className="text-[10px] text-[--muted-foreground] font-mono block">GMT+5:30 (India Standard Time)</span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[--muted-foreground] tracking-widest uppercase block mb-1">NETWORK TELEMETRY</span>
                <div className="space-y-2.5 font-mono text-xs mt-2">
                  <div className="flex justify-between border-b border-[--border] pb-1.5">
                    <span className="text-[--muted-foreground]">Core Uptime</span>
                    <span className="text-[--foreground] font-bold">99.9997%</span>
                  </div>
                  <div className="flex justify-between border-b border-[--border] pb-1.5">
                    <span className="text-[--muted-foreground]">Active Nodes</span>
                    <span className="text-[--foreground] font-bold">148 / 150</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[--muted-foreground]">Status</span>
                    <span className="text-green-500 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                      ONLINE
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-[--muted-foreground] tracking-widest uppercase block mb-2">OPERATOR</span>
              <span className="font-mono text-xs text-[--foreground] font-bold tracking-wider">ZHANX STUDIO</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
