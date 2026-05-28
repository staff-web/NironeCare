'use client';

import Link from 'next/link';
import { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  Video,
  BrainCircuit,
  HeartPulse,
  Play,
  ShieldCheck,
  Clock,
  Activity,
  ChevronRight,
  ChevronDown,
  Star,
  Wifi,
  Bell,
  Search,
  Home as HomeIcon,
  Calendar,
  Stethoscope,
  User,
  Cpu,
  Pill,
  Phone,
  Signal,
  Battery,
  CheckCircle,
  Timer,
  MapPin,
  Award,
  TrendingUp,
  Zap,
  Globe,
  MessageSquare,
  FileText,
  Lock,
  BarChart3,
  Users,
  ThumbsUp,
  Layers,
} from 'lucide-react';
import { CTA } from '@/components/cta';

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ─── SHARED SECTION WRAPPER ───────────────────────────────────────────────────

const SECTION_CLS = 'w-full px-4 sm:px-6 lg:px-8';
const INNER_CLS   = 'max-w-7xl mx-auto';

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1800, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── SCROLL PROGRESS BAR ──────────────────────────────────────────────────────

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg,#0046C0,#0060FF,#60A5FA)' }}
    />
  );
}

// ─── 3D TILT CARD WITH CLICK FEEDBACK ────────────────────────────────────────

function TiltCard({
  children,
  className = '',
  intensity = 8,
  style = {},
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isClicked) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / r.width;
    const dy = (e.clientY - r.top - r.height / 2) / r.height;
    el.style.transform = `perspective(900px) rotateY(${dx * intensity}deg) rotateX(${-dy * intensity}deg) translateY(-8px) scale(1.02)`;
    el.style.transition = 'none';
  }, [intensity, isClicked]);

  const onLeave = useCallback(() => {
    if (isClicked) return;
    const el = ref.current; if (!el) return;
    el.style.transform = '';
    el.style.transition = 'transform .5s cubic-bezier(0.22,1,0.36,1)';
  }, [isClicked]);

  const handleClick = useCallback(() => {
    setIsClicked(true);
    const el = ref.current;
    if (el) {
      el.style.transform = 'perspective(900px) scale(0.97)';
      el.style.transition = 'transform 0.12s ease';
      setTimeout(() => {
        if (el) {
          el.style.transform = '';
          el.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1)';
        }
        setIsClicked(false);
      }, 150);
    }
    if (onClick) onClick();
  }, [onClick]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform', ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

// ─── ENHANCED 3D PARALLAX HERO FLOATING CARD ─────────────────────────────────

