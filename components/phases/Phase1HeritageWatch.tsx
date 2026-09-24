"use client";

import React, { useState } from "react";
import {
  IssueReport,
  INITIAL_HERITAGE_ISSUES,
  TALUK_OFFICIALS,
} from "@/lib/data/heritage-watch";
import {
  AlertTriangle,
  Clock,
  Building,
  UserCheck,
  CheckCircle,
  Share2,
  ChevronDown,
  ChevronUp,
  MapPin,
  TrendingUp,
  Sparkles,
  Camera,
  Layers,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  ShieldAlert,
  Search,
  HeartHandshake,
  Briefcase,
  FileSpreadsheet,
  RotateCcw,
  SlidersHorizontal,
  FileText,
  User,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { AdoptIssueModal } from "@/components/AdoptIssueModal";
import { InvestorInterestModal } from "@/components/InvestorInterestModal";
import { PhotoVerificationModal } from "@/components/PhotoVerificationModal";
import { OfficialDispatchModal } from "@/components/OfficialDispatchModal";
import { DistrictDossierModal } from "@/components/DistrictDossierModal";
import { HeritageTalukMap } from "@/components/HeritageTalukMap";

interface Phase1Props {
  onOpenReportModal: () => void;
  issues?: IssueReport[];
  setIssues?: React.Dispatch<React.SetStateAction<IssueReport[]>>;
}

export const Phase1HeritageWatch: React.FC<Phase1Props> = ({
  onOpenReportModal,
  issues: externalIssues,
  setIssues: externalSetIssues,
}) => {
  // Use external state if passed, otherwise maintain local state
  const [localIssues, setLocalIssues] = useState<IssueReport[]>(INITIAL_HERITAGE_ISSUES);
  const issues = externalIssues || localIssues;
  const setIssues = externalSetIssues || setLocalIssues;

  // Active Role Persona Switcher
  const [activeRole, setActiveRole] = useState<
    "citizen" | "official" | "csr_partner" | "investor"
  >("citizen");

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [talukFilter, setTalukFilter] = useState<"All" | "Badami" | "Hungund">("All");
  const [laneFilter, setLaneFilter] = useState<
    "All" | "Government Fix" | "Community / CSR Fix" | "Investor PPP Lane"
  >("All");
  const [severityFilter, setSeverityFilter] = useState<"All" | "Critical" | "High" | "Medium" | "Low">("All");
  const [statusFilter, setStatusFilter] = useState<"All" | "Open" | "Pending" | "Closed">("All");
  const [sortBy, setSortBy] = useState<"urgency" | "sla" | "date">("urgency");
  const [selectedMonumentMapPin, setSelectedMonumentMapPin] = useState<string | null>(null);

  // Expanded card state
  const [expandedIssueId, setExpandedIssueId] = useState<string | null>("vatapi-hw-001");

  // Active Modals
  const [adoptingIssue, setAdoptingIssue] = useState<IssueReport | null>(null);
  const [investingIssue, setInvestingIssue] = useState<IssueReport | null>(null);
  const [verifyingIssue, setVerifyingIssue] = useState<IssueReport | null>(null);
  const [dispatchIssue, setDispatchIssue] = useState<IssueReport | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [showMap, setShowMap] = useState(true);

  // ACTION 1: Endorse / Co-sign (Independent Confirmation)
  const handleEndorse = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIssues((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              upvotesCount: item.upvotesCount + 1,
              // If reached 5+, trigger notification that multi-confirmation threshold is met
            }
          : item
      )
    );
  };

  // ACTION 2: Simulate 7-Day SLA Expiry (Fast-forward clock to test escalation)
  const handleFastForwardSla = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIssues((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newDays = Math.max(0, item.daysRemaining - 5);
        let nextEscalation = item.escalationLevel;
        if (item.escalationLevel === "L1: Local Office") {
          nextEscalation = "L2: District Commissioner";
        } else if (item.escalationLevel === "L2: District Commissioner") {
          nextEscalation = "L3: State Ministry & MP Desk";
        }
        return {
          ...item,
          daysRemaining: newDays,
          status: "In Escalation",
          escalationLevel: nextEscalation,
        };
      })
    );
  };

  // ACTION 3: Official Mark Work Done (Awaiting Citizen Photo Verification)
  const handleMarkWorkDone = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIssues((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Resolved (Pending Verification)",
              photoProofUrl: "ASI field team completed masonry grouting. Awaiting citizen confirmation.",
            }
          : item
      )
    );
  };

  // ACTION 4: CSR Adoption Commitment
  const handleAdoptCommitted = (
    issueId: string,
    partnerName: string,
    actionPlan: string,
    pledgedAmountINR: number,
    volunteersCount: number
  ) => {
    setIssues((prev) =>
      prev.map((item) =>
        item.id === issueId
          ? {
              ...item,
              csrAdoptionPartner: `${partnerName} (Pledged ₹${pledgedAmountINR.toLocaleString(
                "en-IN"
              )} & ${volunteersCount} volunteers)`,
              resolutionLane: "Community / CSR Fix",
              status: "Assigned",
            }
          : item
      )
    );
  };

  // ACTION 5: Commercial Investor PPP Expression
  const handleInvestorInterestSubmitted = (
    issueId: string,
    investorName: string,
    conceptTitle: string,
    proposedCapitalLakhs: number,
    jobsCreatedCount: number
  ) => {
    setIssues((prev) =>
      prev.map((item) =>
        item.id === issueId
          ? {
              ...item,
              investorInterestCount: (item.investorInterestCount || 3) + 1,
              resolutionLane: "Investor PPP Lane",
            }
          : item
      )
    );
  };

  // ACTION 6: Citizen Photo Resolution Sign-Off (MANDATORY PHOTO PROOF REQUIREMENT)
  const handleVerifiedClosed = (
    issueId: string,
    proofNotes: string,
    photoPreset: string
  ) => {
    setIssues((prev) =>
      prev.map((item) =>
        item.id === issueId
          ? {
              ...item,
              status: "Verified Closed",
              daysRemaining: 0,
              resolvedPhotoUrl: proofNotes,
            }
          : item
      )
    );
  };

  // Filter & Search Logic
  const filteredIssues = issues
    .filter((issue) => {
      const matchesSearch =
        searchQuery === "" ||
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.monument.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTaluk = talukFilter === "All" || issue.taluk === talukFilter;
      const matchesLane = laneFilter === "All" || issue.resolutionLane === laneFilter;
      const matchesSeverity = severityFilter === "All" || issue.severity === severityFilter;

      const matchesStatus =
        statusFilter === "All"
          ? true
          : statusFilter === "Closed"
          ? issue.status === "Verified Closed"
          : statusFilter === "Pending"
          ? issue.status === "Resolved (Pending Verification)"
          : issue.status !== "Verified Closed";

      const matchesMapPin =
        !selectedMonumentMapPin ||
        issue.monument.toLowerCase().includes(selectedMonumentMapPin.toLowerCase());

      return (
        matchesSearch &&
        matchesTaluk &&
        matchesLane &&
        matchesSeverity &&
        matchesStatus &&
        matchesMapPin
      );
    })
    .sort((a, b) => {
      if (sortBy === "urgency") {
        return b.upvotesCount - a.upvotesCount;
      } else if (sortBy === "sla") {
        return a.daysRemaining - b.daysRemaining;
      } else {
        return new Date(b.reportedDate).getTime() - new Date(a.reportedDate).getTime();
      }
    });

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-stone-200 pb-5">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold mb-1">
              Phase 01 · The Central Accountability Spine
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Heritage Watch: Public Civic Grievance Ledger & AI Triage
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsDossierOpen(true)}
              className="inline-flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 px-3.5 py-2 text-xs font-medium rounded shadow-xs transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-stone-600" />
              <span>Export DC Audit Dossier</span>
            </button>

            <button
              onClick={onOpenReportModal}
              className="inline-flex items-center gap-2 bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 text-xs font-semibold rounded shadow-xs transition-all"
            >
              <Camera className="w-3.5 h-3.5 text-amber-200" />
              <span>File Defect with AI Triage</span>
            </button>
          </div>
        </div>

        <p className="mt-2 text-sm text-stone-600 max-w-3xl leading-relaxed">
          In Aihole, <strong className="text-stone-900 font-medium">942 families (~5,000 residents)</strong> live inside 122 protected monument clusters, caught between the 1958 AMASR Act and relocation delays. Meanwhile, the ASI Dharwad Circle historically functions with only ~45% filled cadre. Heritage Watch prevents bureaucratic dead-ends by auto-triaging jurisdiction, binding elected officials to a countdown clock, and routing problems into three actionable lanes.
        </p>
      </div>

      {/* ROLE / ACTION PERSONA SWITCHER */}
      <div className="bg-stone-900 text-stone-100 p-4 rounded-lg space-y-3 border border-stone-800">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-amber-400" />
            <span className="font-serif font-bold text-sm text-stone-100">
              Interactive User Persona Mode:
            </span>
          </div>
          <span className="text-[11px] text-amber-300 font-mono">
            Switch your role to take live administrative, CSR, or citizen actions
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <button
            onClick={() => setActiveRole("citizen")}
            className={`p-2.5 rounded border text-left transition-all ${
              activeRole === "citizen"
                ? "bg-amber-800 text-white border-amber-600 font-semibold shadow-xs"
                : "bg-stone-800 text-stone-300 hover:bg-stone-700 border-stone-700"
            }`}
          >
            <div className="font-semibold text-xs">🏛️ Citizen / Tourist</div>
            <div className="text-[10px] opacity-80 mt-0.5">Report, Co-sign, Photo Verify</div>
          </button>

          <button
            onClick={() => setActiveRole("official")}
            className={`p-2.5 rounded border text-left transition-all ${
              activeRole === "official"
                ? "bg-amber-800 text-white border-amber-600 font-semibold shadow-xs"
                : "bg-stone-800 text-stone-300 hover:bg-stone-700 border-stone-700"
            }`}
          >
            <div className="font-semibold text-xs">🏢 ASI & DC Magistrate</div>
            <div className="text-[10px] opacity-80 mt-0.5">Issue Orders, Test Escalation</div>
          </button>

          <button
            onClick={() => setActiveRole("csr_partner")}
            className={`p-2.5 rounded border text-left transition-all ${
              activeRole === "csr_partner"
                ? "bg-amber-800 text-white border-amber-600 font-semibold shadow-xs"
                : "bg-stone-800 text-stone-300 hover:bg-stone-700 border-stone-700"
            }`}
          >
            <div className="font-semibold text-xs">🤝 CSR Partner / College</div>
            <div className="text-[10px] opacity-80 mt-0.5">Adopt Issue (JSW/BEC model)</div>
          </button>

          <button
            onClick={() => setActiveRole("investor")}
            className={`p-2.5 rounded border text-left transition-all ${
              activeRole === "investor"
                ? "bg-amber-800 text-white border-amber-600 font-semibold shadow-xs"
                : "bg-stone-800 text-stone-300 hover:bg-stone-700 border-stone-700"
            }`}
          >
            <div className="font-semibold text-xs">💼 Hospitality Investor</div>
            <div className="text-[10px] opacity-80 mt-0.5">Register Demand & PPP Bid</div>
          </button>
        </div>

        {/* Dynamic Contextual Guidance Banner based on Role */}
        <div className="text-[11px] text-stone-300 pt-1 border-t border-stone-800 flex items-center justify-between">
          <span>
            {activeRole === "citizen" && (
              <>
                <strong>Active Mode: Citizen Reporter.</strong> Click <em>&ldquo;Endorse&rdquo;</em> to co-sign an issue, or <em>&ldquo;Verify Resolution&rdquo;</em> to upload photographic proof and close a completed defect.
              </>
            )}
            {activeRole === "official" && (
              <>
                <strong>Active Mode: ASI Dharwad & DC Desk.</strong> You can simulate SLA expiry (-5 days) to trigger automatic escalation tiers, dispatch formal notices to MLA Chimmanakatti/Kashappanavar, or mark work completed.
              </>
            )}
            {activeRole === "csr_partner" && (
              <>
                <strong>Active Mode: CSR & Community Partner.</strong> Click <em>&ldquo;Adopt this Issue&rdquo;</em> to fund stone ramps, water refill kiosks, or organize volunteer cleaning squads under the Hampi CSR model.
              </>
            )}
            {activeRole === "investor" && (
              <>
                <strong>Active Mode: Hospitality & PPP Investor.</strong> Explore recurring visitor complaints as demand evidence for restaurants and eco-stays at Aihole.
              </>
            )}
          </span>
        </div>
      </div>

      {/* Official Taluk Accountability Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Badami Taluk */}
        <div className="bg-stone-50 border border-stone-200 rounded p-4">
          <div className="flex items-center justify-between border-b border-stone-200/80 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-700" />
              <span className="font-serif font-bold text-stone-900 text-sm">
                Badami Taluk Jurisdiction
              </span>
            </div>
            <span className="text-[11px] font-mono text-stone-500">
              HQ: Badami Town
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-mono">Elected MLA</span>
              <span className="font-semibold text-stone-800">{TALUK_OFFICIALS.Badami.mla}</span>
              <span className="text-stone-500 block text-[10px]">INC · Badami Constituency</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-mono">Elected MP</span>
              <span className="font-semibold text-stone-800">{TALUK_OFFICIALS.Badami.mp}</span>
              <span className="text-stone-500 block text-[10px]">Bagalkote Lok Sabha (2024)</span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-stone-200/60 text-[11px] text-stone-600">
            <span className="font-medium text-stone-700">Protected Assets:</span> Badami Caves 1–4, Agastya Lake, Bhutanatha, Pattadakal UNESCO Group, Mahakuta, Banashankari.
          </div>
        </div>

        {/* Hungund Taluk */}
        <div className="bg-stone-50 border border-stone-200 rounded p-4">
          <div className="flex items-center justify-between border-b border-stone-200/80 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-700" />
              <span className="font-serif font-bold text-stone-900 text-sm">
                Hungund Taluk Jurisdiction
              </span>
            </div>
            <span className="text-[11px] font-mono text-stone-500">
              HQ: Hungund Town
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-mono">Elected MLA</span>
              <span className="font-semibold text-stone-800">{TALUK_OFFICIALS.Hungund.mla}</span>
              <span className="text-stone-500 block text-[10px]">INC · Hungund Constituency</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-mono">Elected MP</span>
              <span className="font-semibold text-stone-800">{TALUK_OFFICIALS.Hungund.mp}</span>
              <span className="text-stone-500 block text-[10px]">Bagalkote Lok Sabha (2024)</span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-stone-200/60 text-[11px] text-stone-600">
            <span className="font-medium text-stone-700">Protected Assets:</span> Aihole 122 Temple Complex (~942 families relocation zone), Durga Temple, Lad Khan, Kudalasangama.
          </div>
        </div>
      </div>

      {/* INTERACTIVE SCHEMATIC TALUK MAP */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
            Geographic Spatial Distribution
          </span>
          <button
            onClick={() => setShowMap(!showMap)}
            className="text-xs text-amber-800 hover:text-amber-900 font-medium"
          >
            {showMap ? "Hide Map Canvas" : "Show Map Canvas"}
          </button>
        </div>

        {showMap && (
          <HeritageTalukMap
            issues={issues}
            selectedMonument={selectedMonumentMapPin}
            onSelectMonument={setSelectedMonumentMapPin}
            talukFilter={talukFilter}
            onSelectTaluk={setTalukFilter}
          />
        )}
      </div>

      {/* ADVANCED FILTER & SEARCH CONTROL TOOLBAR */}
      <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-3 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-4 relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by defect, monument, or tracking ref..."
              className="w-full pl-9 pr-3 py-1.5 border border-stone-300 rounded bg-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-700"
            />
          </div>

          {/* Taluk Filter */}
          <div className="sm:col-span-2">
            <select
              value={talukFilter}
              onChange={(e) => setTalukFilter(e.target.value as any)}
              className="w-full px-2.5 py-1.5 border border-stone-300 rounded bg-white text-xs font-medium"
            >
              <option value="All">All Taluks</option>
              <option value="Badami">Badami Taluk</option>
              <option value="Hungund">Hungund Taluk</option>
            </select>
          </div>

          {/* Resolution Lane Filter */}
          <div className="sm:col-span-3">
            <select
              value={laneFilter}
              onChange={(e) => setLaneFilter(e.target.value as any)}
              className="w-full px-2.5 py-1.5 border border-stone-300 rounded bg-white text-xs font-medium"
            >
              <option value="All">All Resolution Lanes</option>
              <option value="Government Fix">Government Fix Lane</option>
              <option value="Community / CSR Fix">Community / CSR Lane</option>
              <option value="Investor PPP Lane">Investor PPP Lane</option>
            </select>
          </div>

          {/* Status & Sort */}
          <div className="sm:col-span-3 flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-1/2 px-2.5 py-1.5 border border-stone-300 rounded bg-white text-xs font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Active Only</option>
              <option value="Pending">Pending Verification</option>
              <option value="Closed">Verified Closed</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-1/2 px-2.5 py-1.5 border border-stone-300 rounded bg-white text-xs font-medium"
            >
              <option value="urgency">Sort: Urgency</option>
              <option value="sla">Sort: SLA Countdown</option>
              <option value="date">Sort: Latest</option>
            </select>
          </div>
        </div>

        {/* Quick result count & Active Filters reset */}
        <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-200">
          <div>
            Showing <strong>{filteredIssues.length}</strong> grievances in public ledger
            {selectedMonumentMapPin && (
              <span className="ml-2 text-amber-800 font-medium">
                (Filtered to: {selectedMonumentMapPin})
              </span>
            )}
          </div>
          {(searchQuery ||
            talukFilter !== "All" ||
            laneFilter !== "All" ||
            statusFilter !== "All" ||
            selectedMonumentMapPin) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setTalukFilter("All");
                setLaneFilter("All");
                setStatusFilter("All");
                setSelectedMonumentMapPin(null);
              }}
              className="text-amber-800 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* THE ACTION-ENABLED GRIEVANCE LEDGER */}
      <div className="space-y-4">
        {filteredIssues.map((issue) => {
          const isExpanded = expandedIssueId === issue.id;
          const isCritical = issue.severity === "Critical";
          const isClosed = issue.status === "Verified Closed";
          const isPending = issue.status === "Resolved (Pending Verification)";

          return (
            <div
              key={issue.id}
              className={`border rounded-lg transition-all bg-white shadow-xs ${
                isCritical && !isClosed
                  ? "border-red-300"
                  : isClosed
                  ? "border-emerald-200 bg-stone-50/30"
                  : "border-stone-200 hover:border-stone-300"
              }`}
            >
              {/* Summary Card Header */}
              <div
                onClick={() => setExpandedIssueId(isExpanded ? null : issue.id)}
                className="p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1.5 flex-1">
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                    <span className="font-mono text-stone-700 font-semibold">
                      {issue.trackingNumber}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-stone-800">{issue.taluk} Taluk</span>
                    <span aria-hidden="true">·</span>
                    <span>{issue.monument}</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={`font-semibold ${
                        issue.severity === "Critical"
                          ? "text-red-700"
                          : issue.severity === "High"
                          ? "text-amber-700"
                          : "text-stone-600"
                      }`}
                    >
                      {issue.severity} Priority
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-stone-400">Sample Data</span>
                  </div>

                  <h3 className="text-base font-serif font-semibold text-stone-900">
                    {issue.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 pt-0.5">
                    <span className="text-stone-500">Jurisdiction:</span>
                    <span className="font-medium text-stone-800">{issue.jurisdiction}</span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="text-stone-500">Lane:</span>
                    <span className="font-medium text-amber-800">{issue.resolutionLane}</span>
                    {issue.csrAdoptionPartner && (
                      <>
                        <span aria-hidden="true" className="text-stone-300">·</span>
                        <span className="text-emerald-800 font-medium">Adopted Partner Active ✓</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Metrics & Fast Action Buttons */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {isClosed ? (
                      <span className="text-emerald-700 font-semibold font-sans">
                        Verified Closed ✓
                      </span>
                    ) : (
                      <span
                        className={`font-semibold ${
                          issue.daysRemaining <= 2 ? "text-red-700 animate-pulse" : "text-stone-800"
                        }`}
                      >
                        {issue.daysRemaining} days left in SLA
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Endorse Button */}
                    <button
                      onClick={(e) => handleEndorse(issue.id, e)}
                      className="flex items-center gap-1 text-xs text-stone-700 bg-stone-100 hover:bg-amber-100 border border-stone-200 px-2.5 py-1 rounded transition-colors"
                      title="Endorse urgency and independent confirmation"
                    >
                      <ArrowUpRight className="w-3 h-3 text-amber-700" />
                      <span>{issue.upvotesCount} Endorsements</span>
                    </button>

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-stone-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* EXPANDED INTERACTIVE WORKBENCH */}
              {isExpanded && (
                <div className="px-4 pb-5 pt-2 border-t border-stone-100 bg-stone-50/60 space-y-4 text-xs text-stone-700">
                  {/* Detailed Description */}
                  <div className="bg-white p-3.5 rounded border border-stone-200/80 space-y-1">
                    <span className="text-[10px] font-mono text-stone-400 uppercase">
                      Citizen Field Observation:
                    </span>
                    <p className="leading-relaxed text-stone-800">
                      {issue.description}
                    </p>
                  </div>

                  {/* 3-Tier Escalation Ladder with Status Visualization */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase text-stone-500 tracking-wider">
                      <span>Accountability Escalation Ladder</span>
                      <span className="font-mono text-stone-400 font-normal">
                        Current: {issue.escalationLevel}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div
                        className={`p-2.5 rounded border text-xs ${
                          issue.escalationLevel === "L1: Local Office"
                            ? "bg-amber-100/90 border-amber-400 font-medium text-amber-900 ring-1 ring-amber-400"
                            : "bg-white border-stone-200 text-stone-600"
                        }`}
                      >
                        <div className="font-semibold text-[11px]">Level 1: Local Office</div>
                        <div className="text-[11px] text-stone-500">
                          {issue.taluk === "Badami" ? "ASI Badami Sub-Division" : "ASI Aihole In-Charge"}
                        </div>
                      </div>

                      <div
                        className={`p-2.5 rounded border text-xs ${
                          issue.escalationLevel === "L2: District Commissioner"
                            ? "bg-amber-100/90 border-amber-400 font-medium text-amber-900 ring-1 ring-amber-400"
                            : "bg-white border-stone-200 text-stone-600"
                        }`}
                      >
                        <div className="font-semibold text-[11px]">Level 2: DC Bagalkote</div>
                        <div className="text-[11px] text-stone-500">
                          District Magistrate Desk + SLA Warning
                        </div>
                      </div>

                      <div
                        className={`p-2.5 rounded border text-xs ${
                          issue.escalationLevel === "L3: State Ministry & MP Desk"
                            ? "bg-red-50 border-red-300 font-medium text-red-900 ring-1 ring-red-400"
                            : "bg-white border-stone-200 text-stone-600"
                        }`}
                      >
                        <div className="font-semibold text-[11px]">Level 3: MP & Directorate</div>
                        <div className="text-[11px] text-stone-500">
                          {issue.electedMP} (MP) & Heritage Secretary
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resolution Lane Details & Partner Callout */}
                  <div className="bg-amber-50/50 border border-amber-200/80 rounded p-3 text-xs">
                    {issue.resolutionLane === "Government Fix" && (
                      <div className="flex items-start gap-2">
                        <Building className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-stone-900">Government Action Route:</span>{" "}
                          Assigned to <span className="underline">{issue.jurisdiction}</span> with copy to MLA {issue.electedMLA}. Mandatory physical inspection required before funds requisition under Karnataka State Archaeology & Central ASI grants.
                        </div>
                      </div>
                    )}

                    {issue.resolutionLane === "Community / CSR Fix" && (
                      <div className="flex items-start gap-2">
                        <HeartHandshake className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-stone-900">Community & CSR Partner Lane:</span>{" "}
                          Precedent from Hampi where JSW Group built sanitation infrastructure under CSR.
                          {issue.csrAdoptionPartner ? (
                            <span className="block mt-1 font-medium text-emerald-900 bg-emerald-100/70 p-1.5 rounded">
                              ✓ {issue.csrAdoptionPartner}
                            </span>
                          ) : (
                            <span className="block mt-1 text-stone-600">
                              Open for adoption by corporate CSR (e.g. JSW) or local engineering colleges (BEC Bagalkot NSS).
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {issue.resolutionLane === "Investor PPP Lane" && (
                      <div className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-stone-900">Investor Demand Signal:</span>{" "}
                          This complaint serves as verified evidence of commercial service deficit. Karnataka Tourism&apos;s official PPP pipeline includes thematic restaurants near Badami and traditional homestays at Aihole.
                          <span className="block mt-1 font-medium text-amber-900">
                            {issue.investorInterestCount || 3} hospitality investors have registered interest in this demand dataset.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ACTIVE ACTION BAR (Interactive User Actions based on Persona) */}
                  <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2.5">
                    {/* Left Actions: Notice Dispatch & Legislative View */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setDispatchIssue(issue)}
                        className="flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-medium px-3 py-1.5 rounded transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-stone-600" />
                        <span>View Legislative Notice</span>
                      </button>

                      {/* Official Role: Simulate SLA clock or assign officer */}
                      {activeRole === "official" && !isClosed && (
                        <>
                          <button
                            onClick={(e) => handleFastForwardSla(issue.id, e)}
                            className="flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-medium px-2.5 py-1.5 rounded transition-colors"
                            title="Simulate 5 days passing to advance escalation ladder"
                          >
                            <Zap className="w-3 h-3 text-amber-800" />
                            <span>Simulate 5-Day SLA Pass</span>
                          </button>

                          <button
                            onClick={(e) => handleMarkWorkDone(issue.id, e)}
                            className="flex items-center gap-1 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium px-2.5 py-1.5 rounded transition-colors"
                          >
                            <span>Mark Work Completed</span>
                          </button>
                        </>
                      )}

                      {/* CSR Role: Adopt Button */}
                      {issue.resolutionLane === "Community / CSR Fix" && (
                        <button
                          onClick={() => setAdoptingIssue(issue)}
                          className="flex items-center gap-1.5 bg-amber-900 hover:bg-amber-800 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
                        >
                          <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
                          <span>{issue.csrAdoptionPartner ? "Modify Adoption" : "Adopt this Issue"}</span>
                        </button>
                      )}

                      {/* Investor Role: Express Interest */}
                      {issue.resolutionLane === "Investor PPP Lane" && (
                        <button
                          onClick={() => setInvestingIssue(issue)}
                          className="flex items-center gap-1.5 bg-amber-900 hover:bg-amber-800 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
                        >
                          <Briefcase className="w-3.5 h-3.5 text-amber-300" />
                          <span>Express PPP Commercial Bid</span>
                        </button>
                      )}
                    </div>

                    {/* Right Action: Mandatory Citizen Photo Verification */}
                    <div>
                      {!isClosed ? (
                        <button
                          onClick={() => setVerifyingIssue(issue)}
                          className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-medium text-xs px-3.5 py-1.5 rounded transition-colors shadow-xs"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Verify Resolution with Photo Proof</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5 text-emerald-800 font-semibold text-xs bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Verified Closed with On-Site Citizen Photo</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredIssues.length === 0 && (
          <div className="p-8 text-center bg-white border border-stone-200 rounded-lg text-stone-500 space-y-2">
            <p className="text-sm">No grievances match the active filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setTalukFilter("All");
                setLaneFilter("All");
                setStatusFilter("All");
                setSelectedMonumentMapPin(null);
              }}
              className="text-xs text-amber-800 hover:underline font-medium"
            >
              Reset filters to show all grievances
            </button>
          </div>
        )}
      </div>

      {/* POPUP MODALS FOR ACTIONS */}
      <AdoptIssueModal
        isOpen={Boolean(adoptingIssue)}
        onClose={() => setAdoptingIssue(null)}
        issue={adoptingIssue}
        onAdoptCommitted={handleAdoptCommitted}
      />

      <InvestorInterestModal
        isOpen={Boolean(investingIssue)}
        onClose={() => setInvestingIssue(null)}
        issue={investingIssue}
        onInterestSubmitted={handleInvestorInterestSubmitted}
      />

      <PhotoVerificationModal
        isOpen={Boolean(verifyingIssue)}
        onClose={() => setVerifyingIssue(null)}
        issue={verifyingIssue}
        onVerifiedClosed={handleVerifiedClosed}
      />

      <OfficialDispatchModal
        isOpen={Boolean(dispatchIssue)}
        onClose={() => setDispatchIssue(null)}
        issue={dispatchIssue}
      />

      <DistrictDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        issues={issues}
      />
    </div>
  );
};
