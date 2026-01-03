import React from 'react';
import { useNavigate } from "react-router-dom";
import { BookOpen, Heart, Brain, Users, ArrowLeft, LogOut } from "lucide-react";

const LowRiskDashboard = () => {
    const navigate = useNavigate();

    const resources = [
        {
            icon: BookOpen,
            title: "Mental Health Basics",
            description: "Understanding stress, anxiety, and how to maintain emotional wellness",
            color: "bg-brand-50 text-brand-600",
            onClick: () => navigate("/resources?category=basics"),
        },
        {
            icon: Heart,
            title: "Self-Care Library",
            description: "Mindfulness exercises, breathing techniques, and relaxation guides",
            color: "bg-fuchsia-100 text-fuchsia-600",
            onClick: () => navigate("/resources?category=selfcare"),
        },
        {
            icon: Brain,
            title: "Exam Stress Management",
            description: "Practical strategies for managing KCSE examination pressure",
            color: "bg-purple-100 text-purple-600",
            onClick: () => navigate("/resources?category=basics"), // Can add a specific category later
        },
        {
            icon: Users,
            title: "Peer Stories",
            description: "Real experiences from students who've navigated similar challenges",
            color: "bg-green-100 text-green-600",
            onClick: () => navigate("/peer-stories"),
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center text-slate-500 hover:text-brand-600 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </button>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            navigate('/login');
                        }}
                        className="flex items-center text-red-400 hover:text-red-600 transition-colors font-bold text-sm"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </button>
                </div>

                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Wellness Resources</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Explore our curated resources to maintain and enhance your mental well-being
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {resources.map((resource, index) => {
                        const Icon = resource.icon;
                        return (
                            <div
                                key={resource.title}
                                className="card shadow-soft hover:shadow-md transition-all duration-300 cursor-pointer animate-fade-in group"
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={resource.onClick}
                            >
                                <div className={`w-14 h-14 rounded-2xl ${resource.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{resource.title}</h3>
                                <p className="text-slate-600 mb-6">{resource.description}</p>
                                <button
                                    className="btn-secondary w-full py-2.5 text-sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        resource.onClick();
                                    }}
                                >
                                    Explore Resources
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="card bg-brand-600 text-white animate-fade-in border-none p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Need More Support?</h2>
                        <p className="text-brand-100">
                            If you're experiencing increased stress or need someone to talk to
                        </p>
                    </div>
                    <button
                        className="bg-white text-brand-600 px-8 py-3 rounded-xl font-bold hover:bg-brand-50 transition-all shadow-lg active:scale-95 whitespace-nowrap"
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
