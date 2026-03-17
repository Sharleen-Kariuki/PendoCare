import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { BookOpen, Heart, Brain, Users, ArrowLeft, LogOut, ArrowRight, Sparkles } from "lucide-react";

const LowRiskDashboard = () => {
    const navigate = useNavigate();

    const resources = [
        {
            icon: BookOpen,
            title: "Mental Health Basics",
            description: "Understanding stress, anxiety, and how to maintain emotional wellness",
            gradient: "from-brand-400 to-brand-600",
            iconBg: "rgba(13, 148, 136, 0.12)",
            onClick: () => navigate("/resources?category=basics"),
        },
        {
            icon: Heart,
            title: "Self-Care Library",
            description: "Mindfulness exercises, breathing techniques, and relaxation guides",
            gradient: "from-pink-400 to-rose-400",
            iconBg: "rgba(244, 114, 182, 0.12)",
            onClick: () => navigate("/resources?category=selfcare"),
        },
        {
            icon: Brain,
            title: "Exam Stress Management",
            description: "Practical strategies for managing KCSE examination pressure",
            gradient: "from-violet-400 to-purple-500",
            iconBg: "rgba(167, 139, 250, 0.12)",
            onClick: () => navigate("/resources?category=basics"),
        },
        {
            icon: Users,
            title: "Peer Stories",
            description: "Real experiences from students who've navigated similar challenges",
            gradient: "from-emerald-400 to-brand-500",
            iconBg: "rgba(16, 185, 129, 0.12)",
            onClick: () => navigate("/peer-stories"),
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 py-8 px-4 relative overflow-hidden">
            {/* Background orbs */}
            <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-brand-500/8 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[-100px] right-[-80px] w-[350px] h-[350px] bg-sky-500/6 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-sm font-medium">
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            navigate('/login');
                        }}
                        className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                        style={{
                            color: '#fca5a5',
                            background: 'rgba(239, 68, 68, 0.08)',
                            border: '1px solid rgba(239, 68, 68, 0.15)',
                        }}
                    >
                        <LogOut size={14} />
                        Logout
                    </button>
                </div>

                {/* Hero */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                        style={{
                            background: 'rgba(13, 148, 136, 0.1)',
                            border: '1px solid rgba(94, 234, 212, 0.15)',
                        }}>
                        <Sparkles size={14} className="text-brand-400" />
                        <span className="text-sm font-medium text-brand-300">Your Wellness Hub</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Wellness Resources
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Explore our curated resources to maintain and enhance your mental well-being
                    </p>
                </div>

                {/* Resource Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {resources.map((resource, index) => {
                        const Icon = resource.icon;
                        return (
                            <div
                                key={resource.title}
                                className="glass-card cursor-pointer group"
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={resource.onClick}
                            >
                                <div
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6
                                                bg-gradient-to-br ${resource.gradient} text-white
                                                shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                    style={{ boxShadow: `0 8px 24px ${resource.iconBg}` }}
                                >
                                    <Icon size={26} />
                                </div>
                                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">{resource.title}</h3>
                                <p className="text-slate-400 mb-6 leading-relaxed">{resource.description}</p>
                                <div
                                    className="flex items-center gap-2 text-brand-400 text-sm font-semibold group-hover:gap-3 transition-all"
                                >
                                    Explore
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Banner */}
                <div className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(13,148,136,0.2) 0%, rgba(56,189,248,0.1) 100%)',
                        border: '1px solid rgba(94, 234, 212, 0.15)',
                    }}
                >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-brand-400/10 rounded-full blur-[60px] pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-2xl font-display font-bold text-white mb-2">Need More Support?</h2>
                        <p className="text-slate-400">
                            If you're experiencing increased stress or need someone to talk to
                        </p>
                    </div>
                    <button
                        className="btn-glass whitespace-nowrap relative z-10"
                        onClick={() => navigate('/triage')}
                    >
                        Take Another Assessment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LowRiskDashboard;
