import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { BookOpen, Heart, Brain, Users, ArrowLeft, LogOut, ArrowRight, Sparkles, Smile, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";

const LowRiskDashboard = () => {
    const navigate = useNavigate();

    // Cartoonish Characters from public folder
    const mascotRobot = "/mascot_robot.png";
    const mascotSun = "/mascot_sun.png";

    const resources = [
        {
            icon: BookOpen,
            title: "Mental Health Basics",
            description: "Cool facts about your brain and how to keep it happy!",
            gradient: "from-cyan-400 to-brand-500",
            hoverBg: "group-hover:bg-cyan-500/20",
            onClick: () => navigate("/resources?category=basics"),
        },
        {
            icon: Heart,
            title: "Self-Care Library",
            description: "Chill vibes, breathing tricks, and tiny habits for a big smile.",
            gradient: "from-rose-400 to-pink-500",
            hoverBg: "group-hover:bg-rose-500/20",
            onClick: () => navigate("/resources?category=selfcare"),
        },
        {
            icon: Brain,
            title: "Exam Level-Up",
            description: "Boss your KCSE exams without the stress. You got this!",
            gradient: "from-amber-400 to-orange-500",
            hoverBg: "group-hover:bg-amber-500/20",
            onClick: () => navigate("/resources?category=basics"),
        },
        {
            icon: Users,
            title: "Peer Stories",
            description: "Read stories from legends just like you. No one is alone!",
            gradient: "from-emerald-400 to-teal-500",
            hoverBg: "group-hover:bg-emerald-500/20",
            onClick: () => navigate("/peer-stories"),
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-slate-950 py-8 px-4 relative overflow-hidden flex flex-col">
            {/* ── Background Magic ── */}
            <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-brand-500/10 rounded-full blur-3xl animate-pulse-soft" />
            <div className="absolute bottom-[-50px] right-[-50px] w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />

            {/* Floating Shapes */}
            <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-[15%] w-12 h-12 border-2 border-brand-500/20 rounded-xl"
            />
            <motion.div
                animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-40 left-[10%] w-8 h-8 bg-sky-500/10 rounded-full"
            />

            <div className="max-w-6xl mx-auto w-full relative z-10">
                {/* ── Navigation ── */}
                <div className="flex justify-between items-center mb-10">
                    <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-sm font-bold group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back Home
                    </Link>
                    <button
                        onClick={() => { localStorage.clear(); navigate('/login'); }}
                        className="flex items-center gap-2 text-xs font-black px-5 py-2.5 rounded-2xl transition-all"
                        style={{
                            color: '#fca5a5',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                        }}
                    >
                        <LogOut size={14} />
                        Logout
                    </button>
                </div>

                {/* ── Hero section with Mascot ── */}
                <div className="relative mb-16 pt-10">
                    {/* Character 1: Robot Helper */}
                    <motion.div
                        initial={{ x: -100, opacity: 0, rotate: -10 }}
                        animate={{ x: 0, opacity: 1, rotate: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="absolute -left-12 -top-12 hidden lg:block"
                    >
                        <div className="relative">
                            <img src={mascotRobot} alt="Robot Friend" className="w-40 h-40 object-contain drop-shadow-2xl" />
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-4 -right-4 bg-brand-500 text-white p-2 rounded-xl shadow-lg rotate-12"
                            >
                                <Sparkles size={16} />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Character 2: Happy Sun */}
                    <motion.div
                        initial={{ x: 100, opacity: 0, rotate: 10 }}
                        animate={{ x: 0, opacity: 1, rotate: 0 }}
                        transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
                        className="absolute -right-12 top-0 hidden lg:block"
                    >
                        <div className="relative">
                            <img src={mascotSun} alt="Sun Friend" className="w-36 h-36 object-contain drop-shadow-2xl" />
                            <motion.div
                                animate={{ x: [0, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -bottom-4 -left-4 bg-amber-500 text-white p-2 rounded-xl shadow-lg -rotate-12 font-black text-[10px] uppercase tracking-tighter"
                            >
                                Stay Bright!
                            </motion.div>
                        </div>
                    </motion.div>

                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
                            style={{
                                background: 'rgba(13, 148, 136, 0.1)',
                                border: '1px solid rgba(94, 234, 212, 0.2)',
                            }}
                        >
                            <Smile size={16} className="text-brand-400" />
                            <span className="text-xs font-black text-brand-300 uppercase tracking-widest">You're doing awesome!</span>
                        </motion.div>
                        <h1 className="font-display text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                            Wellness <span className="bg-gradient-to-r from-brand-400 to-sky-400 bg-clip-text text-transparent">Power-Up</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                            Pick a quest below to start your journey.
                            Every small step makes you a mental health legend! 🚀
                        </p>
                    </div>
                </div>

                {/* ── Resource Grid ── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 gap-8 mb-16"
                >
                    {resources.map((resource, index) => {
                        const Icon = resource.icon;
                        return (
                            <motion.div
                                key={resource.title}
                                variants={itemVariants}
                                whileHover={{ scale: 1.03, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={resource.onClick}
                                className={`group relative p-8 rounded-[2.5rem] cursor-pointer transition-all duration-300 overflow-hidden`}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    backdropFilter: 'blur(20px)',
                                }}
                            >
                                {/* Hover background glow */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${resource.gradient}`} />

                                <div className="flex flex-col h-full relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${resource.gradient} text-white shadow-xl group-hover:rotate-6 transition-transform duration-300`}>
                                            <Icon size={30} />
                                        </div>
                                        <div className="flex gap-2">
                                            <Star size={16} className="text-slate-800 group-hover:text-amber-400 transition-colors" />
                                            <Star size={16} className="text-slate-800 group-hover:text-amber-400 transition-colors delay-75" />
                                            <Star size={16} className="text-slate-800 group-hover:text-amber-400 transition-colors delay-150" />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-display font-black text-white mb-2 group-hover:text-brand-300 transition-colors">
                                        {resource.title}
                                    </h3>
                                    <p className="text-slate-400 mb-8 leading-relaxed font-medium text-lg">
                                        {resource.description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-brand-400 font-black text-sm uppercase tracking-widest overflow-hidden">
                                            <span className="translate-x-0 group-hover:translate-x-2 transition-transform duration-300">Start Quest</span>
                                            <ArrowRight size={16} className="-translate-x-full group-hover:translate-x-0 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-600 group-hover:border-brand-500 group-hover:text-brand-400 transition-all">
                                            <Zap size={18} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* ── Playful Banner ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-[3rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(13,148,136,0.1) 0%, rgba(56,189,248,0.15) 100%)',
                        border: '1px solid rgba(94, 234, 212, 0.2)',
                    }}
                >
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-400/10 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10 flex-1">
                        <div className="inline-block px-4 py-1.5 rounded-xl bg-brand-500 text-white font-black text-[10px] uppercase tracking-widest mb-6">Level Up!</div>
                        <h2 className="text-4xl font-display font-black text-white mb-4 leading-tight">Need a bigger mission?</h2>
                        <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-xl">
                            Feeling extra stressed? No worries! Our expert counsellors are like power-ups for your brain. Take a quick check to level up your support.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-col gap-4">
                        <button
                            className="bg-brand-500 hover:bg-brand-400 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-brand-500/20 active:scale-95 flex items-center justify-center gap-3"
                            onClick={() => navigate('/triage')}
                        >
                            Take Assessment
                            <ArrowRight size={20} />
                        </button>
                        <p className="text-center text-slate-500 text-sm font-bold italic tracking-tight">Safe. Fast. Secret. 🔒</p>
                    </div>
                </motion.div>
            </div>

            {/* Float-y Particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [-20, 20, -20],
                        opacity: [0.1, 0.4, 0.1],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute pointer-events-none hidden md:block"
                    style={{
                        top: `${20 + i * 15}%`,
                        left: `${10 + i * 18}%`,
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: i % 2 === 0 ? '#14b8a6' : '#0ea5e9'
                    }}
                />
            ))}
        </div>
    );
};

export default LowRiskDashboard;
