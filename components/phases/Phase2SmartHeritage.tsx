"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  MONUMENTS,
  Monument,
  MONUMENT_MYTHS,
  MythDebunkItem,
  EpigraphyPhrase,
} from "@/lib/data/monuments";
import { IssueReport } from "@/lib/data/heritage-watch";
import {
  ScanEye,
  Sparkles,
  Volume2,
  VolumeX,
  FileCheck,
  AlertOctagon,
  ArrowRight,
  BookOpen,
  Languages,
  Loader2,
  Send,
  HelpCircle,
  Clock,
  Landmark,
  ShieldCheck,
  Info,
  CheckCircle2,
  Layers,
  Footprints,
  Check,
  ChevronRight,
  AlertTriangle,
  RotateCcw,
  Camera,
  ExternalLink,
  FileText,
  BadgeAlert,
  Sliders,
  Calendar,
  Sparkle,
} from "lucide-react";

interface Phase2Props {
  onEscalateToLedger: (
    defectSummary: string,
    monumentName: string,
    directIssue?: IssueReport
  ) => void;
}

// Architectural pathology inspection presets
const PATHOLOGY_PRESETS = [
  {
    id: "preset-root-wedging",
    title: "Cave 3 Veranda Lintel Root Wedging",
    monumentId: "badami-cave-3",
    monumentName: "Badami Cave 3 (Maha-Vishnu & Mangalesha Inscription)",
    observation:
      "Active micro-vegetation root wedging (Ficus & bryophyte spores) expanding along the sandstone lintel mortar joint directly above the Mangalesha inscription pillar. White capillary salt deposits visible.",
    spectralMode: "moisture",
  },
  {
    id: "preset-salt-efflorescence",
    title: "Bhutanatha Shoreline Salt Subflorescence",
    monumentId: "bhutanatha-agastya",
    monumentName: "Bhutanatha Temple & Agastya Tirtha Lake",
    observation:
      "Cyclic capillary water absorption from Agastya Lake wave splash has generated severe sub-surface salt efflorescence (subflorescence), resulting in granular sandstone spalling and surface peeling on lower plinth blocks.",
    spectralMode: "stress",
  },
  {
    id: "preset-shear-crack",
    title: "Aihole Durga Apsidal Peristyle Fissure",
    monumentId: "aihole-durga",
    monumentName: "Aihole Durga Temple (Apsidal Fortress Sanctuary)",
    observation:
      "Diagonal structural shear crack (approx 2.4mm aperture) tracing through the curved sandstone architrave beam of the apsidal colonnade ambulatory. Dust accumulation indicates recent micro-displacement.",
    spectralMode: "stress",
  },
  {
    id: "preset-human-wear",
    title: "Cave 1 Nataraja Plinth Abrasive Wear",
    monumentId: "badami-cave-1",
    monumentName: "Badami Cave 1 (Nataraja & Shaiva Sanctuary)",
    observation:
      "Surface exfoliation exacerbated by direct human touch oils on the lower relief frieze of the 18-armed Nataraja, alongside modern chalk scribbles on the adjacent monolithic sandstone pillar.",
    spectralMode: "visible",
  },
  {
    id: "preset-algal-biofilm",
    title: "Mahakuta Pushkarini Tank Biofilm Encroachment",
    monumentId: "mahakuta-complex",
    monumentName: "Mahakuta Temple Complex & Pushkarini (Vishnu Pushkarini)",
    observation:
      "Thick cyanobacterial algal patina and micro-lichen colonies spreading over the submerged stone tiers of Vishnu Pushkarini, weakening the ancient porous masonry joints during the low-water phase.",
    spectralMode: "biopatina",
  },
];

// Negotiation & conversation presets for Vatapi Dual-Voice
const NEGOTIATION_PRESETS = [
  {
    title: "Auto: Badami Station to Town",
    message: "What is the fair auto fare from Badami Railway Station to the Caves or town market?",
    role: "Tourist",
    targetLang: "Kannada",
    context: "Fair government-regulated fare is ₹60 - ₹80 for direct shared/special auto.",
  },
  {
    title: "Auto: Day Circuit to Pattadakal & Aihole",
    message: "Can you take us on the full circuit (Badami - Mahakuta - Pattadakal - Aihole) and wait 3 hours?",
    role: "Tourist",
    targetLang: "Kannada",
    context: "Standard rate is ₹1,100 - ₹1,400 with fuel and 3-4 hours waiting included.",
  },
  {
    title: "Weaver: Guledgudda Khana Verification",
    message: "Is this authentic handloom Guledgudda Khana blouse fabric woven on a pit loom?",
    role: "Tourist",
    targetLang: "Kannada",
    context: "Authentic pit-loom Khana has reversible motifs and natural borders (₹400-₹700 per 90cm piece).",
  },
  {
    title: "Weaver: Pure Silk vs Art-Silk Warp",
    message: "Is the warp pure mulberry silk or synthetic art-silk, and does it carry the GI tag?",
    role: "Tourist",
    targetLang: "Kannada",
    context: "Pure silk Khana feels slightly heavier with a soft matte luster, unlike stiff polyester imitations.",
  },
  {
    title: "Food: Jolada Rotti Meals Spice Level",
    message: "We would like 2 authentic Jolada Rotti thalis with Yennegai. Please keep the spice mild.",
    role: "Tourist",
    targetLang: "Kannada",
    context: "North Karnataka jowar meals are traditionally spicy; requesting 'Swalpa khara' asks for less chili.",
  },
];

