'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const contactInfo = [
  { icon: Mail, title: 'Email Us', details: 'hello@nironcare.com', sub: 'partnerships@nironcare.com', href: 'mailto:hello@nironcare.com' },
  { icon: Phone, title: 'Call Us', details: '+65 6908 1234', sub: 'Mon-Fri, 9am-6pm SGT', href: 'tel:+6569081234' },
  { icon: MapPin, title: 'Visit Us', details: '80 Robinson Road', sub: '#14-02, Singapore 068898', href: '#' },
];

const offices = [
  { city: 'Singapore', address: '80 Robinson Road, #14-02, Singapore 068898' },
  { city: 'Kuala Lumpur', address: 'Level 21, The Gardens South Tower, Mid Valley City, 59200' },
  { city: 'Bangkok', address: '999 Ploenchit Road, Lumpini, Pathumwan, Bangkok 10330' },
  { city: 'Ho Chi Minh City', address: '15F, Saigon Tower, 29 Le Duan, District 1, HCMC' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-slate-50 dark:bg-[#070c14]">
        <section className="relative py-24 px-4 sm:px-8 lg:px-12 text-center bg-gradient-to-br from-blue-600/5 via-transparent to-transparent">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Have questions about NironCare? We're here to help. Reach out to our team and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </section>

        <section className="py-12 px-4 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {contactInfo.map((info, idx) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group p-6 bg-white dark:bg-[#0b1220] rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                    <info.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{info.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">{info.details}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">{info.sub}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-8 lg:px-12 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#0b1220] rounded-2xl p-8 border border-slate-200 dark:border-slate-800"
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      placeholder="hello@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                      placeholder="Tell us how we can help..."
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold">
                    {submitted ? (
                      <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Sent!</span>
                    ) : (
                      <span className="flex items-center gap-2"><Send className="w-5 h-5" /> Send Message</span>
                    )}
                  </Button>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Our Offices</h2>
                {offices.map((office) => (
                  <div key={office.city} className="p-5 bg-white dark:bg-[#0b1220] rounded-xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{office.city}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{office.address}</p>
                  </div>
                ))}
                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-100 dark:border-blue-900/30">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong className="text-blue-600">Response Time:</strong> Our team typically responds within 2 business hours during office hours (Mon-Fri, 9am-6pm SGT).
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}