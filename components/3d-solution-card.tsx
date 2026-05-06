'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface Solution3DCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  index: number;
}

export function Solution3DCard({
  icon: Icon,
  title,
  description,
  features,
  index,
}: Solution3DCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative group overflow-hidden rounded-2xl border border-primary/20 bg-card transition-all duration-300 hover:border-primary/40 ${
        isEven ? 'lg:col-span-1' : 'lg:col-span-1'
      }`}
      style={{
        perspective: '1200px',
      }}
    >
      {/* Holographic border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Asymmetric background */}
      <div className="absolute inset-0">
        <div className={`absolute ${isEven ? 'top-0 right-0' : 'bottom-0 left-0'} w-1/2 h-1/2 bg-gradient-to-br from-primary/5 to-transparent`} />
      </div>

      {/* Content */}
      <div className="relative p-8 z-10 flex flex-col h-full">
        {/* Icon container with subtle animation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          className="mb-6 inline-flex p-4 rounded-xl w-fit bg-primary/10 border border-primary/20 group-hover:bg-primary/15 group-hover:border-primary/40 transition-all"
        >
          <Icon className="w-8 h-8 text-primary" />
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Features list - always visible */}
        <motion.div className="space-y-2 mb-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors"
            >
              <CheckCircle size={16} className="text-primary" />
              {feature}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="flex items-center gap-2 font-semibold text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Learn More
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
}
