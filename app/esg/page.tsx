'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Leaf, Users, Scale, TrendingUp, Award, Heart } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function ESG() {
  const environmental = [
    {
      title: 'Low-Carbon Telemedicine',
      description: 'Every virtual consultation eliminates ~0.5kg of CO2 from avoided travel',
      metric: '2,500+ tons CO2 saved',
      icon: '🌍'
    },
    {
      title: 'Paperless Operations',
      description: 'Digital health records eliminate 95% of paper waste in healthcare delivery',
      metric: '50M+ pages saved',
      icon: '📱'
    },
    {
      title: 'Energy-Efficient Infrastructure',
      description: '100% renewable energy powers our cloud infrastructure',
      metric: '99.9% clean energy',
      icon: '⚡'
    },
  ];

  const social = [
    {
      title: 'Rural Healthcare Access',
      description: 'Bring quality care to remote communities through telemedicine',
      metric: '500K+ patients reached',
      icon: '🏥'
    },
    {
      title: 'Women in Healthcare',
      description: 'Training and supporting female healthcare professionals across ASEAN',
      metric: '6,000+ women trained',
      icon: '👩‍⚕️'
    },
    {
      title: 'Affordable Care Program',
      description: 'Subsidized consultations for underserved populations',
      metric: '80% cost reduction',
      icon: '💰'
    },
    {
      title: 'Health Literacy Initiative',
      description: 'Educational programs to improve health awareness and prevention',
      metric: '50K+ educated',
      icon: '📚'
    },
  ];

  const governance = [
    {
      title: 'Data Privacy & Security',
      description: 'HIPAA-compliant systems protecting patient data with military-grade encryption',
      standard: 'ISO 27001 Certified'
    },
    {
      title: 'Ethical AI Practices',
      description: 'Transparent AI algorithms with human oversight to prevent bias and errors',
      standard: 'Certified AI Ethics'
    },
    {
      title: 'Transparent Operations',
      description: 'Regular ESG reporting and stakeholder engagement for accountability',
      standard: 'Annual ESG Report'
    },
    {
      title: 'Regulatory Compliance',
      description: 'Full compliance with healthcare regulations across all operating countries',
      standard: 'Multi-Country Certified'
    },
  ];

  return (
    <>
      <Navbar />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-secondary/5 to-background">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          </div>

          <motion.div
            className="relative max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                ESG & Impact
              </span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mt-6 mb-6">
              Building a Sustainable Healthcare Future
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Creating positive environmental, social, and governance impact through healthcare innovation
            </motion.p>
          </motion.div>
        </section>

        {/* Environmental Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
                <h2 className="text-4xl font-bold text-foreground">Environmental</h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Creating a sustainable healthcare ecosystem through technology and responsible practices
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {environmental.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="p-8 bg-card rounded-2xl border border-border hover:border-green-500/50 transition-all"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-6">{item.description}</p>
                  <div className="pt-6 border-t border-border">
                    <p className="text-sm font-semibold text-green-600">{item.metric}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Social Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/5 to-background">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-blue-600" />
                <h2 className="text-4xl font-bold text-foreground">Social</h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Empowering communities with access to quality, affordable healthcare
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {social.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="p-8 bg-card rounded-2xl border border-border hover:border-blue-500/50 transition-all"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-6">{item.description}</p>
                  <div className="pt-6 border-t border-border">
                    <p className="text-sm font-semibold text-blue-600">{item.metric}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Governance Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-8 h-8 text-purple-600" />
                <h2 className="text-4xl font-bold text-foreground">Governance</h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Maintaining the highest standards of ethics, transparency, and accountability
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {governance.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="p-8 bg-card rounded-2xl border border-border hover:border-purple-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground flex-1">{item.title}</h3>
                    <Award className="w-6 h-6 text-purple-600 flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-muted-foreground mb-6">{item.description}</p>
                  <div className="pt-6 border-t border-border">
                    <p className="text-sm font-semibold text-purple-600">{item.standard}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-background">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">Be Part of the Change</h2>
              <p className="text-xl text-muted-foreground">
                Together, we&apos;re building a healthier, more sustainable future for ASEAN
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button asChild className="bg-primary hover:bg-primary-dark text-white px-8 py-6 rounded-lg font-semibold group">
                  <Link href="/partnership" className="flex items-center gap-2">
                    Partner With Us
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
