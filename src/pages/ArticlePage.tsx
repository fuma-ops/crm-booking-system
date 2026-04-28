import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { MessageSquare, ThumbsUp, Send, ArrowLeft, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FloatingCrosses } from '../components/ThreeBackground';

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
  likes: number;
}

export const ArticlePage = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'Dr. Sarah Smith',
      text: 'This is exactly what I was looking for! The integration between Google Sheets and a medical booking system while keeping privacy at the core is brilliant.',
      date: '2 hours ago',
      likes: 12,
    },
    {
      id: 2,
      author: 'Michael R.',
      text: 'How does the AI feature handle patient data anonymization? I am very interested in LastMedicale.',
      date: '5 hours ago',
      likes: 8,
    }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: 'Guest User',
      text: newComment,
      date: 'Just now',
      likes: 0,
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="relative min-h-screen bg-transparent text-slate-900 font-sans selection:bg-[#148f77]/20 selection:text-[#148f77]">
      <Helmet>
        <title>The Future of Medical CRM: Booking, Privacy & AI with LastMedicale</title>
        <meta name="description" content="Discover how LastMedicale is transforming the medical industry with advanced CRM features, seamless Google Sheets booking integration, robust privacy, and AI." />
        <meta name="keywords" content="Medical CRM, Booking System, Google Sheets CRM, Privacy, Medical booking, AI in healthcare, LastMedicale, Patient Management" />
      </Helmet>

      <FloatingCrosses />

      {/* Basic Header for Article Page */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm py-4">
        <nav className="container mx-auto px-6 flex items-center gap-6">
          <Link to="/" className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <HeartPulse className="w-6 h-6 text-white" />
          </Link>
          <div className="flex-1">
             <Link to="/" className="text-xl font-black tracking-tight leading-none hover:text-[#148f77] transition-colors">CRM Booking System</Link>
          </div>
          <Link to="/" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#148f77] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </nav>
      </header>

      <main className="relative z-10 pt-32 pb-24 px-4 sm:px-6 max-w-4xl mx-auto">
        
        {/* Article Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 text-[#148f77] font-bold text-sm mb-4 uppercase tracking-widest">
            <span>Healthcare Tech</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
            The Future of Medical CRM: AI, Privacy & Smart Booking Systems
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed mb-8">
            How modern clinics are leveraging LastMedicale to integrate Google Sheets, AI, and robust privacy protocols to streamline patient management.
          </p>
          <div className="flex items-center gap-4 border-t border-b border-slate-200 py-4">
            <div className="w-12 h-12 bg-slate-200 rounded-full bg-[url('https://i.pravatar.cc/150')] bg-cover bg-center" />
            <div>
              <p className="font-bold">Dr. Emily Chen</p>
              <p className="text-sm text-slate-500">Chief Medical Tech Officer</p>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg prose-slate max-w-none text-slate-700 space-y-8 bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50"
        >
          <p className="text-xl leading-relaxed">
            In today's fast-paced healthcare environment, a reliable <strong>Medical CRM</strong> is no longer a luxury—it's a necessity. With the rise of digital health solutions, clinics are searching for ways to combine a seamless <strong>Booking System</strong> with ironclad <strong>Privacy</strong> measures. Enter the modern era of clinic management with tools like <strong>LastMedicale</strong>.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">The Google Sheets CRM Revolution</h2>
          <p>
            Many clinics struggle with overly complex software. By integrating form builders directly with a <strong>Google Sheets CRM</strong>, healthcare providers can manage their patient flow with a tool they already know. Google Sheets acts as a powerful, accessible backend that updates in real-time. Whether you are managing daily appointments or long-term patient records, the flexibility is unmatched.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Ironclad Patient Privacy</h2>
          <p>
            When utilizing cloud services and custom CRM solutions, patient <strong>privacy</strong> and data security must be the top priority. LastMedicale ensures that all data routed through the <strong>booking system</strong> is encrypted and fully compliant with international healthcare data regulations (like HIPAA and GDPR). Medical personnel define strict access control algorithms, ensuring that sensitive data is only visible to authorized practitioners.
          </p>

          <div className="bg-[#148f77]/5 border-l-4 border-[#148f77] p-6 rounded-r-2xl my-10">
            <p className="m-0 text-[#148f77] font-medium text-lg italic">
              "The integration of AI shouldn't compromise patient privacy. With LastMedicale, we process data efficiently while maintaining the highest security protocols."
            </p>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Leveraging AI in Healthcare Management</h2>
          <p>
            <strong>AI</strong> (Artificial Intelligence) is reshaping how we handle administrative tasks. From predictive scheduling that reduces patient no-shows to natural language processing for medical records, AI acts as an invisible assistant. It allows doctors to spend less time clicking through a CRM and more time focusing on what matters: patient care.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Why LastMedicale?</h2>
          <p>
            LastMedicale represents the pinnacle of modern clinic management. By seamlessly combining a user-friendly frontend with a robust <strong>Google Sheets CRM management system</strong>, integrated AI insights, and strict privacy controls, it offers an unparalleled solution for the modern healthcare facility. 
          </p>
        </motion.article>

        {/* Comment Section */}
        <div className="mt-16 bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
          <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-[#148f77]" />
            Join the Discussion
          </h3>

          <form onSubmit={handleAddComment} className="mb-10">
            <div className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="What are your thoughts on AI and Privacy in Medical CRMs?"
                className="w-full px-5 py-4 pb-14 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#148f77]/30 focus:border-[#148f77] transition-all resize-none"
                rows={3}
              />
              <button 
                type="submit"
                disabled={!newComment.trim()}
                className="absolute bottom-3 right-3 bg-[#148f77] hover:bg-[#117a65] disabled:opacity-50 disabled:hover:bg-[#148f77] text-white p-2 px-4 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-[#148f77]/20"
              >
                <span>Post Comment</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 shrink-0">
                  {comment.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-slate-900">{comment.author}</h4>
                    <span className="text-xs text-slate-400">{comment.date}</span>
                  </div>
                  <p className="text-slate-600 mb-3">{comment.text}</p>
                  <button className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-[#148f77] transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{comment.likes} Likes</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="py-12 bg-[#0d1b2a] text-center text-slate-400 text-sm">
        <p>&copy; 2026 CRM Booking System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};
