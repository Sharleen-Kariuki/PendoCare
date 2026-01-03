import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, ShieldCheck, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form State
    const [code, setCode] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/api/verify-access', {
                code: code.toUpperCase()
            });

            const { role, redirect, user, school, token } = response.data;

            // Store Authentication Data
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_role', role);

            // Handle Student specifically
            if (role === 'student') {
                localStorage.setItem('user_name', code.toUpperCase());
                localStorage.setItem('school_name', school);
            } else {
                localStorage.setItem('user_name', user?.name || 'User');
            }

            // Success Redirect
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
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-brand-500 selection:text-white">
            <div className="w-full max-w-md">
                {/* Logo / Branding */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-brand-600 rounded-3xl shadow-xl shadow-brand-200 mb-6"
                    >
                        <ShieldCheck className="text-white" size={32} />
                    </motion.div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Pendo Portal</h1>
                    <p className="text-slate-500 mt-2 font-medium">Enter your access code to continue.</p>
                </div>

                <motion.div
                    layout
                    className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden relative"
                >
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Access Code Field */}
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block px-1">Access Code</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors">
                                    <KeyRound size={20} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="e.g. NRB-1234 or CNSL-5678"
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-brand-500 focus:bg-white transition-all font-mono font-bold text-lg uppercase tracking-wider"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                            </div>
                        </div>



                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border border-red-100"
                            >
                                <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                                {error}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 ${loading
                                ? 'bg-slate-300 cursor-not-allowed shadow-none'
                                : 'bg-brand-600 hover:bg-brand-700 shadow-brand-100'
                                }`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Continue to Dashboard</span>
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>

                {/* Footer Links */}
                <div className="mt-8 text-center space-y-4">
                    <p className="text-slate-400 text-xs font-medium">
                        Don't have a code? <a href="/request-access" className="text-brand-600 font-bold hover:underline">Register your school</a>
                    </p>
                    <div className="flex items-center justify-center gap-4 text-slate-300">
                        <div className="h-px w-8 bg-slate-200" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Pendo Care</span>
                        <div className="h-px w-8 bg-slate-200" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

