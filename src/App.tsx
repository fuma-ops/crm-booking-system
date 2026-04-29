import React, { useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Globe, ChevronDown, ChevronUp, Check, 
  ArrowRight, ShieldCheck, Zap, HeartPulse, 
  MessageSquare, Layers, Lock, Play, Star,
  Calendar, Users, BarChart3, Mail, MessageCircle, MonitorPlay
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { LanguageProvider, useTranslation } from './i18n/LanguageContext';
import { ClinicDemo } from './components/ClinicDemo';
import { LaunchLiveDemo } from './components/LaunchLiveDemo';
import { FloatingCrosses } from './components/ThreeBackground';
import { cn } from './lib/utils';
import { Routes, Route, Link } from 'react-router-dom';
import { ArticlePage } from './pages/ArticlePage';
import type { Language } from './i18n/translations';

const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

const LanguageSwitcher = () => {
  const { language, setLanguage, isRTL } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase">{language}</span>
        <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              "absolute top-full mt-2 z-20 min-w-[140px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-2",
              isRTL ? "left-0" : "right-0"
            )}
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all",
                  language === lang.code ? "bg-blue-50 text-blue-600 font-bold" : "hover:bg-slate-50 text-slate-600"
                )}
              >
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </span>
                {language === lang.code && <Check className="w-3 h-3" />}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
};

const Header = () => {
  const { t, isRTL } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
    )}>
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <HeartPulse className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight leading-none">{t.header.title}</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">{t.header.subtitle}</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-semibold hover:text-blue-600 transition-colors">{t.header.nav_features}</a>
          <a href="#demo" className="text-sm font-semibold hover:text-blue-600 transition-colors">{t.header.nav_demo}</a>
          <a href="#pricing" className="text-sm font-semibold hover:text-blue-600 transition-colors">{t.header.nav_pricing}</a>
          <LanguageSwitcher />
          <a href="https://fuma-ops.github.io/smartform-builder-catalogue/app.html" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition-transform active:scale-95 shadow-lg shadow-slate-200 inline-block text-center cursor-pointer">
            {t.header.nav_cta}
          </a>
        </div>

        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
           <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: isRTL ? -300 : 300 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 z-[60] bg-white p-6 flex flex-col gap-8"
        >
          <div className="flex justify-between items-center">
             <span className="font-bold">Menu</span>
             <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-6 h-6" /></button>
          </div>
          <div className="flex flex-col gap-4 text-xl font-bold">
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>{t.header.nav_features}</a>
            <a href="#demo" onClick={() => setIsMobileMenuOpen(false)}>{t.header.nav_demo}</a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>{t.header.nav_pricing}</a>
          </div>
          <div className="mt-auto flex flex-col gap-4">
             <LanguageSwitcher />
             <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold">
                {t.header.nav_cta}
             </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="p-8 bg-white rounded-3xl border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all duration-300 group"
  >
    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors mb-6">
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const PricingCard = ({ tier, price, features, isFeatured = false }: any) => {
  const { t } = useTranslation();
  return (
  <div className={cn(
    "relative p-8 rounded-3xl flex flex-col h-full transition-all duration-300",
    isFeatured ? "bg-slate-900 text-white scale-105 shadow-2xl z-10" : "bg-white border border-slate-100 shadow-sm hover:shadow-lg"
  )}>
    {isFeatured && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-xs font-bold rounded-full text-white uppercase tracking-widest">
        Recommended
      </div>
    )}
    <div className="mb-8">
      <h3 className={cn("text-lg font-bold mb-2 uppercase tracking-widest", isFeatured ? "text-blue-400" : "text-slate-400")}>{tier}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black">{price}</span>
        <span className={cn("text-xs font-bold", isFeatured ? "text-slate-400" : "text-slate-400")}>/mo</span>
      </div>
    </div>
    <div className="flex-1 space-y-4 mb-8">
      {features.map((f: string, i: number) => (
        <div key={i} className="flex items-center gap-3 text-sm">
          <Check className={cn("w-4 h-4 flex-shrink-0", isFeatured ? "text-blue-400" : "text-green-500")} />
          <span>{f}</span>
        </div>
      ))}
    </div>
    <button className={cn(
      "w-full py-4 rounded-2xl font-bold transition-all active:scale-95",
      isFeatured ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-800"
    )}>
      {t.pricing.button_start}
    </button>
  </div>
)};

