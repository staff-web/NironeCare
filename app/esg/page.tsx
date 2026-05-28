'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Leaf, Users, Scale, Award, CheckCircle2,
  TreePine, Zap, FileText, ShieldCheck, Brain, Globe2,
  HeartHandshake, BookOpen, BadgeDollarSign, Wind
} from 'lucide-react';
import { useCallback } from 'react';
import { CTA } from '@/components/cta'; // Import the CTA component

/* ─── animation presets ─── */
const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease },
  }),
};

/* ─── helpers ─── */
function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px]
      tracking-widest font-bold uppercase mb-5
      ${light
        ? 'bg-white/15 border border-white/30 text-white'
        : 'bg-blue-500/10 border border-blue-400/20 text-blue-500 dark:text-blue-300'
      }`}>
      {children}
    </span>
  );
}

function TiltCard({ children, className = '', depth = 14 }: {
  children: React.ReactNode; className?: string; depth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * depth}deg) rotateX(${-y * depth}deg) scale3d(1.02,1.02,1.02)`;
  }, [depth]);
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className={className} style={{ transition: 'transform 0.25s ease', willChange: 'transform' }}>
      {children}
    </div>
  );
}

function ParallaxImage({ src, alt, className = '', speed = 0.25 }: {
  src: string; alt: string; className?: string; speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] relative -top-[10%]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  );
}

/* ─── data ─── */
const environmental = [
  {
    title: 'Low-Carbon Telemedicine',
    description: 'Every virtual consultation eliminates approximately 0.5 kg of CO₂ from avoided patient travel.',
    metric: '2,500+ tons CO₂ saved',
    icon: Wind,
    img: 'https://images.unsplash.com/photo-1532094349884-543559c36671?w=600&q=80',
    color: 'text-emerald-500',
    badge: 'bg-emerald-500/10 border-emerald-400/20 text-emerald-600 dark:text-emerald-400',
  },
  {
    title: 'Paperless Operations',
    description: 'Digital health records eliminate 95 % of paper waste across our partner network.',
    metric: '50 M+ pages saved',
    icon: TreePine,
    img: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&q=80',
    color: 'text-green-500',
    badge: 'bg-green-500/10 border-green-400/20 text-green-600 dark:text-green-400',
  },
  {
    title: 'Renewable Infrastructure',
    description: '100 % renewable energy powers all NironCare cloud infrastructure globally.',
    metric: '99.9 % clean energy',
    icon: Zap,
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
    color: 'text-teal-500',
    badge: 'bg-teal-500/10 border-teal-400/20 text-teal-600 dark:text-teal-400',
  },
];

const social = [
  {
    title: 'Rural Healthcare Access',
    description: 'Bringing quality care to remote communities across Southeast Asia through our telemedicine network.',
    metric: '500 K+ patients reached',
    icon: Globe2,
    color: 'text-blue-500',
  },
  {
    title: 'Women in Healthcare',
    description: 'Training and upskilling female healthcare professionals with digital tools and continuing education.',
    metric: '6,000+ women trained',
    icon: HeartHandshake,
    color: 'text-pink-500',
  },
  {
    title: 'Affordable Care Programme',
    description: 'Subsidised consultations ensure underserved populations can access specialist care.',
    metric: '80 % cost reduction',
    icon: BadgeDollarSign,
    color: 'text-cyan-500',
  },
  {
    title: 'Health Literacy Initiative',
    description: 'Educational content and community programmes to improve prevention awareness across ASEAN.',
    metric: '50 K+ educated',
    icon: BookOpen,
    color: 'text-indigo-500',
  },
];

const governance = [
  {
    title: 'Data Privacy & Security',
    description: 'HIPAA-compliant systems protecting patient data with military-grade encryption and zero-knowledge architecture.',
    standard: 'ISO 27001 Certified',
    icon: ShieldCheck,
  },
  {
    title: 'Ethical AI Practices',
    description: 'Transparent algorithms with independent audits and human oversight to eliminate bias in clinical decisions.',
    standard: 'Certified AI Ethics',
    icon: Brain,
  },
  {
    title: 'Transparent Reporting',
    description: 'Annual ESG reports with independently verified metrics, published publicly for full stakeholder accountability.',
    standard: 'Annual ESG Report',
    icon: FileText,
  },
  {
    title: 'Regulatory Compliance',
    description: 'Full compliance with healthcare regulations across every country we operate in — and beyond.',
    standard: 'Multi-Country Certified',
    icon: Award,
  },
];

