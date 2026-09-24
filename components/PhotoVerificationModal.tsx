"use client";

import React, { useState } from "react";
import { IssueReport } from "@/lib/data/heritage-watch";
import {
  X,
  Camera,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Upload,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: IssueReport | null;
  onVerifiedClosed: (issueId: string, proofNotes: string, photoPreset: string) => void;
}

export const PhotoVerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  issue,
  onVerifiedClosed,
}) => {
  const [selectedPhotoPreset, setSelectedPhotoPreset] = useState<string>("repaired_masonry");
  const [citizenRemarks, setCitizenRemarks] = useState<string>(
    "Inspected on site. Masonry fissure has been carefully grouted with breathable lime mortar by the ASI conservation crew, and loose stone lintel has been secured. No further flaking detected."
  );
  const [gpsVerified, setGpsVerified] = useState<boolean>(true);
  const [reporterName, setReporterName] = useState<string>("Praveen Kulkarni (Citizen Verifier)");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !issue) return null;

  const resolutionPhotos = [
    {
      id: "repaired_masonry",
      title: "Repaired Stone & Lime Mortar Joint",
      description: "Conservation grade breathable slaked lime mortar without Portland cement.",
      badge: "Archaeological Standard ✓",
    },
    {
      id: "sanitized_ghat",
      title: "Cleaned Sandstone Steps & RO Refill Dispenser",
      description: "Plastics collected, stainless waste receptacles placed 15m away from water.",
      badge: "Sanitation Standard ✓",
    },
    {
      id: "safety_railing",
      title: "Epoxy-Anchored Stainless Balustrade",
      description: "Marine grade handrail installed without chipping original cliff sandstone.",
      badge: "Safety Standard ✓",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gpsVerified) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onVerifiedClosed(issue.id, citizenRemarks, selectedPhotoPreset);
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
        <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-emerald-900 text-emerald-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-semibold">
                Citizen Accountability Gate · Mandatory Photo Proof
              </div>
              <h3 className="font-serif font-bold text-white text-base">
                Verify Resolution & Close Grievance
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors"
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
              Location: <strong>{issue.monument}</strong> · Handled by: {issue.jurisdiction}
            </div>
          </div>

          {/* Policy Safeguard Notice */}
          <div className="bg-amber-50/70 border border-amber-200 p-2.5 rounded text-[11px] text-amber-950">
            <strong>Accountability Safeguard:</strong> Unlike traditional civic apps where officers can close complaints without proof, Vatapi prevents closure until an on-site citizen verifies resolution with a geo-tagged photograph.
          </div>

          {/* Photographic Proof Selector */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1.5">
              Select or Attach On-Site &ldquo;After&rdquo; Resolution Photo Proof:
            </label>
            <div className="space-y-2">
              {resolutionPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhotoPreset(photo.id)}
                  className={`p-2.5 rounded border cursor-pointer transition-all ${
                    selectedPhotoPreset === photo.id
                      ? "bg-emerald-50/80 border-emerald-500 ring-1 ring-emerald-500"
                      : "bg-white border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-semibold text-stone-900 text-xs">
                      {photo.title}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-800 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded">
                      {photo.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    {photo.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Citizen Verifier Details */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              Citizen Verifier Name / Title:
            </label>
            <input
              type="text"
              required
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-emerald-700 text-xs"
            />
          </div>

          {/* Citizen Verification Note */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              Field Verification Remarks:
            </label>
            <textarea
              rows={3}
              required
              value={citizenRemarks}
              onChange={(e) => setCitizenRemarks(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-emerald-700 text-xs"
            />
          </div>

          {/* GPS Telemetry Verification Box */}
          <div className="p-3 bg-stone-50 rounded border border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <div className="text-[11px]">
                <span className="font-semibold text-stone-800 block">
                  Geo-Fence Verification
                </span>
                <span className="text-stone-500 font-mono">
                  Coordinates: {issue.coordinates.lat.toFixed(4)}° N, {issue.coordinates.lng.toFixed(4)}° E (Match ±18m)
                </span>
              </div>
            </div>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={gpsVerified}
                onChange={(e) => setGpsVerified(e.target.checked)}
                className="accent-emerald-700 w-3.5 h-3.5"
              />
              <span className="text-[11px] font-semibold text-emerald-800">Verified</span>
            </label>
          </div>

          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Grievance officially closed with citizen photographic verification!</span>
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
              disabled={isSubmitting || !gpsVerified}
              className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-1.5 rounded text-xs font-semibold shadow-xs transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sign Off & Close Issue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
