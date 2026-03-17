import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    getOrCreateConversation,
    sendMessage,
    subscribeToConversation,
    parseConversationLog
} from "../services/chatService";
import {
    ArrowLeft, Send, MoreVertical, Video,
    CheckCheck, User, ShieldCheck, Heart, Phone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ChatInterface = () => {
    const navigate = useNavigate();
    const studentCode = localStorage.getItem('user_name');
    const schoolName = localStorage.getItem('school_name') || 'Unknown School';

    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        let subscription = null;
        const initChat = async () => {
            if (!studentCode) { navigate('/login'); return; }
            try {
                const conv = await getOrCreateConversation(studentCode);
                if (conv) {
                    if (conv.risk_level === 'completed') {
                        localStorage.clear();
                        navigate('/login');
                        return;
                    }
                    setConversation(conv);
                    setMessages(parseConversationLog(conv.content));
                    subscription = subscribeToConversation(conv.id, (updatedConv) => {
                        if (updatedConv.risk_level === 'completed') {
                            alert("This support session has ended. You will be returned to the login page.");
                            localStorage.clear();
                            window.location.href = '/login';
                            return;
                        }
                        setConversation(updatedConv);
                        setMessages(parseConversationLog(updatedConv.content));
                    });
                }
            } catch (err) {
                console.error("Chat init failed", err);
            }
        };
        initChat();
        return () => { if (subscription) subscription.unsubscribe(); };
    }, [studentCode, navigate]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputText.trim() || !conversation) return;
        const text = inputText;
        setInputText("");
        setIsSending(true);
        try {
            await sendMessage(conversation.id, 'student', text);
        } catch (err) {
            console.error("Failed to send:", err);
            setInputText(text);
        } finally {
            setIsSending(false);
        }
    };

    const isCounsellorConnected = !!conversation?.counsellor_id;

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
            {/* Subtle background orbs */}
            <div className="absolute top-[-100px] left-[-80px] w-[300px] h-[300px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-80px] right-[-60px] w-[250px] h-[250px] bg-sky-500/4 rounded-full blur-[80px] pointer-events-none" />

            {/* ── Header ── */}
            <div className="relative z-20 sticky top-0 px-4 py-3 flex items-center gap-3"
                style={{
                    background: 'rgba(2, 6, 23, 0.85)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}>
                <button
                    onClick={() => navigate("/dashboard/high")}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                    <ArrowLeft size={18} />
                </button>

                <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                    <User size={20} />
                </div>

                <div className="flex-1">
                    <h1 className="font-display font-bold text-white text-base leading-tight">
                        {isCounsellorConnected ? "Counsellor Connected" : "Waiting for Counsellor..."}
                    </h1>
                    <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isCounsellorConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-pulse'}`} />
                        <p className="text-xs text-slate-500">
                            {isCounsellorConnected ? "Online" : "Connecting you to a professional..."}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate('/book-counselling')}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-brand-400 transition-colors"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                    >
                        <Video size={18} />
                    </button>
                    <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                        style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <Phone size={16} />
                    </button>
                </div>
            </div>

            {/* ── Chat Area ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 relative z-10">
                {/* Encryption Notice */}
                <div className="flex justify-center mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs"
                        style={{
                            background: 'rgba(13,148,136,0.08)',
                            border: '1px solid rgba(94,234,212,0.1)',
                            color: '#5eead4',
                        }}>
                        <ShieldCheck size={12} />
                        <span>Messages are end-to-end encrypted</span>
                        {conversation?.risk_level === 'high' && (
                            <span className="text-red-400 font-bold ml-1">• High Priority</span>
                        )}
                    </div>
                </div>

                {/* Messages */}
                <AnimatePresence>
                    {messages.map((msg, idx) => {
                        const isMe = msg.role === 'student';
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.97, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className={`flex ${isMe ? "justify-end" : "justify-start"} mb-1`}
                            >
                                <div
                                    className={`relative max-w-[80%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed break-words ${isMe ? 'rounded-br-sm' : 'rounded-bl-sm'
                                        }`}
                                    style={{
                                        background: isMe
                                            ? 'rgba(13, 148, 136, 0.3)'
                                            : 'rgba(255, 255, 255, 0.06)',
                                        border: `1px solid ${isMe
                                            ? 'rgba(94, 234, 212, 0.15)'
                                            : 'rgba(255, 255, 255, 0.08)'
                                            }`,
                                        color: isMe ? '#ccfbf1' : '#cbd5e1',
                                    }}
                                >
                                    <p>{msg.text}</p>
                                    <div className="flex justify-end items-center gap-1.5 mt-1">
                                        <span className="text-[10px] text-slate-500 font-medium">
                                            {typeof msg.timestamp === 'string' && msg.timestamp.includes('T')
                                                ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                : "Just now"
                                            }
                                        </span>
                                        {isMe && <CheckCheck size={13} className="text-brand-400" />}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* ── Input Area ── */}
            <div className="relative z-20 px-3 py-3"
                style={{
                    background: 'rgba(2, 6, 23, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                }}>
                <div className="flex items-end gap-2">
                    <div className="flex-1 rounded-2xl px-4 py-3 flex items-center"
                        style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            className="flex-1 bg-transparent border-none outline-none resize-none max-h-24 py-0.5 text-white placeholder:text-slate-600 text-[15px]"
                            placeholder="Type a message"
                            rows={1}
                            style={{ minHeight: '24px' }}
                            disabled={isSending}
                        />
                    </div>
                    <button
                        onClick={inputText.trim() ? handleSendMessage : null}
                        disabled={isSending}
                        className="btn-glass !w-12 !h-12 !p-0 !rounded-xl"
                    >
                        <Send size={18} className="ml-0.5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
