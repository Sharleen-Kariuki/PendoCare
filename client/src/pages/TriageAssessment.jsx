import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Custom UI Components (Replacements for Shadcn)
const CustomButton = ({ children, onClick, variant = 'primary', className = '', size = 'md', disabled }) => {
    const baseStyles = "inline-flex items-center justify-center rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
        primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-100",
        outline: "bg-white text-slate-600 border-2 border-slate-100 hover:border-brand-200 hover:text-brand-600 shadow-sm",
        hero: "bg-gradient-to-r from-brand-600 to-indigo-600 text-white hover:opacity-90 shadow-xl shadow-brand-100",
        ghost: "text-slate-500 hover:text-brand-600 hover:bg-brand-50"
    };
    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <button onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
            {children}
        </button>
    );
};

const CustomProgress = ({ value }) => (
    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            className="h-full bg-gradient-to-r from-brand-500 to-indigo-500"
        />
    </div>
);

// PHQ-9 Depression Screening Questions
const phq9Questions = [
    "Little interest or pleasure in doing things?",
    "Feeling down, depressed, or hopeless?",
    "Trouble falling or staying asleep, or sleeping too much?",
    "Feeling tired or having little energy?",
    "Poor appetite or overeating?",
    "Feeling bad about yourself or that you are a failure?",
    "Trouble concentrating on things?",
    "Moving or speaking slowly, or being fidgety or restless?",
    "Thoughts that you would be better off dead, or hurting yourself?",
];

const responseOptions = [
    { value: "0", label: "Not at all" },
    { value: "1", label: "Several days" },
    { value: "2", label: "More than half the days" },
    { value: "3", label: "Nearly every day" },
];

const encouragements = [
    "You're doing great! 🌻",
    "Keep going — every step matters 💪",
    "Halfway there! Stay kind to yourself 💖",
    "Almost done — you’ve got this 🌟",
    "Final stretch — take a deep breath 🌿",
    "You're being brave for checking in 💚",
    "Only a few left — stay with it 🌼",
    "You’re almost done — proud of you! 💫",
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

        // Auto-advance slightly delayed for better UX
        if (currentQuestion < phq9Questions.length - 1) {
            setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
        }
    };

    const handleNext = () => {
        if (currentQuestion < phq9Questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const totalScore = responses.reduce((sum, res) => sum + parseInt(res || "0"), 0);

            // Routing logic based on score
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
        <div className="min-h-screen bg-slate-50 py-12 px-4 selection:bg-brand-100 selection:text-brand-900">
            <div className="max-w-3xl mx-auto">
                <AnimatePresence>
                    {showIntro && (
                        <motion.div
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-lg w-full text-center relative overflow-hidden"
                                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            >
                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-brand-600 animate-pulse">
                                        <Heart size={40} fill="currentColor" />
                                    </div>
                                    <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Welcome 🌸</h2>
                                    <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                                        This short wellness check helps you reflect on how you’ve been
                                        feeling lately. It's safe, private, and confidential ❤.
                                    </p>
                                    <CustomButton onClick={() => setShowIntro(false)} size="lg" className="w-full">
                                        Start Check-In
                                    </CustomButton>
                                </div>
                                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-50 rounded-full blur-3xl opacity-50"></div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!showIntro && (
                    <>
                        <div className="text-center mb-12">
                            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl shadow-soft flex items-center justify-center text-brand-600 animate-fade-in">
                                <Heart className="w-8 h-8" fill="currentColor" />
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Wellness Check</h1>
                            <p className="text-slate-500 font-medium flex items-center justify-center gap-2">
                                <Sparkles size={16} /> Talk to Us ❤
                            </p>
                        </div>

                        <div className="mb-10 bg-white p-6 rounded-3xl shadow-soft border border-slate-100 animate-slide-up">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block mb-1">Current Progress</span>
                                    <span className="text-2xl font-black text-slate-900">Question {currentQuestion + 1} <span className="text-slate-300 font-bold">/ {phq9Questions.length}</span></span>
                                </div>
                                <span className="text-lg font-black text-brand-600">{Math.round(progress)}%</span>
                            </div>
                            <CustomProgress value={progress} />
                            <p className="text-center text-lg font-bold text-slate-500 mt-6 animate-pulse">
                                {encouragements[currentQuestion]}
                            </p>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestion}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
                            >
                                <div className="p-8 md:p-12">
                                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 leading-tight">
                                        {phq9Questions[currentQuestion]}
                                    </h2>

                                    <div className="space-y-3">
                                        {responseOptions.map((option) => (
                                            <div
                                                key={option.value}
                                                onClick={() => handleResponse(option.value)}
                                                className={`flex items-center p-6 rounded-[1.5rem] border-2 transition-all cursor-pointer group select-none ${responses[currentQuestion] === option.value
                                                        ? 'border-brand-600 bg-brand-50/50'
                                                        : 'border-slate-100 hover:border-brand-200 hover:bg-slate-50'
                                                    }`}
                                            >
                                                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${responses[currentQuestion] === option.value
                                                        ? 'border-brand-600 bg-brand-600'
                                                        : 'border-slate-300 group-hover:border-brand-400 bg-white'
                                                    }`}>
                                                    {responses[currentQuestion] === option.value && <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />}
                                                </div>
                                                <span className={`text-lg font-bold transition-colors ${responses[currentQuestion] === option.value ? 'text-brand-900' : 'text-slate-700'
                                                    }`}>
                                                    {option.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 mt-10">
                                        <CustomButton
                                            variant="outline"
                                            onClick={handlePrevious}
                                            disabled={currentQuestion === 0}
                                            className="flex-1"
                                        >
                                            <ChevronLeft className="mr-2 w-5 h-5" /> Previous
                                        </CustomButton>
                                        <CustomButton
                                            variant="hero"
                                            onClick={handleNext}
                                            disabled={!responses[currentQuestion]}
                                            className="flex-3 w-full"
                                        >
                                            {currentQuestion === phq9Questions.length - 1
                                                ? "See Results "
                                                : "Next Question"}
                                            <ChevronRight className="ml-2 w-5 h-5" />
                                        </CustomButton>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-center shadow-xl">
                            <p className="text-slate-300 font-medium">
                                Remember: This reflection helps us provide you with the right support.
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
