'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight, Users, Zap, Globe, Award, ChevronRight, Calendar,
  Stethoscope, Heart, Shield, Clock, Star, Activity, Target,
  Eye, Sparkles, Building2, Quote, BadgeCheck, MapPin, Play,
  MessageSquare, FileText, Lock, BarChart3, ThumbsUp, Layers,
  CheckCircle2, BrainCircuit, Video, HeartPulse, Cpu, Rocket,
  TrendingUp, Coffee, Smile, Briefcase, GraduationCap, BookOpen
} from 'lucide-react';
import Image from 'next/image';
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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, delay: i * 0.1, ease },
  }),
};

/* ─── tiny helpers ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
      bg-blue-500/10 border border-blue-400/20 text-blue-500 dark:text-blue-300
      text-[11px] tracking-widest font-bold uppercase mb-5">
      {children}
    </span>
  );
}

function StarRating({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

/* ─── 3-D tilt card ─── */
function TiltCard({
  children,
  className = '',
  depth = 15,
}: {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * depth}deg) rotateX(${-y * depth}deg) scale3d(1.02,1.02,1.02)`;
  }, [depth]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transition: 'transform 0.25s ease', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

/* ─── parallax image wrapper ─── */
function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.3,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
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

/* ─── animated counter ─── */
function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const numericPart = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || isNaN(numericPart)) return;
    let start = 0;
    const end = numericPart;
    const duration = 1600;
    const step = (end / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, numericPart]);

  if (isNaN(numericPart)) return <span ref={ref}>{value}</span>;
  return <span ref={ref}>{display}{suffix}</span>;
}

/* ══════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════ */
export default function About() {
  const heroRef = useRef<HTMLElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '35%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.6], [1, 1.06]);

  /* ─── data ─── */
  const stats = [
    { value: '50K+', label: 'Active Patients', icon: Heart, growth: '+40% YoY', color: 'from-blue-500 to-blue-600' },
    { value: '500+', label: 'Partner Clinics', icon: Stethoscope, growth: '+25% YoY', color: 'from-cyan-500 to-blue-500' },
    { value: '99%', label: 'Satisfaction Rate', icon: Shield, growth: 'Industry best', color: 'from-blue-600 to-indigo-600' },
    { value: '24/7', label: 'AI Support', icon: Calendar, growth: 'Always on', color: 'from-sky-500 to-blue-600' },
  ];

  const journeyStats = [
    { value: '60%', label: 'Wait Time Reduction', icon: Clock },
    { value: '34%', label: 'Revenue Increase', icon: TrendingUp },
    { value: '94%', label: 'Adherence Score', icon: Heart },
    { value: '2wks', label: 'Avg Deployment', icon: Rocket },
  ];

  const values = [
    { title: 'Patient-First', description: 'Every decision starts with patient needs and outcomes.', icon: Users, detail: '24/7 support · Personalised care · Fast response' },
    { title: 'Innovation', description: 'Leveraging AI and modern technology for better healthcare.', icon: Zap, detail: 'AI diagnostics · Smart scheduling · Digital records' },
    { title: 'Accessibility', description: 'Healthcare should reach everyone, everywhere.', icon: Globe, detail: 'Telemedicine · Mobile clinics · Affordable pricing' },
    { title: 'Trust', description: 'Security, compliance, and full transparency.', icon: Award, detail: 'HIPAA compliant · Encrypted · Transparent pricing' },
  ];

  const team = [
    { name: 'Dr. Sarah Chen', role: 'Chief Medical Officer', bio: '15+ years in digital health leadership', expertise: 'Cardiology' },
    { name: 'James Rodriguez', role: 'CEO & Founder', bio: 'Serial entrepreneur, healthcare innovator', expertise: 'Strategy' },
    { name: 'Dr. Priya Patel', role: 'Head of AI Research', bio: 'PhD in Machine Learning & AI ethics', expertise: 'AI & ML' },
    { name: 'Michael Wong', role: 'Chief Technology Officer', bio: 'Former Google engineering lead', expertise: 'Cloud' },
    { name: 'Dr. Amanda Lee', role: 'Clinical Director', bio: 'Harvard-trained physician', expertise: 'Clinical' },
    { name: 'David Kim', role: 'Head of Product', bio: 'Ex-Apple product manager', expertise: 'Product' },
  ];

  const timeline = [
    { year: '2020', title: 'Founded', description: 'NironCare launches with a vision to democratise ASEAN healthcare.', img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=80' },
    { year: '2021', title: '10 000 Patients', description: 'First major milestone: 10 K patients served across 3 countries.', img: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&q=80' },
    { year: '2022', title: 'AI Platform', description: 'Proprietary AI clinical assistant goes live — reducing triage time by 60 %.', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80' },
    { year: '2023', title: 'Regional Expansion', description: 'Expanded to Malaysia, Thailand & Vietnam with 200+ partner clinics.', img: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&q=80' },
    { year: '2024', title: '100 K+ Lives', description: 'Crossed 100 K active patients and 500 partner clinics.', img: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=400&q=80' },
  ];

  const testimonials = [
    { name: 'Dr. Priya Ramalingam', role: 'Medical Director, KPJ Damansara', text: 'NironCare cut our average wait from 45 minutes to under 10. Revenue grew 34 % in the first quarter alone.', rating: 5, img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=80&q=80' },
    { name: 'Dr. Ahmad Fadzil', role: 'Head of Emergency, Gleneagles KL', text: 'The AI triage system flags high-risk patients before they reach the consultation room. It has changed how we operate.', rating: 5, img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&q=80' },
    { name: 'Nur Aisyah', role: 'Chief Nursing Officer, NUH Singapore', text: 'Our nurses spend 40 % less time on admin. Every minute saved goes back to the patient.', rating: 5, img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&q=80' },
    { name: 'Dr. Ravi Mehta', role: 'Pulmonologist, Bumrungrad', text: 'The telemedicine platform is the most seamless I have used. Patients love the convenience; adoption hit 80 % within a month.', rating: 5, img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=80&q=80' },
  ];

  const partners = [
    'Singapore General Hospital', 'Bumrungrad International', 'Gleneagles Hospital',
    'National University Hospital', 'Mount Elizabeth Hospital', 'Tan Tock Seng Hospital',
    'KPJ Healthcare', 'Vinmec Hospitals',
  ];

  /* ─── auto-rotate testimonials ─── */
  useEffect(() => {
    const id = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  /* ─── glassmorphism token ─── */
  const glass = 'backdrop-blur-xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/30';

  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-slate-50 dark:bg-[#070c14] text-slate-900 dark:text-slate-100">

        {/* ══════════ HERO ══════════ */}
        <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">

          {/* Background photo with parallax */}
          <motion.div
            style={{ y: heroY, scale: heroScale }}
            className="absolute inset-0 z-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1800&q=90"
              alt="Modern hospital corridor"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent dark:from-[#070c14]/95 dark:via-[#070c14]/70" />
          </motion.div>

          {/* Floating orbs — subtle, NOT abstract */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Hero content */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <SectionLabel><Heart className="w-3 h-3" /> About NironCare</SectionLabel>
              </motion.div>

              <motion.h1
                variants={fadeUp} custom={1} initial="hidden" animate="visible"
                className="text-5xl sm:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] tracking-tight"
              >
                Transforming
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Healthcare
                </span>
                for ASEAN
              </motion.h1>

              <motion.p
                variants={fadeUp} custom={2} initial="hidden" animate="visible"
                className="mt-6 text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed"
              >
                We build AI-powered healthcare infrastructure that connects patients with
                providers — breaking barriers of geography, language, and resource.
              </motion.p>

              <motion.div
                variants={fadeUp} custom={3} initial="hidden" animate="visible"
                className="mt-10 flex flex-wrap gap-4"
              >
                <Button asChild
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 rounded-xl font-semibold
                    shadow-lg shadow-blue-600/30 group transition-all duration-300">
                  <Link href="/appointment" className="flex items-center gap-2">
                    Book Appointment
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline"
                  className="border-white/30 bg-white/10 hover:bg-white/20 text-white px-8 py-6 rounded-xl
                    backdrop-blur-sm transition-all duration-300">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </motion.div>
            </div>

            {/* Hero side card */}
            <motion.div
              variants={scaleIn} custom={2} initial="hidden" animate="visible"
              className="hidden lg:block"
            >
              <TiltCard depth={10}>
                <div className={`${glass} rounded-3xl overflow-hidden`}>
                  <div className="relative h-72">
                    <Image
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
                      alt="Doctor consulting patient"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                        <div className="w-10 h-10 rounded-full bg-green-400/20 border border-green-400/40 flex items-center justify-center">
                          <Activity className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">Live AI Monitoring</p>
                          <p className="text-green-400 text-xs">All systems operational</p>
                        </div>
                        <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 grid grid-cols-2 gap-4">
                    {stats.slice(0, 2).map(s => {
                      const Icon = s.icon;
                      return (
                        <div key={s.label} className="text-center">
                          <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                            <AnimatedNumber value={s.value} />
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
            <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
          </motion.div>
        </section>

        {/* ══════════ STATS BAR ══════════ */}
        <section className="relative z-10 -mt-16 px-4 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className={`${glass} rounded-2xl p-6 grid grid-cols-2 lg:grid-cols-4 gap-6`}>
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={fadeUp} custom={i} initial="hidden" whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                    className="flex flex-col items-center text-center group cursor-default"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3
                      shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                      <AnimatedNumber value={stat.value} />
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</p>
                    <p className="text-xs text-blue-500 dark:text-blue-400 font-medium mt-1">{stat.growth}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════ MISSION + VISION ══════════ */}
        <section className="py-28 px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-stretch">

            {/* Mission — photo card */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <TiltCard depth={8} className="h-full">
                <div className={`${glass} rounded-3xl overflow-hidden h-full flex flex-col`}>
                  <div className="relative h-64 flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=900&q=80"
                      alt="Doctors collaborating"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
                        Our Mission
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <Target className="w-10 h-10 text-blue-500 mb-4" />
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                      Democratise Healthcare Access
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      To leverage AI and digital innovation across Southeast Asia, ensuring every
                      person — regardless of location or income — can access quality medical care
                      when they need it most.
                    </p>
                    <ul className="mt-6 space-y-2">
                      {['AI-assisted diagnostics', 'Instant specialist referrals', 'Rural & remote coverage'].map(item => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Vision — photo card */}
            <motion.div
              variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <TiltCard depth={8} className="h-full">
                <div className={`${glass} rounded-3xl overflow-hidden h-full flex flex-col`}>
                  <div className="relative h-64 flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=900&q=80"
                      alt="Futuristic hospital technology"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-cyan-600 text-white text-xs font-bold uppercase tracking-wider">
                        Our Vision
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <Eye className="w-10 h-10 text-cyan-500 mb-4" />
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                      A Healthier, Connected ASEAN
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      A future where healthcare is universally accessible, affordable, and deeply
                      personalised — where technology empowers every patient and provider to achieve
                      measurably better outcomes together.
                    </p>
                    <ul className="mt-6 space-y-2">
                      {['Real-time health monitoring', 'Predictive preventive care', 'Cross-border interoperability'].map(item => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </section>

        {/* ══════════ IMPACT NUMBERS ══════════ */}
        <section className="relative py-28 overflow-hidden">
          {/* Parallax background */}
          <ParallaxImage
            src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1800&q=80"
            alt="Hospital team"
            className="absolute inset-0 z-0"
            speed={0.25}
          />
          <div className="absolute inset-0 bg-blue-900/80 dark:bg-[#070c14]/85 z-10" />

          <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center mb-16"
            >
              <SectionLabel><BarChart3 className="w-3 h-3" /> Real-World Impact</SectionLabel>
              <h2 className="text-4xl font-extrabold text-white mt-2">Our Impact by the Numbers</h2>
              <p className="text-blue-200 mt-3">Measured outcomes across our partner network</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {journeyStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={scaleIn} custom={i} initial="hidden" whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -6, scale: 1.04 }}
                    className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20
                      shadow-xl shadow-black/20 cursor-default"
                  >
                    <Icon className="w-8 h-8 text-blue-300 mx-auto mb-3" />
                    <p className="text-4xl font-extrabold text-white">
                      <AnimatedNumber value={stat.value} />
                    </p>
                    <p className="text-blue-200 text-sm mt-1">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════ CORE VALUES ══════════ */}
        <section className="py-28 px-4 sm:px-8 lg:px-12 bg-slate-50 dark:bg-[#070c14]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center mb-16"
            >
              <SectionLabel><Sparkles className="w-3 h-3" /> What Drives Us</SectionLabel>
              <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-2">Our Core Values</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-3">Principles guiding every product decision</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    variants={fadeUp} custom={i} initial="hidden" whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <TiltCard depth={12} className="h-full">
                      <div className={`${glass} rounded-2xl p-7 h-full flex flex-col group cursor-default
                        hover:border-blue-400/30 transition-colors duration-300`}>
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20
                          flex items-center justify-center mb-5 transition-colors duration-300">
                          <Icon className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{v.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1">{v.description}</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-4 pt-4
                          border-t border-slate-200 dark:border-white/10">{v.detail}</p>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════ TIMELINE ══════════ */}
        <section className="py-28 px-4 sm:px-8 lg:px-12 bg-white dark:bg-[#0b1220]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center mb-20"
            >
              <SectionLabel><Calendar className="w-3 h-3" /> Our Journey</SectionLabel>
              <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-2">Milestones That Shaped Us</h2>
            </motion.div>

            <div className="relative">
              {/* Centre line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10" />

              <div className="space-y-16">
                {timeline.map((item, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={item.year}
                      variants={fadeUp} custom={i * 0.5}
                      initial="hidden" whileInView="visible"
                      viewport={{ once: true, margin: '-80px' }}
                      className={`relative flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      {/* Content */}
                      <div className="flex-1">
                        <TiltCard depth={8}>
                          <div className={`${glass} rounded-2xl overflow-hidden
                            ${isLeft ? 'text-right' : 'text-left'}`}>
                            <div className="relative h-40">
                              <Image src={item.img} alt={item.title} fill className="object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                              <div className={`absolute bottom-3 ${isLeft ? 'right-4' : 'left-4'}`}>
                                <span className="text-3xl font-black text-white/90">{item.year}</span>
                              </div>
                            </div>
                            <div className="p-5">
                              <h4 className="font-bold text-slate-800 dark:text-white text-lg">{item.title}</h4>
                              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{item.description}</p>
                            </div>
                          </div>
                        </TiltCard>
                      </div>

                      {/* Dot */}
                      <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full
                        bg-gradient-to-br from-blue-500 to-cyan-500 border-4 border-white dark:border-[#0b1220]
                        shadow-lg shadow-blue-500/40 z-10" />

                      {/* Spacer on other side */}
                      <div className="flex-1" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ LEADERSHIP TEAM ══════════ */}
        <section className="py-28 px-4 sm:px-8 lg:px-12 bg-slate-50 dark:bg-[#070c14]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center mb-16"
            >
              <SectionLabel><Users className="w-3 h-3" /> The People</SectionLabel>
              <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-2">Leadership Team</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-3">Experienced leaders from medicine, tech, and strategy</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  variants={fadeUp} custom={i * 0.5}
                  initial="hidden" whileInView="visible"
                  viewport={{ once: true }}
                >
                  <TiltCard depth={10} className="h-full">
                    <div className={`${glass} rounded-2xl p-7 h-full flex flex-col items-center text-center
                      group cursor-default hover:border-blue-400/30 transition-colors duration-300`}>
                      {/* Avatar */}
                      <motion.div
                        className="relative w-20 h-20 mb-5"
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-cyan-500
                          flex items-center justify-center shadow-lg shadow-blue-500/30">
                          <span className="text-2xl font-bold text-white">{member.name.charAt(0)}</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500
                          border-2 border-white dark:border-[#070c14] flex items-center justify-center">
                          <BadgeCheck className="w-3 h-3 text-white" />
                        </div>
                      </motion.div>

                      <h3 className="font-bold text-slate-800 dark:text-white text-lg leading-tight">{member.name}</h3>
                      <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold mt-1">{member.role}</p>
                      <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10
                        text-cyan-600 dark:text-cyan-400 text-[11px] font-bold uppercase tracking-wider">
                        {member.expertise}
                      </span>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 leading-relaxed">{member.bio}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ VISUAL BREAK — full-width split ══════════ */}
        <section className="grid lg:grid-cols-2 min-h-[420px]">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=900&q=80"
            alt="Doctor consulting patient on digital platform"
            className="h-64 lg:h-auto"
            speed={0.2}
          />
          <div className="bg-blue-700 dark:bg-blue-800 flex items-center justify-center p-12 lg:p-16">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="max-w-sm"
            >
              <h2 className="text-3xl font-extrabold text-white mb-5">
                Trusted by clinics across 6 countries
              </h2>
              <p className="text-blue-200 leading-relaxed mb-8">
                From flagship hospitals in Singapore to district clinics in rural Vietnam,
                NironCare adapts to the context of every patient and every provider.
              </p>
              <Button asChild className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-7 py-5 rounded-xl group">
                <Link href="/partnership" className="flex items-center gap-2">
                  Become a Partner
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ══════════ TESTIMONIALS ══════════ */}
        <section className="py-28 px-4 sm:px-8 lg:px-12 bg-white dark:bg-[#0b1220]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center mb-16"
            >
              <SectionLabel><Quote className="w-3 h-3" /> Testimonials</SectionLabel>
              <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-2">
                What Our Community Says
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-3">Trusted by healthcare professionals across ASEAN</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  variants={scaleIn} custom={i}
                  initial="hidden" whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className={`${glass} rounded-2xl p-6 flex flex-col cursor-default
                    transition-all duration-300 hover:border-blue-400/30`}
                >
                  <Quote className="w-7 h-7 text-blue-400 mb-4 flex-shrink-0" />
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex-1">
                    {t.text}
                  </p>
                  <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-500 to-cyan-500">
                        <Image src={t.img} alt={t.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 dark:text-white text-sm truncate">{t.name}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs truncate">{t.role}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <StarRating n={t.rating} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ PARTNERS ══════════ */}
        <section className="py-16 px-4 sm:px-8 lg:px-12 bg-slate-50 dark:bg-[#070c14] border-y border-slate-200 dark:border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.p
              className="text-center text-[10px] font-bold tracking-[.18em] uppercase text-slate-400 mb-10"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              Trusted by leading healthcare organisations
            </motion.p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              {partners.map((p, i) => (
                <motion.span
                  key={p}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="text-[13px] font-semibold text-slate-400 dark:text-slate-500
                    hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
                >
                  {p}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ CTA ══════════ */}
        <CTA />

      </main>
      <Footer />
    </>
  );
}