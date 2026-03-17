import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ChevronRight, ChevronLeft, Sparkles, ShieldCheck, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// PHQ-9 Depression Screening Questions
const phq9Questions = [
    "How often have you been finding joy in your usual hobbies or hangouts lately?",
    "How would you describe your overall mood or outlook on things this week?",
    "How refreshed are you feeling by your sleep lately?",
    "How is your energy holding up throughout the day?",
    "How has your relationship with food and your usual appetite been?",
    "How kind have you been able to be toward yourself lately?",
    "How easy has it been to stay focused on your studies or tasks?",
    "How would you describe your general pace and comfort level lately?",
    "Have you been having any thoughts about your safety or needing extra support right now?",
];

const responseOptions = [
    { value: "3", label: "Mostly/Daily", emoji: "🌟", color: "rgba(45, 212, 191, 0.2)" }, // Teal glass
    { value: "2", label: "Often", emoji: "☀️", color: "rgba(56, 189, 248, 0.2)" },        // Blue glass
    { value: "1", label: "Sometimes", emoji: "⛅", color: "rgba(251, 191, 36, 0.2)" },    // Amber glass
    { value: "0", label: "Not much", emoji: "☁️", color: "rgba(148, 163, 184, 0.2)" },    // Slate glass
];

const encouragements = [
    "You're doing great! 🌻",
    "Keep going — every step matters 💪",
    "Halfway there! Stay kind to yourself 💖",
    "Almost done — you've got this 🌟",
    "Final stretch — take a deep breath 🌿",
    "You're being brave for checking in 💚",
    "Only a few left — stay with it 🌼",
    "You're almost done — proud of you! 💫",
    "Last one! Thank you for being honest 💙",
];

const TriageAssessment = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [responses, setResponses] = useState(Array(phq9Questions.length).fill(""));
    const [showIntro, setShowIntro] = useState(true);

    const progress = ((currentQuestion + 1) / phq9Questions.length) * 100;

    const handleResponse = (value) => {
        const newResponses = [...responses];
        newResponses[currentQuestion] = value;
        setResponses(newResponses);

        if (currentQuestion < phq9Questions.length - 1) {
            setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
        }
    };

    const handleNext = () => {
        if (currentQuestion < phq9Questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const totalScore = responses.reduce((sum, res) => sum + parseInt(res || "0"), 0);
            if (totalScore <= 9) {
                navigate("/dashboard/low");
            } else if (totalScore <= 19) {
                navigate("/dashboard/moderate");
            } else {
                navigate("/dashboard/high");
            }
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 py-8 px-4 relative overflow-hidden">
            {/* Background orbs */}
            <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-brand-500/8 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-sky-500/6 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] bg-brand-400/5 rounded-full blur-[100px] animate-pulse-soft pointer-events-none" />

            <div className="max-w-2xl mx-auto relative z-10">
                {/* Intro Modal */}
                <AnimatePresence>
                    {showIntro && (
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center p-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(10px)' }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(20px)',
                                }}
                            >
                                <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-500/10 rounded-full blur-[60px] pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-brand-500/25">
                                        <Heart size={28} />
                                    </div>
                                    <h2 className="font-display text-2xl font-bold text-white mb-3">Welcome 🌸</h2>
                                    <p className="text-slate-400 mb-8 leading-relaxed">
                                        This short wellness check helps you reflect on how you've been
                                        feeling lately. It's safe, private, and confidential ❤
                                    </p>
                                    <button
                                        onClick={() => setShowIntro(false)}
                                        className="btn-glass w-full !py-4 !rounded-2xl font-bold"
                                    >
                                        <Sparkles size={18} />
                                        Start Check-In
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!showIntro && (
                    <>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-sm font-medium">
                                <ArrowLeft size={16} />
                                Home
                            </Link>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg flex items-center justify-center text-white">
                                    <Heart size={16} fill="currentColor" />
                                </div>
                                <span className="font-display font-bold text-white">Wellness Check</span>
                            </div>
                        </div>

                        {/* Progress Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 rounded-3xl p-6"
                            style={{
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                        >
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] block mb-1">Progress</span>
                                    <span className="text-2xl font-display font-bold text-white">
                                        Question {currentQuestion + 1} <span className="text-slate-600">/ {phq9Questions.length}</span>
                                    </span>
                                </div>
                                <span className="text-lg font-bold text-brand-400">{Math.round(progress)}%</span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="h-full rounded-full bg-gradient-to-r from-brand-400 to-sky-400"
                                />
                            </div>

                            <p className="text-center text-brand-300/70 font-medium mt-4 text-sm">
                                {encouragements[currentQuestion]}
                            </p>
                        </motion.div>

                        {/* Question Card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestion}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-3xl overflow-hidden"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(20px)',
                                }}
                            >
                                <div className="p-8 md:p-10">
                                    <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-8 leading-relaxed">
                                        <span className="block mt-3 text-brand-300">
                                            {phq9Questions[currentQuestion]}
                                        </span>
                                    </h2>

                                    <div className="space-y-3">
                                        {responseOptions.map((option) => (
    <div
        key={option.value}
        onClick={() => handleResponse(option.value)}
        className={`flex items-center p-5 rounded-2xl transition-all duration-300 cursor-pointer group select-none hover:translate-x-2 ${
            responses[currentQuestion] === option.value
                ? 'scale-[1.02] shadow-lg shadow-brand-500/10'
                : 'hover:bg-white/5'
        }`}
        style={{
            background: responses[currentQuestion] === option.value
                ? option.activeColor // Uses the specific color from the object
                : 'rgba(255, 255, 255, 0.03)',
            border: responses[currentQuestion] === option.value
                ? '1px solid rgba(255, 255, 255, 0.3)'
                : '1px solid rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(10px)',
        }}
    >
        {/* The Radio Circle */}
        <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${
            responses[currentQuestion] === option.value
                ? 'border-white bg-white'
                : 'border-slate-600 group-hover:border-brand-400'
        }`}>
            {responses[currentQuestion] === option.value && (
                <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />
            )}
        </div>

        {/* The Emoji & Label */}
        <span className="text-2xl mr-3 group-hover:scale-125 transition-transform">
            {option.emoji}
        </span>
        <span className={`text-base font-semibold transition-colors ${
            responses[currentQuestion] === option.value ? 'text-white' : 'text-slate-400'
        }`}>
            {option.label}
        </span>
    </div>
))}
                                    </div>

                                    {/* Nav buttons */}
                                    <div className="flex gap-4 mt-8">
                                        <button
                                            onClick={handlePrevious}
                                            disabled={currentQuestion === 0}
                                            className="flex-1 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all
                                                       disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.06)',
                                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                            }}
                                        >
                                            <ChevronLeft size={18} /> Previous
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            disabled={!responses[currentQuestion]}
                                            className="btn-glass flex-[2] !py-4 !rounded-2xl font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            {currentQuestion === phq9Questions.length - 1
                                                ? "See Results"
                                                : "Next Question"}
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Confidentiality notice */}
                        <div
                            className="mt-8 p-5 rounded-2xl text-center"
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                            }}
                        >
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <ShieldCheck size={14} className="text-brand-400" />
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Confidential</span>
                            </div>
                            <p className="text-slate-500 text-sm">
                                This reflection helps us provide you with the right support.
                                <span className="text-brand-400"> Your responses are completely confidential.</span>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TriageAssessment;
