'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const consent = localStorage.getItem('nironcare-cookie-consent');
    if (!consent) {
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('nironcare-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('nironcare-cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isMounted || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6"
        >
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      We Value Your Privacy
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We use cookies to enhance your experience, analyze site traffic, and serve personalized content. By accepting, you consent to our use of cookies. You can manage preferences or decline at any time.
                    </p>
                  </div>
                  <button
                    onClick={handleDecline}
                    className="flex-shrink-0 p-2 hover:bg-background rounded-lg transition-colors"
                    aria-label="Close cookie consent"
                  >
                    <X size={20} className="text-muted-foreground" />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
                  <Button
                    onClick={handleAccept}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded-lg transition-all"
                  >
                    Accept Cookies
                  </Button>
                  <Button
                    onClick={handleDecline}
                    variant="outline"
                    className="flex-1 border-border hover:bg-background font-semibold py-2 rounded-lg transition-all"
                  >
                    Decline
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-3 text-center">
                  <a href="#" className="hover:text-foreground transition-colors underline">
                    Learn more about our privacy practices
                  </a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
