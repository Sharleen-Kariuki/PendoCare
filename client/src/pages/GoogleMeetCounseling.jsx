import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import {
    AlertTriangle, Video, Calendar, Clock, User,
    ArrowLeft, CheckCircle, Sparkles, Shield, Heart, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GoogleMeetCounseling = () => {
    const navigate = useNavigate();
    const [counselors, setCounselors] = useState([]);
    const schoolName = localStorage.getItem('school_name');
    const studentNickname = localStorage.getItem('user_name') || 'Student';

    const [formData, setFormData] = useState({
        counselorId: null,
        date: '',
        time: '',
        email: studentNickname,
        meetLink: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCounselors = async () => {
            try {
                const response = await api.get('/api/counselors');
                const data = response.data;
                const filteredData = schoolName
                    ? data.filter(c => c.assigned_school === schoolName)
                    : data;

                const mappedCounselors = filteredData.map(c => ({
                    ...c,
                    image: c.name.includes('Sarah') || c.name.includes('Grace') ? '👩‍⚕️' : '👨‍⚕️',
                    experience: `${c.experience_years}+ Years Experience`
                }));
                setCounselors(mappedCounselors);
            } catch (error) {
                console.error('Error fetching counselors:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCounselors();
    }, [schoolName]);

    const updateFormData = (field, value) => {
        if (field === 'counselorId') {
            const now = new Date();
            const currentDate = now.toISOString().split('T')[0];
            const currentTime = `${now.getHours().toString().padStart(2, '0')}:00`;
            setFormData(prev => ({
                ...prev,
                [field]: value,
                date: currentDate,
                time: currentTime
            }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        const meetingId = `Pendo-Session-${Date.now()}`;
        const meetLink = `https://meet.jit.si/${meetingId}`;
        const counselor = counselors.find(c => c.id === formData.counselorId);
        const schoolEmail = `${studentNickname.toLowerCase().replace(/\s+/g, '.')}@pendo.care`;
        const endTime = Date.now() + (50 * 60 * 1000);

        try {
            await api.post('/api/start-session', {
                counselorId: formData.counselorId,
                studentEmail: schoolEmail,
                endTime
            });
            await api.post('/api/send-meeting-link', {
                studentEmail: schoolEmail,
                counselorId: counselor.id,
                counselorEmail: counselor.email,
                counselorName: counselor.name,
                date: formData.date,
                time: formData.time,
                meetLink: meetLink
            });
        } catch (error) {
            console.error('API Error:', error);
        }

        setFormData(prev => ({ ...prev, meetLink: meetLink, email: schoolEmail }));
        setSubmitted(true);
        setLoading(false);
    };

    /* ═══════════ SUCCESS STATE ═══════════ */
    if (submitted) {
        const counselor = counselors.find(c => c.id === formData.counselorId);
        return (
            <div className="min-h-screen bg-slate-950 py-12 px-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[150px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full relative z-10"
                >
                    {/* Success header */}
                    <div className="rounded-t-3xl p-10 text-center relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(13,148,136,0.15) 100%)',
                            border: '1px solid rgba(16,185,129,0.2)',
                            borderBottom: 'none',
                        }}>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400/10 rounded-full blur-[60px] pointer-events-none" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-gradient-to-br from-emerald-400 to-brand-500 text-white shadow-lg shadow-emerald-500/20">
                                <Video size={32} />
                            </div>
                            <h2 className="font-display text-3xl font-bold text-white mb-2">Meeting Room Ready!</h2>
                            <p className="text-emerald-300/70">Your secure session is waiting for you.</p>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="rounded-b-3xl p-8 md:p-10"
                        style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderTop: 'none',
                        }}>
                        {/* Session Info */}
                        <div className="rounded-2xl p-6 mb-6"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <h3 className="font-display font-bold text-white mb-4 flex items-center gap-2">
                                <Shield size={18} className="text-brand-400" /> Session Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block mb-1">Counselor</span>
                                    <span className="text-white font-semibold">{counselor.name}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block mb-1">Duration</span>
                                    <span className="text-white font-semibold">50 Minutes</span>
                                </div>
                                <div className="md:col-span-2">
                                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block mb-1">Date</span>
                                    <span className="text-white font-semibold">
                                        {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Warning */}
                        <div className="rounded-2xl p-5 mb-6 flex gap-3"
                            style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.15)' }}>
                            <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
                            <p className="text-amber-300/80 text-sm leading-relaxed">
                                <strong>Before joining:</strong> Ensure you are in a quiet, private space. Your conversation is secure and strictly confidential.
                            </p>
                        </div>

                        {/* Join Button */}
                        <button
                            onClick={() => window.open(formData.meetLink, '_blank')}
                            className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-3 transition-all hover:brightness-110 active:scale-[0.98]"
                            style={{
                                background: 'linear-gradient(135deg, rgba(16,185,129,0.6) 0%, rgba(13,148,136,0.5) 100%)',
                                border: '1px solid rgba(16,185,129,0.3)',
                                backdropFilter: 'blur(12px)',
                                boxShadow: '0 8px 32px rgba(16,185,129,0.2)',
                            }}
                        >
                            <Video size={22} />
                            Join Private Session Now
                        </button>

                        {/* Link & extras */}
                        <div className="mt-6 text-center space-y-4">
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Direct Access Link</p>
                            <div className="rounded-xl p-3 flex items-center"
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <code className="flex-1 text-sm text-slate-400 truncate">{formData.meetLink}</code>
                            </div>

                            <div className="flex items-center justify-center gap-2 text-brand-400 text-sm font-medium">
                                <Clock size={14} />
                                Room active for 50 minutes
                            </div>

                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-3 rounded-xl text-sm font-semibold text-slate-500 transition-all hover:text-slate-300"
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                            >
                                Cancel and Go Back
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    /* ═══════════ BOOKING STATE ═══════════ */
    return (
        <div className="min-h-screen bg-slate-950 py-10 px-4 relative overflow-hidden">
            <div className="absolute top-[-150px] right-[-100px] w-[400px] h-[400px] bg-brand-500/6 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[-100px] left-[-80px] w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-sm font-medium mb-8">
                    <ArrowLeft size={16} />
                    Back
                </button>

                {/* Crisis banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl p-5 mb-10 flex gap-4 items-center"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}
                >
                    <AlertTriangle size={20} className="text-red-400 shrink-0" />
                    <p className="text-red-300/80 text-sm">
                        <strong>Immediate Crisis Support:</strong> Please call <strong>0800 720 648</strong> or <strong>999 / 112</strong> if you are in immediate danger.
                    </p>
                </motion.div>

                {/* Title */}
                <div className="text-center mb-12">
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Book a Private Session
                    </h1>
                    <p className="text-xl text-slate-400">
                        Choose a professional and start your video call immediately.
                    </p>
                </div>

                {/* Main Card */}
                <div className="rounded-3xl overflow-hidden"
                    style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(20px)',
                    }}>
                    <div className="p-8 md:p-10">
                        {/* Section header */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                                <User size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-display font-bold text-white">Select Your Counselor</h2>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Licensed Professionals Only</p>
                            </div>
                        </div>

                        {/* Counselor List */}
                        <div className="grid gap-4">
                            {counselors.map(counselor => {
                                const isAvailable = true;
                                const isSelected = formData.counselorId === counselor.id;

                                return (
                                    <div
                                        key={counselor.id}
                                        onClick={() => isAvailable && updateFormData('counselorId', counselor.id)}
                                        className="group p-6 rounded-2xl transition-all relative overflow-hidden cursor-pointer"
                                        style={{
                                            background: isSelected
                                                ? 'rgba(13,148,136,0.12)'
                                                : 'rgba(255,255,255,0.03)',
                                            border: isSelected
                                                ? '1px solid rgba(94,234,212,0.25)'
                                                : '1px solid rgba(255,255,255,0.06)',
                                        }}
                                    >
                                        <div className="flex items-center gap-6 relative z-0">
                                            <div className="w-16 h-16 rounded-2xl text-3xl flex items-center justify-center group-hover:scale-110 transition-transform"
                                                style={{ background: 'rgba(255,255,255,0.06)' }}>
                                                {counselor.image}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-display font-bold text-white mb-0.5">{counselor.name}</h3>
                                                <p className="text-slate-400 text-sm font-medium mb-0.5">{counselor.specialty}</p>
                                                <p className="text-slate-500 text-xs">{counselor.experience}</p>
                                                <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                                    style={{
                                                        background: 'rgba(16,185,129,0.1)',
                                                        color: '#6ee7b7',
                                                        border: '1px solid rgba(16,185,129,0.15)',
                                                    }}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                    Available Now
                                                </div>
                                            </div>
                                            {isSelected && (
                                                <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                                                    <CheckCircle size={22} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Submit Area */}
                        <div className="mt-10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, rgba(13,148,136,0.1) 0%, rgba(56,189,248,0.05) 100%)',
                                border: '1px solid rgba(94,234,212,0.12)',
                            }}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-400/8 rounded-full blur-[50px] pointer-events-none" />
                            <div className="relative z-10">
                                <h4 className="font-display font-bold text-white mb-1">Ready to begin?</h4>
                                <p className="text-slate-400 text-sm">Your meeting link will be generated instantly.</p>
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={!formData.counselorId || loading}
                                className="btn-glass w-full md:w-auto relative z-10 disabled:opacity-30 disabled:cursor-not-allowed group"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Video size={20} />
                                        {formData.counselorId ? 'Create Meeting Room' : 'Select a Counselor'}
                                        <ArrowRight size={16} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoogleMeetCounseling;
