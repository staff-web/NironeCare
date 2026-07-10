'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, X, Download, Moon, Sun, ChevronDown, ArrowRight,
  Heart, Building2, Leaf, Newspaper, Mail, Users, LayoutGrid,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

function MegaMenu({ items, isOpen, onItemClick }: { items: DropdownItem[]; isOpen: boolean; onItemClick?: () => void }) {
  if (!isOpen) return null;
  
  return (
    <div
      className="
        absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 z-50
        bg-white dark:bg-[#0d1117]
        rounded-xl border border-slate-200 dark:border-slate-700
        shadow-[0_20px_60px_-8px_rgba(0,0,0,0.14)]
        dark:shadow-[0_20px_60px_-8px_rgba(0,0,0,0.6)]
        overflow-hidden
        animate-in fade-in duration-150
      "
    >
      <div className="p-1.5">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors duration-150"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#0046C0]/8 dark:bg-white/10 group-hover:bg-[#0046C0]/15 dark:group-hover:bg-white/15 transition-colors">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[#0046C0] dark:group-hover:text-blue-300 transition-colors leading-none mb-0.5">
                {item.label}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-snug">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// icons inside dropdown always use brand blue on light dropdown bg
const ico = (C: React.ComponentType<any>) => <C className="w-3.5 h-3.5 text-[#0046C0]" strokeWidth={1.5} />;

const platformItems: DropdownItem[] = [
  { href: '/solutions',              label: 'All Solutions',     icon: ico(LayoutGrid), description: 'Explore the full platform'       },
  { href: '/solutions#smart-queue',  label: 'Smart Queue',       icon: ico(Users),      description: 'AI-driven patient queuing'      },
  { href: '/solutions#tele-consult', label: 'Tele Consultation', icon: ico(Mail),       description: 'Secure video consultations'     },
  { href: '/solutions#ai-diagnosis', label: 'AI Diagnosis',      icon: ico(Heart),      description: 'ML-powered diagnostic support'  },
];
const companyItems: DropdownItem[] = [
  { href: '/about',       label: 'About Us',     icon: ico(Heart),     description: 'Our mission and team'          },
  { href: '/partnership', label: 'Partnership',  icon: ico(Building2), description: 'Join our partner network'      },
  { href: '/esg',         label: 'ESG & Impact', icon: ico(Leaf),      description: 'Our sustainability commitment' },
];
const resourcesItems: DropdownItem[] = [
  { href: '/health-insight', label: 'Health Insight', icon: ico(Newspaper), description: 'Latest healthcare insights' },
  { href: '/contact',        label: 'Contact',         icon: ico(Mail),      description: 'Get in touch'               },
];
const navGroups = [
  { key: 'platform',  label: 'Platform',  items: platformItems  },
  { key: 'company',   label: 'Company',   items: companyItems   },
  { key: 'resources', label: 'Resources', items: resourcesItems },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  
  // Refs for dropdown timers
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => { setMounted(true); }, []);
  
  // Close mobile menu and dropdowns on route change
  useEffect(() => { 
    setOpenDropdown(null); 
    setIsOpen(false); 
  }, [pathname]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const isDark = resolvedTheme === 'dark';

  const handleDownloadClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    setIsModalOpen(true);
  };

  const handleDemoClick = () => {
    setIsDemoModalOpen(true);
  };

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(key);
  };

  const handleMouseLeave = (key: string) => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleDropdownItemClick = () => {
    setOpenDropdown(null);
  };

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const dropdownElement = dropdownRefs.current[openDropdown];
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-[#0046C0] border-b border-slate-200 dark:border-blue-700/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              {mounted ? (
                <img
                  src="/logonav.png"
                  alt="NironCare"
                  style={{
                    height: '50px',
                    width: 'auto',
                    minWidth: '50px',
                    objectFit: 'contain',
                    objectPosition: 'left center',
                    filter: isDark ? 'brightness(0) invert(1)' : 'none',
                    transition: 'filter 0.2s',
                  }}
                />
              ) : (
                <div style={{ height: '60px', width: '200px' }} />
              )}
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              <Link
                href="/"
                className="px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 text-slate-700 dark:text-white/90 hover:text-[#0046C0] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
              >
                Home
              </Link>

              {navGroups.map(({ key, label, items }) => (
                <div
                  key={key}
                  className="relative"
                  ref={(el) => { dropdownRefs.current[key] = el; }}
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={() => handleMouseLeave(key)}
                >
                  <button 
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 text-slate-700 dark:text-white/90 hover:text-[#0046C0] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
                    aria-expanded={openDropdown === key}
                    aria-haspopup="true"
                  >
                    {label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === key ? 'rotate-180' : ''}`} />
                  </button>
                  <MegaMenu 
                    items={items} 
                    isOpen={openDropdown === key} 
                    onItemClick={handleDropdownItemClick}
                  />
                </div>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1.5">
              {/* Download Button */}
              <motion.button
                onClick={handleDownloadClick}
                className="
                  hidden sm:flex items-center gap-2 px-5 h-10 rounded-md font-medium text-sm
                  bg-[#0046C0]
                  text-white
                  shadow-sm
                  border border-white/10
                  transition-all duration-150
                  focus:outline-none focus:ring-2 focus:ring-[#0046C0]/50 focus:ring-offset-2
                "
                animate={{
                  y: isPressed ? 1 : 0,
                  scale: isPressed ? 0.98 : 1,
                  boxShadow: isPressed
                    ? "0 1px 2px rgba(0,0,0,0.05)"
                    : "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
                }}
                transition={{
                  duration: 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  backgroundColor: "#0039a6",
                  scale: 1.02,
                  boxShadow: "0 4px 12px rgba(0,70,192,0.25)",
                }}
                whileTap={{
                  scale: 0.98,
                  y: 1,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <Download className="w-4 h-4" />
                <span className="font-medium tracking-normal">Download App</span>
              </motion.button>
              
              {/* Request a Demo Button */}
              <motion.button
                onClick={handleDemoClick}
                className="
                  hidden sm:flex items-center gap-2 px-5 h-10 rounded-md font-medium text-sm
                  bg-white
                  text-[#0046C0]
                  shadow-sm
                  border border-[#0046C0]/30
                  transition-all duration-150
                  focus:outline-none focus:ring-2 focus:ring-[#0046C0]/50 focus:ring-offset-2
                "
                whileHover={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#0046C0",
                  scale: 1.02,
                  boxShadow: "0 4px 12px rgba(0,70,192,0.15)",
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <span className="font-medium tracking-normal">Request a Demo</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {/* Hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.12 }}>
                      <X className="w-5 h-5" />
                    </motion.span>
                  ) : (
                    <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.12 }}>
                      <Menu className="w-5 h-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden overflow-hidden border-t border-slate-100 dark:border-blue-700/50"
              >
                <div className="py-3 px-2 space-y-0.5">
                  {[
                    { href: '/', label: 'Home' },
                    { href: '/solutions', label: 'Platform' },
                    { href: '/about', label: 'About Us' },
                    { href: '/partnership', label: 'Partnership' },
                    { href: '/esg', label: 'ESG & Impact' },
                    { href: '/health-insight', label: 'Health Insight' },
                    { href: '/contact', label: 'Contact' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium text-slate-700 dark:text-white/90 hover:text-[#0046C0] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                      >
                        {item.label}
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-white/30" />
                      </Link>
                    </motion.div>
                  ))}
                  <div className="pt-2 pb-1 px-1 space-y-2">
                    <motion.div whileTap={{ scale: 0.97 }}>
                      <Button
                        onClick={() => { setIsDemoModalOpen(true); setIsOpen(false); }}
                        className="w-full bg-white text-[#0046C0] border border-[#0046C0]/30 hover:bg-slate-50 font-medium rounded-md h-11 text-sm shadow-sm"
                      >
                        Request a Demo <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.97 }}>
                      <Button
                        onClick={() => { setIsModalOpen(true); setIsOpen(false); }}
                        className="w-full bg-[#0046C0] hover:bg-[#0039a6] text-white font-medium rounded-md h-11 text-sm shadow-sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download App
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Download Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white dark:bg-[#0a0f1a] border-slate-200 dark:border-slate-800 rounded-xl max-w-sm overflow-hidden p-0 shadow-xl">
          <div className="p-6">
            <DialogHeader className="text-left">
              <div className="w-12 h-12 rounded-xl bg-[#0046C0]/10 flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-[#0046C0]" />
              </div>
              <DialogTitle className="text-slate-900 dark:text-white text-xl font-semibold">Download NironCare</DialogTitle>
              <DialogDescription className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 leading-relaxed">
                Get the app to manage appointments, access health records, and consult with doctors — all in one place.
              </DialogDescription>
            </DialogHeader>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-5 mt-10"
            >
              {/* App Store Button */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 bg-[#000000] hover:bg-[#1c1c1e] text-white"
              >
                <img 
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/apple.svg" 
                  alt="Apple" 
                  className="w-5 h-5 brightness-0 invert"
                />
                Download on the App Store
              </motion.a>

              {/* Google Play Button */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 bg-[#ffffff] hover:bg-[#2D2D2D] border border-slate-700/30 text-black shadow-sm"
              >
                <img 
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/googleplay.svg" 
                  alt="Google Play" 
                  className="w-5 h-5" 
                />
                GET IT ON Google Play
              </motion.a>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Request a Demo Modal */}
      <Dialog open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen}>
        <DialogContent className="bg-white dark:bg-[#0a0f1a] border-slate-200 dark:border-slate-800 rounded-xl max-w-md overflow-hidden p-0 shadow-xl">
          <div className="p-6">
            <DialogHeader className="text-left">
              <div className="w-12 h-12 rounded-xl bg-[#0046C0]/10 flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-[#0046C0]" />
              </div>
              <DialogTitle className="text-slate-900 dark:text-white text-xl font-semibold">Request a Demo</DialogTitle>
              <DialogDescription className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 leading-relaxed">
                See how NironCare can transform your healthcare practice. Fill out the form below and our team will get back to you within 24 hours.
              </DialogDescription>
            </DialogHeader>
            
            <form className="space-y-4 mt-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0f1219] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0046C0] focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                <input type="email" placeholder="john@example.com" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0f1219] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0046C0] focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Organization / Practice Name</label>
                <input type="text" placeholder="e.g., City General Hospital" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0f1219] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0046C0] focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0f1219] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0046C0] focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Interested In</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0f1219] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0046C0] focus:border-transparent">
                  <option>Smart Queue Management</option>
                  <option>Tele Consultation</option>
                  <option>AI Diagnosis Support</option>
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
        </DialogContent>
      </Dialog>
    </>
  );
}