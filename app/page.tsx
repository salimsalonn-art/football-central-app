'use client';

import { useState, useEffect } from "react";
import { initAnalytics } from "@/lib/firebase";
import GuessThePlayer from "./components/GuessThePlayer";
import StatsTrivia from "./components/StatsTrivia";
import { Analytics } from "@vercel/analytics/react"; // 1. Added Vercel Analytics Import

export default function Home() {
  // Master Navigation State
  const [activeTab, setActiveTab] = useState("trivia");

  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900 text-white font-sans relative">
      
      {/* App Header */}
      <div className="w-full max-w-md py-6 text-center">
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight">
          FOOTBALL CENTRAL
        </h1>
      </div>

      {/* Professional Segmented Control Tabs (Now with 3 Items) */}
      <div className="w-full max-w-md bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex gap-1 mb-6 shadow-xl relative z-10">
        <button 
          onClick={() => setActiveTab("trivia")}
          className={`flex-1 py-3 px-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 ${
            activeTab === "trivia" 
              ? "bg-emerald-500 text-slate-950 shadow-[0_4px_20px_-4px_rgba(16,185,129,0.5)]" 
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <span>🧠</span> Trivia
        </button>
        <button 
          onClick={() => setActiveTab("guess")}
          className={`flex-1 py-3 px-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 ${
            activeTab === "guess" 
              ? "bg-emerald-500 text-slate-950 shadow-[0_4px_20px_-4px_rgba(16,185,129,0.5)]" 
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <span>👤</span> Guess
        </button>
        <button 
          onClick={() => setActiveTab("download")}
          className={`flex-1 py-3 px-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 ${
            activeTab === "download" 
              ? "bg-emerald-500 text-slate-950 shadow-[0_4px_20px_-4px_rgba(16,185,129,0.5)]" 
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <span>📱</span> Get App
        </button>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-md flex flex-col items-center flex-1">
        
        {/* Render Trivia Game Tab */}
        {activeTab === "trivia" && <StatsTrivia setActiveTab={setActiveTab} />}

        {/* Render Guess The Player Tab */}
        {activeTab === "guess" && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 mt-4">
            <GuessThePlayer setActiveTab={setActiveTab} />
          </div>
        )}

        {/* ===================== NEW DOWNLOAD APP TAB ===================== */}
        {activeTab === "download" && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 mt-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
              <div className="text-6xl mb-2 animate-bounce">⚽</div>
              
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight">
                FOOTBALL ALBUM
              </h2>
              
              <p className="text-slate-400 leading-relaxed text-sm">
                Take your tactical knowledge to the next level. Download our official native application to unlock full album collections, dynamic card packs, offline modes, and global leaderboards.
              </p>
              
              <div className="space-y-3 pt-4">
                {/* iOS Download Link */}
                <button 
                  onClick={() => window.open('https://apps.apple.com/us/app/football-album-trivia-game/id6766404213', '_blank')}
                  className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-3 shadow-lg"
                >
                  <span className="text-xl">🍏</span> Download on App Store
                </button>
                
                {/* Android Download Link */}
                <button 
                  onClick={() => window.open('https://play.google.com/store/apps/details?id=com.footballalbum.play&pcampaignid=web_share', '_blank')}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-3"
                >
                  <span className="text-xl">🤖</span> Get it on Google Play
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
      
      {/* 2. Added the Analytics Component at the bottom */}
      <Analytics />
    </main>
  );
}