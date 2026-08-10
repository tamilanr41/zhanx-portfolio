import { motion } from 'framer-motion'
import PageShell from './PageShell'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const clauses = [
  {
    no: '01',
    title: 'Overview',
    body: 'These Terms and Conditions govern your use of the Zhanx Studio portfolio website and any services ("the Services") provided by Zhanx Studio ("we", "us"). By browsing this website or requesting our services, you agree to these terms in full.',
  },
  {
    no: '02',
    title: 'Services',
    body: 'We provide web development, portfolio design, scroll-animation websites, e-commerce, landing pages, and video editing services. Each project is scoped individually during a free consultation, and a written proposal is shared before any work begins.',
  },
  {
    no: '03',
    title: 'Pricing & Payment',
    body: 'Pricing is custom-quoted per project based on scope, features, and complexity. A typical schedule is a deposit before work starts and the balance on completion. You will always be informed of costs and any change requests before they are billed.',
  },
  {
    no: '04',
    title: 'Timelines',
    body: 'Estimated delivery times are shared upfront (landing pages 3–5 days, portfolios 1–2 weeks, web applications 2–4 weeks or more). Timelines are estimates, not guarantees, and may shift if scope changes or required assets are delayed.',
  },
  {
    no: '05',
    title: 'Client Responsibilities',
    body: 'You agree to provide the content, brand assets, and feedback needed to complete your project, and to respond to requests within reasonable timeframes so we can keep your timeline on track.',
  },
  {
    no: '06',
    title: 'Intellectual Property',
    body: 'Upon final payment, the completed website and its source code are transferred to you. We retain the right to showcase the project in our portfolio unless agreed otherwise in writing.',
  },
  {
    no: '07',
    title: 'Revisions',
    body: 'Every project includes a defined revision round so you can refine the result. Additional revision rounds beyond the agreed scope are billed separately at an agreed rate.',
  },
  {
    no: '08',
    title: 'Confidentiality',
    body: 'All project information, files, and credentials you share are treated as confidential and are never disclosed to third parties, except where required to complete the project (for example, hosting or payment providers).',
  },
  {
    no: '09',
    title: 'Limitation of Liability',
    body: 'The website and its content are provided on an "as is" basis. To the maximum extent permitted by law, Zhanx Studio is not liable for indirect or consequential damages arising from use of the website or the services. We are committed to fixing any defects reported during the support window promptly.',
  },
  {
    no: '10',
    title: 'Governing Law',
    body: 'These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts of India.',
  },
  {
    no: '11',
    title: 'Contact',
    body: 'Questions about these Terms can be sent to zhanxstudio@gmail.com. We are happy to clarify anything before you get started.',
  },
]

const meta = [
  { label: 'Effective Date', value: 'August 2026' },
  { label: 'Jurisdiction', value: 'India' },
  { label: 'Total Clauses', value: '11' },
]

export default function Terms() {
  usePageMeta({
    title: 'Terms & Conditions',
    description: 'Terms and conditions governing use of the Zhanx Studio portfolio website and services.',
  })
  return (
    <>
      <PageShell index="05" eyebrow="LEGAL" title="Terms.">
        {/* official document tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="max-w-3xl mx-auto mb-8 text-center"
        >
          <span className="inline-block px-4 py-1.5 border border-[rgba(201,168,76,0.4)] text-[0.6rem] tracking-[0.35em] uppercase font-mono text-[--gold] rounded-sm">
            OFFICIAL DOCUMENT · BINDING ON USE
          </span>
        </motion.div>

        {/* meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="max-w-3xl mx-auto mb-14 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center"
        >
          {meta.map((m) => (
            <div
              key={m.label}
              className="px-4 py-4 border border-[rgba(201,168,76,0.15)] bg-[--card]/40"
            >
              <p className="text-[0.55rem] tracking-[0.3em] uppercase font-mono text-[--muted-foreground] mb-1.5">
                {m.label}
              </p>
              <p className="font-display text-sm text-[--gold]">{m.value}</p>
            </div>
          ))}
        </motion.div>

        {/* clauses */}
        <div className="max-w-3xl mx-auto">
          {clauses.map((c, i) => (
            <motion.div
              key={c.no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-16 md:pl-20 text-center"
            >
              {/* rail */}
              {i < clauses.length - 1 && (
                <span className="absolute left-7 top-14 bottom-[-20px] w-px bg-gradient-to-b from-[rgba(201,168,76,0.45)] to-[rgba(201,168,76,0.05)]" />
              )}

              {/* clause number badge */}
              <span className="absolute left-0 top-0 w-14 h-14 border border-[rgba(201,168,76,0.35)] bg-[--card]/60 flex items-center justify-center font-display text-[--gold] text-lg shadow-[0_0_18px_rgba(201,168,76,0.12)]">
                {c.no}
              </span>

              <div className="p-5 md:p-7 border border-[rgba(201,168,76,0.1)] bg-[--card]/30 hover:border-[rgba(201,168,76,0.35)] hover:bg-[--card]/60 transition-all duration-300 min-h-[84px] flex flex-col justify-center">
                <h2 className="font-display text-base md:text-lg text-[--gold] mb-2">{c.title}</h2>
                <p className="text-[0.85rem] text-[--muted-foreground] leading-relaxed max-w-xl mx-auto">{c.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* agreement seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center p-8 md:p-10 border border-[rgba(201,168,76,0.25)] bg-[--card]/40 max-w-3xl mx-auto relative overflow-hidden"
        >
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 bg-[rgba(201,168,76,0.07)] blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-[--gold] flex items-center justify-center text-[--gold] font-display text-sm">
              ZS
            </div>
            <h3 className="font-display text-2xl mb-3">By continuing, you agree to these terms.</h3>
            <p className="text-[0.85rem] text-[--muted-foreground] mb-7 max-w-md mx-auto">
              Questions first? Read our <Link to="/privacy" className="text-[--gold] border-b border-[--gold]">Privacy Policy</Link>, or just ask.
            </p>
            <Link
              to="/contact"
              className="inline-block border border-[--gold] text-[--gold] px-8 py-3 rounded-sm text-[0.78rem] tracking-[0.2em] hover:bg-[--gold] hover:text-[--background] transition-all duration-300"
            >
              ACCEPT &amp; PROCEED
            </Link>
          </div>
        </motion.div>
      </PageShell>
      <Footer />
    </>
  )
}
