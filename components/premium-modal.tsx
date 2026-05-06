'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Smartphone, Heart, Zap, X } from 'lucide-react';

export function PremiumModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (hasShown) return;
    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasShown(true);
    }, 60000);
    return () => clearTimeout(timer);
  }, [hasShown]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient background glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 rounded-3xl blur-2xl" />
            
            {/* Main card */}
            <div 
              className="relative rounded-3xl overflow-hidden border border-amber-300/30"
              style={{
                background: 'linear-gradient(135deg, rgba(55, 38, 10, 0.8) 0%, rgba(45, 30, 5, 0.9) 100%)',
                boxShadow: '0 20px 60px rgba(217, 119, 6, 0.3), inset 0 0 30px rgba(217, 119, 6, 0.1)'
              }}
            >
              {/* Luxury gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 via-transparent to-orange-600/5" />

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full text-amber-200/60 hover:text-amber-100 hover:bg-amber-500/10 transition-all"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Content */}
              <div className="relative p-8 md:p-10">
                {/* Header */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8"
                >
                  <div className="inline-block mb-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="p-3 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-400/30"
                    >
                      <Download className="w-6 h-6 text-amber-300" />
                    </motion.div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-black mb-3">
                    <span className="bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-200 bg-clip-text text-transparent">
                      Download NironCare
                    </span>
                  </h2>
                  <p className="text-amber-100/70 text-lg">Healthcare excellence in your pocket</p>
                </motion.div>

                {/* Features grid */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-2 gap-4 mb-8"
                >
                  {[
                    { icon: Smartphone, label: 'iOS & Android' },
                    { icon: Heart, label: '24/7 Access' },
                    { icon: Zap, label: 'Real-time Sync' },
                    { icon: Download, label: 'Free Download' },
                  ].map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        className="p-4 rounded-lg border border-amber-400/20 bg-gradient-to-br from-amber-500/10 to-orange-500/5"
                      >
                        <Icon className="w-5 h-5 text-amber-300 mb-2" />
                        <p className="text-xs font-semibold text-amber-100">{feature.label}</p>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3 mb-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-6 rounded-xl font-bold text-lg transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      color: 'white',
                      boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)'
                    }}
                  >
                    App Store
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-6 rounded-xl font-bold text-lg transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                      color: '#1f2937',
                      boxShadow: '0 10px 30px rgba(251, 191, 36, 0.2)'
                    }}
                  >
                    Google Play
                  </motion.button>
                </motion.div>

                {/* Bottom text */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <p className="text-xs text-amber-100/50">
                    Available on both iOS and Android platforms
                  </p>
                </motion.div>

                {/* Animated border */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  animate={{
                    boxShadow: [
                      'inset 0 0 20px rgba(217, 119, 6, 0.2)',
                      'inset 0 0 40px rgba(217, 119, 6, 0.3)',
                      'inset 0 0 20px rgba(217, 119, 6, 0.2)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
