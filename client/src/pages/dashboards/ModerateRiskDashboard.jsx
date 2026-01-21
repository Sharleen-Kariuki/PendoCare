import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Send, Bot, User } from "lucide-react";
import { getChatbotResponse } from "../../services/geminiService";

// Standard Button Replacement
const CustomButton = ({ children, onClick, variant = 'primary', className = '', size = 'md', disabled }) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
        primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-200",
        secondary: "bg-white text-slate-900 border border-slate-200 hover:border-brand-200 hover:text-brand-600 shadow-sm",
        ghost: "text-slate-600 hover:text-brand-600 hover:bg-brand-50",
        outline: "border-2 border-brand-100 text-brand-600 hover:bg-brand-50"
    };
    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-8 py-3 text-base"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </button>
    );
};

const ModerateRiskDashboard = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! I'm Pendo, your AI companion. How are you feeling today?" }
    ]);
    const [input, setInput] = useState("");
    const [studentName, setStudentName] = useState(localStorage.getItem('student_name') || "");
    const [sessionId, setSessionId] = useState(localStorage.getItem('chat_session_id') || "");
    const [showNamePrompt, setShowNamePrompt] = useState(!localStorage.getItem('student_name'));
    const [tempName, setTempName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSaveName = () => {
        if (tempName.trim()) {
            const newName = tempName.trim();
            const newSessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

            setStudentName(newName);
            setSessionId(newSessionId);

            localStorage.setItem('student_name', newName);
            localStorage.setItem('chat_session_id', newSessionId);

            setShowNamePrompt(false);
            setMessages([{ sender: "bot", text: `Hello ${newName}! I'm Pendo, your AI companion. How are you feeling today?` }]);
        }
    };

    const handleEndChat = () => {
        if (window.confirm("Are you sure you want to end this chat session? This will clear your current conversation and log you out of the portal.")) {
            localStorage.clear();
            navigate("/login");
        }
    };

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        const userMessage = { sender: "user", text: trimmed };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // Convert messages to Gemini history format, ensuring it starts with a user message
            let history = messages.map(msg => ({
                role: msg.sender === "user" ? "user" : "model",
                parts: [{ text: msg.text }]
            }));

            // Gemini specific: history must start with role: user
            if (history.length > 0 && history[0].role === 'model') {
                history = history.slice(1);
            }

            const { response, escalate } = await getChatbotResponse(trimmed, history, studentName, sessionId);

            const botMessage = { sender: "bot", text: response };
            setMessages((prev) => [...prev, botMessage]);

            if (escalate) {
                setTimeout(() => {
                    alert("I'm concerned about what you've shared. I'm going to help you connect with a professional counsellor who can support you better.");
                    navigate("/book-counselling");
                }, 1000);
            }
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "I'm having trouble connecting right now. Please try again shortly.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 relative">
            {/* Name Prompt Overlay */}
            {showNamePrompt && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-slide-up">
                        <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-600 mb-6">
                            <Bot size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome to PendoPal!</h2>
                        <p className="text-slate-500 mb-6">Before we start, what's your name? I'd love to know who I'm chatting with.</p>
                        <input
                            type="text"
                            placeholder="Your name"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-500 transition-all mb-4 font-semibold"
                            autoFocus
                        />
                        <CustomButton onClick={handleSaveName} className="w-full py-4 text-lg" disabled={!tempName.trim()}>
                            Let's Chat
                        </CustomButton>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-64px)]">
                {/* Previous code... */}
                <div className="flex items-center justify-between mb-6">
                    <CustomButton variant="ghost" onClick={() => navigate("/")} className="text-slate-500">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Home
                    </CustomButton>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600">
                            <Bot size={18} />
                        </div>
                        <span className="font-bold text-slate-900">Pendo AI</span>
                    </div>
                    <CustomButton
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate("/book-counselling")}
                        className="text-brand-600 border-brand-100 hover:bg-brand-50"
                    >
                        Talk to a Professional
                    </CustomButton>
                </div>

                {/* Chatbot Section */}
                <div className="flex-1 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col relative">

                    {/* Header Info */}
                    <div className="p-6 border-b border-slate-50 bg-white sticky top-0 z-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-100">
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">{studentName ? `Hi ${studentName}!` : "PendoPal"}</h2>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    <span className="text-sm font-medium text-slate-500">Always here to listen</span>
                                </div>
                            </div>
                        </div>
                        <CustomButton variant="outline" size="sm" onClick={handleEndChat} className="text-red-500 border-red-100 hover:bg-red-50 hover:text-red-600">
                            End Chat
                        </CustomButton>
                    </div>

                    {/* Message Area */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30"
                    >
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.sender === "user" ? "bg-white text-slate-400" : "bg-brand-600 text-white"
                                        }`}>
                                        {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                                    </div>
                                    <div
                                        className={`px-5 py-3.5 rounded-2xl text-base leading-relaxed ${msg.sender === "user"
                                            ? "bg-brand-600 text-white rounded-tr-none shadow-lg shadow-brand-100"
                                            : "bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-soft"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start animate-fade-in">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-sm">
                                        <Bot size={16} />
                                    </div>
                                    <div className="bg-white border border-slate-100 px-5 py-3 rounded-2xl rounded-tl-none shadow-soft flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Section */}
                    <div className="p-6 bg-white border-t border-slate-50">
                        <div className="relative flex items-center gap-3">
                            <input
                                type="text"
                                placeholder="Tell me what's on your mind..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                disabled={isLoading}
                                className="flex-1 bg-slate-100 border-none focus:ring-2 focus:ring-brand-500 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all disabled:opacity-50"
                            />
                            <CustomButton
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="w-14 h-14 !rounded-2xl p-0 shadow-brand-200"
                            >
                                <Send className="w-6 h-6 ml-0.5" />
                            </CustomButton>
                        </div>
                        <p className="text-center text-xs text-slate-400 mt-4">
                            Pendo is an AI and can make mistakes. For crises, please contact a professional.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModerateRiskDashboard;
