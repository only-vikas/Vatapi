"use client";

import React, { useState, useMemo } from "react";
import {
  CIRCUIT_STOPS,
  NWKRTC_PATTADAKAL_AIHOLE_BUSES,
  NWKRTC_RETURN_AIHOLE_PATTADAKAL,
  INITIAL_SHARED_RIDES,
  PRESET_CIRCUITS,
  SharedRide,
  CircuitStop,
  CircuitPreset,
  BusTimetableEntry,
} from "@/lib/data/mobility";
import {
  Bus,
  Users,
  MapPin,
  Clock,
  Calculator,
  Plus,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Phone,
  Copy,
  Check,
  Volume2,
  ShieldCheck,
  Ticket,
  Calendar,
  Navigation,
  Car,
  ChevronRight,
  Filter,
  Sparkles,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

export const Phase3Mobility: React.FC = () => {
  // Navigation tabs within Phase 3
  const [activeTab, setActiveTab] = useState<
    "calculator" | "pooling" | "bus_gap"
  >("calculator");

  // --- AUTO CALCULATOR STATE ---
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    PRESET_CIRCUITS[0].id
  );
  const [tripType, setTripType] = useState<"preset" | "custom">("preset");
  const [customPickup, setCustomPickup] = useState("badami");
  const [customDropoff, setCustomDropoff] = useState("aihole");
  const [customIsRoundtrip, setCustomIsRoundtrip] = useState(true);
  const [waitingHours, setWaitingHours] = useState(4);
  const [isEarlyOrNight, setIsEarlyOrNight] = useState(false);
  const [hasLuggage, setHasLuggage] = useState(false);
  const [copiedPhrase, setCopiedPhrase] = useState(false);
  const [isSpeakingPhrase, setIsSpeakingPhrase] = useState(false);

  // --- POOLING BOARD STATE ---
  const [rides, setRides] = useState<SharedRide[]>(INITIAL_SHARED_RIDES);
  const [filterType, setFilterType] = useState<string>("all");
  const [showNewRideModal, setShowNewRideModal] = useState(false);
  const [selectedRideForBooking, setSelectedRideForBooking] =
    useState<SharedRide | null>(null);
  const [seatsToBook, setSeatsToBook] = useState(1);
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [confirmedBookingTicket, setConfirmedBookingTicket] = useState<{
    ride: SharedRide;
    seats: number;
    passengerName: string;
    totalAmount: number;
    pin: string;
  } | null>(null);

  // New Ride Posting Form State
  const [newCircuitTitle, setNewCircuitTitle] = useState(
    "Pattadakal → Aihole Afternoon Shuttle"
  );
  const [newOrigin, setNewOrigin] = useState("Pattadakal Monument Parking Lot");
  const [newDestination, setNewDestination] = useState("Aihole Durga Temple");
  const [newDepartureTime, setNewDepartureTime] = useState("02:15 PM");
  const [newVehicleType, setNewVehicleType] = useState<
    | "Tempo Traveler (12-Seater)"
    | "Cruiser 4x4 (9-Seater)"
    | "Auto Rickshaw (3-Seater)"
  >("Cruiser 4x4 (9-Seater)");
  const [newTotalSeats, setNewTotalSeats] = useState(9);
  const [newMinSeats, setNewMinSeats] = useState(4);
  const [newPricePerSeat, setNewPricePerSeat] = useState(120);
  const [newHostName, setNewHostName] = useState("You (Verified Traveler)");
  const [newHostPhone, setNewHostPhone] = useState("+91 98450 11223");
  const [newNotes, setNewNotes] = useState(
    "Departing after viewing Virupaksha temple to beat the afternoon bus gap."
  );

  // --- BUS SCHEDULE FILTER STATE ---
  const [busDirection, setBusDirection] = useState<"onward" | "return">(
    "onward"
  );

  // Current calculation derived values
  const currentCalculation = useMemo(() => {
    let distanceKm = 0;
    let title = "";
    let negotiationPhrase = "";
    let stopsList: string[] = [];

    if (tripType === "preset") {
      const preset =
        PRESET_CIRCUITS.find((p) => p.id === selectedPresetId) ||
        PRESET_CIRCUITS[0];
      distanceKm = preset.totalKmRoundtrip;
      title = preset.name;
      negotiationPhrase = preset.kannadaNegotiationPhrase;
      stopsList = preset.stops;
    } else {
      const pStop =
        CIRCUIT_STOPS.find((s) => s.id === customPickup) || CIRCUIT_STOPS[0];
      const dStop =
        CIRCUIT_STOPS.find((s) => s.id === customDropoff) || CIRCUIT_STOPS[4];
      const oneWayKm = Math.abs(
        dStop.distanceFromBadamiKm - pStop.distanceFromBadamiKm
      );
      distanceKm = customIsRoundtrip ? oneWayKm * 2 : oneWayKm;
      title = `${pStop.name} → ${dStop.name} (${
        customIsRoundtrip ? "Roundtrip" : "One-Way Drop"
      })`;
      stopsList = [pStop.name, dStop.name];
      if (customIsRoundtrip) stopsList.push(`Return to ${pStop.name}`);
    }

    // Formula: Base ₹40 + ₹16/km + ₹60/hr waiting
    const baseFare = 40;
    const distanceFare = distanceKm * 16;
    const waitingFare = waitingHours * 60;
    const subtotal = baseFare + distanceFare + waitingFare;

    const nightMultiplier = isEarlyOrNight ? 1.25 : 1.0;
    const luggageSurcharge = hasLuggage ? 30 : 0;
    const totalFare = Math.round(subtotal * nightMultiplier + luggageSurcharge);

    if (tripType === "custom") {
      negotiationPhrase = `ಅಣ್ಣ, ${title} ಪ್ರಯಾಣಕ್ಕೆ ಸರ್ಕಾರಿ ದರ ಸೂತ್ರದಂತೆ (ಬೇಸ್ ₹40 + ಕಿಮೀ ₹16 + ಕಾಯುವಿಕೆ ₹60/ಗಂಟೆ) ಒಟ್ಟು ₹${totalFare} ಆಗುತ್ತೆ. ಬರ್ತೀರಾ?`;
    }

    return {
      title,
      distanceKm,
      baseFare,
      distanceFare,
      waitingFare,
      subtotal,
      nightMultiplier,
      luggageSurcharge,
      totalFare,
      stopsList,
      negotiationPhrase,
    };
  }, [
    tripType,
    selectedPresetId,
    customPickup,
    customDropoff,
    customIsRoundtrip,
    waitingHours,
    isEarlyOrNight,
    hasLuggage,
  ]);

  // Audio speech synthesis for Kannada negotiation phrase
  const handleSpeakPhrase = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isSpeakingPhrase) {
      window.speechSynthesis.cancel();
      setIsSpeakingPhrase(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "kn-IN";
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeakingPhrase(true);
    utterance.onend = () => setIsSpeakingPhrase(false);
    utterance.onerror = () => setIsSpeakingPhrase(false);
    window.speechSynthesis.speak(utterance);
  };

  // Copy phrase helper
  const handleCopyPhrase = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedPhrase(true);
      setTimeout(() => setCopiedPhrase(false), 2500);
    }
  };

  // Filtered rides
  const filteredRides = useMemo(() => {
    if (filterType === "all") return rides;
    if (filterType === "kstdc") {
      return rides.filter((r) => r.circuitName.toLowerCase().includes("kstdc"));
    }
    if (filterType === "gap") {
      return rides.filter(
        (r) =>
          r.circuitName.toLowerCase().includes("pattadakal") &&
          r.circuitName.toLowerCase().includes("aihole")
      );
    }
    if (filterType === "open") {
      return rides.filter((r) => r.totalSeats - r.seatsBooked > 0);
    }
    return rides;
  }, [rides, filterType]);

  // Handle open booking modal
  const handleOpenBookingModal = (ride: SharedRide) => {
    setSelectedRideForBooking(ride);
    setSeatsToBook(1);
    setBookingName("");
    setBookingPhone("");
  };

  // Confirm booking
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRideForBooking) return;

    const rideId = selectedRideForBooking.id;
    const requestedSeats = Number(seatsToBook);

    setRides((prev) =>
      prev.map((r) => {
        if (r.id === rideId) {
          const nextBooked = r.seatsBooked + requestedSeats;
          let nextStatus: SharedRide["status"] = r.status;
          if (nextBooked >= r.totalSeats) {
            nextStatus = "Full";
          } else if (nextBooked >= r.minRequiredSeats) {
            nextStatus = "Threshold Met";
          }
          return {
            ...r,
            seatsBooked: nextBooked,
            status: nextStatus,
          };
        }
        return r;
      })
    );

    const generatedPin = `VTP-${Math.floor(1000 + Math.random() * 9000)}`;
    const ticket = {
      ride: selectedRideForBooking,
      seats: requestedSeats,
      passengerName: bookingName || "Verified Guest",
      totalAmount: requestedSeats * selectedRideForBooking.pricePerSeatINR,
      pin: generatedPin,
    };

    setConfirmedBookingTicket(ticket);
    setSelectedRideForBooking(null);
  };

  // Create new pool
  const handlePostNewRide = (e: React.FormEvent) => {
    e.preventDefault();
    const newRide: SharedRide = {
      id: `ride-${Date.now()}`,
      circuitName: newCircuitTitle,
      date: "2026-09-25",
      departureTime: newDepartureTime,
      origin: newOrigin,
      stops: [newDestination],
      vehicleType: newVehicleType,
      totalSeats: Number(newTotalSeats),
      seatsBooked: 1, // Host takes 1 seat
      minRequiredSeats: Number(newMinSeats),
      pricePerSeatINR: Number(newPricePerSeat),
      hostName: newHostName,
      hostPhone: newHostPhone,
      pickupPin: newOrigin,
      status: "Boarding",
      sampleNotice: true,
      notes: newNotes,
    };

    setRides([newRide, ...rides]);
    setShowNewRideModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Module Title & Tab Navigation */}
      <div className="border-b border-stone-200 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold mb-1 flex items-center gap-1.5">
              <span>Phase 03 · Smart Technology</span>
              <span className="text-stone-300">|</span>
              <span className="text-stone-500 font-sans normal-case">
                Last-Mile Transit & Community Pooling
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Circuit Mobility, Fair-Fare Pricing & Seat Pooling
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
              Solves Bagalkote&apos;s acute transit divide: documents the 
              critical <strong className="text-stone-900 font-medium">2–3 NWKRTC bus bottleneck between Pattadakal &amp; Aihole</strong>, provides a transparent fair-fare auto calculator (Base ₹40 + ₹16/km + ₹60/hr waiting), and powers real-time seat pooling to unlock the KSTDC 8:00 AM hotel departure minimums.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs font-medium">
            <button
              onClick={() => setActiveTab("calculator")}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === "calculator"
                  ? "bg-white text-stone-900 shadow-xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-amber-800" />
              <span>Fair-Fare Auto Calculator</span>
            </button>
            <button
              onClick={() => setActiveTab("pooling")}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === "pooling"
                  ? "bg-white text-stone-900 shadow-xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Users className="w-3.5 h-3.5 text-amber-800" />
              <span>Shared Tempo &amp; Seat Board</span>
            </button>
            <button
              onClick={() => setActiveTab("bus_gap")}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === "bus_gap"
                  ? "bg-white text-stone-900 shadow-xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Bus className="w-3.5 h-3.5 text-amber-800" />
              <span>NWKRTC Bottleneck &amp; Gap Timetable</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transit Bottleneck Callout Banner */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-lg p-4 space-y-2 text-xs text-amber-950">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-800 shrink-0" />
            <span className="font-bold text-amber-950 text-sm">
              Documented Transit Bottleneck: The Pattadakal–Aihole 13 km Void
            </span>
          </div>
          <span className="font-mono text-[10px] bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded font-semibold">
            NWKRTC Field Audit
          </span>
        </div>
        <p className="leading-relaxed text-amber-900">
          While Badami town is well-serviced with hourly buses to Bagalkote and Hubballi,{" "}
          <strong>only 2 to 3 government NWKRTC buses run daily between the two UNESCO/ASI sister sites of Pattadakal and Aihole</strong>. Missing the 01:15 PM afternoon bus at Pattadakal strands travelers for nearly 4 hours until 05:10 PM. Vatapi&apos;s seat pooling board pairs solo travelers into shared tempos and offers auto drivers a standardized, fair tariff that replaces arbitrary pricing.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: FAIR-FARE AUTO RICKSHAW CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === "calculator" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Controls Column */}
            <div className="lg:col-span-6 bg-white border border-stone-200 rounded-lg p-5 space-y-5 text-xs">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-amber-800" />
                  <h3 className="font-serif font-bold text-stone-900 text-base">
                    Transparent Tariff Estimator
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-stone-500">
                  Formula: Base ₹40 + ₹16/km + ₹60/hr
                </span>
              </div>

              {/* Mode Toggle: Preset Circuit vs Custom Route */}
              <div className="space-y-2">
                <label className="block font-semibold text-stone-800">
                  Select Trip Mode:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTripType("preset")}
                    className={`py-2 px-3 rounded border text-center transition-all ${
                      tripType === "preset"
                        ? "bg-amber-900 text-white border-amber-950 font-medium shadow-xs"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    Popular Heritage Circuits
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType("custom")}
                    className={`py-2 px-3 rounded border text-center transition-all ${
                      tripType === "custom"
                        ? "bg-amber-900 text-white border-amber-950 font-medium shadow-xs"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    Custom Point-to-Point Route
                  </button>
                </div>
              </div>

              {/* Preset Circuits List */}
              {tripType === "preset" ? (
                <div className="space-y-2">
                  <label className="block font-semibold text-stone-800">
                    Choose Circuit:
                  </label>
                  <div className="space-y-2">
                    {PRESET_CIRCUITS.map((circuit) => {
                      const isSelected = selectedPresetId === circuit.id;
                      return (
                        <div
                          key={circuit.id}
                          onClick={() => {
                            setSelectedPresetId(circuit.id);
                            setWaitingHours(circuit.typicalWaitingHours);
                          }}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            isSelected
                              ? "bg-amber-50/80 border-amber-800/80 ring-1 ring-amber-700"
                              : "bg-white border-stone-200 hover:border-stone-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-stone-900 text-sm">
                              {circuit.name}
                            </span>
                            <span className="font-mono text-xs font-semibold text-amber-900">
                              ~{circuit.totalKmRoundtrip} km
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-500 mt-0.5">
                            {circuit.kannadaName}
                          </div>
                          <div className="text-[11px] text-stone-600 mt-1">
                            {circuit.recommendedFor}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {circuit.stops.map((stop, sidx) => (
                              <span
                                key={sidx}
                                className="text-[10px] bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded border border-stone-200"
                              >
                                {stop}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Custom Route Selector */
                <div className="space-y-3 bg-stone-50 p-3.5 rounded-lg border border-stone-200">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Origin Stop:
                    </label>
                    <select
                      value={customPickup}
                      onChange={(e) => setCustomPickup(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded bg-white text-stone-800 font-medium"
                    >
                      {CIRCUIT_STOPS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.distanceFromBadamiKm} km datum)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Destination Stop:
                    </label>
                    <select
                      value={customDropoff}
                      onChange={(e) => setCustomDropoff(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded bg-white text-stone-800 font-medium"
                    >
                      {CIRCUIT_STOPS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.distanceFromBadamiKm} km datum)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="customRoundtrip"
                      checked={customIsRoundtrip}
                      onChange={(e) => setCustomIsRoundtrip(e.target.checked)}
                      className="rounded accent-amber-800 cursor-pointer"
                    />
                    <label
                      htmlFor="customRoundtrip"
                      className="text-stone-700 cursor-pointer font-medium"
                    >
                      Roundtrip Return (Driver waits and brings you back to origin)
                    </label>
                  </div>
                </div>
              )}

              {/* Waiting Hours Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-stone-800">
                    Monument Waiting Duration:
                  </label>
                  <span className="font-mono text-stone-900 font-bold bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                    {waitingHours} Hour{waitingHours !== 1 ? "s" : ""} (₹
                    {waitingHours * 60})
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.5"
                  value={waitingHours}
                  onChange={(e) => setWaitingHours(Number(e.target.value))}
                  className="w-full accent-amber-800 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                  <span>0 hrs (Direct drop)</span>
                  <span>2 hrs (Quick stop)</span>
                  <span>4 hrs (Full tour)</span>
                  <span>6 hrs (Day relaxed)</span>
                </div>
              </div>

              {/* Surcharge Options */}
              <div className="pt-2 border-t border-stone-200 space-y-2">
                <span className="font-semibold text-stone-800 block">
                  Additional Regulated Conditions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 p-2 rounded border border-stone-200 bg-stone-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isEarlyOrNight}
                      onChange={(e) => setIsEarlyOrNight(e.target.checked)}
                      className="accent-amber-800 rounded"
                    />
                    <div>
                      <span className="font-medium text-stone-800 block">
                        Early Dawn / Night (9 PM–6 AM)
                      </span>
                      <span className="text-[10px] text-stone-500">
                        +25% night meter multiplier
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded border border-stone-200 bg-stone-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasLuggage}
                      onChange={(e) => setHasLuggage(e.target.checked)}
                      className="accent-amber-800 rounded"
                    />
                    <div>
                      <span className="font-medium text-stone-800 block">
                        Roof Carrier / Heavy Luggage
                      </span>
                      <span className="text-[10px] text-stone-500">
                        Flat +₹30 handling fee
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Breakdown & Negotiation Card Column */}
            <div className="lg:col-span-6 space-y-4">
              {/* Fare Summary Box */}
              <div className="bg-stone-900 text-stone-100 rounded-lg p-5 border border-stone-800 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                      Standard Local Tariff Output
                    </span>
                    <h4 className="font-serif font-bold text-lg text-white">
                      {currentCalculation.title}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 uppercase block font-mono">
                      Estimated Fair Fare
                    </span>
                    <span className="text-3xl font-serif font-bold text-amber-300 font-mono">
                      ₹{currentCalculation.totalFare}
                    </span>
                  </div>
                </div>

                {/* Mathematical Formula Breakdown */}
                <div className="space-y-2 bg-stone-950/60 p-3.5 rounded border border-stone-800">
                  <div className="font-semibold text-stone-300 text-[11px] flex items-center justify-between">
                    <span>Transparent Cost Breakdown:</span>
                    <span className="font-mono text-stone-400">
                      ~{currentCalculation.distanceKm} km total
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px] text-stone-400 border-t border-stone-800/80 pt-2">
                    <div className="flex justify-between">
                      <span>Base Flag-Down Fare (First 1.5 km):</span>
                      <span className="font-mono text-stone-200">
                        ₹{currentCalculation.baseFare}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        Distance Charge ({currentCalculation.distanceKm} km × ₹16/km):
                      </span>
                      <span className="font-mono text-stone-200">
                        ₹{currentCalculation.distanceFare}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        Monument Waiting ({waitingHours} hrs × ₹60/hr):
                      </span>
                      <span className="font-mono text-stone-200">
                        ₹{currentCalculation.waitingFare}
                      </span>
                    </div>

                    {isEarlyOrNight && (
                      <div className="flex justify-between text-amber-300">
                        <span>Night / Early Dawn Surcharge (1.25x):</span>
                        <span className="font-mono">
                          +₹
                          {Math.round(
                            currentCalculation.subtotal * 0.25
                          )}
                        </span>
                      </div>
                    )}

                    {hasLuggage && (
                      <div className="flex justify-between text-amber-300">
                        <span>Luggage Roof Carrier:</span>
                        <span className="font-mono">+₹30</span>
                      </div>
                    )}

                    <div className="flex justify-between font-bold text-stone-100 border-t border-stone-700/80 pt-1.5 text-xs">
                      <span>Total Fair Benchmark:</span>
                      <span className="font-mono text-amber-300">
                        ₹{currentCalculation.totalFare}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-stone-400 leading-relaxed">
                  <strong className="text-stone-300">Per-Person Split:</strong> For 3 passengers sharing an auto, this comes out to only{" "}
                  <span className="font-mono text-amber-300 font-semibold">
                    ₹{Math.round(currentCalculation.totalFare / 3)} / head
                  </span>.
                </div>
              </div>

              {/* Kannada Auto Negotiation Card */}
              <div className="bg-amber-50 border border-amber-300/80 rounded-lg p-5 space-y-3.5 text-xs">
                <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-amber-800" />
                    <span className="font-bold text-amber-950 font-serif">
                      Instant Kannada Negotiation Phrase
                    </span>
                  </div>
                  <span className="text-[10px] text-amber-800 font-mono">
                    Local Etiquette
                  </span>
                </div>

                <p className="text-stone-700 text-[11px] leading-relaxed">
                  Badami auto operators respect transparent rate formulas when presented politely. Show this card or play the audio phrase aloud to agree on a mutually respected rate before embarking:
                </p>

                {/* Phrase Card Display */}
                <div className="bg-white p-4 rounded border border-amber-200 space-y-2 shadow-xs">
                  <div className="font-serif text-sm sm:text-base font-bold text-stone-900 leading-snug">
                    {currentCalculation.negotiationPhrase}
                  </div>
                  <div className="text-[11px] text-stone-500 italic">
                    Romanized: &ldquo;Anna, sarkari dara sutrada prakara (base ₹40 + km ₹16 + kayuvike ₹60/gante) ottu ₹{currentCalculation.totalFare} aagutte. Bartheera?&rdquo;
                  </div>
                </div>

                {/* Audio Playback & Copy Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      handleSpeakPhrase(currentCalculation.negotiationPhrase)
                    }
                    className="flex items-center gap-1.5 bg-amber-800 hover:bg-amber-700 text-white px-3.5 py-1.5 rounded font-medium transition-colors shadow-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>
                      {isSpeakingPhrase ? "Stop Audio" : "Play Kannada Audio"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopyPhrase(currentCalculation.negotiationPhrase)
                    }
                    className="flex items-center gap-1.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 px-3 py-1.5 rounded font-medium transition-colors"
                  >
                    {copiedPhrase ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Negotiation Card</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: SHARED TEMPO & RIDE POOLING BOARD */}
      {/* ========================================================================= */}
      {activeTab === "pooling" && (
        <div className="space-y-6">
          {/* Header Controls & Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-stone-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5 mr-1">
                <Filter className="w-3.5 h-3.5 text-amber-800" />
                <span>Filter Rides:</span>
              </span>

              {[
                { id: "all", label: "All Active Pools" },
                { id: "kstdc", label: "KSTDC 8 AM Tempos" },
                { id: "gap", label: "Pattadakal-Aihole Shuttles" },
                { id: "open", label: "Open Seats Only" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setFilterType(filter.id)}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    filterType === filter.id
                      ? "bg-amber-900 text-white font-medium shadow-xs"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowNewRideModal(true)}
              className="flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white px-3.5 py-1.5 rounded text-xs font-medium transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" />
              <span>Offer Empty Seats / Start a Pool</span>
            </button>
          </div>

          {/* Confirmed Booking Slip Notice */}
          {confirmedBookingTicket && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-5 space-y-3 text-xs text-emerald-950">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-emerald-950">
                      Confirmed Ride Reservation · Digital Boarding Pass
                    </h4>
                    <span className="text-[11px] text-emerald-800">
                      Meetup verified with KSTDC / Host Dispatcher
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded font-bold text-emerald-900">
                    PIN: {confirmedBookingTicket.pin}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white/80 p-3 rounded border border-emerald-200 text-stone-800">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block font-mono">
                    Trip Circuit
                  </span>
                  <span className="font-semibold text-xs text-stone-900">
                    {confirmedBookingTicket.ride.circuitName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block font-mono">
                    Departure Time
                  </span>
                  <span className="font-mono font-bold text-stone-900">
                    {confirmedBookingTicket.ride.departureTime} (
                    {confirmedBookingTicket.ride.date})
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block font-mono">
                    Pickup Location
                  </span>
                  <span className="font-medium text-stone-800">
                    {confirmedBookingTicket.ride.pickupPin}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block font-mono">
                    Passenger &amp; Tariff
                  </span>
                  <span className="font-bold text-amber-900">
                    {confirmedBookingTicket.seats} Seat(s) · ₹
                    {confirmedBookingTicket.totalAmount}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-emerald-800">
                  Host contact: <strong>{confirmedBookingTicket.ride.hostName}</strong> (
                  {confirmedBookingTicket.ride.hostPhone})
                </span>
                <button
                  onClick={() => setConfirmedBookingTicket(null)}
                  className="text-stone-500 hover:text-stone-800 text-[11px] underline"
                >
                  Dismiss Ticket
                </button>
              </div>
            </div>
          )}

          {/* Ride Pooling Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRides.map((ride) => {
              const availableSeats = ride.totalSeats - ride.seatsBooked;
              const isFull = availableSeats <= 0;
              const isKSTDC = ride.circuitName.toLowerCase().includes("kstdc");
              const thresholdMet = ride.seatsBooked >= ride.minRequiredSeats;
              const seatsToThreshold = Math.max(
                0,
                ride.minRequiredSeats - ride.seatsBooked
              );

              return (
                <div
                  key={ride.id}
                  className="bg-white border border-stone-200 rounded-lg p-5 space-y-4 hover:border-amber-700/50 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                          <span className="font-mono font-semibold text-stone-800">
                            {ride.departureTime}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{ride.date}</span>
                          {isKSTDC && (
                            <span className="bg-amber-100 text-amber-900 font-mono text-[10px] px-1.5 py-0.5 rounded font-semibold border border-amber-200">
                              KSTDC Official Pool
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif font-bold text-stone-900 text-base leading-snug">
                          {ride.circuitName}
                        </h4>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-2xl font-serif font-bold text-amber-900 font-mono">
                          ₹{ride.pricePerSeatINR}
                        </span>
                        <span className="text-[10px] text-stone-500 block">
                          / seat
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar for Minimum Passenger Dispatch Threshold */}
                    <div className="bg-stone-50 p-2.5 rounded border border-stone-200/80 space-y-1.5 text-xs">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-stone-600 font-medium">
                          Dispatch Threshold:{" "}
                          <strong>{ride.minRequiredSeats} seats needed</strong>
                        </span>
                        <span
                          className={`font-mono font-bold ${
                            thresholdMet ? "text-emerald-700" : "text-amber-700"
                          }`}
                        >
                          {thresholdMet
                            ? "✓ Guaranteed Departure"
                            : `${seatsToThreshold} more seat${
                                seatsToThreshold > 1 ? "s" : ""
                              } needed`}
                        </span>
                      </div>

                      {/* Visual progress bar */}
                      <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            thresholdMet ? "bg-emerald-600" : "bg-amber-600"
                          }`}
                          style={{
                            width: `${Math.min(
                              100,
                              (ride.seatsBooked / ride.totalSeats) * 100
                            )}%`,
                          }}
                        />
                      </div>

                      <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                        <span>{ride.seatsBooked} Booked</span>
                        <span>{ride.totalSeats} Total Vehicle Capacity</span>
                      </div>
                    </div>

                    {/* Trip Details Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-stone-700">
                      <div className="bg-stone-50 p-2 rounded border border-stone-100">
                        <span className="text-[10px] text-stone-400 uppercase block font-mono">
                          Vehicle
                        </span>
                        <span className="font-medium text-stone-800 truncate block">
                          {ride.vehicleType}
                        </span>
                      </div>
                      <div className="bg-stone-50 p-2 rounded border border-stone-100">
                        <span className="text-[10px] text-stone-400 uppercase block font-mono">
                          Coordinator / Host
                        </span>
                        <span className="font-medium text-stone-800 truncate block">
                          {ride.hostName}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-stone-600 space-y-1">
                      <div>
                        <strong className="text-stone-700">Pickup Pin:</strong>{" "}
                        {ride.pickupPin}
                      </div>
                      <p className="text-[11px] text-stone-500 italic">
                        &ldquo;{ride.notes}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Booking Action Row */}
                  <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-stone-600">
                      <Users className="w-3.5 h-3.5 text-amber-800" />
                      <span className="font-medium">
                        {availableSeats} of {ride.totalSeats} seats open
                      </span>
                    </div>

                    <button
                      onClick={() => handleOpenBookingModal(ride)}
                      disabled={isFull}
                      className={`px-4 py-1.5 rounded font-medium text-xs transition-colors shadow-xs ${
                        isFull
                          ? "bg-stone-200 text-stone-500 cursor-not-allowed"
                          : "bg-amber-800 hover:bg-amber-700 text-white"
                      }`}
                    >
                      {isFull ? "Trip Full" : "Reserve Seat →"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: NWKRTC BUS BOTTLENECK & TIMETABLE */}
      {/* ========================================================================= */}
      {activeTab === "bus_gap" && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-lg p-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800 font-semibold">
                  Public Transit Reality Audit
                </span>
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  NWKRTC Pattadakal–Aihole 13 km Bus Timetable
                </h3>
              </div>

              {/* Direction Switcher */}
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded border border-stone-200 text-xs">
                <button
                  onClick={() => setBusDirection("onward")}
                  className={`px-3 py-1 rounded transition-colors ${
                    busDirection === "onward"
                      ? "bg-amber-900 text-white font-medium"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  Pattadakal → Aihole (3 Buses)
                </button>
                <button
                  onClick={() => setBusDirection("return")}
                  className={`px-3 py-1 rounded transition-colors ${
                    busDirection === "return"
                      ? "bg-amber-900 text-white font-medium"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  Aihole → Pattadakal / Badami (3 Buses)
                </button>
              </div>
            </div>

            {/* Timetable Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-300 bg-stone-50 font-serif font-bold text-stone-900">
                    <th className="py-2.5 px-3">Departure</th>
                    <th className="py-2.5 px-3">Arrival</th>
                    <th className="py-2.5 px-3">Route &amp; Bus Type</th>
                    <th className="py-2.5 px-3">Stops</th>
                    <th className="py-2.5 px-3">Ticket</th>
                    <th className="py-2.5 px-3">Risk Assessment / Bottleneck Notice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {(busDirection === "onward"
                    ? NWKRTC_PATTADAKAL_AIHOLE_BUSES
                    : NWKRTC_RETURN_AIHOLE_PATTADAKAL
                  ).map((bus) => (
                    <tr key={bus.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-stone-900 text-sm whitespace-nowrap">
                        {bus.departureTime}
                      </td>
                      <td className="py-3 px-3 font-mono text-stone-600 whitespace-nowrap">
                        {bus.arrivalTime}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-stone-800">
                          {bus.route}
                        </div>
                        <span className="text-[10px] text-stone-500 font-mono">
                          {bus.busType}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-stone-600">
                        <div>
                          {bus.originStop} → {bus.destinationStop}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-amber-900">
                        ₹{bus.fareINR}
                      </td>
                      <td className="py-3 px-3">
                        {bus.gapRiskAlert ? (
                          <div className="flex items-start gap-1.5 text-red-900 bg-red-50 p-2 rounded border border-red-200 text-[11px]">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-700 shrink-0 mt-0.5" />
                            <span>{bus.gapRiskAlert}</span>
                          </div>
                        ) : (
                          <span className="text-stone-500 text-[11px]">
                            {bus.frequencyNote}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Missed-Bus Protocol & Workarounds */}
            <div className="pt-4 border-t border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-1.5">
                <span className="font-semibold text-stone-900 block flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-amber-800" />
                  Protocol 1: Shared Jeep via Amingad
                </span>
                <p className="text-stone-600 leading-relaxed">
                  If you miss the 01:15 PM Pattadakal bus, walk 400m to Pattadakal Cross. Flag down shared &ldquo;Cruiser / Commander&rdquo; jeeps going towards <strong>Amingad</strong> (₹30/seat). From Amingad bus stand, frequent local autos run into Aihole (₹20/head).
                </p>
              </div>

              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-1.5">
                <span className="font-semibold text-stone-900 block flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-800" />
                  Protocol 2: Join Parking Lot Pool
                </span>
                <p className="text-stone-600 leading-relaxed">
                  Head to Pattadakal ASI monument parking lot near Tea Stall #3. Solo travelers frequently congregate here between 12:30 PM and 01:45 PM to charter a 3-seater auto for ₹250 (split 3 ways = ₹85 each).
                </p>
              </div>

              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-1.5">
                <span className="font-semibold text-stone-900 block flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-800" />
                  Protocol 3: Final 05:55 PM Return Deadline
                </span>
                <p className="text-stone-600 leading-relaxed">
                  Do NOT miss the 05:55 PM final bus leaving Aihole Main Arch. After sunset, zero shared transit exists back to Badami; private taxis from Hungund or Bagalkot charge upwards of ₹1,000 for emergency calls.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: RESERVE SEATS IN EXISTING POOL */}
      {/* ========================================================================= */}
      {selectedRideForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-xl border border-stone-200 w-full max-w-md p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono text-stone-500">
                  Seat Pooling Booking
                </span>
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  {selectedRideForBooking.circuitName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRideForBooking(null)}
                className="text-stone-400 hover:text-stone-600 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-3.5">
              <div className="bg-stone-50 p-3 rounded border border-stone-200 space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-600">Departure:</span>
                  <span className="font-mono font-bold text-stone-900">
                    {selectedRideForBooking.departureTime} (
                    {selectedRideForBooking.date})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Vehicle:</span>
                  <span className="font-medium text-stone-800">
                    {selectedRideForBooking.vehicleType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Pickup Location:</span>
                  <span className="font-medium text-stone-800">
                    {selectedRideForBooking.pickupPin}
                  </span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-1 mt-1">
                  <span className="text-stone-600">Price per seat:</span>
                  <span className="font-mono font-bold text-amber-900">
                    ₹{selectedRideForBooking.pricePerSeatINR}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Your Full Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Rao"
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs focus:ring-1 focus:ring-amber-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Mobile Number (for pickup SMS &amp; driver WhatsApp):
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98450 12345"
                  value={bookingPhone}
                  onChange={(e) => setBookingPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs focus:ring-1 focus:ring-amber-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Number of Seats to Reserve:
                </label>
                <select
                  value={seatsToBook}
                  onChange={(e) => setSeatsToBook(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs bg-white focus:ring-1 focus:ring-amber-700 focus:outline-none"
                >
                  {Array.from(
                    {
                      length: Math.min(
                        4,
                        selectedRideForBooking.totalSeats -
                          selectedRideForBooking.seatsBooked
                      ),
                    },
                    (_, i) => i + 1
                  ).map((num) => (
                    <option key={num} value={num}>
                      {num} Seat{num > 1 ? "s" : ""} — ₹
                      {num * selectedRideForBooking.pricePerSeatINR} Total
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-500 block uppercase font-mono">
                    Total Payable at Boarding
                  </span>
                  <span className="text-base font-bold font-mono text-amber-900">
                    ₹{seatsToBook * selectedRideForBooking.pricePerSeatINR}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRideForBooking(null)}
                    className="px-3 py-1.5 rounded border border-stone-300 text-stone-600 hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-amber-800 hover:bg-amber-700 text-white font-medium shadow-xs"
                  >
                    Confirm Reservation
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: OFFER SEATS / CREATE NEW POOL */}
      {/* ========================================================================= */}
      {showNewRideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-xl border border-stone-200 w-full max-w-lg p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono text-amber-800 font-semibold">
                  Community Mobility
                </span>
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  Offer Empty Seats in Your Vehicle / Auto
                </h3>
              </div>
              <button
                onClick={() => setShowNewRideModal(false)}
                className="text-stone-400 hover:text-stone-600 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handlePostNewRide} className="space-y-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Trip Title / Circuit:
                </label>
                <input
                  type="text"
                  required
                  value={newCircuitTitle}
                  onChange={(e) => setNewCircuitTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs"
                  placeholder="e.g. Afternoon Pattadakal to Aihole Pool"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Pickup Location:
                  </label>
                  <input
                    type="text"
                    required
                    value={newOrigin}
                    onChange={(e) => setNewOrigin(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Destination Stop:
                  </label>
                  <input
                    type="text"
                    required
                    value={newDestination}
                    onChange={(e) => setNewDestination(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Departure Time:
                  </label>
                  <input
                    type="text"
                    required
                    value={newDepartureTime}
                    onChange={(e) => setNewDepartureTime(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Vehicle Type:
                  </label>
                  <select
                    value={newVehicleType}
                    onChange={(e) => {
                      const v = e.target.value as any;
                      setNewVehicleType(v);
                      if (v.includes("12")) {
                        setNewTotalSeats(12);
                        setNewMinSeats(6);
                      } else if (v.includes("9")) {
                        setNewTotalSeats(9);
                        setNewMinSeats(4);
                      } else {
                        setNewTotalSeats(3);
                        setNewMinSeats(2);
                      }
                    }}
                    className="w-full px-2 py-2 border border-stone-300 rounded text-xs bg-white"
                  >
                    <option value="Auto Rickshaw (3-Seater)">Auto (3-Seater)</option>
                    <option value="Cruiser 4x4 (9-Seater)">Cruiser (9-Seater)</option>
                    <option value="Tempo Traveler (12-Seater)">
                      Tempo Traveler (12-Seater)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Cost / Seat (₹):
                  </label>
                  <input
                    type="number"
                    required
                    value={newPricePerSeat}
                    onChange={(e) => setNewPricePerSeat(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Your Name / Coordinator:
                  </label>
                  <input
                    type="text"
                    required
                    value={newHostName}
                    onChange={(e) => setNewHostName(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Contact Phone:
                  </label>
                  <input
                    type="tel"
                    required
                    value={newHostPhone}
                    onChange={(e) => setNewHostPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Trip Notes &amp; Departure Threshold:
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs"
                  placeholder="e.g. Requires 4 passengers minimum to depart. AC vehicle."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowNewRideModal(false)}
                  className="px-3.5 py-1.5 rounded border border-stone-300 text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-amber-800 hover:bg-amber-700 text-white font-medium shadow-xs"
                >
                  Publish Ride Pool
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
