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
import { CTA } from '@/components/cta';
import {
  ArrowRight, CheckCircle2, Building2, Video, BrainCircuit, HeartPulse,
  Play, ShieldCheck, Clock, Activity, ChevronRight, ChevronDown, Star,
  Wifi, Bell, Search, Calendar, Stethoscope, User, Cpu, Signal, Battery,
  Zap, Globe, MessageSquare, Lock, BarChart3, Users, ThumbsUp, Layers,
  Rss, Beaker, Hospital, Leaf, Home as HomeIcon, TrendingUp, Award,
  FileText, Phone, MapPin, LinkedinIcon, Twitter, Mail,
} from 'lucide-react';

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
      delay,
    },
  }),
};

const SECTION_CLS = 'w-full px-4 sm:px-6 lg:px-8';
const INNER_CLS = 'max-w-7xl mx-auto';

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 25, mass: 0.8 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #0046C0, #3b82f6, #60a5fa, #3b82f6, #0046C0)',
        boxShadow: '0 0 16px rgba(0,70,192,0.6)',
      }}
    />
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    const duration = 2200;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── 3D Tilt Card with enhanced realism ───────────────────────────────────────

function TiltCard3D({
  children,
  className = '',
  intensity = 12,
  perspective = 1400,
  onClick,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  perspective?: number;
  onClick?: () => void;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((cy - y) / cy) * intensity;
      const rotY = ((x - cx) / cx) * intensity;
      setRotateX(rotX);
      setRotateY(rotY);
      setGlarePosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
      setIsHovered(true);
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: `${perspective}px`,
      }}
      animate={{
        rotateX,
        rotateY,
        y: isHovered ? -12 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 22,
        mass: 0.9,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
      {glare && isHovered && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)`,
            borderRadius: 'inherit',
          }}
        />
      )}
    </motion.div>
  );
}

// ─── Floating Element with 3D rotation ─────────────────────────────────────────

function FloatingElement3D({
  children,
  className = '',
  amplitude = 20,
  duration = 5,
  delay = 0,
  rotateAmplitude = 5,
}: {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
  rotateAmplitude?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0, amplitude * 0.6, 0],
        rotateX: [0, rotateAmplitude, 0, -rotateAmplitude, 0],
        rotateY: [0, -rotateAmplitude, 0, rotateAmplitude, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
// ─── Process Step with Interactive 3D Effect ──────────────────────────────────

function ProcessStep3D({
  number,
  title,
  description,
  isLast,
}: {
  number: string;
  title: string;
  description: string;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'start 30%'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        opacity,
        scale,
        transformStyle: 'preserve-3d',
      }}
      className="relative"
    >
      <div className="flex items-center gap-6 group">
        {/* Step indicator */}
        <motion.div
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.15 }}
          className="relative flex-shrink-0"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0046C0] to-[#1d6efc] flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">{number}</span>
          </div>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#0046C0]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ opacity: 0.5 }}
          />
        </motion.div>

        {/* Content card */}
        <motion.div
          className="flex-1 p-6 rounded-2xl border border-[rgba(0,70,192,0.15)] bg-white dark:bg-[#0D1525] backdrop-blur-sm group-hover:border-[rgba(0,70,192,0.30)] transition-all duration-300"
          whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,70,192,0.15)' }}
        >
          <motion.h3
            className="text-lg font-bold text-foreground mb-2"
            animate={{ color: '#0046C0' }}
            transition={{ duration: 0.3 }}
            whileHover={{ color: '#1d6efc' }}
          >
            {title}
          </motion.h3>
          <p className="text-foreground/60 text-sm leading-relaxed">{description}</p>
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            className="absolute left-10 top-20 w-0.5 h-20 bg-gradient-to-b from-[#0046C0] to-transparent"
            style={{ marginTop: 80 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        )}
      </div>
    </motion.div>
  );
}

// ─── Hero Background with Multi-layer Parallax and enhanced 3D ─────────────────

function HeroBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: y1,
          scale,
          opacity,
        }}
      />
      {/* Enhanced gradient overlays for better dark mode visibility */}
      <motion.div
        className="absolute inset-0 dark:opacity-0"
        style={{
          background: 'linear-gradient(115deg, rgba(240,245,255,0.98) 0%, rgba(240,245,255,0.95) 38%, rgba(240,245,255,0.65) 62%, rgba(240,245,255,0) 88%)',
          y: y2,
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-0 dark:opacity-100"
        style={{
          background: 'linear-gradient(115deg, rgba(5,10,25,0.99) 0%, rgba(5,10,25,0.97) 38%, rgba(5,10,25,0.72) 62%, rgba(5,10,25,0) 88%)',
          y: y3,
        }}
      />
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  );
}

// ─── Enhanced Phone Mockup with realistic 3D ───────────────────────────────────

function PhoneMockup3D() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [6, 28]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-6, 16]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        scale,
        y,
        transformStyle: 'preserve-3d',
      }}
      className="relative flex justify-center items-center"
    >
      {/* Enhanced multi-layer glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 50% 55%, rgba(0,70,192,0.4) 0%, rgba(59,130,246,0.15) 50%, transparent 80%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 45% 55% at 50% 60%, rgba(0,70,192,0.25) 0%, transparent 70%)',
          filter: 'blur(35px)',
        }}
      />

      <FloatingElement3D amplitude={18} duration={6} delay={0} rotateAmplitude={6}>
        <div
          className="relative z-10"
          style={{
            width: 280,
            height: 570,
            borderRadius: 54,
            background: 'linear-gradient(155deg, #1a2138, #060b18)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.12), 0 0 0 4px rgba(0,0,0,0.5), 0 90px 120px -40px rgba(0,0,0,0.8), 0 45px 70px -25px rgba(0,70,192,0.5), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.4)',
            padding: 12,
          }}
        >
          {/* Reflective sheen */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '45%',
              borderRadius: '54px 54px 0 0',
              background: 'linear-gradient(160deg, rgba(255,255,255,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 20,
            }}
          />

          {/* Side buttons */}
          <div style={{ position: 'absolute', right: -4, top: 112, width: 4, height: 48, borderRadius: '0 4px 4px 0', background: 'linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.08))' }} />
          <div style={{ position: 'absolute', right: -4, top: 174, width: 4, height: 48, borderRadius: '0 4px 4px 0', background: 'linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0.06))' }} />
          <div style={{ position: 'absolute', left: -4, top: 138, width: 4, height: 68, borderRadius: '4px 0 0 4px', background: 'linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0.06))' }} />

          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 44,
              background: '#F6F8FD',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
            }}
          >
            {/* Dynamic Island */}
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 108,
                height: 32,
                borderRadius: 22,
                background: '#0a0f1e',
                zIndex: 20,
                boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
              }}
            />

            {/* Status Bar */}
            <div
              style={{
                height: 48,
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 22px 0 20px',
                borderBottom: '1px solid #E8ECF4',
              }}
            >
              <span style={{ fontFamily: 'Inter, system-ui', fontSize: 14, fontWeight: 700, color: '#0a0f1e', letterSpacing: '-0.02em' }}>9:41</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Signal size={13} color="#0a0f1e" strokeWidth={2.5} />
                <Wifi size={13} color="#0a0f1e" strokeWidth={2.5} />
                <Battery size={14} color="#0a0f1e" strokeWidth={2.5} />
              </div>
            </div>

            {/* App Header */}
            <div style={{ background: '#fff', padding: '14px 20px 12px', borderBottom: '1px solid #E8ECF4' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 12,
                      background: 'linear-gradient(140deg, #0046C0, #1d6efc)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,70,192,0.4)',
                    }}
                  >
                    <HeartPulse size={17} color="#fff" strokeWidth={2} />
                  </div>
                  <span style={{ fontFamily: 'Inter, system-ui', fontSize: 18, fontWeight: 800, color: '#0046C0', letterSpacing: '-0.03em' }}>NironCare</span>
                </div>
                <div
                  style={{
                    position: 'relative',
                    width: 38,
                    height: 38,
                    borderRadius: 14,
                    background: '#EEF4FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Bell size={17} color="#0046C0" strokeWidth={2} />
                  <div style={{ position: 'absolute', top: 7, right: 7, width: 9, height: 9, borderRadius: '50%', background: '#EF4444', border: '2px solid #fff' }} />
                </div>
              </div>
              <div style={{ fontFamily: 'Inter, system-ui', fontSize: 13, color: '#8a99b8', fontWeight: 400 }}>
                Good morning, <strong style={{ color: '#0a0f1e', fontWeight: 700 }}>Aditya</strong> 👋
              </div>
            </div>

            {/* Search */}
            <div
              style={{
                margin: '14px 20px',
                background: '#EEF2FF',
                borderRadius: 16,
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                border: '1px solid rgba(0,70,192,0.1)',
              }}
            >
              <Search size={15} color="#8a99b8" strokeWidth={2} />
              <span style={{ fontFamily: 'Inter, system-ui', fontSize: 13, color: '#8a99b8' }}>Search doctors, clinics...</span>
            </div>

            {/* Queue Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, type: 'spring', stiffness: 200 }}
              style={{
                margin: '0 20px 14px',
                borderRadius: 24,
                background: 'linear-gradient(140deg, #0046C0 0%, #1558e0 50%, #1d6efc 100%)',
                padding: '18px 20px 16px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 12px 30px -8px rgba(0,70,192,0.5)',
              }}
            >
              <div style={{ position: 'absolute', width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', right: -40, top: -40 }} />
              <div style={{ position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', left: -30, bottom: -30 }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontFamily: 'Inter, system-ui', fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>Queue Status</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', borderRadius: 100, padding: '4px 12px' }}>
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 6px #4ADE80' }}
                  />
                  <span style={{ fontFamily: 'Inter, system-ui', fontSize: 10, fontWeight: 800, color: '#fff', letterSpacing: '0.1em' }}>LIVE</span>
                </div>
              </div>
              <div style={{ fontFamily: 'Inter, system-ui', fontSize: 48, fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 6, letterSpacing: '-0.05em' }}>#03</div>
              <div style={{ fontFamily: 'Inter, system-ui', fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 14 }}>Orthopedic · Sunway Medical, Floor 3</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                {[
                  { val: '8m', lbl: 'Est. Wait' },
                  { val: '2', lbl: 'Ahead' },
                  { val: '↓60%', lbl: 'Saved' },
                ].map((s) => (
                  <div key={s.lbl} style={{ background: 'rgba(255,255,255,0.14)', borderRadius: 12, padding: '8px 6px', textAlign: 'center', backdropFilter: 'blur(4px)' }}>
                    <div style={{ fontFamily: 'Inter, system-ui', fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{s.val}</div>
                    <div style={{ fontFamily: 'Inter, system-ui', fontSize: 9.5, color: 'rgba(255,255,255,0.6)', marginTop: 3 }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Status */}
            <div
              style={{
                margin: '0 20px 12px',
                background: '#EEF4FF',
                borderRadius: 14,
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Cpu size={15} color="#0046C0" strokeWidth={2} />
              <span style={{ fontFamily: 'Inter, system-ui', fontSize: 11.5, color: '#0046C0', fontWeight: 700, whiteSpace: 'nowrap' }}>AI optimising</span>
              <div style={{ flex: 1, height: 5, background: 'rgba(0,70,192,0.15)', borderRadius: 8, overflow: 'hidden' }}>
                <motion.div
                  style={{
                    height: '100%',
                    borderRadius: 8,
                    background: 'linear-gradient(90deg, #0046C0, #1d6efc)',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: '68%' }}
                  transition={{ delay: 1.4, duration: 1.4 }}
                />
              </div>
              <span style={{ fontFamily: 'Inter, system-ui', fontSize: 11.5, fontWeight: 800, color: '#0046C0', whiteSpace: 'nowrap' }}>60% faster</span>
            </div>

            {/* Queue List */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px 10px' }}>
              <span style={{ fontFamily: 'Inter, system-ui', fontSize: 13, fontWeight: 700, color: '#0a0f1e' }}>Current Queue</span>
              <span style={{ fontFamily: 'Inter, system-ui', fontSize: 11.5, color: '#0046C0', fontWeight: 600 }}>See all</span>
            </div>
            <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { num: '01', name: 'Siti Rahman', type: 'Knee Assessment', badge: 'Now', nBg: '#EEF4FF', nC: '#0046C0', bBg: '#F0FDF4', bC: '#15803D' },
                { num: '02', name: 'Thanh Nguyen', type: 'Post-Op Follow-up', badge: '5 min', nBg: '#F3F0FE', nC: '#7C3AED', bBg: '#FFFBEB', bC: '#B45309' },
                { num: '03', name: 'Aditya Sharma', type: 'Back Pain Consult', badge: '8 min', nBg: '#F1F5F9', nC: '#475569', bBg: '#F8FAFC', bC: '#64748B' },
              ].map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    background: '#fff',
                    borderRadius: 14,
                    padding: '10px 14px',
                    border: '1px solid #E8ECF4',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Inter',
                      fontSize: 12,
                      fontWeight: 800,
                      color: p.nC,
                      background: p.nBg,
                      flexShrink: 0,
                    }}
                  >
                    {p.num}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Inter', fontSize: 12.5, fontWeight: 700, color: '#0a0f1e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                    <div style={{ fontFamily: 'Inter', fontSize: 10.5, color: '#8a99b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.type}</div>
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter',
                      fontSize: 10,
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: 100,
                      background: p.bBg,
                      color: p.bC,
                      flexShrink: 0,
                    }}
                  >
                    {p.badge}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Nav */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: '#fff',
                borderTop: '1px solid #E8ECF4',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '10px 0 20px',
              }}
            >
              {[
                { Icon: HomeIcon, label: 'Home', active: true },
                { Icon: Calendar, label: 'Appts', active: false },
                { Icon: Stethoscope, label: 'Consult', active: false },
                { Icon: User, label: 'Profile', active: false },
              ].map(({ Icon, label, active }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <Icon size={20} color={active ? '#0046C0' : '#8a99b8'} strokeWidth={active ? 2.5 : 1.8} />
                  <span style={{ fontFamily: 'Inter', fontSize: 10, color: active ? '#0046C0' : '#8a99b8', fontWeight: active ? 800 : 400 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FloatingElement3D>
    </motion.div>
  );
}

// ─── Section Heading with enhanced styling ─────────────────────────────────────

function SectionHeading({
  label,
  title,
  sub,
  center = false,
}: {
  label: string;
  title: React.ReactNode;
  sub?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      className={center ? 'text-center' : ''}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-4 mb-6"
        style={{ justifyContent: center ? 'center' : 'flex-start' }}
      >
        <div className="w-8 h-px" style={{ background: '#0046C0' }} />
        <p
          className="text-[12px] font-bold tracking-[0.28em] uppercase"
          style={{ color: '#0046C0' }}
        >
          {label}
        </p>
        <div className="w-8 h-px" style={{ background: '#0046C0', opacity: center ? 1 : 0 }} />
      </motion.div>
      <motion.h2
        variants={fadeUp}
        custom={0.1}
        className="text-[clamp(32px,5vw,56px)] font-bold tracking-[-0.04em] leading-[1.1] text-foreground"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          variants={fadeUp}
          custom={0.2}
          className={`mt-6 text-[16px] text-foreground/55 font-normal leading-[1.8] ${center ? 'max-w-2xl mx-auto' : 'max-w-[540px]'}`}
        >
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
}

// ─── Enhanced Marquee Strip with 3D text ───────────────────────────────────────

function MarqueeStrip() {
  const items = [
    'Smart Queue Management',
    'AI-Powered Triage',
    'Tele Consultation Suite',
    'E-Prescriptions',
    'HIPAA Compliant',
    'Automated Follow-up',
    'Real-time Analytics',
    'SOC 2 Certified',
    'ASEAN Regional Ready',
    'Medication Alerts',
    'HL7 FHIR Integration',
    'ICD-11 Coding',
  ];

  return (
    <div
      className="overflow-hidden py-6 border-y relative"
      style={{
        borderColor: 'rgba(0,70,192,0.12)',
        background: 'linear-gradient(90deg, rgba(0,70,192,0.02) 0%, rgba(0,70,192,0.06) 50%, rgba(0,70,192,0.02) 100%)',
      }}
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-4 text-[13px] font-bold uppercase tracking-[0.18em]"
            style={{ color: 'rgba(0,70,192,0.45)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#0046C0', boxShadow: '0 0 6px #0046C0' }}
            />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Enhanced Photo Strip with 3D hover ────────────────────────────────────────

function PhotoStrip3D() {
  const photos = [
    { src: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80', alt: 'Modern clinic facility' },
    { src: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80', alt: 'Doctor reviewing records' },
    { src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80', alt: 'Medical team collaboration' },
    { src: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80', alt: 'Patient using app' },
    { src: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80', alt: 'Modern pharmacy' },
  ];

  return (
    <div className="flex h-[420px] sm:h-[500px] overflow-hidden">
      {photos.map((p, i) => (
        <motion.div
          key={i}
          className="relative overflow-hidden cursor-pointer group"
          style={{ flex: 1 }}
          whileHover={{ flex: 4 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <img
            src={p.src}
            alt={p.alt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ filter: 'brightness(0.82) saturate(1.1)' }}
            loading="lazy"
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.65))',
            }}
            whileHover={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))' }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          >
            <div className="w-8 h-0.5 bg-white mb-3" />
            <p className="text-white text-[14px] font-semibold tracking-wide">{p.alt}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Enhanced FAQ with better styling ──────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    { q: 'How quickly can NironCare be deployed at our clinic?', a: 'Most clinics are fully live within 2 weeks. Our onboarding team handles data migration, staff training, and EMR integration end-to-end. Larger hospital networks typically take 4–6 weeks for a phased rollout across multiple locations.' },
    { q: 'Does NironCare integrate with existing EMR/HIS systems?', a: 'Yes. We support HL7 FHIR, DICOM, and direct API connections to over 40 regional EMR systems including iClinic, Doctorxdentist, Practo, and major hospital HIS platforms across Malaysia, Singapore, Thailand, and Vietnam.' },
    { q: 'How does AI triage actually work?', a: 'Our model is trained on 12M+ anonymised ASEAN patient records. It analyses chief complaint, vital signs, appointment history, and risk factors to assign a dynamic priority score. Clinicians always retain override authority.' },
    { q: 'Is patient data stored locally or in the cloud?', a: 'Both options are available. We offer on-premise deployment for hospitals requiring full data sovereignty, and a SOC 2 Type II, ISO 27001-certified cloud environment for clinics that prefer managed infrastructure.' },
    { q: 'What languages does the patient app support?', a: 'Currently English, Bahasa Malaysia, Bahasa Indonesia, Thai, Vietnamese, Tagalog, and Mandarin. Tamil and Khmer are in active development for 2025.' },
    { q: 'How is pricing structured?', a: 'We charge a per-seat monthly licence for clinic staff, plus an optional patient engagement add-on. There are no per-consultation fees. Enterprise hospital networks receive custom pricing based on bed count and module selection.' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: i * 0.07, duration: 0.55 }}
          className="rounded-2xl border overflow-hidden bg-white dark:bg-[#0D1525] transition-all duration-300 hover:shadow-lg"
          style={{
            borderColor: 'rgba(0,70,192,0.12)',
            boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
          }}
        >
          <button
            className="w-full text-left px-8 py-5 flex items-center justify-between gap-4 cursor-pointer group"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-[15.5px] font-semibold text-foreground leading-snug tracking-[-0.01em] group-hover:text-[#0046C0] transition-colors duration-200">
              {item.q}
            </span>
            <motion.span
              animate={{ rotate: open === i ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[#0046C0]/10"
            >
              <ChevronDown className="w-4 h-4 text-[#0046C0]" />
            </motion.span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] as const }}
              >
                <div className="px-8 pb-6 text-[14.5px] text-foreground/60 leading-[1.85] border-t pt-4">
                  {item.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Enhanced Orbital Rings (decorative 3D bg element) ─────────────────────────

function OrbitalRings() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ perspective: '1400px' }}>
      {[320, 480, 640].map((size, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            border: `1px solid rgba(0,70,192,${0.07 - i * 0.018})`,
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) rotateX(75deg) rotateZ(${i * 45}deg)`,
          }}
          animate={{ rotateZ: [i * 45, i * 45 + 360] }}
          transition={{ duration: 25 + i * 10, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.65], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const stats = [
    { value: 50, suffix: 'K+', label: 'Active Patients' },
    { value: 84, suffix: '%', label: 'Satisfaction Rate' },
    { value: 10, suffix: '+', label: 'Countries Served' },
    { value: 99.9, suffix: '%', label: 'Uptime SLA' },
  ];

  const solutions = [
    {
      icon: Building2,
      title: 'Smart Queue Management',
      accentColor: '#0046C0',
      photo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80',
      description: 'AI-driven patient queuing reduces wait times by 60% and improves clinic throughput through intelligent priority triage.',
      features: ['Real-time SMS Alerts', 'Priority Triage', 'Multi-clinic Support', 'Walk-in + Appointment'],
    },
    {
      icon: Video,
      title: 'Tele Consultation Suite',
      accentColor: '#7C3AED',
      photo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
      description: 'Secure HD video consultations connecting patients with specialists across borders.',
      features: ['HD Encrypted Video', 'E-Prescriptions', 'Lab Referrals', 'Cross-border Ready'],
    },
    {
      icon: BrainCircuit,
      title: 'AI Diagnosis Support',
      accentColor: '#0891B2',
      photo: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80',
      description: 'ML-powered diagnostic assistance trained on 12M+ ASEAN patient records.',
      features: ['Symptom Analysis', 'Differential Dx', 'Drug Interaction Check', 'ICD-11 Coding'],
    },
    {
      icon: HeartPulse,
      title: 'Post-Care Follow-up',
      accentColor: '#DC2626',
      photo: 'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=800&q=80',
      description: 'Automated health monitoring and personalised follow-up sequences.',
      features: ['Medication Reminders', 'Vitals Monitoring', 'Readmission Alerts', 'Caregiver Portal'],
    },
  ];

  const testimonials = [
    {
      quote: 'NironCare cut our average wait from 45 minutes to under 10. Revenue grew 34% in a single year.',
      name: 'Dr. Priya Ramalingam',
      role: 'Medical Director · Apex Health KL',
      initials: 'PR',
      bg: '#0046C0',
    },
    {
      quote: 'The AI triage system flags high-risk patients before they even reach the consultation room. It has genuinely saved lives.',
      name: 'Dr. Ahmad Fadzil',
      role: 'Head of Emergency · Hospital Sultanah Bahiyah',
      initials: 'AF',
      bg: '#7C3AED',
    },
    {
      quote: 'Our nurses spend 40% less time on admin. That time goes directly back to patient care.',
      name: 'Nur Aisyah Bt Zainudin',
      role: 'Chief Nursing Officer · Gleneagles Medini',
      initials: 'NA',
      bg: '#059669',
    },
  ];

  const features = [
    { icon: Zap, title: '60% Faster Queue Times', desc: 'AI scheduling slashes average clinic wait times from 45 minutes to under 12 minutes.' },
    { icon: Lock, title: 'End-to-End Encrypted', desc: 'TLS 1.3, AES-256 at rest. Zero-knowledge architecture for sensitive medical records.' },
    { icon: Globe, title: '10+ Countries Served', desc: 'Localised in 8 languages, compliant with MY PDPA, SG PDPA, TH PDPDP, VN Decree 13.' },
    { icon: BarChart3, title: 'Real-time Analytics', desc: 'Live dashboards for clinic directors: throughput, revenue, NPS, and staffing load optimisation.' },
    { icon: Layers, title: '40+ EMR Integrations', desc: 'HL7 FHIR & direct API connectors to iClinic, Doctorxdentist, Practo, and more.' },
    { icon: ThumbsUp, title: '94% Adherence Score', desc: 'Patients on our post-care programme show 94% medication adherence vs 61% baseline.' },
  ];

  const partners = [
    'Ministry of Health Malaysia',
    'KPJ Healthcare Berhad',
    'IHH Healthcare',
    'Bumrungrad International',
    'Vinmec Health System',
    'Raffles Medical Group',
    'Columbia Asia',
  ];

  const team = [
    {
      name: 'Dr. Kavitha Ramasamy',
      role: 'Chief Executive Officer',
      dept: 'Leadership',
      bio: 'Former Head of Digital Health at Ministry of Health Malaysia. 18 years in healthcare systems design across 6 ASEAN nations.',
      color: '#0046C0',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    },
    {
      name: 'Marcus Lim Wei Jian',
      role: 'Chief Technology Officer',
      dept: 'Engineering',
      bio: 'Previously principal engineer at GovTech Singapore. Expert in distributed health data systems and FHIR interoperability.',
      color: '#7C3AED',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
    {
      name: 'Dr. Thanh Hoang Nguyen',
      role: 'Chief Medical Officer',
      dept: 'Clinical',
      bio: 'Board-certified internist and digital health researcher. Led telemedicine programmes at Vinmec International Hospital.',
      color: '#0891B2',
      img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    },
    {
      name: 'Nur Aisyah Zainudin',
      role: 'VP of Clinical Operations',
      dept: 'Operations',
      bio: 'Registered nurse with 14 years in high-volume public hospitals. Leads our clinical workflow design and staff training.',
      color: '#059669',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
    },
    {
      name: 'Priya Devi Krishnamurthy',
      role: 'Head of Data Science',
      dept: 'AI & Research',
      bio: 'PhD in Biomedical Informatics from NUS. Leads AI triage and predictive diagnostics team, training on 12M+ patient records.',
      color: '#DC2626',
      img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    },
    {
      name: 'Ahmad Fadzil Othman',
      role: 'VP of Partnerships',
      dept: 'Growth',
      bio: 'Former regional director at IHH Healthcare. Manages hospital and government partnerships across ASEAN markets.',
      color: '#D97706',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    },
  ];

  const howItWorks = [
    {
      Icon: Clock,
      title: 'Register & Queue',
      desc: 'Patients register via app or web in under 60 seconds. AI assigns a dynamic priority score, estimates wait time with ±2-minute accuracy.',
    },
    {
      Icon: Wifi,
      title: 'Consult & Diagnose',
      desc: 'In-person or via HD video — your choice. AI-assisted diagnosis surfaces relevant records and flagged drug interactions.',
    },
    {
      Icon: ShieldCheck,
      title: 'Follow-up & Recover',
      desc: 'Automated post-care sequences: medication reminders, symptom check-ins, escalation alerts, and caregiver notifications.',
    },
  ];

  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main className="overflow-hidden bg-background font-['Inter',system-ui,sans-serif]">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative min-h-screen flex items-center pt-28 pb-24 overflow-hidden">
          <HeroBackground />

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,70,192,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,70,192,0.8) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className={`relative z-10 w-full ${SECTION_CLS}`}
          >
            <div className={INNER_CLS}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
                {/* Left */}
                <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
                  <motion.div variants={slideInLeft} custom={0}>
                    <motion.span
                      className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-[12px] font-bold border backdrop-blur-sm"
                      style={{
                        background: 'rgba(0,70,192,0.1)',
                        borderColor: 'rgba(0,70,192,0.25)',
                        color: '#0046C0',
                      }}
                      whileHover={{ scale: 1.05, background: 'rgba(0,70,192,0.15)' }}
                    >
                      <motion.span
                        className="w-2 h-2 rounded-full bg-[#0046C0]"
                        animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{ boxShadow: '0 0 8px #0046C0' }}
                      />
                      AI-Powered Healthcare Platform · ASEAN
                    </motion.span>
                  </motion.div>

                  <motion.h1
                    variants={slideInLeft}
                    custom={0.08}
                    className="text-[clamp(44px,7vw,84px)] font-bold leading-[1.02] tracking-[-0.045em] text-foreground"
                  >
                    Healthcare
                    <br />
                    <span className="font-light text-foreground/30">without</span>{' '}
                    <span
                      style={{
                        color: '#0046C0',
                        backgroundImage: 'linear-gradient(135deg, #0046C0, #1d6efc, #60a5fa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      boundaries.
                    </span>
                  </motion.h1>

                  <motion.p
                    variants={slideInLeft}
                    custom={0.16}
                    className="text-[17px] text-foreground/55 leading-[1.85] max-w-[540px] font-normal"
                  >
                    From first registration to full recovery — NironCare's AI platform connects patients
                    to expert care across Southeast Asia. Smarter triage, instant consultations,
                    automated follow-up.
                  </motion.p>

                  <motion.div variants={slideInLeft} custom={0.24} className="flex flex-col sm:flex-row gap-4 pt-1">
                    <Link href="/contact">
                      <motion.button
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[15px] font-bold text-white relative overflow-hidden group"
                        style={{
                          background: '#0046C0',
                          boxShadow: '0 8px 32px rgba(0,70,192,0.45), 0 2px 8px rgba(0,70,192,0.2)',
                        }}
                        whileHover={{ scale: 1.05, boxShadow: '0 14px 44px rgba(0,70,192,0.55), 0 4px 12px rgba(0,70,192,0.3)', y: -2 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        Get Started
                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
                          <ArrowRight className="w-4.5 h-4.5" />
                        </motion.span>
                      </motion.button>
                    </Link>
                    <motion.button
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[15px] font-semibold text-foreground border backdrop-blur-sm bg-white/80 dark:bg-white/5"
                      style={{ borderColor: 'rgba(0,70,192,0.2)' }}
                      whileHover={{ scale: 1.03, borderColor: 'rgba(0,70,192,0.5)', background: 'rgba(255,255,255,0.95)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-7 h-7 rounded-full bg-[#0046C0]/15 flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 fill-[#0046C0] text-[#0046C0]" />
                      </div>
                      Watch Demo
                    </motion.button>
                  </motion.div>

                  {/* Trust Badges */}
                  <motion.div variants={slideInLeft} custom={0.32} className="flex items-center gap-6">
                    <div className="flex -space-x-3">
                      {[
                        { i: 'DR', bg: '#3B82F6' },
                        { i: 'KL', bg: '#8B5CF6' },
                        { i: 'AP', bg: '#10B981' },
                        { i: 'SN', bg: '#F59E0B' },
                      ].map((a, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.55 + idx * 0.07, ease: [0.34, 1.56, 0.64, 1] as const }}
                          className="w-11 h-11 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-[12px] font-bold shadow-lg"
                          style={{ background: a.bg }}
                        >
                          {a.i}
                        </motion.div>
                      ))}
                    </div>
                    <div className="text-[13px] text-foreground/50">
                      <span className="font-bold text-foreground">50,000+</span> patients trust NironCare
                      <div className="flex items-center gap-0.5 mt-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: -20 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.72 + i * 0.05, ease: [0.34, 1.56, 0.64, 1] as const }}
                            >
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            </motion.div>
                          ))}
                        <span className="ml-1.5 text-foreground/40">4.9 / 5</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Stats Grid */}
                  <motion.div variants={slideInLeft} custom={0.4}>
                    <div
                      className="grid grid-cols-4 gap-px rounded-2xl overflow-hidden backdrop-blur-sm"
                      style={{
                        border: '1px solid rgba(0,70,192,0.15)',
                        background: 'rgba(0,70,192,0.04)',
                      }}
                    >
                      {stats.map(({ value, suffix, label }, i) => (
                        <motion.div
                          key={label}
                          className="flex flex-col items-center py-6 px-2 bg-white/90 dark:bg-[#0D1525]/90 hover:bg-white dark:hover:bg-[#0D1525] transition-colors cursor-default"
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.85 + i * 0.08 }}
                        >
                          <span
                            className="text-[28px] font-bold leading-none tracking-tight"
                            style={{ color: '#0046C0' }}
                          >
                            <AnimatedCounter value={value} suffix={suffix} />
                          </span>
                          <span className="text-[11px] text-foreground/45 mt-2 text-center font-medium leading-tight uppercase tracking-wide">
                            {label}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right — Phone */}
                <motion.div
                  initial={{ opacity: 0, x: 55, rotateY: 18 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
                  className="relative flex justify-center lg:justify-end"
                >
                  {/* Floating cards */}
                  <motion.div
                    className="absolute -top-6 left-4 lg:-left-10 z-20 backdrop-blur-xl rounded-2xl px-5 py-3"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                    transition={{
                      opacity: { delay: 0.9, duration: 0.5 },
                      scale: { delay: 0.9, duration: 0.5 },
                      y: { delay: 0.9, repeat: Infinity, duration: 5, ease: 'easeInOut' },
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl bg-white dark:bg-slate-800 border"
                      style={{
                        borderColor: 'rgba(0,70,192,0.2)',
                        boxShadow: '0 20px 44px -12px rgba(0,0,0,0.25)',
                      }}
                    />
                    <div className="relative flex items-center gap-2.5">
                      <motion.span
                        className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                      <span className="text-[12.5px] font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                        Dr. Maya is available
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 right-2 lg:-right-8 z-20 backdrop-blur-xl rounded-2xl px-5 py-3"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                    transition={{
                      opacity: { delay: 1.1, duration: 0.5 },
                      scale: { delay: 1.1, duration: 0.5 },
                      y: { delay: 1.1, repeat: Infinity, duration: 5.5, ease: 'easeInOut' },
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl bg-white dark:bg-slate-800 border"
                      style={{
                        borderColor: 'rgba(0,70,192,0.2)',
                        boxShadow: '0 20px 44px -12px rgba(0,0,0,0.25)',
                      }}
                    />
                    <div className="relative flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(0,70,192,0.15)' }}
                      >
                        <Activity className="w-3.5 h-3.5" style={{ color: '#0046C0' }} />
                      </div>
                      <span className="text-[12.5px] font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                        AI efficiency <span className="font-bold" style={{ color: '#0046C0' }}>↑ 23%</span>
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute top-1/2 -left-4 lg:-left-14 z-20 backdrop-blur-xl rounded-xl px-4 py-2.5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                    transition={{
                      opacity: { delay: 1.3, duration: 0.5 },
                      x: { delay: 1.3, duration: 0.5 },
                      y: { delay: 1.3, repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-xl bg-white dark:bg-slate-800 border"
                      style={{
                        borderColor: 'rgba(0,70,192,0.2)',
                        boxShadow: '0 12px 30px -8px rgba(0,0,0,0.2)',
                      }}
                    />
                    <div className="relative flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 flex-shrink-0" style={{ color: '#059669' }} />
                      <div>
                        <p className="text-[10px] font-bold text-slate-800 dark:text-slate-100 leading-none">HIPAA Compliant</p>
                        <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-0.5">SOC 2 · ISO 27001</p>
                      </div>
                    </div>
                  </motion.div>

                  <PhoneMockup3D />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        <MarqueeStrip />
         <PhotoStrip3D />

        {/* ── Partners ──────────────────────────────────────────────────────── */}
{/* ── Partners Section (Redesigned to match your existing patterns) ── */}
<section className={`py-32 ${SECTION_CLS} relative overflow-hidden`}>
  {/* Background styling to match your existing sections */}
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(0,70,192,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }}
    />
    <div
      className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(29,110,252,0.05) 0%, transparent 70%)', filter: 'blur(100px)' }}
    />
  </div>

  <div className={INNER_CLS}>
    {/* Header - matching your SectionHeading pattern */}
    <div className="text-center mb-20">
      <motion.div
        className="flex items-center justify-center gap-3 mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#0046C0]/40" />
        <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#0046C0]/70">Global Partners Network</p>
        <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#0046C0]/40" />
      </motion.div>

      <motion.h2
        className="text-[clamp(32px,5vw,56px)] font-bold tracking-[-0.035em] text-foreground"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        Trusted by{" "}
        <span className="bg-gradient-to-r from-[#0046C0] via-[#1d6efc] to-[#60a5fa] bg-clip-text text-transparent">
          200+ organisations
        </span>
      </motion.h2>

      <motion.p
        className="text-[16px] text-foreground/55 mt-4 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Across 12 countries, empowering healthcare transformation
      </motion.p>
    </div>

    {/* 3D Cards Grid - Using your existing TiltCard3D component */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
      {/* Card 1 - Community & Education */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        <TiltCard3D intensity={14} perspective={1200}>
          <div
            className="group h-full relative rounded-3xl border bg-white dark:bg-[#0D1525] overflow-hidden cursor-pointer"
            style={{
              borderColor: 'rgba(0,70,192,0.12)',
              boxShadow: '0 12px 48px rgba(0,0,0,0.08)',
            }}
          >
            <motion.div
              className="absolute top-0 left-0 right-0 h-[3px] origin-left z-10"
              style={{ background: 'linear-gradient(90deg, #0046C0, #1d6efc)' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
            
            <div className="p-8 md:p-10">
              {/* Icon with hover effect matching your existing patterns */}
              <motion.div
                whileHover={{ rotateX: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0046C0] to-[#1d6efc] flex items-center justify-center mb-8 shadow-lg"
              >
                <Building2 className="w-8 h-8 text-white" strokeWidth={1.5} />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4 text-foreground">Community & Education</h3>
              <p className="text-[14.5px] text-foreground/60 leading-[1.8] mb-8">
                Building the future of healthcare through education and professional development.
                Empowering next-generation medical professionals with world-class resources and mentorship programs.
              </p>
              
              {/* Feature tags */}
              <div className="flex flex-wrap gap-2">
                {["Medical Schools", "Associations", "CSR & NGOs", "Research Grants", "Fellowships"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    whileHover={{ scale: 1.05, backgroundColor: "#0046C0", color: "white" }}
                    className="text-[11.5px] font-bold px-3.5 py-1.5 rounded-full bg-[#0046C0]/10 text-[#0046C0] border border-[#0046C0]/20 cursor-default transition-all duration-200"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
            
            {/* Corner accent number */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-6 right-6 text-7xl font-black text-[#0046C0]/10 font-mono"
            >
              01
            </motion.div>
          </div>
        </TiltCard3D>
      </motion.div>

      {/* Card 2 - Medical Tourism Partners */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        <TiltCard3D intensity={14} perspective={1200}>
          <div
            className="group h-full relative rounded-3xl border bg-white dark:bg-[#0D1525] overflow-hidden cursor-pointer"
            style={{
              borderColor: 'rgba(0,70,192,0.12)',
              boxShadow: '0 12px 48px rgba(0,0,0,0.08)',
            }}
          >
            <motion.div
              className="absolute top-0 left-0 right-0 h-[3px] origin-left z-10"
              style={{ background: 'linear-gradient(90deg, #1d6efc, #60a5fa)' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            
            <div className="p-8 md:p-10">
              <motion.div
                whileHover={{ rotateX: -360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1d6efc] to-[#60a5fa] flex items-center justify-center mb-8 shadow-lg"
              >
                <Globe className="w-8 h-8 text-white" strokeWidth={1.5} />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4 text-foreground">Medical Tourism Partners</h3>
              <p className="text-[14.5px] text-foreground/60 leading-[1.8] mb-8">
                Seamless cross-border healthcare with premium hospitality and logistics coordination.
                End-to-end solutions for international patients seeking world-class medical treatment.
              </p>
              
              <div className="flex flex-wrap gap-2">
                {["Hospitals", "Travel & Airlines", "Hotels", "Concierge", "Visa", "Insurance", "Interpreters"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.04 }}
                    whileHover={{ scale: 1.05, backgroundColor: "#1d6efc", color: "white" }}
                    className="text-[11.5px] font-bold px-3.5 py-1.5 rounded-full bg-[#1d6efc]/10 text-[#1d6efc] border border-[#1d6efc]/20 cursor-default transition-all duration-200"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
            
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-6 right-6 text-7xl font-black text-[#1d6efc]/10 font-mono"
            >
              02
            </motion.div>
          </div>
        </TiltCard3D>
      </motion.div>
    </div>

    {/* Partner Logo Marquee - matches your existing MarqueeStrip style */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="relative"
    >
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="overflow-hidden py-8 rounded-2xl border bg-white/50 dark:bg-black/20 backdrop-blur-sm" style={{ borderColor: 'rgba(0,70,192,0.1)' }}>
        <motion.div
          className="flex gap-10 whitespace-nowrap"
          animate={{ x: ['0%', '-100%'] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(2)].flatMap((_, idx) =>
            [
              "Ministry of Health Malaysia",
              "KPJ Healthcare Berhad",
              "IHH Healthcare",
              "Bumrungrad International",
              "Vinmec Health System",
              "Raffles Medical Group",
              "Columbia Asia",
              "Gleneagles",
              "Mount Elizabeth Hospitals",
              "Fortis Healthcare",
            ].map((partner, i) => (
              <motion.span
                key={`${idx}-${i}`}
                whileHover={{ scale: 1.05, y: -3 }}
                className="inline-flex items-center gap-2.5 text-[13px] font-semibold px-5 py-2.5 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-sm shadow-sm border"
                style={{ color: '#0046C0', borderColor: 'rgba(0,70,192,0.15)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                {partner}
              </motion.span>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>

    {/* Trust Indicators - matches your stats grid styling */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
      className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden mt-16"
      style={{
        border: '1px solid rgba(0,70,192,0.1)',
        background: 'rgba(0,70,192,0.03)',
      }}
    >
      {[
        { value: "200+", label: "Active Partners", color: "#0046C0" },
        { value: "12", label: "Countries", color: "#1d6efc" },
        { value: "99%", label: "Satisfaction", color: "#60a5fa" },
      ].map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 + idx * 0.08 }}
          className="flex flex-col items-center py-8 px-4 bg-white/90 dark:bg-[#0D1525]/90 hover:bg-white dark:hover:bg-[#0D1525] transition-colors"
        >
          <span className="text-[32px] font-bold leading-none tracking-tight" style={{ color: stat.color }}>
            {stat.value}
          </span>
          <span className="text-[11px] text-foreground/45 mt-2 text-center font-medium uppercase tracking-wide">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>
       

        {/* ── Solutions ─────────────────────────────────────────────────────── */}
        <section className={`py-32 ${SECTION_CLS} bg-gradient-to-b from-[#F8FAFF] to-white dark:from-[#0A0F1A] dark:to-[#050811] relative overflow-hidden`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-[#0046C0]/30 to-transparent" />
          <div className="absolute -right-40 top-1/3 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,70,192,0.08) 0%, transparent 70%)', filter: 'blur(70px)' }} />

          <div className={INNER_CLS}>
            <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
              <SectionHeading
                label="Platform Solutions"
                title={
                  <>
                    Complete healthcare <br />
                    <span className="text-foreground/35 font-light">ecosystem</span>
                  </>
                }
              />
              <div>
                <p className="text-[16px] text-foreground/55 leading-[1.85]">
                  Four interconnected solutions covering every stage of the patient journey — built for
                  the ASEAN healthcare reality with local expertise.
                </p>
                <Link href="/solutions">
                  <motion.button
                    className="mt-7 inline-flex items-center gap-2 text-[14px] font-bold group"
                    style={{ color: '#0046C0' }}
                    whileHover={{ gap: '14px' }}
                    transition={{ duration: 0.2 }}
                  >
                    View all solutions <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </motion.button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {solutions.map((sol, i) => {
                const Icon = sol.icon;
                return (
                  <motion.div
                    key={sol.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ delay: i * 0.1, duration: 0.7 }}
                  >
                    <TiltCard3D intensity={14} perspective={1200}>
                      <div
                        className="group h-full relative rounded-3xl border bg-white dark:bg-[#0D1525] overflow-hidden flex flex-col cursor-pointer"
                        style={{
                          borderColor: 'rgba(0,70,192,0.12)',
                          boxShadow: '0 12px 48px rgba(0,0,0,0.08)',
                        }}
                      >
                        <motion.div
                          className="absolute top-0 left-0 right-0 h-[3px] origin-left z-10"
                          style={{ background: `linear-gradient(90deg, ${sol.accentColor}, ${sol.accentColor}88)` }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ delay: i * 0.1 + 0.5, duration: 0.8 }}
                        />
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={sol.photo}
                            alt={sol.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.75))' }} />
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-4">
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 backdrop-blur-md"
                                style={{
                                  background: `${sol.accentColor}30`,
                                  border: `1px solid ${sol.accentColor}66`,
                                }}
                              >
                                <Icon className="w-5.5 h-5.5 text-white" strokeWidth={1.8} />
                              </div>
                              <h3 className="text-[19px] font-bold text-white tracking-tight">{sol.title}</h3>
                            </div>
                          </div>
                        </div>
                        <div className="relative z-10 p-8 flex flex-col flex-1">
                          <p className="text-[14.5px] text-foreground/60 leading-[1.8] mb-6 flex-1">{sol.description}</p>
                          <div className="flex flex-wrap gap-2.5">
                            {sol.features.map((f) => (
                              <span
                                key={f}
                                className="text-[11.5px] font-bold px-3.5 py-1.5 rounded-full"
                                style={{
                                  background: `${sol.accentColor}0D`,
                                  color: sol.accentColor,
                                  border: `1px solid ${sol.accentColor}25`,
                                }}
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TiltCard3D>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Features ──────────────────────────────────────────────────────── */}
        <section className={`py-32 ${SECTION_CLS} bg-background relative overflow-hidden`}>
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(0,70,192,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }}
            />
          </div>
          <div className={INNER_CLS}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-20">
              <SectionHeading
                label="Why Choose NironCare"
                title={
                  <>
                    Built for real <br />
                    <span className="text-foreground/35 font-light">clinical workflows</span>
                  </>
                }
              />
              <p className="text-[16px] text-foreground/55 leading-[1.85] lg:pl-8">
                We designed every feature in partnership with clinicians, hospital administrators, and
                patients across 10 ASEAN countries over 3 years of research.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 40, rotateX: -8 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: i * 0.07, duration: 0.65, type: 'spring', stiffness: 200, damping: 24 }}
                  >
                    <TiltCard3D intensity={10} perspective={1000}>
                      <div
                        className="relative h-full p-7 rounded-2xl border bg-white dark:bg-[#0D1525] flex flex-col gap-5 cursor-pointer overflow-hidden group transition-all duration-300 hover:shadow-xl"
                        style={{
                          borderColor: 'rgba(0,70,192,0.1)',
                          boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: 'radial-gradient(circle at 50% 0%, rgba(0,70,192,0.06) 0%, transparent 60%)' }}
                        />
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                          style={{
                            background: 'linear-gradient(145deg, #EEF4FF, #DDEAFF)',
                            border: '1px solid rgba(0,70,192,0.15)',
                            boxShadow: '0 4px 16px rgba(0,70,192,0.12)',
                          }}
                        >
                          <Icon className="w-5.5 h-5.5" style={{ color: '#0046C0' }} strokeWidth={1.8} />
                        </div>
                        <div>
                          <h3 className="text-[17px] font-bold text-foreground mb-2.5 tracking-tight">{f.title}</h3>
                          <p className="text-[14px] text-foreground/55 leading-[1.8]">{f.desc}</p>
                        </div>
                        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#0046C0]/0 to-transparent group-hover:via-[#0046C0]/30 transition-all duration-500" />
                      </div>
                    </TiltCard3D>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── How It Works (Enhanced 3D) ───────────────────────────────────── */}
        <section className={`py-32 ${SECTION_CLS} bg-gradient-to-b from-[#F8FAFF] to-white dark:from-[#0A0F1A] dark:to-[#050811] relative overflow-hidden`}>
          <OrbitalRings />
          <div className={`relative z-10 ${INNER_CLS}`}>
            <div className="text-center mb-24">
              <SectionHeading
                center
                label="Simple Process"
                title={
                  <>
                    From registration <br />
                    <span className="text-foreground/35 font-light">to full recovery</span>
                  </>
                }
                sub="A seamless experience for patients and providers, powered by intelligent automation at every touchpoint."
              />
            </div>

            <div className="space-y-12 max-w-3xl mx-auto">
              {howItWorks.map((item, i) => {
                const Icon = item.Icon;
                return (
                  <ProcessStep3D
                    key={item.title}
                    number={String(i + 1)}
                    title={item.title}
                    description={item.desc}
                    isLast={i === howItWorks.length - 1}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────────────────────────────── */}
        <section className={`py-32 ${SECTION_CLS} relative overflow-hidden`}>
          <img
            src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1400&q=80"
            alt="Hospital"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.08 }}
            loading="lazy"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #003399 0%, #0046C0 50%, #1558e0 100%)' }} />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 55%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 45%)',
            }}
          />

          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent)', top: '-20%', left: '2%' }}
            animate={{ y: [0, -50, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent)', bottom: '-10%', right: '5%' }}
            animate={{ y: [0, -35, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />

          <div className={`relative z-10 ${INNER_CLS}`}>
            <div className="text-center mb-20">
              <motion.div
                className="flex items-center justify-center gap-3 mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="w-8 h-px bg-white/30" />
                <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-white/60">Patient & Clinician Voices</p>
                <div className="w-8 h-px bg-white/30" />
              </motion.div>
              <motion.h2
                className="text-[clamp(32px,5vw,56px)] font-bold tracking-[-0.035em] text-white"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.7 }}
              >
                What our community says
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.12, duration: 0.7 }}
                >
                  <TiltCard3D intensity={8} perspective={900} glare>
                    <div
                      className="h-full rounded-3xl p-8 flex flex-col gap-6 cursor-pointer"
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
                      }}
                    >
                      <div className="flex gap-1">
                        {Array(5)
                          .fill(0)
                          .map((_, j) => (
                            <Star key={j} className="w-4 h-4 fill-amber-300 text-amber-300" />
                          ))}
                      </div>
                      <p className="text-[15.5px] text-white/85 leading-[1.85] italic flex-1">"{t.quote}"</p>
                      <div className="flex items-center gap-4 pt-4 border-t border-white/15">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0 shadow-lg"
                          style={{ background: t.bg }}
                        >
                          {t.initials}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-[15px]">{t.name}</p>
                          <p className="text-white/50 text-[12px] mt-0.5">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </TiltCard3D>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ──────────────────────────────────────────────────────────── */}
        <section className={`py-32 ${SECTION_CLS} bg-background relative overflow-hidden`}>
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(#0046C0 1px, transparent 1px), linear-gradient(90deg, #0046C0 1px, transparent 1px)',
              backgroundSize: '70px 70px',
            }}
          />
          <div className={`relative z-10 ${INNER_CLS}`}>
            <div className="text-center mb-20">
              <SectionHeading
                center
                label="Leadership Team"
                title={
                  <>
                    The people behind <br />
                    <span className="text-foreground/35 font-light">NironCare</span>
                  </>
                }
                sub="Clinicians, engineers, and operators united by a single mission — making world-class healthcare accessible to every patient in Southeast Asia."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: i * 0.09, duration: 0.7 }}
                >
                  <TiltCard3D intensity={12} perspective={1100}>
                    <div
                      className="h-full rounded-3xl border bg-white dark:bg-[#0D1525] overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl"
                      style={{
                        borderColor: 'rgba(0,70,192,0.1)',
                        boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
                      }}
                    >
                      <div className="relative h-72 overflow-hidden">
                        <img
                          src={member.img}
                          alt={member.name}
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.85))' }} />
                        <div className="absolute top-6 left-6">
                          <span
                            className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-md"
                            style={{ background: member.color, letterSpacing: '0.14em' }}
                          >
                            {member.dept}
                          </span>
                        </div>
                        <div className="absolute bottom-6 left-7">
                          <h3 className="text-[18px] font-bold text-white tracking-tight">{member.name}</h3>
                          <p className="text-[12.5px] text-white/65 mt-1 font-medium">{member.role}</p>
                        </div>
                      </div>
                      <div className="p-7">
                        <p className="text-[14px] text-foreground/60 leading-[1.82]">{member.bio}</p>
                        <div className="mt-6 pt-4 border-t flex items-center gap-3" style={{ borderColor: 'rgba(0,70,192,0.1)' }}>
                          <div className="w-1 h-8 rounded-full" style={{ background: member.color }} />
                          <span className="text-[11.5px] font-bold text-foreground/45 uppercase tracking-wider">{member.dept}</span>
                        </div>
                      </div>
                    </div>
                  </TiltCard3D>
                </motion.div>
              ))}
            </div>

            <motion.div className="text-center mt-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <Link href="/about">
                <motion.button
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[14.5px] font-bold border text-foreground bg-white dark:bg-white/5 backdrop-blur-sm"
                  style={{ borderColor: 'rgba(0,70,192,0.2)' }}
                  whileHover={{ scale: 1.04, y: -2, borderColor: 'rgba(0,70,192,0.5)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Meet the full team <ArrowRight className="w-4.5 h-4.5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className={`py-32 ${SECTION_CLS} bg-gradient-to-b from-[#F8FAFF] to-white dark:from-[#0A0F1A] dark:to-[#050811]`}>
          <div className={INNER_CLS}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  label="Frequently Asked"
                  title={
                    <>
                      Common <br />
                      <span className="text-foreground/35 font-light">questions answered</span>
                    </>
                  }
                  sub="Can't find what you're looking for? Our clinical partnership team is available 9–6 across ASEAN time zones."
                />
                <div className="mt-12 flex flex-col gap-4">
                  <Link href="/contact">
                    <motion.button
                      className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[14.5px] font-bold text-white shadow-lg"
                      style={{ background: '#0046C0', boxShadow: '0 8px 28px rgba(0,70,192,0.4)' }}
                      whileHover={{ scale: 1.04, y: -2, boxShadow: '0 12px 36px rgba(0,70,192,0.5)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Talk to our team <ArrowRight className="w-4.5 h-4.5" />
                    </motion.button>
                  </Link>
                  <div className="flex items-center gap-2.5 text-[13px] text-foreground/45 mt-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Average response time: 2 business hours
                  </div>
                </div>
              </div>
              <FAQ />
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}