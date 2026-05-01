import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiSend, FiUser, FiMail, FiMessageSquare, FiCheckCircle, FiAlertCircle, FiDollarSign, FiBriefcase, FiPhone } from 'react-icons/fi'
import { FaXTwitter, FaInstagram, FaGithub } from 'react-icons/fa6'
import Astra from '../assets/Astra.png'

/* ─── Web3Forms Credentials ───────────────────────────────────────────────── */
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

/* ─── Service options ────────────────────────────────────────────────────── */
const SERVICE_OPTIONS = [
  'Frontend Development',
  'Full-Stack Web App',
  'Landing Page / Portfolio',
  'UI / UX Design',
  'React Development',
  'Performance Optimization',
  'Consultation',
  'Other',
]

/* ─── Budget options ─────────────────────────────────────────────────────── */
const BUDGET_OPTIONS = [
  'Under ₹5,000',
  '₹5,000 – ₹15,000',
  '₹15,000 – ₹40,000',
  '₹40,000 – ₹1,00,000',
  '₹1,00,000+',
  'Let\'s discuss',
]

/* ─── Animation helpers ──────────────────────────────────────────────────── */
const fadeUp = d => ({ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: d, ease: 'easeOut' } } })
const fadeLeft = d => ({ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: d, ease: 'easeOut' } } })
const fadeRight = d => ({ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: d, ease: 'easeOut' } } })

/* ─── Socials ────────────────────────────────────────────────────────────── */
const socials = [
  { Icon: FaXTwitter, label: 'X / Twitter', href: 'https://x.com/TiwariKavy57507' },
  { Icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/kavyansh_tiwari01/' },
  { Icon: FaGithub, label: 'GitHub', href: 'https://github.com/kavyansh-devx/' },
]

/* ─── Floating particles (stable – computed once) ────────────────────────── */
const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i, size: (i * 7 % 3) + 1,
  x: (i * 17 + 5) % 100, y: (i * 13 + 10) % 100,
  dur: (i % 6) + 4, delay: (i % 3),
}))

/* ─── Glow orbs ──────────────────────────────────────────────────────────── */
const glows = [
  '-top-20 -left-20 w-80 h-80 opacity-25 blur-[120px]',
  'bottom-0 right-0 w-96 h-96 opacity-20 blur-[130px]',
  'top-1/2 left-1/2 w-56 h-56 opacity-10 blur-[100px] -translate-x-1/2 -translate-y-1/2',
]

/* ─── Validation ─────────────────────────────────────────────────────────── */
const validate = ({ name, email, phone, service, otherService, budget, message }) => {
  const e = {}
  if (!name.trim() || name.trim().length < 2) e.name = 'Name must be at least 2 characters.'
  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address.'
  if (phone && phone.trim().length > 0 && phone.trim().length < 7) e.phone = 'Enter a valid phone number.'
  if (!service) e.service = 'Please select a service.'
  if (service === 'Other' && !otherService.trim()) e.otherService = 'Please describe what you need.'
  if (!budget) e.budget = 'Please select a budget range.'
  if (!message.trim() || message.trim().length < 10) e.message = 'Message must be at least 10 characters.'
  return e
}

