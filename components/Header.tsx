"use client";

import React from "react";
import { ShieldCheck, Plus, Landmark, Globe } from "lucide-react";

interface HeaderProps {
  activePhase: number | null; // null means 'all overview'
  setActivePhase: (phase: number | null) => void;
  onOpenReportModal: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePhase,
  setActivePhase,
  onOpenReportModal,
  language,
  setLanguage,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePhase(null)}
            className="text-left group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-amber-700 to-amber-900 border border-amber-600/40 flex items-center justify-center text-amber-200">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-xl tracking-tight font-medium text-amber-100 group-hover:text-amber-300 transition-colors">
                Vatapi
              </span>
              <span className="text-[10px] text-amber-400/80 uppercase tracking-widest block font-sans -mt-0.5">
                Bagalkote Heritage & Civic
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single line, clean typography) */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-medium">
          <button
            onClick={() => setActivePhase(null)}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activePhase === null
                ? "bg-stone-800 text-amber-200 font-semibold"
                : "text-stone-300 hover:text-white hover:bg-stone-800/60"
            }`}
          >
            Master Overview
          </button>
          <button
            onClick={() => setActivePhase(1)}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activePhase === 1
                ? "bg-amber-900/60 text-amber-200 border border-amber-700/50"
                : "text-stone-300 hover:text-white hover:bg-stone-800/60"
            }`}
          >
            Phase 1: Heritage Watch
          </button>
          <button
            onClick={() => setActivePhase(2)}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activePhase === 2
                ? "bg-amber-900/60 text-amber-200 border border-amber-700/50"
                : "text-stone-300 hover:text-white hover:bg-stone-800/60"
            }`}
          >
            Phase 2: Health & Voice
          </button>
          <button
            onClick={() => setActivePhase(3)}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activePhase === 3
                ? "bg-amber-900/60 text-amber-200 border border-amber-700/50"
                : "text-stone-300 hover:text-white hover:bg-stone-800/60"
            }`}
          >
            Phase 3: Mobility Pool
          </button>
          <button
            onClick={() => setActivePhase(4)}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activePhase === 4
                ? "bg-amber-900/60 text-amber-200 border border-amber-700/50"
                : "text-stone-300 hover:text-white hover:bg-stone-800/60"
            }`}
          >
            Phase 4: Weavers & Food
          </button>
          <button
            onClick={() => setActivePhase(5)}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activePhase === 5
                ? "bg-amber-900/60 text-amber-200 border border-amber-700/50"
                : "text-stone-300 hover:text-white hover:bg-stone-800/60"
            }`}
          >
            Phase 5: Water & Crowds
          </button>
          <button
            onClick={() => setActivePhase(6)}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activePhase === 6
                ? "bg-amber-900/60 text-amber-200 border border-amber-700/50"
                : "text-stone-300 hover:text-white hover:bg-stone-800/60"
            }`}
          >
            Phase 6: Access & Governance
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="relative flex items-center gap-1.5 bg-stone-800 border border-stone-700 rounded px-2 py-1 text-xs text-stone-300">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-stone-200 text-xs focus:outline-none cursor-pointer pr-1"
            >
              <option value="en" className="bg-stone-800 text-white">English</option>
              <option value="kn" className="bg-stone-800 text-white">ಕನ್ನಡ (Kannada)</option>
              <option value="mr" className="bg-stone-800 text-white">मराठी (Marathi)</option>
              <option value="hi" className="bg-stone-800 text-white">हिंदी (Hindi)</option>
            </select>
          </div>

          {/* Quick Grievance Report Button */}
          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 bg-amber-700 hover:bg-amber-600 active:scale-95 text-white font-medium text-xs px-3.5 py-1.5 rounded shadow-sm transition-all whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Report Grievance</span>
          </button>
        </div>
      </div>
    </header>
  );
};
