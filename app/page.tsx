'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Globe,
  TrendingUp,
  Zap,
  Building2,
  Video,
  BrainCircuit,
  HeartPulse,
  Play,
  ShieldCheck,
  Clock,
  Activity,
  ChevronRight,
  Star,
  Wifi,
  Bell,
  Search,
  Home as HomeIcon,
  Calendar,
  Stethoscope,
  User,
  Cpu,
  BarChart3,
  Pill,
  Phone,
  Signal,
  Battery,
  AlertCircle,
  CheckCircle,
  ClipboardList,
  Timer,
} from 'lucide-react';

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut', delay },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: 48 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * value));
      if (progress < 1) requestAnimationFrame(step);
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
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #0046C0, #0060FF, #60A5FA)',
      }}
    />
  );
}

// ─── PHONE MOCKUP ─────────────────────────────────────────────────────────────

function PhoneMockup() {
  return (
    <div className="relative flex justify-center items-center select-none">
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,70,192,0.22) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="relative z-10"
        style={{
          width: 248,
          height: 504,
          borderRadius: 44,
          background: 'linear-gradient(160deg, #1c2136 0%, #0d1020 60%, #111827 100%)',
          boxShadow:
            '0 0 0 1.5px rgba(255,255,255,0.09), 0 56px 112px rgba(0,0,0,0.45), 0 28px 56px rgba(0,70,192,0.22), inset 0 1px 0 rgba(255,255,255,0.07)',
          padding: 10,
        }}
      >
        <div style={{ position: 'absolute', right: -3, top: 104, width: 3, height: 38, borderRadius: '0 3px 3px 0', background: 'rgba(255,255,255,0.13)' }} />
        <div style={{ position: 'absolute', right: -3, top: 154, width: 3, height: 38, borderRadius: '0 3px 3px 0', background: 'rgba(255,255,255,0.10)' }} />
        <div style={{ position: 'absolute', left: -3, top: 128, width: 3, height: 54, borderRadius: '3px 0 0 3px', background: 'rgba(255,255,255,0.10)' }} />

        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 34,
            background: '#F4F6FB',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', width: 74, height: 22, borderRadius: 12, background: '#0d1020', zIndex: 20 }} />

          <div style={{ height: 36, background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 0 14px', borderBottom: '1px solid #EEF0F6' }}>
            <span style={{ fontFamily: 'system-ui', fontSize: 11, fontWeight: 700, color: '#0a0f1e', letterSpacing: '-0.01em' }}>9:41</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Signal size={11} color="#0a0f1e" strokeWidth={2.5} />
              <Wifi size={11} color="#0a0f1e" strokeWidth={2.5} />
              <Battery size={12} color="#0a0f1e" strokeWidth={2.5} />
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '12px 14px 10px', borderBottom: '1px solid #EEF0F6' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(135deg,#0046C0,#0060FF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HeartPulse size={14} color="#fff" strokeWidth={2} />
                </div>
                <span style={{ fontFamily: 'system-ui', fontSize: 15, fontWeight: 700, color: '#0046C0', letterSpacing: '-0.02em' }}>NironCare</span>
              </div>
              <div style={{ position: 'relative', width: 30, height: 30, borderRadius: 9, background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bell size={14} color="#0046C0" strokeWidth={2} />
                <div style={{ position: 'absolute', top: 5, right: 5, width: 6, height: 6, borderRadius: '50%', background: '#EF4444', border: '1.5px solid #fff' }} />
              </div>
            </div>
            <div style={{ fontFamily: 'system-ui', fontSize: 11, color: '#8a99b8', fontWeight: 400 }}>
              Good morning, <strong style={{ color: '#0a0f1e', fontWeight: 600 }}>Aditya</strong>
            </div>
          </div>

          <div style={{ margin: '10px 14px', background: '#EEF2FF', borderRadius: 11, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 7, border: '1px solid rgba(0,70,192,0.08)' }}>
            <Search size={13} color="#8a99b8" strokeWidth={2} />
            <span style={{ fontFamily: 'system-ui', fontSize: 11, color: '#8a99b8' }}>Search doctors, clinics…</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ margin: '0 14px 10px', borderRadius: 16, background: 'linear-gradient(135deg, #0046C0 0%, #0060FF 100%)', padding: '13px 13px 11px', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', right: -20, top: -20, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', left: -10, bottom: -16, pointerEvents: 'none' }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: 'system-ui', fontSize: 9.5, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.07em', textTransform: 'uppercase', fontWeight: 500 }}>Your Queue Status</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.14)', borderRadius: 100, padding: '2px 8px' }}>
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.6 }} style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ADE80' }} />
                <span style={{ fontFamily: 'system-ui', fontSize: 9, fontWeight: 600, color: '#fff' }}>Live</span>
              </div>
            </div>

            <div style={{ fontFamily: 'system-ui', fontSize: 30, fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: 2, letterSpacing: '-0.03em' }}>#03</div>
            <div style={{ fontFamily: 'system-ui', fontSize: 10, color: 'rgba(255,255,255,0.60)', marginBottom: 10 }}>Orthopedic · Sunway Medical, Floor 3</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
              {[{ val: '8m', lbl: 'Est. Wait' }, { val: '2', lbl: 'Ahead' }, { val: '↓60%', lbl: 'Wait saved' }].map(s => (
                <div key={s.lbl} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 9, padding: '6px 4px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'system-ui', fontSize: 12, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontFamily: 'system-ui', fontSize: 8.5, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div style={{ margin: '0 14px 8px', background: '#EEF4FF', borderRadius: 10, padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 7 }}>
            <Cpu size={12} color="#0046C0" strokeWidth={2} />
            <span style={{ fontFamily: 'system-ui', fontSize: 9.5, color: '#0046C0', fontWeight: 500, whiteSpace: 'nowrap' }}>AI optimising</span>
            <div style={{ flex: 1, height: 3, background: 'rgba(0,70,192,0.15)', borderRadius: 4, overflow: 'hidden' }}>
              <motion.div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg,#0046C0,#0060FF)' }} initial={{ width: 0 }} animate={{ width: '60%' }} transition={{ delay: 1.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
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
                transition={{ delay: 0.9 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#ffffff', borderRadius: 11, padding: '8px 10px', border: '1px solid #EEF0F6' }}
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

          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#ffffff', borderTop: '1px solid #EEF0F6', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '8px 0 14px' }}>
            {[
              { Icon: HomeIcon, label: 'Home', active: true },
              { Icon: Calendar, label: 'Appts', active: false },
              { Icon: Stethoscope, label: 'Consult', active: false },
              { Icon: User, label: 'Profile', active: false },
            ].map(({ Icon, label, active }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Icon size={18} color={active ? '#0046C0' : '#8a99b8'} strokeWidth={active ? 2.5 : 1.8} />
                <span style={{ fontFamily: 'system-ui', fontSize: 8.5, color: active ? '#0046C0' : '#8a99b8', fontWeight: active ? 600 : 400 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── FLOATING BADGE ───────────────────────────────────────────────────────────

function FloatingBadge({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl px-3.5 py-2.5 z-20 ${className}`}
      style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)' }}
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { delay: delay + 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        scale: { delay: delay + 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        y: { delay: delay + 1.0, repeat: Infinity, duration: 4.5 + delay * 0.5, ease: 'easeInOut' },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── SOLUTION ILLUSTRATIONS ───────────────────────────────────────────────────

function QueueIllustration() {
  return (
    <div className="w-full px-5 flex flex-col gap-2.5 justify-center">
      {[
        { label: 'Siti Rahman', status: 'In Consultation', pct: 100, color: '#0046C0', Icon: CheckCircle2 },
        { label: 'Thanh Nguyen', status: 'Est. 8 min', pct: 72, color: '#059669', Icon: Timer },
        { label: 'Aditya Sharma', status: 'Est. 20 min', pct: 38, color: '#D97706', Icon: Clock },
      ].map((p, i) => (
        <motion.div key={p.label} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.13, duration: 0.55 }} className="flex items-center gap-2.5">
          <p.Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: p.color }} strokeWidth={2.5} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-semibold text-foreground/70 truncate">{p.label}</span>
              <span className="text-[9px] font-bold ml-2 flex-shrink-0" style={{ color: p.color }}>{p.status}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
              <motion.div className="h-full rounded-full" style={{ background: p.color }} initial={{ width: 0 }} animate={{ width: `${p.pct}%` }} transition={{ delay: 0.5 + i * 0.13, duration: 1, ease: 'easeOut' }} />
            </div>
          </div>
        </motion.div>
      ))}
      <p className="text-[9px] text-foreground/35 text-center mt-1 font-medium">AI reduced wait by 60% today</p>
    </div>
  );
}

function TeleIllustration() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4">
      <div className="flex items-center gap-4 w-full">
        <div className="flex-1 rounded-xl overflow-hidden border border-blue-100 dark:border-blue-900/40 bg-gradient-to-b from-blue-50 to-blue-100/60 dark:from-blue-950/40 dark:to-blue-900/20 p-3 text-center">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-1.5">
            <Stethoscope size={18} color="#fff" strokeWidth={1.8} />
          </div>
          <div className="text-[9px] font-semibold text-blue-800 dark:text-blue-300">Dr. Maya</div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[8px] text-green-700 dark:text-green-400 font-medium">Available</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          {[1, 2, 3].map(i => (
            <motion.div key={i} className="rounded-full" style={{ width: 18, height: 2, background: '#0046C0' }} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.18 }} />
          ))}
          <Wifi size={12} color="#0046C0" strokeWidth={2} />
        </div>
        <div className="flex-1 rounded-xl overflow-hidden border border-purple-100 dark:border-purple-900/40 bg-gradient-to-b from-purple-50 to-purple-100/60 dark:from-purple-950/40 dark:to-purple-900/20 p-3 text-center">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-1.5">
            <User size={18} color="#fff" strokeWidth={1.8} />
          </div>
          <div className="text-[9px] font-semibold text-purple-800 dark:text-purple-300">Patient</div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[8px] text-green-700 dark:text-green-400 font-medium">Connected</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-[9px] text-foreground/40 font-medium">
        <ShieldCheck size={10} strokeWidth={2} />
        HD Encrypted · E-Prescription ready
      </div>
    </div>
  );
}

function AIIllustration() {
  const nodes = [
    { x: 50, y: 18, r: 9, label: 'AI' },
    { x: 18, y: 52, r: 6, label: '' },
    { x: 82, y: 52, r: 6, label: '' },
    { x: 32, y: 82, r: 5, label: '' },
    { x: 68, y: 82, r: 5, label: '' },
  ];
  const edges = [[0,1],[0,2],[1,3],[2,4],[1,4],[2,3]];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-2">
      <svg viewBox="0 0 100 95" className="w-full h-20" fill="none">
        {edges.map(([a, b], i) => (
          <motion.line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#0046C0" strokeWidth={0.9} strokeOpacity={0.3} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 0.3 + i * 0.09, duration: 0.55 }} />
        ))}
        {nodes.map((n, i) => (
          <motion.circle key={i} cx={n.x} cy={n.y} r={n.r} fill={i === 0 ? '#0046C0' : '#EEF4FF'} stroke="#0046C0" strokeWidth={1} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15 + i * 0.09, duration: 0.4, ease: 'backOut' }} />
        ))}
        <text x="50" y="22" textAnchor="middle" fontSize="5.5" fill="white" fontWeight="700">AI</text>
      </svg>
      <p className="text-[9px] text-foreground/40 font-medium mt-1">Evidence-Based Diagnostic Analysis</p>
    </div>
  );
}

function CareIllustration() {
  return (
    <div className="w-full px-4 flex flex-col gap-2.5 justify-center">
      {[
        { label: 'Medication taken', done: true, time: '8:00 AM', Icon: Pill },
        { label: 'Blood pressure logged', done: true, time: '10:30 AM', Icon: Activity },
        { label: 'Follow-up call', done: false, time: '2:00 PM', Icon: Phone },
      ].map((item, i) => (
        <motion.div key={item.label} initial={{ x: 14, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.13 }} className="flex items-center gap-2.5">
          <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-green-500' : 'border-2 border-dashed border-foreground/20'}`}>
            {item.done && <CheckCircle size={10} className="text-white" strokeWidth={3} />}
          </div>
          <item.Icon size={11} className="flex-shrink-0 text-foreground/40" strokeWidth={2} />
          <span className={`text-[10px] font-medium flex-1 ${item.done ? 'text-foreground/45 line-through' : 'text-foreground/75'}`}>{item.label}</span>
          <span className="text-[9px] text-foreground/30 flex-shrink-0">{item.time}</span>
        </motion.div>
      ))}
      <p className="text-[9px] text-foreground/35 text-center mt-1 font-medium">Adherence score: 94%</p>
    </div>
  );
}

// ─── SOLUTION CARD (two sizes) ────────────────────────────────────────────────

interface SolutionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  index: number;
  accentColor: string;
  illustration: React.ReactNode;
  large?: boolean;
}

function SolutionCard({ icon: Icon, title, description, features, index, accentColor, illustration, large = false }: SolutionCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      custom={index * 0.08}
      variants={cardReveal}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`group relative rounded-3xl border bg-white dark:bg-[#0D1525] overflow-hidden cursor-default ${large ? 'flex flex-col md:flex-row' : 'flex flex-col'}`}
      style={{
        borderColor: 'rgba(0,0,0,0.07)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
      }}
      whileHover={{ y: -5, boxShadow: `0 20px 50px rgba(0,0,0,0.10), 0 6px 20px ${accentColor}1A` }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {/* Animated top border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left"
        style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}44)` }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: index * 0.08 + 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accentColor}08, transparent 70%)` }}
      />

      {/* Illustration */}
      <div
        className={`${large ? 'md:w-[260px] flex-shrink-0' : ''} flex items-center justify-center overflow-hidden`}
        style={{
          background: 'linear-gradient(135deg, #F8FAFC, #F0F4FF)',
          minHeight: large ? 'auto' : 130,
          borderBottom: large ? 'none' : '1px solid rgba(0,0,0,0.05)',
          borderRight: large ? '1px solid rgba(0,0,0,0.05)' : 'none',
        }}
      >
        <div className={`w-full ${large ? 'py-8 px-6' : 'py-5 px-5'}`}>
          {illustration}
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{ background: `${accentColor}14`, border: `1px solid ${accentColor}28` }}
          >
            <Icon className="w-4.5 h-4.5" style={{ color: accentColor }} strokeWidth={1.8} />
          </div>
          <span className="text-[10px] font-bold tracking-[0.14em] text-foreground/20 uppercase mt-1">0{index + 1}</span>
        </div>

        <h3 className="text-[17px] font-bold text-foreground tracking-tight mb-2.5 leading-snug">{title}</h3>
        <p className="text-[13px] text-foreground/55 leading-relaxed mb-5 flex-1">{description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {features.map(f => (
            <span key={f} className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full transition-colors duration-200" style={{ background: `${accentColor}0F`, color: accentColor, border: `1px solid ${accentColor}22` }}>
              {f}
            </span>
          ))}
        </div>

        <motion.div
          className="flex items-center gap-1.5 text-[12px] font-semibold"
          style={{ color: accentColor }}
          initial={{ opacity: 0, x: -6 }}
          whileHover={{ x: 4 }}
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">Learn more</span>
          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── MARQUEE STRIP ────────────────────────────────────────────────────────────

function MarqueeStrip() {
  const items = ['Smart Queue', 'AI Triage', 'Video Consult', 'E-Prescriptions', 'HIPAA Compliant', 'Post-Care Follow-up', 'Real-time Updates', 'SOC 2 Certified', 'ASEAN Ready', 'Medication Alerts'];
  return (
    <div className="overflow-hidden py-5 border-y border-foreground/6 bg-foreground/[0.015]">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-[12px] font-semibold text-foreground/35 uppercase tracking-[0.1em]">
            <span className="w-1 h-1 rounded-full bg-[#0046C0]/40" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.97]);

  const phoneYSpring = useSpring(phoneY, { stiffness: 70, damping: 22 });
  const copyYSpring = useSpring(copyY, { stiffness: 70, damping: 22 });

  const solutions = [
    {
      icon: Building2,
      title: 'Smart Queue Management',
      description: 'AI-driven patient queuing reduces wait times by 60% and improves clinic throughput through intelligent priority triage.',
      features: ['Real-time Updates', 'Priority Triage', 'SMS Alerts'],
      accentColor: '#0046C0',
      illustration: <QueueIllustration />,
      large: true,
    },
    {
      icon: Video,
      title: 'Tele Consultation',
      description: 'Secure HD video consultations connecting patients with specialists instantly. E-prescriptions and records shared seamlessly.',
      features: ['HD Video', 'E-Prescriptions', 'Medical Records'],
      accentColor: '#7C3AED',
      illustration: <TeleIllustration />,
    },
    {
      icon: BrainCircuit,
      title: 'AI Diagnosis Support',
      description: 'ML-powered diagnostic assistance surfaces evidence-based recommendations, reducing clinical cognitive load.',
      features: ['Symptom Analysis', 'Risk Assessment', 'Evidence-Based'],
      accentColor: '#0891B2',
      illustration: <AIIllustration />,
    },
    {
      icon: HeartPulse,
      title: 'Post-Care Follow-up',
      description: 'Automated health monitoring and personalised follow-up sequences ensure no patient falls through the cracks post-discharge.',
      features: ['Health Reminders', 'Progress Tracking', 'Medication Alerts'],
      accentColor: '#DC2626',
      illustration: <CareIllustration />,
    },
  ];

  const stats = [
    { value: 50, suffix: 'K+', label: 'Active Patients' },
    { value: 84, suffix: '%', label: 'Success Rate' },
    { value: 10, suffix: '+', label: 'Countries' },
    { value: 99, suffix: '.9%', label: 'Uptime SLA' },
  ];

  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main className="overflow-hidden bg-background">

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#EDF3FF] via-[#F8FAFF] to-background dark:from-[#060D1F] dark:via-[#080F1E] dark:to-background pointer-events-none" />

          {/* Animated grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(0,70,192,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,70,192,0.04) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 80%)',
            }}
          />

          <motion.div className="absolute -top-28 -right-24 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,96,255,0.15) 0%, transparent 65%)', y: orbY1 }} />
          <motion.div className="absolute top-1/3 -left-44 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,70,192,0.10) 0%, transparent 65%)', y: orbY2 }} />
          <motion.div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)', y: orbY3 }} />

          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

              {/* LEFT */}
              <motion.div style={{ y: copyYSpring }} variants={stagger} initial="hidden" animate="visible" className="space-y-7">

                {/* Badge */}
                <motion.div variants={fadeUp} custom={0}>
                  <motion.span
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12.5px] font-semibold border"
                    style={{ background: 'rgba(0,70,192,0.08)', borderColor: 'rgba(0,70,192,0.18)', color: '#0046C0' }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.span className="w-1.5 h-1.5 rounded-full bg-[#0046C0]" animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} />
                    AI-Powered · ASEAN Healthcare Platform
                  </motion.span>
                </motion.div>

                {/* Headline with letter animation */}
                <motion.h1
                  variants={fadeUp}
                  custom={0.1}
                  className="text-[clamp(38px,5.5vw,64px)] font-black leading-[1.06] tracking-[-0.04em] text-foreground"
                >
                  Healthcare<br />
                  <span className="font-light text-foreground/38">without</span>{' '}
                  <motion.span
                    style={{
                      background: 'linear-gradient(135deg, #0046C0 0%, #0060FF 55%, #60A5FA 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  >
                    boundaries.
                  </motion.span>
                </motion.h1>

                <motion.p variants={fadeUp} custom={0.2} className="text-[16px] text-foreground/55 leading-[1.75] max-w-[460px] font-light">
                  From queue to follow-up — our AI platform connects patients to care across Southeast Asia. Smarter triage, instant consultations, automated recovery.
                </motion.p>

                {/* CTA */}
                <motion.div variants={fadeUp} custom={0.3} className="flex flex-col sm:flex-row gap-3 pt-1">
                  <Link href="/partnership">
                    <motion.button
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[14px] text-[14.5px] font-semibold text-white"
                      style={{ background: 'linear-gradient(135deg, #0046C0, #0060FF)', boxShadow: '0 4px 20px rgba(0,70,192,0.35)' }}
                      whileHover={{ scale: 1.025, boxShadow: '0 8px 32px rgba(0,70,192,0.45)' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Schedule Demo
                      <motion.span animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </motion.button>
                  </Link>
                  <motion.button
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[14px] text-[14.5px] font-medium text-foreground border border-foreground/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm"
                    whileHover={{ scale: 1.015, backgroundColor: 'rgba(255,255,255,0.85)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    See how it works
                  </motion.button>
                </motion.div>

                {/* Trust */}
                <motion.div variants={fadeUp} custom={0.38} className="flex items-center gap-4">
                  <div className="flex -space-x-2.5">
                    {[{ initials: 'DR', bg: '#3B82F6' }, { initials: 'KL', bg: '#8B5CF6' }, { initials: 'AP', bg: '#10B981' }, { initials: 'SN', bg: '#F59E0B' }].map((a, i) => (
                      <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6 + i * 0.07, duration: 0.4, ease: 'backOut' }} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-[10px] font-bold" style={{ background: a.bg }}>
                        {a.initials}
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-[12.5px] text-foreground/50">
                    <span className="font-semibold text-foreground">50,000+</span> patients trust NironCare
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {Array(5).fill(0).map((_, i) => (
                        <motion.div key={i} initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.9 + i * 0.05, duration: 0.3, ease: 'backOut' }}>
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        </motion.div>
                      ))}
                      <span className="ml-1 text-foreground/38">4.9 / 5</span>
                    </div>
                  </div>
                </motion.div>

                {/* Stats */}
                <motion.div variants={fadeUp} custom={0.46}>
                  <div className="grid grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.07)', background: 'rgba(0,0,0,0.04)' }}>
                    {stats.map(({ value, suffix, label }, i) => (
                      <motion.div
                        key={label}
                        className="flex flex-col items-center py-4 px-2 bg-white/70 dark:bg-foreground/4 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-foreground/8 transition-colors cursor-default"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
                      >
                        <span className="text-[21px] font-black leading-none tracking-tight" style={{ color: '#0046C0' }}>
                          <AnimatedCounter value={value} suffix={suffix} />
                        </span>
                        <span className="text-[9.5px] text-foreground/40 mt-1.5 text-center font-medium leading-tight">{label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* RIGHT */}
              <motion.div
                className="relative flex justify-center lg:justify-end"
                style={{ y: phoneYSpring }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              >
                <FloatingBadge className="-top-2 left-4 lg:-left-10" delay={0}>
                  <motion.span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
                  <span className="text-[12px] font-semibold text-foreground/85">Dr. Maya is available</span>
                </FloatingBadge>

                <FloatingBadge className="-bottom-2 right-2 lg:-right-6" delay={0.7}>
                  <Activity className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span className="text-[12px] font-semibold text-foreground/85">AI efficiency <span className="text-blue-600 font-bold">↑ 23%</span> this week</span>
                </FloatingBadge>

                <FloatingBadge className="top-1/2 -right-4 lg:-right-12 -translate-y-16" delay={1.3}>
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                  <span className="text-[12px] font-semibold text-foreground/85">HIPAA Compliant</span>
                </FloatingBadge>

                <PhoneMockup />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── MARQUEE ── */}
        <MarqueeStrip />

        {/* ── SOLUTIONS ── */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#F5F7FA] dark:bg-[#080F1E] relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#0046C0]/30 to-transparent" />

          {/* Subtle background pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,70,192,0.12) 1px, transparent 0)`,
              backgroundSize: '28px 28px',
            }}
          />

          <div className="max-w-7xl mx-auto relative">
            {/* Section header */}
            <motion.div
              className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-6 items-end"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
            >
              <div>
                <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: '#0046C0' }}>
                  Our Platform
                </motion.p>
                <motion.h2 variants={fadeUp} custom={0.1} className="text-[clamp(28px,4vw,44px)] font-black tracking-[-0.03em] leading-tight text-foreground">
                  Complete healthcare<br />
                  <span className="text-foreground/40 font-light">ecosystem</span>
                </motion.h2>
              </div>
              <motion.div variants={fadeUp} custom={0.2}>
                <p className="text-[15px] text-foreground/55 leading-relaxed font-light">
                  Four interconnected solutions covering every stage of the patient journey — built for the ASEAN healthcare reality.
                </p>
                <Link href="/solutions">
                  <motion.button
                    className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold"
                    style={{ color: '#0046C0' }}
                    whileHover={{ gap: '10px' }}
                    transition={{ duration: 0.2 }}
                  >
                    View all solutions <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* ── ASYMMETRIC BENTO GRID ── */}
            {/* Row 1: Large card (60%) + two stacked cards (40%) */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">
              {/* Large feature card — Queue Management */}
              <div className="lg:col-span-3">
                <SolutionCard {...solutions[0]} index={0} />
              </div>

              {/* Two stacked smaller cards */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                <SolutionCard {...solutions[1]} index={1} />
                <SolutionCard {...solutions[2]} index={2} />
              </div>
            </div>

            {/* Row 2: Full-width accent card */}
            <motion.div
              className="relative rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0f24 0%, #0d1530 100%)' }} />
              <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 80% 50%, rgba(220,38,38,0.12) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(0,70,192,0.10) 0%, transparent 50%)` }} />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Left: content */}
                <div className="p-8 lg:p-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.30)' }}>
                      <HeartPulse className="w-5 h-5" style={{ color: '#EF4444' }} strokeWidth={1.8} />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.14em] text-white/20 uppercase mt-1">04</span>
                  </div>

                  <h3 className="text-[22px] font-bold text-white tracking-tight mb-3 leading-snug">Post-Care Follow-up</h3>
                  <p className="text-[14px] text-white/55 leading-relaxed mb-6">Automated health monitoring and personalised follow-up sequences ensure no patient falls through the cracks post-discharge.</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Health Reminders', 'Progress Tracking', 'Medication Alerts'].map(f => (
                      <span key={f} className="text-[10.5px] font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(220,38,38,0.15)', color: '#FCA5A5', border: '1px solid rgba(220,38,38,0.25)' }}>{f}</span>
                    ))}
                  </div>

                  <motion.button
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-red-400"
                    whileHover={{ gap: '10px' }}
                    transition={{ duration: 0.2 }}
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>

                {/* Right: illustration */}
                <div className="flex items-center justify-center p-8 border-t md:border-t-0 md:border-l border-white/5">
                  <div className="w-full max-w-[260px]">
                    <div className="flex flex-col gap-3">
                      {[
                        { label: 'Medication taken', done: true, time: '8:00 AM', Icon: Pill },
                        { label: 'Blood pressure logged', done: true, time: '10:30 AM', Icon: Activity },
                        { label: 'Follow-up call', done: false, time: '2:00 PM', Icon: Phone },
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ x: 14, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.13 }}
                          className="flex items-center gap-3 rounded-xl px-4 py-3"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                        >
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-green-500' : 'border-2 border-dashed border-white/25'}`}>
                            {item.done && <CheckCircle size={10} className="text-white" strokeWidth={3} />}
                          </div>
                          <item.Icon size={12} className="flex-shrink-0 text-white/30" strokeWidth={2} />
                          <span className={`text-[11px] font-medium flex-1 ${item.done ? 'text-white/35 line-through' : 'text-white/75'}`}>{item.label}</span>
                          <span className="text-[10px] text-white/25 flex-shrink-0">{item.time}</span>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 }}
                      className="mt-4 rounded-xl px-4 py-3 text-center"
                      style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.20)' }}
                    >
                      <span className="text-[12px] font-bold text-green-400">Adherence score: 94%</span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Bottom animated accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #DC2626, #EF4444, transparent)' }}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              />
            </motion.div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
          {/* Decorative diagonal */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/8 to-transparent" />

          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: '#0046C0' }}>Simple Process</motion.p>
              <motion.h2 variants={fadeUp} custom={0.1} className="text-[clamp(28px,4vw,44px)] font-black tracking-[-0.03em] leading-tight text-foreground">
                From registration to recovery
              </motion.h2>
              <motion.p variants={fadeUp} custom={0.2} className="mt-4 text-[15px] text-foreground/48 font-light max-w-lg mx-auto leading-relaxed">
                A seamless experience for patients and providers, powered by intelligent automation at every touchpoint.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connector */}
              <div className="hidden md:block absolute top-[46px] left-[calc(16.666%+32px)] right-[calc(16.666%+32px)] h-px z-0">
                <motion.div
                  className="h-full"
                  style={{ background: 'linear-gradient(90deg, #0046C0/25, #0046C0/15, #0046C0/25)' }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                />
              </div>

              {[
                { Icon: Clock, title: 'Register & Queue', desc: 'Patients register via app or web. AI assigns priority, estimates wait time, and sends real-time SMS updates — zero waiting room anxiety.' },
                { Icon: Wifi, title: 'Consult & Diagnose', desc: 'In-person or via HD video. AI-assisted diagnosis surfaces relevant data so clinicians focus on care — not paperwork.' },
                { Icon: ShieldCheck, title: 'Follow-up & Recover', desc: 'Automated post-care sequences. Medication reminders, progress check-ins, and escalation alerts ensure no patient is forgotten.' },
              ].map((item, i) => {
                const ref = useRef(null);
                const inView = useInView(ref, { once: true, margin: '-60px' });
                return (
                  <motion.div
                    key={item.title}
                    ref={ref}
                    initial={{ opacity: 0, y: 36 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.18, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 flex flex-col items-center text-center group"
                  >
                    <motion.div
                      className="w-24 h-24 rounded-3xl mb-6 flex items-center justify-center relative"
                      style={{ background: 'linear-gradient(145deg, #EEF4FF, #DCEAFF)', border: '1px solid rgba(0,70,192,0.10)' }}
                      whileHover={{ scale: 1.06, rotate: 2 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    >
                      <item.Icon className="w-8 h-8" style={{ color: '#0046C0' }} strokeWidth={1.6} />
                      <motion.span
                        className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full text-[10px] font-black text-white flex items-center justify-center"
                        style={{ background: '#0046C0' }}
                        animate={inView ? { scale: [0, 1.3, 1] } : { scale: 0 }}
                        transition={{ delay: i * 0.18 + 0.4, duration: 0.5, ease: 'backOut' }}
                      >
                        {i + 1}
                      </motion.span>
                    </motion.div>
                    <h3 className="text-[17px] font-bold text-foreground tracking-tight mb-3">{item.title}</h3>
                    <p className="text-[13.5px] text-foreground/48 leading-relaxed font-light max-w-[240px]">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL ── */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #003398 0%, #0046C0 45%, #0060FF 100%)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 18% 50%, rgba(255,255,255,0.055) 0%, transparent 50%), radial-gradient(circle at 82% 18%, rgba(255,255,255,0.04) 0%, transparent 40%)` }} />
          <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`, backgroundSize: '44px 44px' }} />

          {/* Floating orbs inside CTA */}
          <motion.div
            className="absolute w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent)', top: '-5%', left: '10%' }}
            animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04), transparent)', bottom: '5%', right: '15%' }}
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <motion.div
            className="relative z-10 max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-[80px] leading-none text-white/12 font-serif mb-4 select-none">"</motion.div>
            <motion.p variants={fadeUp} custom={0.1} className="text-[clamp(17px,2.2vw,23px)] text-white/88 font-light leading-relaxed italic mb-10 max-w-2xl mx-auto">
              NironCare cut our average consultation wait from 45 minutes to under 10. Our patients are happier, our doctors are less burnt out, and clinic revenue grew 34% in a single year.
            </motion.p>
            <motion.div variants={fadeUp} custom={0.2} className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/14">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/18 text-white text-[12px] font-bold">PR</div>
              <div className="text-left">
                <p className="text-white font-semibold text-[13.5px]">Dr. Priya Ramalingam</p>
                <p className="text-white/52 text-[11.5px]">Medical Director · Apex Health KL</p>
              </div>
              <div className="ml-2 flex gap-0.5">
                {Array(5).fill(0).map((_, i) => (
                  <motion.div key={i} initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.06, ease: 'backOut', duration: 0.3 }}>
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── CTA ── */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 75% 55% at 50% 50%, rgba(0,70,192,0.05) 0%, transparent 70%)' }} />

          <motion.div
            className="relative z-10 max-w-2xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.16em] uppercase mb-5" style={{ color: '#0046C0' }}>Get started today</motion.p>
            <motion.h2 variants={fadeUp} custom={0.1} className="text-[clamp(30px,4.5vw,56px)] font-black tracking-[-0.04em] leading-tight text-foreground mb-5">
              Ready to transform<br />healthcare?
            </motion.h2>
            <motion.p variants={fadeUp} custom={0.2} className="text-[16px] text-foreground/48 font-light mb-10 max-w-lg mx-auto leading-relaxed">
              Join hundreds of clinics and hospitals delivering better, faster, smarter care with NironCare.
            </motion.p>

            <motion.div variants={fadeUp} custom={0.3} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/partnership">
                <motion.button
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-[14px] text-[14.5px] font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #0046C0, #0060FF)', boxShadow: '0 4px 20px rgba(0,70,192,0.35)' }}
                  whileHover={{ scale: 1.025, boxShadow: '0 8px 32px rgba(0,70,192,0.48)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Schedule a Demo <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <motion.button
                className="inline-flex items-center gap-2 px-7 py-4 rounded-[14px] text-[14.5px] font-medium text-foreground border border-foreground/10 bg-foreground/3"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Sales
              </motion.button>
            </motion.div>

            <motion.div variants={fadeUp} custom={0.4} className="mt-12 flex flex-wrap gap-6 justify-center">
              {['HIPAA Compliant', 'SOC 2 Certified', 'PDPA Ready', '99.9% SLA'].map((b, i) => (
                <motion.div
                  key={b}
                  className="flex items-center gap-2 text-[11.5px] font-semibold text-foreground/36"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.07 }}
                >
                  <ShieldCheck className="w-3.5 h-3.5" style={{ color: '#0046C0' }} />
                  {b}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}