export const Phase2SmartHeritage: React.FC<Phase2Props> = ({
  onEscalateToLedger,
}) => {
  // Navigation tabs within Phase 2
  const [activeSubTab, setActiveSubTab] = useState<
    "health_check" | "epigraphy" | "voice_bridge" | "terrain_myths"
  >("health_check");

  // Selected monument for deep examination
  const [selectedMonument, setSelectedMonument] = useState<Monument>(
    MONUMENTS[2] || MONUMENTS[0] // Default to Cave 3
  );

  // --- HEALTH CHECK STATE ---
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    PATHOLOGY_PRESETS[0].id
  );
  const [healthCheckInput, setHealthCheckInput] = useState<string>(
    PATHOLOGY_PRESETS[0].observation
  );
  const [spectralMode, setSpectralMode] = useState<
    "visible" | "moisture" | "stress" | "biopatina"
  >("moisture");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [escalatedTicket, setEscalatedTicket] = useState<IssueReport | null>(
    null
  );

  // --- EPIGRAPHY LENS STATE ---
  const [selectedPhraseIndex, setSelectedPhraseIndex] = useState<number>(1); // Default to Saka 500
  const [rubbingFilter, setRubbingFilter] = useState<
    "natural" | "charcoal_rubbing" | "raking_light"
  >("charcoal_rubbing");
  const [activeTimelineNode, setActiveTimelineNode] = useState<number>(2); // Cave 3 datum

  // --- VATAPI VOICE & TWO-WAY BRIDGE STATE ---
  const [voiceMode, setVoiceMode] = useState<"guide" | "vendor_tourist">(
    "vendor_tourist"
  );
  const [speakerRole, setSpeakerRole] = useState<"Tourist" | "Local Partner">(
    "Tourist"
  );
  const [voiceQuery, setVoiceQuery] = useState(
    "Can you take us to Pattadakal and Aihole and wait 3 hours? What is the fair price?"
  );
  const [targetLang, setTargetLang] = useState("Kannada");
  const [isVoiceLoading, setIsVoiceLoading] = useState(false);
  const [voiceResponse, setVoiceResponse] = useState<any>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // --- TERRAIN REALITIES & STEP CALCULATOR STATE ---
  const [selectedItineraryIds, setSelectedItineraryIds] = useState<string[]>([
    "badami-cave-1",
    "badami-cave-2",
    "badami-cave-3",
    "badami-cave-4",
    "bhutanatha-agastya",
  ]);
  const [mythFilter, setMythFilter] = useState<string>("all");

  // Step calculation helper
  const itineraryStats = useMemo(() => {
    let totalSteps = 0;
    let caveSteps = 0;
    let terrainTypes = new Set<string>();

    selectedItineraryIds.forEach((id) => {
      const mon = MONUMENTS.find((m) => m.id === id);
      if (!mon) return;

      if (id === "badami-cave-1") {
        totalSteps += 40;
        caveSteps += 40;
      } else if (id === "badami-cave-2") {
        totalSteps += 64;
        caveSteps += 64;
      } else if (id === "badami-cave-3") {
        totalSteps += 120;
        caveSteps += 120;
      } else if (id === "badami-cave-4") {
        totalSteps += 150;
        caveSteps += 150;
      } else if (id === "bhutanatha-agastya") {
        totalSteps += 15;
      } else if (id === "aihole-durga") {
        totalSteps += 12;
      } else if (id === "aihole-lad-khan") {
        totalSteps += 6;
      } else if (id === "mahakuta-complex") {
        totalSteps += 10;
      }

      if (mon.stepCountFact.includes("Flat") || mon.stepCountFact.includes("Ground")) {
        terrainTypes.add("Flat / Paved");
      } else {
        terrainTypes.add("Rock-cut stairs");
      }
    });

    return {
      totalSteps,
      caveSteps,
      monumentCount: selectedItineraryIds.length,
      terrainTypes: Array.from(terrainTypes),
      elevationEstMeters: Math.round(totalSteps * 0.18),
      calorieBurnEst: Math.round(totalSteps * 0.17),
    };
  }, [selectedItineraryIds]);

  // Handle Preset selection
  const handleSelectPreset = (preset: typeof PATHOLOGY_PRESETS[0]) => {
    setSelectedPresetId(preset.id);
    setHealthCheckInput(preset.observation);
    setSpectralMode(preset.spectralMode as any);
    const targetM = MONUMENTS.find((m) => m.id === preset.monumentId);
    if (targetM) setSelectedMonument(targetM);
    setAnalysisResult(null);
    setEscalatedTicket(null);
  };

  // Run Health Check Analysis via API
  const handleRunHealthCheck = async () => {
    setIsAnalyzing(true);
    setEscalatedTicket(null);
    try {
      const res = await fetch("/api/gemini/health-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          monumentName: selectedMonument.name,
          observation: healthCheckInput,
        }),
      });
      const data = await res.json();
      setAnalysisResult(data.analysis);
    } catch (err) {
      console.error("Health check error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // One-Click Direct Feed into Heritage Watch Ledger
  const handleFeedDirectlyToLedger = () => {
    if (!analysisResult) return;

    const defectName =
      analysisResult.keyDefects?.[0] ||
      "Porous sandstone masonry decay and crack morphology";
    const ticketId = `VATAPI-2026-HC-${Math.floor(1000 + Math.random() * 9000)}`;

    const newIssue: IssueReport = {
      id: ticketId,
      trackingNumber: ticketId,
      title: `Masonry Health Alert: ${defectName} at ${selectedMonument.name}`,
      description: `${analysisResult.plainLanguageStory} \n\nScientific Diagnostic Findings: ${analysisResult.preservationRecommendation}. Biological growth status: ${analysisResult.biologicalGrowth}. Structural Integrity Score: ${analysisResult.structuralIntegrityScore}/100.`,
      monument: selectedMonument.name,
      taluk: selectedMonument.taluk,
      severity:
        analysisResult.structuralIntegrityScore < 70
          ? "Critical"
          : analysisResult.structuralIntegrityScore < 85
          ? "High"
          : "Medium",
      status: "Assigned",
      category: "Structural Damage",
      jurisdiction:
        selectedMonument.taluk === "Badami" &&
        selectedMonument.name.includes("Cave")
          ? "ASI Dharwad Circle"
          : selectedMonument.name.includes("Banashankari")
          ? "Temple Trust / Muzrai"
          : "ASI Dharwad Circle",
      electedMLA:
        selectedMonument.taluk === "Badami"
          ? "B. B. Chimmanakatti (Badami)"
          : "Vijayanand Kashappanavar (Hungund)",
      electedMP: "P. C. Gaddigoudar (Bagalkote Lok Sabha)",
      resolutionLane: "Government Fix",
      escalationLevel: "L1: Local Office",
      reportedDate: "2026-09-24",
      slaDeadlineDays: 7,
      daysRemaining: 7,
      upvotesCount: 14,
      duplicateCount: 0,
      photoProofUrl:
        selectedMonument.id === "badami-cave-3"
          ? "https://picsum.photos/seed/badamicave3/800/600"
          : selectedMonument.id === "bhutanatha-agastya"
          ? "https://picsum.photos/seed/bhutanatha/800/600"
          : "https://picsum.photos/seed/chalukyaheritage/800/600",
      coordinates:
        selectedMonument.taluk === "Badami"
          ? { lat: 15.9187, lng: 75.6766 }
          : { lat: 16.0182, lng: 75.8824 },
      sampleDataNotice: true,
    };

    setEscalatedTicket(newIssue);
    onEscalateToLedger(newIssue.title, selectedMonument.name, newIssue);
  };

  // Run Vatapi Voice via API
  const handleRunVoice = async (queryText?: string, targetLanguageParam?: string) => {
    const q = queryText || voiceQuery;
    const l = targetLanguageParam || targetLang;
    if (!q) return;

    setIsVoiceLoading(true);
    try {
      const res = await fetch("/api/gemini/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: q,
          targetLanguage: l,
          mode: voiceMode,
          role: speakerRole,
        }),
      });
      const data = await res.json();
      setVoiceResponse(data.result);
    } catch (err) {
      console.error("Vatapi Voice call failed:", err);
    } finally {
      setIsVoiceLoading(false);
    }
  };

  // Web Speech Audio Playback
  const handlePlayVoiceAudio = (textToSpeak: string, languageName: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Map language code
    if (languageName.toLowerCase().includes("kannada")) {
      utterance.lang = "kn-IN";
    } else if (languageName.toLowerCase().includes("marathi")) {
      utterance.lang = "mr-IN";
    } else if (languageName.toLowerCase().includes("hindi")) {
      utterance.lang = "hi-IN";
    } else if (languageName.toLowerCase().includes("telugu")) {
      utterance.lang = "te-IN";
    } else {
      utterance.lang = "en-IN";
    }

    utterance.rate = 0.95;
    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Module Title & Tab Navigation */}
      <div className="border-b border-stone-200 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold mb-1 flex items-center gap-1.5">
              <span>Phase 02 · Smart Technology</span>
              <span className="text-stone-300">|</span>
              <span className="text-stone-500 font-sans normal-case">
                10 Verified Monuments & Scientific Diagnostics
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Heritage Health Check & Multilingual Vatapi Voice
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
              Pairs AI-guided sandstone pathology (crack morphology, micro-vegetation root wedging, salt efflorescence) with direct civic ledger escalation, a pre-annotated Mangalesha 578 CE epigraphy lens, verified terrain reality facts, and a Bhashini-inspired Two-Way audio bridge.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs font-medium">
            <button
              onClick={() => setActiveSubTab("health_check")}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                activeSubTab === "health_check"
                  ? "bg-white text-stone-900 shadow-xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <ScanEye className="w-3.5 h-3.5 text-amber-800" />
              <span>Heritage Health Lab</span>
            </button>
            <button
              onClick={() => setActiveSubTab("epigraphy")}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                activeSubTab === "epigraphy"
                  ? "bg-white text-stone-900 shadow-xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-800" />
              <span>Mangalesha 578 CE Epigraphy</span>
            </button>
            <button
              onClick={() => setActiveSubTab("voice_bridge")}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                activeSubTab === "voice_bridge"
                  ? "bg-white text-stone-900 shadow-xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-amber-800" />
              <span>Vatapi Voice & Two-Way Bridge</span>
            </button>
            <button
              onClick={() => setActiveSubTab("terrain_myths")}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                activeSubTab === "terrain_myths"
                  ? "bg-white text-stone-900 shadow-xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Footprints className="w-3.5 h-3.5 text-amber-800" />
              <span>Terrain Realities (10 Sites)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: HERITAGE HEALTH CHECK DIAGNOSTIC LAB */}
      {/* ========================================================================= */}
      {activeSubTab === "health_check" && (
        <div className="space-y-6">
          {/* Preset Selector Bar */}
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <BadgeAlert className="w-4 h-4 text-amber-800" />
                <span className="font-semibold text-xs text-stone-900">
                  Select Architectural Pathology Inspection Preset:
                </span>
              </div>
              <span className="text-[11px] font-mono text-stone-500">
                Ground Sandstone Pathology Samples
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-xs">
              {PATHOLOGY_PRESETS.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`text-left p-2.5 rounded border transition-all ${
                      isSelected
                        ? "bg-amber-900 text-white border-amber-950 shadow-xs"
                        : "bg-white text-stone-700 border-stone-200 hover:border-amber-700/60 hover:bg-stone-50"
                    }`}
                  >
                    <div className="font-medium truncate">{preset.title}</div>
                    <div
                      className={`text-[10px] mt-0.5 truncate ${
                        isSelected ? "text-amber-200" : "text-stone-400"
                      }`}
                    >
                      {preset.monumentName.split("(")[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Diagnostic Console: Controls & Scanner Simulation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Controls Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white border border-stone-200 rounded-lg p-4 sm:p-5 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Inspecting Monument:
                  </label>
                  <select
                    value={selectedMonument.id}
                    onChange={(e) => {
                      const m = MONUMENTS.find((item) => item.id === e.target.value);
                      if (m) setSelectedMonument(m);
                    }}
                    className="w-full px-3 py-2 border border-stone-300 rounded bg-white font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-700"
                  >
                    {MONUMENTS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.taluk} Taluk)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Spectral Filter Switcher */}
                <div>
                  <label className="block font-semibold text-stone-800 mb-1.5 flex items-center justify-between">
                    <span>Multi-Spectral Diagnostic Lens:</span>
                    <span className="font-mono text-[10px] text-amber-800">
                      Sensor Simulation
                    </span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {[
                      { id: "visible", label: "Visible Light", desc: "Red Sandstone" },
                      { id: "moisture", label: "Capillary Seepage", desc: "Moisture Map" },
                      { id: "stress", label: "Crack Vector", desc: "Shear Stress" },
                      { id: "biopatina", label: "Bio-Patina", desc: "Lichen / Flora" },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setSpectralMode(mode.id as any)}
                        className={`p-2 rounded text-center border transition-all text-[11px] ${
                          spectralMode === mode.id
                            ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                            : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                        }`}
                      >
                        <div className="font-medium">{mode.label}</div>
                        <div
                          className={`text-[9px] ${
                            spectralMode === mode.id
                              ? "text-stone-300"
                              : "text-stone-400"
                          }`}
                        >
                          {mode.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Field Observation Input */}
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Field Observation & Pathology Notes:
                  </label>
                  <textarea
                    rows={4}
                    value={healthCheckInput}
                    onChange={(e) => setHealthCheckInput(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs leading-relaxed"
                    placeholder="Describe cracks, salt crystalline crusts, or root wedges..."
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 font-mono">
                    Model: Gemini-3.8-Flash
                  </span>
                  <button
                    onClick={handleRunHealthCheck}
                    disabled={isAnalyzing}
                    className="flex items-center gap-1.5 bg-amber-800 hover:bg-amber-700 disabled:opacity-50 text-white font-medium text-xs px-4 py-2 rounded transition-all shadow-xs"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Analyzing Sandstone...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Run AI Health Diagnostic</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Spectral Diagnostic Visualization Preview Box */}
              <div className="bg-stone-950 text-stone-100 rounded-lg p-4 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-400 font-mono">
                    <ScanEye className="w-3.5 h-3.5" />
                    <span>Optical Sensor Preview ({spectralMode.toUpperCase()})</span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {selectedMonument.taluk} Taluk Grid
                  </span>
                </div>

                {/* Simulated Sandstone Texture Display with Overlays */}
                <div
                  className={`relative h-44 rounded border overflow-hidden transition-all duration-300 ${
                    spectralMode === "visible"
                      ? "bg-amber-900/60 border-amber-800"
                      : spectralMode === "moisture"
                      ? "bg-cyan-950/70 border-cyan-800"
                      : spectralMode === "stress"
                      ? "bg-red-950/70 border-red-800"
                      : "bg-emerald-950/70 border-emerald-800"
                  }`}
                >
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />

                  {/* Diagnostic Overlay Graphics */}
                  {spectralMode === "moisture" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-cyan-300 space-y-1 p-4 text-center">
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-cyan-400/80 animate-spin" />
                      <span className="text-xs font-mono font-bold tracking-wider">
                        CAPILLARY MOISTURE PLUME DETECTED
                      </span>
                      <span className="text-[10px] text-cyan-200/80">
                        Porous sandstone pore saturation: 78.4%
                      </span>
                    </div>
                  )}

                  {spectralMode === "stress" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-red-300 space-y-1 p-4 text-center">
                      <div className="w-16 h-0.5 bg-red-500 rotate-45 animate-pulse shadow-[0_0_10px_#ef4444]" />
                      <span className="text-xs font-mono font-bold tracking-wider pt-2">
                        SHEAR STRESS VECTOR: 2.4mm APERTURE
                      </span>
                      <span className="text-[10px] text-red-200/80">
                        Lintel tension load exceeds tensile limit
                      </span>
                    </div>
                  )}

                  {spectralMode === "biopatina" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-300 space-y-1 p-4 text-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center animate-pulse">
                        <Sparkle className="w-4 h-4 text-emerald-300" />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-wider">
                        LICHEN COLONY & BRYOPHYTE ROOT WEDGING
                      </span>
                      <span className="text-[10px] text-emerald-200/80">
                        Acidic bio-exudates degrading calcitic matrix
                      </span>
                    </div>
                  )}

                  {spectralMode === "visible" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-amber-200 space-y-1 p-4 text-center">
                      <Landmark className="w-8 h-8 text-amber-400" />
                      <span className="text-xs font-serif font-bold text-amber-100">
                        {selectedMonument.name}
                      </span>
                      <span className="text-[10px] text-amber-200/70">
                        Monolithic Badami Sandstone · Chalukya 6th–8th c. CE
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
                  <span>Conservation Protocol: ASI Dharwad Sub-Circle</span>
                  <span>GPS: Badami Cliffs</span>
                </div>
              </div>
            </div>

            {/* Right Diagnostic Findings & Direct Feed to Ledger Column */}
            <div className="lg:col-span-7 bg-white rounded-lg border border-stone-200 p-5 space-y-5">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-amber-800" />
                  <h3 className="font-serif font-bold text-stone-900 text-base">
                    Pathological Findings & Conservation Prescription
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-stone-500">
                  Research Grounding: Heritage Science 2022
                </span>
              </div>

              {analysisResult ? (
                <div className="space-y-5 text-xs">
                  {/* Score & Target Header */}
                  <div className="bg-stone-50 rounded-lg p-3.5 border border-stone-200/80 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-stone-500 block">
                        Target Structure
                      </span>
                      <h4 className="font-serif font-bold text-stone-900 text-sm">
                        {analysisResult.monumentIdentified}
                      </h4>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-mono text-stone-500 block">
                          Structural Integrity
                        </span>
                        <span
                          className={`text-xl font-bold font-mono ${
                            analysisResult.structuralIntegrityScore < 70
                              ? "text-red-700"
                              : analysisResult.structuralIntegrityScore < 85
                              ? "text-amber-700"
                              : "text-emerald-700"
                          }`}
                        >
                          {analysisResult.structuralIntegrityScore} / 100
                        </span>
                      </div>
                      <div
                        className={`w-3 h-10 rounded ${
                          analysisResult.structuralIntegrityScore < 70
                            ? "bg-red-600"
                            : analysisResult.structuralIntegrityScore < 85
                            ? "bg-amber-500"
                            : "bg-emerald-600"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Defects Identified */}
                  <div>
                    <span className="font-semibold text-stone-800 block mb-1.5">
                      Specific Masonry Defects Identified:
                    </span>
                    <div className="space-y-1.5">
                      {analysisResult.keyDefects?.map(
                        (defect: string, i: number) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 bg-stone-50 p-2 rounded border border-stone-200/60"
                          >
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                            <span className="text-stone-700 font-medium">
                              {defect}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Biological Patina */}
                  <div className="bg-emerald-50/70 border border-emerald-200/80 p-3 rounded">
                    <span className="font-semibold text-emerald-950 block mb-0.5">
                      Biological Flora & Micro-Growth Assessment:
                    </span>
                    <p className="text-emerald-900 leading-relaxed">
                      {analysisResult.biologicalGrowth}
                    </p>
                  </div>

                  {/* Historical Story */}
                  <div>
                    <span className="font-semibold text-stone-800 block mb-1">
                      Historical Significance & Why This Masonry Matters:
                    </span>
                    <p className="text-stone-700 italic leading-relaxed bg-stone-50 p-3 rounded border border-stone-200/60">
                      &ldquo;{analysisResult.plainLanguageStory}&rdquo;
                    </p>
                  </div>

                  {/* Scientific Preservation Recommendation */}
                  <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded">
                    <span className="font-semibold text-amber-900 block mb-1">
                      Scientific Conservation Protocol:
                    </span>
                    <p className="text-stone-800 leading-relaxed font-sans">
                      {analysisResult.preservationRecommendation}
                    </p>
                  </div>

                  {/* SPINE CONNECTION: One-Click Feed to Heritage Watch Ledger */}
                  <div className="pt-4 border-t border-stone-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold text-stone-900 block">
                          One-Click Escalation to Civic Ledger:
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Injects this diagnosis into the Public Issue Ledger with a 7-day SLA countdown and official ASI tracking ID.
                        </span>
                      </div>

                      <button
                        onClick={handleFeedDirectlyToLedger}
                        className="flex items-center gap-1.5 bg-red-800 hover:bg-red-700 text-white font-medium text-xs px-4 py-2 rounded transition-all shadow-xs"
                      >
                        <AlertOctagon className="w-3.5 h-3.5" />
                        <span>One-Click Feed to Heritage Watch Ledger</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                      </button>
                    </div>

                    {/* Confirmation banner if ticket created */}
                    {escalatedTicket && (
                      <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-3 text-xs text-emerald-900 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            Grievance Successfully Logged into Heritage Watch!
                          </span>
                          <span className="font-mono text-[11px] bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                            {escalatedTicket.id}
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-800">
                          Assigned to <strong>{escalatedTicket.jurisdiction}</strong> with a 7-day SLA countdown. Requires photographic citizen sign-off before resolution closure.
                        </p>
                        <div className="pt-1 flex items-center gap-2">
                          <button
                            onClick={() =>
                              onEscalateToLedger(
                                escalatedTicket.title,
                                escalatedTicket.monument
                              )
                            }
                            className="bg-emerald-800 hover:bg-emerald-700 text-white px-3 py-1 rounded text-[11px] font-medium transition-colors"
                          >
                            View Ticket in Phase 1 Ledger →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-72 flex flex-col items-center justify-center py-10 text-stone-400 space-y-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                    <ScanEye className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div className="max-w-xs space-y-1">
                    <p className="text-xs font-medium text-stone-600">
                      No Active Diagnostic Scan Run Yet
                    </p>
                    <p className="text-[11px] text-stone-400">
                      Select one of the 5 pathology presets above or input custom notes, then click &ldquo;Run AI Health Diagnostic&rdquo;.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: MANGLESHA 578 CE EPIGRAPHICAL LENS */}
      {/* ========================================================================= */}
      {activeSubTab === "epigraphy" && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-amber-950 text-amber-50 rounded-lg p-5 sm:p-6 border border-amber-800/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-800/70 pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-semibold">
                  Epigraphical Bedrock of Deccan Art · 578 CE (Saka 500)
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-amber-100">
                  King Mangalesha Cave 3 Veranda Pillar Inscription
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-amber-300 font-mono bg-amber-900/60 px-3 py-1 rounded border border-amber-700">
                  Script: Early Southern Brahmi / Hale Kannada
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed max-w-4xl">
              Unlike the rock caves of Ajanta or Ellora which are dated through indirect dynastic comparisons, Badami Cave 3 carries an explicit calendar date: <strong>Saka 500 expired (578 CE)</strong>. This single stone inscription is the chronometer that anchors all Western Chalukya relief carving and temple development.
            </p>

            {/* Rubbing Filter Mode Switcher */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-amber-800/50">
              <span className="text-xs text-amber-300 font-medium">
                Epigraphical Viewing Lens:
              </span>
              <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded border border-amber-800/60 text-xs">
                {[
                  { id: "natural", label: "Porous Sandstone" },
                  { id: "charcoal_rubbing", label: "ASI Charcoal Paper Rubbing" },
                  { id: "raking_light", label: "Raking Sunlight (4:30 PM)" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setRubbingFilter(mode.id as any)}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      rubbingFilter === mode.id
                        ? "bg-amber-800 text-white font-medium"
                        : "text-amber-200 hover:text-white"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Inscription Display with Hale Kannada Clickable Phrases */}
          <div className="bg-white border border-stone-200 rounded-lg p-5 sm:p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-stone-900 text-sm">
                  Interactive Hale Kannada Epigraphical Transcription
                </span>
                <span className="text-stone-500 font-mono text-[11px]">
                  Click any phrase below to inspect its epigraphical significance
                </span>
              </div>

              {/* Simulated Inscription Wall with Rubbing filter */}
              <div
                className={`p-6 rounded-lg border text-center transition-all duration-300 select-none ${
                  rubbingFilter === "charcoal_rubbing"
                    ? "bg-stone-900 text-stone-100 border-stone-950 font-serif"
                    : rubbingFilter === "raking_light"
                    ? "bg-amber-900/80 text-amber-50 border-amber-950 shadow-inner"
                    : "bg-[#d88967] text-stone-900 border-[#be6f4e]"
                }`}
              >
                <div className="text-[11px] font-mono uppercase tracking-widest text-amber-300 mb-2">
                  Original Inscription Text (Cave 3 Eastern Veranda Pillar)
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-lg font-serif tracking-wide py-3">
                  {selectedMonument.inscriptionSpotlight?.phrases.map(
                    (item: EpigraphyPhrase, index: number) => {
                      const isSelected = selectedPhraseIndex === index;
                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedPhraseIndex(index)}
                          className={`px-3 py-1.5 rounded transition-all transform hover:scale-105 ${
                            isSelected
                              ? "bg-amber-400 text-stone-950 font-bold shadow-md ring-2 ring-amber-300"
                              : "bg-black/20 hover:bg-black/40 text-inherit border border-white/10"
                          }`}
                        >
                          {item.phraseOldKannada}
                        </button>
                      );
                    }
                  )}
                </div>

                <div className="text-xs text-amber-200/90 italic pt-2">
                  Click any phrase above to reveal translation, grammatical break, and art history implications.
                </div>
              </div>
            </div>

            {/* Selected Phrase Detail Inspector */}
            {selectedMonument.inscriptionSpotlight && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {(() => {
                  const phrase =
                    selectedMonument.inscriptionSpotlight.phrases[
                      selectedPhraseIndex
                    ];
                  if (!phrase) return null;
                  return (
                    <>
                      <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-2">
                        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                          <span className="font-mono text-[10px] uppercase text-stone-400">
                            Phrase Breakdown #{selectedPhraseIndex + 1}
                          </span>
                          <span className="font-mono text-amber-800 text-[11px]">
                            {phrase.transliteration}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-stone-800 block mb-0.5">
                            Old Kannada:
                          </span>
                          <div className="font-serif text-lg font-bold text-amber-900">
                            {phrase.phraseOldKannada}
                          </div>
                        </div>
                        <div>
                          <span className="font-semibold text-stone-800 block mb-0.5">
                            Contemporary Kannada Equivalent:
                          </span>
                          <div className="text-stone-700 text-sm">
                            {phrase.modernKannada}
                          </div>
                        </div>
                        <div>
                          <span className="font-semibold text-stone-800 block mb-0.5">
                            English Meaning:
                          </span>
                          <div className="text-stone-800 font-medium">
                            &ldquo;{phrase.meaning}&rdquo;
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50/70 p-4 rounded-lg border border-amber-200/80 space-y-2">
                        <span className="font-mono text-[10px] uppercase text-amber-800 block border-b border-amber-200 pb-1">
                          Epigraphist Critical Commentary
                        </span>
                        <p className="text-stone-700 leading-relaxed font-sans">
                          {phrase.epigraphicalNote}
                        </p>
                        <div className="pt-2 text-[11px] text-amber-900 font-medium border-t border-amber-200/60">
                          <strong>Art History Anchor:</strong> Confirms that the Western Chalukya royal workshop employed both Hale Kannada and Sanskrit metrics when commissioning monolithic temples.
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {/* Deccan Chronology Dating Network */}
            <div className="pt-4 border-t border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm">
                    How Mangalesha&apos;s 578 CE Inscription Chronologically Anchors All Early Deccan Art
                  </h4>
                  <p className="text-xs text-stone-500">
                    Art historians use Cave 3 as the datum point to calculate preceding and succeeding monuments.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs">
                {selectedMonument.inscriptionSpotlight?.chronologyDatingNetwork.map(
                  (node, idx) => {
                    const isActive = activeTimelineNode === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveTimelineNode(idx)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          isActive
                            ? "bg-amber-900 text-white border-amber-950 shadow-xs"
                            : "bg-white text-stone-800 border-stone-200 hover:border-amber-700/60 hover:bg-stone-50"
                        }`}
                      >
                        <div className="font-bold text-xs truncate">
                          {node.monument.split("(")[0]}
                        </div>
                        <div
                          className={`text-[10px] font-mono mt-1 ${
                            isActive ? "text-amber-200" : "text-amber-800 font-semibold"
                          }`}
                        >
                          {node.relationship}
                        </div>
                        <p
                          className={`text-[11px] mt-2 line-clamp-3 leading-relaxed ${
                            isActive ? "text-amber-100" : "text-stone-600"
                          }`}
                        >
                          {node.datedContext}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: VATAPI VOICE & TWO-WAY BRIDGE */}
      {/* ========================================================================= */}
      {activeSubTab === "voice_bridge" && (
        <div className="space-y-6">
          {/* Module Description & Mode Switch */}
          <div className="bg-white border border-stone-200 rounded-lg p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold mb-0.5">
                  Bhashini-Inspired Multilingual Engine
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  Vatapi Voice Concierge & Two-Way Community Bridge
                </h3>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs">
                <button
                  onClick={() => {
                    setVoiceMode("vendor_tourist");
                    setVoiceResponse(null);
                  }}
                  className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                    voiceMode === "vendor_tourist"
                      ? "bg-white text-stone-900 shadow-xs font-semibold"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  Two-Way Bridge Mode (Tourist ↔ Driver / Weaver)
                </button>
                <button
                  onClick={() => {
                    setVoiceMode("guide");
                    setVoiceResponse(null);
                  }}
                  className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                    voiceMode === "guide"
                      ? "bg-white text-stone-900 shadow-xs font-semibold"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  Heritage Guide Mode
                </button>
              </div>
            </div>

            {/* Quick Negotiation Presets */}
            {voiceMode === "vendor_tourist" && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-stone-700 block">
                  Quick Fair Negotiation Scenarios:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                  {NEGOTIATION_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setVoiceQuery(preset.message);
                        setTargetLang(preset.targetLang);
                        setSpeakerRole(preset.role as any);
                        handleRunVoice(preset.message, preset.targetLang);
                      }}
                      className="text-left p-2.5 rounded border border-stone-200 hover:border-amber-700/60 hover:bg-amber-50/40 transition-colors space-y-1"
                    >
                      <div className="font-medium text-stone-900 text-xs">
                        {preset.title}
                      </div>
                      <div className="text-[11px] text-stone-500 line-clamp-2">
                        {preset.message}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form & Language Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
              <div className="sm:col-span-6">
                <label className="block font-semibold text-stone-800 mb-1">
                  {voiceMode === "vendor_tourist"
                    ? "Speech Input / Phrase to Translate:"
                    : "Ask anything about Badami, Pattadakal, or Banashankari:"}
                </label>
                <input
                  type="text"
                  value={voiceQuery}
                  onChange={(e) => setVoiceQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs"
                  placeholder="e.g. How much is the auto fare to Pattadakal with 2 hours waiting?"
                />
              </div>

              {voiceMode === "vendor_tourist" && (
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-800 mb-1">
                    Speaker Role:
                  </label>
                  <select
                    value={speakerRole}
                    onChange={(e) => setSpeakerRole(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-300 rounded bg-white text-stone-800 text-xs"
                  >
                    <option value="Tourist">Tourist speaking</option>
                    <option value="Local Partner">Auto Driver / Weaver replying</option>
                  </select>
                </div>
              )}

              <div className={voiceMode === "vendor_tourist" ? "sm:col-span-2" : "sm:col-span-3"}>
                <label className="block font-semibold text-stone-800 mb-1">
                  Target Language:
                </label>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded bg-white text-stone-800 text-xs"
                >
                  <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
                  <option value="Marathi">मराठी (Marathi)</option>
                  <option value="Hindi">हिंदी (Hindi)</option>
                  <option value="English">English</option>
                  <option value="Telugu">తెలుగు (Telugu)</option>
                </select>
              </div>

              <div className={voiceMode === "vendor_tourist" ? "sm:col-span-2 flex items-end" : "sm:col-span-3 flex items-end"}>
                <button
                  onClick={() => handleRunVoice()}
                  disabled={isVoiceLoading}
                  className="w-full bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-medium text-xs px-3 py-2 rounded flex items-center justify-center gap-1.5 transition-colors"
                >
                  {isVoiceLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {voiceMode === "vendor_tourist"
                      ? "Translate & Guide"
                      : "Ask Vatapi Guide"}
                  </span>
                </button>
              </div>
            </div>

            {/* Voice Response Output Card */}
            {voiceResponse && (
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-5 space-y-4 text-xs">
                {voiceMode === "vendor_tourist" ? (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2">
                      <span className="text-[10px] font-mono uppercase text-amber-800 font-semibold">
                        Two-Way Bridge Translation ({targetLang})
                      </span>
                      <button
                        onClick={() =>
                          handlePlayVoiceAudio(
                            voiceResponse.translatedText,
                            targetLang
                          )
                        }
                        className={`flex items-center gap-1 px-3 py-1 rounded text-xs transition-colors ${
                          isPlayingAudio
                            ? "bg-amber-700 text-white animate-pulse"
                            : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100"
                        }`}
                      >
                        {isPlayingAudio ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>Playing Speech...</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-amber-800" />
                            <span>Listen Audio (Web Speech)</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-stone-200 space-y-2">
                      <div className="font-serif text-lg text-stone-900 leading-relaxed font-bold">
                        {voiceResponse.translatedText}
                      </div>
                      <div className="text-xs text-stone-600 font-mono bg-stone-50 p-2 rounded border border-stone-200/60">
                        <strong>Phonetic Guide:</strong> {voiceResponse.pronunciationGuide}
                      </div>
                    </div>

                    <div className="bg-amber-50/80 border border-amber-200 p-3 rounded text-stone-800">
                      <span className="font-semibold text-amber-900 block mb-0.5">
                        Cultural Etiquette & Fair Transaction Note:
                      </span>
                      {voiceResponse.politeContextNote}
                    </div>

                    {voiceResponse.suggestedReplies && (
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-mono text-stone-400 block">
                          Suggested Responses for Counterparty:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {voiceResponse.suggestedReplies.map(
                            (reply: string, i: number) => (
                              <button
                                key={i}
                                onClick={() => {
                                  setVoiceQuery(reply);
                                  handleRunVoice(reply, "English");
                                }}
                                className="bg-white border border-stone-200 hover:border-amber-700 px-3 py-1 rounded text-stone-800 text-xs transition-colors"
                              >
                                {reply}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2">
                      <span className="text-[10px] font-mono uppercase text-amber-800 font-semibold">
                        Vatapi Heritage Concierge
                      </span>
                      <button
                        onClick={() =>
                          handlePlayVoiceAudio(
                            voiceResponse.audioNarrationScript ||
                              voiceResponse.responseText,
                            targetLang
                          )
                        }
                        className={`flex items-center gap-1 px-3 py-1 rounded text-xs transition-colors ${
                          isPlayingAudio
                            ? "bg-amber-700 text-white animate-pulse"
                            : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100"
                        }`}
                      >
                        {isPlayingAudio ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>Stop Audio</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-amber-800" />
                            <span>Listen Narration</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-stone-800 text-sm leading-relaxed">
                      {voiceResponse.responseText}
                    </p>

                    <div className="bg-amber-50/80 border border-amber-200 p-3 rounded text-stone-700">
                      <span className="font-semibold text-amber-900 block mb-0.5">
                        Insider Circuit Tip:
                      </span>
                      {voiceResponse.localTip}
                    </div>

                    {voiceResponse.relatedMonuments && (
                      <div className="text-[11px] text-stone-500">
                        <span className="font-medium text-stone-700">
                          Recommended Next Stops:
                        </span>{" "}
                        {voiceResponse.relatedMonuments.join(" · ")}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Transparent Benchmark Rate Card */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-800">
                  Verified Local Benchmark Price Guidelines (Bagalkote District)
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  Sample rates for fair community exchange
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-stone-50 p-3 rounded border border-stone-200 space-y-1">
                  <div className="font-semibold text-stone-900">
                    Auto-Rickshaw Transit
                  </div>
                  <ul className="text-stone-600 text-[11px] space-y-0.5">
                    <li>· Station to Town/Caves: ₹60 - ₹80</li>
                    <li>· Caves return with waiting: ₹150 - ₹200</li>
                    <li>· Full circuit day trip: ₹1,100 - ₹1,400</li>
                  </ul>
                </div>

                <div className="bg-stone-50 p-3 rounded border border-stone-200 space-y-1">
                  <div className="font-semibold text-stone-900">
                    Guledgudda Khana Handloom
                  </div>
                  <ul className="text-stone-600 text-[11px] space-y-0.5">
                    <li>· Pure Silk Warp (90cm): ₹550 - ₹750</li>
                    <li>· Cotton-Silk Warp: ₹350 - ₹480</li>
                    <li>· Powerloom copy (alert): ₹80 - ₹120</li>
                  </ul>
                </div>

                <div className="bg-stone-50 p-3 rounded border border-stone-200 space-y-1">
                  <div className="font-semibold text-stone-900">
                    Ooru Oota Traditional Food
                  </div>
                  <ul className="text-stone-600 text-[11px] space-y-0.5">
                    <li>· Unlimited Jolada Rotti plate: ₹90 - ₹120</li>
                    <li>· Extra Yennegai (Brinjal curry): ₹30</li>
                    <li>· Fresh Buttermilk (Majjige): ₹15 - ₹20</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: TERRAIN REALITIES & 10 MONUMENTS DIRECTORY */}
      {/* ========================================================================= */}
      {activeSubTab === "terrain_myths" && (
        <div className="space-y-6">
          {/* Section 1: Debunking Myths with Scientific & Field Citations */}
          <div className="bg-white border border-stone-200 rounded-lg p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold mb-0.5">
                  Scientific Ground Reality Check
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  Debunking Persistent Myths & Travel Misinformation
                </h3>
              </div>
              <span className="text-xs text-stone-500 font-mono">
                Clarifying the &ldquo;2,000 steps&rdquo; claim and blog conflicts
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {MONUMENT_MYTHS.map((mythItem) => (
                <div
                  key={mythItem.id}
                  className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-100 text-amber-900 font-mono text-[10px] px-2 py-0.5 rounded font-semibold">
                      {mythItem.badge}
                    </span>
                    <span className="font-mono text-[11px] text-stone-500">
                      Actual: {mythItem.actualSteps}
                    </span>
                  </div>

                  <div>
                    <span className="text-red-700 font-bold block mb-0.5">
                      ❌ Myth: &ldquo;{mythItem.myth}&rdquo;
                    </span>
                    <span className="text-stone-500 text-[11px] block">
                      <strong>Source of confusion:</strong> {mythItem.sourceOfConfusion}
                    </span>
                  </div>

                  <div className="bg-emerald-50/70 p-2.5 rounded border border-emerald-200 text-emerald-950">
                    <span className="font-bold text-emerald-900 block mb-0.5">
                      ✓ Ground Reality & Verified Fact:
                    </span>
                    <p className="leading-relaxed">{mythItem.groundRealityFact}</p>
                  </div>

                  <div className="text-[10px] text-stone-400 font-mono pt-1 border-t border-stone-200/60">
                    Verified By: {mythItem.verifiedBy}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Interactive Itinerary Step & Terrain Calculator */}
          <div className="bg-amber-950 text-amber-50 rounded-lg p-5 sm:p-6 border border-amber-800/80 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-800/70 pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-semibold">
                  Personal Physical Readiness
                </span>
                <h3 className="font-serif font-bold text-xl text-amber-100">
                  Interactive Step & Terrain Readiness Calculator
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-amber-300 font-mono block">
                  Total Planned Steps
                </span>
                <span className="text-2xl font-serif font-bold text-amber-200">
                  {itineraryStats.totalSteps} steps
                </span>
              </div>
            </div>

            <p className="text-xs text-amber-200/80 leading-relaxed max-w-3xl">
              Select which of the 10 monuments you plan to visit. The calculator tallies realistic step flights, clarifies that Cave 1 through 4 only total 374 steps (not 2,000!), and evaluates walking endurance needed under northern Karnataka sun.
            </p>

            {/* Checklist of 10 Monuments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-xs">
              {MONUMENTS.map((m) => {
                const isChecked = selectedItineraryIds.includes(m.id);
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      if (isChecked) {
                        setSelectedItineraryIds(
                          selectedItineraryIds.filter((id) => id !== m.id)
                        );
                      } else {
                        setSelectedItineraryIds([...selectedItineraryIds, m.id]);
                      }
                    }}
                    className={`p-2.5 rounded text-left border transition-all ${
                      isChecked
                        ? "bg-amber-900 border-amber-500 text-amber-50 shadow-xs"
                        : "bg-black/30 border-amber-900/60 text-amber-300/70 hover:bg-black/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">{m.name.split("(")[0]}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-amber-300" />}
                    </div>
                    <div className="text-[10px] text-amber-300/60 font-mono mt-1">
                      {m.stepCountFact.split(".")[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Computed Readiness Assessment */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/30 p-4 rounded-lg border border-amber-800/60 text-xs">
              <div>
                <span className="text-amber-400/80 block text-[10px] uppercase font-mono">
                  Selected Sites
                </span>
                <span className="text-base font-bold text-amber-100">
                  {itineraryStats.monumentCount} / 10 Monuments
                </span>
              </div>

              <div>
                <span className="text-amber-400/80 block text-[10px] uppercase font-mono">
                  Cave Steps Flight
                </span>
                <span className="text-base font-bold text-amber-100">
                  {itineraryStats.caveSteps} steps
                </span>
              </div>

              <div>
                <span className="text-amber-400/80 block text-[10px] uppercase font-mono">
                  Vertical Elevation
                </span>
                <span className="text-base font-bold text-amber-100">
                  ~{itineraryStats.elevationEstMeters} m gain
                </span>
              </div>

              <div>
                <span className="text-amber-400/80 block text-[10px] uppercase font-mono">
                  Hydration Recommendation
                </span>
                <span className="text-base font-bold text-amber-100">
                  {itineraryStats.totalSteps > 200 ? "1.5L water + ORS" : "1L water"}
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: The 10 Curated & Verified Monuments Card Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <h3 className="font-serif font-bold text-stone-900 text-base">
                Curated 10-Monument Directory with Exact Timings & Terrain Realities
              </h3>
              <span className="text-xs text-stone-500 font-mono">
                Badami Taluk (8) · Hungund Taluk (2)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {MONUMENTS.map((m) => (
                <div
                  key={m.id}
                  className="bg-white p-4 rounded-lg border border-stone-200 space-y-2.5 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 text-sm">
                        {m.name}
                      </h4>
                      <span className="text-stone-500 font-mono text-[10px]">
                        {m.kannadaName}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                      {m.taluk} Taluk
                    </span>
                  </div>

                  <p className="text-stone-600 leading-relaxed text-[11px]">
                    {m.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded border border-stone-200/60">
                    <div>
                      <strong className="text-stone-800">Era & Ruler:</strong>{" "}
                      <span>{m.era}</span>
                    </div>
                    <div>
                      <strong className="text-stone-800">Timings:</strong>{" "}
                      <span>{m.timings}</span>
                    </div>
                    <div className="col-span-2">
                      <strong className="text-stone-800">Entry Fee:</strong>{" "}
                      <span>{m.entryFee}</span>
                    </div>
                  </div>

                  {/* Terrain Reality Callout */}
                  <div className="bg-amber-50/70 p-2.5 rounded border border-amber-200/80 text-[11px] text-stone-800">
                    <strong className="text-amber-900 block mb-0.5 flex items-center gap-1">
                      <Footprints className="w-3 h-3 text-amber-700" />
                      Terrain Reality & Step Fact:
                    </strong>
                    {m.stepCountFact}
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="pt-1 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedMonument(m);
                        setActiveSubTab("health_check");
                      }}
                      className="text-amber-800 hover:text-amber-900 font-medium text-[11px] flex items-center gap-1"
                    >
                      <ScanEye className="w-3.5 h-3.5" />
                      <span>Inspect in Health Lab</span>
                    </button>

                    {m.inscriptionSpotlight && (
                      <button
                        onClick={() => {
                          setSelectedMonument(m);
                          setActiveSubTab("epigraphy");
                        }}
                        className="text-stone-700 hover:text-stone-900 font-medium text-[11px] flex items-center gap-1"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                        <span>View 578 CE Epigraphy</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
