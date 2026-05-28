'use client';

import Link from 'next/link';
import { Linkedin, Twitter, Mail, Globe } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  const footerLinks = {
    Company: [
      { href: '/about', label: 'About Us' },
      { href: '/partnership', label: 'Partnership' },
      { href: '/esg', label: 'ESG & Impact' },
    ],
    Resources: [
      { href: '/health-insight', label: 'Health Insight' },
      { href: '/contact', label: 'Contact Us' },
    ],
    Legal: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Link href="/" className="flex-shrink-0">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
                  <Image
                    src="/logo.png"
                    alt="NironCare Logo"
                    width={112}
                    height={112}
                    className="object-contain"
                  />
                </div>
              </Link>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                  Healthcare without boundaries, anytime, anywhere. Empowering patients and providers across Southeast Asia with AI-powered healthcare solutions.
                </p>
                <div className="flex items-center space-x-3 mt-4">
                  <a href="#" className="text-slate-500 hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-slate-500 hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-slate-500 hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-500">
              © 2025 NironCare. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-xs text-slate-500 hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-xs text-slate-500 hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-xs text-slate-500 hover:text-primary transition-colors">
                Contact
              </Link>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Globe className="w-3 h-3" />
                <span>English</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}