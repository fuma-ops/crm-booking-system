import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const LaunchLiveDemo: React.FC = () => {
  const { isRTL } = useTranslation();

  return (
        <div className="max-w-4xl mx-auto text-center relative z-10 w-full pt-16 mt-16 border-t border-slate-100">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black mb-6"
          >
            Experience the Power. Try the Demo.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Log in below to explore the dashboard. <br className="hidden md:block" />
            <span className="text-slate-400 text-sm mt-2 block">
              Note: User Access Management is disabled in this public test environment for security reasons.
            </span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50 border border-slate-200 shadow-sm rounded-3xl p-8 md:p-12 max-w-2xl mx-auto relative group transition-all duration-500 hover:border-[#148f77]/30 hover:shadow-lg"
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex-1">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Login ID</span>
                <span className="text-xl font-mono text-[#148f77] font-bold">demo</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex-1">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Password</span>
                <span className="text-xl font-mono text-[#148f77] font-bold">demo2026</span>
              </div>
            </div>

            <a 
              href="https://fuma-ops.github.io/smartform-builder-catalogue/app.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#148f77] hover:bg-[#117a65] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-[0_0_20px_rgba(20,143,119,0.4)]"
            >
              Launch Live Demo
            </a>
          </motion.div>
        </div>
  );
};
