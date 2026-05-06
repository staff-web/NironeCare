'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'scale-in' | 'fade-in' | 'parallax';
  delay?: number;
  duration?: number;
  className?: string;
  parallaxSpeed?: number;
}

export function ScrollAnimationWrapper({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.6,
  className = '',
  parallaxSpeed = 0.3,
}: ScrollAnimationWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (value) => value * parallaxSpeed);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    'scale-in': {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
    'fade-in': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    'parallax': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  if (variant === 'parallax') {
    return (
      <motion.div
        ref={ref}
        style={{ y }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
