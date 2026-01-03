import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Video, Calendar, AlertTriangle, Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";

// Custom UI Components (Replacements for Shadcn)
const CustomButton = ({ children, onClick, variant = 'primary', className = '', size = 'md' }) => {
    const baseStyles = "inline-flex items-center justify-center rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
        primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-100",
        secondary: "bg-white text-slate-900 border-2 border-slate-100 hover:border-brand-200 hover:text-brand-600 shadow-sm",
        ghost: "text-slate-500 hover:text-brand-600 hover:bg-brand-50",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-100",
        soft: "bg-brand-50 text-brand-700 hover:bg-brand-100"
    };
    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
            {children}
        </button>
    );
};

const CustomCard = ({ children, className = '', onClick, style }) => (
    <div
        onClick={onClick}
        style={style}
        className={`bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:border-brand-200 group ${className}`}
    >
        {children}
    </div>
);

const HighRiskDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 selection:bg-red-100 selection:text-red-900">
            <div className="max-w-4xl mx-auto">
                <CustomButton variant="ghost" onClick={() => navigate("/")} className="mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </CustomButton>

                {/* Emergency Alert Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 bg-red-50 border-2 border-red-100 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-200 shrink-0 animate-pulse">
                            <AlertTriangle size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-red-900 mb-2 tracking-tight">Immediate Support Available</h2>
                            <p className="text-lg text-red-700 mb-6 font-medium leading-relaxed">
                                If you're in crisis or having thoughts of harming yourself, please contact these services immediately. You are not alone.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-red-200">
                                    <span className="text-xs font-bold text-red-400 uppercase tracking-widest block mb-1">MOH Hotline</span>
                                    <span className="text-xl font-black text-red-900">0800 720 648</span>
                                </div>
                                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-red-200">
                                    <span className="text-xs font-bold text-red-400 uppercase tracking-widest block mb-1">Emergency Services</span>
                                    <span className="text-xl font-black text-red-900">999 / 112</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-50"></div>
                </motion.div>

                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Professional Counseling</h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                        Connect with a licensed mental health professional who understands what you're going through.
                    </p>
                </div>

                <div className="grid md:grid-cols-1 gap-6 mb-12">
                    {/* Video Call Option */}
                    <CustomCard
                        onClick={() => navigate("/book-counselling")}
                        className="p-8 md:p-12 animate-slide-up"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-8 md:text-left text-center">
                            <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform shadow-sm">
                                <Video size={36} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Secure Video Call</h3>
                                <p className="text-lg text-slate-500 font-medium">Book a private video session with a counselor at a time that works for you.</p>
                            </div>
                            <CustomButton variant="primary" size="lg" className="w-full md:w-auto">
                                Schedule Call
                            </CustomButton>
                        </div>
                    </CustomCard>

                    {/* Live Chat Option */}
                    <CustomCard
                        onClick={() => navigate("/chat")}
                        className="p-8 md:p-12 animate-slide-up"
                        style={{ animationDelay: "0.1s" }}
                    >
                        <div className="flex flex-col md:flex-row items-center gap-8 md:text-left text-center">
                            <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform shadow-sm">
                                <Calendar size={36} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Live Text Chat</h3>
                                <p className="text-lg text-slate-500 font-medium">Connect with an available counselor right now via secure instant messaging.</p>
                            </div>
                            <CustomButton variant="soft" size="lg" className="bg-green-50 text-green-700 hover:bg-green-100 w-full md:w-auto">
                                Start Chatting
                            </CustomButton>
                        </div>
                    </CustomCard>
                </div>

                {/* Footer Resources Card */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-soft"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
                                <Heart size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-900 mb-1">Explore Wellness Materials</h4>
                                <p className="text-slate-500 font-medium leading-relaxed">Explore self-help resources while you wait for your session.</p>
                            </div>
                        </div>
                        <CustomButton variant="secondary" onClick={() => navigate("/dashboard/low")} className="whitespace-nowrap">
                            View Resources
                        </CustomButton>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HighRiskDashboard;
