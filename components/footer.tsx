'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, Globe, MapPin, Phone, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Platform: [
    { href: '/solutions', label: 'All Solutions' },
    { href: '/solutions#smart-queue', label: 'Smart Queue' },
    { href: '/solutions#tele-consult', label: 'Tele Consultation' },
    { href: '/solutions#ai-diagnosis', label: 'AI Diagnosis' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/partnership', label: 'Partnership' },
    { href: '/esg', label: 'ESG & Impact' },
  ],
  Resources: [
    { href: '/health-insight', label: 'Health Insight' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export function Footer() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
    
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="bg-white dark:bg-[#0046C0] border-t border-slate-200 dark:border-slate-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-100 dark:border-slate-800/60">

          {/* Brand */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* 
              Logo: Larger size with margin bottom
              In dark mode, logo is inverted to white to be visible on #0046C0 background
            */}
            <Link href="/" className="flex-shrink-0 inline-block mb-6">
              {mounted ? (
                <img
                  src="/logonav.png"
                  alt="NironCare"
                  style={{
                    height: 44,  // Increased from 30 to 44 (about 47% larger)
                    width: 'auto',
                    filter: isDark ? 'brightness(0) invert(1)' : 'none',
                    transition: 'filter 0.2s',
                  }}
                />
              ) : (
                <div style={{ width: 160, height: 44 }} />
              )}
            </Link>

            {/* Description text - improved dark mode contrast */}
            <p className="text-sm text-slate-600 dark:text-slate-200 leading-relaxed max-w-xs mb-6">
              Healthcare without boundaries — empowering patients and providers across Southeast Asia with AI-powered solutions.
            </p>

            {/* Contact details - improved dark mode visibility */}
            <ul className="space-y-2.5 mb-6">
              {[
                { Icon: Mail, text: 'support@nironcare.com', href: 'mailto:support@nironcare.com' },
                { Icon: Phone, text: '+855 87 995 911', href: 'tel:+85587995911' },
                { Icon: Globe, text: 'nironcare.com', href: 'https://nironcare.com' },
                { Icon: MapPin, text: '#10, Street 03, Khan Toul Kork, Phnom Penh, Cambodia', href: '#' },
              ].map(({ Icon, text, href }) => (
                <li key={text}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex items-start gap-2.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-[#0046C0] dark:hover:text-white transition-colors group"
                  >
                    <Icon className="w-3.5 h-3.5 mt-[1px] flex-shrink-0 dark:text-slate-300" strokeWidth={1.5} />
                    <span>{text}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Socials - improved dark mode */}
            <div className="flex items-center gap-2">
              {[
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Mail, href: 'mailto:support@nironcare.com', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="
                    w-8 h-8 rounded-lg flex items-center justify-center
                    border border-slate-200 dark:border-slate-700
                    text-slate-500 dark:text-slate-300
                    hover:border-[#0046C0]/40 hover:text-[#0046C0]
                    dark:hover:border-white/50 dark:hover:text-white
                    transition-all duration-200
                  "
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Nav columns - improved text contrast in dark mode */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300 mb-4">
                  {category}
                </p>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-[13px] text-slate-600 dark:text-slate-300 hover:text-[#0046C0] dark:hover:text-white transition-colors duration-150"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-150" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar - improved dark mode visibility */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-xs text-slate-500 dark:text-slate-300">
            © {new Date().getFullYear()} NironCare. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { href: '/privacy', label: 'Privacy' },
              { href: '/terms', label: 'Terms' },
              { href: '/contact', label: 'Contact' },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-slate-500 dark:text-slate-300 hover:text-[#0046C0] dark:hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-300">
              <Globe className="w-3 h-3" /> English
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}