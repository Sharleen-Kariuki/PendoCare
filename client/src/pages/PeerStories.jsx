import React from "react";
// // import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PeerStories = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-subtle py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/dashboard/low")}
          className="mb-8 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-brand-600 border border-slate-200 hover:border-brand-200 rounded-xl bg-white shadow-soft transition-all flex items-center gap-2"
        >
          ← Back to Resources
        </button>
        <div className="padlet-embed" style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 2, boxSizing: "border-box", overflow: "hidden", position: "relative", width: "100%", background: "#F4F4F4" }}>
          <iframe
            src="https://padlet.com/embed/d4mnom3og1e80eow"
            frameBorder="0"
            allow="camera;microphone;geolocation;display-capture;clipboard-write"
            style={{ width: "100%", height: 608, display: "block", padding: 0, margin: 0 }}
            title="Peer Stories"
          ></iframe>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "end", margin: 0, height: 28 }}>
            <a href="https://padlet.com?ref=embed" target="_blank" rel="noopener noreferrer">
              <img src="https://padlet.net/embeds/made_with_padlet_2022.png" width="114" height="28" alt="Made with Padlet" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerStories;