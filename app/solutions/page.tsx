'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  motion, AnimatePresence, useScroll, useTransform,
  useSpring, useMotionValue, useInView
} from 'framer-motion';
import {
  ArrowRight, CheckCircle2, Building2, Video, BrainCircuit, HeartPulse,
  Shield, Clock, Activity, ChevronRight, Zap, Lock, Globe, BarChart3,
  Layers, ThumbsUp, X, Calendar, Users, Bell, FileText,
  TrendingUp, Award, Star, Sparkles, Rocket, Target, Laptop,
  MessageCircle, ChevronDown, Play
} from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CTA } from '@/components/cta';

// ─── Custom SVG Icons ────────────────────────────────────────────────────────
const Database = ({ className, ...p }: any) => (
  <svg className={className} {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);
const PhoneIcon = ({ className, ...p }: any) => (
  <svg className={className} {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);
const HeartIcon = ({ className, ...p }: any) => (
  <svg className={className} {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

// ─── Data ────────────────────────────────────────────────────────────────────
const solutions = [
  {
    id: 'smart-queue',
    icon: Building2,
    title: 'Smart Queue Management',
    color: '#0046C0',
    colorRgb: '0,70,192',
    badge: 'Most Popular',
    tagline: 'Operational Efficiency',
    description: 'AI-driven patient queuing reduces wait times by 60%, transforming clinic flow from reactive to predictive.',
    fullDescription: `Revolutionize your patient flow with our intelligent queue management system. Powered by machine learning trained on millions of patient interactions, Smart Queue dynamically prioritizes patients based on medical urgency, appointment type, and historical data patterns.`,
    longDescription: `Eliminate waiting room anxiety and transform patient experience. Our system provides real-time updates via SMS, app notifications, and digital displays. Clinic staff get intelligent workload balancing suggestions, while administrators access comprehensive analytics on throughput, wait times, and patient satisfaction.`,
    benefits: [
      { text: '60% average wait time reduction', icon: Clock, highlight: true },
      { text: 'Real-time SMS & push notifications', icon: Bell },
      { text: 'AI-powered priority triage system', icon: BrainCircuit },
      { text: 'Multi-clinic & multi-location support', icon: Building2 },
      { text: 'Digital check-in kiosks & mobile check-in', icon: PhoneIcon },
      { text: 'Queue analytics & forecasting', icon: BarChart3 },
      { text: 'Staff workload balancing', icon: Users },
      { text: 'Walk-in & appointment integration', icon: Calendar }
    ],
    metrics: [
      { value: '60%', label: 'Wait Time Reduction', icon: Clock },
      { value: '94%', label: 'Patient Satisfaction', icon: Star },
      { value: '98%', label: 'Queue Accuracy', icon: Target },
      { value: '45k+', label: 'Daily Patients', icon: Users }
    ],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80'
  },
  {
    id: 'tele-consult',
    icon: Video,
    title: 'Tele Consultation',
    color: '#0046C0',
    colorRgb: '0,70,192',
    badge: 'New',
    tagline: 'Remote Care Delivery',
    description: 'HIPAA-compliant HD video consultations connecting patients with specialists across borders, securely.',
    fullDescription: `Connect patients with specialists anywhere through our HIPAA-compliant telemedicine platform. Crystal-clear HD video with end-to-end encryption, screen sharing, and integrated clinical documentation.`,
    longDescription: `Break geographical barriers and expand your reach. Our teleconsultation solution supports multi-participant calls, e-prescriptions, digital lab referrals, and automated follow-ups. Patients consult from any device while doctors access complete medical histories and real-time vitals integration.`,
    benefits: [
      { text: 'End-to-end encrypted HD video', icon: Lock, highlight: true },
      { text: 'E-prescriptions & digital signatures', icon: FileText },
      { text: 'Cross-border consultation ready', icon: Globe },
      { text: 'Multi-participant calls', icon: Users },
      { text: 'Lab referral integration', icon: Activity },
      { text: 'Recording & transcription (with consent)', icon: Video },
      { text: 'Waiting room management', icon: Clock },
      { text: 'Multi-device support', icon: Laptop }
    ],
    metrics: [
      { value: '10+', label: 'Countries Served', icon: Globe },
      { value: '92%', label: 'Patient Satisfaction', icon: Star },
      { value: '45%', label: 'Cost Reduction', icon: TrendingUp },
      { value: '24/7', label: 'Availability', icon: Clock }
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80'
  },
  {
    id: 'ai-diagnosis',
    icon: BrainCircuit,
    title: 'AI Diagnosis Support',
    color: '#0046C0',
    colorRgb: '0,70,192',
    badge: 'AI-Powered',
    tagline: 'Clinical Decision Intelligence',
    description: 'Evidence-based diagnostic assistance trained on 12M+ ASEAN patient records, augmenting clinician judgment.',
    fullDescription: `Augment clinical decision-making with our advanced AI diagnostic system. Trained on 12M+ ASEAN patient records, our model provides evidence-based differential diagnoses, drug interaction alerts, and treatment recommendations.`,
    longDescription: `Reduce cognitive load and improve diagnostic accuracy. The AI analyzes symptoms, medical history, vitals, and lab results to suggest potential conditions ranked by probability. Clinicians maintain full control while benefiting from instant access to relevant medical literature and clinical guidelines.`,
    benefits: [
      { text: '12M+ ASEAN patient records trained', icon: Database, highlight: true },
      { text: 'Differential diagnosis suggestions', icon: BrainCircuit },
      { text: 'Drug interaction checker', icon: Shield },
      { text: 'ICD-11 automated coding', icon: FileText },
      { text: 'Clinical decision support', icon: Target },
      { text: 'Evidence-based recommendations', icon: Award },
      { text: 'Risk factor analysis', icon: Activity },
      { text: 'Treatment pathway suggestions', icon: TrendingUp }
    ],
    metrics: [
      { value: '94%', label: 'Diagnostic Accuracy', icon: Target },
      { value: '40%', label: 'Time Saved', icon: Clock },
      { value: '87%', label: 'Clinician Adoption', icon: Users },
      { value: '12M+', label: 'Patient Records', icon: Database }
    ],
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=80'
  },
  {
    id: 'post-care',
    icon: HeartPulse,
    title: 'Post-Care Follow-up',
    color: '#0046C0',
    colorRgb: '0,70,192',
    badge: 'Life-Saving',
    tagline: 'Continuous Patient Monitoring',
    description: 'Intelligent post-discharge monitoring with automated check-ins and real-time escalation protocols.',
    fullDescription: `Ensure no patient falls through the cracks with intelligent post-discharge monitoring. Automated check-ins, medication reminders, and symptom tracking with real-time escalation to care teams.`,
    longDescription: `Transform patient outcomes with personalized recovery journeys. Our system delivers automated follow-up sequences based on condition, procedure, and risk level. Caregivers receive updates, patients stay engaged, and clinicians get alerts for concerning trends before they become emergencies.`,
    benefits: [
      { text: 'Automated medication reminders', icon: Bell, highlight: true },
      { text: 'Vital signs monitoring', icon: Activity },
      { text: 'Readmission risk alerts', icon: Shield },
      { text: 'Caregiver portal access', icon: Users },
      { text: 'Personalised recovery plans', icon: Target },
      { text: 'Adherence tracking & reporting', icon: BarChart3 },
      { text: 'Automated check-ins', icon: MessageCircle },
      { text: 'Emergency escalation protocols', icon: Rocket }
    ],
    metrics: [
      { value: '94%', label: 'Medication Adherence', icon: ThumbsUp },
      { value: '32%', label: 'Readmission Reduction', icon: TrendingUp },
      { value: '87%', label: 'Patient Engagement', icon: Users },
      { value: '24/7', label: 'Monitoring', icon: Clock }
    ],
    image: 'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=1200&q=80'
  }
];

const additionalSolutions = [
  { icon: Zap, title: '60% Faster Queue', desc: 'AI scheduling reduces average clinic wait times significantly', stat: '-60%' },
  { icon: Lock, title: 'End-to-End Encrypted', desc: 'Bank-level security protocols protecting all patient data', stat: '256-bit' },
  { icon: Globe, title: '10+ Countries', desc: 'Localised platform available in 8 regional languages', stat: '10+' },
  { icon: BarChart3, title: 'Real-time Analytics', desc: 'Live operational dashboards with actionable clinical insights', stat: 'Live' },
  { icon: Layers, title: '40+ EMR Integrations', desc: 'Seamless data integration with existing healthcare systems', stat: '40+' },
  { icon: ThumbsUp, title: '94% Adherence Score', desc: 'Industry-leading patient medication adherence metric', stat: '94%' },
];



// ─── 3D Tilt Hook ────────────────────────────────────────────────────────────
function use3DTilt(strength = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), { stiffness: 260, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), { stiffness: 260, damping: 28 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const onMouseLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}

// ─── Animated Number ─────────────────────────────────────────────────────────
function AnimCount({ value, inView }: { value: string; inView: boolean }) {
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) { setDisplay(value); return; }
    const suffix = value.replace(/[0-9.]/g, '');
    let cur = 0;
    const step = num / 36;
    const t = setInterval(() => {
      cur = Math.min(cur + step, num);
      setDisplay(`${Math.floor(cur)}${suffix}`);
      if (cur >= num) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [inView, value]);
  return <>{display}</>;
}

// ─── Hero ECG Line SVG ───────────────────────────────────────────────────────
function ECGLine() {
  return (
    <svg viewBox="0 0 1200 80" className="w-full h-full" preserveAspectRatio="none">
      <motion.path
        d="M0,40 L200,40 L220,40 L240,10 L260,70 L280,20 L300,60 L320,40 L500,40 L520,40 L540,10 L560,70 L580,20 L600,60 L620,40 L800,40 L820,40 L840,10 L860,70 L880,20 L900,60 L920,40 L1200,40"
        fill="none"
        stroke="rgba(0,70,192,0.4)"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', repeatDelay: 1 }}
      />
    </svg>
  );
}

// ─── Solution Card ────────────────────────────────────────────────────────────
function SolutionCard({ feature, onClick, index }: {
  feature: typeof solutions[0]; onClick: () => void; index: number;
}) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = use3DTilt(8);
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-60px' });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="relative cursor-pointer group h-full"
      >
        {/* Lifted shadow */}
        <div className="absolute inset-x-4 -bottom-3 h-12 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"
          style={{ background: 'rgba(0,70,192,0.18)' }} />

        <div className="relative h-full rounded-2xl overflow-hidden border border-slate-200/70 dark:border-slate-700/50 bg-white dark:bg-slate-900"
          style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)' }}>

          {/* Subtle hover sheen */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(0,70,192,0.02) 0%, transparent 60%)' }} />

          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <motion.img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            {/* Clinical overlay — darkens bottom, adds subtle blue tint */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,20,60,0.65) 100%)'
            }} />

            {/* Badge */}
            {feature.badge && (
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase border border-white/20 text-white"
                  style={{ background: 'rgba(0,70,192,0.75)', backdropFilter: 'blur(8px)' }}>
                  {feature.badge}
                </span>
              </div>
            )}

            {/* Bottom image content */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/20"
                  style={{ background: 'rgba(0,70,192,0.7)', backdropFilter: 'blur(12px)' }}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-white/70 tracking-wide">{feature.tagline}</span>
              </div>
              {/* Live indicator */}
              <div className="flex items-center gap-1.5">
                <div className="relative w-1.5 h-1.5">
                  <div className="absolute inset-0 rounded-full bg-emerald-400" />
                  <motion.div className="absolute inset-0 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity }} />
                </div>
                <span className="text-[11px] text-white/60">Active</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
              {feature.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
              {feature.description}
            </p>

            {/* 2-metric preview */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {feature.metrics.slice(0, 2).map((m, i) => (
                <div key={i} className="rounded-xl p-3 border border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40">
                  <div className="text-lg font-black text-slate-900 dark:text-white tracking-tight"
                    style={{ color: '#0046C0' }}>{m.value}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{m.label}</div>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400 dark:text-slate-500">Enterprise-ready</span>
              <motion.button
                className="flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: '#0046C0' }}
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                View details <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Solution Modal ───────────────────────────────────────────────────────────
function SolutionModal({ feature, onClose, onRequestDemo }: { feature: typeof solutions[0]; onClose: () => void; onRequestDemo: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'benefits' | 'metrics'>('overview');
  const metricsRef = useRef(null);
  const metricsInView = useInView(metricsRef, { once: true });
  const Icon = feature.icon;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center"
        style={{ background: 'rgba(4,12,32,0.92)', backdropFilter: 'blur(20px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative max-w-4xl w-full mx-4 my-8"
          onClick={e => e.stopPropagation()}
        >
          {/* Blue glow behind */}
          <div className="absolute -inset-4 rounded-[2.5rem] blur-3xl opacity-30"
            style={{ background: 'rgba(0,70,192,0.5)' }} />

          <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900"
            style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,70,192,0.15)' }}>

            {/* Close */}
            <motion.button onClick={onClose}
              className="absolute top-5 right-5 z-30 w-8 h-8 rounded-full flex items-center justify-center text-white border border-white/20"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
              whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}>
              <X className="w-4 h-4" />
            </motion.button>

            {/* Hero */}
            <div className="relative h-64 md:h-72 overflow-hidden">
              <motion.img src={feature.image} alt={feature.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.08 }} animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,20,60,0.8) 70%, rgba(0,30,90,0.95) 100%)'
              }} />
              <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-9">
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 220 }}
                    className="w-14 h-14 rounded-xl flex items-center justify-center border border-white/20 flex-shrink-0"
                    style={{ background: 'rgba(0,70,192,0.7)', backdropFilter: 'blur(12px)' }}>
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-300 mb-1">{feature.tagline}</span>
                    <motion.h2 initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl md:text-3xl font-black text-white tracking-tight">{feature.title}</motion.h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-slate-900">
              <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 md:px-8">
                {[
                  { id: 'overview', label: 'Overview', icon: Activity },
                  { id: 'benefits', label: 'Benefits', icon: Award },
                  { id: 'metrics', label: 'Performance', icon: BarChart3 },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                    className="relative flex items-center gap-2 px-4 py-4 text-sm font-semibold transition-colors whitespace-nowrap"
                    style={{ color: activeTab === tab.id ? '#0046C0' : undefined }}
                  >
                    {activeTab !== tab.id
                      ? <span className="flex items-center gap-2 text-slate-400 dark:text-slate-500"><tab.icon className="w-4 h-4" />{tab.label}</span>
                      : <><tab.icon className="w-4 h-4" />{tab.label}</>
                    }
                    {activeTab === tab.id && (
                      <motion.div layoutId="mTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t"
                        style={{ background: '#0046C0' }} />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-6 md:p-8 min-h-[240px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div key="ov"
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.22 }} className="space-y-4"
                    >
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.fullDescription}</p>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{feature.longDescription}</p>
                      <div className="grid sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                            <div className="w-4 h-4 rounded" style={{ background: '#0046C0' }} />
                            Key Capabilities
                          </h4>
                          <ul className="space-y-2">
                            {feature.benefits.slice(0, 4).map((b, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#0046C0' }} />
                                {b.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                            <div className="w-4 h-4 rounded" style={{ background: '#0046C0' }} />
                            Who Benefits
                          </h4>
                          <ul className="space-y-2">
                            {['Hospital Administrators', 'Clinicians & Specialists', 'Patients & Caregivers'].map((who, i) => (
                              <li key={i} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#0046C0' }} />
                                {who}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'benefits' && (
                    <motion.div key="bn"
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.22 }} className="grid sm:grid-cols-2 gap-3"
                    >
                      {feature.benefits.map((b, i) => {
                        const BI = b.icon;
                        return (
                          <motion.div key={i}
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors"
                            style={b.highlight ? { borderColor: 'rgba(0,70,192,0.2)', background: 'rgba(0,70,192,0.03)' } : {}}>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: 'rgba(0,70,192,0.08)' }}>
                              <BI className="w-4 h-4" style={{ color: '#0046C0' }} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{b.text}</p>
                              {b.highlight && <p className="text-xs mt-0.5 font-medium" style={{ color: '#0046C0' }}>Primary advantage</p>}
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}

                  {activeTab === 'metrics' && (
                    <motion.div key="mt" ref={metricsRef}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.22 }}
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {feature.metrics.map((m, i) => {
                          const MI = m.icon;
                          return (
                            <motion.div key={i}
                              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: i * 0.07, type: 'spring', stiffness: 240 }}
                              className="text-center p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 group/m hover:border-blue-200 dark:hover:border-blue-800/40 transition-colors"
                            >
                              <div className="inline-flex p-2 rounded-lg mb-2" style={{ background: 'rgba(0,70,192,0.08)' }}>
                                <MI className="w-4 h-4" style={{ color: '#0046C0' }} />
                              </div>
                              <div className="text-2xl font-black tracking-tight mb-0.5" style={{ color: '#0046C0' }}>
                                <AnimCount value={m.value} inView={metricsInView} />
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">{m.label}</div>
                            </motion.div>
                          );
                        })}
                      </div>
                      <div className="p-5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">Calculate Your ROI</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">See projected savings with {feature.title}</p>
                        <Link href="/contact">
                          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white"
                            style={{ background: '#0046C0' }}>
                            Request ROI Analysis <ArrowRight className="w-3.5 h-3.5" />
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div className="border-t border-slate-100 dark:border-slate-800 p-6 md:p-8 bg-slate-50/40 dark:bg-slate-800/20">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <motion.button 
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onClose();
                        onRequestDemo();
                      }}
                      className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2"
                      style={{ background: '#0046C0', boxShadow: '0 4px 16px rgba(0,70,192,0.3)' }}>
                      Request a Demo <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <Link href="/partnership" className="flex-1">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border-2 transition-colors"
                      style={{ borderColor: '#0046C0', color: '#0046C0' }}>
                      Become a Partner <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
                <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-3">
                  Free consultation · No commitment · Enterprise-grade security
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Tool Card ────────────────────────────────────────────────────────────────
function ToolCard({ feature, index }: { feature: typeof additionalSolutions[0]; index: number }) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = use3DTilt(6);
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-40px' });
  const Icon = feature.icon;

  return (
    <motion.div ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}
    >
      <motion.div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
        className="group h-full"
      >
        <div className="relative h-full p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/50 bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-800/40"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>

          {/* Hover state: very subtle blue wash */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
            style={{ background: 'linear-gradient(135deg, rgba(0,70,192,0.03) 0%, transparent 70%)' }} />

          {/* Stat — top right, monospace, muted */}
          <div className="absolute top-5 right-5 text-xs font-mono font-bold tracking-wider text-slate-300 dark:text-slate-700 select-none">
            {feature.stat}
          </div>

          <div className="relative flex flex-col h-full">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 group-hover:border-blue-200 dark:group-hover:border-blue-800/40 transition-colors">
              <Icon className="w-4.5 h-4.5 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" style={{ width: 18, height: 18 }} />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{feature.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">{feature.desc}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Demo Modal ───────────────────────────────────────────────────────────────
function DemoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] overflow-y-auto flex items-center justify-center"
        style={{ background: 'rgba(4,12,32,0.92)', backdropFilter: 'blur(20px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative max-w-md w-full mx-4 my-8"
          onClick={e => e.stopPropagation()}
        >
          <div className="absolute -inset-4 rounded-[2.5rem] blur-3xl opacity-30"
            style={{ background: 'rgba(0,70,192,0.5)' }} />

          <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900"
            style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,70,192,0.15)' }}>

            <motion.button
              onClick={onClose}
              className="absolute top-5 right-5 z-30 w-8 h-8 rounded-full flex items-center justify-center text-white border border-white/20"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4" />
            </motion.button>

            <div className="p-6">
              <div className="text-left">
                <div className="w-12 h-12 rounded-xl bg-[#0046C0]/10 flex items-center justify-center mb-4">
                  <ArrowRight className="w-6 h-6 text-[#0046C0]" />
                </div>
                <h3 className="text-slate-900 dark:text-white text-xl font-semibold mb-2">Request a Demo</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  See how NironCare can transform your healthcare practice. Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              <form className="space-y-4 mt-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                  <input type="text" placeholder="John Doe" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0046C0] focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0046C0] focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Organization / Practice Name</label>
                  <input type="text" placeholder="e.g., City General Hospital" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0046C0] focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0046C0] focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Interested In</label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0046C0] focus:border-transparent">
                    <option>Smart Queue Management</option>
                    <option>Tele Consultation</option>
                    <option>AI Diagnosis Support</option>
                    <option>Post-Care Follow-up</option>
                    <option>Full Platform Suite</option>
                  </select>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 bg-[#0046C0] hover:bg-[#0039a6] text-white shadow-lg shadow-[#0046C0]/25"
                >
                  Submit Request <ArrowRight className="w-4 h-4" />
                </motion.button>
                <p className="text-xs text-center text-slate-400 dark:text-slate-500 mt-3">
                  By submitting, you agree to our Privacy Policy. We'll never share your information.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SolutionsPage() {
  const [selectedFeature, setSelectedFeature] = useState<typeof solutions[0] | null>(null);
  const [activeFeatureId, setActiveFeatureId] = useState<string | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroImgY = useTransform(scrollY, [0, 600], [0, 80]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const f = solutions.find(s => s.id === hash);
      if (f) { setSelectedFeature(f); setActiveFeatureId(f.id); }
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const f = solutions.find(s => s.id === hash);
        if (f) { setSelectedFeature(f); setActiveFeatureId(f.id); }
      } else { setSelectedFeature(null); setActiveFeatureId(null); }
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const handleClick = (feature: typeof solutions[0]) => {
    setSelectedFeature(feature);
    setActiveFeatureId(feature.id);
    window.history.pushState({}, '', `#${feature.id}`);
  };

  const handleClose = () => {
    setSelectedFeature(null);
    setActiveFeatureId(null);
    window.history.pushState({}, '', window.location.pathname);
  };

  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-white dark:bg-[#06080F]">

        {/* ── HERO ──────────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden">

          {/* Background: clean clinical gradient — NOT space */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-white dark:bg-[#06080F]" />
            {/* Soft blue light from top-right — feels like a clean medical bay */}
            <div className="absolute top-0 right-0 w-[60%] h-[70%] opacity-[0.07] dark:opacity-[0.12]"
              style={{ background: 'radial-gradient(ellipse at top right, #0046C0 0%, transparent 70%)' }} />
            {/* Gentle warmth bottom-left */}
            <div className="absolute bottom-0 left-0 w-[40%] h-[50%] opacity-[0.04] dark:opacity-[0.06]"
              style={{ background: 'radial-gradient(ellipse at bottom left, #0046C0 0%, transparent 70%)' }} />
          </div>

          {/* Subtle grid — feels like a precision medical instrument UI */}
          <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, #0046C0 60px, #0046C0 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, #0046C0 60px, #0046C0 61px)`
            }} />

          {/* ECG line — health tech signature */}
          <div className="absolute bottom-0 left-0 right-0 h-20 opacity-60">
            <ECGLine />
          </div>

          {/* Right: large clinical imagery panel */}
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block overflow-hidden"
            style={{ y: heroImgY }}
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=85"
                alt="Doctor using technology"
                className="w-full h-full object-cover object-left"
              />
              {/* Mask left edge cleanly */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(90deg, white 0%, transparent 35%, transparent 100%)'
              }} />
              <div className="dark:block hidden absolute inset-0" style={{
                background: 'linear-gradient(90deg, #06080F 0%, transparent 35%, transparent 100%)'
              }} />
              {/* Clinical data overlay — numbers floating over the image */}
              <div className="absolute top-12 right-12 space-y-3">
                {[
                  { label: 'PATIENTS TODAY', val: '2,847', up: true },
                  { label: 'AVG WAIT TIME', val: '4.2 min', up: false },
                  { label: 'SATISFACTION', val: '97.3%', up: true },
                ].map((d, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.15 }}
                    className="px-4 py-3 rounded-xl border border-white/20 dark:border-white/10 backdrop-blur-md"
                    style={{ background: 'rgba(255,255,255,0.85)' }}
                  >
                    <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-0.5">{d.label}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-slate-900 tracking-tight">{d.val}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={{ background: d.up ? '#dcfce7' : '#fef2f2', color: d.up ? '#15803d' : '#dc2626' }}>
                        {d.up ? '↑' : '↓'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Left: Copy */}
          <div className="relative z-10 w-full lg:w-1/2 px-6 sm:px-8 lg:px-16 xl:px-20 pt-32 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2.5 mb-8"
              >
                <div className="w-5 h-px bg-blue-600" />
                <span className="text-xs font-bold tracking-widest uppercase text-blue-600">
                  Healthcare Technology Platform
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-6xl xl:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-[1.05] tracking-tight"
              >
                Everything you need,
                <span className="block" style={{ color: '#0046C0' }}>nothing you don't.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed max-w-md"
              >
                Enterprise-grade clinical solutions for practices of any scale — built for Southeast Asia, trusted by leading hospital networks.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(0,70,192,0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsDemoModalOpen(true)}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-bold text-sm tracking-wide"
                  style={{ background: '#0046C0', boxShadow: '0 4px 16px rgba(0,70,192,0.25)' }}
                >
                  Request a Demo <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-slate-700 dark:text-slate-300 font-semibold text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                >
                  View Solutions
                  <motion.span animate={{ y: [0, 3, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </motion.button>
              </motion.div>

              {/* Trust bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-5 mt-12 pt-8 border-t border-slate-100 dark:border-slate-800"
              >
                {[
                  { val: '10+', label: 'Countries' },
                  { val: '45k+', label: 'Daily Patients' },
                  { val: '99.9%', label: 'Uptime SLA' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{s.val}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── SOLUTIONS GRID ──────────────────────────────────────────────────── */}
        <section id="solutions" className="py-24 scroll-mt-20 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section header */}
            <div className="mb-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-5 h-px bg-blue-600" />
                  <span className="text-xs font-bold tracking-widest uppercase text-blue-600">Core Platform</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                  Core Platform Solutions
                </h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Select any solution to explore its clinical impact, integration capabilities, and measurable outcomes.
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {solutions.map((feature, index) => (
                <SolutionCard
                  key={feature.id}
                  feature={feature}
                  onClick={() => handleClick(feature)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── ADDITIONAL TOOLS ────────────────────────────────────────────────── */}
        <section className="py-24 bg-white dark:bg-[#06080F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-5 h-px bg-blue-600" />
                  <span className="text-xs font-bold tracking-widest uppercase text-blue-600">Platform Capabilities</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                  Built for modern<br />clinical operations.
                </h2>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed lg:text-right"
              >
                Every feature purpose-built for the complexity of Southeast Asian healthcare workflows.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {additionalSolutions.map((feature, i) => (
                <ToolCard key={i} feature={feature} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── INTEGRATIONS ────────────────────────────────────────────────────── */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className=" items-center">

              {/* Left: copy */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-5 h-px bg-blue-600" />
                  <span className="text-xs font-bold tracking-widest uppercase text-blue-600">Integrations</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-5">
                  Connects with your<br />existing stack.
                </h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-md">
                  40+ certified integrations with the leading EMR, HIS, and practice management systems across Southeast Asia — deployed without disrupting existing workflows.
                </p>

                <div className="flex items-center gap-4 mb-8">
                  <div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white">40+</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">EMR Systems</div>
                  </div>
                  <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />
                  <div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white">8</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Languages</div>
                  </div>
                  <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />
                  <div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white">HL7</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">FHIR Compliant</div>
                  </div>
                </div>

                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(0,70,192,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm"
                    style={{ background: '#0046C0' }}
                  >
                    Talk to our integration team <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Right: integration grid */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {/* Integration tiles — clean, not colorful */}
               
                {/* "And many more" */}
               
              </motion.div>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />

      {/* Solution Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <SolutionModal 
            feature={selectedFeature} 
            onClose={handleClose}
            onRequestDemo={() => setIsDemoModalOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Demo Modal */}
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  );
}