function HeroFloatingCard({ children, className='', delay=0 }: { children:React.ReactNode; className?:string; delay?:number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width/2) / r.width;
    const dy = (e.clientY - r.top - r.height/2) / r.height;
    el.style.transform = `perspective(600px) rotateY(${dx*18}deg) rotateX(${-dy*14}deg) translateZ(25px)`;
    el.style.transition = 'none';
  }, []);
  const onLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transform = ''; el.style.transition = 'transform .6s cubic-bezier(0.22,1,0.36,1)';
  }, []);
  return (
    <motion.div
      ref={ref}
      className={`absolute z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl px-3.5 py-2.5 cursor-default ${className}`}
      style={{
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 8px 32px rgba(0,0,0,.12),0 2px 8px rgba(0,70,192,.08)',
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
      transition={{
        opacity: { delay: delay + 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        scale: { delay: delay + 1, duration: 0.6 },
        y: { delay: delay + 1, repeat: Infinity, duration: 5 + delay * 0.5, ease: 'easeInOut' }
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

// ─── ENHANCED PHONE MOCKUP WITH 3D PARALLAX ───────────────────────────────────

function PhoneMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
      className="relative flex justify-center items-center select-none"
    >
      <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%,rgba(0,70,192,.18) 0%,transparent 70%)', filter: 'blur(40px)' }} />
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="relative z-10"
        style={{
          width: 248,
          height: 504,
          borderRadius: 44,
          background: 'linear-gradient(160deg,#1c2136 0%,#0d1020 60%,#111827 100%)',
          boxShadow: '0 0 0 1.5px rgba(255,255,255,.09),0 56px 112px rgba(0,0,0,.45),0 28px 56px rgba(0,70,192,.22),inset 0 1px 0 rgba(255,255,255,.07)',
          padding: 10
        }}
      >
        {/* Phone bezel details */}
        <div style={{ position: 'absolute', right: -3, top: 104, width: 3, height: 38, borderRadius: '0 3px 3px 0', background: 'rgba(255,255,255,.13)' }} />
        <div style={{ position: 'absolute', right: -3, top: 154, width: 3, height: 38, borderRadius: '0 3px 3px 0', background: 'rgba(255,255,255,.10)' }} />
        <div style={{ position: 'absolute', left: -3, top: 128, width: 3, height: 54, borderRadius: '3px 0 0 3px', background: 'rgba(255,255,255,.10)' }} />

        {/* Screen content */}
        <div style={{ width: '100%', height: '100%', borderRadius: 34, background: '#F4F6FB', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', width: 74, height: 22, borderRadius: 12, background: '#0d1020', zIndex: 20 }} />
          <div style={{ height: 36, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 0 14px', borderBottom: '1px solid #EEF0F6' }}>
            <span style={{ fontFamily: 'system-ui', fontSize: 11, fontWeight: 700, color: '#0a0f1e' }}>9:41</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Signal size={11} color="#0a0f1e" strokeWidth={2.5} />
              <Wifi size={11} color="#0a0f1e" strokeWidth={2.5} />
              <Battery size={12} color="#0a0f1e" strokeWidth={2.5} />
            </div>
          </div>
          <div style={{ background: '#fff', padding: '12px 14px 10px', borderBottom: '1px solid #EEF0F6' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(135deg,#0046C0,#0060FF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HeartPulse size={14} color="#fff" strokeWidth={2} />
                </div>
                <span style={{ fontFamily: 'system-ui', fontSize: 15, fontWeight: 700, color: '#0046C0' }}>NironCare</span>
              </div>
              <div style={{ position: 'relative', width: 30, height: 30, borderRadius: 9, background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bell size={14} color="#0046C0" strokeWidth={2} />
                <div style={{ position: 'absolute', top: 5, right: 5, width: 6, height: 6, borderRadius: '50%', background: '#EF4444', border: '1.5px solid #fff' }} />
              </div>
            </div>
            <div style={{ fontFamily: 'system-ui', fontSize: 11, color: '#8a99b8' }}>Good morning, <strong style={{ color: '#0a0f1e', fontWeight: 600 }}>Aditya</strong></div>
          </div>
          <div style={{ margin: '10px 14px', background: '#EEF2FF', borderRadius: 11, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 7, border: '1px solid rgba(0,70,192,.08)' }}>
            <Search size={13} color="#8a99b8" strokeWidth={2} />
            <span style={{ fontFamily: 'system-ui', fontSize: 11, color: '#8a99b8' }}>Search doctors, clinics…</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ margin: '0 14px 10px', borderRadius: 16, background: 'linear-gradient(135deg,#0046C0 0%,#0060FF 100%)', padding: '13px 13px 11px', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,.05)', right: -20, top: -20 }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: 'system-ui', fontSize: 9.5, color: 'rgba(255,255,255,.65)', letterSpacing: '.07em', textTransform: 'uppercase', fontWeight: 500 }}>Your Queue Status</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,.14)', borderRadius: 100, padding: '2px 8px' }}>
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.6 }} style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ADE80' }} />
                <span style={{ fontFamily: 'system-ui', fontSize: 9, fontWeight: 600, color: '#fff' }}>Live</span>
              </div>
            </div>
            <div style={{ fontFamily: 'system-ui', fontSize: 30, fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: 2, letterSpacing: '-.03em' }}>#03</div>
            <div style={{ fontFamily: 'system-ui', fontSize: 10, color: 'rgba(255,255,255,.60)', marginBottom: 10 }}>Orthopedic · Sunway Medical, Floor 3</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
              {[{ val: '8m', lbl: 'Est. Wait' }, { val: '2', lbl: 'Ahead' }, { val: '↓60%', lbl: 'Wait saved' }].map(s => (
                <div key={s.lbl} style={{ background: 'rgba(255,255,255,.12)', borderRadius: 9, padding: '6px 4px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'system-ui', fontSize: 12, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontFamily: 'system-ui', fontSize: 8.5, color: 'rgba(255,255,255,.55)', marginTop: 2 }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <div style={{ margin: '0 14px 8px', background: '#EEF4FF', borderRadius: 10, padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 7 }}>
            <Cpu size={12} color="#0046C0" strokeWidth={2} />
            <span style={{ fontFamily: 'system-ui', fontSize: 9.5, color: '#0046C0', fontWeight: 500, whiteSpace: 'nowrap' }}>AI optimising</span>
            <div style={{ flex: 1, height: 3, background: 'rgba(0,70,192,.15)', borderRadius: 4, overflow: 'hidden' }}>
              <motion.div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg,#0046C0,#0060FF)' }} initial={{ width: 0 }} animate={{ width: '60%' }} transition={{ delay: 1.4, duration: 1.2 }} />
            </div>
            <span style={{ fontFamily: 'system-ui', fontSize: 9.5, fontWeight: 700, color: '#0046C0', whiteSpace: 'nowrap' }}>60% faster</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 14px 5px' }}>
            <span style={{ fontFamily: 'system-ui', fontSize: 11, fontWeight: 600, color: '#0a0f1e' }}>Current Queue</span>
            <span style={{ fontFamily: 'system-ui', fontSize: 10, color: '#0046C0', fontWeight: 500 }}>See all</span>
          </div>
          <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              { num: '01', name: 'Siti Rahman', type: 'Knee Assessment', badge: 'Now', numBg: '#EEF4FF', numColor: '#0046C0', badgeBg: '#F0FDF4', badgeColor: '#15803D', badgeBorder: '#BBF7D0' },
              { num: '02', name: 'Thanh Nguyen', type: 'Post-Op Follow-up', badge: '5 min', numBg: '#F3F0FE', numColor: '#7C3AED', badgeBg: '#FFFBEB', badgeColor: '#B45309', badgeBorder: '#FDE68A' },
              { num: '03', name: 'Aditya Sharma', type: 'Back Pain Consult', badge: '8 min', numBg: '#F1F5F9', numColor: '#475569', badgeBg: '#F8FAFC', badgeColor: '#64748B', badgeBorder: '#E2E8F0' },
            ].map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.15, duration: 0.5 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 11, padding: '8px 10px', border: '1px solid #EEF0F6' }}
              >
                <div style={{ width: 27, height: 27, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui', fontSize: 11, fontWeight: 700, color: p.numColor, background: p.numBg, flexShrink: 0 }}>{p.num}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'system-ui', fontSize: 11, fontWeight: 600, color: '#0a0f1e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                  <div style={{ fontFamily: 'system-ui', fontSize: 9.5, color: '#8a99b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.type}</div>
                </div>
                <div style={{ fontFamily: 'system-ui', fontSize: 9.5, fontWeight: 700, padding: '3px 8px', borderRadius: 100, background: p.badgeBg, color: p.badgeColor, border: `1px solid ${p.badgeBorder}`, flexShrink: 0 }}>{p.badge}</div>
              </motion.div>
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #EEF0F6', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '8px 0 14px' }}>
            {[{ Icon: HomeIcon, label: 'Home', active: true }, { Icon: Calendar, label: 'Appts', active: false }, { Icon: Stethoscope, label: 'Consult', active: false }, { Icon: User, label: 'Profile', active: false }].map(({ Icon, label, active }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Icon size={18} color={active ? '#0046C0' : '#8a99b8'} strokeWidth={active ? 2.5 : 1.8} />
                <span style={{ fontFamily: 'system-ui', fontSize: 8.5, color: active ? '#0046C0' : '#8a99b8', fontWeight: active ? 600 : 400 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── MARQUEE STRIP ────────────────────────────────────────────────────────────

function MarqueeStrip() {
  const items = ['Smart Queue', 'AI Triage', 'Video Consult', 'E-Prescriptions', 'HIPAA Compliant', 'Post-Care Follow-up', 'Real-time Updates', 'SOC 2 Certified', 'ASEAN Ready', 'Medication Alerts'];
  return (
    <div className="overflow-hidden py-5 border-y border-foreground/6 bg-foreground/[0.015]">
      <motion.div className="flex gap-10 whitespace-nowrap" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-[12px] font-semibold text-foreground/35 uppercase tracking-[.1em]">
            <span className="w-1 h-1 rounded-full bg-[#0046C0]/40" />{item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── PHOTO STRIP WITH 3D HOVER ────────────────────────────────────────────────

function PhotoStrip() {
  const photos = [
    { src: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80', alt: 'Modern clinic interior' },
    { src: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80', alt: 'Doctor reviewing records' },
    { src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80', alt: 'Medical team' },
    { src: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80', alt: 'Patient with health app' },
    { src: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80', alt: 'Pharmacy' },
  ];
  return (
    <div className="flex h-[340px] overflow-hidden">
      {photos.map((p, i) => (
        <motion.div
          key={i}
          className="relative overflow-hidden cursor-pointer"
          style={{ flex: 1 }}
          whileHover={{ flex: 2.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={p.src} alt={p.alt} className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(.82) saturate(1.1)' }} loading="lazy" />
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,.28)' }}
            whileHover={{ background: 'rgba(0,0,0,0)' }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ─── FAQ WITH SMOOTH ANIMATION ────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    { q: 'How quickly can NironCare be deployed at our clinic?', a: 'Most clinics are fully live within 2 weeks. Our onboarding team handles data migration, staff training, and EMR integration end-to-end. Larger hospital networks typically take 4–6 weeks for a phased rollout.' },
    { q: 'Does NironCare integrate with existing EMR/HIS systems?', a: 'Yes. We support HL7 FHIR, DICOM, and direct API connections to over 40 regional EMR systems including iClinic, Doctorxdentist, Practo, and major hospital HIS platforms across Malaysia, Singapore, Thailand, and Vietnam.' },
    { q: 'How does AI triage actually work?', a: 'Our model is trained on 12M+ anonymised ASEAN patient records. It analyses chief complaint, vital signs, appointment history, and risk factors to assign a dynamic priority score. Clinicians always retain override authority.' },
    { q: 'Is patient data stored locally or in the cloud?', a: 'Both options are available. We offer on-premise deployment for hospitals requiring full data sovereignty, and a SOC 2 Type II, ISO 27001-certified cloud environment for clinics that prefer managed infrastructure.' },
    { q: 'What languages does the patient app support?', a: 'Currently English, Bahasa Malaysia, Bahasa Indonesia, Thai, Vietnamese, Tagalog, and Mandarin. Tamil and Khmer are in active development.' },
    { q: 'How is pricing structured?', a: 'We charge a per-seat monthly licence for clinic staff, plus an optional patient engagement add-on. There are no per-consultation fees. Enterprise hospital networks receive custom pricing based on bed count and module selection.' },
  ];
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.6 }}
          className="rounded-2xl border border-foreground/8 overflow-hidden bg-white dark:bg-[#0D1525]"
        >
          <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group" onClick={() => setOpen(open === i ? null : i)}>
            <span className="text-[14.5px] font-semibold text-foreground leading-snug">{item.q}</span>
            <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
              <ChevronDown className="w-4 h-4 text-foreground/40" />
            </motion.span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="px-6 pb-5 text-[13.5px] text-foreground/55 leading-relaxed font-light border-t border-foreground/6 pt-4">{item.a}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// ─── SECTION LABEL + HEADING helper ──────────────────────────────────────────

function SectionHeading({ label, title, sub, center = false }: { label: string; title: React.ReactNode; sub?: string; center?: boolean }) {
  return (
    <motion.div className={center ? 'text-center' : ''} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
      <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[.16em] uppercase mb-4" style={{ color: '#0046C0' }}>{label}</motion.p>
      <motion.h2 variants={fadeUp} custom={0.1} className="text-[clamp(28px,3.8vw,46px)] font-black tracking-[-0.03em] leading-tight text-foreground" style={{ fontFamily: "'Playfair Display',serif" }}>{title}</motion.h2>
      {sub && <motion.p variants={fadeUp} custom={0.2} className={`mt-4 text-[15px] text-foreground/50 font-light leading-relaxed ${center ? 'max-w-xl mx-auto' : ' max-w-[520px]'}`}>{sub}</motion.p>}
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgParallax = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.97]);
  const phoneYSpring = useSpring(phoneY, { stiffness: 70, damping: 22 });
  const copyYSpring = useSpring(copyY, { stiffness: 70, damping: 22 });

  // ── data ──────────────────────────────────────────────────────────────────

  const stats = [
    { value: 50, suffix: 'K+', label: 'Active Patients' },
    { value: 84, suffix: '%', label: 'Satisfaction Rate' },
    { value: 10, suffix: '+', label: 'Countries' },
    { value: 99, suffix: '.9%', label: 'Uptime SLA' },
  ];

  const solutions = [
    {
      icon: Building2, title: 'Smart Queue Management', accentColor: '#0046C0',
      photo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80',
      description: 'AI-driven patient queuing reduces wait times by 60% and improves clinic throughput through intelligent priority triage. Patients receive real-time SMS and in-app updates — eliminating waiting room anxiety.',
      features: ['Real-time SMS Alerts', 'Priority Triage', 'Multi-clinic Support', 'Walk-in + Appointment'],
    },
    {
      icon: Video, title: 'Tele Consultation', accentColor: '#7C3AED',
      photo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
      description: 'Secure HD video consultations connecting patients with specialists across borders. E-prescriptions, lab referrals, and structured notes are shared instantly.',
      features: ['HD Encrypted Video', 'E-Prescriptions', 'Lab Referrals', 'Cross-border Ready'],
    },
    {
      icon: BrainCircuit, title: 'AI Diagnosis Support', accentColor: '#0891B2',
      photo: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80',
      description: 'ML-powered diagnostic assistance trained on 12M+ ASEAN patient records. Surfaces differential diagnoses and evidence-based recommendations to reduce cognitive load.',
      features: ['Symptom Analysis', 'Differential Dx', 'Drug Interaction Check', 'ICD-11 Coding'],
    },
    {
      icon: HeartPulse, title: 'Post-Care Follow-up', accentColor: '#DC2626',
      photo: 'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=800&q=80',
      description: 'Automated health monitoring and personalised follow-up sequences ensure no patient falls through the cracks post-discharge. Adherence tracking included.',
      features: ['Medication Reminders', 'Vitals Monitoring', 'Readmission Alerts', 'Caregiver Portal'],
    },
  ];

  const doctors = [
    { name: 'Dr. Maya Lim', specialty: 'Cardiologist', location: 'KL General, Malaysia', rating: 4.9, reviews: 312, available: true, photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80', initials: 'ML', bg: '#3B82F6' },
    { name: 'Dr. Somchai P.', specialty: 'Orthopedic Surgeon', location: 'Bumrungrad, Thailand', rating: 4.8, reviews: 278, available: true, photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80', initials: 'SP', bg: '#7C3AED' },
    { name: 'Dr. Nguyen Thi H.', specialty: 'Neurologist', location: 'Vinmec, Vietnam', rating: 5.0, reviews: 194, available: false, photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80', initials: 'NH', bg: '#0891B2' },
    { name: 'Dr. Ravi Mehta', specialty: 'Pulmonologist', location: 'Apollo, Singapore', rating: 4.9, reviews: 421, available: true, photo: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=400&q=80', initials: 'RM', bg: '#059669' },
  ];

  const testimonials = [
    { quote: 'NironCare cut our average wait from 45 minutes to under 10. Revenue grew 34% in a single year.', name: 'Dr. Priya Ramalingam', role: 'Medical Director · Apex Health KL', initials: 'PR', bg: '#0046C0' },
    { quote: 'The AI triage system flags high-risk patients before they even reach the consultation room. It has genuinely saved lives.', name: 'Dr. Ahmad Fadzil', role: 'Head of Emergency · Hospital Sultanah Bahiyah', initials: 'AF', bg: '#7C3AED' },
    { quote: 'Our nurses spend 40% less time on admin. That time goes directly back to patient care — exactly where it should be.', name: 'Nur Aisyah Bt Zainudin', role: 'Chief Nursing Officer · Gleneagles Medini', initials: 'NA', bg: '#059669' },
  ];

  const features = [
    { icon: Zap, title: '60% Faster Queue', desc: 'AI scheduling slashes average clinic wait times from 45 min to under 12 min.' },
    { icon: Lock, title: 'End-to-End Encrypted', desc: 'TLS 1.3, AES-256 at rest. Zero-knowledge architecture for sensitive records.' },
    { icon: Globe, title: '10+ Countries', desc: 'Localised in 8 languages, compliant with MY PDPA, SG PDPA, TH PDPDP, VN Decree 13.' },
    { icon: BarChart3, title: 'Real-time Analytics', desc: 'Live dashboards for clinic directors: throughput, revenue, NPS, and staffing load.' },
    { icon: Layers, title: '40+ EMR Integrations', desc: 'HL7 FHIR & direct API connectors to iClinic, Doctorxdentist, Practo, and more.' },
    { icon: ThumbsUp, title: '94% Adherence Score', desc: 'Patients on our post-care programme show 94% medication adherence vs 61% baseline.' },
  ];

  const partners = ['Ministry of Health Malaysia', 'KPJ Healthcare', 'IHH Healthcare', 'Bumrungrad International', 'Vinmec Hospitals', 'Raffles Medical', 'Columbia Asia'];

  const blogPosts = [
    {
      tag: 'AI in Healthcare', date: '12 May 2025', readTime: '6 min read',
      title: 'How AI Triage Is Reducing Emergency Department Overcrowding Across ASEAN',
      excerpt: 'Emergency departments in Southeast Asia face unique pressures — monsoon-season surges, workforce shortages, and multilingual patient populations. We explore how predictive triage is changing the calculus.',
      photo: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&q=80',
    },
    {
      tag: 'Case Study', date: '28 Apr 2025', readTime: '4 min read',
      title: 'Apex Health KL: From 45-Minute Waits to Same-Day Satisfaction',
      excerpt: 'A deep dive into how a 12-clinic network in Kuala Lumpur deployed NironCare queue management and saw patient satisfaction scores jump from 3.1 to 4.7 in 90 days.',
      photo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
    },
    {
      tag: 'Product Update', date: '5 Apr 2025', readTime: '3 min read',
      title: 'Introducing Multilingual AI Notes: Consultations in Thai, Vietnamese & Bahasa',
      excerpt: 'Our speech-to-structured-note engine now supports 7 ASEAN languages, cutting post-consultation documentation time by 70% for clinicians.',
      photo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
    },
  ];

  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main className="overflow-hidden bg-background">

        {/* ════════════════════════════════════════════════
            ENHANCED HERO WITH 3D PARALLAX
        ════════════════════════════════════════════════ */}
               <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
          {/* Full-bleed parallax photo */}
          {/* Full-bleed parallax photo */}
<div className="absolute inset-0 overflow-hidden">
  <motion.img
    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&q=85"
    alt="Doctor with patient in modern clinic"
    className="absolute inset-0 w-full h-full object-cover object-center"
    style={{ scale: 1.08, y: imgParallax }}
  />
  {/* REPLACE this div */}
  <div 
    className="absolute inset-0 transition-all duration-300"
    style={{ 
      background: 'linear-gradient(105deg, var(--hero-overlay-start) 40%, var(--hero-overlay-mid) 58%, var(--hero-overlay-end) 80%, transparent 100%)'
    }}
  />
  <div className="absolute bottom-0 left-0 right-0 h-40 dark:bg-gradient-to-t dark:from-[#080F1E] bg-gradient-to-t from-background to-transparent" />
</div>

          <motion.div style={{ opacity:heroOpacity, scale:heroScale }} className={`relative z-10 w-full ${SECTION_CLS}`}>
            <div className={INNER_CLS}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

                {/* LEFT */}
                <motion.div style={{ y:copyYSpring }} variants={stagger} initial="hidden" animate="visible" className="space-y-7">
                  <motion.div variants={fadeUp} custom={0}>
                    <motion.span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12.5px] font-semibold border"
                      style={{ background:'rgba(0,70,192,.08)',borderColor:'rgba(0,70,192,.18)',color:'#0046C0' }} whileHover={{ scale:1.02 }}>
                      <motion.span className="w-1.5 h-1.5 rounded-full bg-[#0046C0]" animate={{ opacity:[1,.3,1] }} transition={{ repeat:Infinity,duration:1.8 }}/>
                      AI-Powered · ASEAN Healthcare Platform
                    </motion.span>
                  </motion.div>

                  <motion.h1 variants={fadeUp} custom={.1}
                    className="text-[clamp(38px,5.5vw,68px)] font-black leading-[1.04] tracking-[-0.04em] text-foreground"
                    style={{ fontFamily:"'Playfair Display',serif" }}>
                    Healthcare<br/>
                    <span className="font-light text-foreground/35">without</span>{' '}
                    <span style={{ color:'#0046C0' }}>boundaries.</span>
                  </motion.h1>

                  <motion.p variants={fadeUp} custom={.2} className="text-[16px] text-foreground/55 leading-[1.75] max-w-[460px] font-light">
                    From first registration to full recovery — NironCare's AI platform connects patients to expert care across Southeast Asia. Smarter triage, instant consultations, automated follow-up.
                  </motion.p>

                  <motion.div variants={fadeUp} custom={.3} className="flex flex-col sm:flex-row gap-3 pt-1">
                    <Link href="/partnership">
                      <motion.button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[14px] text-[14.5px] font-semibold text-white"
                        style={{ background:'#0046C0', boxShadow:'0 4px 20px rgba(0,70,192,.32)' }}
                        whileHover={{ scale:1.025, boxShadow:'0 8px 32px rgba(0,70,192,.45)', y:-2 }} whileTap={{ scale:.97 }}>
                        Schedule Demo
                        <motion.span animate={{ x:[0,3,0] }} transition={{ repeat:Infinity,duration:1.6,ease:'easeInOut' }}>
                          <ArrowRight className="w-4 h-4"/>
                        </motion.span>
                      </motion.button>
                    </Link>
                    <motion.button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[14px] text-[14.5px] font-medium text-foreground border border-foreground/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm"
                      whileHover={{ scale:1.015 }} whileTap={{ scale:.98 }}>
                      <Play className="w-4 h-4 fill-current"/>See how it works
                    </motion.button>
                  </motion.div>

                  {/* Trust avatars */}
                  <motion.div variants={fadeUp} custom={.38} className="flex items-center gap-4">
                    <div className="flex -space-x-2.5">
                      {[{i:'DR',bg:'#3B82F6'},{i:'KL',bg:'#8B5CF6'},{i:'AP',bg:'#10B981'},{i:'SN',bg:'#F59E0B'}].map((a,idx)=>(
                        <motion.div key={idx} initial={{ scale:0,opacity:0 }} animate={{ scale:1,opacity:1 }} transition={{ delay:.6+idx*.07,duration:.4,ease:'backOut' }}
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-[10px] font-bold"
                          style={{ background:a.bg }}>{a.i}</motion.div>
                      ))}
                    </div>
                    <div className="text-[12.5px] text-foreground/50">
                      <span className="font-semibold text-foreground">50,000+</span> patients trust NironCare
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {Array(5).fill(0).map((_,i)=>(
                          <motion.div key={i} initial={{ scale:0,rotate:-20 }} animate={{ scale:1,rotate:0 }} transition={{ delay:.9+i*.05,duration:.3,ease:'backOut' }}>
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400"/>
                          </motion.div>
                        ))}
                        <span className="ml-1 text-foreground/38">4.9 / 5</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Stats row */}
                  <motion.div variants={fadeUp} custom={.46}>
                    <div className="grid grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ border:'1px solid rgba(0,0,0,.07)',background:'rgba(0,0,0,.04)' }}>
                      {stats.map(({value,suffix,label},i)=>(
                        <motion.div key={label} className="flex flex-col items-center py-4 px-2 bg-white/80 dark:bg-foreground/4 backdrop-blur-sm hover:bg-white/95 transition-colors cursor-default"
                          initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:.8+i*.08,duration:.5 }}>
                          <span className="text-[21px] font-black leading-none tracking-tight" style={{ color:'#0046C0' }}>
                            <AnimatedCounter value={value} suffix={suffix}/>
                          </span>
                          <span className="text-[9.5px] text-foreground/40 mt-1.5 text-center font-medium leading-tight">{label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* RIGHT — phone + floating cards */}
                <motion.div className="relative flex justify-center lg:justify-end" style={{ y:phoneYSpring }}
                  initial={{ opacity:0,x:40 }} animate={{ opacity:1,x:0 }} transition={{ duration:1.1,ease:[.22,1,.36,1],delay:.3 }}>
                  <HeroFloatingCard className="-top-2 left-4 lg:-left-10" delay={0}>
                    <div className="flex items-center gap-2">
                      <motion.span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" animate={{ scale:[1,1.4,1] }} transition={{ repeat:Infinity,duration:2 }}/>
                      <span className="text-[12px] font-semibold text-foreground/85">Dr. Maya is available</span>
                    </div>
                  </HeroFloatingCard>
                  <HeroFloatingCard className="-bottom-2 right-2 lg:-right-6" delay={.7}>
                    <div className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-[#0046C0] flex-shrink-0"/>
                      <span className="text-[12px] font-semibold text-foreground/85">AI efficiency <span className="text-[#0046C0] font-bold">↑ 23%</span> this week</span>
                    </div>
                  </HeroFloatingCard>
                  <HeroFloatingCard className="top-1/2 -right-4 lg:-right-12 -translate-y-16" delay={1.3}>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-600 flex-shrink-0"/>
                      <span className="text-[12px] font-semibold text-foreground/85">HIPAA Compliant</span>
                    </div>
                  </HeroFloatingCard>
                  <PhoneMockup/>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ════════════════════════════════════════════════
            MARQUEE
        ════════════════════════════════════════════════ */}
        <MarqueeStrip />

        {/* ════════════════════════════════════════════════
            PARTNER LOGOS
        ════════════════════════════════════════════════ */}
        <section className={`py-14 ${SECTION_CLS} border-b border-foreground/6`}>
          <div className={INNER_CLS}>
            <motion.p className="text-center text-[11px] font-bold tracking-[.16em] uppercase text-foreground/30 mb-8"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              Trusted by leading healthcare organisations
            </motion.p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              {partners.map((p, i) => (
                <motion.span
                  key={p}
                  className="text-[13px] font-semibold text-foreground/30 hover:text-foreground/60 transition-colors cursor-default whitespace-nowrap"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                >{p}</motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            PHOTO STRIP
        ════════════════════════════════════════════════ */}
        <PhotoStrip />

        {/* ════════════════════════════════════════════════
            SOLUTIONS (4 cards with 3D tilt + click)
        ════════════════════════════════════════════════ */}
        <section className={`py-28 ${SECTION_CLS} bg-[#F5F7FA] dark:bg-[#080F1E] relative`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#0046C0]/30 to-transparent" />
          <div className={INNER_CLS}>
            <div className="mb-14 grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
              <SectionHeading label="Our Platform" title={<>Complete healthcare<br /><span className="text-foreground/38 font-light">ecosystem</span></>} />
              <div>
                <p className="text-[15px] text-foreground/50 leading-relaxed font-light">Four interconnected solutions covering every stage of the patient journey — built for the ASEAN healthcare reality.</p>
                <Link href="/solutions">
                  <motion.button className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold" style={{ color: '#0046C0' }} whileHover={{ gap: '10px' }} transition={{ duration: 0.2 }}>
                    View all solutions <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* 2×2 grid with enhanced 3D cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {solutions.map((sol, i) => {
                const Icon = sol.icon;
                const ref = useRef(null);
                const inView = useInView(ref, { once: true, margin: '-60px' });
                return (
                  <motion.div key={sol.title} ref={ref} custom={i * 0.08} variants={cardReveal} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                    <TiltCard className="group h-full relative rounded-3xl border bg-white dark:bg-[#0D1525] overflow-hidden flex flex-col cursor-pointer"
                      intensity={6} style={{ borderColor: 'rgba(0,0,0,.07)', boxShadow: '0 2px 20px rgba(0,0,0,.05)' }}>
                      {/* Accent top line with spring animation */}
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-[2px] origin-left z-10"
                        style={{ background: `linear-gradient(90deg,${sol.accentColor},${sol.accentColor}44)` }}
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ delay: i * 0.08 + 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      />
                      {/* Photo */}
                      <div className="relative h-52 overflow-hidden">
                        <img src={sol.photo} alt={sol.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,transparent 30%,rgba(0,0,0,.55))' }} />
                        <div className="absolute bottom-4 left-5 right-5">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                              style={{ background: `${sol.accentColor}22`, border: `1px solid ${sol.accentColor}44`, backdropFilter: 'blur(8px)' }}
                            >
                              <Icon className="w-4 h-4" style={{ color: '#fff' }} strokeWidth={1.8} />
                            </div>
                            <h3 className="text-[17px] font-bold text-white tracking-tight leading-snug drop-shadow">{sol.title}</h3>
                          </div>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="relative z-10 p-6 flex flex-col flex-1">
                        <p className="text-[13px] text-foreground/55 leading-relaxed mb-5 flex-1">{sol.description}</p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {sol.features.map(f => (
                            <span key={f} className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full"
                              style={{ background: `${sol.accentColor}0F`, color: sol.accentColor, border: `1px solid ${sol.accentColor}22` }}>{f}</span>
                          ))}
                        </div>
                        <motion.div
                          className="flex items-center gap-1.5 text-[12px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: sol.accentColor }}
                          whileHover={{ x: 4 }}
                        >
                          Learn more <ArrowRight className="w-3.5 h-3.5" />
                        </motion.div>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            PLATFORM FEATURES (6-up grid with 3D)
        ════════════════════════════════════════════════ */}
        <section className={`py-28 ${SECTION_CLS} bg-background`}>
          <div className={INNER_CLS}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end mb-14">
              <SectionHeading label="Why NironCare" title={<>Built for real<br /><span className="text-foreground/38 font-light">clinical workflows</span></>} />
              <p className="text-[15px] text-foreground/50 leading-relaxed font-light">We designed every feature in partnership with clinicians, hospital administrators, and patients across 10 ASEAN countries.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <TiltCard key={f.title} intensity={5}>
                    <motion.div
                      className="group h-full p-7 rounded-3xl border border-foreground/8 bg-white dark:bg-[#0D1525] flex flex-col gap-4 cursor-pointer"
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                        style={{ background: '#EEF3FF', border: '1px solid rgba(0,70,192,.12)' }}>
                        <Icon className="w-5 h-5" style={{ color: '#0046C0' }} strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="text-[16px] font-bold text-foreground mb-2">{f.title}</h3>
                        <p className="text-[13px] text-foreground/50 leading-relaxed font-light">{f.desc}</p>
                      </div>
                    </motion.div>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            HOW IT WORKS (3-step process with 3D)
        ════════════════════════════════════════════════ */}
        <section className={`py-28 ${SECTION_CLS} bg-[#F5F7FA] dark:bg-[#080F1E] relative overflow-hidden`}>
          <div className={INNER_CLS}>
            <div className="text-center mb-20">
              <SectionHeading center label="Simple Process" title={<>From registration<br /><span className="text-foreground/38 font-light">to recovery</span></>}
                sub="A seamless experience for patients and providers, powered by intelligent automation at every touchpoint." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connector line with spring animation */}
              <div className="hidden md:block absolute top-[46px] left-[calc(16.666%+32px)] right-[calc(16.666%+32px)] h-px z-0">
                <motion.div
                  className="h-full"
                  style={{ background: 'linear-gradient(90deg,rgba(0,70,192,.25),rgba(0,70,192,.15),rgba(0,70,192,.25))' }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                />
              </div>

              {[
                { Icon: Clock, title: 'Register & Queue', desc: 'Patients register via app or web in under 60 seconds. AI assigns a dynamic priority score, estimates wait time with ±2-minute accuracy, and sends SMS/push updates the moment the queue moves.' },
                { Icon: Wifi, title: 'Consult & Diagnose', desc: 'In-person or via HD video — your choice. AI-assisted diagnosis surfaces relevant records, flagged drug interactions, and evidence-based differentials so clinicians focus entirely on the patient.' },
                { Icon: ShieldCheck, title: 'Follow-up & Recover', desc: 'Automated post-care sequences: medication reminders, symptom check-ins, escalation alerts, and caregiver notifications. Every patient gets a personalised recovery roadmap.' },
              ].map((item, i) => {
                const ref = useRef(null);
                const inView = useInView(ref, { once: true, margin: '-60px' });
                return (
                  <TiltCard key={item.title} className="relative z-10" intensity={5}>
                    <motion.div
                      ref={ref}
                      initial={{ opacity: 0, y: 36 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: i * 0.18, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col items-center text-center group p-8 rounded-3xl bg-white dark:bg-[#0D1525] border border-foreground/8 h-full cursor-pointer"
                    >
                      <motion.div
                        className="w-24 h-24 rounded-3xl mb-6 flex items-center justify-center relative"
                        style={{ background: 'linear-gradient(145deg,#EEF4FF,#DCEAFF)', border: '1px solid rgba(0,70,192,.10)' }}
                        whileHover={{ scale: 1.06, rotate: 2 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                      >
                        <item.Icon className="w-8 h-8" style={{ color: '#0046C0' }} strokeWidth={1.6} />
                        <motion.span
                          className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full text-[10px] font-black text-white flex items-center justify-center"
                          style={{ background: '#0046C0' }}
                          animate={inView ? { scale: [0, 1.3, 1] } : { scale: 0 }}
                          transition={{ delay: i * 0.18 + 0.4, duration: 0.5, ease: 'backOut' }}
                        >{i + 1}</motion.span>
                      </motion.div>
                      <h3 className="text-[17px] font-bold text-foreground tracking-tight mb-3">{item.title}</h3>
                      <p className="text-[13.5px] text-foreground/48 leading-relaxed font-light">{item.desc}</p>
                    </motion.div>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            IMPACT METRICS (big numbers row)
        ════════════════════════════════════════════════ */}
        <section className={`py-28 ${SECTION_CLS} bg-background`}>
          <div className={INNER_CLS}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: text */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
                <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[.16em] uppercase mb-4" style={{ color: '#0046C0' }}>By the Numbers</motion.p>
                <motion.h2 variants={fadeUp} custom={0.1} className="text-[clamp(28px,3.8vw,46px)] font-black tracking-[-0.03em] leading-tight text-foreground mb-6" style={{ fontFamily: "'Playfair Display',serif" }}>
                  Real impact,<br /><span className="text-foreground/38 font-light">measurable results</span>
                </motion.h2>
                <motion.p variants={fadeUp} custom={0.2} className="text-[15px] text-foreground/50 font-light leading-relaxed mb-8">
                  Every metric below is drawn from aggregate anonymised data across our live clinic network, updated monthly. We publish a full transparency report quarterly.
                </motion.p>
                <motion.div variants={fadeUp} custom={0.3}>
                  <Link href="/impact">
                    <motion.button
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[14px] text-[14px] font-semibold text-white"
                      style={{ background: '#0046C0', boxShadow: '0 4px 20px rgba(0,70,192,.3)' }}
                      whileHover={{ scale: 1.02, y: -2, boxShadow: '0 8px 32px rgba(0,70,192,.42)' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Read Impact Report <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right: metrics grid with 3D */}
              <div className="grid grid-cols-2 gap-5">
                {[
                  { value: 60, suffix: '%', label: 'Average wait time reduction', desc: 'Down from 45 min to 12 min across our network' },
                  { value: 34, suffix: '%', label: 'Clinic revenue increase', desc: 'Median annual growth among NironCare partners' },
                  { value: 94, suffix: '%', label: 'Medication adherence score', desc: 'Patients on post-care programmes' },
                  { value: 2, suffix: 'wk', label: 'Average deployment time', desc: 'From contract signing to first patient' },
                ].map((m, i) => (
                  <TiltCard key={m.label} intensity={4}>
                    <motion.div
                      className="p-7 rounded-3xl border border-foreground/8 bg-white dark:bg-[#0D1525] cursor-pointer"
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.7 }}
                    >
                      <div className="text-[clamp(36px,4vw,52px)] font-black leading-none tracking-tight mb-2" style={{ color: '#0046C0' }}>
                        <AnimatedCounter value={m.value} suffix={m.suffix} />
                      </div>
                      <div className="text-[13px] font-semibold text-foreground mb-1">{m.label}</div>
                      <div className="text-[12px] text-foreground/40 font-light leading-relaxed">{m.desc}</div>
                    </motion.div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            MEET OUR DOCTORS
        ════════════════════════════════════════════════ */}
        <section className={`py-28 ${SECTION_CLS} bg-[#F5F7FA] dark:bg-[#080F1E]`}>
          <div className={INNER_CLS}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end mb-14">
              <SectionHeading label="Our Specialists" title={<>Meet the doctors<br /><span className="text-foreground/38 font-light">on the platform</span></>} />
              <div>
                <p className="text-[15px] text-foreground/50 leading-relaxed font-light">Over 2,400 verified specialists across 10 countries — each credentialed, peer-reviewed, and rated by real patients.</p>
                <Link href="/doctors">
                  <motion.button className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold" style={{ color: '#0046C0' }} whileHover={{ gap: '10px' }} transition={{ duration: 0.2 }}>
                    Browse all specialists <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {doctors.map((doc, i) => (
                <TiltCard key={doc.name} intensity={6}>
                  <motion.div
                    className="group relative rounded-3xl border border-foreground/8 bg-white dark:bg-[#0D1525] overflow-hidden cursor-pointer"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.1, duration: 0.7 }}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img src={doc.photo} alt={doc.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,transparent 50%,rgba(0,0,0,.6))' }} />
                      <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold backdrop-blur-sm ${doc.available ? 'bg-green-500/90 text-white' : 'bg-black/40 text-white/70'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${doc.available ? 'bg-white animate-pulse' : 'bg-white/50'}`} />
                        {doc.available ? 'Available' : 'Busy'}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-[15px] font-bold text-foreground mb-0.5">{doc.name}</h3>
                      <p className="text-[12.5px] font-medium mb-1" style={{ color: '#0046C0' }}>{doc.specialty}</p>
                      <div className="flex items-center gap-1.5 text-[11.5px] text-foreground/45 mb-3">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span>{doc.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-[12px] font-bold text-foreground">{doc.rating}</span>
                          <span className="text-[11px] text-foreground/40">({doc.reviews})</span>
                        </div>
                        <motion.button
                          className="text-[11px] font-semibold px-3 py-1.5 rounded-lg text-white"
                          style={{ background: '#0046C0' }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          Book
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            TESTIMONIALS (3-col with glass morphism)
        ════════════════════════════════════════════════ */}
        <section className={`py-28 ${SECTION_CLS} relative overflow-hidden`}>
          <img src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1400&q=80" alt="Hospital corridor"
            className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.1 }} loading="lazy" />
          <div className="absolute inset-0" style={{ background: '#0046C0' }} />
          <div className="absolute inset-0 opacity-55" style={{ background: '#0046C0' }} />
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 18% 50%,rgba(255,255,255,.055) 0%,transparent 50%)` }} />
          <motion.div
            className="absolute w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle,rgba(255,255,255,.06),transparent)', top: '-10%', left: '5%' }}
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className={`relative z-10 ${INNER_CLS}`}>
            <div className="text-center mb-14">
              <motion.p className="text-[11px] font-bold tracking-[.16em] uppercase text-white/50 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Patient & Clinician Voices</motion.p>
              <motion.h2
                className="text-[clamp(28px,3.8vw,46px)] font-black tracking-[-0.03em] leading-tight text-white"
                style={{ fontFamily: "'Playfair Display',serif" }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.7 }}
              >
                What our community says
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <TiltCard key={t.name} intensity={5}>
                  <motion.div
                    className="h-full rounded-3xl p-7 flex flex-col gap-5 cursor-pointer"
                    style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)', backdropFilter: 'blur(12px)' }}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.75 }}
                  >
                    <div className="flex gap-0.5 mb-1">
                      {Array(5).fill(0).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />)}
                    </div>
                    <p className="text-[14.5px] text-white/85 leading-relaxed font-light italic flex-1" style={{ fontFamily: "'Playfair Display',serif" }}>"{t.quote}"</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0" style={{ background: t.bg }}>{t.initials}</div>
                      <div>
                        <p className="text-white font-semibold text-[13px]">{t.name}</p>
                        <p className="text-white/45 text-[11px] mt-0.5">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            BLOG / INSIGHTS
        ════════════════════════════════════════════════ */}
        <section className={`py-28 ${SECTION_CLS} bg-background`}>
          <div className={INNER_CLS}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end mb-14">
              <SectionHeading label="Insights" title={<>From the<br /><span className="text-foreground/38 font-light">NironCare journal</span></>} />
              <div>
                <p className="text-[15px] text-foreground/50 leading-relaxed font-light">Case studies, product updates, and clinical research from across the ASEAN healthcare landscape.</p>
                <Link href="/blog">
                  <motion.button className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold" style={{ color: '#0046C0' }} whileHover={{ gap: '10px' }} transition={{ duration: 0.2 }}>
                    View all articles <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.map((post, i) => (
                <TiltCard key={post.title} intensity={5}>
                  <motion.div
                    className="group h-full rounded-3xl border border-foreground/8 bg-white dark:bg-[#0D1525] overflow-hidden flex flex-col cursor-pointer"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.7 }}
                  >
                    <div className="relative h-44 overflow-hidden flex-shrink-0">
                      <img src={post.photo} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(0,70,192,.9)', color: '#fff' }}>{post.tag}</span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-[11px] text-foreground/35 font-medium mb-3">
                        <span>{post.date}</span><span>·</span><span>{post.readTime}</span>
                      </div>
                      <h3 className="text-[15px] font-bold text-foreground leading-snug mb-3 group-hover:text-[#0046C0] transition-colors">{post.title}</h3>
                      <p className="text-[13px] text-foreground/48 leading-relaxed font-light flex-1">{post.excerpt}</p>
                      <motion.div
                        className="mt-5 flex items-center gap-1.5 text-[12.5px] font-semibold"
                        style={{ color: '#0046C0' }}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        Read more <ArrowRight className="w-3.5 h-3.5" />
                      </motion.div>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            FAQ
        ════════════════════════════════════════════════ */}
        <section className={`py-28 ${SECTION_CLS} bg-[#F5F7FA] dark:bg-[#080F1E]`}>
          <div className={INNER_CLS}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="lg:sticky lg:top-28">
                <SectionHeading label="FAQ" title={<>Common<br /><span className="text-foreground/38 font-light">questions answered</span></>}
                  sub="Can't find what you're looking for? Our clinical partnership team is available 9–6 across ASEAN time zones." />
                <div className="mt-8 flex flex-col gap-3">
                  <Link href="/contact">
                    <motion.button
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[14px] text-[14px] font-semibold text-white"
                      style={{ background: '#0046C0', boxShadow: '0 4px 20px rgba(0,70,192,.3)' }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Talk to our team <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                  <div className="flex items-center gap-2 text-[12.5px] text-foreground/40 mt-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Average response time: 2 business hours
                  </div>
                </div>
              </div>
              <FAQ />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            CTA - Using imported component
        ════════════════════════════════════════════════ */}
        <CTA />

      </main>
      <Footer />
    </>
  );
}