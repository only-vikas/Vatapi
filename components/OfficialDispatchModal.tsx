"use client";

import React, { useState } from "react";
import { IssueReport, TALUK_OFFICIALS } from "@/lib/data/heritage-watch";
import {
  X,
  Building,
  Mail,
  Printer,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Send,
  MapPin,
} from "lucide-react";

interface DispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: IssueReport | null;
}

export const OfficialDispatchModal: React.FC<DispatchModalProps> = ({
  isOpen,
  onClose,
  issue,
}) => {
  const [copied, setCopied] = useState(false);
  const [dispatchSent, setDispatchSent] = useState(false);

  if (!isOpen || !issue) return null;

  const talukData = TALUK_OFFICIALS[issue.taluk];
  const isHighUrgency = issue.severity === "Critical" || issue.severity === "High";

  const handleCopyNotice = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendDispatch = () => {
    setDispatchSent(true);
    setTimeout(() => {
      setDispatchSent(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-2xl border border-stone-200 w-full max-w-2xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-stone-900 text-stone-100">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                Legislative & Executive Dispatch Desk
              </div>
              <h3 className="font-serif font-bold text-white text-base">
                Official Grievance Memorandum
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-stone-700">
          {/* Safeguard status badge */}
          <div className="flex items-center justify-between bg-stone-50 p-2.5 rounded border border-stone-200">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium text-stone-800">
                Safeguard Status: {issue.upvotesCount >= 5 ? "Geo-Verified & Multi-Confirmed (Eligible for Dispatch)" : "Citizen Verified"}
              </span>
            </div>
            <span className="font-mono text-stone-500 text-[11px]">
              {issue.upvotesCount} Independent Endorsements
            </span>
          </div>

          {/* Formal Dispatch Paper */}
          <div className="bg-amber-50/30 border border-stone-300 rounded p-5 space-y-3 font-mono text-[11px] text-stone-800 shadow-inner">
            <div className="text-center border-b border-stone-300 pb-2">
              <div className="font-serif font-bold text-sm tracking-wide text-stone-900">
                GOVERNMENT OF KARNATAKA / BAGALKOTE DISTRICT ADMINISTRATION
              </div>
              <div className="text-[10px] text-stone-500 uppercase">
                Vatapi Heritage Watch System · Legislative Alert Notification
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] pt-1 border-b border-stone-200 pb-2">
              <div>
                <strong>DISPATCH REF:</strong> {issue.trackingNumber}
              </div>
              <div className="text-right">
                <strong>DATE:</strong> {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}
              </div>
              <div>
                <strong>TALUK JURISDICTION:</strong> {issue.taluk} Taluk
              </div>
              <div className="text-right">
                <strong>ESCALATION TIER:</strong> {issue.escalationLevel}
              </div>
            </div>

            {/* Recipients */}
            <div className="space-y-1 bg-white/70 p-2.5 rounded border border-stone-200">
              <div className="font-bold text-stone-900 text-xs">TO:</div>
              <div>1. <strong>Shri {talukData.mla}</strong>, Hon&apos;ble Member of Legislative Assembly ({talukData.constituency})</div>
              <div>2. <strong>Shri {talukData.mp}</strong>, Hon&apos;ble Member of Parliament (Bagalkote Lok Sabha)</div>
              <div>3. <strong>The Deputy Commissioner & District Magistrate</strong>, Bagalkote District</div>
              <div>4. <strong>Superintending Archaeologist</strong>, Archaeological Survey of India (ASI) Dharwad Circle</div>
            </div>

            {/* Subject */}
            <div className="pt-1">
              <strong>SUBJECT:</strong> Urgency Notice regarding {issue.category} at {issue.monument} ({issue.severity} Priority).
            </div>

            {/* Body */}
            <div className="text-stone-700 leading-relaxed font-sans text-xs space-y-2 bg-white/50 p-3 rounded">
              <p>
                Sir / Madam,
              </p>
              <p>
                This automated legislative memorandum is served under the Vatapi Heritage Protection Protocol. An active defect logged under Reference <strong>{issue.trackingNumber}</strong> has reached <strong>{issue.escalationLevel}</strong> with <strong>{issue.daysRemaining} days</strong> remaining before formal SLA breach.
              </p>
              <p className="bg-stone-50 p-2 rounded border border-stone-200 italic font-mono text-[11px]">
                &ldquo;{issue.description}&rdquo;
              </p>
              <p>
                <strong>Recommended Action Lane:</strong> {issue.resolutionLane} via {issue.jurisdiction}. Under the Ancient Monuments and Archaeological Sites and Remains Act, prompt intervention is requested to prevent progressive deterioration and ensure visitor safety.
              </p>
            </div>

            <div className="text-[10px] text-stone-500 pt-2 flex justify-between items-center border-t border-stone-200">
              <span>Automated by Vatapi Heritage Ledger</span>
              <span>SLA Clock: {issue.daysRemaining} Days</span>
            </div>
          </div>

          {dispatchSent && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Official dispatch transmitted to MLA Chimmanakatti / Kashappanavar & DC Bagalkote desks!</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-200">
            <button
              type="button"
              onClick={handleCopyNotice}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-medium transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{copied ? "Memorandum Copied ✓" : "Copy Memorandum Text"}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded border border-stone-300 text-stone-600 hover:bg-stone-100 text-xs font-medium"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSendDispatch}
                className="flex items-center gap-1.5 bg-amber-800 hover:bg-amber-700 text-white px-4 py-1.5 rounded text-xs font-semibold shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch to MLA & DC Desk</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
