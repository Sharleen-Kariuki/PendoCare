import React, { useState } from 'react';
import { School, CheckCircle, AlertCircle, ArrowLeft, Heart, Building2, Mail, User, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const SchoolAccessForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactPerson: '',
        phone: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post(import.meta.env.VITE_API_URL + '/api/request-access', formData);
            setSubmitted(true);
        } catch (err) {
            console.error("Submission error:", err);
            setError('Failed to submit request. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[150px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full text-center py-12 px-8 rounded-3xl relative z-10"
                    style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-brand-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-white mb-3">Request Sent!</h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Thank you for registering <span className="text-brand-300 font-semibold">{formData.name}</span>.
                        Our admin team will review your details and email your Access Code shortly.
                    </p>
                    <Link to="/" className="btn-glass inline-flex">
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    const inputStyle = {
        background: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    };

    const handleFocus = (e) => {
        e.target.style.borderColor = 'rgba(94, 234, 212, 0.4)';
        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
    };

    const handleBlur = (e) => {
        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        e.target.style.background = 'rgba(255, 255, 255, 0.06)';
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
            {/* Background orbs */}
            <div className="absolute top-[-150px] right-[-100px] w-[400px] h-[400px] bg-brand-500/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-100px] left-[-80px] w-[350px] h-[350px] bg-sky-500/6 rounded-full blur-[100px] pointer-events-none" />

            {/* Top bar */}
            <div className="max-w-7xl mx-auto px-6 py-5 w-full relative z-10 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-sm font-medium">
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg flex items-center justify-center text-white">
                        <Heart size={16} fill="currentColor" />
                    </div>
                    <span className="font-display font-bold text-white text-lg">PendoCare</span>
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center p-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-lg w-full rounded-3xl p-8 md:p-10 relative overflow-hidden"
                    style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                    }}
                >
                    <div className="absolute top-0 left-0 w-32 h-32 bg-brand-500/10 rounded-full blur-[50px] pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
                                <School size={24} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-display font-bold text-white">School Registration</h1>
                                <p className="text-slate-400 text-sm">Get PendoCare access for your students</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* School Name */}
                            <div>
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2.5 block">School Name</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-400 transition-colors">
                                        <Building2 size={18} />
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Nairobi High School"
                                        className="w-full rounded-2xl pl-12 pr-4 py-4 outline-none transition-all text-white placeholder:text-slate-600"
                                        style={inputStyle}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2.5 block">Official Email</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-400 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        required
                                        type="email"
                                        placeholder="info@school.ac.ke"
                                        className="w-full rounded-2xl pl-12 pr-4 py-4 outline-none transition-all text-white placeholder:text-slate-600"
                                        style={inputStyle}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Two Column */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2.5 block">Contact Person</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-400 transition-colors">
                                            <User size={18} />
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Principal Name"
                                            className="w-full rounded-2xl pl-12 pr-4 py-4 outline-none transition-all text-white placeholder:text-slate-600"
                                            style={inputStyle}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            value={formData.contactPerson}
                                            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2.5 block">Phone Number</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-400 transition-colors">
                                            <Phone size={18} />
                                        </div>
                                        <input
                                            required
                                            type="tel"
                                            placeholder="+254 7..."
                                            className="w-full rounded-2xl pl-12 pr-4 py-4 outline-none transition-all text-white placeholder:text-slate-600"
                                            style={inputStyle}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div
                                    className="rounded-2xl p-4 text-sm font-semibold flex items-center gap-2.5"
                                    style={{
                                        background: 'rgba(239, 68, 68, 0.12)',
                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                        color: '#fca5a5',
                                    }}
                                >
                                    <AlertCircle size={16} />
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="btn-glass w-full !py-4 !rounded-2xl font-bold"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        'Submit Registration Request'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SchoolAccessForm;
