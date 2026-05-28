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

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50 dark:bg-[#070c14]">
        <section className="py-24 px-4 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Privacy Policy</h1>
              <p className="text-slate-600 dark:text-slate-400">Last updated: May 28, 2025</p>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} initial="hidden" animate="visible" className="prose prose-slate dark:prose-invert max-w-none">
              <div className="bg-white dark:bg-[#0b1220] rounded-2xl p-8 border border-slate-200 dark:border-slate-800 space-y-6">
                <section>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Information We Collect</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, phone number, and health information shared during consultations.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. How We Use Your Information</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations. Your health data is used solely for providing medical care and never shared without your explicit consent.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Data Security</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    We implement industry-standard security measures including AES-256 encryption, TLS 1.3, and regular security audits. Your data is protected with the same security standards used by major financial institutions.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Your Rights</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    You have the right to access, correct, or delete your personal information. You may also request a copy of your data or ask us to restrict processing. Contact us at privacy@nironcare.com for any data requests.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Contact Us</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    If you have questions about this Privacy Policy, please contact us at privacy@nironcare.com or visit our <a href="/contact" className="text-blue-600 hover:underline">Contact Page</a>.
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