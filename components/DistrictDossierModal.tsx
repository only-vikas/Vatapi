"use client";

import React, { useState } from "react";
import { IssueReport, TALUK_OFFICIALS } from "@/lib/data/heritage-watch";
import {
  X,
  FileSpreadsheet,
  Printer,
  Copy,
  CheckCircle2,
  Building,
  ShieldAlert,
} from "lucide-react";

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  issues: IssueReport[];
}

export const DistrictDossierModal: React.FC<DossierModalProps> = ({
  isOpen,
  onClose,
  issues,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalOpen = issues.filter((i) => i.status !== "Verified Closed").length;
  const totalCritical = issues.filter((i) => i.severity === "Critical").length;
  const badamiCount = issues.filter((i) => i.taluk === "Badami").length;
  const hungundCount = issues.filter((i) => i.taluk === "Hungund").length;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-2xl border border-stone-200 w-full max-w-3xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-stone-900 text-stone-100">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                District Magistrate Executive Dossier
              </div>
              <h3 className="font-serif font-bold text-white text-base">
                Bagalkote District Heritage & Civic Audit
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

        {/* Dossier Body */}
        <div className="p-6 space-y-5 text-xs text-stone-700 font-sans">
          {/* Executive Overview Header */}
          <div className="border-b border-stone-300 pb-3 flex justify-between items-end">
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-base">
                OFFICE OF THE DEPUTY COMMISSIONER & LEGISLATIVE OVERSIGHT
              </h4>
              <p className="text-stone-500 text-[11px]">
                Comprehensive Heritage Asset Grievance Ledger · Generated {new Date().toLocaleDateString("en-IN", { dateStyle: "full" })}
              </p>
            </div>
            <div className="text-right text-[11px] font-mono text-amber-900">
              Active Issues: <strong>{totalOpen}</strong> (Critical: {totalCritical})
            </div>
          </div>

          {/* Taluk Summary Matrix */}
          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div className="bg-stone-50 p-3 rounded border border-stone-200">
              <span className="font-bold text-stone-900 block font-serif">
                Badami Taluk Jurisdiction
              </span>
              <div className="text-stone-600 mt-1 space-y-0.5">
                <div>MLA: <strong>{TALUK_OFFICIALS.Badami.mla}</strong> (INC)</div>
                <div>MP: <strong>{TALUK_OFFICIALS.Badami.mp}</strong></div>
                <div>Total Active Complaints: <strong>{badamiCount}</strong></div>
                <div>Primary Sites: Badami Caves 1-4, Agastya Lake, Pattadakal, Mahakuta</div>
              </div>
            </div>

            <div className="bg-stone-50 p-3 rounded border border-stone-200">
              <span className="font-bold text-stone-900 block font-serif">
                Hungund Taluk Jurisdiction
              </span>
              <div className="text-stone-600 mt-1 space-y-0.5">
                <div>MLA: <strong>{TALUK_OFFICIALS.Hungund.mla}</strong> (INC)</div>
                <div>MP: <strong>{TALUK_OFFICIALS.Hungund.mp}</strong></div>
                <div>Total Active Complaints: <strong>{hungundCount}</strong></div>
                <div>Primary Sites: Aihole 122 Temples (942 families relocation zone)</div>
              </div>
            </div>
          </div>

          {/* Grievance Ledger Table */}
          <div className="border border-stone-200 rounded overflow-hidden">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-stone-100 text-stone-700 border-b border-stone-200 font-semibold font-mono">
                <tr>
                  <th className="p-2">Tracking Ref</th>
                  <th className="p-2">Monument & Taluk</th>
                  <th className="p-2">Severity</th>
                  <th className="p-2">Jurisdiction</th>
                  <th className="p-2">Lane</th>
                  <th className="p-2">SLA Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {issues.map((i) => (
                  <tr key={i.id} className="hover:bg-stone-50">
                    <td className="p-2 font-mono font-medium text-stone-900">
                      {i.trackingNumber}
                    </td>
                    <td className="p-2">
                      <div className="font-medium text-stone-800">{i.monument}</div>
                      <div className="text-stone-500 text-[10px]">{i.taluk} Taluk</div>
                    </td>
                    <td className="p-2">
                      <span
                        className={`font-semibold ${
                          i.severity === "Critical"
                            ? "text-red-700"
                            : i.severity === "High"
                            ? "text-amber-700"
                            : "text-stone-600"
                        }`}
                      >
                        {i.severity}
                      </span>
                    </td>
                    <td className="p-2 text-stone-600">{i.jurisdiction}</td>
                    <td className="p-2 font-medium text-amber-900">{i.resolutionLane}</td>
                    <td className="p-2 font-mono">
                      {i.status === "Verified Closed" ? (
                        <span className="text-emerald-700 font-semibold">Closed ✓</span>
                      ) : (
                        <span>{i.daysRemaining}d left ({i.escalationLevel.split(":")[0]})</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Resolution Policy Footer */}
          <div className="bg-amber-50/60 p-3 rounded border border-amber-200/80 text-[11px] text-stone-700 leading-relaxed">
            <strong>Mandatory Administrative Note:</strong> Complaints can only be discharged from this ledger upon citizen photographic verification submitted on site. All SLA breaches automatically trigger administrative summons from the Bagalkote DC Magistrate desk.
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-medium"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? "Dossier Copied ✓" : "Copy Dossier Text"}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-stone-900 text-white font-medium text-xs hover:bg-stone-800"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
