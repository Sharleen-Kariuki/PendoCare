import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, UserPlus, LogIn, Activity } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                            <Heart size={20} fill="currentColor" />
                        </div>
                        <span className="text-xl font-bold text-slate-900">Pendo</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/request-access" className="text-sm font-medium text-slate-600 hover:text-brand-600">
                            For Schools
                        </Link>
                        <Link to="/login" className="btn-primary text-sm py-2 px-4 shadow-none">
                            Login
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1">
                <div className="relative overflow-hidden pt-16 pb-32">
                    {/* Background Blobs */}
                    <div className="absolute -top-24 -left-20 w-96 h-96 bg-brand-100 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute top-1/2 -right-20 w-80 h-80 bg-accent-light rounded-full blur-3xl opacity-60"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center max-w-3xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 text-sm font-medium mb-8 animate-fade-in border border-brand-100">
                                <ShieldCheck size={16} />
                                <span>Safe, Anonymous, & Secure</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 animate-slide-up">
                                Mental Health Support for <span className="text-brand-600">Students</span>
                            </h1>

                            <p className="text-xl text-slate-600 mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
                                A safe space for Kenyan high school students to share, learn, and get support.
                                Anonymous, confidential, and always here for you.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                                <Link to="/login" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                                    <LogIn size={20} />
                                    Student Login
                                </Link>
                                <Link to="/request-access" className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2">
                                    <UserPlus size={20} />
                                    School Access Request
                                </Link>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-8 mt-24">
                            <div className="card hover:border-brand-200 transition-colors">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4">
                                    <ShieldCheck size={24} />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Anonymous & Private</h3>
                                <p className="text-slate-600">Log in with an access code. No phone numbers or emails required for students.</p>
                            </div>
                            <div className="card hover:border-brand-200 transition-colors">
                                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 mb-4">
                                    <Activity size={24} />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Clinical Triage</h3>
                                <p className="text-slate-600">Smart assessment tools aligned with Ministry of Health guidelines to get you the right help.</p>
                            </div>
                            <div className="card hover:border-brand-200 transition-colors">
                                <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center text-accent mb-4">
                                    <Heart size={24} />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Professional Support</h3>
                                <p className="text-slate-600">Access to licensed counsellors via chat or video when you need it most.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t border-slate-100 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Pendo Care. Built for Kenyan Students.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
