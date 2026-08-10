import { motion } from 'framer-motion'
import PageShell from './PageShell'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { Eye, Database, Target, Cookie, Users, Clock, ShieldCheck, Lock, RefreshCw, Mail } from 'lucide-react'
import usePageMeta from '../hooks/usePageMeta'

const sections = [
  {
    icon: Eye,
    title: 'Overview',
    body: 'This Privacy Policy explains what information Zhanx Studio ("we", "us") collects through this portfolio website, how it is used, and the choices you have. By using this website, you agree to the practices described below.',
  },
  {
    icon: Database,
    title: 'Data We Collect',
    body: 'When you use the contact form, we collect your name, email address, and the message you send (including any selected service and subject). We do not collect sensitive personal data. We may collect anonymized usage data such as page visits to understand how the site is used.',
  },
  {
    icon: Target,
    title: 'How We Use Your Data',
    body: 'The information you submit is used solely to respond to your inquiry, prepare a project quote, and communicate with you about the project. We never sell or rent your personal information to anyone.',
  },
  {
    icon: Cookie,
    title: 'Cookies',
    body: 'This website uses a single cookie (cookie_consent) to remember whether you accepted or declined the cookie notice. It stores no personal data and expires after one year. No advertising or tracking cookies are used.',
  },
  {
    icon: Users,
    title: 'Third-Party Services',
    body: 'If you submit the contact form, your details may be processed by our email and hosting providers (such as the hosting provider of this site) solely to deliver your message. These providers are bound by their own privacy policies.',
  },
  {
    icon: Clock,
    title: 'Data Retention',
    body: 'Inquiries are retained only as long as needed to serve you — typically until the project discussion concludes, or sooner if you request deletion. Usage analytics are kept in anonymized, aggregated form.',
  },
  {
    icon: ShieldCheck,
    title: 'Your Rights',
    body: 'You may request access to, correction of, or deletion of any personal information you have shared with us at any time by contacting zhanxstudio@gmail.com. We will respond within a reasonable timeframe.',
  },
  {
    icon: Lock,
    title: 'Security',
    body: 'We take reasonable technical and organizational measures to protect the information you submit. However, no method of transmission over the internet is 100% secure, so absolute security cannot be guaranteed.',
  },
  {
    icon: RefreshCw,
    title: 'Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.',
  },
  {
    icon: Mail,
    title: 'Contact',
    body: 'For any privacy-related questions, contact us at zhanxstudio@gmail.com.',
  },
]

export default function Privacy() {
  usePageMeta({
    title: 'Privacy Policy',
    description: 'Privacy policy for Zhanx Studio — what data is collected, how it is used, and your rights.',
  })
  return (
    <>
      <PageShell index="06" eyebrow="LEGAL" title="Privacy.">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12 text-center"
        >
          <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-gradient-to-br from-[rgba(201,168,76,0.25)] to-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.4)] flex items-center justify-center">
            <ShieldCheck size={24} className="text-[--gold]" />
          </div>
          <p className="text-[0.9rem] text-[--muted-foreground] leading-relaxed">
            Last updated: August 2026. Your privacy matters — this policy explains exactly what happens with your data on this site.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {sections.map((s) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="group p-6 md:p-7 border border-[rgba(201,168,76,0.12)] bg-[--card]/40 hover:border-[rgba(201,168,76,0.4)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[--gold] to-transparent group-hover:w-full transition-all duration-500" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.25)] flex items-center justify-center group-hover:bg-[--gold] group-hover:text-[--primary-foreground] transition-all duration-300">
                    <Icon size={16} className="text-[--gold] group-hover:text-[--primary-foreground] transition-colors duration-300" />
                  </div>
                  <h2 className="font-display text-base text-[--gold]">{s.title}</h2>
                </div>
                <p className="text-[0.85rem] text-[--muted-foreground] leading-relaxed text-left">{s.body}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 text-center p-8 md:p-10 border border-[rgba(201,168,76,0.25)] bg-[--card]/40 max-w-4xl mx-auto relative overflow-hidden"
        >
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-64 h-32 bg-[rgba(201,168,76,0.07)] blur-3xl pointer-events-none" />
          <div className="relative">
            <ShieldCheck size={28} className="mx-auto mb-4 text-[--gold]" />
            <h3 className="font-display text-xl mb-3">Your data is safe here.</h3>
            <p className="text-[0.85rem] text-[--muted-foreground] mb-6 max-w-md mx-auto">
              Review our <Link to="/terms" className="text-[--gold] border-b border-[--gold]">Terms &amp; Conditions</Link>, or just ask.
            </p>
            <Link
              to="/contact"
              className="inline-block border border-[--gold] text-[--gold] px-8 py-3 rounded-full text-[0.78rem] tracking-[0.15em] hover:bg-[--gold] hover:text-[--background] transition-all duration-300"
            >
              CONTACT US
            </Link>
          </div>
        </motion.div>
      </PageShell>
      <Footer />
    </>
  )
}
