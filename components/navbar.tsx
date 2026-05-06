'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Menu, X, Download, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/partnership', label: 'Partnership' },
    { href: '/esg', label: 'ESG' },
    { href: '/health-insight', label: 'Health Insight' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                <span className="text-primary-foreground font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-lg hidden sm:inline bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent group-hover:opacity-80 transition-all duration-300">NironCare</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    startTransition(() => {
                      router.push(link.href);
                    });
                  }}
                  className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group"
                  prefetch={true}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 hover:bg-foreground/10 rounded-lg transition-all duration-300 text-foreground/60 hover:text-primary"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <Button
                onClick={() => setIsModalOpen(true)}
                className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 text-primary-foreground font-semibold rounded-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Download App</span>
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-3 border-t border-border pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium text-foreground/70 hover:text-primary transition-colors py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    startTransition(() => {
                      router.push(link.href);
                    });
                  }}
                  prefetch={true}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsOpen(false);
                }}
                className="w-full bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 text-primary-foreground font-semibold"
              >
                Download App
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Download App Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Download NironCare App</DialogTitle>
            <DialogDescription>
              Get access to healthcare anytime, anywhere with our mobile app.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 text-primary-foreground font-semibold">
                App Store
              </Button>
              <Button className="w-full bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 text-primary-foreground font-semibold">
                Google Play
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              ✓ Available on both iOS and Android platforms
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
