"use client";

import React from "react";
import {
  FileText,
  ScanEye,
  Bus,
  Shirt,
  Droplets,
  Accessibility,
  CheckCircle2,
  ChevronRight,
  Info
} from "lucide-react";

interface PhaseProgressBannerProps {
  activePhase: number | null;
  setActivePhase: (phase: number | null) => void;
}

export const PhaseProgressBanner: React.FC<PhaseProgressBannerProps> = ({
  activePhase,
  setActivePhase,
}) => {
  const phases = [
    {
      num: 1,
      name: "Heritage Watch",
      tagline: "Public Issue Ledger & AI Triage",
      icon: FileText,
      focus: "Aihole 942 families & ASI Dharwad routing",
    },
    {
      num: 2,
      name: "Health & Voice",
      tagline: "Vision Health Check & Bhashini Voice",
      icon: ScanEye,
      focus: "Cave 3 578 CE Inscription & Crack AI",
    },
    {
      num: 3,
      name: "Circuit Mobility",
      tagline: "Seat Pooling & Fair Auto Fares",
      icon: Bus,
      focus: "Pattadakal–Aihole transit gap fix",
    },
    {
      num: 4,
      name: "Inclusive Growth",
      tagline: "Guledgudda Weavers & Ooru Oota",
      icon: Shirt,
      focus: "2025 Textile study & verified village meals",
    },
    {
      num: 5,
      name: "Sustainability",
      tagline: "Agastya Water, Clean Trail & Crowds",
      icon: Droplets,
      focus: "Sept 2026 Bagalkot drought response",
    },
    {
      num: 6,
      name: "Universal Access",
      tagline: "Virtual Cave Tours & Governance Desk",
      icon: Accessibility,
      focus: "Debunking 2,000 steps & District DC desk",
    },
  ];

  return (
    <section className="bg-stone-900 border-b border-stone-800 text-stone-200 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Sub-bar & Research citation note */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-800/80 text-xs">
          <div className="flex items-center gap-2 text-stone-400">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-serif italic text-amber-200/90">
              6-Phase Architecture for Bagalkote District Cultural Tourism
            </span>
            <span className="hidden md:inline text-stone-600">|</span>
            <span className="hidden md:inline text-stone-400">
              Grounded in 2025/2026 peer-reviewed heritage and textile research
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[11px] text-stone-400 bg-stone-800/80 px-2 py-0.5 rounded border border-stone-700/60">
              <Info className="w-3 h-3 text-amber-400" />
              <span>Telemetry: Sample data transparently flagged</span>
            </div>
            {activePhase !== null && (
              <button
                onClick={() => setActivePhase(null)}
                className="text-amber-400 hover:text-amber-300 text-xs font-medium underline underline-offset-2"
              >
                View Full Platform
              </button>
            )}
          </div>
        </div>

        {/* Phase Pills Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {phases.map((p) => {
            const Icon = p.icon;
            const isActive = activePhase === p.num;
            return (
              <button
                key={p.num}
                onClick={() => setActivePhase(isActive ? null : p.num)}
                className={`text-left p-2.5 rounded transition-all border ${
                  isActive
                    ? "bg-amber-950/70 border-amber-500/80 text-white shadow-sm ring-1 ring-amber-500/40"
                    : "bg-stone-800/50 hover:bg-stone-800 border-stone-700/50 text-stone-300 hover:text-stone-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-amber-400/90 font-semibold">
                    Phase 0{p.num}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-300" : "text-stone-400"}`} />
                </div>
                <div className="font-serif text-xs font-semibold text-stone-100 truncate">
                  {p.name}
                </div>
                <div className="text-[10px] text-stone-400 truncate mt-0.5">
                  {p.focus}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
