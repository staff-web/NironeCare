'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useCallback } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, CheckCircle2, Building2, Users, Globe,
  GraduationCap, Landmark, ChevronRight, Handshake,
  Mail, Shield, TrendingUp, Zap, HeartPulse, BarChart3
} from 'lucide-react';
import { CTA } from '@/components/cta'; // Import the CTA component

/* ─── animation presets ─── */
const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
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

function TiltCard({ children, className = '', depth = 12 }: {
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
const partnerTypes = [
  {
    icon: HeartPulse,
    title: 'Healthcare Providers',
    description: 'Hospitals, clinics, and medical centres looking to digitise operations and expand patient reach.',
    benefits: ['Digital queue system', 'Telemedicine platform', 'Patient analytics dashboard', 'Full integration support'],
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=80',
    accent: 'from-blue-500 to-cyan-500',
    tag: 'Most Popular',
  },
  {
    icon: Zap,
    title: 'Strategic Partners',
    description: 'Technology, insurance, and pharmaceutical partners who want to embed NironCare capabilities.',
    benefits: ['API & webhook integration', 'Revenue sharing model', 'Co-branded solutions', 'Dedicated partner success'],
    img: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=700&q=80',
    accent: 'from-indigo-500 to-blue-500',
    tag: null,
  },
  {
    icon: GraduationCap,
    title: 'Educational Institutions',
    description: 'Medical schools and health training centres that want to embed real-world digital health tools.',
    benefits: ['Training programme access', 'Research collaboration', 'Student licences', 'Academic pricing'],
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80',
    accent: 'from-cyan-500 to-blue-500',
    tag: null,
  },
  {
    icon: Landmark,
    title: 'Government Agencies',
    description: 'Public health departments seeking scalable digital infrastructure for national programmes.',
    benefits: ['Bulk deployment support', 'Regulatory compliance', 'Custom feature development', 'Government-tier pricing'],
    img: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=700&q=80',
    accent: 'from-sky-500 to-blue-600',
    tag: null,
  },
];

const benefits = [
  { text: 'Increase patient capacity by 3–5×', icon: TrendingUp },
  { text: 'Reduce operational costs by 40 %', icon: BarChart3 },
  { text: 'Improve patient satisfaction scores', icon: HeartPulse },
  { text: 'Enable remote consultations instantly', icon: Globe },
  { text: 'Gain actionable health analytics', icon: Zap },
  { text: 'Access 24/7 dedicated technical support', icon: Shield },
];

const contacts = [
  {
    icon: Building2,
    title: 'For Institutions',
    desc: 'Digitise your healthcare operations end-to-end.',
    href: 'mailto:partnerships@nironcare.com',
    cta: 'Contact Partnerships',
    img: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=500&q=80',
  },
  {
    icon: Users,
    title: 'For Providers',
    desc: 'Join our network as an independent clinician.',
    href: 'mailto:providers@nironcare.com',
    cta: 'Apply Now',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=80',
  },
  {
    icon: Globe,
    title: 'For Investors',
    desc: 'Invest in the future of ASEAN healthcare.',
    href: 'mailto:investors@nironcare.com',
    cta: 'Investor Relations',
    img: 'https://images.unsplash.com/photo-1484981138541-3d074aa97716?w=500&q=80',
  },
];

/* ══════════════════════ PAGE ══════════════════════ */
export default function Partnership() {
  const glass = 'backdrop-blur-xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/30';

  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-slate-50 dark:bg-[#070c14] text-slate-900 dark:text-slate-100">

        {/* ══ HERO ══ */}
        <section className="relative min-h-[72vh] flex items-center overflow-hidden">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1800&q=85"
            alt="Business partnership meeting"
            className="absolute inset-0 z-0"
            speed={0.3}
          />
          <div className="absolute inset-0 bg-slate-900/80 dark:bg-[#070c14]/90 z-10" />
          <div className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 55% 60% at 35% 50%, rgba(59,130,246,0.16) 0%, transparent 70%)' }} />

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <SectionLabel light><Handshake className="w-3 h-3" /> Partner With Us</SectionLabel>
              </motion.div>
              <motion.h1
                variants={fadeUp} custom={1} initial="hidden" animate="visible"
                className="text-5xl sm:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] tracking-tight"
              >
                Growing
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Together
                </span>
              </motion.h1>
              <motion.p
                variants={fadeUp} custom={2} initial="hidden" animate="visible"
                className="mt-6 text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed"
              >
                Join healthcare providers, technology companies, and institutions already
                transforming healthcare delivery across Southeast Asia.
              </motion.p>
              <motion.div
                variants={fadeUp} custom={3} initial="hidden" animate="visible"
                className="mt-10 flex flex-wrap gap-4"
              >
                <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 rounded-xl font-bold
                  shadow-lg shadow-blue-600/30 group transition-all duration-300">
                  <Link href="mailto:partnerships@nironcare.com" className="flex items-center gap-2">
                    Start a Conversation
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline"
                  className="border-white/30 bg-white/10 hover:bg-white/20 text-white px-8 py-6 rounded-xl backdrop-blur-sm">
                  <Link href="#types">Explore Partnership Types</Link>
                </Button>
              </motion.div>
            </div>

            {/* Hero side stat card */}
            <motion.div variants={scaleIn} custom={2} initial="hidden" animate="visible"
              className="hidden lg:block">
              <TiltCard depth={9}>
                <div className={`${glass} rounded-3xl overflow-hidden`}>
                  <div className="relative h-48">
                    <Image
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80"
                      alt="Partnership growth"
                      fill className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                        <p className="text-white text-sm font-semibold">500+ Partner Clinics</p>
                        <p className="text-green-400 text-xs">+25 % this quarter</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 grid grid-cols-2 gap-4">
                    {[
                      { v: '6 Countries', l: 'Active Markets' },
                      { v: '2 Weeks', l: 'Avg. Onboarding' },
                      { v: '40 %', l: 'Cost Reduction' },
                      { v: '24/7', l: 'Partner Support' },
                    ].map(s => (
                      <div key={s.l} className="text-center">
                        <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400">{s.v}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
            <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
          </motion.div>
        </section>

        {/* ══ PARTNER TYPES ══ */}
        <section id="types" className="py-28 px-4 sm:px-8 lg:px-12 bg-slate-50 dark:bg-[#070c14]">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center mb-16">
              <SectionLabel><Handshake className="w-3 h-3" /> Opportunities</SectionLabel>
              <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-1 mb-3">
                Partnership Opportunities
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Multiple ways to collaborate with NironCare, each tailored to your organisation.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {partnerTypes.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.title} variants={fadeUp} custom={i}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <TiltCard depth={10} className="h-full">
                      <div className={`${glass} rounded-2xl overflow-hidden h-full flex flex-col group cursor-default
                        hover:border-blue-400/30 transition-colors duration-300`}>
                        {/* Image header */}
                        <div className="relative h-48 flex-shrink-0">
                          <Image src={p.img} alt={p.title} fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.accent}
                              flex items-center justify-center shadow-lg`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          {p.tag && (
                            <div className="absolute top-4 right-4">
                              <span className="px-2.5 py-1 rounded-full bg-blue-500 text-white
                                text-[10px] font-bold uppercase tracking-wider shadow-lg">
                                {p.tag}
                              </span>
                            </div>
                          )}
                          <div className="absolute bottom-4 left-4">
                            <h3 className="font-extrabold text-white text-xl">{p.title}</h3>
                          </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 flex flex-col flex-1">
                          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">
                            {p.description}
                          </p>
                          <ul className="space-y-2.5 flex-1">
                            {p.benefits.map(b => (
                              <li key={b} className="flex items-center gap-2.5 text-sm
                                text-slate-700 dark:text-slate-300">
                                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                {b}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-white/10">
                            <Button asChild variant="outline" className="w-full rounded-xl font-semibold
                              border-slate-200 dark:border-white/15 hover:border-blue-400/50
                              hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all">
                              <Link href="mailto:partnerships@nironcare.com" className="flex items-center justify-center gap-2">
                                <Mail className="w-4 h-4" /> Get in Touch
                              </Link>
                            </Button>
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

        {/* ══ BENEFITS — dark parallax section ══ */}
        <section className="relative py-28 overflow-hidden">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1800&q=80"
            alt="Healthcare professionals collaborating"
            className="absolute inset-0 z-0"
            speed={0.2}
          />
          <div className="absolute inset-0 bg-blue-950/85 dark:bg-[#070c14]/90 z-10" />
          <div className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(59,130,246,0.18) 0%, transparent 70%)' }} />

          <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center mb-16">
              <SectionLabel light><TrendingUp className="w-3 h-3" /> Why Partner</SectionLabel>
              <h2 className="text-4xl font-extrabold text-white mt-1 mb-3">Partner Benefits</h2>
              <p className="text-blue-200 max-w-md mx-auto">Real, measurable outcomes from day one.</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div key={b.text} variants={scaleIn} custom={i}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="flex items-center gap-4 p-5 rounded-2xl
                      bg-white/10 backdrop-blur-md border border-white/20
                      shadow-lg shadow-black/15 cursor-default group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0
                      group-hover:bg-white/20 transition-colors">
                      <Icon className="w-5 h-5 text-blue-300" />
                    </div>
                    <p className="text-white font-semibold text-sm leading-snug">{b.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ CONTACT TYPES ══ */}
        <section className="py-28 px-4 sm:px-8 lg:px-12 bg-white dark:bg-[#0b1220]">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center mb-16">
              <SectionLabel><Mail className="w-3 h-3" /> Contact</SectionLabel>
              <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-1 mb-3">Ready to Partner?</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Let's schedule a conversation to discuss how we can work together.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-6">
              {contacts.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div key={c.title} variants={fadeUp} custom={i}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <TiltCard depth={10} className="h-full">
                      <div className="backdrop-blur-xl bg-white/60 dark:bg-white/5
                        border border-white/40 dark:border-white/10
                        shadow-xl shadow-black/5 dark:shadow-black/30
                        rounded-2xl overflow-hidden h-full flex flex-col group cursor-default
                        hover:border-blue-400/30 transition-colors duration-300">
                        <div className="relative h-36 flex-shrink-0">
                          <Image src={c.img} alt={c.title} fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-3 left-4">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-1">{c.title}</h3>
                          <p className="text-slate-500 dark:text-slate-400 text-sm flex-1 mb-5">{c.desc}</p>
                          <Button asChild
                            className="w-full rounded-xl font-semibold bg-blue-600 hover:bg-blue-500
                              text-white shadow-md shadow-blue-500/20 group/btn">
                            <Link href={c.href} className="flex items-center justify-center gap-2">
                              {c.cta}
                              <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
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