import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { trackFormSubmit } from '../utils/tracking'

const INITIAL = { name: '', email: '', service: '', subject: '', message: '' }
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const SERVICES = [
  'Web Development',
  'Portfolio Design',
  'Scroll Animation Website',
  'E-Commerce',
  'Landing Page',
  'Video Editing',
  'Other',
]

function validate(fields) {
  const errors = {}
  if (!fields.name.trim()) errors.name = 'Name is required'
  else if (fields.name.trim().length < 2) errors.name = 'At least 2 characters required'
  if (!fields.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Valid email address Required '
  if (!fields.subject.trim()) errors.subject = 'Subject is required'
  if (!fields.service) errors.service = 'Please select a service'
  if (!fields.message.trim()) errors.message = 'Message is required'
  else if (fields.message.trim().length < 20) errors.message = 'At least 20 characters required'
  return errors
}

function Field({ name, label, type = 'text', rows, value, onChange, onBlur, touched, error }) {
  return (
    <div>
      <label className="form-label" htmlFor={name}>{label}</label>
      {rows ? (
        <textarea
          id={name} name={name} rows={rows}
          value={value} onChange={onChange} onBlur={onBlur}
          placeholder={`Enter your ${label.toLowerCase()}...`}
          className={`form-input resize-none ${touched && error ? 'error' : ''}`}
        />
      ) : (
        <input
          id={name} name={name} type={type}
          value={value} onChange={onChange} onBlur={onBlur}
          placeholder={`Enter your ${label.toLowerCase()}...`}
          className={`form-input ${touched && error ? 'error' : ''}`}
        />
      )}
      {touched && error && (
        <p className="form-error"><span>⚠</span> {error}</p>
      )}
    </div>
  )
}

export default function Contact() {
  const [fields, setFields] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const [toast, setToast] = useState({ show: false, type: 'success', msg: '' })
  const toastTimer = useRef(null)

  const showToast = (type, msg) => {
    setToast({ show: true, type, msg })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 4500)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(f => ({ ...f, [name]: value }))
    if (touched[name]) {
      const errs = validate({ ...fields, [name]: value })
      setErrors(prev => ({ ...prev, [name]: errs[name] }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(t => ({ ...t, [name]: true }))
    const errs = validate(fields)
    setErrors(prev => ({ ...prev, [name]: errs[name] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, subject: true, message: true })
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('sending')
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      const data = await res.json()

      if (data.success) {
        trackFormSubmit()
        setStatus('success')
        setFields(INITIAL)
        setTouched({})
        setErrors({})
        showToast('success', "Message sent! I'll get back to you within 24 hours.")
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        if (data.errors) setErrors(data.errors)
        setStatus('idle')
        showToast('error', data.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setStatus('idle')
      showToast('error', 'Network error. Please check your connection and try again.')
    }
  }

  return (
    <>
      <section id="contact" className="py-16 md:py-24 relative overflow-hidden bg-[--background]">
        <motion.div
          className="absolute -left-20 top-10 w-72 h-72 rounded-full border border-[rgba(201,168,76,0.3)] pointer-events-none"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-10 bottom-10 w-40 h-24 diagonal-lines opacity-50 pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[0.68rem] tracking-[0.4em] text-[--gold] mb-6 uppercase">LET'S COLLABORATE</p>
            <h2 className="font-display text-[clamp(3rem,8vw,5rem)] mb-6">
              Have a project<br />in mind<span style={{ color: 'var(--gold)' }}>?</span>
            </h2>
            <p className="text-[--muted-foreground] max-w-xl mx-auto">
              Open to full-time roles and freelance projects. I build fast, scalable web apps — let's talk about what you're working on.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
            <motion.div
              className="reveal-left"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-8">
                <div>
                  <p className="text-[0.68rem] tracking-[0.3em] text-[--muted-foreground] mb-3 uppercase">Email</p>
                  <a href="mailto:zhanxstudio@gmail.com"
                    className="text-[--gold] text-lg border-b border-[--gold] pb-1 inline-block transition-all duration-300 hover:tracking-wide">
                    zhanxstudio@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 mt-4 p-4 border border-[--border] rounded-xl bg-[--background]">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse inline-block" />
                  <span className="text-sm text-[--muted-foreground]">Available for new projects</span>
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              className="reveal-right"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field
                      name="name" label="Your Name"
                      value={fields.name} onChange={handleChange} onBlur={handleBlur}
                      touched={touched.name} error={errors.name}
                    />
                    <Field
                      name="email" label="Email Address" type="email"
                      value={fields.email} onChange={handleChange} onBlur={handleBlur}
                      touched={touched.email} error={errors.email}
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="service">Service Needed</label>
                    <select
                      id="service" name="service"
                      value={fields.service} onChange={handleChange} onBlur={handleBlur}
                      className={`form-input ${touched.service && errors.service ? 'error' : ''}`}
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map(s => (
                        <option key={s} value={s} className="bg-[--card]">{s}</option>
                      ))}
                    </select>
                    {touched.service && errors.service && (
                      <p className="form-error"><span>⚠</span> {errors.service}</p>
                    )}
                  </div>
                  <Field
                    name="subject" label="Subject"
                    value={fields.subject} onChange={handleChange} onBlur={handleBlur}
                    touched={touched.subject} error={errors.subject}
                  />
                  <Field
                    name="message" label="Message" rows={5}
                    value={fields.message} onChange={handleChange} onBlur={handleBlur}
                    touched={touched.message} error={errors.message}
                  />

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={`submit-btn ${status === 'success' ? 'success' : ''}`}
                  >
                    {status === 'sending' && (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                        </svg>
                        SENDING...
                      </span>
                    )}
                    {status === 'success' && '✓ MESSAGE SENT!'}
                    {status === 'idle' && 'SEND MESSAGE →'}
                  </button>

                  <p className="text-[0.72rem] text-center text-[--muted-foreground]">
                    I'll get back to you within 24 hours.
                  </p>
                </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Toast */}
      <div className={`toast ${toast.show ? 'show' : ''}`}
        style={{ borderColor: toast.type === 'error' ? '#ef4444' : 'rgba(201,168,76,0.4)' }}>
        <div className="flex items-center gap-3">
          <span style={{ color: toast.type === 'error' ? '#ef4444' : 'var(--gold)' }} className="text-xl">
            {toast.type === 'success' ? '✓' : '⚠'}
          </span>
          <p className="text-sm">{toast.msg}</p>
        </div>
      </div>
    </>
  )
}
