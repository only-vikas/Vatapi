"use client";

import React, { useState } from "react";
import { IssueReport } from "@/lib/data/heritage-watch";
import {
  X,
  HeartHandshake,
  Building,
  CheckCircle2,
  Users,
  Calendar,
  Sparkles,
  IndianRupee,
} from "lucide-react";

interface AdoptModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: IssueReport | null;
  onAdoptCommitted: (
    issueId: string,
    partnerName: string,
    actionPlan: string,
    pledgedAmountINR: number,
    volunteersCount: number
  ) => void;
}

export const AdoptIssueModal: React.FC<AdoptModalProps> = ({
  isOpen,
  onClose,
  issue,
  onAdoptCommitted,
}) => {
  const [partnerType, setPartnerType] = useState<string>("Corporate CSR (JSW Foundation Model)");
  const [partnerName, setPartnerName] = useState<string>("JSW Foundation Heritage CSR");
  const [actionPlan, setActionPlan] = useState<string>(
    "Provide non-invasive stainless steel crowd railings, install 2 shaded heritage benches, and coordinate periodic sanitization crew."
  );
  const [pledgedAmount, setPledgedAmount] = useState<number>(75000);
  const [volunteersCount, setVolunteersCount] = useState<number>(12);
  const [targetDate, setTargetDate] = useState<string>("2026-10-15");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adoptedSuccess, setAdoptedSuccess] = useState(false);

  if (!isOpen || !issue) return null;

  const handlePartnerSelect = (type: string, defaultName: string, defaultBudget: number) => {
    setPartnerType(type);
    setPartnerName(defaultName);
    setPledgedAmount(defaultBudget);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onAdoptCommitted(
        issue.id,
        partnerName,
        actionPlan,
        pledgedAmount,
        volunteersCount
      );
      setIsSubmitting(false);
      setAdoptedSuccess(true);
      setTimeout(() => {
        setAdoptedSuccess(false);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-2xl border border-stone-200 w-full max-w-lg max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-amber-50/70">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-amber-800" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-800 font-semibold">
                Community & CSR Lane · Issue Adoption
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-base">
                Adopt This Heritage Defect
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
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
            <div className="text-stone-600 text-[11px]">
              Location: <strong>{issue.monument}</strong> · Jurisdiction: {issue.jurisdiction}
            </div>
          </div>

          {/* Research Precedent Box */}
          <div className="bg-amber-50/60 p-2.5 rounded border border-amber-200/80 text-[11px] text-amber-950">
            <strong>Precedent:</strong> At Hampi, the JSW Foundation stepped in under CSR to construct visitor sanitation units and drinking fountains when local body funds were delayed. Your adoption bridges this exact gap.
          </div>

          {/* Partner Selector Presets */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1.5">
              Select Adopting Organization / Model:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() =>
                  handlePartnerSelect(
                    "Corporate CSR",
                    "JSW Foundation Heritage CSR Initiative",
                    120000
                  )
                }
                className={`p-2 rounded border text-left transition-all ${
                  partnerName.includes("JSW")
                    ? "bg-amber-900 text-white border-amber-900"
                    : "bg-white text-stone-700 hover:bg-stone-50 border-stone-200"
                }`}
              >
                <span className="font-semibold block">JSW Foundation CSR</span>
                <span className="text-[10px] opacity-80">Corporate Heritage Grant (₹1.2L)</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handlePartnerSelect(
                    "Academic NSS",
                    "Basaveshwara Engineering College (BEC) NSS Squad",
                    35000
                  )
                }
                className={`p-2 rounded border text-left transition-all ${
                  partnerName.includes("BEC")
                    ? "bg-amber-900 text-white border-amber-900"
                    : "bg-white text-stone-700 hover:bg-stone-50 border-stone-200"
                }`}
              >
                <span className="font-semibold block">BEC Bagalkot College NSS</span>
                <span className="text-[10px] opacity-80">Youth Volunteer Drive (₹35k)</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handlePartnerSelect(
                    "Civic Club",
                    "Rotary Club of Bagalkot & Badami Heritage Trust",
                    50000
                  )
                }
                className={`p-2 rounded border text-left transition-all ${
                  partnerName.includes("Rotary")
                    ? "bg-amber-900 text-white border-amber-900"
                    : "bg-white text-stone-700 hover:bg-stone-50 border-stone-200"
                }`}
              >
                <span className="font-semibold block">Rotary Club of Bagalkot</span>
                <span className="text-[10px] opacity-80">Civic Service Project (₹50k)</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handlePartnerSelect(
                    "Local Yuva Mandal",
                    "Badami Yuva Shakti & Citizen Volunteers",
                    15000
                  )
                }
                className={`p-2 rounded border text-left transition-all ${
                  partnerName.includes("Yuva")
                    ? "bg-amber-900 text-white border-amber-900"
                    : "bg-white text-stone-700 hover:bg-stone-50 border-stone-200"
                }`}
              >
                <span className="font-semibold block">Badami Citizen Volunteers</span>
                <span className="text-[10px] opacity-80">Community Action Squad (₹15k)</span>
              </button>
            </div>
          </div>

          {/* Adopting Partner Organization Name */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              Organization / Sponsor Name:
            </label>
            <input
              type="text"
              required
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-amber-700 text-xs"
            />
          </div>

          {/* Action Plan */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              Proposed Intervention & Work Plan:
            </label>
            <textarea
              rows={3}
              required
              value={actionPlan}
              onChange={(e) => setActionPlan(e.target.value)}
              placeholder="Detail the materials, contractor, or clean-up schedule..."
              className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-amber-700 text-xs"
            />
          </div>

          {/* Budget and Volunteers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Pledged Funds (₹):
              </label>
              <input
                type="number"
                min="0"
                step="5000"
                value={pledgedAmount}
                onChange={(e) => setPledgedAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-amber-700 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Volunteers Mobilized:
              </label>
              <input
                type="number"
                min="1"
                value={volunteersCount}
                onChange={(e) => setVolunteersCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-amber-700 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Target Completion:
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-amber-700 text-xs"
              />
            </div>
          </div>

          {adoptedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Issue adopted successfully! Status updated on the Public Ledger.</span>
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
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Confirm CSR Adoption</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
