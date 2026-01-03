import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
    ArrowLeft, Paperclip, Mic, Send, MoreVertical, Phone, Video,
    Check, CheckCheck, User, Clock, ShieldAlert
} from "lucide-react";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

const SOCKET_URL = import.meta.env.VITE_API_URL;

// socket instance
const socket = io(SOCKET_URL, {
  path: "/socket.io",
  transports: ["websocket"]
});

socket.on("connect", () => console.log("Connected ✅ on student side"));

const ChatInterface = () => {
    const navigate = useNavigate();
    const studentName = localStorage.getItem('user_name') || 'Student';
    const schoolName = localStorage.getItem('school_name') || 'Unknown School';
    const STUDENT_ID = studentName.toLowerCase().replace(/\s+/g, '_');

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [counselor, setCounselor] = useState(null);
    const messagesEndRef = useRef(null);

    const [roomId] = useState(`room_${STUDENT_ID}`);

    // 1. Connect and Join Room
    useEffect(() => {
        const handleConnect = () => {
            console.log("[Student] Connected/Reconnected, joining room:", roomId);
            socket.emit("join_room", roomId);
        };

        // Initial join
        socket.emit("join_room", roomId);
        setIsConnected(true);

        // Alert counselor with school info
        socket.emit("request_counselor", {
            studentId: studentName,
            roomId,
            schoolName
        });

        socket.on("connect", handleConnect);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("join_room");
        };
    }, [roomId, studentName, schoolName]);

    // 2. Listen for Incoming Messages & Counselor Joining
    useEffect(() => {
        const handleReceiveMessage = (data) => {
            // Only add if it's for this specific room AND not from self
            if (data.room === roomId && data.senderId !== STUDENT_ID) {
                setMessages((prev) => [...prev, data]);
            }
        };

        socket.on("receive_message", handleReceiveMessage);

        socket.on("counselor_joined", (counselorData) => {
            setCounselor(counselorData);
            // System message
            setMessages((prev) => [...prev, {
                id: Date.now(),
                type: 'system',
                text: `${counselorData.name} has joined the chat.`
            }]);
        });

        return () => {
            socket.off("receive_message", handleReceiveMessage);
            socket.off("counselor_joined");
        };
    }, [roomId, STUDENT_ID]);

    // 3. Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e?.preventDefault();
        if (!inputText.trim()) return;

        const newMessage = {
            room: roomId,
            text: inputText,
            senderId: STUDENT_ID,
            role: 'student',
            timestamp: new Date().toISOString(),
        };

        // Optimistic Update
        setMessages((prev) => [...prev, newMessage]);

        // Send to Socket
        socket.emit("send_message", newMessage);

        // Save to DB
        try {
            await api.post('/chat/save', newMessage);
        } catch (err) {
            console.error("Failed to save message", err);
        }

        setInputText("");
    };

    return (
        <div className="min-h-screen bg-[#E5DDD5] flex flex-col relative overflow-hidden">
            {/* WhatsApp-style Background Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat"></div>

            {/* Header */}
            <div className="bg-[#008069] text-white px-4 py-3 flex items-center shadow-md z-10 sticky top-0">
                <button onClick={() => navigate("/dashboard/high")} className="mr-2 rounded-full p-1 hover:bg-white/10 transition">
                    <ArrowLeft size={24} />
                </button>

                <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center overflow-hidden mr-3 border border-white/20">
                    {counselor ? (
                        <img src={`https://ui-avatars.com/api/?name=${counselor.name}&background=random`} alt="Counselor" />
                    ) : (
                        <User className="text-slate-500" />
                    )}
                </div>

                <div className="flex-1">
                    <h1 className="font-bold text-lg leading-tight">
                        {counselor ? counselor.name : "Waiting for Counselor..."}
                    </h1>
                    <p className="text-xs text-green-100 opacity-90 truncate">
                        {counselor ? "Online" : "Connecting you to a professional..."}
                    </p>
                </div>

                <div className="flex items-center gap-4 text-white/80">
                    <Video size={24} className="cursor-pointer hover:text-white" />
                    <Phone size={22} className="cursor-pointer hover:text-white" />
                    <MoreVertical size={22} className="cursor-pointer hover:text-white" />
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 z-10">

                {/* Security / Encryption Notice */}
                <div className="flex justify-center mb-6">
                    <div className="bg-[#FFF5C4] text-[#5E5151] text-xs px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 max-w-[85%] text-center">
                        <ShieldAlert size={12} className="shrink-0" />
                        <span>Messages and calls are end-to-end encrypted. No one outside of this chat, not even Pendo, can read or listen to them.</span>
                    </div>
                </div>

                {/* Messages */}
                <AnimatePresence>
                    {messages.map((msg, idx) => {
                        const isMe = msg.senderId === STUDENT_ID;
                        if (msg.type === 'system') {
                            return (
                                <div key={idx} className="flex justify-center my-2">
                                    <span className="bg-[#E1F3FB] text-slate-600 text-xs px-2 py-1 rounded-md shadow-sm border border-[#BEE2F3]">
                                        {msg.text}
                                    </span>
                                </div>
                            );
                        }

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`flex ${isMe ? "justify-end" : "justify-start"} mb-1`}
                            >
                                <div
                                    className={`relative max-w-[80%] px-3 py-1.5 rounded-lg shadow-sm text-[15px] leading-relaxed break-words ${isMe
                                        ? "bg-[#E7FFDB] text-slate-800 rounded-tr-none"
                                        : "bg-white text-slate-800 rounded-tl-none"
                                        }`}
                                >
                                    {/* Tail SVG Mockup (Simplified via CSS) */}
                                    {isMe ? (
                                        <div className="absolute top-0 -right-[8px] w-0 h-0 border-t-[10px] border-t-[#E7FFDB] border-r-[10px] border-r-transparent" />
                                    ) : (
                                        <div className="absolute top-0 -left-[8px] w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent" />
                                    )}

                                    <p>{msg.text}</p>

                                    <div className="flex justify-end items-center gap-1 mt-0.5">
                                        <span className="text-[10px] text-slate-500 font-medium">
                                            {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        {isMe && <CheckCheck size={14} className="text-[#53BDEB]" />}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-[#F0F2F5] p-2 flex items-end gap-2 z-20">
                <div className="bg-white flex-1 rounded-2xl flex items-center px-4 py-2 shadow-sm border border-slate-100">
                    <button className="text-slate-400 hover:text-slate-600 mr-3 transition-colors">
                        <Paperclip size={20} />
                    </button>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                        className="flex-1 bg-transparent border-none outline-none resize-none max-h-24 py-1 text-slate-800 placeholder:text-slate-400"
                        placeholder="Type a message"
                        rows={1}
                        style={{ minHeight: '24px' }}
                    />
                </div>

                <button
                    onClick={inputText.trim() ? handleSendMessage : null}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all ${inputText.trim()
                        ? "bg-[#008069] text-white hover:bg-[#006e5a] active:scale-95"
                        : "bg-[#008069] text-white hover:bg-[#006e5a]"
                        }`}
                >
                    {inputText.trim() ? <Send size={20} className="ml-0.5" /> : <Mic size={20} />}
                </button>
            </div>
        </div>
    );
};

export default ChatInterface;
