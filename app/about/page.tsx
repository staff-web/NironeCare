'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Users, Zap, Globe, Award } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  const values = [
    { title: 'Patient-First', description: 'Every decision starts with patient needs and outcomes', icon: Users },
    { title: 'Innovation', description: 'Leveraging AI and modern tech for better healthcare', icon: Zap },
    { title: 'Accessibility', description: 'Healthcare should reach everyone, everywhere', icon: Globe },
    { title: 'Trust', description: 'Security, compliance, and transparency always', icon: Award },
  ];

  const team = [
    { name: 'Dr. Sarah Chen', role: 'Chief Medical Officer', bio: '15+ years in digital health leadership' },
    { name: 'James Rodriguez', role: 'CEO & Founder', bio: 'Serial entrepreneur, healthcare innovator' },
    { name: 'Dr. Priya Patel', role: 'Head of AI Research', bio: 'PhD in Machine Learning, AI ethics' },
    { name: 'Michael Wong', role: 'Chief Technology Officer', bio: 'Former tech company engineering lead' },
  ];

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-background dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:via-[#0f1420] dark:to-[#0a0a0a]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-3xl" />
          </div>

          <motion.div
            className="relative max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="px-4 py-2 rounded-full glass-dark text-blue-300 text-sm font-semibold border-border/20">
                About NironCare
              </span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl font-bold text-foreground mt-6 mb-6">
              Transforming Healthcare for ASEAN
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              We&apos;re building AI-powered healthcare solutions that connect patients with providers, breaking barriers of geography and resources.
            </motion.p>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:via-[#0f1420] dark:to-[#0a0a0a] border-t border-border/10">
          <motion.div
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="p-8 glass-card rounded-2xl"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                To democratize healthcare access across Southeast Asia by leveraging AI and digital innovation, ensuring every person can access quality medical care when they need it.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="p-8 glass-card rounded-2xl"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                A future where healthcare is universally accessible, affordable, and personalized. Where technology empowers patients and providers to achieve better outcomes together.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Core Values */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:via-[#0f1420] dark:to-[#0a0a0a]">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
              <p className="text-lg text-foreground/70">Principles guiding every decision</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="p-8 glass-card rounded-xl cursor-pointer transition-all"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="mb-4 inline-block p-3 bg-gradient-to-br from-blue-600/30 to-blue-500/10 rounded-lg"
                    >
                      <Icon className="w-6 h-6 text-blue-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                    <p className="text-foreground/70">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:via-[#0f1420] dark:to-[#0a0a0a] border-t border-border/10">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Leadership Team</h2>
              <p className="text-lg text-foreground/70">Experienced leaders driving innovation</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="p-6 glass-card rounded-xl text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600/30 to-blue-500/10 mx-auto mb-4"
                  />
                  <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-blue-400 font-semibold text-sm mb-3">{member.role}</p>
                  <p className="text-foreground/70 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:via-[#0f1420] dark:to-[#0a0a0a]">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">Join Our Mission</h2>
              <p className="text-xl text-foreground/70">
                Be part of transforming healthcare in Southeast Asia
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button asChild className="bg-primary hover:bg-primary-dark text-white px-8 py-6 rounded-lg font-semibold group">
                  <Link href="/partnership" className="flex items-center gap-2">
                    Get Started
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
