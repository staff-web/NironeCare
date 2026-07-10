'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Mail, Phone, MapPin, Globe, Send, CheckCircle } from 'lucide-react';

const contactDetails = [
  { Icon: Mail,   label: 'Email',   value: 'support@nironcare.com',                               href: 'mailto:support@nironcare.com' },
  { Icon: Phone,  label: 'Phone',   value: '+855 87 995 911',                                     href: 'tel:+85587995911' },
  { Icon: Globe,  label: 'Web',     value: 'nironcare.com',                                       href: 'https://nironcare.com' },
  { Icon: MapPin, label: 'Office',  value: '#10 St. 03, Sangkat Tek La-Ak III, Toul Kork, Phnom Penh', href: '#' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3200);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const inputCls = (key: string) =>
    [
      'w-full bg-transparent text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600',
      'border-b py-3 outline-none transition-all duration-300',
      active === key
        ? 'border-[#0046C0] dark:border-blue-400'
        : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600',
    ].join(' ');

  return (
    <>
      <Navbar />

      <main className="bg-white dark:bg-[#07090f] min-h-screen">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0046C0] dark:text-blue-400 mb-5">
              Get in touch
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-none tracking-tight">
              Let's talk.
            </h1>
          </motion.div>
        </section>

        {/* ── MAIN GRID ─────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)]">

            {/* LEFT — info panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0046C0] p-10 sm:p-14 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Contact information</h2>
                <p className="text-sm text-blue-200 leading-relaxed max-w-xs">
                  Reach out and our team will respond within 2 business hours.
                </p>

                <ul className="mt-10 space-y-7">
                  {contactDetails.map(({ Icon, label, value, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                          <Icon className="w-4 h-4 text-white" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-300 mb-0.5">{label}</p>
                          <p className="text-sm font-medium text-white group-hover:text-blue-200 transition-colors leading-snug">{value}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Response indicator */}
              <div className="mt-14 flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                </span>
                <p className="text-xs text-blue-200">Response time under 2 hours · Mon–Fri, 8am–5pm ICT</p>
              </div>
            </motion.div>

            {/* RIGHT — form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white dark:bg-[#0d1117] p-10 sm:p-14"
            >
              <form onSubmit={submit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-1">Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setActive('name')}
                      onBlur={() => setActive(null)}
                      className={inputCls('name')}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-1">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setActive('email')}
                      onBlur={() => setActive(null)}
                      className={inputCls('email')}
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-1">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    onFocus={() => setActive('subject')}
                    onBlur={() => setActive(null)}
                    className={inputCls('subject')}
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-1">Message</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setActive('message')}
                    onBlur={() => setActive(null)}
                    rows={5}
                    className={inputCls('message') + ' resize-none'}
                    placeholder="Tell us about your inquiry…"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="
                    flex items-center gap-2.5 px-8 py-3.5 rounded-xl
                    bg-[#0046C0] hover:bg-[#0039a6]
                    text-white text-sm font-semibold
                    shadow-[0_4px_20px_rgba(0,70,192,0.28)]
                    hover:shadow-[0_8px_28px_rgba(0,70,192,0.38)]
                    transition-all duration-200
                  "
                >
                  {sent ? (
                    <><CheckCircle className="w-4 h-4" /> Message sent</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send message</>
                  )}
                </motion.button>
              </form>
            </motion.div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}