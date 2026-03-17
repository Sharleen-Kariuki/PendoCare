import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Heart, Users, Sparkles, MessageCircle, Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const PeerStories = () => {
  const navigate = useNavigate();

  // Mascot asset
  const mascotCloud = "/mascot_robot.png"; // Using robot as cloud failed generation

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 relative overflow-hidden flex flex-col">
      {/* Background Magic */}
      <div className="absolute top-[-100px] right-[-100px] w-72 h-72 bg-brand-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-sky-500/10 rounded-full blur-[80px]" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-10">
          <Link to="/dashboard/low" className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-sm font-bold group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Heart size={18} fill="currentColor" />
            </div>
            <span className="font-display font-black text-white text-base tracking-tighter">PendoCare</span>
          </div>
        </div>

        {/* ── Title Section with Mascot ── */}
        <div className="relative mb-14">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute -right-10 top-0 hidden lg:block"
          >
            <div className="relative">
              <img src={mascotCloud} alt="Friend" className="w-32 h-32 object-contain drop-shadow-2xl grayscale brightness-125" />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-2 -left-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg rotate-[-12deg]"
              >
                <MessageCircle size={16} />
              </motion.div>
            </div>
          </motion.div>

          <div className="max-w-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl mb-6"
              style={{
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
              }}
            >
              <Users size={14} className="text-sky-400" />
              <span className="text-[10px] font-black text-sky-300 uppercase tracking-widest">Global Student Village</span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              Legendary <span className="text-brand-400">Stories</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              Real, anonymous stories from students who've navigated the same levels as you.
              <span className="text-white"> Your voice matters.</span> No one walks alone! 🤝
            </p>
          </div>
        </div>

        {/* ── Content Area ── */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Stats/Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="rounded-3xl p-6 bg-white/5 border border-white/10">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Board Stats</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Total Stories</span>
                  <span className="text-sm font-black text-white">1.2k+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">New Today</span>
                  <span className="text-sm font-black text-brand-400">+12</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full mt-2" />
              </div>
            </div>

            <div className="rounded-3xl p-6 bg-gradient-to-br from-brand-600/20 to-sky-600/20 border border-brand-500/20">
              <Quote size={24} className="text-brand-500 mb-4" />
              <p className="text-sm text-slate-200 font-medium italic leading-relaxed">
                "Sharing my story felt like dropping a heavy backpack I didn't know I was carrying."
              </p>
              <p className="text-[10px] font-black text-brand-400 mt-4 uppercase tracking-widest">— Anonymous Student</p>
            </div>
          </motion.div>

          {/* Main Stories Board */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 rounded-[3rem] overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <Sparkles size={12} className="text-brand-400" />
                Live Community Board
              </div>
            </div>

            <div className="relative">
              <iframe
                src="https://padlet.com/embed/d4mnom3og1e80eow"
                frameBorder="0"
                allow="camera;microphone;geolocation;display-capture;clipboard-write"
                style={{ width: "100%", height: 700, display: "block", background: 'transparent' }}
                title="Peer Stories"
              />
              {/* Overlay to give it the brand feel at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* ── Share CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-400 shadow-inner">
              <Star size={24} />
            </div>
            <div>
              <h4 className="text-xl font-display font-black text-white mb-1 tracking-tight">Got a story to tell?</h4>
              <p className="text-slate-500 font-medium">Post anonymously to help others in the village.</p>
            </div>
          </div>
          <button className="btn-glass px-10 !rounded-2xl shrink-0">
            Post Anonymously
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PeerStories;