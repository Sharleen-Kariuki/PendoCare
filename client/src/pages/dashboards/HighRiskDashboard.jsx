import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Video, Calendar, AlertTriangle, Heart, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HighRiskDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 py-10 px-4 relative overflow-hidden">
            {/* Background orbs */}
            <div className="absolute top-[-150px] right-[-100px] w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[-100px] left-[-80px] w-[350px] h-[350px] bg-brand-500/6 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-sm font-medium mb-8">
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>

                {/* Emergency Alert */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 rounded-3xl p-8 md:p-10 relative overflow-hidden"
                    style={{
                        background: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.15)',
                    }}
                >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/8 rounded-full blur-[60px] pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-500/20 shrink-0 animate-pulse">
                            <AlertTriangle size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-display font-bold text-red-300 mb-2">Immediate Support Available</h2>
                            <p className="text-red-300/70 mb-6 leading-relaxed">
                                If you're in crisis or having thoughts of harming yourself, please contact these services immediately. You are not alone.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="rounded-2xl p-4"
                                    style={{
                                        background: 'rgba(239, 68, 68, 0.08)',
                                        border: '1px solid rgba(239, 68, 68, 0.12)',
                                    }}
                                >
                                    <span className="text-[10px] font-bold text-red-400/60 uppercase tracking-widest block mb-1">MOH Hotline</span>
                                    <span className="text-xl font-display font-bold text-red-300">0800 720 648</span>
                                </div>
                                <div className="rounded-2xl p-4"
                                    style={{
                                        background: 'rgba(239, 68, 68, 0.08)',
                                        border: '1px solid rgba(239, 68, 68, 0.12)',
                                    }}
                                >
                                    <span className="text-[10px] font-bold text-red-400/60 uppercase tracking-widest block mb-1">Emergency Services</span>
                                    <span className="text-xl font-display font-bold text-red-300">999 / 112</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Title */}
                <div className="text-center mb-12">
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Professional Counseling
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Connect with a licensed mental health professional who understands what you're going through.
                    </p>
                </div>

                {/* Options */}
                <div className="space-y-5 mb-12">
                    {/* Video Call */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        onClick={() => navigate("/book-counselling")}
                        className="glass-card cursor-pointer !p-8 md:!p-10 group"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-8 md:text-left text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center text-white
                                            shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform">
                                <Video size={30} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-display font-bold text-white mb-2">Secure Video Call</h3>
                                <p className="text-slate-400">Book a private video session with a counselor at a time that works for you.</p>
                            </div>
                            <button className="btn-glass w-full md:w-auto group/btn">
                                Schedule Call
                                <ArrowRight size={16} className="opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Live Chat */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        onClick={() => navigate("/chat")}
                        className="glass-card cursor-pointer !p-8 md:!p-10 group"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-8 md:text-left text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white
                                            shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                                <MessageCircle size={30} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-display font-bold text-white mb-2">Live Text Chat</h3>
                                <p className="text-slate-400">Connect with an available counselor right now via secure instant messaging.</p>
                            </div>
                            <button className="btn-glass-secondary w-full md:w-auto">
                                Start Chatting
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Resources Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6"
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500"
                            style={{ background: 'rgba(255, 255, 255, 0.06)' }}>
                            <Heart size={20} />
                        </div>
                        <div>
                            <h4 className="font-display font-bold text-white mb-0.5">Explore Wellness Materials</h4>
                            <p className="text-slate-500 text-sm">Explore self-help resources while you wait for your session.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate("/dashboard/low")}
                        className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-all text-brand-300 hover:text-brand-200 whitespace-nowrap"
                        style={{
                            background: 'rgba(13, 148, 136, 0.1)',
                            border: '1px solid rgba(94, 234, 212, 0.15)',
                        }}
                    >
                        View Resources
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default HighRiskDashboard;
