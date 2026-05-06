'use client';

import { useRef, useEffect, useState } from 'react';

interface ParallaxConfig {
  offset?: number;
  speed?: number;
}

export function useParallax(config: ParallaxConfig = {}) {
  const { offset = 0, speed = 0.5 } = config;
  const elementRef = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const scrollPos = window.scrollY;
      const elementPos = elementRef.current.getBoundingClientRect().top;
      const elementTop = scrollPos + elementPos;

      // Calculate parallax value
      const parallaxValue = (scrollPos - elementTop) * speed + offset;
      setY(parallaxValue);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, offset]);

  return { elementRef, y };
}
