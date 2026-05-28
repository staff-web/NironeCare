'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Download, HeartHandshake } from 'lucide-react';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
      bg-blue-500/10 border border-blue-400/20 text-blue-500 dark:text-blue-300
      text-[11px] tracking-widest font-bold uppercase mb-5">
      {children}
    </span>
  );
}

function ParallaxImage({ src, alt, className = '', speed = 0.3 }: { src: string; alt: string; className?: string; speed?: number }) {
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

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      <ParallaxImage
        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1800&q=80"
        alt="Medical professionals collaborating"
        className="absolute inset-0 z-0"
        speed={0.2}
      />
      <div className="absolute inset-0 bg-slate-900/88 dark:bg-[#070c14]/90 z-10" />

      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.18) 0%, transparent 70%)' }} />

      <motion.div
        className="relative z-20 max-w-3xl mx-auto text-center px-4"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SectionLabel><HeartHandshake className="w-3 h-3" /> Get Started</SectionLabel>
        <h2 className="text-5xl sm:text-6xl font-extrabold text-white mt-4 leading-tight">
          Ready to Transform Healthcare?
        </h2>
        <p className="text-xl text-slate-300 mt-5 max-w-xl mx-auto leading-relaxed">
          Join hundreds of clinics and hospitals across Southeast Asia delivering better, faster, smarter care with NironCare.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button asChild
              className="bg-blue-600 hover:bg-blue-500 text-white px-9 py-6 rounded-xl font-bold
                shadow-xl shadow-blue-600/30 group transition-all duration-300">
              <Link href="/contact" className="flex items-center gap-2">
                Contact Us
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button asChild variant="outline"
              className="border-white/30 bg-white/10 hover:bg-white/15 text-white
                px-9 py-6 rounded-xl font-bold backdrop-blur-sm">
              <Link href="/partnership">Partner With Us</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}