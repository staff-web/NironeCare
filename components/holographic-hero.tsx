'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function HolographicHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let time = 0;

    const getColorForIndex = (index: number, phase: number): string => {
      const hue = ((index * 60 + phase) % 360);
      return `hsl(${hue}, 75%, 50%)`;
    };

    const drawScene = () => {
      time += 0.016;
      
      // Clear canvas with subtle gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 20, 32, 0.08)');
      gradient.addColorStop(1, 'rgba(15, 20, 32, 0.04)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;

      // Draw rotating hexagons with color cycling
      const drawHexagon = (x: number, y: number, size: number, rotation: number, opacity: number, colorPhase: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        const color = getColorForIndex(0, colorPhase);
        ctx.strokeStyle = color.replace('hsl', 'hsla').replace(')', `, ${opacity})`);
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const px = Math.cos(angle) * size;
          const py = Math.sin(angle) * size;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      };

      // Main hexagon with color cycling
      drawHexagon(centerX, centerY, 50, time * 0.3, 0.7, time * 30);
      drawHexagon(centerX, centerY, 80, -time * 0.2, 0.4, time * 25);
      drawHexagon(centerX, centerY, 120, time * 0.15, 0.2, time * 20);

      // Draw rotating healthcare nodes around center (representing body systems)
      const nodeDistance = 80;
      const numNodes = 6;
      for (let i = 0; i < numNodes; i++) {
        const angle = (time * 0.4) + (i / numNodes) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * nodeDistance;
        const y = centerY + Math.sin(angle) * nodeDistance;

        // Healthcare indicator with health-themed color
        const healthColor = getColorForIndex(i, time * 15);
        const nodeGradient = ctx.createRadialGradient(x - 8, y - 8, 0, x, y, 15);
        nodeGradient.addColorStop(0, healthColor.replace(')', ', 0.9)'));
        nodeGradient.addColorStop(1, healthColor.replace(')', ', 0.2)'));
        
        ctx.fillStyle = nodeGradient;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = healthColor.replace(')', ', 0.7)');
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Heartbeat pulse effect
      const pulseSize = 30 + Math.sin(time * 3) * 5;
      const pulseGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseSize);
      pulseGradient.addColorStop(0, 'rgba(220, 38, 38, 0.6)');
      pulseGradient.addColorStop(1, 'rgba(220, 38, 38, 0)');
      ctx.fillStyle = pulseGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      // Draw central DNA helix suggestion with healthcare theme
      const helixPoints = 8;
      for (let i = 0; i < helixPoints; i++) {
        const angle = (time * 0.6) + (i / helixPoints) * Math.PI * 2;
        const radius = 30 + Math.sin(angle) * 10;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + (i / helixPoints - 0.5) * 40;
        
        ctx.fillStyle = `rgba(34, 197, 94, ${0.5 - (i / helixPoints) * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw data network for healthcare connectivity
      const nodes = [
        { x: centerX - 70, y: centerY - 50, label: 'Care' },
        { x: centerX + 70, y: centerY - 50, label: 'Data' },
        { x: centerX + 70, y: centerY + 50, label: 'Network' },
        { x: centerX - 70, y: centerY + 50, label: 'Connect' },
      ];

      ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < nodes.length; i++) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[(i + 1) % nodes.length].x, nodes[(i + 1) % nodes.length].y);
        ctx.stroke();
      }

      // Draw healthcare nodes with emphasis
      nodes.forEach((node, idx) => {
        const nodeColor = getColorForIndex(idx, time * 20);
        const nodeGradient = ctx.createRadialGradient(node.x - 5, node.y - 5, 0, node.x, node.y, 12);
        nodeGradient.addColorStop(0, nodeColor.replace(')', ', 0.95)'));
        nodeGradient.addColorStop(1, nodeColor.replace(')', ', 0.3)'));
        
        ctx.fillStyle = nodeGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = nodeColor.replace(')', ', 0.8)');
        ctx.lineWidth = 2.5;
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(drawScene);
    };

    drawScene();

    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative h-96 lg:h-96 w-full rounded-2xl overflow-hidden border border-blue-500/30"
      style={{ 
        background: 'linear-gradient(135deg, rgba(13, 27, 52, 0.5) 0%, rgba(15, 20, 32, 0.3) 100%)',
        boxShadow: '0 0 60px rgba(79, 126, 233, 0.3), inset 0 0 40px rgba(79, 126, 233, 0.1)'
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Holographic glow overlay */}
      <motion.div
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/10 pointer-events-none"
      />
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-500/40" />
      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-blue-500/40" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-blue-500/40" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-500/40" />

      {/* Center text with holographic effect */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="text-center">
          <div className="text-sm font-bold tracking-widest text-blue-400/60 mb-2">HEALTHCARE AI</div>
          <div className="text-3xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
            3D HOLOGRAM
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
