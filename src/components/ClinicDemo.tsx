import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, CheckCircle2, User, BarChart3, FileText, 
  ChevronRight, ArrowRight, Bell, Mail, Clock, 
  Plus, Users, Search, Settings, Layout, Phone, Video, Stethoscope, MoreVertical, Link, Edit2, Copy, FileIcon, Trash2, Key, Check
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from '../i18n/LanguageContext';

const BRAND_COLOR = "bg-[#148f77]";
const TEXT_BRAND = "text-[#148f77]";

export const ClinicDemo: React.FC = () => {
  const { t, isRTL } = useTranslation();
  const [activeScene, setActiveScene] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const SCENES = [
    { id: 'dashboard', title: t.demo_labels.dashboard, icon: BarChart3, color: BRAND_COLOR },
    { id: 'projects', title: t.demo_labels.projects, icon: Layout, color: BRAND_COLOR },
    { id: 'appointments', title: t.demo_labels.appointments, icon: Calendar, color: BRAND_COLOR },
    { id: 'create_form', title: t.demo_labels.create_form, icon: Plus, color: BRAND_COLOR },
    { id: 'users', title: t.demo_labels.users, icon: Users, color: BRAND_COLOR }
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveScene((prev) => (prev + 1) % SCENES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start opacity-100">
          {/* Controls */}
          <div className="w-full lg:w-1/3 flex sm:grid sm:grid-cols-2 lg:flex flex-row lg:flex-col gap-4 overflow-x-auto pb-4 lg:pb-0 snap-x">
            {SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => {
                  setActiveScene(idx);
                  setIsPaused(true);
                }}
                className={cn(
                  "flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 text-left border-2 snap-start min-w-[280px] lg:min-w-0",
                  activeScene === idx 
                    ? "bg-white border-[#148f77] shadow-lg shadow-[#148f77]/20 scale-100 lg:scale-105" 
                    : "bg-transparent border-transparent hover:bg-slate-50/50 text-slate-500"
                )}
                style={{ direction: isRTL ? 'rtl' : 'ltr' }}
              >
                <div className={cn("p-3 rounded-xl shadow-sm", scene.color)}>
                  <scene.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={cn("font-black text-lg", activeScene === idx ? "text-slate-900" : "text-slate-500")}>
                    {scene.title}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70 mt-1">
                    {activeScene === idx ? "Live" : t.demo_labels.open}
                  </p>
                </div>
                <div className="ms-auto flex-shrink-0">
                  {activeScene === idx && (
                    <motion.div layoutId="active-indicator">
                      <ChevronRight className="w-5 h-5 text-[#148f77]" />
                    </motion.div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Screen - mimicking a tablet interface */}
          <div className="w-full lg:w-2/3 h-[500px] md:h-[600px] bg-slate-950 rounded-[2rem] md:rounded-[3rem] p-3 shadow-3xl relative border-4 md:border-8 border-slate-800 flex flex-col items-center shadow-2xl ring-4 ring-slate-900/50">
            {/* Camera element (top) */}
            <div className="w-12 md:w-16 h-3 md:h-4 bg-slate-900 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl z-30 flex items-center justify-center">
               <div className="w-1.5 h-1.5 rounded-full bg-slate-700/50" />
            </div>

            <div className="w-full flex-1 bg-white rounded-xl md:rounded-[2rem] overflow-hidden relative flex shadow-inner mt-2 md:mt-3 mb-4 md:mb-6">
              {/* Sidebar */}
              <div className="w-16 md:w-48 bg-white border-r border-slate-200 flex flex-col py-4 shrink-0 transition-all duration-300 z-20">
                <div className="px-2 md:px-4 mb-4 md:mb-8 flex items-center justify-center md:justify-start gap-2">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md">
                    <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100" alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <span className="font-bold text-[#148f77] leading-tight text-sm hidden md:block">Clinic CRM<br/>System</span>
                </div>
                
                <div className="px-2 md:px-4 mb-4 hidden md:block">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <User className="w-4 h-4" /> Admin
                  </div>
                </div>

                <nav className="flex-1 space-y-1.5 px-2 md:px-3 mt-4 md:mt-0">
                  <SidebarItem icon={BarChart3} label={t.demo_labels.dashboard} active={activeScene === 0} />
                  <SidebarItem icon={Layout} label={t.demo_labels.projects} active={activeScene === 1} />
                  <SidebarItem icon={Calendar} label={t.demo_labels.appointments} active={activeScene === 2} />
                  <SidebarItem icon={Plus} label={t.demo_labels.create_form} active={activeScene === 3} />
                  <SidebarItem icon={Users} label={t.demo_labels.users} active={activeScene === 4} />
                  <SidebarItem icon={Settings} label={t.demo_labels.settings} active={false} />
                </nav>

                <div className="px-4 mt-auto border-t border-slate-100 pt-3">
                   <div className="flex items-center gap-2 text-xs font-medium text-red-500 cursor-pointer py-2 px-2 hover:bg-red-50 rounded-lg">
                      <ArrowRight className="w-4 h-4 rotate-180" /> {t.demo_labels.logout}
                   </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 relative overflow-hidden bg-[#eef6f1]">
                {/* Background Pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
                  <svg width="100%" height="100%">
                    <pattern id="pattern-hospital" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                      <path d="M38 28h4v24h-4zM28 38h24v4H28z" fill="#148f77" opacity="0.15" />
                      <circle cx="20" cy="20" r="3" fill="#148f77" opacity="0.1" />
                      <circle cx="60" cy="60" r="3" fill="#148f77" opacity="0.1" />
                    </pattern>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-hospital)" />
                  </svg>
                </div>
                
                <div className="absolute inset-0 overflow-y-auto z-10 custom-scrollbar">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeScene}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="w-full min-h-full p-6 flex flex-col"
                    >
                      {activeScene === 0 && <DashboardScene />}
                      {activeScene === 1 && <ProjectsScene />}
                      {activeScene === 2 && <AppointmentsScene />}
                      {activeScene === 3 && <CreateFormScene />}
                      {activeScene === 4 && <UsersScene />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            
            {/* Tablet Home Indicator (Bottom) */}
            <div className="w-24 md:w-32 h-1 md:h-1.5 bg-slate-800 rounded-full mx-auto" />
          </div>
    </div>
  );
};

const Lock = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);

const SidebarItem = ({ icon: Icon, label, active }: any) => (
  <div className={cn(
    "flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm font-medium",
    active ? "bg-[#148f77] text-white shadow-md shadow-[#148f77]/20" : "text-slate-600 hover:bg-slate-100/60"
  )}>
    <Icon className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
    <span className="hidden md:inline">{label}</span>
  </div>
);

// SCENE 0: DASHBOARD
const DashboardScene = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full gap-6" dir="ltr">
      <div className="flex items-center gap-3 text-[#148f77] font-black text-xl mb-2">
      <Plus className="w-6 h-6 border-2 border-[#148f77] rounded flex items-center justify-center p-0.5" />
      <h2>{t.demo_labels.overview}</h2>
    </div>

    <div className="grid grid-cols-3 gap-4">
      {/* Top Cards */}
      <div className="bg-white rounded-xl shadow-sm border-t-4 border-[#148f77] p-5">
        <h3 className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-2">{t.demo_labels.today_appointments}</h3>
        <p className="text-3xl font-black text-slate-800">12</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border-t-4 border-yellow-400 p-5">
        <h3 className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-2">{t.demo_labels.pending_approvals}</h3>
        <p className="text-3xl font-black text-slate-800">5</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border-t-4 border-purple-500 p-5">
        <h3 className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-2">{t.demo_labels.satisfaction}</h3>
        <p className="text-3xl font-black text-slate-800">4.8 <span className="text-sm font-medium text-slate-400">/ 5</span></p>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 bg-white rounded-xl shadow-sm p-5 border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="font-bold text-slate-800">{t.demo_labels.performance}</h3>
          <span className="bg-[#eef6f1] text-[#148f77] text-xs font-bold px-2 py-0.5 rounded-full">22/04/2026</span>
        </div>
        <div className="h-40 flex items-end justify-between px-4 pb-2">
          {/* Chart Bars */}
          {[
            { label: 'Mon', h1: '70%', h2: '15%', c1: 'bg-[#148f77]', c2: 'bg-orange-400', v1: '13', v2: '2' },
            { label: 'Tue', h1: '10%', c1: 'bg-[#148f77]', v1: '1' },
            { label: 'Wed', h1: '80%', h2: '0%', c1: 'bg-[#d1e8df]', v1: '' },
            { label: 'Thu', h1: '15%', c1: 'bg-[#148f77]', v1: '3' },
            { label: 'Fri', h1: '10%', c1: 'bg-[#148f77]', v1: '1' },
            { label: 'Sat', h1: '0%' },
            { label: 'Sun', h1: '0%' },
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-2 w-full">
              <div className="w-10 h-32 flex flex-col justify-end gap-0.5">
                {bar.h2 && <div className={cn("w-full text-center text-[9px] text-white font-bold flex items-center justify-center rounded-t-sm", bar.c2)} style={{height: bar.h2}}>{bar.v2}</div>}
                {bar.h1 && <div className={cn("w-full text-center text-[9px] text-white font-bold flex items-center justify-center", !bar.h2 ? "rounded-t-sm" : "", bar.c1)} style={{height: bar.h1}}>{bar.v1}</div>}
              </div>
              <span className="text-xs text-slate-500 font-medium">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-1 bg-white rounded-xl shadow-sm p-5 border border-slate-100 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800">{t.demo_labels.agenda}</h3>
          <span className="bg-blue-50 text-blue-500 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Live</span>
        </div>
        <div className="flex-1 space-y-3">
          {[
            { time: '10:00', name: 'Hannah Brown', desc: 'Dermatology - D...' },
            { time: '14:30', name: 'Hannah Brown', desc: 'Dermatology - D...' }
          ].map((ag, i) => (
            <div key={i} className="flex items-center gap-3 p-2 border border-slate-100 rounded-lg cursor-pointer transition-colors hover:bg-slate-50 hover:border-slate-200">
              <div className="text-blue-600 font-bold text-sm bg-blue-50 px-2 py-1 rounded">{ag.time}</div>
              <div className="flex-1">
                <div className="font-bold text-sm text-slate-800">{ag.name}</div>
                <div className="text-xs text-slate-500 flex items-center gap-1"><Stethoscope className="w-3 h-3 text-slate-400"/> {ag.desc}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Calendar */}
    <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100 mt-2 flex-1">
      <h3 className="font-bold text-slate-800 mb-4">Activity for April 2026</h3>
      <div className="grid grid-cols-7 gap-1 h-fit">
        {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-slate-400 py-1">{d}</div>
        ))}
        {Array.from({length: 14}).map((_, i) => (
          <div key={i} className={cn("border border-slate-100 rounded p-1 flex flex-col gap-1 min-h-[60px]", i === 10 ? "bg-[#eef6f1]" : "")} />
        ))}
      </div>
    </div>
  </div>
);
};

// SCENE 1: MY PROJECTS (FORMS)
const ProjectsScene = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full gap-6" dir="ltr">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-black text-[#148f77]">{t.demo_labels.projects}</h2>
      </div>
      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full text-slate-400 text-sm w-48">
        <Search className="w-4 h-4" /> <span>{t.demo_labels.search}</span>
      </div>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { title: 'Dermatology - Direct Booking', id: 'F_MED_1775732165663', icon: Stethoscope },
        { title: 'Pediatrics - Request Visit', id: 'F_MED_1775732165664', icon: User },
        { title: 'Mental Health Assessment', id: 'F_MED_1775732165665', icon: CheckCircle2 },
        { title: 'Pre-Surgery Admission Form', id: 'F_MED_1775732165666', icon: FileText },
        { title: 'Home Blood Test Request', id: 'F_MED_1775732165667', icon: Clock },
        { title: 'Dental Visit Feedback', id: 'F_MED_1775732165668', icon: CheckCircle2 },
      ].map((form, i) => (
        <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay:i*0.05}} key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-[#148f77] text-white flex items-center justify-center shrink-0">
               <form.icon className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
              {form.id} <Link className="w-3 h-3 text-slate-300" />
            </div>
          </div>
          
          <h3 className="font-bold text-slate-800 text-sm mt-2 line-clamp-1 flex items-center gap-2">
            <form.icon className="w-4 h-4 text-[#148f77]" /> {form.title}
          </h3>
          
          <button className="w-full bg-[#148f77] text-white font-bold text-sm py-2 rounded-full mt-2 mb-1">
            {t.demo_labels.open}
          </button>
          
          <div className="flex items-center justify-between border-t border-slate-100 pt-3 px-1 mt-1">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold cursor-pointer hover:text-slate-600 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
               <Edit2 className="w-3 h-3" /> {t.demo_labels.edit}
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 text-blue-500 p-1 rounded-sm"><Copy className="w-3 h-3" /></div>
              <div className="bg-green-50 text-green-600 p-1 rounded-sm"><FileIcon className="w-3 h-3" /></div>
              <div className="bg-red-50 text-red-500 p-1 rounded-sm"><Trash2 className="w-3 h-3" /></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);
};

// SCENE 2: APPOINTMENTS
const AppointmentsScene = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full gap-4" dir="ltr">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3">
        <Calendar className="w-6 h-6 text-[#148f77]" />
        <h2 className="text-xl font-black text-[#148f77]">{t.demo_labels.appointments}</h2>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 flex items-center gap-2">
         <Search className="w-3 h-3 text-slate-400" />
         <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 ml-1">
           <span className="text-[#148f77] font-bold">🩺 Pediatrics - Request Visit</span>
         </div>
      </div>
    </div>

    {/* Toolbar */}
    <div className="flex justify-between items-end pb-2 gap-4 flex-wrap">
      <div className="space-y-4">
        {/* Bulk actions */}
        <div className="flex gap-2 items-center flex-wrap">
          <div className="flex items-center gap-2 mr-2">
             <div className="w-3 h-3 border border-slate-300 rounded-sm bg-white" />
             <span className="text-xs font-bold text-slate-600">Select All</span>
          </div>
          <button className="bg-green-100 border border-green-200 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap">{t.demo_labels.confirm} ( 0 )</button>
          <button className="bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap">{t.demo_labels.cancel} ( 0 )</button>
          <button className="bg-red-100 border border-red-200 text-red-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap">{t.demo_labels.delete} ( 0 )</button>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 bg-white rounded-full p-1 border border-slate-200 w-fit overflow-x-auto">
          <button className="bg-slate-800 text-white text-xs font-bold px-4 py-1.5 rounded-full">All</button>
          <button className="text-slate-500 hover:text-slate-800 text-xs font-bold px-4 py-1.5 rounded-full transition-colors">{t.demo_labels.status_pending}</button>
          <button className="text-slate-500 hover:text-slate-800 text-xs font-bold px-4 py-1.5 rounded-full transition-colors">{t.demo_labels.status_confirmed}</button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 w-full sm:w-auto">
         <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-full flex items-center justify-between text-xs text-slate-400 shadow-sm min-w-[140px]">
           <span>jj/mm/aaaa</span> <Calendar className="w-3 h-3" />
         </div>
         <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-slate-400 shadow-sm w-full md:w-48">
           <Search className="w-3 h-3" /> <span>Search...</span>
         </div>
      </div>
    </div>

    {/* List */}
    <div className="flex-1 overflow-y-auto space-y-3 pb-8 custom-scrollbar">
      {[
        { time: '14:50', date: '2026-04-20', status: 'Confirmed', border: 'border-l-green-400', pill: 'bg-[#e2f5ec] text-[#148f77]' },
        { time: '14:30', date: '2026-04-20', status: 'Confirmed', border: 'border-l-green-400', pill: 'bg-[#e2f5ec] text-[#148f77]' },
        { time: '13:50', date: '2026-04-20', status: t.demo_labels.status_pending, border: 'border-l-orange-400', pill: 'bg-orange-100 text-orange-600' },
        { time: '12:50', date: '2026-04-20', status: t.demo_labels.status_pending, border: 'border-l-orange-400', pill: 'bg-orange-100 text-orange-600' },
        { time: '13:30', date: '2026-04-20', status: t.demo_labels.status_confirmed, border: 'border-l-green-400', pill: 'bg-[#e2f5ec] text-[#148f77]' },
        { time: '13:10', date: '2026-04-14', status: t.demo_labels.status_cancelled, border: 'border-l-red-400', pill: 'bg-red-100 text-red-600' },
      ].map((apt, i) => (
        <motion.div initial={{x:-10, opacity:0}} animate={{x:0, opacity:1}} transition={{delay: i*0.05}} key={i} 
          className={cn("bg-white rounded-xl shadow-sm border border-slate-100 border-l-[6px] p-3 flex items-center justify-between", apt.border)}
        >
          <div className="flex items-center gap-4">
             <div className="w-3 h-3 border border-slate-300 rounded-sm bg-white ml-2" />
             <div className="font-bold text-[#148f77] w-12">{apt.time}</div>
             <div className="flex flex-col ml-8">
               <span className="font-bold text-sm text-slate-800">{apt.date}</span>
               <span className="text-[10px] text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3"/> {apt.date}</span>
             </div>
          </div>
          <div className="flex items-center gap-3 pr-2">
            <span className={cn("px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold", apt.pill)}>{apt.status}</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);
};

// SCENE 3: CREATE FORM
const CreateFormScene = () => {
  const { t } = useTranslation();
  return (
  <div className="flex flex-col h-full gap-4">
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm top-0 z-10 flex items-center gap-2">
      <h2 className="text-xl font-black text-[#148f77]">{t.demo_labels.create_form}</h2>
    </div>
    
    <div className="flex-1 flex flex-col md:flex-row gap-4 h-full overflow-y-auto md:overflow-y-hidden">
      {/* Left Column: Identity & Advanced */}
      <div className="w-full md:w-1/3 flex flex-col gap-4 overflow-y-visible md:overflow-y-auto pr-1 custom-scrollbar shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <h3 className="font-bold text-[#148f77] flex items-center gap-2 mb-4"><span className="text-[#148f77]">🌐</span> {t.demo_labels.identity}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Project Name</label>
              <input type="text" className="w-full border border-slate-200 rounded-lg p-2 text-sm bg-white" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Subtitle (Optional)</label>
              <input type="text" className="w-full border border-slate-200 rounded-lg p-2 text-sm bg-white" placeholder="Ex: Questionnaire de début d'année" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Icon</label>
              <select className="w-full border border-slate-200 rounded-lg p-2 text-sm bg-white text-slate-600"><option>Feuille / Nature</option></select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Background Pattern (Public)</label>
              <select className="w-full border border-slate-200 rounded-lg p-2 text-sm bg-white text-slate-600"><option>patternSolid</option></select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Background Image</label>
              <input type="text" className="w-full border border-slate-200 rounded-lg p-2 text-sm bg-white" placeholder="Lien direct vers l'image..." />
            </div>
            
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Background Color</label>
              <div className="w-full h-8 bg-slate-50 border border-slate-200 rounded-lg"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-800 mb-1.5">Primary Color</label>
                <div className="w-full h-8 bg-[#8bf863] rounded-lg"></div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-800 mb-1.5">Button Text</label>
                <div className="w-full h-8 bg-slate-900 rounded-lg"></div>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Font</label>
              <select className="w-full border border-slate-200 rounded-lg p-2 text-sm bg-white text-slate-600"><option>Poppins (Moderne)</option></select>
            </div>
            
            <div className="flex items-center justify-between border border-slate-200 rounded-lg p-3 bg-slate-50">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <div className="w-8 h-4 bg-slate-200 rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div></div> 
                RTL
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 shrink-0">
           <h3 className="font-bold text-[#148f77] flex items-center gap-2 mb-4"><Settings className="w-4 h-4" /> Advanced</h3>
           <div className="bg-[#eef6f1] text-[#148f77] text-[10px] font-bold p-2 rounded-lg flex items-center gap-1.5 mb-4 border border-[#d1e8df]"><div className="w-2.5 h-2.5 flex items-center justify-center rounded-full bg-[#148f77] text-white">i</div> Public link only.</div>
           <label className="block text-xs font-bold text-slate-800 mb-1.5">Custom Success Message</label>
           <textarea className="w-full border border-slate-200 rounded-lg p-2 text-sm bg-white h-20" placeholder="..."></textarea>
        </div>
      </div>

      {/* Right Column: Fields */}
      <div className="flex-1 md:w-2/3 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6 flex flex-col min-h-[400px] h-full relative shrink-0">
        <h3 className="font-bold text-[#148f77] flex items-center gap-2 border-b border-slate-100 pb-4 mb-4"><FileText className="w-4 h-4"/> Fields</h3>
        
        <div className="flex-1 flex flex-col items-center justify-center gap-6 py-12">
           <p className="text-sm text-slate-500 font-medium">No fields</p>
           <button className="bg-slate-800 text-white font-bold text-sm px-6 py-2.5 rounded-full">Add Field</button>
        </div>
        
        <div className="mt-auto pt-4">
           <button className="w-full bg-[#148f77] text-white font-bold rounded-xl py-3">Publish Form</button>
        </div>
      </div>
    </div>
  </div>
);
};

// SCENE 4: USERS & ACCESS
const UsersScene = () => {
  const { t } = useTranslation();
  return (
  <div className="flex flex-col h-full gap-4">
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm top-0 z-10 flex items-center gap-2">
      <h2 className="text-xl font-black text-[#148f77]">{t.demo_labels.users}</h2>
    </div>
    
    <div className="flex-1 flex flex-col md:grid md:grid-cols-5 gap-4 overflow-y-auto pb-4 custom-scrollbar">
      
      {/* Left Column (Create User + Assign Form) (approx 2/5 width) */}
      <div className="md:col-span-2 flex flex-col gap-4">
        
        {/* Create User */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
           <h3 className="font-black text-[#148f77] text-lg mb-4">{t.demo_labels.create_user}</h3>
           <div className="space-y-4">
             <div className="grid grid-cols-2 gap-3">
               <input type="text" placeholder="First Name" className="border border-slate-200 rounded-lg p-2.5 text-sm bg-white" />
               <input type="text" placeholder="Last Name" className="border border-slate-200 rounded-lg p-2.5 text-sm bg-white" />
             </div>
             <input type="text" placeholder="Password" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-white" />
             <input type="text" placeholder="Email (Optional)" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-white" />
             <button className="w-full bg-[#148f77] text-white font-bold py-3 rounded-xl mt-2">Generate</button>
           </div>
        </div>

        {/* Assign Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex-1">
           <h3 className="font-black text-[#148f77] text-lg mb-4">Assign Form</h3>
           <div className="space-y-4 w-full">
             <select className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-white text-slate-700">
               <option>Bilie Alexe (USR-1741)</option>
             </select>
             <div className="relative">
               <select className="w-full border border-slate-200 rounded-lg p-2.5 pl-8 text-sm bg-white text-slate-700">
                 <option>Dermatology - Direct Booking (F_MED_1775732165663)</option>
               </select>
               <span className="absolute left-2.5 top-3 text-[10px]">🩺</span>
             </div>

             <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-4 mt-4">
                <span className="text-xs font-black text-slate-800 block mb-2">Access Rights</span>
                <div className="flex items-center gap-3"><div className="w-8 h-4 bg-blue-500 rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div></div> <span className="text-xs font-bold text-blue-600">{t.demo_labels.dashboard}</span></div>
                <div className="flex items-center gap-3"><div className="w-8 h-4 bg-slate-200 rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5"></div></div> <span className="text-xs text-slate-400">{t.demo_labels.edit}</span></div>
                <div className="flex items-center gap-3"><div className="w-8 h-4 bg-slate-200 rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5"></div></div> <span className="text-xs text-slate-400">{t.demo_labels.delete}</span></div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200"><div className="w-8 h-4 bg-slate-200 rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5"></div></div> <span className="text-xs font-bold text-[#148f77]">View Dashboard (Medical)</span></div>
             </div>

             <button className="w-full bg-[#148f77] text-white font-bold py-3 rounded-xl mt-2">Assign</button>
           </div>
        </div>
      </div>

      {/* Right Column (Tables) (approx 3/5 width) */}
      <div className="md:col-span-3 flex flex-col gap-4">
        
        {/* Today's Agenda (Translates to created users list) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-[320px] overflow-hidden">
           <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
             <h3 className="font-black text-[#148f77] text-lg flex items-center gap-2">Today's Agenda <span className="text-[10px] text-blue-500 font-medium ml-2">mercredi 22 avril</span></h3>
             <div className="border border-slate-200 rounded-full px-3 py-1.5 flex items-center gap-2 bg-white text-slate-400 text-xs"><Search className="w-3 h-3"/> <span>Q...</span></div>
           </div>
           
           <div className="w-full flex-1 overflow-x-auto custom-scrollbar">
             <div className="min-w-[400px]">
               <div className="grid grid-cols-4 border-b border-slate-100 pb-3 text-[10px] font-black uppercase tracking-wider text-slate-800">
                  <div>Identity</div>
                  <div>User ID</div>
                  <div>Password</div>
                  <div className="text-right pr-2">Action</div>
               </div>
               <div className="grid grid-cols-4 py-4 border-b border-slate-50 items-center">
                  <div className="text-xs font-bold text-slate-800">Bilie Alexe</div>
                  <div className="text-xs font-bold text-blue-600">USR-1741</div>
                  <div className="text-[10px] font-mono font-bold bg-slate-50 border border-slate-200 rounded-md px-2 py-1 flex items-center gap-1.5 w-fit"><Key className="w-3 h-3 text-slate-400"/> 123456</div>
                  <div className="text-right pr-2"><div className="bg-red-50 text-red-500 rounded p-1 w-fit ml-auto cursor-pointer flex items-center justify-center hover:bg-red-100"><Trash2 className="w-3 h-3"/></div></div>
               </div>
             </div>
           </div>
        </div>

        {/* Rights */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex-1 flex flex-col overflow-hidden">
           <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
             <h3 className="font-black text-[#148f77] text-lg">Rights</h3>
             <div className="border border-slate-200 rounded-full px-3 py-1.5 flex items-center gap-2 bg-white text-slate-400 text-xs"><Search className="w-3 h-3"/> <span>Q...</span></div>
           </div>
           
           <div className="w-full flex-1 overflow-x-auto custom-scrollbar">
             <div className="min-w-[500px]">
               <div className="grid grid-cols-5 border-b border-slate-100 pb-3 text-[10px] font-black uppercase tracking-wider text-slate-800">
                  <div>ID Utilisateur</div>
                  <div className="col-span-2">Formulaire</div>
                  <div>Droits</div>
                  <div className="text-right pr-2">Action</div>
               </div>
               <div className="grid grid-cols-5 py-4 border-b border-slate-50 items-center gap-2">
                  <div className="text-[10px] font-bold text-slate-800">USR-1741</div>
                  <div className="col-span-2 text-xs text-slate-500 font-medium truncate">F_MED_1775732165664</div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                   {/* Pills */}
                   <span className="bg-blue-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded flex items-center shadow-sm">V</span>
                   <span className="bg-yellow-400 text-white text-[8px] font-black px-1.5 py-0.5 rounded flex items-center shadow-sm">M</span>
                   <span className="bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded flex items-center shadow-sm">S</span>
                   <span className="bg-[#148f77] text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm"><Layout className="w-2 h-2"/> Dashboard</span>
                </div>
                <div className="text-right pr-2"><div className="bg-red-50 text-red-500 rounded p-1 w-fit ml-auto cursor-pointer flex items-center justify-center hover:bg-red-100"><Trash2 className="w-3 h-3"/></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
