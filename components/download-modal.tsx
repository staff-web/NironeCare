'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Lock, Smartphone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DownloadModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastTrigger, setLastTrigger] = useState<number>(0);

  useEffect(() => {
    // Check localStorage for last trigger time
    const stored = localStorage.getItem('downloadModalLastTrigger');
    const now = Date.now();

    if (stored) {
      const lastTime = parseInt(stored);
      const timeSinceLastTrigger = now - lastTime;

      // If more than 60 seconds have passed, show modal
      if (timeSinceLastTrigger >= 60000) {
        setIsVisible(true);
        localStorage.setItem('downloadModalLastTrigger', now.toString());
        setLastTrigger(now);
      }
    } else {
      // First time - wait 30 seconds before showing
      setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem('downloadModalLastTrigger', Date.now().toString());
      }, 30000);
    }

    // Set up interval to check every 60 seconds
    const interval = setInterval(() => {
      const current = Date.now();
      const lastStored = localStorage.getItem('downloadModalLastTrigger');

      if (lastStored) {
        const lastTime = parseInt(lastStored);
        if (current - lastTime >= 60000) {
          setIsVisible(true);
          localStorage.setItem('downloadModalLastTrigger', current.toString());
          setLastTrigger(current);
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('downloadModalLastTrigger', Date.now().toString());
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal with layered glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            {/* Gradient border container */}
            <div className="relative w-full max-w-md">
              {/* Animated gradient border */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl p-[2px] opacity-75"
                style={{
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 6s ease infinite'
                }}
              >
                {/* Inner glassmorphism layers */}
                <div className="relative h-full bg-background rounded-3xl overflow-hidden">
                  {/* Glass effect layer 1 - frosted glass */}
                  <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-foreground/5 via-transparent to-foreground/5" />
                  
                  {/* Glass effect layer 2 - subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
                  
                  {/* Content */}
                  <div className="relative z-10 p-8 space-y-6">
                    {/* Close button */}
                    <button
                      onClick={handleClose}
                      className="absolute top-6 right-6 p-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/60 hover:text-foreground transition-all duration-200"
                    >
                      <X size={20} />
                    </button>

                    {/* Header */}
                    <div className="space-y-2 pr-8">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Download NironCare</h2>
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-sm"
                      >
                        Healthcare at your fingertips. Available on iOS and Android.
                      </motion.p>
                    </div>

                    {/* App Store Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="grid grid-cols-2 gap-3"
                    >
                      <motion.button
                        whileHover={{ translateY: -2 }}
                        className="relative group h-12 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 hover:border-primary/60 overflow-hidden flex items-center justify-center gap-2 transition-all duration-300"
                        onClick={() => {
                          handleClose();
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Download size={18} className="relative z-10 text-primary" />
                        <span className="relative z-10 text-sm font-semibold text-foreground">App Store</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ translateY: -2 }}
                        className="relative group h-12 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 hover:border-primary/60 overflow-hidden flex items-center justify-center gap-2 transition-all duration-300"
                        onClick={() => {
                          handleClose();
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Download size={18} className="relative z-10 text-primary" />
                        <span className="relative z-10 text-sm font-semibold text-foreground">Play Store</span>
                      </motion.button>
                    </motion.div>

                    {/* Features list with professional icons */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-3 pt-4 border-t border-foreground/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/15 border border-primary/30">
                          <Smartphone size={16} className="text-primary" />
                        </div>
                        <span className="text-sm text-foreground">Smart Queue Management</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-accent/15 border border-accent/30">
                          <Lock size={16} className="text-accent" />
                        </div>
                        <span className="text-sm text-foreground">Secure Consultations</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/15 border border-primary/30">
                          <Clock size={16} className="text-primary" />
                        </div>
                        <span className="text-sm text-foreground">24/7 Health Access</span>
                      </div>
                    </motion.div>

                    {/* Dismiss button */}
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      onClick={handleClose}
                      className="w-full text-center text-muted-foreground hover:text-foreground text-xs font-medium transition-colors py-2"
                    >
                      Not now
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <style>{`
            @keyframes gradient-shift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