const TestimonialCard = ({ name, role, text, img }: any) => (
  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
    <div className="flex items-center gap-2 text-orange-400 mb-4">
      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
    </div>
    <p className="text-slate-600 mb-6 italic text-sm">"{text}"</p>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
        <img src={img} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div>
        <h4 className="font-bold text-sm">{name}</h4>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest">{role}</p>
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  const { t, isRTL, language } = useTranslation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "2732e118-35a2-4728-a075-f769ce3bb029");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
        (e.target as HTMLFormElement).reset();
      } else {
        console.error("Form submission error:", data);
        alert("An error occurred while submitting the form. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#148f77]/20 selection:text-[#148f77]">
      <Helmet>
        <title>CRM Booking System</title>
        <meta name="description" content="Production-ready medical CRM landing page with interactive demo and multi-language support." />
      </Helmet>
      <FloatingCrosses />
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-[#148f77] origin-left z-[100]" style={{ scaleX }} />
      
      <Header />

      <main className="relative z-10 pt-24 pb-12 px-4 sm:px-6 flex flex-col gap-12 lg:gap-24">
        {/* Hero Section */}
        <section className="w-full bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 py-16 md:py-24 lg:py-[100px] px-6 md:px-10 text-center max-w-7xl mx-auto relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 inline-flex items-center px-4 py-2 bg-slate-50 rounded-full border border-slate-200 shadow-sm mb-8 text-sm font-bold text-slate-600"
          >
             {t.hero.badge}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[0.9]"
          >
            {t.hero.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#148f77] to-blue-600">
              {t.hero.title_accent}
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {t.hero.description}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a href="https://fuma-ops.github.io/smartform-builder-catalogue/app.html" target="_blank" rel="noopener noreferrer" className="group w-full sm:w-auto px-10 py-5 bg-[#148f77] text-white rounded-2xl font-black text-lg hover:bg-[#117a65] transition-all shadow-2xl shadow-[#148f77]/30 active:scale-95 flex items-center justify-center gap-3">
              {t.hero.cta_primary}
            </a>
            <a href="https://youtu.be/zjOgwPbxJMQ?si=0JhLNQYbu-7ZBgCr" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3 cursor-pointer">
              {t.hero.cta_secondary}
            </a>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
             {[
               { text: t.hero.trust_1 },
               { text: t.hero.trust_2 },
               { text: t.hero.trust_3 }
             ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center gap-3 p-4 bg-slate-50 rounded-2xl">
                  <span className="text-xs font-black uppercase tracking-widest text-[#148f77]">{item.text}</span>
                </div>
             ))}
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="w-full bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 py-16 md:py-24 lg:py-[100px] px-6 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
          {/* Decorative background image */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=1000" 
              alt="Medical tech" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="text-center mb-20 relative z-10">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">{t.features.section_title}</h2>
            <div className="w-20 h-2 bg-[#148f77] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={Calendar} title={t.features.booking_title} desc={t.features.booking_desc} delay={0.1} />
            <FeatureCard icon={MessageSquare} title={t.features.email_title} desc={t.features.email_desc} delay={0.2} />
            <FeatureCard icon={Users} title={t.features.crm_title} desc={t.features.crm_desc} delay={0.3} />
            <FeatureCard icon={Layers} title={t.features.forms_title} desc={t.features.forms_desc} delay={0.4} />
            <FeatureCard icon={Lock} title={t.features.access_title} desc={t.features.access_desc} delay={0.5} />
            <FeatureCard icon={BarChart3} title={t.features.analytics_title} desc={t.features.analytics_desc} delay={0.6} />
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="w-full bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 py-16 md:py-24 lg:py-[100px] px-4 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">{t.demo.section_title}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">{t.demo.description}</p>
          </div>
          <div dir="ltr">
            <ClinicDemo />
          </div>
          <div className="mt-12">
            <LaunchLiveDemo />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 py-16 md:py-24 lg:py-[100px] px-6 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
          <div className="text-center mb-16">
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-4xl font-black mb-4"
             >
               {t.pricing.section_title}
             </motion.h2>
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-slate-500 max-w-xl mx-auto"
             >
               {t.pricing.section_subtitle}
             </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
             {/* Standard Licence */}
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="relative p-8 rounded-3xl flex flex-col h-full bg-white border-2 border-[#148f77] shadow-xl transition-all duration-300 hover:-translate-y-2 mt-4 md:mt-0"
             >
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#148f77] text-xs font-bold rounded-full text-white uppercase tracking-widest">
                 {t.pricing.badge_popular}
               </div>
               <div className="mb-8 text-center pt-4">
                 <h3 className="text-xl font-bold mb-2 text-slate-800 uppercase tracking-widest">{t.pricing.standard_title}</h3>
                 <div className="flex items-baseline justify-center gap-1">
                   <span className="text-5xl font-black text-[#148f77]">$300</span>
                 </div>
                 <p className="text-sm font-bold text-slate-400 mt-2">{t.pricing.payment_one_time}</p>
               </div>
               
               <div className="flex-1 space-y-4 mb-8">
                 {t.pricing.features_standard.map((feature: string, idx: number) => (
                   <div key={idx} className="flex items-start gap-3">
                     <Check className="w-5 h-5 flex-shrink-0 text-[#148f77]" />
                     <span className="text-slate-600 text-sm font-medium">{feature}</span>
                   </div>
                 ))}
                 <div className="flex items-start gap-3 opacity-50 grayscale">
                    <X className="w-5 h-5 flex-shrink-0 text-slate-400" />
                    <span className="text-slate-600 text-sm line-through">Custom workflow configuration</span>
                  </div>
                  <div className="flex items-start gap-3 opacity-50 grayscale">
                    <X className="w-5 h-5 flex-shrink-0 text-slate-400" />
                    <span className="text-slate-600 text-sm line-through">Onboarding training session</span>
                  </div>
               </div>
               
               <a href="#contact" className="w-full py-4 rounded-2xl font-bold transition-all bg-slate-100 hover:bg-slate-200 text-slate-800 active:scale-95 border border-slate-200 block text-center mt-auto">
                 {t.pricing.button_standard}
               </a>
             </motion.div>

             {/* Pro Licence */}
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="relative p-8 rounded-3xl flex flex-col h-full bg-[#0d1b2a] text-white shadow-2xl transition-all duration-300 hover:-translate-y-2 lg:scale-105 z-10"
             >
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#148f77] text-xs font-bold rounded-full text-white uppercase tracking-widest shadow-lg shadow-[#148f77]/50">
                 {t.pricing.badge_service}
               </div>
               <div className="mb-8 text-center pt-4">
                 <h3 className="text-xl font-bold mb-2 text-[#148f77] uppercase tracking-widest">{t.pricing.pro_title}</h3>
                 <div className="flex items-baseline justify-center gap-1">
                   <span className="text-5xl font-black text-white">$500</span>
                 </div>
                 <p className="text-sm font-bold text-slate-400 mt-2">{t.pricing.payment_one_time}</p>
               </div>
               
               <div className="flex-1 space-y-4 mb-8">
                 {t.pricing.features_pro.map((feature: string, idx: number) => (
                   <div key={idx} className="flex items-start gap-3">
                     <Check className="w-5 h-5 flex-shrink-0 text-[#148f77]" />
                     <span className="text-slate-300 text-sm font-medium">{feature}</span>
                   </div>
                 ))}
               </div>
               
               <a href="#contact" className="w-full py-4 rounded-2xl font-bold transition-all bg-[#148f77] hover:bg-[#117a65] text-white active:scale-95 shadow-[0_0_20px_rgba(20,143,119,0.3)] border border-[#148f77] block text-center mt-auto">
                 {t.pricing.button_pro}
               </a>
             </motion.div>
          </div>

          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.5 }}
             className="mt-12 text-center"
          >
            <p className="text-sm font-bold text-slate-500 max-w-md mx-auto">
              {t.pricing.no_monthly_fees} <br />
              <span className="text-[#148f77]">{t.pricing.own_forever}</span>
            </p>
          </motion.div>
        </section>

        {/* Testimonials */}
        <section className="w-full bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 py-16 md:py-24 lg:py-[100px] px-6 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
          <h2 className="text-4xl lg:text-5xl font-black mb-16 text-center">{t.testimonials.section_title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TestimonialCard 
              name="Dr. Sarah L." 
              role="Dermatologist" 
              img="https://i.pravatar.cc/150?u=sarah"
              text={language === 'ar' ? "لقد أحدث نظام حجز CRM ثورة كاملة في كيفية إدارتنا للطوابير وسجلات المرضى." : "CRM Booking System has completely transformed how we manage our queue and patient records."} 
            />
            <TestimonialCard 
              name="Jean M." 
              role="Clinic Manager" 
              img="https://i.pravatar.cc/150?u=jean"
              text={language === 'ar' ? "العائد على الاستثمار مذهل. صفر رسوم شهرية وتحكم كامل في بياناتنا الطبية." : "The ROI is incredible. Zero monthly fees and complete control over our medical data."} 
            />
            <TestimonialCard 
              name="Dr. Antoine P." 
              role="General Practitioner" 
              img="https://i.pravatar.cc/150?u=antoine"
              text={language === 'ar' ? "قللت التذكيرات الآلية معدل عدم الحضور بنسبة 45٪. موصى به بشدة." : "The automated reminders reduced our no-show rate by 45%. Highly recommended."} 
            />
            <TestimonialCard 
              name="Maria V." 
              role="Secretary" 
              img="https://i.pravatar.cc/150?u=maria"
              text={language === 'ar' ? "أبسط برنامج استخدمته على الإطلاق. التكامل مع جداول بيانات جوجل رائع للتقارير." : "Simplest software I've used. Integration with Google Sheets is brilliant for reporting."} 
            />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 py-16 md:py-24 lg:py-[100px] px-6 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-black mb-4"
            >
              {t.contact.section_title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 max-w-2xl mx-auto"
            >
              {t.contact.description}
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            {/* Contact Options */}
            <div className="space-y-6">
              <motion.a 
                href="mailto:fumaops@gmail.com"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 hover:bg-[#148f77]/5 border border-slate-100 hover:border-[#148f77]/30 transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm text-[#148f77] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">{t.contact.email_title}</h4>
                  <p className="text-slate-500 font-medium">fumaops@gmail.com</p>
                </div>
              </motion.a>

              <motion.a 
                href="https://wa.me/your-number"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 hover:bg-[#25D366]/5 border border-slate-100 hover:border-[#25D366]/30 transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm text-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 mb-1">{t.contact.whatsapp_title}</h4>
                  <p className="text-slate-500 font-medium">{t.contact.whatsapp_chat}</p>
                </div>
                <div className="px-4 py-2 bg-[#25D366] text-white text-xs font-bold rounded-xl shadow-sm shadow-[#25D366]/30">
                  {t.contact.form_message}
                </div>
              </motion.a>

              <motion.a 
                href="https://fuma-ops.github.io/smartform-builder-catalogue/app.html"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MonitorPlay className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 mb-1">{t.contact.demo_title}</h4>
                  <p className="text-slate-500 font-medium">{t.contact.demo_test}</p>
                </div>
                <div className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-sm shadow-blue-600/30">
                  {t.pricing.button_start}
                </div>
              </motion.a>
            </div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50"
            >
              {isSubmitted ? (
                 <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                   <div className="w-16 h-16 bg-[#148f77]/10 text-[#148f77] rounded-full flex items-center justify-center mb-6">
                     <Check className="w-8 h-8" />
                   </div>
                   <h3 className="text-2xl font-black text-slate-800 mb-2">{t.contact.success_title}</h3>
                   <p className="text-slate-500">{t.contact.success_desc}</p>
                 </div>
              ) : (
                <form className="space-y-5" onSubmit={handleContactSubmit}>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.contact.form_name}</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#148f77]/30 focus:border-[#148f77] transition-all"
                      placeholder={t.contact.placeholder_name}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{t.contact.form_email}</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#148f77]/30 focus:border-[#148f77] transition-all"
                        placeholder={t.contact.placeholder_email}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{t.contact.form_phone}</label>
                      <input 
                        type="text" 
                        name="phone"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#148f77]/30 focus:border-[#148f77] transition-all"
                        placeholder={t.contact.placeholder_phone}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.contact.form_message}</label>
                    <textarea 
                      rows={4}
                      name="message"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#148f77]/30 focus:border-[#148f77] transition-all resize-none custom-scrollbar"
                      placeholder={t.contact.placeholder_message}
                    ></textarea>
                  </div>
                  <button className="w-full py-4 mt-2 bg-[#148f77] hover:bg-[#117a65] text-white rounded-2xl font-bold text-lg transition-transform active:scale-95 shadow-[0_0_20px_rgba(20,143,119,0.3)]">
                    {t.contact.form_submit}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 bg-[#0d1b2a] text-white relative overflow-hidden">
        {/* Abstract shapes in the footer */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#148f77]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
           <div className="grid lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
              <div className="lg:col-span-2">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#148f77] to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-[#148f77]/20">
                      <HeartPulse className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl font-black">{t.header.title}</h2>
                 </div>
                 <p className="text-slate-300 max-w-md text-lg leading-relaxed mb-8">
                   {t.footer.about}
                 </p>
                 <div className="flex gap-4">
                    <a href="#contact" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors border border-white/10 flex items-center gap-2">
                       <Mail className="w-4 h-4"/> {t.footer.contact_us}
                    </a>
                 </div>
              </div>
              <div>
                 <h4 className="font-bold text-lg mb-6 flex items-center gap-2 tracking-wide uppercase text-slate-400">{t.footer.product}</h4>
                 <ul className="space-y-4 text-slate-300 font-medium">
                    <li><a href="#features" className="hover:text-[#148f77] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> {t.header.nav_features}</a></li>
                    <li><a href="#demo" className="hover:text-[#148f77] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> {t.header.nav_demo}</a></li>
                    <li><a href="#" className="hover:text-[#148f77] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> {t.footer.documentation}</a></li>
                    <li><Link to="/article" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#148f77] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> {t.footer.articles}</Link></li>
                 </ul>
              </div>
              <div>
                 <h4 className="font-bold text-lg mb-6 flex items-center gap-2 tracking-wide uppercase text-slate-400">{t.footer.company}</h4>
                 <ul className="space-y-4 text-slate-300 font-medium">
                    <li><a href="#" className="hover:text-[#148f77] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> {t.footer.privacy}</a></li>
                    <li><a href="#" className="hover:text-[#148f77] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> {t.footer.terms}</a></li>
                    <li><a href="#contact" className="hover:text-[#148f77] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> {t.contact.section_title}</a></li>
                 </ul>
              </div>
           </div>
           
           <div className="pt-8 mt-16 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-slate-400 font-medium">
                  {t.footer.copyright}
                </p>
                <p className="text-sm text-slate-500 mt-1">{t.footer.all_rights}</p>
              </div>
              <div className="flex gap-4">
                 <a href="#" className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center hover:bg-[#148f77] hover:text-white transition-colors text-slate-400">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                 </a>
                 <a href="#" className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center hover:bg-[#148f77] hover:text-white transition-colors text-slate-400">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </footer>

      {/* Floating Scroll to Top & Action button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={cn(
              "fixed bottom-6 z-50 flex flex-col gap-3",
              isRTL ? "left-6" : "right-6"
            )}
          >
            <a 
              href="https://wa.me/your-number" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:-translate-y-1 hover:shadow-xl transition-all"
              aria-label="Contact on WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
            <button 
              onClick={scrollToTop}
              className="w-12 h-12 bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg shadow-slate-200 hover:-translate-y-1 hover:shadow-xl transition-all border border-slate-100"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/article" element={<ArticlePage />} />
      </Routes>
    </LanguageProvider>
  );
}
