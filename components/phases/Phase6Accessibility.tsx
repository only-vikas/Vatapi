"use client";

import React, { useState, useEffect } from "react";
import {
  ACCESSIBILITY_PROFILES,
  VIRTUAL_CAVE3_STOPS,
  CIVIC_EXECUTIVE_METRICS,
  AccessibilityProfile,
  VirtualWalkthroughStop,
} from "@/lib/data/accessibility";
import {
  Accessibility,
  Eye,
  Volume2,
  VolumeX,
  CheckCircle2,
  Compass,
  Building2,
  TrendingUp,
  FileSpreadsheet,
  AlertCircle,
  HelpCircle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  Maximize2,
  Award,
  Layers,
  ArrowRight,
  Printer,
  FileText,
  UserCheck,
  Baby,
  Smile,
  Zap,
} from "lucide-react";

export const Phase6Accessibility: React.FC = () => {
  // Master Tab State: 'virtual-cave' | 'profile-routes' | 'civic-executive'
  const [activeTab, setActiveTab] = useState<"virtual-cave" | "profile-routes" | "civic-executive">("virtual-cave");

  // ===================== TAB 1: 360° VIRTUAL WALKTHROUGH =====================
  const [activeStopIndex, setActiveStopIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "kn">("en");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number | null>(null);
  const [spatialViewAngle, setSpatialViewAngle] = useState<"Front Wall" | "Ceiling Up" | "Left Profile" | "Right Profile">("Front Wall");

  const currentStop = VIRTUAL_CAVE3_STOPS[activeStopIndex] || VIRTUAL_CAVE3_STOPS[0];

  // Audio Playback Simulation using SpeechSynthesis if available
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsPlayingAudio(!isPlayingAudio);
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToSpeak =
        selectedLanguage === "kn"
          ? currentStop.kannadaAudioTranscript
          : currentStop.audioTranscript;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  // ===================== TAB 2: PROFILE-BASED ROUTES =====================
  const [selectedProfileId, setSelectedProfileId] = useState<string>("wheelchair");
  const [isHighContrastMode, setIsHighContrastMode] = useState(false);
  const [accessiblePassGenerated, setAccessiblePassGenerated] = useState<any>(null);

  const currentProfile =
    ACCESSIBILITY_PROFILES.find((p) => p.id === selectedProfileId) ||
    ACCESSIBILITY_PROFILES[0];

  const handleGenerateAccessiblePass = () => {
    setAccessiblePassGenerated({
      id: `VTP-ACC-${Math.floor(1000 + Math.random() * 9000)}`,
      profileTitle: currentProfile.title,
      badge: currentProfile.badge,
      stepConstraint: currentProfile.stepCountConstraint,
      timestamp: "September 24, 2026",
    });
  };

  // ===================== TAB 3: CIVIC EXECUTIVE DASHBOARD =====================
  const [selectedLegislator, setSelectedLegislator] = useState<string>("B. B. Chimmanakatti");
  const [requisitionTopic, setRequisitionTopic] = useState<string>(
    "Construction of Dedicated Municipal Washing Deck & Greywater Filtration at Agastya Lake"
  );
  const [officialNoticeSlip, setOfficialNoticeSlip] = useState<any>(null);

  const handleGenerateRequisition = () => {
    setOfficialNoticeSlip({
      noticeId: `VTP-LEG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      legislator: selectedLegislator,
      constituency:
        selectedLegislator === "B. B. Chimmanakatti"
          ? "Badami Assembly Constituency"
          : selectedLegislator === "Vijayanand Kashappanavar"
          ? "Hungund Assembly Constituency"
          : "Bagalkote Lok Sabha Parliamentary Constituency",
      topic: requisitionTopic,
      priority: "Urgent Priority / Statutory SLA 14 Days",
      dateGenerated: "September 24, 2026",
    });
  };

  return (
    <div className={`space-y-8 ${isHighContrastMode ? "bg-black text-amber-300 p-4 rounded-xl" : ""}`}>
      {/* SECTION HEADER */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-stone-100 rounded-xl p-6 sm:p-8 shadow-sm relative overflow-hidden border border-stone-800">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-[11px] font-semibold tracking-wider uppercase border border-amber-500/30">
            <Accessibility className="w-3.5 h-3.5" />
            <span>Phase 06 · Universal Inclusion & Civic Governance</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
            Universal Access Mode & Civic Executive Dashboard
          </h2>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-3xl">
            The cliff-cut rock caves of Badami require climbing 320 steep, irregular sandstone stairs, rendering them inaccessible to wheelchair users and challenging for frail seniors. Vatapi ensures that physical barriers do not impede cultural immersion: non-climbers at the lower garden can explore a 360° spoken audio virtual sanctuary of Cave 3, while district leaders monitor open civic accountability metrics.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs border-t border-stone-700/60 font-mono">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Virtual Ground Access</span>
              <strong className="text-amber-300">Cave 3 360° Sanctuary</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Mobility Profiles</span>
              <strong className="text-emerald-400">4 Tailored Circuits</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Citizen Verification</span>
              <strong className="text-cyan-300">68% Photo Proof Resolved</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Elected Desk</span>
              <strong className="text-amber-300">3 Legislative Taluks</strong>
            </div>
          </div>
        </div>
      </div>

      {/* MASTER THREE-TAB NAVIGATION BAR */}
      <div className="flex border-b border-stone-300 bg-stone-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("virtual-cave")}
          className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-md transition-all flex items-center justify-center gap-2 ${
            activeTab === "virtual-cave"
              ? "bg-white text-stone-900 shadow-xs border border-stone-200"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
          }`}
        >
          <Volume2 className="w-4 h-4 text-amber-800" />
          <span>Cave 3 Virtual Sanctuary (Ground Access)</span>
        </button>

        <button
          onClick={() => setActiveTab("profile-routes")}
          className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-md transition-all flex items-center justify-center gap-2 ${
            activeTab === "profile-routes"
              ? "bg-white text-stone-900 shadow-xs border border-stone-200"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
          }`}
        >
          <Compass className="w-4 h-4 text-emerald-800" />
          <span>Profile-Based Accessible Circuits</span>
        </button>

        <button
          onClick={() => setActiveTab("civic-executive")}
          className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-md transition-all flex items-center justify-center gap-2 ${
            activeTab === "civic-executive"
              ? "bg-white text-stone-900 shadow-xs border border-stone-200"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
          }`}
        >
          <Building2 className="w-4 h-4 text-indigo-800" />
          <span>Civic Executive & Legislative Dashboard</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 360° VIRTUAL WALKTHROUGH FOR NON-CLIMBERS                          */}
      {/* ========================================================================= */}
      {activeTab === "virtual-cave" && (
        <div className="space-y-6">
          <div className="bg-stone-900 text-stone-100 rounded-xl p-6 sm:p-7 space-y-6 border border-stone-800 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[11px] font-semibold uppercase tracking-wider mb-1 border border-amber-500/30">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ground-Level Lower Garden Access Terminal</span>
                </div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-100">
                  Badami Cave 3: 360° Spoken Audio Virtual Sanctuary (578 CE)
                </h3>
                <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
                  Engineered specifically for wheelchair users and frail seniors resting in the shaded lower garden plaza. Inspect the 10-foot Trivikrama, celestial ceiling medallions, and the Mangalesha pillar inscription without climbing a single cliff step.
                </p>
              </div>

              {/* Language Switcher & Spatial Angle */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="bg-stone-800 p-1 rounded-lg border border-stone-700 flex items-center gap-1 text-xs">
                  <button
                    onClick={() => {
                      setSelectedLanguage("en");
                      if (isPlayingAudio) handleToggleSpeech();
                    }}
                    className={`px-2.5 py-1 rounded font-medium ${
                      selectedLanguage === "en" ? "bg-amber-800 text-white" : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLanguage("kn");
                      if (isPlayingAudio) handleToggleSpeech();
                    }}
                    className={`px-2.5 py-1 rounded font-medium ${
                      selectedLanguage === "kn" ? "bg-amber-800 text-white" : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    ಕನ್ನಡ (Kannada)
                  </button>
                </div>
              </div>
            </div>

            {/* Stop Selector Strip */}
            <div className="flex flex-wrap gap-2 text-xs">
              {VIRTUAL_CAVE3_STOPS.map((stop, idx) => (
                <button
                  key={stop.id}
                  onClick={() => {
                    setActiveStopIndex(idx);
                    setActiveHotspotIndex(null);
                    if (isPlayingAudio) handleToggleSpeech();
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                    activeStopIndex === idx
                      ? "bg-amber-800 text-white shadow-xs border border-amber-600 font-semibold"
                      : "bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700"
                  }`}
                >
                  <span className="font-mono text-amber-300 text-[10px]">0{idx + 1}</span>
                  <span>{stop.title.split("(")[0]}</span>
                </button>
              ))}
            </div>

            {/* 360° Panoramic Spatial Simulator Canvas */}
            <div className="relative bg-gradient-to-b from-stone-950 via-stone-900 to-black rounded-xl p-6 border border-stone-700 overflow-hidden space-y-4 min-h-[300px] flex flex-col justify-between">
              {/* Top Spatial Orientation HUD */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-amber-400 text-[11px] uppercase tracking-wider">
                    Spatial Zone: {currentStop.zone}
                  </span>
                  <span className="text-stone-500">|</span>
                  <span className="text-stone-400 font-mono text-[11px]">{currentStop.dimensions}</span>
                </div>

                {/* Spatial View Angle Selector */}
                <div className="flex items-center gap-1 text-[11px]">
                  <span className="text-stone-500">Camera Angle:</span>
                  {(["Front Wall", "Ceiling Up", "Left Profile", "Right Profile"] as const).map((angle) => (
                    <button
                      key={angle}
                      onClick={() => setSpatialViewAngle(angle)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                        spatialViewAngle === angle ? "bg-amber-700 text-white" : "bg-stone-800 text-stone-400 hover:text-stone-200"
                      }`}
                    >
                      {angle}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Visual Representation with Hotspots */}
              <div className="relative py-6 px-4 bg-stone-950/60 rounded-lg border border-stone-800/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-serif font-bold text-amber-200 text-lg sm:text-xl">
                      {currentStop.title}
                    </h4>
                    <div className="text-xs text-stone-400 font-sans mt-0.5">
                      {currentStop.kannadaTitle} · Consecrated {currentStop.carvingPeriod}
                    </div>
                  </div>

                  {/* Audio Speech Button */}
                  <button
                    onClick={handleToggleSpeech}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-xs transition-all shadow-sm ${
                      isPlayingAudio
                        ? "bg-rose-700 hover:bg-rose-600 text-white animate-pulse"
                        : "bg-amber-700 hover:bg-amber-600 text-white"
                    }`}
                  >
                    {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span>{isPlayingAudio ? "Pause Narration" : "Listen to Spoken Audio"}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl">
                  {currentStop.description}
                </p>

                {/* Hotspot Markers to Click & Inspect Details */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wide block">
                    Interactive Carving Micro-Details (Click to inspect):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentStop.hotspots.map((h, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveHotspotIndex(activeHotspotIndex === i ? null : i)}
                        className={`px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
                          activeHotspotIndex === i
                            ? "bg-amber-400 text-stone-950 font-bold shadow-xs"
                            : "bg-stone-800 text-amber-200 hover:bg-stone-700 border border-stone-700"
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                        <span>{h.label}</span>
                      </button>
                    ))}
                  </div>

                  {activeHotspotIndex !== null && (
                    <div className="bg-amber-950/70 border border-amber-500/40 p-3 rounded-lg text-xs text-amber-100 space-y-1 mt-2 animate-fadeIn">
                      <strong className="text-amber-300 font-mono text-[11px] block uppercase">
                        Micro-Chisel Inspection: {currentStop.hotspots[activeHotspotIndex].label}
                      </strong>
                      <p className="text-stone-300 leading-relaxed">
                        {currentStop.hotspots[activeHotspotIndex].detail}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Spoken Narration Script Box */}
              <div className="bg-black/50 p-4 rounded-lg border border-stone-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono">
                  <span>Descriptive Audio Script:</span>
                  <span>{selectedLanguage === "kn" ? "ಕನ್ನಡ ಧ್ವನಿ ವಿವರಣೆ" : "English Narration"}</span>
                </div>
                <p className="italic text-stone-300 leading-relaxed">
                  &ldquo;{selectedLanguage === "kn" ? currentStop.kannadaAudioTranscript : currentStop.audioTranscript}&rdquo;
                </p>
              </div>

              {/* Tactile & Historical Context Footer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2 border-t border-stone-800">
                <div className="text-stone-400">
                  <strong className="text-stone-200 block text-[11px] uppercase font-mono mb-0.5">
                    Tactile & Spatial Description:
                  </strong>
                  <span>{currentStop.tactileDescription}</span>
                </div>
                <div className="text-stone-400">
                  <strong className="text-stone-200 block text-[11px] uppercase font-mono mb-0.5">
                    Historical Benchmark:
                  </strong>
                  <span>{currentStop.historicalSignificance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PROFILE-BASED ACCESSIBLE CIRCUITS                                  */}
      {/* ========================================================================= */}
      {activeTab === "profile-routes" && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-800" />
                  <h3 className="font-serif font-bold text-stone-900 text-lg">
                    Personalized Accessible Circuits & Terrain Profiles
                  </h3>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  Pre-screened routes matching visitor mobility, step tolerances, and resting amenities.
                </p>
              </div>

              {/* High Contrast UI Mode Toggle */}
              <button
                onClick={() => setIsHighContrastMode(!isHighContrastMode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                  isHighContrastMode
                    ? "bg-amber-400 text-black border border-amber-500"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isHighContrastMode ? "High-Contrast Active" : "Toggle High-Contrast Mode"}</span>
              </button>
            </div>

            {/* Profile Selection Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {ACCESSIBILITY_PROFILES.map((profile) => {
                const isSelected = selectedProfileId === profile.id;
                return (
                  <button
                    key={profile.id}
                    onClick={() => {
                      setSelectedProfileId(profile.id);
                      setAccessiblePassGenerated(null);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-stone-900 text-white border-stone-900 shadow-md ring-2 ring-amber-700"
                        : "bg-stone-50 text-stone-800 hover:bg-stone-100 border-stone-200"
                    }`}
                  >
                    <div>
                      <span className={`text-[10px] font-mono uppercase tracking-wider block font-bold ${
                        isSelected ? "text-amber-400" : "text-amber-800"
                      }`}>
                        {profile.badge}
                      </span>
                      <h4 className="font-serif font-bold text-sm mt-1">
                        {profile.title}
                      </h4>
                      <p className={`text-[11px] mt-1 line-clamp-2 ${
                        isSelected ? "text-stone-300" : "text-stone-500"
                      }`}>
                        {profile.targetAudience}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-200/50 mt-3 text-[10px] font-mono">
                      <span>Constraint: <strong>{profile.stepCountConstraint.split(".")[0]}</strong></span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Profile Full Plan */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-5 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-emerald-800 uppercase font-semibold">
                    Active Mobility Protocol: {currentProfile.badge}
                  </span>
                  <h4 className="font-serif font-bold text-stone-900 text-lg">
                    {currentProfile.title}
                  </h4>
                  <div className="text-xs text-stone-500 font-sans">
                    {currentProfile.kannadaTitle}
                  </div>
                </div>

                <button
                  onClick={handleGenerateAccessiblePass}
                  className="bg-amber-900 hover:bg-amber-800 text-white font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Generate Accessible Circuit Pass</span>
                </button>
              </div>

              {/* Accessible vs Inaccessible monuments */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5 space-y-1.5">
                  <span className="font-semibold text-emerald-950 font-serif block text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Recommended & Accessible Stops:</span>
                  </span>
                  <ul className="space-y-1 text-stone-700 text-xs">
                    {currentProfile.recommendedMonuments.map((m, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-700 font-bold">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50/70 border border-rose-200 rounded-lg p-3.5 space-y-1.5">
                  <span className="font-semibold text-rose-950 font-serif block text-sm flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-700" />
                    <span>Inaccessible Terrain / Avoid Stops:</span>
                  </span>
                  <ul className="space-y-1 text-stone-700 text-xs">
                    {currentProfile.inaccessibleMonuments.map((m, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-700 font-bold">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Hour-by-Hour Step-by-Step Itinerary */}
              <div className="space-y-3 pt-2">
                <span className="font-serif font-bold text-stone-900 text-sm block">
                  Curated Day Itinerary & Transit Guidance:
                </span>
                <div className="space-y-2">
                  {currentProfile.detailedItinerary.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3.5 rounded-lg border border-stone-200 space-y-1.5 text-xs hover:border-stone-300 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                            {step.time}
                          </span>
                          <strong className="text-stone-900 text-sm">{step.stopName}</strong>
                        </div>
                        <span className="font-mono text-emerald-800 font-semibold text-[11px]">
                          Steps to Climb: {step.stepCount} Steps
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-600">
                        <div><strong>Terrain:</strong> {step.terrainType}</div>
                        <div><strong>Restrooms:</strong> {step.restroomAccess}</div>
                        <div><strong>Transit Drop:</strong> {step.transitNote}</div>
                        <div className="text-amber-900 font-medium"><strong>Highlight:</strong> {step.highlight}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Precedent Citation */}
              <div className="bg-white p-3 rounded-lg border border-stone-200 text-[11px] text-stone-600 space-y-1">
                <strong className="text-stone-900 font-mono uppercase block text-[10px]">
                  Administrative Precedent:
                </strong>
                <p>{currentProfile.precedentCitation}</p>
              </div>

              {/* Generated Pass Slip */}
              {accessiblePassGenerated && (
                <div className="bg-emerald-100/70 border border-emerald-300 p-4 rounded-xl space-y-2 text-xs text-emerald-950 font-mono animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-emerald-300/80 pb-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <Award className="w-4 h-4 text-emerald-800" />
                      <span>Digital Accessible Pass Issued: {accessiblePassGenerated.id}</span>
                    </div>
                    <span className="text-[11px] bg-white px-2 py-0.5 rounded border border-emerald-300">
                      ASI Verified Token
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div>Profile: <strong>{accessiblePassGenerated.profileTitle}</strong></div>
                    <div>Badge: {accessiblePassGenerated.badge}</div>
                    <div>Max Steps Allowed: {accessiblePassGenerated.stepConstraint}</div>
                    <div>Valid Date: {accessiblePassGenerated.timestamp}</div>
                  </div>
                  <p className="text-[10px] text-emerald-800 pt-1 border-t border-emerald-200 font-sans">
                    Present this digital token at Pattadakal and Badami ticket kiosks to receive portable threshold ramp assistance and battery buggy dispatch.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: CIVIC EXECUTIVE & LEGISLATIVE DASHBOARD                            */}
      {/* ========================================================================= */}
      {activeTab === "civic-executive" && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-800" />
                  <h3 className="font-serif font-bold text-stone-900 text-lg">
                    Civic Executive & Legislative Oversight Dashboard
                  </h3>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  High-level governance dashboard tracking open civic issues across Badami, Hungund, and Guledgudda.
                </p>
              </div>

              <div className="text-xs font-mono text-stone-500">
                Official Constituency Oversight Portal
              </div>
            </div>

            {/* High-level KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-1">
                <span className="text-stone-400 text-[10px] uppercase font-mono block">Total Tracked Complaints</span>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 font-mono">
                  {CIVIC_EXECUTIVE_METRICS.totalIssuesTracked}
                </span>
                <span className="text-[11px] text-stone-500 block">Across 6 taluks</span>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-1">
                <span className="text-emerald-800 text-[10px] uppercase font-mono block font-semibold">
                  Photo Proof Compliance
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-900 font-mono">
                    {CIVIC_EXECUTIVE_METRICS.resolvedWithPhotoProofPct}%
                  </span>
                  <span className="text-[10px] text-emerald-700">Resolved</span>
                </div>
                <span className="text-[11px] text-emerald-800 block">{CIVIC_EXECUTIVE_METRICS.totalResolvedCount} Confirmed Closures</span>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-1">
                <span className="text-amber-800 text-[10px] uppercase font-mono block font-semibold">
                  Average SLA Countdown
                </span>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-950 font-mono">
                  {CIVIC_EXECUTIVE_METRICS.averageSlaCountdownDays} Days
                </span>
                <span className="text-[11px] text-amber-800 block">Mandatory 14-day target</span>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-1">
                <span className="text-stone-400 text-[10px] uppercase font-mono block">Active Open Queue</span>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 font-mono">
                  {CIVIC_EXECUTIVE_METRICS.activeOpenCount}
                </span>
                <span className="text-[11px] text-stone-500 block">In Review & Dispatched</span>
              </div>
            </div>

            {/* Three Resolution Lanes Distribution */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2">
                <span className="font-serif font-bold text-stone-900 text-sm">
                  Resolution Pipeline across the Three Strategic Lanes:
                </span>
                <span className="text-[11px] font-mono text-stone-500">
                  Triaged Automatically via Gemini (/api/gemini/triage)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-3.5 rounded-lg border border-stone-200 space-y-1.5">
                  <span className="font-serif font-bold text-stone-900 block text-xs">
                    1. Government Fix Lane
                  </span>
                  <div className="text-xl font-serif font-bold text-stone-900 font-mono">
                    {CIVIC_EXECUTIVE_METRICS.laneDistribution.governmentFixCount} Tickets ({CIVIC_EXECUTIVE_METRICS.laneDistribution.governmentFixPct}%)
                  </div>
                  <p className="text-[11px] text-stone-600">
                    ASI centrally protected monument repairs, highway transit routes, and public drinking water networks.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-stone-200 space-y-1.5">
                  <span className="font-serif font-bold text-amber-900 block text-xs">
                    2. Community / CSR Fix Lane
                  </span>
                  <div className="text-xl font-serif font-bold text-amber-900 font-mono">
                    {CIVIC_EXECUTIVE_METRICS.laneDistribution.communityCsrCount} Tickets ({CIVIC_EXECUTIVE_METRICS.laneDistribution.communityCsrPct}%)
                  </div>
                  <p className="text-[11px] text-stone-600">
                    &ldquo;Adopt this issue&rdquo; lane: JSW Foundation Hampi sanitation precedent, local degree college clean trails.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-stone-200 space-y-1.5">
                  <span className="font-serif font-bold text-emerald-900 block text-xs">
                    3. Investor PPP Opportunity Lane
                  </span>
                  <div className="text-xl font-serif font-bold text-emerald-900 font-mono">
                    {CIVIC_EXECUTIVE_METRICS.laneDistribution.investorPppCount} Tickets ({CIVIC_EXECUTIVE_METRICS.laneDistribution.investorPppPct}%)
                  </div>
                  <p className="text-[11px] text-stone-600">
                    Aggregates recurring tourist deficits into certified demand evidence for private capital (Aihole eco-cafes).
                  </p>
                </div>
              </div>
            </div>

            {/* Legislative Taluk Scorecard */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-stone-900 text-sm">
                Taluk Scorecard & Legislative Accountability:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {CIVIC_EXECUTIVE_METRICS.talukScorecard.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-stone-200 rounded-xl p-4 space-y-3 hover:border-indigo-300 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between border-b border-stone-100 pb-2">
                        <div>
                          <span className="text-[10px] font-mono text-stone-500 uppercase block">
                            {item.partyAffiliation}
                          </span>
                          <strong className="font-serif font-bold text-stone-900 text-sm block">
                            {item.mlaName}
                          </strong>
                          <span className="text-[11px] text-amber-900 font-medium">{item.taluk}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-stone-400 block uppercase">Resolution</span>
                          <span className="font-mono font-bold text-emerald-800 text-sm">{item.resolutionRatePct}%</span>
                        </div>
                      </div>

                      <div className="space-y-1 text-[11px] text-stone-600">
                        <div>Total Complaints: <strong className="text-stone-900 font-mono">{item.totalIssues}</strong></div>
                        <div>Resolved with Photos: <strong className="text-emerald-800 font-mono">{item.resolvedCount}</strong></div>
                      </div>

                      <div className="bg-stone-50 p-2.5 rounded border border-stone-100 text-[11px]">
                        <span className="text-[10px] font-mono text-stone-500 uppercase block font-semibold">
                          Top Citizen Demand:
                        </span>
                        <p className="text-stone-700 mt-0.5">{item.topUnmetDemand}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Parliamentary Overview */}
            <div className="bg-stone-900 text-stone-100 rounded-xl p-5 space-y-3 text-xs border border-stone-800">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold block">
                    Parliamentary Jurisdiction · Lok Sabha
                  </span>
                  <h4 className="font-serif font-bold text-white text-base">
                    MP {CIVIC_EXECUTIVE_METRICS.parliamentaryOverview.mpName} ({CIVIC_EXECUTIVE_METRICS.parliamentaryOverview.constituency})
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-stone-400">
                  Central Ministerial Escalations
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-300">
                <div className="bg-stone-800/80 p-3 rounded-lg border border-stone-700 space-y-1">
                  <strong className="text-amber-300 block text-[11px] uppercase font-mono">
                    Ministry of Culture / ASI Dharwad Vacancies:
                  </strong>
                  <p>{CIVIC_EXECUTIVE_METRICS.parliamentaryOverview.centralAsiVacanciesReported}</p>
                </div>

                <div className="bg-stone-800/80 p-3 rounded-lg border border-stone-700 space-y-1">
                  <strong className="text-amber-300 block text-[11px] uppercase font-mono">
                    Ministry of Railways / SWR Connectivity:
                  </strong>
                  <p>{CIVIC_EXECUTIVE_METRICS.parliamentaryOverview.unionRailwayRequisitions}</p>
                </div>
              </div>
            </div>

            {/* INTERACTIVE LEGISLATIVE NOTICE GENERATOR */}
            <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-5 space-y-4 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-200/80 pb-2">
                <div>
                  <h4 className="font-serif font-bold text-indigo-950 text-base">
                    Draft Official Legislative Requisition Notice
                  </h4>
                  <p className="text-stone-600 text-xs">
                    Transform citizen evidence into a formal assembly or parliamentary question.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-indigo-800 bg-white px-2.5 py-0.5 rounded border border-indigo-300 font-semibold">
                  Rule 234 / Vidhana Soudha Notice
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Target Elected Representative:</label>
                  <select
                    value={selectedLegislator}
                    onChange={(e) => setSelectedLegislator(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded bg-white text-xs"
                  >
                    <option value="B. B. Chimmanakatti">MLA B. B. Chimmanakatti (Badami Assembly)</option>
                    <option value="Vijayanand Kashappanavar">MLA Vijayanand Kashappanavar (Hungund Assembly)</option>
                    <option value="P. C. Gaddigoudar">MP P. C. Gaddigoudar (Bagalkote Lok Sabha)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Select Policy Requisition Topic:</label>
                  <select
                    value={requisitionTopic}
                    onChange={(e) => setRequisitionTopic(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded bg-white text-xs"
                  >
                    <option value="Construction of Dedicated Municipal Washing Deck & Greywater Filtration at Agastya Lake">
                      Agastya Lake Greywater Laundry Deck & Detergent Diversion
                    </option>
                    <option value="Sanction of 2 Daily Morning NWKRTC Gramina Sarige Buses between Pattadakal and Aihole">
                      NWKRTC Morning Bus Sanction (Pattadakal ↔ Aihole)
                    </option>
                    <option value="Installation of Step-Free Wheelchair Ramp & Battery Buggies at Badami Caves and Pattadakal">
                      Step-Free Wheelchair Access & Battery Buggies (Ajanta Precedent)
                    </option>
                    <option value="Urgent Filling of 45% Vacancies at ASI Dharwad Circle for Monument Conservation">
                      ASI Dharwad Circle 45% Staff Vacancy Resolution
                    </option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleGenerateRequisition}
                  className="bg-indigo-900 hover:bg-indigo-800 text-white font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Generate Official Requisition Notice</span>
                </button>
              </div>

              {officialNoticeSlip && (
                <div className="bg-white border-2 border-indigo-300 rounded-xl p-4 space-y-3 mt-3 animate-fadeIn">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2">
                    <div>
                      <span className="text-[10px] font-mono text-indigo-800 uppercase block font-bold">
                        Official Notice Paper · {officialNoticeSlip.noticeId}
                      </span>
                      <strong className="font-serif text-stone-900 text-sm">
                        To the Office of: {officialNoticeSlip.legislator} ({officialNoticeSlip.constituency})
                      </strong>
                    </div>
                    <span className="text-[10px] font-mono bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold">
                      {officialNoticeSlip.priority}
                    </span>
                  </div>

                  <p className="text-xs text-stone-800 leading-relaxed font-serif">
                    &ldquo;In exercise of legislative oversight under the Bagalkote District Development Review, this notice formally tables citizen demand backed by verified photographic proof for: <strong>{officialNoticeSlip.topic}</strong>. Immediate executive sanction is requisitioned under the 2026 District Drought & Heritage Tourism Action Plan.&rdquo;
                  </p>

                  <div className="flex justify-between items-center text-[10px] text-stone-500 font-mono pt-1 border-t border-stone-100">
                    <span>Date Issued: {officialNoticeSlip.dateGenerated}</span>
                    <span>Synchronized with Vatapi Public Issue Ledger #148</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
