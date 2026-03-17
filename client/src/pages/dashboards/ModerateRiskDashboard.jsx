import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Send, Bot, User, Heart, Sparkles } from "lucide-react";
import { getChatbotResponse } from "../../services/geminiService";

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
            let history = messages.map(msg => ({
                role: msg.sender === "user" ? "user" : "model",
                parts: [{ text: msg.text }]
            }));

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
                { sender: "bot", text: "I'm having trouble connecting right now. Please try again shortly." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden flex flex-col">
            {/* Background */}
            <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-brand-500/6 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[-100px] right-[-80px] w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Name Prompt Overlay */}
            {showNamePrompt && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    style={{ background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(10px)' }}>
                    <div className="rounded-3xl p-8 max-w-sm w-full relative overflow-hidden"
                        style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(20px)',
                        }}>
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-[50px] pointer-events-none" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-brand-500/25">
                                <Bot size={28} />
                            </div>
                            <h2 className="font-display text-2xl font-bold text-white mb-2">Welcome to PendoPal!</h2>
                            <p className="text-slate-400 mb-6">Before we start, what's your name? I'd love to know who I'm chatting with.</p>
                            <input
                                type="text"
                                placeholder="Your name"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                                className="w-full rounded-2xl px-6 py-4 outline-none transition-all mb-4 font-semibold text-white placeholder:text-slate-600"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                }}
                                autoFocus
                            />
                            <button onClick={handleSaveName} disabled={!tempName.trim()} className="btn-glass w-full !py-4 !rounded-2xl font-bold disabled:opacity-30">
                                <Sparkles size={18} />
                                Let's Chat
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto flex flex-col h-screen py-6 px-4 relative z-10 w-full">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-4">
                    <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-sm font-medium">
                        <ArrowLeft size={16} />
                        Home
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg flex items-center justify-center text-white">
                            <Bot size={16} />
                        </div>
                        <span className="font-display font-bold text-white text-sm">Pendo AI</span>
                    </div>
                    <button
                        onClick={() => navigate("/book-counselling")}
                        className="text-sm font-semibold px-4 py-2 rounded-xl transition-all text-brand-300 hover:text-brand-200"
                        style={{
                            background: 'rgba(13, 148, 136, 0.1)',
                            border: '1px solid rgba(94, 234, 212, 0.15)',
                        }}
                    >
                        Talk to a Professional
                    </button>
                </div>

                {/* Chat Container */}
                <div className="flex-1 rounded-3xl overflow-hidden flex flex-col"
                    style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}>

                    {/* Chat Header */}
                    <div className="p-5 flex items-center justify-between"
                        style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                                <MessageCircle size={22} />
                            </div>
                            <div>
                                <h2 className="text-lg font-display font-bold text-white">{studentName ? `Hi ${studentName}!` : "PendoPal"}</h2>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                    <span className="text-xs font-medium text-slate-500">Always here to listen</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleEndChat}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                            style={{
                                color: '#fca5a5',
                                background: 'rgba(239, 68, 68, 0.08)',
                                border: '1px solid rgba(239, 68, 68, 0.15)',
                            }}
                        >
                            End Chat
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`flex gap-3 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === "user"
                                            ? 'bg-white/10 text-slate-400'
                                            : 'bg-gradient-to-br from-brand-400 to-brand-600 text-white'
                                        }`}>
                                        {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                                    </div>
                                    <div
                                        className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed ${msg.sender === "user"
                                                ? 'rounded-tr-sm text-white'
                                                : 'rounded-tl-sm text-slate-200'
                                            }`}
                                        style={{
                                            background: msg.sender === "user"
                                                ? 'rgba(13, 148, 136, 0.35)'
                                                : 'rgba(255, 255, 255, 0.06)',
                                            border: `1px solid ${msg.sender === "user"
                                                ? 'rgba(94, 234, 212, 0.2)'
                                                : 'rgba(255, 255, 255, 0.08)'
                                                }`,
                                        }}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white flex items-center justify-center">
                                        <Bot size={14} />
                                    </div>
                                    <div className="px-5 py-3.5 rounded-2xl rounded-tl-sm flex gap-1.5 items-center"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.06)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                        }}>
                                        <span className="w-2 h-2 bg-brand-400/60 rounded-full animate-bounce" />
                                        <span className="w-2 h-2 bg-brand-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                                        <span className="w-2 h-2 bg-brand-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                placeholder="Tell me what's on your mind..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                disabled={isLoading}
                                className="flex-1 rounded-2xl px-6 py-4 outline-none transition-all text-white placeholder:text-slate-600 disabled:opacity-50"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                }}
                                onFocus={(e) => { e.target.style.borderColor = 'rgba(94, 234, 212, 0.3)'; }}
                                onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="btn-glass !w-14 !h-14 !p-0 !rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <Send size={20} className="ml-0.5" />
                            </button>
                        </div>
                        <p className="text-center text-xs text-slate-600 mt-3">
                            Pendo is an AI and can make mistakes. For crises, please contact a professional.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModerateRiskDashboard;
