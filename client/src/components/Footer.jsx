import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/ai-mentor', label: 'AI Mentor' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <motion.footer
      className="border-t border-[--border] py-12 px-6 bg-[--background] relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute right-[-4rem] top-[-4rem] w-64 h-64 rounded-full border border-[rgba(201,168,76,0.1)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img src={logo} alt="Zhanx Studio" className="h-7 w-auto object-contain mb-4" />
          <p className="text-[0.8rem] text-[--muted-foreground] leading-relaxed max-w-xs">
            Full Stack Developer building fast, animated, production-ready web apps with React, Node.js and MongoDB.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-[0.65rem] tracking-[0.3em] text-[--gold] font-mono uppercase mb-4">Navigate</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {links.map(l => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-[0.8rem] text-[--muted-foreground] hover:text-[--gold] transition-colors duration-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-[0.65rem] tracking-[0.3em] text-[--gold] font-mono uppercase mb-4">Contact</p>
          <a href="mailto:zhanxstudio@gmail.com" className="block text-[0.8rem] text-[--muted-foreground] hover:text-[--gold] transition-colors duration-200 mb-5">
            zhanxstudio@gmail.com
          </a>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.06)]">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[0.7rem] font-mono text-[--foreground] tracking-wider">OPEN FOR NEW PROJECTS</span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-[1280px] mx-auto relative pt-6 border-t border-[--border] flex flex-col md:flex-row items-center justify-between gap-3">
        <motion.p
          className="text-[0.68rem] tracking-[0.15em] text-[--muted-foreground] font-bold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          © 2026 ZHANX STUDIO
        </motion.p>
        <motion.div
          className="flex items-center gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <Link to="/terms" className="text-[0.62rem] font-mono text-[--muted-foreground]/70 tracking-wider hover:text-[--gold] transition-colors">TERMS</Link>
          <span className="text-[--muted-foreground]/40 text-[0.6rem]">·</span>
          <Link to="/privacy" className="text-[0.62rem] font-mono text-[--muted-foreground]/70 tracking-wider hover:text-[--gold] transition-colors">PRIVACY</Link>
        </motion.div>
        <motion.p
          className="text-[0.62rem] font-mono text-[--muted-foreground]/70 tracking-wider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          BUILT WITH REACT · TAILWIND · FRAMER MOTION
        </motion.p>
      </div>
    </motion.footer>
  )
}
