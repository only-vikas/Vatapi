"use client";

import React, { useState } from "react";
import { IssueReport } from "@/lib/data/heritage-watch";
import {
  X,
  TrendingUp,
  Building2,
  DollarSign,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Briefcase,
} from "lucide-react";

interface InvestorModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: IssueReport | null;
  onInterestSubmitted: (
    issueId: string,
    investorName: string,
    conceptTitle: string,
    proposedCapitalLakhs: number,
    jobsCreatedCount: number
  ) => void;
}

export const InvestorInterestModal: React.FC<InvestorModalProps> = ({
  isOpen,
  onClose,
  issue,
  onInterestSubmitted,
}) => {
  const [investorName, setInvestorName] = useState("North Karnataka Heritage Hospitality LLP");
  const [conceptTitle, setConceptTitle] = useState(
    "Aihole Heritage Food Courtyard & Traditional SHG Kitchen Arcade"
  );
  const [proposedCapital, setProposedCapital] = useState(35); // in Lakhs
  const [jobsCreated, setJobsCreated] = useState(14);
  const [timelineMonths, setTimelineMonths] = useState(6);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !issue) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onInterestSubmitted(
        issue.id,
        investorName,
        conceptTitle,
        proposedCapital,
        jobsCreated
      );
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-2xl border border-stone-200 w-full max-w-lg max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-amber-900 text-amber-50">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-300" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-semibold">
                Investor PPP Lane · Commercial Demand Evidence
              </div>
              <h3 className="font-serif font-bold text-white text-base">
                Express Commercial PPP Interest
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-amber-300 hover:text-white hover:bg-amber-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs text-stone-700">
          {/* Target Issue Context */}
          <div className="bg-stone-50 p-3 rounded border border-stone-200/80 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
              <span>{issue.trackingNumber}</span>
              <span className="text-amber-800 font-semibold">{issue.taluk} Taluk</span>
            </div>
            <div className="font-serif font-semibold text-stone-900 text-sm">
              {issue.title}
            </div>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              {issue.description}
            </p>
          </div>

          {/* Demand Signal Metrics */}
          <div className="bg-amber-50/80 p-3 rounded border border-amber-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-amber-950">
                Verified Visitor Demand Footfall:
              </span>
              <span className="font-mono font-bold text-amber-900">
                ~820 visitors / day
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 pt-1 border-t border-amber-200/50">
              <div>Tourist Unsatisfied Need: <strong>High (92% review gap)</strong></div>
              <div>Current Investor Leads: <strong>{(issue.investorInterestCount || 3) + 1} Registered</strong></div>
            </div>
            <div className="text-[10px] text-amber-800 italic">
              Karnataka Tourism PPP Pipeline: Officially lists thematic restaurants near Badami and traditional homestays at Aihole as priority projects.
            </div>
          </div>

          {/* Investor Details */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              Investor / Hospitality Group Name:
            </label>
            <input
              type="text"
              required
              value={investorName}
              onChange={(e) => setInvestorName(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-amber-700 text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              Proposed Facility / Concept Title:
            </label>
            <input
              type="text"
              required
              value={conceptTitle}
              onChange={(e) => setConceptTitle(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-amber-700 text-xs"
            />
          </div>

          {/* Capital and Jobs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Capital (₹ Lakhs):
              </label>
              <input
                type="number"
                min="5"
                step="5"
                value={proposedCapital}
                onChange={(e) => setProposedCapital(Number(e.target.value))}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-amber-700 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Local Jobs Created:
              </label>
              <input
                type="number"
                min="2"
                value={jobsCreated}
                onChange={(e) => setJobsCreated(Number(e.target.value))}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-amber-700 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Completion (Months):
              </label>
              <input
                type="number"
                min="1"
                max="24"
                value={timelineMonths}
                onChange={(e) => setTimelineMonths(Number(e.target.value))}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-amber-700 text-xs font-mono"
              />
            </div>
          </div>

          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Commercial interest registered! Demand score and investor count updated.</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded border border-stone-300 text-stone-600 hover:bg-stone-100 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 bg-amber-800 hover:bg-amber-700 disabled:opacity-50 text-white px-4 py-1.5 rounded text-xs font-semibold shadow-xs transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Submit Commercial Expression</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
