// app/health-insight/page.tsx
'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Calendar, ArrowRight, Bookmark, Share2, Clock, Quote,
  TrendingUp, Rss, Mail, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCallback } from 'react';
import { Navbar } from '@/components/navbar';
import { articles } from './articles';
import { Footer } from '@/components/footer';
import { CTA } from '@/components/cta';



const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 }
};

function TiltCard({ children, className = '', depth = 10 }: {
  children: React.ReactNode; className?: string; depth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * depth}deg) rotateX(${-y * depth}deg) scale3d(1.015,1.015,1.015)`;
  }, [depth]);
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className={className} style={{ transition: 'transform 0.28s ease', willChange: 'transform' }}>
      {children}
    </div>
  );
}

function SectionRule({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-10">
      <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700" />
      <span className="text-[10px] font-black uppercase tracking-[.2em] text-slate-400 dark:text-slate-500">
        {label}
      </span>
      <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700" />
    </div>
  );
}

const categoryColors: Record<string, string> = {
  'Healthcare Innovation': 'bg-blue-600 text-white',
  'Research': 'bg-emerald-600 text-white',
  'Policy': 'bg-slate-700 text-white',
  'Culture': 'bg-violet-600 text-white',
  'Sustainability': 'bg-teal-600 text-white',
  'Technology': 'bg-indigo-600 text-white',
};

const sidebarQuotes = [
  { text: 'NironCare has transformed how I serve my rural patients. Specialists are now just minutes away.', author: 'Dr. Sokphea', location: 'Phnom Penh, Cambodia', role: 'Primary Care Physician' },
  { text: 'Access to quality healthcare should not depend on geography or wealth. This platform proves it\'s possible.', author: 'Nurse Linh', location: 'Ho Chi Minh City, Vietnam', role: 'Clinical Director' },
  { text: 'The AI diagnosis support has helped me catch complications early. My patients trust the system.', author: 'Dr. Ravi Mehta', location: 'Bangkok, Thailand', role: 'Internal Medicine' },
];

export default function HealthInsight() {
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const glass = 'backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-white/50 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/30';

  const toggleSave = (title: string) => {
    setSaved(prev => {
      const next = new Set(prev);
      next.has(title) ? next.delete(title) : next.add(title);
      return next;
    });
  };

  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-[#F8F6F1] dark:bg-[#070c14] text-slate-900 dark:text-slate-100">

        {/* HERO SECTION */}
         <section ref={heroRef} className="relative min-h-[62vh] flex items-end overflow-hidden">
          <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=1800&q=85"
              alt="Healthcare insights hero"
              fill className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-slate-900/20" />
          </motion.div>

          <motion.div style={{ opacity: heroOpacity }}
            className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-16 pt-36">
            <motion.div variants={fadeUp} initial="hidden" animate="visible"
              className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 max-w-[60px] bg-white/40" />
              <span className="text-white/50 text-[11px] font-bold tracking-[.22em] uppercase">
                Vol. 5 · Thursday, May 28, 2025 · Health Insights & Research
              </span>
              <div className="h-px flex-1 max-w-[60px] bg-white/40" />
            </motion.div>
            <motion.h1
  variants={fadeUp} initial="hidden" animate="visible"
              className="text-5xl sm:text-7xl font-black text-white leading-[1.02] tracking-tight max-w-4xl"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              The NironCare<br />
              <span className="italic font-light text-blue-300">Health Journal</span>
            </motion.h1>
           <motion.p variants={fadeUp} initial="hidden" animate="visible"
              className="mt-4 text-lg text-slate-300 max-w-2xl leading-relaxed">
              Research, insights, and stories from digital healthcare transformation in Southeast Asia —
              read by 50,000 clinicians and healthcare leaders monthly.
            </motion.p>
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" />
        </section>

        {/* MAIN CONTENT */}
        <section className="py-12 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] font-black uppercase tracking-[.25em] text-slate-500 dark:text-slate-400">
              Today's Edition
            </span>
            <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700" />
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Rss className="w-3 h-3" /> {articles.length} articles
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
            {/* LEFT COLUMN */}
            <div>
              {/* LEAD STORY */}
              <motion.article key={articles[0].title} variants={fadeUp} initial="hidden" whileInView="visible">
                <TiltCard depth={6}>
                  <Link href={`/health-insight/${articles[0].id}`}>
                    <div className={`${glass} rounded-2xl overflow-hidden group cursor-pointer`}>
                      <div className="relative h-80 sm:h-[420px]">
                        <Image src={articles[0].img} alt={articles[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute top-5 left-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${categoryColors[articles[0].category]}`}>
                            {articles[0].category}
                          </span>
                        </div>
                        <div className="absolute top-5 right-5">
                          <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider">Lead Story</span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-7">
                          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-3">{articles[0].title}</h2>
                          <div className="flex items-center gap-4 text-white/60 text-[12px]">
                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {articles[0].date}</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {articles[0].readTime} read</span>
                            <span>By <strong className="text-white/80">{articles[0].author}</strong></span>
                          </div>
                        </div>
                      </div>
                      <div className="p-7">
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px] border-l-2 border-blue-500 pl-4">
                          {articles[0].excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-200 dark:border-white/10">
                          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                            Read Full Article <ChevronRight className="w-4 h-4" />
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => toggleSave(articles[0].title)} className={`p-2 rounded-lg transition-colors ${saved.has(articles[0].title) ? 'bg-blue-500/10 text-blue-600' : 'hover:bg-slate-100 dark:hover:bg-white/8 text-slate-400'}`}>
                              <Bookmark className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/8 text-slate-400 transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.article>

              <SectionRule label="Latest Articles" />

              {/* 2-column grid */}
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {articles.slice(1, 3).map((article, i) => (
                  <motion.article key={article.title} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <TiltCard depth={10} className="h-full">
                      <Link href={`/health-insight/${article.id}`}>
                        <div className={`${glass} rounded-2xl overflow-hidden h-full flex flex-col group cursor-pointer hover:border-blue-400/30 transition-colors duration-300`}>
                          <div className="relative h-44 flex-shrink-0">
                            <Image src={article.img} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-3 left-3">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${categoryColors[article.category]}`}>
                                {article.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                              <span>{article.date}</span><span>·</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                            </div>
                            <h3 className="font-black text-slate-800 dark:text-white text-[15px] leading-snug mb-2 flex-1">{article.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-[12.5px] leading-relaxed mb-4">{article.excerpt.slice(0, 120)}…</p>
                            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/10">
                              <span className="text-[11px] text-slate-400">By <strong className="text-slate-600 dark:text-slate-300">{article.author}</strong></span>
                              <div className="flex items-center gap-1">
                                <button onClick={(e) => { e.preventDefault(); toggleSave(article.title); }} className={`p-1.5 rounded-lg transition-colors ${saved.has(article.title) ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                                  <Bookmark className="w-3.5 h-3.5" />
                                </button>
                                <span className="flex items-center gap-1 text-[12px] font-semibold text-blue-600 dark:text-blue-400">
                                  Read <ArrowRight className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </TiltCard>
                  </motion.article>
                ))}
              </div>

              {/* Pull Quote */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="my-10 py-8 border-y-2 border-slate-800 dark:border-white/20 text-center px-8">
                <Quote className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                <blockquote className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white leading-tight">
                  "AI diagnosis support reduces antibiotic prescriptions by 45% — without compromising patient outcomes."
                </blockquote>
                <cite className="mt-4 block text-[12px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold not-italic">
                  — NironCare Clinical Research Report, Q1 2025
                </cite>
              </motion.div>

              <SectionRule label="More Stories" />

              {/* 3-column grid */}
              <div className="grid sm:grid-cols-3 gap-5">
                {articles.slice(3).map((article, i) => (
                  <motion.article key={article.title} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <TiltCard depth={12} className="h-full">
                      <Link href={`/health-insight/${article.id}`}>
                        <div className={`${glass} rounded-xl overflow-hidden h-full flex flex-col group cursor-pointer hover:border-blue-400/30 transition-colors`}>
                          <div className="relative h-32 flex-shrink-0">
                            <Image src={article.img} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute bottom-2 left-2">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${categoryColors[article.category]}`}>
                                {article.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-4 flex flex-col flex-1">
                            <div className="text-[10px] text-slate-400 mb-1.5 flex items-center gap-1.5">
                              <Calendar className="w-2.5 h-2.5" />{article.date}
                            </div>
                            <h3 className="font-black text-slate-800 dark:text-white text-[13px] leading-snug flex-1">{article.title}</h3>
                            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-200 dark:border-white/10">
                              <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{article.readTime}</span>
                              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-0.5">
                                Read <ArrowRight className="w-2.5 h-2.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </TiltCard>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="space-y-8">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`${glass} rounded-xl overflow-hidden`}>
                <div className="px-5 py-3 bg-slate-800 dark:bg-slate-900">
                  <p className="text-[10px] font-black uppercase tracking-[.22em] text-white/60">In This Edition</p>
                </div>
                <div className="divide-y divide-slate-200 dark:divide-white/10">
                  {articles.map((a, i) => (
                    <Link key={a.title} href={`/health-insight/${a.id}`}>
                      <div className="flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                        <span className="text-[11px] font-black text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0 w-4">{String(i + 1).padStart(2, '0')}</span>
                        <p className="text-[12.5px] font-semibold text-slate-700 dark:text-slate-300 leading-snug group-hover:text-blue-600 transition-colors">{a.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`${glass} rounded-xl overflow-hidden`}>
                <div className="px-5 py-3 bg-blue-600">
                  <p className="text-[10px] font-black uppercase tracking-[.22em] text-white/80 flex items-center gap-2"><Mail className="w-3 h-3" /> Weekly Dispatch</p>
                </div>
                <div className="p-5">
                  <h4 className="font-black text-slate-800 dark:text-white text-[15px] mb-2">Stay Informed</h4>
                  <p className="text-[12.5px] text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">Get the week's top healthcare insights delivered every Monday.</p>
                  <AnimatePresence mode="wait">
                    {subscribed ? (
                      <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-3">
                        <p className="text-green-600 dark:text-green-400 font-bold text-sm">✓ You're subscribed!</p>
                      </motion.div>
                    ) : (
                      <motion.div key="form" className="space-y-2.5">
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-white/8 border border-slate-200 dark:border-white/15 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-[13px]" />
                        <Button onClick={() => { if (email.includes('@')) setSubscribed(true); }} className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-[13px] py-2.5">
                          Subscribe Free
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Quotes */}
              <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`${glass} rounded-xl overflow-hidden`}>
                <div className="px-5 py-3 border-b border-slate-200 dark:border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-[.22em] text-slate-500 dark:text-slate-400">From the Field</p>
                </div>
                <div className="divide-y divide-slate-200 dark:divide-white/10">
                  {sidebarQuotes.map((q) => (
                    <div key={q.author} className="p-5">
                      <Quote className="w-5 h-5 text-blue-400 mb-2" />
                      <p className="text-[12.5px] text-slate-600 dark:text-slate-300 italic leading-relaxed mb-3">"{q.text}"</p>
                      <p className="text-[11px] font-bold text-slate-800 dark:text-white">{q.author}</p>
                      <p className="text-[10px] text-slate-400">{q.location} · {q.role}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Trending */}
              <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`${glass} rounded-xl overflow-hidden`}>
                <div className="px-5 py-3 border-b border-slate-200 dark:border-white/10 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                  <p className="text-[10px] font-black uppercase tracking-[.22em] text-slate-500 dark:text-slate-400">Trending This Week</p>
                </div>
                <div className="divide-y divide-slate-200 dark:divide-white/10">
                  {articles.slice(0, 4).map((a, i) => (
                    <Link key={a.title} href={`/health-insight/${a.id}`}>
                      <div className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer group transition-colors">
                        <span className="text-2xl font-black text-slate-200 dark:text-slate-700 w-7 flex-shrink-0 leading-none">{i + 1}</span>
                        <p className="text-[12px] font-semibold text-slate-700 dark:text-slate-300 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">{a.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </aside>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}