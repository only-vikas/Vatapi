"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { PhaseProgressBanner } from "@/components/PhaseProgressBanner";
import { Phase1HeritageWatch } from "@/components/phases/Phase1HeritageWatch";
import { Phase2SmartHeritage } from "@/components/phases/Phase2SmartHeritage";
import { Phase3Mobility } from "@/components/phases/Phase3Mobility";
import { Phase4InclusiveGrowth } from "@/components/phases/Phase4InclusiveGrowth";
import { Phase5Sustainability } from "@/components/phases/Phase5Sustainability";
import { Phase6Accessibility } from "@/components/phases/Phase6Accessibility";
import { ReportIssueModal } from "@/components/ReportIssueModal";
import { IssueReport, INITIAL_HERITAGE_ISSUES } from "@/lib/data/heritage-watch";
import {
  FileText,
  ScanEye,
  Bus,
  Shirt,
  Droplets,
  Accessibility,
  ArrowRight,
  ShieldCheck,
  Building,
  Sparkles,
  BookOpen,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function HomePage() {
  const [activePhase, setActivePhase] = useState<number | null>(null); // null = Master Platform Overview
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [issues, setIssues] = useState<IssueReport[]>(INITIAL_HERITAGE_ISSUES);

  // Handler when a defect is escalated from Phase 2 (Health Check) directly into the Ledger
  const handleEscalateFromHealthCheck = (
    defectSummary: string,
    monumentName: string,
    directIssue?: IssueReport
  ) => {
    if (directIssue) {
      setIssues((prev) => [directIssue, ...prev]);
      setActivePhase(1); // Jump to Heritage Watch to show the new ledger ticket
    } else {
      setActivePhase(1); // Jump to Heritage Watch
      setIsReportModalOpen(true);
    }
  };

  const handleIssueCreated = (newIssue: IssueReport) => {
    setIssues((prev) => [newIssue, ...prev]);
    setActivePhase(1);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 flex flex-col font-sans antialiased selection:bg-amber-200">
      {/* 3-Zone Clean Header */}
      <Header
        activePhase={activePhase}
        setActivePhase={setActivePhase}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        language={language}
        setLanguage={setLanguage}
      />

      {/* 6-Phase Interactive Tracker */}
      <PhaseProgressBanner
        activePhase={activePhase}
        setActivePhase={setActivePhase}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activePhase === null ? (
          /* MASTER PLATFORM OVERVIEW */
          <div className="space-y-12">
            {/* Curatorial Hero Section */}
            <div className="relative bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-stone-100 rounded-xl p-6 sm:p-10 lg:p-12 overflow-hidden border border-stone-800 shadow-sm">
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-amber-400">
                  <span>Bagalkote Smart Heritage & Civic Tourism Platform</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-amber-50 leading-tight">
                  One Unified Platform.
                  <br />
                  <span className="italic font-normal text-amber-300">
                    One Public Accountability Ledger.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans max-w-2xl">
                  Named after the ancient capital <strong>Vatapi</strong> (modern Badami). Rather than isolated apps, every feature—from sandstone crack diagnostics and transit pooling to weaver direct-sales and drought lake monitoring—feeds directly into a single public issue ledger, driving resolution across government, community CSR, and PPP investor channels.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActivePhase(1)}
                    className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded shadow-sm transition-all"
                  >
                    <span>Explore Phase 01: Heritage Watch Ledger</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-amber-200 border border-stone-700 font-medium text-xs sm:text-sm px-4 py-2.5 rounded transition-all"
                  >
                    <span>File an Issue (AI Triage)</span>
                  </button>
                </div>
              </div>

              {/* Decorative Subtle Sandstone Pattern Accent */}
              <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
                <div className="w-full h-full border-l border-amber-500/20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>
            </div>

            {/* Strategic Highlights: The 6 Sequential Phases */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-stone-200 pb-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                  The Six Platform Phases
                </h2>
                <span className="text-xs text-stone-500">
                  Click any phase card to inspect its module
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Phase 1 Card */}
                <div
                  onClick={() => setActivePhase(1)}
                  className="bg-white border border-stone-200 rounded-lg p-5 space-y-3 cursor-pointer hover:border-amber-700/60 hover:shadow-xs transition-all group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-amber-800 font-semibold uppercase">
                      Phase 01 · Backbone
                    </span>
                    <FileText className="w-4 h-4 text-stone-400 group-hover:text-amber-800 transition-colors" />
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-base group-hover:text-amber-900 transition-colors">
                    Heritage Watch: Public Ledger & AI Triage
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Addresses Aihole&apos;s ~942 families living near 122 monuments and ASI Dharwad Circle&apos;s 45% staff vacancy. Routes issues into Government, Community/CSR (Hampi JSW model), or Investor PPP lanes.
                  </p>
                  <div className="text-[11px] text-amber-800 font-medium flex items-center gap-1 pt-1">
                    <span>Inspect Public Grievances</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Phase 2 Card */}
                <div
                  onClick={() => setActivePhase(2)}
                  className="bg-white border border-stone-200 rounded-lg p-5 space-y-3 cursor-pointer hover:border-amber-700/60 hover:shadow-xs transition-all group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-amber-800 font-semibold uppercase">
                      Phase 02 · Smart Tech
                    </span>
                    <ScanEye className="w-4 h-4 text-stone-400 group-hover:text-amber-800 transition-colors" />
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-base group-hover:text-amber-900 transition-colors">
                    Heritage Health Check & Vatapi Voice
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Deep learning crack morphology and biological patina analysis. Epigraphical lens on Cave 3&apos;s 578 CE Old Kannada inscription and Bhashini-inspired multilingual speech translation.
                  </p>
                  <div className="text-[11px] text-amber-800 font-medium flex items-center gap-1 pt-1">
                    <span>Launch Diagnostics & Voice</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Phase 3 Card */}
                <div
                  onClick={() => setActivePhase(3)}
                  className="bg-white border border-stone-200 rounded-lg p-5 space-y-3 cursor-pointer hover:border-amber-700/60 hover:shadow-xs transition-all group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-amber-800 font-semibold uppercase">
                      Phase 03 · Mobility
                    </span>
                    <Bus className="w-4 h-4 text-stone-400 group-hover:text-amber-800 transition-colors" />
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-base group-hover:text-amber-900 transition-colors">
                    Circuit Planner & Shared Tempo Pooling
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Bridges the critical Pattadakal–Aihole transit gap (only 2–3 buses daily). Features transparent auto fare estimator and real-time seat pooling to meet KSTDC 8 AM tempo thresholds.
                  </p>
                  <div className="text-[11px] text-amber-800 font-medium flex items-center gap-1 pt-1">
                    <span>Calculate Fares & Join Rides</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Phase 4 Card */}
                <div
                  onClick={() => setActivePhase(4)}
                  className="bg-white border border-stone-200 rounded-lg p-5 space-y-3 cursor-pointer hover:border-amber-700/60 hover:shadow-xs transition-all group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-amber-800 font-semibold uppercase">
                      Phase 04 · Inclusive Growth
                    </span>
                    <Shirt className="w-4 h-4 text-stone-400 group-hover:text-amber-800 transition-colors" />
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-base group-hover:text-amber-900 transition-colors">
                    Weaver-to-Traveller & Ooru Oota Meals
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Guledgudda Khana pit-loom bookings backed by a 2025 *Textile* study. AI motif design assistant and verified directory of women-led SHG Khanavalis (Jolada rotti, Ennegai) with zero hallucinations.
                  </p>
                  <div className="text-[11px] text-amber-800 font-medium flex items-center gap-1 pt-1">
                    <span>Meet Weavers & Taste Village Food</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Phase 5 Card */}
                <div
                  onClick={() => setActivePhase(5)}
                  className="bg-white border border-stone-200 rounded-lg p-5 space-y-3 cursor-pointer hover:border-amber-700/60 hover:shadow-xs transition-all group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-amber-800 font-semibold uppercase">
                      Phase 05 · Sustainability
                    </span>
                    <Droplets className="w-4 h-4 text-stone-400 group-hover:text-amber-800 transition-colors" />
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-base group-hover:text-amber-900 transition-colors">
                    Agastya Water-Smart & Clean Trail
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Addresses the official Sept 17, 2026 Bagalkote drought declaration (89% rainfall deficit). 7th-century Agastya lake water monitoring, dedicated civic laundry platform, and crowd dispersal models.
                  </p>
                  <div className="text-[11px] text-amber-800 font-medium flex items-center gap-1 pt-1">
                    <span>View Drought Telemetry & Trails</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Phase 6 Card */}
                <div
                  onClick={() => setActivePhase(6)}
                  className="bg-white border border-stone-200 rounded-lg p-5 space-y-3 cursor-pointer hover:border-amber-700/60 hover:shadow-xs transition-all group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-amber-800 font-semibold uppercase">
                      Phase 06 · Universal Access
                    </span>
                    <Accessibility className="w-4 h-4 text-stone-400 group-hover:text-amber-800 transition-colors" />
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-base group-hover:text-amber-900 transition-colors">
                    Access Mode & District Executive Desk
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Virtual 360° cave walkthrough for seniors and wheelchair users unable to climb the rock steps. Profile-tailored routes and unified open governance metrics for District Administration.
                  </p>
                  <div className="text-[11px] text-amber-800 font-medium flex items-center gap-1 pt-1">
                    <span>Experience Virtual Tour & Governance</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Link to Deep Spine: Phase 1 Ledger Preview */}
            <div className="pt-6 border-t border-stone-200 space-y-6">
              <Phase1HeritageWatch
                onOpenReportModal={() => setIsReportModalOpen(true)}
                issues={issues}
                setIssues={setIssues}
              />
            </div>
          </div>
        ) : (
          /* SPECIFIC PHASE VIEW (Phase 1 through 6) */
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <button
                onClick={() => setActivePhase(null)}
                className="text-xs text-stone-500 hover:text-stone-900 font-medium flex items-center gap-1"
              >
                <span>← Back to Master Overview</span>
              </button>
              <div className="text-xs font-mono text-stone-500">
                Phase {activePhase} of 6 Active
              </div>
            </div>

            {activePhase === 1 && (
              <Phase1HeritageWatch
                onOpenReportModal={() => setIsReportModalOpen(true)}
                issues={issues}
                setIssues={setIssues}
              />
            )}
            {activePhase === 2 && (
              <Phase2SmartHeritage
                onEscalateToLedger={handleEscalateFromHealthCheck}
              />
            )}
            {activePhase === 3 && <Phase3Mobility />}
            {activePhase === 4 && <Phase4InclusiveGrowth />}
            {activePhase === 5 && (
              <Phase5Sustainability
                onEscalateToLedger={handleEscalateFromHealthCheck}
              />
            )}
            {activePhase === 6 && <Phase6Accessibility />}
          </div>
        )}
      </main>

      {/* Global Report Defect Modal */}
      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onIssueCreated={handleIssueCreated}
        existingIssues={issues}
      />

      {/* Footnote & Scholarly Transparency Ribbon */}
      <footer className="bg-stone-900 border-t border-stone-800 text-stone-400 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <span className="font-serif font-bold text-stone-100 text-sm">
                Vatapi Heritage Platform
              </span>
              <span className="text-stone-500 ml-2">
                Bagalkote District Cultural Tourism & Public Governance
              </span>
            </div>
            <div className="text-[11px] text-stone-400">
              Taluks: Badami · Hungund · Guledgudda · Bilagi · Jamkhandi · Mudhol
            </div>
          </div>

          <div className="text-[11px] leading-relaxed text-stone-500 space-y-1">
            <p>
              <strong>Academic & Journal References:</strong> Crack detection and crowd-sensing methodologies referenced from <em>ACM Journal on Computing and Cultural Heritage (2023)</em> and <em>Heritage Science (2022)</em>. Handloom weaver socioeconomic analysis referenced from <em>Textile: Cloth and Culture (Peer-Reviewed, 2025)</em>.
            </p>
            <p>
              <strong>Administrative Accuracy:</strong> Bagalkote District drought status dated 17 September 2026. MLA representation reflects Badami (B. B. Chimmanakatti) and Hungund (Vijayanand Kashappanavar); MP representation reflects Bagalkot Lok Sabha (P. C. Gaddigoudar, 2024). All operational telemetry data is transparently flagged as sample prototype data.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
