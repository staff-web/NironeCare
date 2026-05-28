'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1 },
  }),
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50 dark:bg-[#070c14]">
        <section className="py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Terms of Service</h1>
              <p className="text-slate-600 dark:text-slate-400">Last updated: May 28, 2025</p>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} initial="hidden" animate="visible" className="prose prose-slate dark:prose-invert max-w-none">
              <div className="bg-white dark:bg-[#0b1220] rounded-2xl p-8 border border-slate-200 dark:border-slate-800 space-y-6">
                <section>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    By accessing or using NironCare's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Description of Service</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    NironCare provides a healthcare platform that connects patients with healthcare providers, offers telemedicine consultations, AI-assisted diagnostics, and patient management tools. Services are provided "as is" and we continuously work to improve them.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. User Responsibilities</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    You are responsible for providing accurate information, maintaining confidentiality of your account, and complying with all applicable laws. You agree not to misuse the platform or interfere with its operation.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Medical Disclaimer</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    NironCare facilitates connections with licensed healthcare providers but does not provide medical advice directly. Always consult with a qualified healthcare professional for medical decisions. In emergencies, contact local emergency services immediately.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Termination</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    We may terminate or suspend your access immediately for violation of these terms. Upon termination, your right to use the service will cease immediately.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Contact Us</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Questions about these Terms? Contact us at legal@nironcare.com or visit our <a href="/contact" className="text-blue-600 hover:underline">Contact Page</a>.
                  </p>
                </section>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}