/* ─── FormField wrapper ──────────────────────────────────────────────────── */
const Field = ({ id, label, Icon, error, children }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-sm font-medium text-gray-300 flex items-center gap-2">
      <Icon size={13} className="text-[#1cd8d2]" />{label}
    </label>
    <div className={`relative rounded-xl overflow-hidden bg-white/5 border transition-all duration-300
      ${error ? 'border-red-400/70 shadow-[0_0_12px_rgba(239,68,68,0.25)]'
        : 'border-white/10 focus-within:border-[#1cd8d2]/60 focus-within:shadow-[0_0_18px_rgba(28,216,210,0.15)]'}`}>
      {children}
    </div>
    <AnimatePresence>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="text-xs text-red-400 flex items-center gap-1 mt-0.5">
          <FiAlertCircle size={11} /> {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
)

const inputCls = "w-full bg-transparent px-4 py-3 text-white placeholder-gray-600 text-sm outline-none"
const selectCls = "w-full bg-[#0d0d0d] px-4 py-3 text-white text-sm outline-none appearance-none cursor-pointer"

/* ═══════════════════════════════════════════════════════════════════════════ */
const Contact = () => {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.12 })

  const blank = { name: '', email: '', phone: '', service: '', otherService: '', budget: '', message: '' }
  const [form, setForm] = useState(blank)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')   // idle | sending | success | error
  const [touched, setTouched] = useState({})

  const handleChange = e => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (touched[name]) {
      const errs = validate({ ...form, [name]: value })
      setErrors(p => ({ ...p, [name]: errs[name] }))
    }
  }

  const handleBlur = e => {
    const { name } = e.target
    setTouched(p => ({ ...p, [name]: true }))
    setErrors(p => ({ ...p, [name]: validate(form)[name] }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true, service: true, otherService: true, budget: true, message: true })
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) return

    setStatus('sending')
    try {
      const serviceLabel = form.service === 'Other' ? `Other – ${form.otherService}` : form.service
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          service: serviceLabel,
          budget: form.budget,
          message: form.message,
          subject: 'New Submission from Portfolio Contact Form'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus('success')
        setForm(blank)
        setTouched({})
      } else {
        console.error('Web3Forms error:', result)
        setStatus('error')
      }
    } catch (err) {
      console.error('Submission error:', err)
      setStatus('error')
    }
  }

  return (
    <section ref={sectionRef} id="contact"
      className="relative min-h-screen w-full bg-black text-white overflow-hidden flex items-center justify-center py-24">

      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((cls, i) => (
          <div key={i} className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${cls}`} />
        ))}
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map(p => (
          <motion.div key={p.id} className="absolute rounded-full bg-[#1cd8d2]"
            style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, opacity: 0.35 }}
            animate={{ y: [-12, 12, -12], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }} />
        ))}
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(28,216,210,1) 1px,transparent 1px),linear-gradient(90deg,rgba(28,216,210,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-14">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[#1cd8d2] mb-3">Let's Connect</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]">Get In Touch</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            Have a project in mind or just want to say hi? Drop me a message — I reply within 24 hours.
          </p>
          <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 mx-auto h-0.5 w-24 rounded-full bg-gradient-to-r from-[#1cd8d2] to-[#302b63] origin-left" />
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT ── */}
          <motion.div variants={fadeLeft(0.2)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col items-center lg:items-start gap-8">

            {/* Astra card */}
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              <motion.div animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.03, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-[#1cd8d2]/30 via-[#00bf8f]/20 to-[#302b63]/30 blur-xl" />
              <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                className="relative rounded-3xl overflow-hidden border border-[#1cd8d2]/20 shadow-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                <img src={Astra} alt="Astra – AI Companion" className="w-full h-auto object-cover" style={{ maxHeight: '400px', objectPosition: 'top' }} />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-white font-semibold text-sm bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">✦ Astra — AI Companion</span>
                  <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2.5 h-2.5 rounded-full bg-[#1cd8d2] shadow-[0_0_8px_#1cd8d2]" />
                </div>
              </motion.div>
            </div>

            {/* Info cards */}
            <div className="w-full max-w-sm mx-auto lg:mx-0 space-y-3">
              {[
                { label: 'Email', value: 'tiwarikavyansh01@gmail.com', emoji: '📬' },
                { label: 'Location', value: 'India 🇮🇳', emoji: '📍' },
                { label: 'Status', value: 'Open to freelance', emoji: '🟢' },
              ].map((item, i) => (
                <motion.div key={item.label} variants={fadeUp(0.3 + i * 0.1)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm hover:border-[#1cd8d2]/40 transition-all duration-300">
                  <span className="text-xl">{item.emoji}</span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm text-white font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Socials */}
            <motion.div variants={fadeUp(0.6)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="flex gap-4">
              {socials.map(({ Icon, label, href }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  whileHover={{ scale: 1.2, y: -3, filter: 'drop-shadow(0 0 8px rgba(28,216,210,0.8))' }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#1cd8d2]/50 transition-colors duration-300">
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Form ── */}
          <motion.div variants={fadeRight(0.3)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

            {/* Success */}
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                  className="flex flex-col items-center justify-center text-center gap-5 py-20 px-8 rounded-3xl border border-[#1cd8d2]/30 bg-white/5 backdrop-blur-sm">
                  <motion.div
                    animate={{ scale: [1, 1.12, 1], filter: ['drop-shadow(0 0 0px #1cd8d2)', 'drop-shadow(0 0 20px #1cd8d2)', 'drop-shadow(0 0 0px #1cd8d2)'] }}
                    transition={{ duration: 2, repeat: Infinity }}>
                    <FiCheckCircle size={64} className="text-[#1cd8d2]" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">Message Sent! 🎉</h3>
                  <p className="text-gray-400">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => setStatus('idle')}
                    className="mt-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] text-black font-semibold text-sm hover:shadow-[0_0_20px_rgba(28,216,210,0.5)] transition-all">
                    Send Another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-2xl">
                  <div className="h-1 w-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]" />

                  <form onSubmit={handleSubmit} noValidate className="p-7 sm:p-9 flex flex-col gap-5">
                    <div>
                      <h3 className="text-xl font-bold text-white">Send a Message</h3>
                      <p className="text-gray-500 text-sm mt-1">All fields are required.</p>
                    </div>

                    {/* Name */}
                    <motion.div variants={fadeUp(0.4)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                      <Field id="name" label="Full Name" Icon={FiUser} error={errors.name}>
                        <input id="name" name="name" type="text" autoComplete="name" placeholder="John Doe"
                          value={form.name} onChange={handleChange} onBlur={handleBlur} className={inputCls} />
                      </Field>
                    </motion.div>

                    {/* Email */}
                    <motion.div variants={fadeUp(0.44)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                      <Field id="email" label="Email Address" Icon={FiMail} error={errors.email}>
                        <input id="email" name="email" type="email" autoComplete="email" placeholder="john@example.com"
                          value={form.email} onChange={handleChange} onBlur={handleBlur} className={inputCls} />
                      </Field>
                    </motion.div>

                    {/* Phone */}
                    <motion.div variants={fadeUp(0.48)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                      <Field id="phone" label="Phone Number (Optional)" Icon={FiPhone} error={errors.phone}>
                        <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 (234) 567-890"
                          value={form.phone} onChange={handleChange} onBlur={handleBlur} className={inputCls} />
                      </Field>
                    </motion.div>

                    {/* Service Needed */}
                    <motion.div variants={fadeUp(0.52)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                      <Field id="service" label="Service Needed" Icon={FiBriefcase} error={errors.service}>
                        <select id="service" name="service" value={form.service} onChange={handleChange} onBlur={handleBlur} className={selectCls}>
                          <option value="" disabled>— Select a service —</option>
                          {SERVICE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                        {/* custom chevron */}
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1cd8d2]">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                            <path d="M1 1L6 7L11 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                        </div>
                      </Field>

                      {/* "Other" textarea – animated reveal */}
                      <AnimatePresence>
                        {form.service === 'Other' && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }} className="mt-3 overflow-hidden">
                            <Field id="otherService" label="Describe Your Requirement" Icon={FiMessageSquare} error={errors.otherService}>
                              <textarea id="otherService" name="otherService" rows={3} placeholder="Tell me exactly what you need…"
                                value={form.otherService} onChange={handleChange} onBlur={handleBlur}
                                className={`${inputCls} resize-none`} />
                            </Field>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Budget */}
                    <motion.div variants={fadeUp(0.56)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                      <Field id="budget" label="Estimated Budget" Icon={FiDollarSign} error={errors.budget}>
                        <select id="budget" name="budget" value={form.budget} onChange={handleChange} onBlur={handleBlur} className={selectCls}>
                          <option value="" disabled>— Select a budget range —</option>
                          {BUDGET_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1cd8d2]">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                            <path d="M1 1L6 7L11 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                        </div>
                      </Field>
                    </motion.div>

                    {/* Message */}
                    <motion.div variants={fadeUp(0.60)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                      <Field id="message" label="Message" Icon={FiMessageSquare} error={errors.message}>
                        <textarea id="message" name="message" rows={4} placeholder="Tell me about your project or idea…"
                          value={form.message} onChange={handleChange} onBlur={handleBlur}
                          className={`${inputCls} resize-none`} />
                      </Field>
                    </motion.div>

                    {/* Error banner */}
                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3">
                          <FiAlertCircle size={16} />
                          Something went wrong. Please try again or email me directly.
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.div variants={fadeUp(0.64)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                      <motion.button type="submit" disabled={status === 'sending'}
                        whileHover={status !== 'sending' ? { scale: 1.02, boxShadow: '0 0 28px rgba(28,216,210,0.45)' } : {}}
                        whileTap={status !== 'sending' ? { scale: 0.97 } : {}}
                        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-base text-black bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg">
                        {status === 'sending' ? (
                          <>
                            <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full" />
                            Sending…
                          </>
                        ) : (
                          <><FiSend size={17} /> Send Message</>
                        )}
                      </motion.button>
                    </motion.div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
