import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Heart, Users } from "lucide-react";

const PeerStories = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-brand-500/6 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-80px] w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/dashboard/low" className="flex items-center gap-2 text-slate-500 hover:text-brand-400 transition-colors text-sm font-medium">
            <ArrowLeft size={16} />
            Back to Resources
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-brand-600 rounded-lg flex items-center justify-center text-white">
              <Heart size={16} fill="currentColor" />
            </div>
            <span className="font-display font-bold text-white text-sm">PendoCare</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{
              background: 'rgba(13, 148, 136, 0.1)',
              border: '1px solid rgba(94, 234, 212, 0.15)',
            }}>
            <Users size={14} className="text-brand-400" />
            <span className="text-sm font-medium text-brand-300">Community</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Peer Stories</h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Real, anonymous stories from students who've navigated similar challenges. You are not alone.
          </p>
        </div>

        {/* Padlet iframe in glass card */}
        <div className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}>
          <iframe
            src="https://padlet.com/embed/d4mnom3og1e80eow"
            frameBorder="0"
            allow="camera;microphone;geolocation;display-capture;clipboard-write"
            style={{ width: "100%", height: 620, display: "block", padding: 0, margin: 0, borderRadius: '24px 24px 0 0' }}
            title="Peer Stories"
          />
          <div className="flex items-center justify-end px-4 py-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <a href="https://padlet.com?ref=embed" target="_blank" rel="noopener noreferrer">
              <img src="https://padlet.net/embeds/made_with_padlet_2022.png" width="114" height="28" alt="Made with Padlet" style={{ opacity: 0.5 }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerStories;