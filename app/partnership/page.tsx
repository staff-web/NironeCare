'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Building2, Users, Globe } from 'lucide-react';

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

export default function Partnership() {
  const partnerTypes = [
    {
      icon: '🏥',
      title: 'Healthcare Providers',
      description: 'Hospitals, clinics, and medical centers looking to digitize operations',
      benefits: ['Digital queue system', 'Telemedicine platform', 'Patient analytics', 'Integration support'],
    },
    {
      icon: '🤝',
      title: 'Strategic Partners',
      description: 'Technology, insurance, and pharmaceutical partners',
      benefits: ['API integration', 'Revenue sharing', 'Custom solutions', 'Dedicated support'],
    },
    {
      icon: '🎓',
      title: 'Educational Institutions',
      description: 'Medical schools and health training centers',
      benefits: ['Training programs', 'Research collaboration', 'Student access', 'Special pricing'],
    },
    {
      icon: '🌍',
      title: 'Government Agencies',
      description: 'Public health departments and government health organizations',
      benefits: ['Bulk deployment', 'Compliance support', 'Custom features', 'Government pricing'],
    },
  ];

  const benefits = [
    'Increase patient capacity by 3-5x',
    'Reduce operational costs by 40%',
    'Improve patient satisfaction scores',
    'Enable remote consultations instantly',
    'Gain valuable health analytics',
    'Access 24/7 technical support',
  ];

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-secondary/5 to-background">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute top-1/3 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
          </div>

          <motion.div
            className="relative max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                Partner With Us
              </span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mt-6 mb-6">
              Growing Together
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join healthcare providers, technology partners, and institutions transforming healthcare across Southeast Asia
            </motion.p>
          </motion.div>
        </section>

        {/* Partner Types */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Partnership Opportunities</h2>
              <p className="text-lg text-muted-foreground">Multiple ways to partner with NironCare</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {partnerTypes.map((partner) => (
                <motion.div
                  key={partner.title}
                  variants={itemVariants}
                  whileHover={{ y: -12, boxShadow: '0 25px 50px rgba(0, 70, 192, 0.12)' }}
                  className="group relative p-8 bg-card rounded-2xl border border-border overflow-hidden transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="text-5xl mb-6 inline-block"
                    >
                      {partner.icon}
                    </motion.div>

                    <h3 className="text-2xl font-bold text-foreground mb-3">{partner.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{partner.description}</p>

                    <div className="space-y-3">
                      {partner.benefits.map((benefit) => (
                        <motion.div
                          key={benefit}
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-3 text-sm text-foreground"
                        >
                          <CheckCircle size={18} className="text-primary flex-shrink-0" />
                          {benefit}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/5 to-background">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Partner Benefits</h2>
              <p className="text-lg text-muted-foreground">What you gain from partnership</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold">{benefit}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Partner?</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Let&apos;s schedule a conversation to discuss how we can work together
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="p-8 bg-card rounded-xl border border-border text-center"
                >
                  <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2">For Institutions</h3>
                  <p className="text-muted-foreground text-sm mb-4">Partner with us to digitize healthcare</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="mailto:partnerships@nironcare.com">Contact</Link>
                  </Button>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="p-8 bg-card rounded-xl border border-border text-center"
                >
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2">For Individuals</h3>
                  <p className="text-muted-foreground text-sm mb-4">Join our platform as a healthcare provider</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="mailto:providers@nironcare.com">Apply</Link>
                  </Button>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="p-8 bg-card rounded-xl border border-border text-center"
                >
                  <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2">For Investors</h3>
                  <p className="text-muted-foreground text-sm mb-4">Invest in the future of healthcare</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="mailto:investors@nironcare.com">Inquire</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-background">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">Let&apos;s Transform Healthcare Together</h2>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button asChild className="bg-primary hover:bg-primary-dark text-white px-8 py-6 rounded-lg font-semibold group">
                  <Link href="mailto:hello@nironcare.com" className="flex items-center gap-2">
                    Get in Touch
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
