"use client";

import React, { useState, useMemo } from "react";
import {
  RECENT_WATER_READINGS,
  WATER_REFILL_POINTS,
  LITTER_HOTSPOTS,
  CROWD_FORECAST_DATA,
  CIVIC_LAUNDRY_PROPOSAL_SPEC,
  WaterQualityReading,
  RefillPoint,
  LitterHotspot,
  CrowdForecastSlot,
} from "@/lib/data/sustainability";
import {
  Droplets,
  AlertTriangle,
  Trash2,
  Users,
  Compass,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  TrendingDown,
  ShieldAlert,
  Flame,
  FileText,
  Sliders,
  Award,
  Layers,
  Phone,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkle,
  Sun,
  Activity,
  Check,
} from "lucide-react";

interface Phase5SustainabilityProps {
  onEscalateToLedger?: (
    defectSummary: string,
    monumentName: string,
    directIssue?: any
  ) => void;
}

export const Phase5Sustainability: React.FC<Phase5SustainabilityProps> = ({
  onEscalateToLedger,
}) => {
  // Master Tab State: 'drought-agastya' | 'civic-laundry' | 'refill-kiosks' | 'clean-trail' | 'crowd-forecast'
  const [activeTab, setActiveTab] = useState<
    "drought-agastya" | "civic-laundry" | "refill-kiosks" | "clean-trail" | "crowd-forecast"
  >("drought-agastya");

  // ===================== TAB 1: DROUGHT & AGASTYA TELEMETRY =====================
  const [selectedReadingIndex, setSelectedReadingIndex] = useState(0);
  const currentReading = RECENT_WATER_READINGS[selectedReadingIndex];

  // ===================== TAB 2: CIVIC LAUNDRY PROPOSAL =====================
  const [isEndorsementModalOpen, setIsEndorsementModalOpen] = useState(false);
  const [endorserName, setEndorserName] = useState("");
  const [endorserRole, setEndorserRole] = useState("Conscious Visitor / Citizen");
  const [endorsementCertificate, setEndorsementCertificate] = useState<any>(null);
  const [hasEscalatedToLedger, setHasEscalatedToLedger] = useState(false);

  // ===================== TAB 3: WATER REFILL KIOSKS =====================
  const [selectedTalukRefillFilter, setSelectedTalukRefillFilter] = useState<"ALL" | "Badami" | "Hungund">("ALL");
  const [totalBottlesSavedSession, setTotalBottlesSavedSession] = useState(2350);
  const [refillLoggedKioskId, setRefillLoggedKioskId] = useState<string | null>(null);

  // Kiosk Issue Modal State
  const [isKioskIssueModalOpen, setIsKioskIssueModalOpen] = useState(false);
  const [reportedKiosk, setReportedKiosk] = useState<RefillPoint | null>(null);
  const [kioskIssueNote, setKioskIssueNote] = useState("Filter maintenance light glowing or low water pressure");
  const [kioskReportSuccess, setKioskReportSuccess] = useState(false);

  // ===================== TAB 4: CLEAN TRAIL & BEFORE/AFTER =====================
  const [hotspotsList, setHotspotsList] = useState<LitterHotspot[]>(LITTER_HOTSPOTS);
  const [activePhotoToggle, setActivePhotoToggle] = useState<{ [key: string]: "before" | "after" }>({
    "lh-01": "before",
    "lh-02": "before",
    "lh-03": "after",
    "lh-04": "after",
  });

  // Volunteer Cleanup Modal State
  const [isCleanupModalOpen, setIsCleanupModalOpen] = useState(false);
  const [selectedHotspotForCleanup, setSelectedHotspotForCleanup] = useState<LitterHotspot | null>(null);
  const [volunteerName, setVolunteerName] = useState("");
  const [kgCollectedInput, setKgCollectedInput] = useState(14);
  const [cleanupSuccessCertificate, setCleanupSuccessCertificate] = useState<any>(null);

  // ===================== TAB 5: CROWD FORECAST & CIRCUIT OPTIMIZER =====================
  const [selectedDayTypeFilter, setSelectedDayTypeFilter] = useState<
    "ALL" | "Weekday" | "Weekend" | "Banashankari Jatre / Festival Rush"
  >("ALL");
  const [circuitOptimizerModalOpen, setCircuitOptimizerModalOpen] = useState(false);
  const [plannedMonuments, setPlannedMonuments] = useState<string[]>([
    "Pattadakal World Heritage Complex",
    "Badami Cave Temples (1 to 4)",
    "Bhutanatha Temple Complex (Agastya East Flank)",
  ]);
  const [optimizedPlan, setOptimizedPlan] = useState<any>(null);

  // Filtered Refill Points
  const filteredRefillPoints = useMemo(() => {
    if (selectedTalukRefillFilter === "ALL") return WATER_REFILL_POINTS;
    return WATER_REFILL_POINTS.filter((p) => p.taluk === selectedTalukRefillFilter);
  }, [selectedTalukRefillFilter]);

  // Filtered Crowd Slots
  const filteredCrowdSlots = useMemo(() => {
    if (selectedDayTypeFilter === "ALL") return CROWD_FORECAST_DATA;
    return CROWD_FORECAST_DATA.filter((s) => s.dayType === selectedDayTypeFilter);
  }, [selectedDayTypeFilter]);

  // Handle Log Bottle Refill
  const handleLogRefill = (kioskId: string) => {
    setTotalBottlesSavedSession((prev) => prev + 1);
    setRefillLoggedKioskId(kioskId);
    setTimeout(() => setRefillLoggedKioskId(null), 3000);
  };

  // Handle Photo Toggle
  const togglePhotoView = (id: string) => {
    setActivePhotoToggle((prev) => ({
      ...prev,
      [id]: prev[id] === "before" ? "after" : "before",
    }));
  };

  // Handle Submitting Civic Laundry Endorsement
  const handleConfirmEndorsement = () => {
    const cert = {
      id: `VTP-CIV-LAUNDRY-${Math.floor(1000 + Math.random() * 9000)}`,
      name: endorserName || "Concerned Heritage Visitor",
      role: endorserRole,
      date: "September 24, 2026",
      taluk: "Badami",
    };
    setEndorsementCertificate(cert);
  };

  // Handle Escalating Civic Laundry to Phase 1 Ledger
  const handleEscalateLaundryToLedger = () => {
    if (onEscalateToLedger) {
      const laundryIssue = {
        id: `civic-laundry-${Date.now()}`,
        trackingNumber: `VTP-2026-TMC-${Math.floor(100 + Math.random() * 900)}`,
        title: "Agastya Lake Sandstone Steps Detergent Erosion & Civic Laundry Platform Requisition",
        description: "Severe drought (41% reservoir capacity) compounded by direct laundry washing on 7th-century sandstone steps. Requisition submitted for decentralized 16-basin municipal washing deck with phytoremediation greywater filtration.",
        monument: "Agastya Tirtha & Bhutanatha Basin",
        taluk: "Badami",
        jurisdiction: "State Tourism / Local Taluk",
        resolutionLane: "Community / CSR Fix",
        severity: "High",
        status: "In Review",
        slaCountdownDays: 14,
        reportedBy: endorserName || "Citizen Alliance for Agastya Preservation",
        photos: [
          "https://picsum.photos/seed/agastya-lake/600/400",
          "https://picsum.photos/seed/civic-deck/600/400"
        ],
        duplicateOfId: null,
      };
      onEscalateToLedger(
        "Agastya Lake Sandstone Steps Detergent Erosion & Civic Laundry Requisition",
        "Agastya Tirtha & Bhutanatha Basin",
        laundryIssue
      );
    }
    setHasEscalatedToLedger(true);
  };

  // Handle Submitting Volunteer Cleanup Pass
  const handleCompleteCleanupPass = () => {
    if (!selectedHotspotForCleanup) return;
    const certId = `VTP-CLEAN-${Math.floor(1000 + Math.random() * 9000)}`;

    // Update hotspots list state
    setHotspotsList((prev) =>
      prev.map((h) => {
        if (h.id === selectedHotspotForCleanup.id) {
          return {
            ...h,
            status: "Cleaned & Verified",
            totalKgCollectedToDate: h.totalKgCollectedToDate + kgCollectedInput,
            cleanTrailVolunteersAssigned: h.cleanTrailVolunteersAssigned + 1,
            lastCleanedDate: "2026-09-24",
          };
        }
        return h;
      })
    );

    setActivePhotoToggle((prev) => ({
      ...prev,
      [selectedHotspotForCleanup.id]: "after",
    }));

    setCleanupSuccessCertificate({
      id: certId,
      name: volunteerName || "Clean Trail Volunteer",
      kg: kgCollectedInput,
      location: selectedHotspotForCleanup.location,
    });
  };

  // Handle Circuit Optimization
  const handleRunCircuitOptimizer = () => {
    setOptimizedPlan({
      title: "Heat & Crowd Resilient Chalukyan Day Circuit",
      dateType: "Weekday / Low Rush Protocol",
      totalCrowdScore: "Low Density (84% Queue Avoidance)",
      itinerary: [
        {
          time: "06:30 AM – 08:30 AM",
          monument: "Pattadakal World Heritage Complex",
          status: "Quiet (Golden Slot)",
          temperature: "22°C (Cool River Breeze)",
          strategicReason: "Virupaksha and Mallikarjuna stone carvings catch low-angle morning golden hour; zero tour bus traffic.",
        },
        {
          time: "09:15 AM – 11:30 AM",
          monument: "Badami Cave Temples (1 to 4)",
          status: "Moderate Footfall",
          temperature: "29°C (Sandstone warming)",
          strategicReason: "Climb the 320 rock steps before vertical canyon walls reflect afternoon 39°C scorching heat.",
        },
        {
          time: "12:15 PM – 02:00 PM",
          monument: "Mahakuta Temple Grove or Air-Conditioned Museum",
          status: "Quiet / Shaded Refuge",
          temperature: "24°C in dense canopy",
          strategicReason: "Cool pushkarini spring grove shields from peak noon heat while having traditional Satvik lunch.",
        },
        {
          time: "05:00 PM – 06:45 PM",
          monument: "Bhutanatha Temple Complex (Agastya East Flank)",
          status: "Moderate Sunset Slot",
          temperature: "27°C",
          strategicReason: "Pristine reflections across Agastya Lake as the sun sets behind Badami North Fort.",
        },
      ],
    });
  };

  return (
    <div className="space-y-8">
      {/* SECTION BANNER */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-stone-100 rounded-xl p-6 sm:p-8 shadow-sm relative overflow-hidden border border-stone-800">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-[11px] font-semibold tracking-wider uppercase border border-amber-500/30">
            <Droplets className="w-3.5 h-3.5 text-cyan-400" />
            <span>Phase 05 · Sustainable Planning</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
            Water-Smart Agastya, Clean Trail & Crowd Dispersal
          </h2>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-3xl">
            On <strong className="text-amber-300 font-medium">17 September 2026</strong>, the Government of Karnataka officially notified severe drought across Bagalkote District following an <strong>89% rainfall deficit</strong> in the Malaprabha basin. Vatapi aligns tourism with ecological reality through 7th-century Agastya Lake hydrology telemetry, a municipal laundry diversion deck, free RO refill kiosks to replace plastic bottles, and crowd forecasting.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs border-t border-stone-700/60 font-mono">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">State Drought Alert</span>
              <strong className="text-red-400">Sept 17, 2026 Notified</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Agastya Storage</span>
              <strong className="text-amber-300">41% Capacity (168 ML)</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Plastic Eliminated</span>
              <strong className="text-emerald-400">~2,350 Bottles/Day</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Greywater Deck</span>
              <strong className="text-cyan-300">16-Basin Phytoremediation</strong>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELY DROUGHT NOTIFICATION RIBBON */}
      <div className="bg-red-50/90 border border-red-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3.5 text-xs text-red-950">
        <ShieldAlert className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-serif font-bold text-red-900 text-sm">
              Official State Drought Declaration · Government Notification No. RD-DM-BGL-2026-88
            </span>
            <span className="font-mono text-[11px] text-red-800 bg-red-100 px-2 py-0.5 rounded border border-red-300 font-semibold">
              89% Malaprabha Basin Deficit
            </span>
          </div>
          <p className="leading-relaxed text-red-800 text-xs">
            Upper catchment inflows from the Western Ghats (Khanapur hills) have stalled. The 7th-century artificial reservoir of Agastya Tirtha is recording its lowest post-monsoon storage in 14 years. To safeguard drinking supply and protect submerged Chalukyan bas-reliefs from detergent salt crystallization, non-essential water consumption must be halted and tourists must use certified refill stations.
          </p>
        </div>
      </div>

      {/* MASTER FIVE-TAB NAVIGATION BAR */}
      <div className="flex border-b border-stone-300 bg-stone-100 p-1 rounded-lg overflow-x-auto">
        <button
          onClick={() => setActiveTab("drought-agastya")}
          className={`flex-1 min-w-[140px] py-2.5 px-2 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "drought-agastya"
              ? "bg-white text-stone-900 shadow-xs border border-stone-200"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
          }`}
        >
          <Droplets className="w-3.5 h-3.5 text-cyan-600" />
          <span>Agastya Hydrology</span>
        </button>

        <button
          onClick={() => setActiveTab("civic-laundry")}
          className={`flex-1 min-w-[140px] py-2.5 px-2 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "civic-laundry"
              ? "bg-white text-stone-900 shadow-xs border border-stone-200"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-amber-800" />
          <span>Civic Laundry Deck</span>
        </button>

        <button
          onClick={() => setActiveTab("refill-kiosks")}
          className={`flex-1 min-w-[140px] py-2.5 px-2 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "refill-kiosks"
              ? "bg-white text-stone-900 shadow-xs border border-stone-200"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5 text-emerald-700" />
          <span>Water Refill Kiosks</span>
        </button>

        <button
          onClick={() => setActiveTab("clean-trail")}
          className={`flex-1 min-w-[140px] py-2.5 px-2 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "clean-trail"
              ? "bg-white text-stone-900 shadow-xs border border-stone-200"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
          }`}
        >
          <Trash2 className="w-3.5 h-3.5 text-rose-700" />
          <span>Clean Trail Hotspots</span>
        </button>

        <button
          onClick={() => setActiveTab("crowd-forecast")}
          className={`flex-1 min-w-[140px] py-2.5 px-2 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "crowd-forecast"
              ? "bg-white text-stone-900 shadow-xs border border-stone-200"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
          }`}
        >
          <Users className="w-3.5 h-3.5 text-indigo-700" />
          <span>Crowd Forecast & Optimizer</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: DROUGHT RESPONSE & AGASTYA HYDROLOGICAL TELEMETRY                  */}
      {/* ========================================================================= */}
      {activeTab === "drought-agastya" && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 space-y-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-700" />
                  <h3 className="font-serif font-bold text-stone-900 text-lg">
                    Agastya Tirtha Hydrological Telemetry & Drought Depletion Curve
                  </h3>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  Live sensor log from Badami Minor Irrigation Sub-Division and Archaeological Survey of India.
                </p>
              </div>

              {/* Date selector tabs */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono text-stone-500">Inspection Date:</span>
                <div className="flex gap-1">
                  {RECENT_WATER_READINGS.map((reading, idx) => (
                    <button
                      key={reading.date}
                      onClick={() => setSelectedReadingIndex(idx)}
                      className={`px-2.5 py-1 text-xs rounded font-mono font-medium transition-colors ${
                        selectedReadingIndex === idx
                          ? "bg-stone-900 text-white shadow-xs"
                          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                      }`}
                    >
                      {reading.date}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Telemetry Gauges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono text-stone-500 uppercase block">Reservoir Level</span>
                <div className="flex items-baseline gap-1">
                  <strong className="text-red-700 text-xl font-mono">{currentReading.waterLevelPct}%</strong>
                  <span className="text-[10px] text-stone-500">Capacity</span>
                </div>
                <span className="text-[10px] text-stone-600 block">{currentReading.capacityMillionLiters} ML of 410 ML</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono text-stone-500 uppercase block">Water Turbidity</span>
                <div className="flex items-baseline gap-1">
                  <strong className="text-amber-800 text-xl font-mono">{currentReading.turbidityNTU}</strong>
                  <span className="text-[10px] text-stone-500">NTU</span>
                </div>
                <span className="text-[10px] text-stone-500 block">Permissible: &lt; 5 NTU</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono text-stone-500 uppercase block">Dissolved Oxygen</span>
                <div className="flex items-baseline gap-1">
                  <strong className="text-cyan-800 text-xl font-mono">{currentReading.dissolvedOxygenMgL}</strong>
                  <span className="text-[10px] text-stone-500">mg/L</span>
                </div>
                <span className="text-[10px] text-stone-500 block">Critical: &lt; 4.0 mg/L</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono text-stone-500 uppercase block">Water pH (Alkalinity)</span>
                <div className="flex items-baseline gap-1">
                  <strong className="text-stone-900 text-xl font-mono">{currentReading.phLevel}</strong>
                  <span className="text-[10px] text-stone-500">pH</span>
                </div>
                <span className="text-[10px] text-rose-700 block">High from Soap Runoff</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono text-stone-500 uppercase block">Phosphate Level</span>
                <div className="flex items-baseline gap-1">
                  <strong className="text-amber-900 text-xl font-mono">{currentReading.phosphateLevelMgL}</strong>
                  <span className="text-[10px] text-stone-500">mg/L</span>
                </div>
                <span className="text-[10px] text-stone-500 block">Safe Limit: &lt; 0.1 mg/L</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono text-stone-500 uppercase block">Live Inflow Rate</span>
                <div className="flex items-baseline gap-1">
                  <strong className="text-red-700 text-xl font-mono">{currentReading.inflowRateLps}</strong>
                  <span className="text-[10px] text-stone-500">L/s</span>
                </div>
                <span className="text-[10px] text-stone-500 block">Monsoon Avg: 85 L/s</span>
              </div>
            </div>

            {/* Reading Context & Recommended Action */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-200 space-y-1">
                <strong className="text-stone-900 font-serif block text-sm">
                  Catchment & Reservoir Status Note:
                </strong>
                <p className="text-stone-700 leading-relaxed">{currentReading.notes}</p>
                <div className="text-[11px] font-mono text-red-800 pt-1 font-semibold">
                  Status: {currentReading.droughtStatus}
                </div>
              </div>

              <div className="bg-amber-50/70 p-3.5 rounded-lg border border-amber-200 space-y-1">
                <strong className="text-amber-950 font-serif block text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-800" />
                  <span>Immediate Inter-Departmental Directive:</span>
                </strong>
                <p className="text-stone-700 leading-relaxed">{currentReading.recommendedAction}</p>
                <div className="text-[11px] text-stone-500 pt-1">
                  Coordinated by: ASI Dharwad Circle, Minor Irrigation & Badami TMC.
                </div>
              </div>
            </div>

            {/* Reservoir Depletion Progress Bar */}
            <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs">
              <div className="flex justify-between text-stone-600 font-mono text-[11px]">
                <span>Agastya Lake Water Storage (Current vs Normal Full Level):</span>
                <span className="font-bold text-red-700">41% (Deficit: 59%)</span>
              </div>
              <div className="w-full bg-stone-200 h-3 rounded-full overflow-hidden flex">
                <div style={{ width: "41%" }} className="bg-gradient-to-r from-red-600 to-amber-500 h-full" />
                <div style={{ width: "59%" }} className="bg-stone-200 h-full" />
              </div>
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>0 ML (Dead Storage)</span>
                <span>168 ML (Current Level)</span>
                <span>410 ML (Maximum Spillway Crest)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CIVIC LAUNDRY PLATFORM PROPOSAL                                    */}
      {/* ========================================================================= */}
      {activeTab === "civic-laundry" && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-6 shadow-xs">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-200 pb-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-800 uppercase tracking-wide">
                  <Layers className="w-4 h-4 text-amber-800" />
                  <span>Ecological Civic Engineering · CSR Solution</span>
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-xl mt-1">
                  Civic Laundry Platform Proposal: Diverting Detergent Runoff from Agastya Steps
                </h3>
                <p className="text-xs text-stone-600 max-w-3xl mt-1 leading-relaxed">
                  Local washerfolk (Madivala community) and residents wash clothes along Agastya Lake&apos;s 7th-century sandstone steps not out of disregard, but because Badami Town Municipal Council has never constructed a piped washing deck. Vatapi proposes a decentralized municipal washing facility with greywater filtration 220 meters downstream.
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-lg text-xs font-mono text-stone-700">
                Project Code: <span className="font-bold text-stone-900">{CIVIC_LAUNDRY_PROPOSAL_SPEC.projectNumber}</span>
              </div>
            </div>

            {/* Engineering Specifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
                <span className="font-serif font-bold text-stone-900 text-sm block">
                  1. Civil Architecture & Ergonomic Specifications:
                </span>
                <ul className="space-y-2 text-stone-700">
                  {CIVIC_LAUNDRY_PROPOSAL_SPEC.engineeringSpecs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
                <span className="font-serif font-bold text-stone-900 text-sm block">
                  2. Three-Stage Phytoremediation Greywater Filtration:
                </span>
                <div className="space-y-2 text-stone-700">
                  <div className="bg-white p-2.5 rounded border border-stone-200">
                    <strong className="text-stone-900 block text-[11px]">Stage 1: Primary Grease & Lint Trap</strong>
                    <span className="text-[11px] text-stone-600">Perforated mesh baskets with coconut coir baffle plates to catch synthetic fabric micro-fibers.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-stone-200">
                    <strong className="text-stone-900 block text-[11px]">Stage 2: Horizontal Subsurface Wetland (Reed Bed)</strong>
                    <span className="text-[11px] text-stone-600">Gravel beds planted with native wetland reeds (Canna & Typha) absorbing dissolved phosphates and nitrogen.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-stone-200">
                    <strong className="text-stone-900 block text-[11px]">Stage 3: Solar Sand-Charcoal Polishing</strong>
                    <span className="text-[11px] text-stone-600">Granular activated charcoal bed that clarifies surfactant cloudiness before discharging treated water to farm culverts.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget & Funding Model */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/80 pb-2">
                <span className="font-serif font-bold text-amber-950 text-sm">
                  Budget Structure: ₹24.50 Lakhs (JSW Hampi CSR Precedent)
                </span>
                <span className="text-[11px] font-mono text-amber-900 font-semibold">
                  Resolution Lane: Community / CSR Fix
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded border border-amber-200">
                  <span className="text-[10px] font-mono text-stone-500 uppercase block">Badami TMC Municipal Grant</span>
                  <strong className="text-stone-900 text-base font-mono">₹10,00,000</strong>
                  <span className="text-[10px] text-stone-500 block">Sanitation & Urban Infra Head</span>
                </div>
                <div className="bg-white p-3 rounded border border-amber-200">
                  <span className="text-[10px] font-mono text-stone-500 uppercase block">Corporate CSR Match (JSW / Dalmia)</span>
                  <strong className="text-amber-900 text-base font-mono">₹12,00,000</strong>
                  <span className="text-[10px] text-stone-500 block">Heritage Conservation Grant</span>
                </div>
                <div className="bg-white p-3 rounded border border-amber-200">
                  <span className="text-[10px] font-mono text-stone-500 uppercase block">Washer Community Co-Op Equity</span>
                  <strong className="text-emerald-800 text-base font-mono">₹2,50,000</strong>
                  <span className="text-[10px] text-stone-500 block">Sweat Equity & Maintenance Pool</span>
                </div>
              </div>
              <p className="text-[11px] text-stone-600 pt-1 leading-relaxed">
                <strong>Projected Impact:</strong> {CIVIC_LAUNDRY_PROPOSAL_SPEC.projectedEcologicalImpact}
              </p>
            </div>

            {/* Action Bar: Endorsement & Ledger Escalation */}
            <div className="pt-2 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-stone-500">
                Endorsed by 48 local washer households and 320 heritage visitors this season.
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsEndorsementModalOpen(true)}
                  className="bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Sign Public Endorsement</span>
                </button>

                <button
                  onClick={handleEscalateLaundryToLedger}
                  disabled={hasEscalatedToLedger}
                  className="bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{hasEscalatedToLedger ? "Submitted to Civic Ledger ✓" : "Escalate to Phase 1 Ledger"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: FREE RO WATER REFILL KIOSKS                                        */}
      {/* ========================================================================= */}
      {activeTab === "refill-kiosks" && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-serif font-bold text-stone-900 text-lg">
                    Free RO Water Refill Kiosks Directory (Zero Single-Use Plastic Bottle Trail)
                  </h3>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  Free, certified potable water refill stations across Badami, Pattadakal, Aihole, and Mahakuta to eliminate discarded plastic bottles.
                </p>
              </div>

              {/* Real-time Plastic Counter Badge */}
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-950 px-3.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>
                  Estimated Savings Today: <strong>~{totalBottlesSavedSession} Bottles</strong>
                </span>
              </div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 font-mono">Taluk Filter:</span>
              {(["ALL", "Badami", "Hungund"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTalukRefillFilter(t)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    selectedTalukRefillFilter === t
                      ? "bg-amber-900 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {t === "ALL" ? "All Kiosks" : `${t} Taluk`}
                </button>
              ))}
            </div>

            {/* Kiosks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRefillPoints.map((kiosk) => (
                <div
                  key={kiosk.id}
                  className="bg-white border border-stone-200 rounded-xl p-4 space-y-3 hover:border-emerald-700/50 hover:shadow-xs transition-all flex flex-col justify-between text-xs"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-2">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                          {kiosk.status}
                        </span>
                        <h4 className="font-serif font-bold text-stone-900 text-sm mt-1">
                          {kiosk.name}
                        </h4>
                        <div className="text-[11px] text-stone-500 font-sans">
                          {kiosk.kannadaName}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono text-stone-400 block uppercase">TDS Level</span>
                        <strong className="font-mono text-stone-900 text-sm">{kiosk.tdsPpm} PPM</strong>
                      </div>
                    </div>

                    <div className="space-y-1 text-stone-600 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{kiosk.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{kiosk.monumentProximity}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                        <span>{kiosk.waterSource}</span>
                      </div>
                    </div>

                    <div className="bg-stone-50 p-2 rounded border border-stone-100 text-[11px] flex justify-between items-center">
                      <span className="text-stone-500">Chilled Water Tap:</span>
                      <strong className={kiosk.chilledAvailable ? "text-cyan-800" : "text-stone-600"}>
                        {kiosk.chilledAvailable ? "Yes (Solar Powered)" : "Ambient (Clay Pot Chhatra)"}
                      </strong>
                    </div>

                    <div className="text-[11px] text-emerald-900 font-mono font-medium">
                      ~{kiosk.singleUsePlasticBottlesSavedDaily} PET bottles avoided daily
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleLogRefill(kiosk.id)}
                      className="bg-emerald-800 hover:bg-emerald-700 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{refillLoggedKioskId === kiosk.id ? "Logged! ✓" : "Log Refill (+1)"}</span>
                    </button>

                    <button
                      onClick={() => {
                        setReportedKiosk(kiosk);
                        setIsKioskIssueModalOpen(true);
                      }}
                      className="text-stone-500 hover:text-stone-800 text-[11px] underline"
                    >
                      Report Issue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: CLEAN TRAIL & BEFORE/AFTER PHOTO VERIFICATION                      */}
      {/* ========================================================================= */}
      {activeTab === "clean-trail" && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4 text-rose-700" />
                  <h3 className="font-serif font-bold text-stone-900 text-lg">
                    Clean Trail: Hotspot Mapping & Photographic Proof Verification
                  </h3>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  Active sanitation patrols, volunteer garbage hauls, and before-and-after photo verification ledger.
                </p>
              </div>

              <div className="text-xs font-mono text-stone-500">
                Coordinated with Taluk Panchayats & Local Hiking Clubs
              </div>
            </div>

            {/* Hotspots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              {hotspotsList.map((spot) => (
                <div
                  key={spot.id}
                  className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-4 hover:border-stone-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2 border-b border-stone-200/80 pb-2">
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono mb-1">
                          <span
                            className={`px-2 py-0.5 rounded font-semibold ${
                              spot.status.includes("Cleaned")
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {spot.status}
                          </span>
                          <span className="text-stone-500 font-semibold">{spot.severity} Severity</span>
                        </div>
                        <h4 className="font-serif font-bold text-stone-900 text-base">
                          {spot.location}
                        </h4>
                        <div className="text-[11px] text-stone-500 font-sans">
                          {spot.kannadaLocation}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono text-stone-400 block uppercase">Collected</span>
                        <strong className="font-mono text-stone-900 text-sm">{spot.totalKgCollectedToDate} kg</strong>
                      </div>
                    </div>

                    <div className="text-[11px] text-stone-600 space-y-1">
                      <div><strong>Proximity:</strong> {spot.monumentProximity}</div>
                      <div><strong>Litter types:</strong> {spot.litterTypes.join(", ")}</div>
                      <div><strong>Root Cause:</strong> {spot.hotspotOriginCause}</div>
                    </div>

                    {/* Interactive Before vs After Photo Card Toggle */}
                    <div className="bg-white p-3 rounded-lg border border-stone-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-stone-500 uppercase font-semibold">
                          Photographic Evidence Verification:
                        </span>
                        <button
                          onClick={() => togglePhotoView(spot.id)}
                          className="text-[11px] text-amber-900 hover:text-amber-800 font-semibold flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
                        >
                          <span>Toggle View: {activePhotoToggle[spot.id] === "before" ? "View After Cleanup" : "View Before Cleanup"}</span>
                        </button>
                      </div>

                      <div
                        className={`p-3 rounded text-xs leading-relaxed border ${
                          activePhotoToggle[spot.id] === "before"
                            ? "bg-rose-50/70 border-rose-200 text-rose-950"
                            : "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                        }`}
                      >
                        <strong className="block text-[11px] uppercase tracking-wide mb-1 font-mono">
                          {activePhotoToggle[spot.id] === "before" ? "🚨 Pre-Cleanup Evidence:" : "✨ Post-Cleanup Verification:"}
                        </strong>
                        <p>
                          {activePhotoToggle[spot.id] === "before"
                            ? spot.beforePhotoDescription
                            : spot.afterPhotoDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-stone-500">
                      {spot.cleanTrailVolunteersAssigned} Volunteers Assigned
                    </span>

                    <button
                      onClick={() => {
                        setSelectedHotspotForCleanup(spot);
                        setIsCleanupModalOpen(true);
                      }}
                      className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-300" />
                      <span>Log Cleanup Pass</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: CROWD FORECASTING & LOW-DENSITY CIRCUIT OPTIMIZER                   */}
      {/* ========================================================================= */}
      {activeTab === "crowd-forecast" && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-700" />
                  <h3 className="font-serif font-bold text-stone-900 text-lg">
                    Crowd Density Forecasting & Heat Dispersal Optimizer
                  </h3>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  Avoid grueling bottlenecks, extreme afternoon sandstone heat, and festival pilgrim stampedes.
                </p>
              </div>

              {/* Day filter */}
              <div className="flex items-center gap-1 text-xs">
                <span className="text-stone-500 font-mono">Day Filter:</span>
                {(["ALL", "Weekday", "Weekend", "Banashankari Jatre / Festival Rush"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDayTypeFilter(d)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      selectedDayTypeFilter === d
                        ? "bg-stone-900 text-white"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    {d === "ALL" ? "All Scenarios" : d.split(" / ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Contrast Box: Banashankari Jatre vs Pattadakal 7 AM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-rose-950 text-sm">
                    Banashankari Annual Jatre Rush (Pausha Month)
                  </span>
                  <span className="text-[10px] font-mono bg-rose-200 text-rose-900 px-2 py-0.5 rounded font-bold">
                    Extreme Rush (150k+ Pilgrims)
                  </span>
                </div>
                <p className="text-stone-700 leading-relaxed text-xs">
                  Massive congregation around Haridra Tirtha holy pushkarini. High risk of gridlock on the Badami-Ilkal arterial road. Private autos charge 3x surge fares. Recommended protocol: early morning darshan before 6:30 AM or visit alternative cave sanctuaries.
                </p>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-emerald-950 text-sm">
                    Pattadakal 06:30 AM – 08:30 AM (Golden Slot)
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold">
                    Quiet (Zero Queues)
                  </span>
                </div>
                <p className="text-stone-700 leading-relaxed text-xs">
                  The ultimate slot for architectural epigraphers, photographers, and slow travelers. Low sun angle casts sharp shadows over 8th-century Nagara and Dravida temple towers with cool Malaprabha river breeze at 22°C.
                </p>
              </div>
            </div>

            {/* Crowd Forecast Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {filteredCrowdSlots.map((slot) => (
                <div
                  key={slot.id}
                  className="bg-white border border-stone-200 rounded-xl p-4 space-y-3 hover:border-indigo-400 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-2">
                      <div>
                        <span className="text-[10px] font-mono text-stone-500 uppercase block">
                          {slot.dayType}
                        </span>
                        <h4 className="font-serif font-bold text-stone-900 text-sm mt-0.5">
                          {slot.monumentName}
                        </h4>
                      </div>

                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold shrink-0 ${
                          slot.density.includes("Quiet")
                            ? "bg-emerald-100 text-emerald-800"
                            : slot.density.includes("Moderate")
                            ? "bg-amber-100 text-amber-900"
                            : "bg-rose-100 text-rose-900"
                        }`}
                      >
                        {slot.density}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-stone-50 p-2 rounded">
                      <div>Time: <strong className="font-mono text-stone-800">{slot.timeWindow}</strong></div>
                      <div>Heat: <strong className="font-mono text-stone-800">{slot.heatIndexCelsius}°C</strong></div>
                      <div>Footfall: <strong className="font-mono text-stone-800">~{slot.hourlyFootfallEst}/hr</strong></div>
                      <div>Photo: <strong className="text-indigo-800">{slot.photographyRating}</strong></div>
                    </div>

                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      {slot.recommendation}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 text-[10px] text-stone-500">
                    <span className="font-semibold text-stone-700">Alternate if crowded:</span>{" "}
                    {slot.idealAlternateMonument}
                  </div>
                </div>
              ))}
            </div>

            {/* Run Optimizer Trigger */}
            <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-5 space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="font-serif font-bold text-indigo-950 text-base">
                    Smart Crowd & Heat Circuit Optimizer
                  </h4>
                  <p className="text-stone-600 text-xs">
                    Input your desired monuments to generate a customized, heat-safe itinerary that avoids peak queues.
                  </p>
                </div>

                <button
                  onClick={handleRunCircuitOptimizer}
                  className="bg-indigo-900 hover:bg-indigo-800 text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Compute Low-Crowd Circuit</span>
                </button>
              </div>

              {optimizedPlan && (
                <div className="bg-white border border-indigo-200 rounded-lg p-4 space-y-3 mt-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2">
                    <strong className="font-serif text-stone-900 text-sm">
                      {optimizedPlan.title}
                    </strong>
                    <span className="font-mono text-emerald-800 text-xs font-semibold">
                      {optimizedPlan.totalCrowdScore}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {optimizedPlan.itinerary.map((step: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-stone-50 p-2.5 rounded border border-stone-200/70 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="space-y-0.5">
                          <span className="font-mono font-bold text-indigo-950 block">{step.time}</span>
                          <strong className="text-stone-900">{step.monument}</strong>
                          <p className="text-[11px] text-stone-600">{step.strategicReason}</p>
                        </div>
                        <div className="text-right sm:shrink-0 text-[11px] font-mono">
                          <span className="text-emerald-800 font-semibold block">{step.status}</span>
                          <span className="text-stone-500">{step.temperature}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: PUBLIC CIVIC LAUNDRY ENDORSEMENT                                 */}
      {/* ========================================================================= */}
      {isEndorsementModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200 text-xs">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[11px] font-mono text-amber-800 uppercase font-semibold">
                  Citizen Public Endorsement
                </span>
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  Agastya Lake Greywater Laundry Facility
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsEndorsementModalOpen(false);
                  setEndorsementCertificate(null);
                }}
                className="text-stone-400 hover:text-stone-700 text-lg"
              >
                ✕
              </button>
            </div>

            {endorsementCertificate ? (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Public Endorsement Logged!</span>
                  </div>
                  <div className="font-mono text-stone-800 space-y-0.5">
                    <div>Endorsement ID: <strong>{endorsementCertificate.id}</strong></div>
                    <div>Signatory: {endorsementCertificate.name} ({endorsementCertificate.role})</div>
                    <div>Jurisdiction: Badami Town Municipal Council (TMC)</div>
                    <div>Legislator Requisition: MLA B. B. Chimmanakatti</div>
                  </div>
                  <p className="text-[11px] text-stone-600 pt-1 border-t border-emerald-200">
                    Your endorsement has been added to the public demand ledger to substantiate JSW Foundation CSR matching funds.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsEndorsementModalOpen(false);
                    setEndorsementCertificate(null);
                  }}
                  className="w-full bg-stone-900 text-white font-semibold py-2 rounded-lg"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Your Full Name:</label>
                  <input
                    type="text"
                    value={endorserName}
                    onChange={(e) => setEndorserName(e.target.value)}
                    placeholder="e.g. Dr. Ananya Deshmukh"
                    className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Affiliation / Capacity:</label>
                  <select
                    value={endorserRole}
                    onChange={(e) => setEndorserRole(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 text-xs"
                  >
                    <option value="Conscious Visitor / Citizen">Conscious Visitor / Citizen</option>
                    <option value="Heritage Architect / Researcher">Heritage Architect / Researcher</option>
                    <option value="Local Business Owner / Hotelier">Local Business Owner / Hotelier</option>
                    <option value="Madivala Community Ally">Madivala Community Ally</option>
                    <option value="College Student / Volunteer">College Student / Volunteer</option>
                  </select>
                </div>

                <div className="bg-stone-50 p-2.5 rounded border border-stone-200 text-[11px] text-stone-600 leading-relaxed">
                  I support allocating ₹10 Lakhs of Badami Municipal funds alongside ₹12 Lakhs of corporate CSR to construct a dedicated 16-basin wash deck with phytoremediation greywater filtration, diverting detergent pollution from Agastya Lake.
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                  <button
                    onClick={() => setIsEndorsementModalOpen(false)}
                    className="px-4 py-2 border border-stone-300 rounded text-stone-700 hover:bg-stone-100 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmEndorsement}
                    className="px-4 py-2 bg-amber-900 hover:bg-amber-800 text-white rounded font-semibold"
                  >
                    Record Endorsement
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: LOG VOLUNTEER CLEANUP PASS                                       */}
      {/* ========================================================================= */}
      {isCleanupModalOpen && selectedHotspotForCleanup && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200 text-xs">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[11px] font-mono text-rose-800 uppercase font-semibold">
                  Clean Trail Patrol Logging
                </span>
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  {selectedHotspotForCleanup.location}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsCleanupModalOpen(false);
                  setCleanupSuccessCertificate(null);
                }}
                className="text-stone-400 hover:text-stone-700 text-lg"
              >
                ✕
              </button>
            </div>

            {cleanupSuccessCertificate ? (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Cleanup Pass Verified!</span>
                  </div>
                  <div className="font-mono text-stone-800 space-y-0.5">
                    <div>Certificate ID: <strong>{cleanupSuccessCertificate.id}</strong></div>
                    <div>Volunteer Crew Lead: {cleanupSuccessCertificate.name}</div>
                    <div>Weight Removed: <strong>{cleanupSuccessCertificate.kg} kg</strong> of plastic & debris</div>
                    <div>Location: {cleanupSuccessCertificate.location}</div>
                  </div>
                  <p className="text-[11px] text-stone-600 pt-1 border-t border-emerald-200">
                    Before-and-after photo verification has been logged on the Taluk Panchayat supervisor dashboard.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsCleanupModalOpen(false);
                    setCleanupSuccessCertificate(null);
                  }}
                  className="w-full bg-stone-900 text-white font-semibold py-2 rounded-lg"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Volunteer Crew Lead / Name:</label>
                  <input
                    type="text"
                    value={volunteerName}
                    onChange={(e) => setVolunteerName(e.target.value)}
                    placeholder="e.g. Badami Youth Trekking Club"
                    className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Plastic / Waste Removed (Kilograms):</label>
                  <input
                    type="number"
                    value={kgCollectedInput}
                    onChange={(e) => setKgCollectedInput(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 text-xs"
                  />
                </div>

                <div className="bg-stone-50 p-2.5 rounded border border-stone-200 text-[11px] text-stone-600">
                  Photographic proof will be synchronized with the ASI sanitation log. Glass shards and metal bottle caps are routed to Bagalkote dry waste recycling centers.
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                  <button
                    onClick={() => setIsCleanupModalOpen(false)}
                    className="px-4 py-2 border border-stone-300 rounded text-stone-700 hover:bg-stone-100 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCompleteCleanupPass}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded font-semibold"
                  >
                    Submit Proof & Verify
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: REPORT KIOSK ISSUE                                               */}
      {/* ========================================================================= */}
      {isKioskIssueModalOpen && reportedKiosk && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200 text-xs">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[11px] font-mono text-amber-800 uppercase font-semibold">
                  Kiosk Maintenance Report
                </span>
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  {reportedKiosk.name}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsKioskIssueModalOpen(false);
                  setKioskReportSuccess(false);
                }}
                className="text-stone-400 hover:text-stone-700 text-lg"
              >
                ✕
              </button>
            </div>

            {kioskReportSuccess ? (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Report Dispatched to Health Inspector!</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    A service alert has been sent to {reportedKiosk.contactOfficer}. SLA for water kiosk repairs is 12 hours under the Bagalkote Drought Contingency Plan.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsKioskIssueModalOpen(false);
                    setKioskReportSuccess(false);
                  }}
                  className="w-full bg-stone-900 text-white font-semibold py-2 rounded-lg"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Issue Description:</label>
                  <textarea
                    value={kioskIssueNote}
                    onChange={(e) => setKioskIssueNote(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 text-xs"
                  />
                </div>

                <div className="bg-stone-50 p-2.5 rounded border border-stone-200 text-[11px] text-stone-600">
                  Responsible Officer: <strong>{reportedKiosk.contactOfficer}</strong>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                  <button
                    onClick={() => setIsKioskIssueModalOpen(false)}
                    className="px-4 py-2 border border-stone-300 rounded text-stone-700 hover:bg-stone-100 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setKioskReportSuccess(true)}
                    className="px-4 py-2 bg-amber-900 hover:bg-amber-800 text-white rounded font-semibold"
                  >
                    Dispatch Service Ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
