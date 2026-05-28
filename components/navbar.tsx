'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useTransition, useRef, useEffect } from 'react';
import { Menu, X, Download, Moon, Sun, ChevronDown, ArrowRight, Heart, Building2, Leaf, Newspaper, Mail, Users, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Dropdown Menu Component - Now triggered by hover
function DropdownMenu({ 
  items, 
  isOpen, 
  onClose, 
  triggerRef 
}: { 
  items: { href: string; label: string; icon: React.ReactNode; description: string }[];
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50"
        >
          <div className="p-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const companyTriggerRef = useRef<HTMLButtonElement>(null);
  const resourcesTriggerRef = useRef<HTMLButtonElement>(null);

  const companyItems = [
    { href: '/about', label: 'About Us', icon: <Heart className="w-5 h-5 text-primary" />, description: 'Learn about our mission and team' },
    { href: '/partnership', label: 'Partnership', icon: <Building2 className="w-5 h-5 text-primary" />, description: 'Join our partner network' },
    { href: '/esg', label: 'ESG & Impact', icon: <Leaf className="w-5 h-5 text-primary" />, description: 'Our sustainability commitment' },
  ];

  const resourcesItems = [
    { href: '/health-insight', label: 'Health Insight', icon: <Newspaper className="w-5 h-5 text-primary" />, description: 'Latest healthcare insights' },
    { href: '/contact', label: 'Contact', icon: <Mail className="w-5 h-5 text-primary" />, description: 'Get in touch with our team' },
  ];

  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  // Hover handlers for dropdowns
  const handleMouseEnter = (dropdown: string) => {
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Properly sized and arranged */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="relative w-[160px] sm:w-[200px] md:w-[200px]">
                <Image
                  src="/logonav.png"
                  alt="NironCare Logo"
                  width={200}
                  height={38}
                  className="object-contain"
                  style={{ width: '100%', height: 'auto' }}
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation - Hover dropdowns */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5"
              >
                Home
              </Link>

              {/* Company Dropdown - Hover to open */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('company')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  ref={companyTriggerRef as React.RefObject<HTMLButtonElement>}
                  className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                    openDropdown === 'company' 
                      ? 'text-primary bg-primary/5' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  Company
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'company' ? 'rotate-180' : ''}`} />
                </button>
                <DropdownMenu
                  items={companyItems}
                  isOpen={openDropdown === 'company'}
                  onClose={() => setOpenDropdown(null)}
                  triggerRef={companyTriggerRef as React.RefObject<HTMLElement>}
                />
              </div>

              {/* Resources Dropdown - Hover to open */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('resources')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  ref={resourcesTriggerRef as React.RefObject<HTMLButtonElement>}
                  className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                    openDropdown === 'resources' 
                      ? 'text-primary bg-primary/5' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  Resources
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === 'resources' ? 'rotate-180' : ''}`} />
                </button>
                <DropdownMenu
                  items={resourcesItems}
                  isOpen={openDropdown === 'resources'}
                  onClose={() => setOpenDropdown(null)}
                  triggerRef={resourcesTriggerRef as React.RefObject<HTMLElement>}
                />
              </div>

              <Link
                href="/contact"
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300 text-slate-600 dark:text-slate-400 hover:text-primary"
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
                className="hidden sm:flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Download App</span>
              </Button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden pb-4 space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4"
              >
                <div className="space-y-1">
                  <Link
                    href="/"
                    className="block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors py-3 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors py-3 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/partnership"
                    className="block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors py-3 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                    onClick={() => setIsOpen(false)}
                  >
                    Partnership
                  </Link>
                  <Link
                    href="/esg"
                    className="block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors py-3 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                    onClick={() => setIsOpen(false)}
                  >
                    ESG
                  </Link>
                  <Link
                    href="/health-insight"
                    className="block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors py-3 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                    onClick={() => setIsOpen(false)}
                  >
                    Health Insight
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors py-3 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
                <Button
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsOpen(false);
                  }}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold mt-3"
                >
                  Download App
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Download App Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="border-slate-200 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-slate-900 dark:text-white">Download NironCare App</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400">
              Get access to healthcare anytime, anywhere with our mobile app.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                App Store
              </Button>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                Google Play
              </Button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Available on both iOS and Android platforms
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}