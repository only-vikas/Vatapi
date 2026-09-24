"use client";

import React, { useState, useMemo } from "react";
import {
  ARTISAN_COOPERATIVES,
  SCHOLARLY_CITATIONS,
  MOTIFS_DIRECTORY,
  AUTHENTICITY_TEST_GUIDE,
  ArtisanWeaver,
  MotifDetail,
} from "@/lib/data/artisans";
import {
  VERIFIED_EATERIES,
  DISH_HERITAGE_GUIDE,
  VerifiedEatery,
  DishCultureDetail,
} from "@/lib/data/food";
import {
  Shirt,
  UtensilsCrossed,
  Sparkles,
  BookOpen,
  Calendar,
  Phone,
  MapPin,
  CheckCircle2,
  Clock,
  Loader2,
  DollarSign,
  HeartHandshake,
  ShieldCheck,
  Flame,
  Award,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sliders,
  Share2,
  ExternalLink,
  Layers,
  Compass,
  FileText,
  UserCheck,
  Check,
  Copy,
  Info,
  Sparkle,
} from "lucide-react";

export const Phase4InclusiveGrowth: React.FC = () => {
  // Master Tab State: 'weavers' | 'ai-design' | 'ooru-oota'
  const [activeTab, setActiveTab] = useState<"weavers" | "ai-design" | "ooru-oota">("weavers");

  // ===================== WEAVER TAB STATE =====================
  const [selectedVillageFilter, setSelectedVillageFilter] = useState<"ALL" | "Guledgudda" | "Ilkal">("ALL");
  const [selectedWeaver, setSelectedWeaver] = useState<ArtisanWeaver>(ARTISAN_COOPERATIVES[0]);
  const [selectedMotif, setSelectedMotif] = useState<MotifDetail>(MOTIFS_DIRECTORY[0]);
  const [showCitationDetails, setShowCitationDetails] = useState(false);
  const [customRetailValue, setCustomRetailValue] = useState<number>(1200);

  // Visit Booking Modal State
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [bookingWeaver, setBookingWeaver] = useState<ArtisanWeaver | null>(null);
  const [visitDate, setVisitDate] = useState("2026-09-28");
  const [visitTimeSlot, setVisitTimeSlot] = useState("11:00 AM (Pit Loom Masterclass)");
  const [visitorCount, setVisitorCount] = useState(2);
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [visitPass, setVisitPass] = useState<any>(null);

  // Direct Commission / Order Modal State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderProduct, setOrderProduct] = useState<{ title: string; price: number; weaver: ArtisanWeaver } | null>(null);
  const [orderPlacedPass, setOrderPlacedPass] = useState<any>(null);

  // ===================== AI DESIGN ASSIST STATE =====================
  const [motifInput, setMotifInput] = useState("Siddheshwara Temple Pavilion Chaukadi");
  const [productInput, setProductInput] = useState("14-inch Quilted Handloom Laptop Folio");
  const [paletteInput, setPaletteInput] = useState("Deep Indigo & Pomegranate Red with Silver Zari Accent");
  const [artisanNotesInput, setArtisanNotesInput] = useState("Preserve authentic pit-loom raw selvedge edge and Kasuti needlework on front flap");
  const [isDesigning, setIsDesigning] = useState(false);
  const [designResult, setDesignResult] = useState<any>(null);
  const [commissionedDesignId, setCommissionedDesignId] = useState<string | null>(null);
  const [designFeedbackCopied, setDesignFeedbackCopied] = useState(false);

  // ===================== OORU OOTA (FOOD) STATE =====================
  const [foodQuery, setFoodQuery] = useState(
    "Where can I eat traditional Jolada Rotti and Ennegai near Aihole around 1 PM?"
  );
  const [foodLocation, setFoodLocation] = useState("Aihole Durga Temple Complex");
  const [dietaryPreference, setDietaryPreference] = useState("Traditional Vegetarian / Pure Satvik");
  const [timeOfDay, setTimeOfDay] = useState("1:00 PM (Lunch)");
  const [isFoodSearching, setIsFoodSearching] = useState(false);
  const [foodAnswer, setFoodAnswer] = useState<any>(null);

  // Food directory filters
  const [selectedTalukFilter, setSelectedTalukFilter] = useState<"ALL" | "Badami" | "Hungund">("ALL");
  const [selectedKitchenType, setSelectedKitchenType] = useState<"ALL" | "SHG Kitchen" | "Traditional Khanavali">("ALL");
  const [selectedFoodDish, setSelectedFoodDish] = useState<DishCultureDetail>(DISH_HERITAGE_GUIDE[0]);

  // Food Pre-Order Modal State
  const [isFoodOrderModalOpen, setIsFoodOrderModalOpen] = useState(false);
  const [selectedEateryForOrder, setSelectedEateryForOrder] = useState<VerifiedEatery | null>(null);
  const [thaliQuantity, setThaliQuantity] = useState(2);
  const [arrivalTime, setArrivalTime] = useState("1:15 PM");
  const [specialRequest, setSpecialRequest] = useState("Fresh woodfire Jolada Rotti, extra Shenga Chutney & curd");
  const [foodOrderPass, setFoodOrderPass] = useState<any>(null);

  // Filtered Weavers
  const filteredWeavers = useMemo(() => {
    if (selectedVillageFilter === "ALL") return ARTISAN_COOPERATIVES;
    return ARTISAN_COOPERATIVES.filter((w) => w.village === selectedVillageFilter);
  }, [selectedVillageFilter]);

  // Filtered Eateries
  const filteredEateries = useMemo(() => {
    return VERIFIED_EATERIES.filter((e) => {
      const talukMatch = selectedTalukFilter === "ALL" || e.taluk === selectedTalukFilter;
      const typeMatch =
        selectedKitchenType === "ALL" ||
        (selectedKitchenType === "SHG Kitchen" && e.type.includes("SHG")) ||
        (selectedKitchenType === "Traditional Khanavali" && e.type.includes("Khanavali"));
      return talukMatch && typeMatch;
    });
  }, [selectedTalukFilter, selectedKitchenType]);

  // Handle Preset Inspiration for AI Design
  const handleApplyDesignPreset = (preset: {
    motif: string;
    product: string;
    palette: string;
    notes: string;
  }) => {
    setMotifInput(preset.motif);
    setProductInput(preset.product);
    setPaletteInput(preset.palette);
    setArtisanNotesInput(preset.notes);
  };

  // Run AI Weaver Design Assist
  const handleGenerateDesign = async () => {
    setIsDesigning(true);
    setCommissionedDesignId(null);
    try {
      const res = await fetch("/api/gemini/artisan-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          motifName: motifInput,
          targetProduct: productInput,
          colorPalette: paletteInput,
          artisanNotes: artisanNotesInput,
        }),
      });
      const data = await res.json();
      if (data.design) {
        setDesignResult(data.design);
      }
    } catch (err) {
      console.error("Artisan design generation failed:", err);
    } finally {
      setIsDesigning(false);
    }
  };

  // Handle Commissioning the AI Design to Cooperative
  const handleCommissionDesign = () => {
    const orderId = `VTP-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setCommissionedDesignId(orderId);
  };

  // Run Ooru Oota QA
  const handleFoodQuerySubmit = async (queryText?: string, locText?: string) => {
    setIsFoodSearching(true);
    const q = queryText || foodQuery;
    const l = locText || foodLocation;
    try {
      const res = await fetch("/api/gemini/ooda-qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userQuery: q,
          currentLocation: l,
          dietaryPreference,
          timeOfDay,
        }),
      });
      const data = await res.json();
      if (data.result) {
        setFoodAnswer(data.result);
      }
    } catch (err) {
      console.error("Food query error:", err);
    } finally {
      setIsFoodSearching(false);
    }
  };

  // Quick food queries
  const quickFoodScenarios = [
    {
      title: "Aihole 1 PM Lunch (Jolada Rotti & Ennegai)",
      query: "Where can I get authentic woodfire Jolada Rotti and Ennegai near Aihole around 1 PM?",
      location: "Aihole Durga Temple Complex",
    },
    {
      title: "Badami Cave 1 Satvik Thali",
      query: "I am near Badami Cave 1 at noon. Where can I find a pure Lingayat thali without onion or garlic?",
      location: "Badami Cave 1 Main Gate",
    },
    {
      title: "Pattadakal Sunset Fresh Meals",
      query: "Finishing Pattadakal monument photography near sunset. Where is verified village dinner available?",
      location: "Pattadakal Virupaksha Temple",
    },
    {
      title: "Mahakuta Sacred Spring Refreshment",
      query: "Are there any Satvik meals or cold buttermilk near the Mahakuta temple pushkarini spring?",
      location: "Mahakuta Temple Grove",
    },
    {
      title: "Millet / Sajje Rotti in Badami",
      query: "Looking for diabetic-friendly pearl millet (Sajje Rotti) with roasted peanut chutney near Agastya Lake.",
      location: "Agastya Lake North Promenade",
    },
  ];

  return (
    <div className="space-y-8">
      {/* SECTION HEADER */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-stone-100 rounded-xl p-6 sm:p-8 shadow-sm relative overflow-hidden border border-stone-800">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-[11px] font-semibold tracking-wider uppercase border border-amber-500/30">
            <Shirt className="w-3.5 h-3.5" />
            <span>Phase 04 · Inclusive Growth</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
            Weaver-to-Traveller & Ooru Oota (Verified Village Meals)
          </h2>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-3xl">
            Cultural tourism often enriches urban tour operators while bypassing rural producers. Vatapi directly connects conscious travelers to Guledgudda Khana pit-loom weavers and verified women-led village kitchens (SHGs) across Badami and Aihole — replacing exploitative middlemen with certified living wages and zero-hallucination dining.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs border-t border-stone-700/60 font-mono">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Academic Grounding</span>
              <strong className="text-amber-200">2025 Textile Study</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Weaver Living Wage</span>
              <strong className="text-emerald-400">55–60% Direct Share</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Village Kitchens</span>
              <strong className="text-amber-200">100% Physically Verified</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">AI Hallucinations</span>
              <strong className="text-emerald-400">Zero Tolerance Filter</strong>
            </div>
          </div>
        </div>
      </div>

      {/* THREE INTERACTIVE HUBS TABS */}
      <div className="flex border-b border-stone-300 bg-stone-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("weavers")}
          className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-md transition-all flex items-center justify-center gap-2 ${
            activeTab === "weavers"
              ? "bg-white text-stone-900 shadow-xs border border-stone-200/80"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
          }`}
        >
          <Shirt className="w-4 h-4 text-amber-800" />
          <span>Guledgudda Khana & Ilkal Handlooms</span>
        </button>

        <button
          onClick={() => setActiveTab("ai-design")}
          className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-md transition-all flex items-center justify-center gap-2 ${
            activeTab === "ai-design"
              ? "bg-white text-stone-900 shadow-xs border border-stone-200/80"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>AI Weaver Design Assist (/api/gemini/artisan-design)</span>
        </button>

        <button
          onClick={() => setActiveTab("ooru-oota")}
          className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-md transition-all flex items-center justify-center gap-2 ${
            activeTab === "ooru-oota"
              ? "bg-white text-stone-900 shadow-xs border border-stone-200/80"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
          }`}
        >
          <UtensilsCrossed className="w-4 h-4 text-emerald-800" />
          <span>Ooru Oota Verified Meals (/api/gemini/ooda-qa)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: GULEDGUDDA KHANA & ILKAL HANDLOOMS (WEAVER-TO-TRAVELLER)           */}
      {/* ========================================================================= */}
      {activeTab === "weavers" && (
        <div className="space-y-8">
          {/* Peer-Reviewed 2025 Study Spotlight Card */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-5 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-amber-900 font-semibold font-mono uppercase tracking-wide">
                  <BookOpen className="w-4 h-4 text-amber-800" />
                  <span>Scholarly Foundation · Peer-Reviewed Evidence</span>
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">
                  {SCHOLARLY_CITATIONS[0].title}
                </h3>
                <div className="text-xs text-stone-600 font-mono">
                  {SCHOLARLY_CITATIONS[0].journal} · {SCHOLARLY_CITATIONS[0].leadAuthor}
                </div>
              </div>

              <button
                onClick={() => setShowCitationDetails(!showCitationDetails)}
                className="text-xs text-amber-900 hover:text-amber-800 font-medium flex items-center gap-1 border border-amber-300 rounded px-2.5 py-1 bg-white hover:bg-amber-100/50 transition-colors"
              >
                <span>{showCitationDetails ? "Hide Data Deep-Dive" : "View Field Investigation Metrics"}</span>
                {showCitationDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {SCHOLARLY_CITATIONS[0].findings}
            </p>

            {showCitationDetails && (
              <div className="pt-3 border-t border-amber-200/80 space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded border border-amber-200">
                    <span className="text-[11px] font-mono text-stone-500 block uppercase">Pit-Loom Attrition Rate</span>
                    <strong className="text-rose-700 text-lg font-serif">45% Loss</strong>
                    <p className="text-[11px] text-stone-600 mt-1">Over 2 decades as young artisans migrate to low-wage construction in Bengaluru and Pune.</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-amber-200">
                    <span className="text-[11px] font-mono text-stone-500 block uppercase">Yarn Debt Servitude</span>
                    <strong className="text-amber-900 text-lg font-serif">28% – 36% APR</strong>
                    <p className="text-[11px] text-stone-600 mt-1">Weavers borrow silk/cotton bundles from raw yarn traders, locking them into lifelong bonded supply agreements.</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-amber-200">
                    <span className="text-[11px] font-mono text-stone-500 block uppercase">Ergonomic Deterioration</span>
                    <strong className="text-rose-700 text-lg font-serif">88% Spondylosis</strong>
                    <p className="text-[11px] text-stone-600 mt-1">Sunken ground-pit postures cause severe musculoskeletal stress, forcing early retirement at age 48.</p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded border border-amber-200 space-y-1.5">
                  <div className="font-semibold text-stone-900 text-xs flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-700" />
                    <span>Vatapi Platform Policy & Economic Response:</span>
                  </div>
                  <p className="text-stone-700 text-xs leading-relaxed">
                    {SCHOLARLY_CITATIONS[0].policyRecommendation}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* INTERACTIVE WAGE DISCREPANCY COMPARATOR */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 space-y-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">
                    Transparent Fair-Price Breakdown: Middleman Exploitation vs Vatapi Direct Living Wage
                  </h3>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  Adjust retail value to see how conventional circuits siphon profits away from the pit-loom vs Vatapi’s certified artisan living-wage model.
                </p>
              </div>

              {/* Quick Preset Slider */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 font-mono">Retail Value:</span>
                <div className="flex gap-1.5">
                  {[980, 1400, 2200, 3100].map((val) => (
                    <button
                      key={val}
                      onClick={() => setCustomRetailValue(val)}
                      className={`px-2.5 py-1 text-xs rounded font-mono font-medium transition-colors ${
                        customRetailValue === val
                          ? "bg-amber-900 text-white"
                          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                      }`}
                    >
                      ₹{val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Comparison Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Conventional Route */}
              <div className="bg-rose-50/60 border border-rose-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-rose-900 text-sm">Conventional Middleman Circuit</span>
                  <span className="text-[11px] font-mono text-rose-700 font-semibold">Artisan Share: ~20%</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600 border-b border-rose-100 pb-1">
                    <span>Yarn Debt Advance & Trader Interest:</span>
                    <span className="font-mono text-stone-900">₹{Math.round(customRetailValue * 0.35)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600 border-b border-rose-100 pb-1">
                    <span>Urban Showroom & Middleman Markup:</span>
                    <span className="font-mono text-stone-900">₹{Math.round(customRetailValue * 0.45)}</span>
                  </div>
                  <div className="flex justify-between text-rose-900 font-semibold pt-1">
                    <span>Historical Pit-Loom Weaver Wage:</span>
                    <span className="font-mono text-rose-700 text-sm">₹{Math.round(customRetailValue * 0.20)}</span>
                  </div>
                </div>
                <div className="w-full bg-rose-200 h-3 rounded-full overflow-hidden flex">
                  <div style={{ width: "20%" }} className="bg-rose-600 h-full" title="Weaver Cut 20%" />
                  <div style={{ width: "45%" }} className="bg-stone-400 h-full" title="Middleman Cut 45%" />
                  <div style={{ width: "35%" }} className="bg-amber-400 h-full" title="Yarn Debt 35%" />
                </div>
                <p className="text-[11px] text-rose-800 italic">
                  Weaver earns below minimum wage (₹180–₹240 for 8–10 hours of manual pit-loom pedaling).
                </p>
              </div>

              {/* Vatapi Direct Fair Trade Route */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-emerald-950 text-sm flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Vatapi Direct Fair Trade Model</span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-800 font-bold">Artisan Living Wage: ~56%</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600 border-b border-emerald-100 pb-1">
                    <span>Direct Mulberry Silk & Cotton Yarn:</span>
                    <span className="font-mono text-stone-900">₹{Math.round(customRetailValue * 0.28)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600 border-b border-emerald-100 pb-1">
                    <span>Cooperative Finishing & Insurance Buffer:</span>
                    <span className="font-mono text-stone-900">₹{Math.round(customRetailValue * 0.16)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-900 font-bold pt-1">
                    <span>Certified Direct Living Wage to Weaver:</span>
                    <span className="font-mono text-emerald-800 text-sm">₹{Math.round(customRetailValue * 0.56)}</span>
                  </div>
                </div>
                <div className="w-full bg-emerald-200 h-3 rounded-full overflow-hidden flex">
                  <div style={{ width: "56%" }} className="bg-emerald-700 h-full" title="Weaver Living Wage 56%" />
                  <div style={{ width: "28%" }} className="bg-amber-400 h-full" title="Pure Yarn 28%" />
                  <div style={{ width: "16%" }} className="bg-emerald-400 h-full" title="Co-op Buffer 16%" />
                </div>
                <p className="text-[11px] text-emerald-800 font-medium">
                  Weaver receives a certified dignified living wage (₹550–₹1,600 per piece), eliminating debt bondage.
                </p>
              </div>
            </div>
          </div>

          {/* VILLAGE WEAVER PROFILES & LIVE BOOKING */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-2.5">
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  Verified Pit-Loom Master Weavers Directory
                </h3>
                <p className="text-xs text-stone-600">
                  Direct artisan booking and workshop visits across Guledgudda and Ilkal.
                </p>
              </div>

              {/* Filter */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-stone-500 font-mono">Cluster:</span>
                {(["ALL", "Guledgudda", "Ilkal"] as const).map((cluster) => (
                  <button
                    key={cluster}
                    onClick={() => setSelectedVillageFilter(cluster)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      selectedVillageFilter === cluster
                        ? "bg-amber-900 text-white"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    {cluster === "ALL" ? "All Clusters" : cluster}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {filteredWeavers.map((weaver) => (
                <div
                  key={weaver.id}
                  className="bg-white border border-stone-200 rounded-xl p-5 space-y-4 hover:border-amber-700/50 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-2.5">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs mb-1">
                          <span className="font-mono font-semibold text-stone-800 bg-stone-100 px-2 py-0.5 rounded">
                            {weaver.village}
                          </span>
                          <span className="text-amber-800 font-mono text-[11px] font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {weaver.giTagNumber}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-stone-900 text-base">
                          {weaver.name}
                        </h4>
                        <div className="text-xs text-stone-500 font-sans">
                          {weaver.kannadaName}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-stone-400 block uppercase">Experience</span>
                        <span className="font-mono font-bold text-stone-900 text-sm">
                          {weaver.experienceYears} Yrs
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {weaver.bio}
                    </p>

                    <div className="space-y-1.5 text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded border border-stone-100">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{weaver.locationDetails}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{weaver.contactNumber}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>Loom: {weaver.loomType}</span>
                      </div>
                    </div>

                    {/* Motif Mastery Tags */}
                    <div>
                      <span className="text-[10px] font-mono text-stone-500 uppercase block mb-1">
                        Mastery Motifs:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {weaver.motifMastery.map((m, i) => (
                          <span
                            key={i}
                            className="bg-amber-50 text-amber-900 text-[10px] font-medium px-2 py-0.5 rounded border border-amber-200/60"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sample Products */}
                    <div className="space-y-2 pt-1 border-t border-stone-100">
                      <span className="text-[10px] font-mono text-stone-500 uppercase block">
                        Signature Handloom Pieces:
                      </span>
                      {weaver.sampleProducts.map((sp, idx) => (
                        <div
                          key={idx}
                          className="bg-stone-50 p-2 rounded text-xs flex items-center justify-between border border-stone-200/70"
                        >
                          <div>
                            <strong className="text-stone-900 block text-[11px]">{sp.title}</strong>
                            <span className="text-[10px] text-stone-500">{sp.weavingTimeDays} days pit-loom labor</span>
                          </div>
                          <button
                            onClick={() => {
                              setOrderProduct({ title: sp.title, price: sp.priceINR, weaver });
                              setIsOrderModalOpen(true);
                            }}
                            className="bg-stone-900 hover:bg-stone-800 text-white font-mono text-[11px] font-semibold px-2.5 py-1 rounded transition-colors"
                          >
                            ₹{sp.priceINR}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>GI Verified</span>
                    </span>

                    <button
                      onClick={() => {
                        setBookingWeaver(weaver);
                        setIsVisitModalOpen(true);
                      }}
                      className="bg-amber-900 hover:bg-amber-800 text-white text-xs font-medium px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Workshop Visit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SACRED MOTIFS HERITAGE GALLERY */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2.5">
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">
                  Traditional Motif Directory & Sacred Chalukyan Geometry
                </h3>
                <p className="text-xs text-stone-600">
                  Every authentic motif connects to 6th–8th century Western Chalukyan temple iconography.
                </p>
              </div>
              <span className="text-xs text-stone-500 font-mono">
                Click any motif to inspect symbolism and weaving specs
              </span>
            </div>

            {/* Motif selector pills */}
            <div className="flex flex-wrap gap-2">
              {MOTIFS_DIRECTORY.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMotif(m)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedMotif.id === m.id
                      ? "bg-amber-900 text-white shadow-xs"
                      : "bg-white text-stone-700 hover:bg-stone-200 border border-stone-200"
                  }`}
                >
                  <span>{m.name}</span>
                </button>
              ))}
            </div>

            {/* Selected Motif Card */}
            <div className="bg-white border border-stone-200 rounded-lg p-5 space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-stone-100 pb-2.5">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold mb-0.5">
                    <span>{selectedMotif.originTradition}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-stone-500">{selectedMotif.kannadaName}</span>
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 text-lg">
                    {selectedMotif.name}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded border border-amber-200 text-xs">
                  <span className="text-stone-600 font-mono">Craft Difficulty:</span>
                  <div className="flex text-amber-600">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < selectedMotif.difficultyRating ? "text-amber-700" : "text-stone-300"}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <strong className="text-stone-900 block font-mono text-[11px] uppercase tracking-wide">
                    Symbolism & Architectural Origin:
                  </strong>
                  <p className="text-stone-700 leading-relaxed">{selectedMotif.symbolism}</p>
                </div>
                <div className="space-y-1.5">
                  <strong className="text-stone-900 block font-mono text-[11px] uppercase tracking-wide">
                    Sacred Significance:
                  </strong>
                  <p className="text-stone-700 leading-relaxed">{selectedMotif.sacredMeaning}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-stone-500 font-mono text-[11px]">Geometric Structure: </span>
                  <span className="text-stone-800 font-medium">{selectedMotif.geometricStructure}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-stone-500 font-mono text-[11px]">Contemporary Fit:</span>
                  {selectedMotif.recommendedProducts.map((p, idx) => (
                    <span key={idx} className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded text-[11px]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AUTHENTICITY TEST GUIDE */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-800" />
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  The Traveler&apos;s Authenticity Guide: Pure Pit-Loom vs Powerloom Imitation
                </h3>
                <p className="text-xs text-stone-500">
                  How to detect counterfeit polyester copies sold in unauthorized highway tourist shops.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {AUTHENTICITY_TEST_GUIDE.map((test, index) => (
                <div key={index} className="bg-stone-50 p-3.5 rounded-lg border border-stone-200 space-y-2">
                  <strong className="font-serif font-bold text-stone-900 text-sm block">
                    {test.testName}
                  </strong>
                  <div className="space-y-1.5">
                    <div className="text-emerald-900 bg-emerald-50/70 p-2 rounded border border-emerald-200/60">
                      <span className="font-semibold block text-[11px] uppercase">Authentic Handloom:</span>
                      <span>{test.handloomSign}</span>
                    </div>
                    <div className="text-rose-900 bg-rose-50/70 p-2 rounded border border-rose-200/60">
                      <span className="font-semibold block text-[11px] uppercase">Powerloom Counterfeit:</span>
                      <span>{test.powerloomImitation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: AI WEAVER DESIGN ASSIST (/api/gemini/artisan-design)               */}
      {/* ========================================================================= */}
      {activeTab === "ai-design" && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-5 shadow-xs">
            <div className="border-b border-stone-200 pb-3 flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-800 uppercase tracking-wide">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Ethical AI Craft Assist · Handloom Expansion</span>
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-xl mt-1">
                  AI Weaver Design Studio (/api/gemini/artisan-design)
                </h3>
                <p className="text-xs text-stone-600 max-w-2xl mt-1 leading-relaxed">
                  Suggests tourist-friendly contemporary products (stoles, laptop folios, passport wallets) adapting traditional Chaukadi and Siddheshwara motifs without replacing artisan hands. The AI formulates technical weaving specs, reed counts, and transparent fair-price breakdowns.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-lg text-xs font-mono">
                Model: <span className="font-bold">gemini-3.8-flash</span>
              </div>
            </div>

            {/* Quick Inspiration Presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wide block">
                Quick Inspiration Presets (Click to load):
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  {
                    name: "Siddheshwara Laptop Folio (14-inch)",
                    motif: "Siddheshwara Temple Pavilion Chaukadi",
                    product: "14-inch Quilted Handloom Laptop Folio",
                    palette: "Deep Indigo & Pomegranate Red with Silver Zari Accent",
                    notes: "Quilted cotton foam lining, magnetic brass snap, Kasuti temple border",
                  },
                  {
                    name: "Chaukadi Silk-Cotton Stole (2.2m)",
                    motif: "Chaukadi (Four-Fold Sacred Diamond)",
                    product: "Silk-Cotton Reversible Traveler Stole",
                    palette: "Madder Red & Raw Mulberry Silk Gold",
                    notes: "Lightweight 96s reed count, soft hand-tension drape, hand-fringed tassels",
                  },
                  {
                    name: "Tope Teni Ceremonial Silk Scarf",
                    motif: "Tope Teni (Pomegranate Spire Pallu)",
                    product: "Long Silk Evening Scarf with Kondi Joint",
                    palette: "Crimson Red & Charcoal Black with Kasuti Accents",
                    notes: "Authentic Kondi interlocking red warp with contrasting charcoal body",
                  },
                  {
                    name: "Kattari Passport & Currency Wallet",
                    motif: "Kattari (Precision Scissor Lattice)",
                    product: "Minimalist Multi-Pocket Travel Wallet",
                    palette: "Forest Green & Natural Indigo with Raw Brass Zippers",
                    notes: "Waterproof lining, RFID shield compartment, authentic Khana face",
                  },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleApplyDesignPreset(preset)}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-3 py-1.5 rounded-md font-medium text-xs transition-colors border border-stone-200"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Design Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="block font-semibold text-stone-800">
                  1. Traditional Chalukyan Motif:
                </label>
                <input
                  type="text"
                  value={motifInput}
                  onChange={(e) => setMotifInput(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-700 text-xs"
                  placeholder="e.g. Siddheshwara Temple Pavilion Chaukadi"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-stone-800">
                  2. Contemporary Tourist Product:
                </label>
                <input
                  type="text"
                  value={productInput}
                  onChange={(e) => setProductInput(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-700 text-xs"
                  placeholder="e.g. 14-inch Quilted Laptop Folio"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-stone-800">
                  3. Handloom Dye & Color Combination:
                </label>
                <input
                  type="text"
                  value={paletteInput}
                  onChange={(e) => setPaletteInput(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-700 text-xs"
                  placeholder="e.g. Deep Indigo & Pomegranate Red with Silver Zari Accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-stone-800">
                  4. Artisan & Utility Specifications:
                </label>
                <input
                  type="text"
                  value={artisanNotesInput}
                  onChange={(e) => setArtisanNotesInput(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-700 text-xs"
                  placeholder="e.g. Preserve authentic pit-loom raw selvedge edge"
                />
              </div>
            </div>

            {/* Generate Action Button */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-stone-500">
                Ethical constraint: Never replaces handloom weaving with automated machine code.
              </span>

              <button
                onClick={handleGenerateDesign}
                disabled={isDesigning}
                className="bg-amber-900 hover:bg-amber-800 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-medium text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs"
              >
                {isDesigning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Consulting Chalukyan Textile Codex...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate Handloom Design Blueprint</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* GENERATED DESIGN BLUEPRINT */}
          {designResult && (
            <div className="bg-white border-2 border-amber-900/30 rounded-xl p-6 space-y-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-200 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-mono font-semibold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Artisan Living Wage: {designResult.fairPriceBreakdown.livingWagePercentage || 54}% of Retail</span>
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 text-xl">
                    {designResult.productConceptTitle}
                  </h4>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-stone-500 block uppercase">Pit-Loom Labor</span>
                  <span className="font-serif font-bold text-amber-900 text-lg">
                    {designResult.estimatedWeavingHours} Hours
                  </span>
                </div>
              </div>

              {/* Story & Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                <div className="space-y-2">
                  <strong className="text-stone-900 block font-serif text-sm">
                    Sacred Motif Adaptation Narrative:
                  </strong>
                  <p className="text-stone-700 leading-relaxed bg-amber-50/50 p-3.5 rounded-lg border border-amber-200/60">
                    {designResult.motifAdaptationStory}
                  </p>
                </div>

                <div className="space-y-2">
                  <strong className="text-stone-900 block font-serif text-sm">
                    Technical Weaving Specifications:
                  </strong>
                  <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-200 space-y-1.5 text-stone-700 font-mono text-[11px]">
                    <div>{designResult.technicalWeavingSpecs}</div>
                    <div className="text-stone-500 pt-1 border-t border-stone-200">
                      <strong>Care Instructions:</strong> {designResult.careInstructions}
                    </div>
                  </div>
                </div>
              </div>

              {/* Transparent Price Breakdown Graphic */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
                <span className="font-serif font-bold text-stone-900 text-xs block uppercase tracking-wide">
                  Transparent Cost & Living Wage Breakdown (Per Crafted Piece):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                  <div className="bg-white p-2.5 rounded border border-stone-200">
                    <span className="text-[10px] text-stone-500 block uppercase">Raw Yarn Cost</span>
                    <strong className="text-stone-800 text-sm font-mono">
                      ₹{designResult.fairPriceBreakdown.yarnRawMaterialCostINR}
                    </strong>
                  </div>
                  <div className="bg-emerald-50 p-2.5 rounded border border-emerald-300">
                    <span className="text-[10px] text-emerald-800 block uppercase font-bold">Weaver Living Wage</span>
                    <strong className="text-emerald-900 text-sm font-mono">
                      ₹{designResult.fairPriceBreakdown.weaverDirectLaborWageINR}
                    </strong>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-stone-200">
                    <span className="text-[10px] text-stone-500 block uppercase">Finishing & Lining</span>
                    <strong className="text-stone-800 text-sm font-mono">
                      ₹{designResult.fairPriceBreakdown.finishingAndLiningINR}
                    </strong>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-stone-200">
                    <span className="text-[10px] text-stone-500 block uppercase">Co-op Buffer</span>
                    <strong className="text-stone-800 text-sm font-mono">
                      ₹{designResult.fairPriceBreakdown.cooperativeBufferINR}
                    </strong>
                  </div>
                  <div className="bg-amber-900 text-white p-2.5 rounded border border-amber-950">
                    <span className="text-[10px] text-amber-200 block uppercase font-bold">Fair Retail Price</span>
                    <strong className="text-white text-base font-mono">
                      ₹{designResult.fairPriceBreakdown.suggestedRetailPriceINR}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Tourist Appeal Highlights */}
              <div className="space-y-2">
                <span className="text-xs font-serif font-bold text-stone-900 block">
                  Conscious Traveler Value Highlights:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {designResult.touristAppealHighlights?.map((t: string, idx: number) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-stone-200 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span className="text-stone-700 leading-snug">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commission Button & Confirmation */}
              <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-stone-500">
                  Ready to weave? Allocate this blueprint directly to a verified Guledgudda pit loom.
                </div>

                {commissionedDesignId ? (
                  <div className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-4 py-2 rounded-lg text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Work Order Dispatched: <strong>{commissionedDesignId}</strong> (Allocated to Mahadevappa Shirur Pit-Loom #4)</span>
                  </div>
                ) : (
                  <button
                    onClick={handleCommissionDesign}
                    className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-xs"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    <span>Commission Sample to Guledgudda Co-op</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: OORU OOTA (VERIFIED VILLAGE MEALS)                                  */}
      {/* ========================================================================= */}
      {activeTab === "ooru-oota" && (
        <div className="space-y-8">
          {/* ZERO HALLUCINATION AUDIT BANNER */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200/80 pb-2">
              <div className="flex items-center gap-2 text-emerald-950 font-serif font-bold text-base">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>Ooru Oota: Zero-Hallucination Physical Food Audit</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-800 bg-white px-2.5 py-0.5 rounded border border-emerald-300">
                Direct Women SHG Linkage · Certified Fresh Firewood Batches
              </span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed max-w-4xl">
              Travel forum complaints from 2021 through 2024 consistently lamented: <em>&ldquo;There is nowhere to eat in Aihole.&rdquo;</em> Standard map aggregators either point to closed phantom hotels or expensive highway resorts 15 km away. Ooru Oota solves this by maintaining a physically audited directory of women-led Self-Help Groups (SHGs) and legacy Khanavalis serving authentic woodfire <strong>Jolada Rotti</strong>, <strong>Badanekayi Ennegai</strong>, and <strong>Shenga Chutney Pudi</strong>.
            </p>
          </div>

          {/* AI VILLAGE DINING CONCIERGE SEARCH BOX */}
          <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  AI Village Food Concierge (/api/gemini/ooda-qa)
                </h3>
                <p className="text-xs text-stone-600">
                  Strictly grounded in physical GPS inspections. Recommends verified meal times, pre-order contacts, and dietary adaptations.
                </p>
              </div>
              <span className="text-xs font-mono text-stone-500">
                Zero Hallucination Strict Schema
              </span>
            </div>

            {/* Quick 1-Click Scenarios */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wide block">
                Quick Visitor Questions (Click to Ask):
              </span>
              <div className="flex flex-wrap gap-2">
                {quickFoodScenarios.map((sc, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setFoodQuery(sc.query);
                      setFoodLocation(sc.location);
                      handleFoodQuerySubmit(sc.query, sc.location);
                    }}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs px-3 py-1.5 rounded-md font-medium transition-colors border border-stone-200"
                  >
                    {sc.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Query Controls */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
              <div className="md:col-span-6 space-y-1">
                <label className="block font-semibold text-stone-700">What would you like to eat or ask?</label>
                <input
                  type="text"
                  value={foodQuery}
                  onChange={(e) => setFoodQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-xs"
                  placeholder="e.g. What can I eat near Aihole around 1 PM?"
                />
              </div>

              <div className="md:col-span-3 space-y-1">
                <label className="block font-semibold text-stone-700">Current Monument / Location:</label>
                <input
                  type="text"
                  value={foodLocation}
                  onChange={(e) => setFoodLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-xs"
                  placeholder="e.g. Aihole Durga Temple Complex"
                />
              </div>

              <div className="md:col-span-3 space-y-1">
                <label className="block font-semibold text-stone-700">Dietary Filter:</label>
                <select
                  value={dietaryPreference}
                  onChange={(e) => setDietaryPreference(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-stone-50 focus:bg-white text-xs"
                >
                  <option value="Traditional Vegetarian / Pure Satvik">Traditional Vegetarian (Satvik)</option>
                  <option value="100% Gluten-Free (Jowar / Sorghum)">Gluten-Free (Pure Jowar)</option>
                  <option value="Strict Jain (No Onion / Garlic)">Jain Friendly (No Onion/Garlic)</option>
                  <option value="Diabetic Friendly (Millet / Sajje)">Diabetic Friendly (Pearl Millet)</option>
                </select>
              </div>
            </div>

            {/* Search Action */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-stone-500">
                Recommendation strictly bounded to verified women SHGs and historic Khanavalis.
              </span>

              <button
                onClick={() => handleFoodQuerySubmit()}
                disabled={isFoodSearching}
                className="bg-amber-900 hover:bg-amber-800 disabled:opacity-50 text-white px-5 py-2 rounded-lg font-medium text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs"
              >
                {isFoodSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Checking Village Kitchen Audits...</span>
                  </>
                ) : (
                  <>
                    <UtensilsCrossed className="w-4 h-4" />
                    <span>Find Verified Village Meals</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Response Card */}
            {foodAnswer && (
              <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/80 pb-2">
                  <div className="flex items-center gap-2 font-serif font-bold text-stone-900 text-sm">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    <span>Verified Village Kitchen Guidance:</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
                    Est. Cost: ₹{foodAnswer.estimatedMealCostINR || 110}/person
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                  {foodAnswer.naturalAnswer}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="bg-white p-3 rounded border border-amber-200 space-y-1">
                    <strong className="text-stone-900 block font-mono text-[11px] uppercase">
                      Distance Reality:
                    </strong>
                    <p className="text-stone-600">{foodAnswer.distanceNotice}</p>
                  </div>

                  <div className="bg-white p-3 rounded border border-amber-200 space-y-1">
                    <strong className="text-stone-900 block font-mono text-[11px] uppercase">
                      Dish Specialty:
                    </strong>
                    <p className="text-amber-900 font-medium">{foodAnswer.dishHighlight}</p>
                  </div>
                </div>

                {/* Practical Tips */}
                {foodAnswer.practicalTips && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-mono text-stone-500 uppercase block">Practical Tips:</span>
                    <ul className="list-disc pl-4 text-xs text-stone-700 space-y-0.5">
                      {foodAnswer.practicalTips.map((tip: string, idx: number) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="text-[11px] font-mono text-emerald-800 pt-2 border-t border-amber-200/60 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Audit Stamp: {foodAnswer.zeroHallucinationAuditNote}</span>
                </div>
              </div>
            )}
          </div>

          {/* VERIFIED EATERIES DIRECTORY */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-2.5">
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  Physically Verified Kitchens Directory
                </h3>
                <p className="text-xs text-stone-600">
                  Inspected in person across Badami, Pattadakal, Aihole, and Mahakuta.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-stone-500 font-mono">Taluk:</span>
                  {(["ALL", "Badami", "Hungund"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTalukFilter(t)}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        selectedTalukFilter === t
                          ? "bg-stone-900 text-white"
                          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                      }`}
                    >
                      {t === "ALL" ? "All" : t}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-stone-500 font-mono">Type:</span>
                  {(["ALL", "SHG Kitchen", "Traditional Khanavali"] as const).map((tp) => (
                    <button
                      key={tp}
                      onClick={() => setSelectedKitchenType(tp)}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        selectedKitchenType === tp
                          ? "bg-amber-900 text-white"
                          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                      }`}
                    >
                      {tp === "ALL" ? "All Types" : tp}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEateries.map((eatery) => (
                <div
                  key={eatery.id}
                  className="bg-white border border-stone-200 rounded-xl p-5 space-y-4 hover:border-amber-700/50 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-2.5">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs mb-1">
                          <span className="font-mono font-semibold text-stone-800 bg-stone-100 px-2 py-0.5 rounded">
                            {eatery.taluk} Taluk
                          </span>
                          <span className="text-emerald-800 font-mono text-[10px] font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-stone-900 text-base">
                          {eatery.name}
                        </h4>
                        <div className="text-xs text-stone-500 font-sans">
                          {eatery.kannadaName}
                        </div>
                      </div>

                      {eatery.firewoodCooked && (
                        <div className="bg-amber-100/70 text-amber-900 px-2 py-1 rounded text-[10px] font-mono flex items-center gap-1 shrink-0">
                          <Flame className="w-3 h-3 text-amber-800" />
                          <span>Woodfire Tava</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded border border-stone-100">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{eatery.distanceFromNearestMonument}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{eatery.mealTimings}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{eatery.ownerContact}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {eatery.storyAndTrustFactor}
                    </p>

                    {/* Signature Dishes */}
                    <div className="space-y-1.5 pt-1 border-t border-stone-100">
                      <span className="text-[10px] font-mono text-stone-500 uppercase block">
                        Signature Handcrafted Delicacies:
                      </span>
                      <div className="space-y-1">
                        {eatery.signatureDishes.slice(0, 3).map((sd, i) => (
                          <div key={i} className="text-xs text-stone-800 flex items-start gap-1.5">
                            <span className="text-amber-800 font-bold">•</span>
                            <div>
                              <strong className="text-stone-900">{sd.dishName}</strong>
                              <span className="text-[11px] text-stone-500 block">{sd.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Price */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-stone-400 block uppercase">Price</span>
                      <span className="font-mono font-bold text-stone-900 text-xs sm:text-sm">
                        {eatery.priceRangePerThaliINR}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedEateryForOrder(eatery);
                        setIsFoodOrderModalOpen(true);
                      }}
                      className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <UtensilsCrossed className="w-3.5 h-3.5" />
                      <span>Pre-Order Thalis</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* REGIONAL GASTRONOMY PRIMER */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2.5">
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">
                  North Karnataka Dryland Gastronomy Codex
                </h3>
                <p className="text-xs text-stone-600">
                  Why Jolada Rotti, Ennegai, and Shenga Chutney form an ecologically resilient superfood triad.
                </p>
              </div>
              <span className="text-xs text-stone-500 font-mono">
                Click any delicacy to explore culinary heritage
              </span>
            </div>

            {/* Dish selection tabs */}
            <div className="flex flex-wrap gap-2">
              {DISH_HERITAGE_GUIDE.map((dish) => (
                <button
                  key={dish.id}
                  onClick={() => setSelectedFoodDish(dish)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedFoodDish.id === dish.id
                      ? "bg-amber-900 text-white shadow-xs"
                      : "bg-white text-stone-700 hover:bg-stone-200 border border-stone-200"
                  }`}
                >
                  {dish.name.split("(")[0]}
                </button>
              ))}
            </div>

            {/* Detailed Dish Card */}
            <div className="bg-white border border-stone-200 rounded-lg p-5 space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-stone-100 pb-2.5">
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-lg">
                    {selectedFoodDish.name}
                  </h4>
                  <div className="text-xs text-stone-500 font-sans mt-0.5">
                    {selectedFoodDish.kannadaName}
                  </div>
                </div>
                <div className="bg-amber-50 text-amber-900 px-3 py-1 rounded border border-amber-200 text-xs font-mono">
                  Origin: Malaprabha River Basin
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <strong className="text-stone-900 block font-mono text-[11px] uppercase tracking-wide">
                    Culinary Heritage & Preparation:
                  </strong>
                  <p className="text-stone-700 leading-relaxed">{selectedFoodDish.culinaryHeritage}</p>
                  <p className="text-stone-600 italic text-[11px]">{selectedFoodDish.whyIconic}</p>
                </div>

                <div className="space-y-2">
                  <strong className="text-stone-900 block font-mono text-[11px] uppercase tracking-wide">
                    Core Ingredients:
                  </strong>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedFoodDish.ingredients.map((ing, i) => (
                      <span key={i} className="bg-stone-100 text-stone-800 text-[11px] px-2.5 py-0.5 rounded">
                        {ing}
                      </span>
                    ))}
                  </div>

                  <strong className="text-stone-900 block font-mono text-[11px] uppercase tracking-wide pt-1">
                    Nutritional Wisdom:
                  </strong>
                  <p className="text-stone-700 leading-relaxed">{selectedFoodDish.nutritionalBenefits}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: BOOK PIT-LOOM WORKSHOP VISIT                                     */}
      {/* ========================================================================= */}
      {isVisitModalOpen && bookingWeaver && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-stone-200">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[11px] font-mono text-amber-800 uppercase font-semibold">
                  Workshop Visit Booking
                </span>
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  {bookingWeaver.name} ({bookingWeaver.village})
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsVisitModalOpen(false);
                  setVisitPass(null);
                }}
                className="text-stone-400 hover:text-stone-700 text-lg"
              >
                ✕
              </button>
            </div>

            {visitPass ? (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Pit-Loom Visit Confirmed!</span>
                  </div>
                  <div className="font-mono text-stone-800">
                    <div>Booking Token: <strong>{visitPass.passId}</strong></div>
                    <div>Date & Time: {visitPass.date} · {visitPass.slot}</div>
                    <div>Party Size: {visitPass.visitors} Visitor(s)</div>
                    <div>Location: {bookingWeaver.locationDetails}</div>
                    <div>Direct Contact: {bookingWeaver.contactNumber}</div>
                  </div>
                  <p className="text-[11px] text-stone-600 pt-1 border-t border-emerald-200">
                    A confirmation SMS has been logged. Please bring cash for direct artisan purchases as mobile networks in historic weaver lanes can be intermittent.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsVisitModalOpen(false);
                    setVisitPass(null);
                  }}
                  className="w-full bg-stone-900 text-white text-xs font-semibold py-2 rounded-lg"
                >
                  Close Pass
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Your Full Name:</label>
                  <input
                    type="text"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="e.g. Ramesh Kulkarni"
                    className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 focus:bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Mobile Number (WhatsApp SMS):</label>
                  <input
                    type="text"
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 focus:bg-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Visit Date:</label>
                    <input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 focus:bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Number of Visitors:</label>
                    <select
                      value={visitorCount}
                      onChange={(e) => setVisitorCount(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 focus:bg-white text-xs"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} Person{num > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Workshop Time Slot:</label>
                  <select
                    value={visitTimeSlot}
                    onChange={(e) => setVisitTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 focus:bg-white text-xs"
                  >
                    <option value="10:00 AM (Morning Shedding & Warp Demonstration)">10:00 AM (Morning Shedding & Warp Demonstration)</option>
                    <option value="02:00 PM (Midday Pit-Loom Pedaling & Bobbin Throwing)">02:00 PM (Midday Pit-Loom Pedaling & Bobbin Throwing)</option>
                    <option value="04:30 PM (Evening Kasuti Needlework Session)">04:30 PM (Evening Kasuti Needlework Session)</option>
                  </select>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                  <button
                    onClick={() => setIsVisitModalOpen(false)}
                    className="px-4 py-2 border border-stone-300 rounded text-stone-700 hover:bg-stone-100 text-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setVisitPass({
                        passId: `VTP-VISIT-${Math.floor(1000 + Math.random() * 9000)}`,
                        date: visitDate,
                        slot: visitTimeSlot,
                        visitors: visitorCount,
                      });
                    }}
                    className="px-4 py-2 bg-amber-900 hover:bg-amber-800 text-white rounded text-xs font-semibold"
                  >
                    Generate Visit Pass
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: DIRECT WEAVER PIECE REQUISITION                                   */}
      {/* ========================================================================= */}
      {isOrderModalOpen && orderProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200 text-xs">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[11px] font-mono text-emerald-800 uppercase font-semibold">
                  Direct Handloom Purchase
                </span>
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  {orderProduct.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsOrderModalOpen(false);
                  setOrderPlacedPass(null);
                }}
                className="text-stone-400 hover:text-stone-700 text-lg"
              >
                ✕
              </button>
            </div>

            {orderPlacedPass ? (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Artisan Commission Confirmed!</span>
                  </div>
                  <div className="font-mono text-stone-800">
                    <div>Receipt Number: <strong>{orderPlacedPass.receiptId}</strong></div>
                    <div>Item: {orderProduct.title}</div>
                    <div>Direct Living Wage to Weaver: <strong>₹{Math.round(orderProduct.price * 0.56)}</strong></div>
                    <div>Collection Hub: {orderProduct.weaver.village} Co-op Office</div>
                  </div>
                  <p className="text-[11px] text-stone-600 pt-1 border-t border-emerald-200">
                    Your direct payment protects the artisan from yarn debt interest and Guledgudda pit-loom attrition.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsOrderModalOpen(false);
                    setOrderPlacedPass(null);
                  }}
                  className="w-full bg-stone-900 text-white font-semibold py-2 rounded-lg"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-stone-50 p-3 rounded border border-stone-200 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Total Fair Price:</span>
                    <strong className="font-mono text-stone-900 text-sm">₹{orderProduct.price}</strong>
                  </div>
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Direct Weaver Living Wage (56%):</span>
                    <span className="font-mono">₹{Math.round(orderProduct.price * 0.56)}</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Delivery / Pickup Preference:</label>
                  <select className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 text-xs">
                    <option>Pick up directly at {orderProduct.weaver.village} Master Workshop</option>
                    <option>Deliver to KSTDC / Badami Hotel Front Desk (Same Day)</option>
                    <option>Insured Speed Post within India (+₹120)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Your Name & Mobile:</label>
                  <input
                    type="text"
                    placeholder="Name & WhatsApp Phone"
                    className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 text-xs"
                  />
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                  <button
                    onClick={() => setIsOrderModalOpen(false)}
                    className="px-4 py-2 border border-stone-300 rounded text-stone-700 hover:bg-stone-100 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setOrderPlacedPass({
                        receiptId: `VTP-RCP-${Math.floor(1000 + Math.random() * 9000)}`,
                      });
                    }}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded font-semibold"
                  >
                    Confirm Direct Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: PRE-ORDER MEALS (OORU OOTA CALL AHEAD)                           */}
      {/* ========================================================================= */}
      {isFoodOrderModalOpen && selectedEateryForOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200 text-xs">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[11px] font-mono text-emerald-800 uppercase font-semibold">
                  Ooru Oota Meal Pre-Order
                </span>
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  {selectedEateryForOrder.name}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsFoodOrderModalOpen(false);
                  setFoodOrderPass(null);
                }}
                className="text-stone-400 hover:text-stone-700 text-lg"
              >
                ✕
              </button>
            </div>

            {foodOrderPass ? (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Kitchen Token Created!</span>
                  </div>
                  <div className="font-mono text-stone-800">
                    <div>Token: <strong>{foodOrderPass.token}</strong></div>
                    <div>Thalis Reserved: {foodOrderPass.qty} Traditional Meals</div>
                    <div>Arrival Window: {foodOrderPass.time}</div>
                    <div>Contact: {selectedEateryForOrder.ownerContact}</div>
                  </div>
                  <p className="text-[11px] text-stone-600 pt-1 border-t border-emerald-200">
                    Calling 20–30 mins before reaching guarantees that your Jolada Rottis are puffed directly from the firewood tava.
                  </p>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`tel:${selectedEateryForOrder.ownerContact.split(" ")[1] || ""}`}
                    className="flex-1 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg text-center flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Direct Call Kitchen</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsFoodOrderModalOpen(false);
                      setFoodOrderPass(null);
                    }}
                    className="flex-1 bg-stone-900 text-white font-semibold py-2 rounded-lg"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Number of Thalis:</label>
                    <select
                      value={thaliQuantity}
                      onChange={(e) => setThaliQuantity(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 text-xs"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                        <option key={n} value={n}>
                          {n} Thali{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Expected Arrival Time:</label>
                    <input
                      type="text"
                      value={arrivalTime}
                      onChange={(e) => setArrivalTime(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 text-xs"
                      placeholder="e.g. 1:15 PM"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Dietary / Custom Requests:</label>
                  <input
                    type="text"
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded bg-stone-50 text-xs"
                    placeholder="e.g. Extra Shenga Chutney, No Garlic, Jain-friendly"
                  />
                </div>

                <div className="bg-stone-50 p-2.5 rounded border border-stone-200 text-[11px] text-stone-600">
                  Estimated Meal Bill: <strong className="font-mono text-stone-900">₹{thaliQuantity * selectedEateryForOrder.averageMealCostINR}</strong> (₹{selectedEateryForOrder.averageMealCostINR}/thali). Pay directly at the kitchen.
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                  <button
                    onClick={() => setIsFoodOrderModalOpen(false)}
                    className="px-4 py-2 border border-stone-300 rounded text-stone-700 hover:bg-stone-100 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setFoodOrderPass({
                        token: `VTP-OOTA-${Math.floor(1000 + Math.random() * 9000)}`,
                        qty: thaliQuantity,
                        time: arrivalTime,
                      });
                    }}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded font-semibold"
                  >
                    Generate Kitchen Slip
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
