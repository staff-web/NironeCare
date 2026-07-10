'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Smartphone, Heart, Zap, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export function PremiumModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || hasShown) return;
    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasShown(true);
    }, 60000);
    return () => clearTimeout(timer);
  }, [hasShown, mounted]);

  const isDark = resolvedTheme === 'dark';

  if (!mounted) return null;

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
            {/* Main card */}
            <div 
              className={`relative rounded-2xl overflow-hidden transition-all ${
                isDark 
                  ? 'bg-[#0d1117] border border-slate-800'
                  : 'bg-white border border-slate-200'
              }`}
              style={{
                boxShadow: isDark 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
            >

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all ${
                  isDark
                    ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </motion.button>

              {/* Content */}
              <div className="relative p-6 md:p-8">
                {/* Header */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mb-6"
                >
                  <div className="inline-block mb-4">
                    <div className={`p-3 rounded-full ${
                      isDark
                        ? 'bg-[#0046C0]/20'
                        : 'bg-[#0046C0]/10'
                    }`}>
                      <Download className={`w-6 h-6 ${
                        isDark ? 'text-[#0046C0]' : 'text-[#0046C0]'
                      }`} />
                    </div>
                  </div>

                  <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Download NironCare
                  </h2>
                  <p className={`text-sm ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Get the app for seamless healthcare access
                  </p>
                </motion.div>

                {/* Features grid */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-2 gap-3 mb-6"
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
                        className={`p-3 rounded-lg text-center ${
                          isDark
                            ? 'bg-slate-800/50 border border-slate-700'
                            : 'bg-slate-50 border border-slate-200'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mx-auto mb-1 ${
                          isDark ? 'text-[#0046C0]' : 'text-[#0046C0]'
                        }`} />
                        <p className={`text-xs font-medium ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          {feature.label}
                        </p>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
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

                {/* Bottom text */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center mt-6"
                >
                  <p className={`text-xs ${
                    isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    Available on iOS and Android · Free download
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}