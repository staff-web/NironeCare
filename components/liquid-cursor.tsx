'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

export function LiquidCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop for smooth plasma effect
    let animationFrameId: number;
    const animate = () => {
      // Smooth easing for position
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.15;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${positionRef.current.x}px`;
        cursorRef.current.style.top = `${positionRef.current.y}px`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Dark mode: keep original blue, Light mode: use dark slate colors
// Light mode colors
const ringColor = isDark
  ? 'radial-gradient(circle, rgba(79, 126, 233, 0.8) 0%, rgba(30, 93, 217, 0.4) 70%, transparent 100%)'
  : 'radial-gradient(circle, rgba(79, 126, 233, 0.8) 0%, rgba(30, 93, 217, 0.4) 70%, transparent 100%)';

const coreColor = isDark
  ? 'radial-gradient(circle, #FFFFFF 0%, #4F7EE9 100%)'
  : 'radial-gradient(circle, #3700ffff 0%, #4F7EE9 100%)';

const trailColor = isDark
  ? 'radial-gradient(circle, rgba(79, 126, 233, 0.6) 0%, transparent 100%)'
  : 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, transparent 100%)';

  const shadowColor = isDark
    ? 'rgba(79, 126, 233, 0.9)'
    : 'rgba(255, 255, 255, 0.9)';

  const glowColor = isDark
    ? 'rgba(79, 126, 233, 0.6)'
    : 'rgba(255, 255, 255, 1)';

  return (
    <>
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed z-[9999] ${isDark ? 'mix-blend-screen' : 'mix-blend-normal'}`}
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      >
        {/* Main cursor blob */}
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Outer plasma ring */}
          <div
            className="absolute w-8 h-8 rounded-full blur-md"
            style={{
              background: ringColor,
              filter: 'blur(8px)',
              boxShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor.replace('0.6', '0.3')}`,
            }}
          />

          {/* Inner bright core */}
          <motion.div
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              background: coreColor,
              boxShadow: `0 0 15px ${shadowColor}, inset 0 0 10px rgba(255, 255, 255, 0.6)`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Plasma trails (small particles) */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: trailColor,
                boxShadow: `0 0 10px ${glowColor}`,
              }}
              animate={{
                x: [0, Math.cos((i * Math.PI * 2) / 3) * 15, 0],
                y: [0, Math.sin((i * Math.PI * 2) / 3) * 15, 0],
                opacity: [0.8, 0.3, 0.8],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      </div>
    </>
  );
}