/* ══════════════════════ PAGE ══════════════════════ */
export default function ESG() {
  const glass = 'backdrop-blur-xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/30';

  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-slate-50 dark:bg-[#070c14] text-slate-900 dark:text-slate-100">

        {/* ══ HERO ══ */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=85"
            alt="Lush green environment"
            className="absolute inset-0 z-0"
            speed={0.3}
          />
          <div className="absolute inset-0 bg-slate-900/78 dark:bg-[#070c14]/88 z-10" />
          <div className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 55% 60% at 40% 50%, rgba(16,185,129,0.14) 0%, transparent 70%)' }} />

          <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 pb-20">
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <SectionLabel light><Leaf className="w-3 h-3" /> ESG &amp; Impact</SectionLabel>
            </motion.div>
            <motion.h1
              variants={fadeUp} custom={1} initial="hidden" animate="visible"
              className="text-5xl sm:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] tracking-tight max-w-3xl"
            >
              Building a Sustainable
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Healthcare Future
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp} custom={2} initial="hidden" animate="visible"
              className="mt-6 text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed"
            >
              Creating measurable environmental, social, and governance impact through
              responsible healthcare innovation across Southeast Asia.
            </motion.p>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
            <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
          </motion.div>
        </section>

        {/* ══ ENVIRONMENTAL ══ */}
        <section className="py-28 px-4 sm:px-8 lg:px-12 bg-slate-50 dark:bg-[#070c14]">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mb-16">
              <SectionLabel><Leaf className="w-3 h-3" /> Planet</SectionLabel>
              <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-1 mb-3">Environmental</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
                Creating a sustainable healthcare ecosystem through technology and responsible practices.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {environmental.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} variants={fadeUp} custom={i}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <TiltCard depth={10} className="h-full">
                      <div className={`${glass} rounded-2xl overflow-hidden h-full flex flex-col group cursor-default`}>
                        <div className="relative h-44 flex-shrink-0">
                          <Image src={item.img} alt={item.title} fill className="object-cover
                            group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-3 left-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                              border text-[11px] font-bold uppercase tracking-wider ${item.badge}`}>
                              {item.metric}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <div className={`w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/8
                            flex items-center justify-center mb-4 ${item.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">{item.title}</h3>
                          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ SOCIAL — full-width image break ══ */}
        <section className="relative py-28 overflow-hidden">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1800&q=80"
            alt="Community healthcare"
            className="absolute inset-0 z-0"
            speed={0.2}
          />
          <div className="absolute inset-0 bg-blue-900/82 dark:bg-[#070c14]/90 z-10" />
          <div className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(59,130,246,0.2) 0%, transparent 70%)' }} />

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mb-16">
              <SectionLabel light><Users className="w-3 h-3" /> People</SectionLabel>
              <h2 className="text-4xl font-extrabold text-white mt-1 mb-3">Social</h2>
              <p className="text-blue-200 max-w-lg leading-relaxed">
                Empowering communities with access to quality, affordable healthcare.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {social.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} variants={scaleIn} custom={i}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="p-7 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20
                      shadow-xl shadow-black/20 flex gap-5 cursor-default group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0
                      group-hover:bg-white/20 transition-colors">
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-base mb-1">{item.title}</h3>
                      <p className="text-blue-200 text-sm leading-relaxed mb-3">{item.description}</p>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                        bg-white/15 border border-white/25 text-white text-[11px] font-bold uppercase tracking-wider">
                        {item.metric}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ GOVERNANCE ══ */}
        <section className="py-28 px-4 sm:px-8 lg:px-12 bg-white dark:bg-[#0b1220]">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mb-16">
              <SectionLabel><Scale className="w-3 h-3" /> Accountability</SectionLabel>
              <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-1 mb-3">Governance</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
                Maintaining the highest standards of ethics, transparency, and accountability.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {governance.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} variants={fadeUp} custom={i}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <TiltCard depth={8} className="h-full">
                      <div className={`${glass} rounded-2xl p-7 h-full flex flex-col
                        hover:border-blue-400/30 transition-colors duration-300 cursor-default`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-blue-500" />
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/8
                            border border-slate-200 dark:border-white/10
                            text-[10px] font-bold uppercase tracking-wider
                            text-slate-500 dark:text-slate-400">
                            {item.standard}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">{item.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex-1">
                          {item.description}
                        </p>
                        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/10">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-500" />
                            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                              Verified &amp; Audited
                            </span>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <CTA />

      </main>
      <Footer />
    </>
  );
}