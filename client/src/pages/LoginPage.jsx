import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { KeyRound, ShieldCheck, ArrowRight, Heart, Lock, Sparkles } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [code, setCode] = useState('');
    const [success, setSuccess] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/api/verify-access', {
                code: code.toUpperCase()
            });

            const { role, redirect, user, school, token } = response.data;

            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_role', role);

            if (role === 'student') {
                localStorage.setItem('user_name', code.toUpperCase());
                localStorage.setItem('school_name', school);
            } else {
                localStorage.setItem('user_name', user?.name || 'User');
                if (user?.id) localStorage.setItem('user_id', user.id);
                if (user?.email) localStorage.setItem('user_email', user.email);
            }

            setSuccess(true);
            setTimeout(() => {
                navigate(redirect);
            }, 800);

        } catch (err) {
            setError(err.response?.data?.error || 'Invalid access code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex relative overflow-hidden">

            {/* ── Background Orbs ── */}
            <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-sky-500/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-400/5 rounded-full blur-[100px] animate-pulse-soft pointer-events-none" />

            {/* ── Left Decorative Panel (hidden on mobile) ── */}
            <div className="hidden lg:flex flex-col justify-between w-1/2 p-16 relative z-10">
                {/* Brand */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center text-white
                                    shadow-lg shadow-brand-500/30">
                        <Heart size={22} fill="currentColor" />
                    </div>
                    <span className="text-2xl font-display font-bold bg-gradient-to-r from-white to-brand-200 bg-clip-text text-transparent">
                        PendoCare
                    </span>
                </Link>

                {/* Center Content */}
                <div className="max-w-md">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-display text-5xl font-bold text-white leading-tight mb-6"
                    >
                        Welcome back to your
                        <span className="block mt-2 bg-gradient-to-r from-brand-300 to-sky-400 bg-clip-text text-transparent">
                            safe space
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-slate-400 text-lg leading-relaxed"
                    >
                        Your mental health journey is confidential, secure, and entirely yours.
                        Enter your access code to continue.
                    </motion.p>

                    {/* Trust badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-6 mt-10"
                    >
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Lock size={14} className="text-brand-400" />
                            <span>Encrypted</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <ShieldCheck size={14} className="text-brand-400" />
                            <span>Anonymous</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Sparkles size={14} className="text-brand-400" />
                            <span>Confidential</span>
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <p className="text-slate-600 text-sm">
                    &copy; {new Date().getFullYear()} PendoCare. Built for Kenyan Students.
                </p>
            </div>

            {/* ── Right Login Form ── */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-16 relative z-10">
                <div className="w-full max-w-md">

                    {/* Mobile brand header */}
                    <div className="lg:hidden text-center mb-10">
                        <Link to="/" className="inline-flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
                                <Heart size={22} fill="currentColor" />
                            </div>
                            <span className="text-2xl font-display font-bold bg-gradient-to-r from-white to-brand-200 bg-clip-text text-transparent">
                                PendoCare
                            </span>
                        </Link>
                        <h1 className="font-display text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-slate-400">Enter your access code to continue</p>
                    </div>

                    {/* Glass Card Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
                        style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                        }}
                    >
                        {/* Decorative glow inside card */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/10 rounded-full blur-[60px] pointer-events-none" />

                        <div className="relative z-10">
                            {/* Icon */}
                            <div className="w-14 h-14 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center text-white mb-8
                                            shadow-lg shadow-brand-500/25">
                                <ShieldCheck size={28} />
                            </div>

                            <h2 className="font-display text-2xl font-bold text-white mb-1">
                                Pendo Portal
                            </h2>
                            <p className="text-slate-400 text-sm mb-8">
                                Enter your unique access code to sign in
                            </p>

                            <form onSubmit={handleLogin} className="space-y-6">
                                {/* Access Code Input */}
                                <div>
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2.5 block">
                                        Access Code
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-400 transition-colors">
                                            <KeyRound size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="e.g. NRB-1234 or CNSL-5678"
                                            className="w-full rounded-2xl pl-12 pr-4 py-4 outline-none transition-all
                                                       font-mono font-bold text-lg uppercase tracking-wider text-white
                                                       placeholder:text-slate-600"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.06)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = 'rgba(94, 234, 212, 0.4)';
                                                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                                e.target.style.background = 'rgba(255, 255, 255, 0.06)';
                                            }}
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Error */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="rounded-2xl p-4 text-sm font-semibold flex items-center gap-2.5"
                                            style={{
                                                background: 'rgba(239, 68, 68, 0.12)',
                                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                                color: '#fca5a5',
                                            }}
                                        >
                                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse flex-shrink-0" />
                                            {error}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Success */}
                                <AnimatePresence>
                                    {success && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="rounded-2xl p-4 text-sm font-semibold flex items-center gap-2.5"
                                            style={{
                                                background: 'rgba(16, 185, 129, 0.12)',
                                                border: '1px solid rgba(16, 185, 129, 0.2)',
                                                color: '#6ee7b7',
                                            }}
                                        >
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" />
                                            Welcome! Redirecting you now...
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-glass w-full !py-4 !rounded-2xl font-bold text-base group"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>Continue to Dashboard</span>
                                            <ArrowRight size={18} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Footer links */}
                    <div className="mt-8 text-center space-y-4">
                        <p className="text-slate-500 text-sm">
                            Don't have a code?{' '}
                            <Link to="/request-access" className="text-brand-400 font-semibold hover:text-brand-300 transition-colors">
                                Register your school
                            </Link>
                        </p>
                        <div className="flex items-center justify-center gap-4 text-slate-700">
                            <div className="h-px w-8 bg-slate-800" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">PendoCare</span>
                            <div className="h-px w-8 bg-slate-800" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
