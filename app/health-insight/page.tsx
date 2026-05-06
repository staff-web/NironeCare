'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Bookmark, Share2, Beaker, Hospital, Lock, Users, Leaf, Brain } from 'lucide-react';
import Link from 'next/link';

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

export default function HealthInsight() {
  const articles = [
    {
      title: 'Antibiotic Misuse in ASEAN – How AI Diagnosis Reduces Self-Medication',
      excerpt: 'Antibiotic resistance is a growing crisis in Southeast Asia. NironCare\'s AI-powered diagnosis support helps patients understand when they truly need antibiotics, reducing unnecessary consumption by 45%.',
      featured: true,
      date: 'May 15, 2025',
      category: 'Healthcare Innovation',
      readTime: '8 min read',
      icon: Beaker,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Rural Telemedicine Cuts Diagnosis Time by 60%',
      excerpt: 'A groundbreaking study reveals how digital health dramatically improves access to specialist consultations in underserved regions, transforming patient outcomes.',
      date: 'May 10, 2025',
      category: 'Research',
      readTime: '6 min read',
      icon: Hospital,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Data Protection in Healthcare: Cambodia\'s New Law',
      excerpt: 'ASEAN countries are strengthening patient data privacy regulations. Learn how NironCare ensures compliance while maintaining data accessibility.',
      date: 'May 5, 2025',
      category: 'Policy',
      readTime: '5 min read',
      icon: Lock,
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Women in STEM Lead Digital Health Transformation',
      excerpt: 'Female health-tech professionals are driving innovation across the region. Meet the leaders reshaping ASEAN healthcare.',
      date: 'April 28, 2025',
      category: 'Culture',
      readTime: '7 min read',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Climate-Resilient Health Systems: ESG in Practice',
      excerpt: 'Building sustainable healthcare infrastructure for a changing world. How telemedicine is reducing carbon footprints across Asia.',
      date: 'April 20, 2025',
      category: 'Sustainability',
      readTime: '6 min read',
      icon: Leaf,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      title: 'AI Ethics in Medicine: Balancing Innovation with Safety',
      excerpt: 'Exploring the frameworks that ensure AI-driven diagnosis remains trustworthy. An in-depth look at responsible AI in healthcare.',
      date: 'April 15, 2025',
      category: 'Technology',
      readTime: '10 min read',
      icon: Brain,
      color: 'from-indigo-500 to-indigo-600'
    },
  ];

  const sidebarQuotes = [
    { text: 'NironCare has transformed how I serve my rural patients. Specialists are now just minutes away.', author: 'Dr. Sokphea, Cambodia', role: 'Primary Care Physician' },
    { text: 'Access to quality healthcare should not depend on geography or wealth. This platform proves it\'s possible.', author: 'Nurse Linh, Vietnam', role: 'Clinical Director' },
    { text: 'The AI diagnosis support has helped me catch complications early. My patients trust the system.', author: 'Dr. Ravi, Thailand', role: 'Internal Medicine' },
  ];

  return (
    <>
      <Navbar />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-secondary/5 to-background">
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
                Health Insights & Research
              </span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mt-6 mb-6">
              Latest Healthcare <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Insights</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Research, insights, and stories from digital healthcare transformation in ASEAN
            </motion.p>
          </motion.div>
        </section>

        {/* Main Content */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
          <motion.div
            className="max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Featured Article */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <div className="group">
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all mb-6"
                  >
                    <div className={`flex items-center justify-center p-12 bg-gradient-to-br ${articles[0].color}`}>
                      {React.createElement(articles[0].icon, { size: 80, className: 'text-white opacity-90' })}
                    </div>
                  </motion.div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                        {articles[0].category}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar size={16} />
                        {articles[0].date}
                      </span>
                      <span className="text-muted-foreground">{articles[0].readTime}</span>
                    </div>

                    <h2 className="text-4xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                      {articles[0].title}
                    </h2>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {articles[0].excerpt}
                    </p>

                    <div className="flex items-center gap-4 pt-4">
                      <Button className="bg-primary hover:bg-primary-dark px-6 py-2 rounded-lg">
                        Read Article
                      </Button>
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Save article">
                        <Bookmark size={20} className="text-muted-foreground" />
                      </button>
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Share article">
                        <Share2 size={20} className="text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div variants={itemVariants} className="space-y-8">
                {/* Quotes */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-foreground">From the Field</h3>
                  {sidebarQuotes.map((quote, index) => (
                    <div key={index} className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all">
                      <p className="text-muted-foreground italic mb-4 leading-relaxed">
                        "{quote.text}"
                      </p>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{quote.author}</p>
                        <p className="text-xs text-muted-foreground">{quote.role}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Newsletter */}
                <motion.div variants={itemVariants}>
                  <div className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
                    <h4 className="text-lg font-bold text-foreground mb-4">Stay Updated</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get weekly insights on healthcare innovation in ASEAN.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-colors text-sm"
                      />
                      <Button className="w-full bg-primary hover:bg-primary-dark rounded-lg">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Article Grid */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/5 to-background">
          <motion.div
            className="max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Latest Articles</h2>
              <p className="text-lg text-muted-foreground">Explore more insights and research</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(1).map((article, index) => (
                <motion.article
                  key={article.title}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="flex flex-col h-full p-8 bg-card rounded-xl border border-border hover:border-primary/50 transition-all"
                >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${article.color} mb-4`}>
                      {React.createElement(article.icon, { size: 24, className: 'text-white' })}
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                        {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight flex-grow">
                      {article.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar size={14} />
                        {article.date}
                      </span>
                      <button className="text-primary hover:text-primary-dark transition-colors">
                        <ArrowRight size={18} />
                      </button>
                    </div>
                </motion.article>
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
              <h2 className="text-4xl font-bold text-foreground">
                Ready to Learn More?
              </h2>
              <p className="text-xl text-muted-foreground">
                Explore how NironCare is transforming healthcare delivery
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
