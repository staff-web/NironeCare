'use client';

import Link from 'next/link';
import { Linkedin, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-20 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">NironCare</span>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Healthcare without boundaries, anytime, anywhere.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-base text-foreground mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Product</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors font-medium">Features</Link></li>
              <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors font-medium">Pricing</Link></li>
              <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors font-medium">Security</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-base text-foreground mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-foreground/70 hover:text-primary transition-colors font-medium">About</Link></li>
              <li><Link href="/esg" className="text-sm text-foreground/70 hover:text-primary transition-colors font-medium">ESG</Link></li>
              <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors font-medium">Careers</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-base text-foreground mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors font-medium">Privacy</Link></li>
              <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors font-medium">Terms</Link></li>
              <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors font-medium">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-foreground/60 mb-4 md:mb-0 font-medium">
              © 2025 NironCare. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <a href="#" className="text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all duration-200 p-2.5 rounded-lg border border-border/30 hover:border-primary/50" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all duration-200 p-2.5 rounded-lg border border-border/30 hover:border-primary/50" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all duration-200 p-2.5 rounded-lg border border-border/30 hover:border-primary/50" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
