"use client";

import React, { useState } from "react";
import { IssueReport, INITIAL_HERITAGE_ISSUES } from "@/lib/data/heritage-watch";
import {
  X,
  Camera,
  MapPin,
  Mic,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Layers,
  Upload,
  Radio,
} from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIssueCreated: (newIssue: IssueReport) => void;
  existingIssues?: IssueReport[];
}

export const ReportIssueModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onIssueCreated,
  existingIssues = INITIAL_HERITAGE_ISSUES,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [monument, setMonument] = useState("Badami Cave 2");
  const [taluk, setTaluk] = useState<"Badami" | "Hungund">("Badami");
  const [selectedPhotoPreset, setSelectedPhotoPreset] = useState<string>("crack_photo");
  const [voiceLang, setVoiceLang] = useState<"kannada" | "english">("kannada");
  const [isRecording, setIsRecording] = useState(false);
  const [voiceNoteRecorded, setVoiceNoteRecorded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triageResult, setTriageResult] = useState<any>(null);
  const [detectedDuplicate, setDetectedDuplicate] = useState<IssueReport | null>(null);

  if (!isOpen) return null;

  const photoEvidencePresets = [
    {
      id: "crack_photo",
      title: "Sandstone Fissure & Root Intrusion",
      tag: "Structural",
      desc: "Vegetation expanding along horizontal ceiling lintel.",
    },
    {
      id: "sanitation_photo",
      title: "Discarded Plastics & Detergent Runoff",
      tag: "Sanitation",
      desc: "Single-use bottles on ancient reservoir steps.",
    },
    {
      id: "encroachment_photo",
      title: "Residential Fence abutting Monument",
      tag: "Encroachment",
      desc: "Unlicensed construction inside 100m regulated buffer.",
    },
    {
      id: "ramp_photo",
      title: "Steep Stone Step Barrier (No Ramp)",
      tag: "Accessibility",
      desc: "Wheelchair users blocked at eastern entry threshold.",
    },
  ];

  // Voice note simulation
  const handleToggleVoiceRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setVoiceNoteRecorded(true);
      if (voiceLang === "kannada") {
        setDescription(
          "ಐಹೊಳೆಯ ಲಾಡ್ ಖಾನ್ ದೇವಸ್ಥಾನದ ಮೇಲ್ಛಾವಣಿಯ ಕಲ್ಲಿನ ಕಂಬಗಳ ನಡುವೆ ಸಸ್ಯಗಳ ಬೇರುಗಳು ಬೆಳೆದು ಕಲ್ಲುಗಳು ಸಡಿಲಗೊಂಡಿವೆ. ಮಳೆಯಿಂದಾಗಿ ಬಿರುಕುಗಳು ಹೆಚ್ಚುತ್ತಿವೆ."
        );
        setTitle("ಐಹೊಳೆ ಲಾಡ್ ಖಾನ್ ಛಾವಣಿಯಲ್ಲಿ ಸಸ್ಯ ಬೇರುಗಳ ಹಾನಿ (Masonry Fissure in Aihole)");
        setMonument("Aihole Lad Khan Temple");
        setTaluk("Hungund");
      } else {
        setDescription(
          "Observed dangerous masonry fissure along the upper carved lintel frieze with roots wedging stones apart after recent rains. Immediate intervention required."
        );
        setTitle("Sandstone Masonry Fissure & Root Wedging");
      }
    }, 1800);
  };

  // Check for potential duplicate in real-time
  const checkDuplicate = (monumentToCheck: string, titleToCheck: string) => {
    const dup = existingIssues.find(
      (item) =>
        item.monument.toLowerCase().includes(monumentToCheck.toLowerCase()) ||
        item.title.toLowerCase().includes(titleToCheck.toLowerCase())
    );
    setDetectedDuplicate(dup || null);
  };

  const handleMonumentChange = (val: string) => {
    setMonument(val);
    if (val.toLowerCase().includes("aihole") || val.toLowerCase().includes("kudala")) {
      setTaluk("Hungund");
    } else {
      setTaluk("Badami");
    }
    checkDuplicate(val, title);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/gemini/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          monument,
          taluk,
        }),
      });

      const data = await res.json();
      const triage = data.triage;
      setTriageResult(triage);

      // Create new issue object
      const newIssue: IssueReport = {
        id: `vatapi-hw-${Date.now()}`,
        trackingNumber: `BGK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        title,
        description,
        monument,
        taluk: triage?.taluk || taluk,
        jurisdiction: triage?.jurisdictionalBody || "ASI Dharwad Circle",
        category: triage?.category || "Structural Damage",
        severity: triage?.severity || "High",
        status: "Under AI Triage",
        electedMLA: triage?.electedRepresentative || (taluk === "Badami" ? "B. B. Chimmanakatti" : "Vijayanand Kashappanavar"),
        electedMP: "P. C. Gaddigoudar (Bagalkot Parliamentary, 2024)",
        resolutionLane: triage?.recommendedLane || "Government Fix",
        reportedDate: new Date().toISOString().split("T")[0],
        slaDeadlineDays: triage?.escalationDays || 14,
        daysRemaining: triage?.escalationDays || 14,
        escalationLevel: "L1: Local Office",
        upvotesCount: 1,
        duplicateCount: detectedDuplicate ? 1 : 0,
        coordinates:
          taluk === "Badami"
            ? { lat: 15.9189, lng: 75.6829 }
            : { lat: 16.0193, lng: 75.8824 },
        sampleDataNotice: true,
      };

      setTimeout(() => {
        onIssueCreated(newIssue);
        setIsSubmitting(false);
        onClose();
        // Reset form
        setTitle("");
        setDescription("");
        setTriageResult(null);
        setVoiceNoteRecorded(false);
      }, 1200);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-2xl border border-stone-200 w-full max-w-xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-stone-900 text-stone-100">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                Heritage Watch · Live AI Triage Intake
              </div>
              <h3 className="font-serif font-bold text-white text-base">
                Report Civic or Heritage Defect
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs text-stone-700">
          {/* Quick Preset Buttons for review */}
          <div className="bg-stone-50 p-2.5 rounded border border-stone-200/80 text-[11px]">
            <span className="font-semibold text-stone-900 block mb-1">
              Field Test Scenarios (Click to Load):
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setTitle("Sandstone Masonry Fissure in Badami Cave 2 Cornice");
                  setDescription("Horizontal fracture along the upper lintel frieze. Ficus root intrusion is exerting wedge pressure on the 6th-century rock ceiling.");
                  handleMonumentChange("Badami Cave 2");
                }}
                className="bg-white hover:bg-amber-50 text-stone-800 px-2 py-0.5 rounded border border-stone-300 text-[10px]"
              >
                Badami Fissure
              </button>
              <button
                type="button"
                onClick={() => {
                  setTitle("Aihole Konti Gudi Encroachment & Buffer Boundary Breach");
                  setDescription("Settlement abutting 8th-century Konti Gudi complex. Residents require humane relocation land under state scheme.");
                  handleMonumentChange("Aihole Konti Gudi Enclosure");
                }}
                className="bg-white hover:bg-amber-50 text-stone-800 px-2 py-0.5 rounded border border-stone-300 text-[10px]"
              >
                Aihole Encroachment
              </button>
              <button
                type="button"
                onClick={() => {
                  setTitle("Plastic & Beverage Bottles Littering Agastya Lake Steps");
                  setDescription("Accumulated alcohol and plastic waste behind Bhutanatha shore temple after Sunday tourist rush.");
                  handleMonumentChange("Agastya Lake North Ghat");
                }}
                className="bg-white hover:bg-amber-50 text-stone-800 px-2 py-0.5 rounded border border-stone-300 text-[10px]"
              >
                Agastya Litter
              </button>
              <button
                type="button"
                onClick={() => {
                  setTitle("Severe Dining Deficit for Visitors at Aihole Enclosure");
                  setDescription("Over 800 daily visitors to Aihole find no quality traditional food options within 2 km of the monument gate.");
                  handleMonumentChange("Aihole Tourism Precinct");
                }}
                className="bg-white hover:bg-amber-50 text-stone-800 px-2 py-0.5 rounded border border-stone-300 text-[10px]"
              >
                Aihole Food Gap (PPP)
              </button>
            </div>
          </div>

          {/* Duplicate Detection Alert */}
          {detectedDuplicate && (
            <div className="bg-amber-50 border border-amber-300 p-2.5 rounded text-amber-950 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <span className="font-semibold block">Potential Existing Report Detected:</span>
                Ref <strong>{detectedDuplicate.trackingNumber}</strong> is already open for <em>{detectedDuplicate.monument}</em>. Submitting this will automatically co-sign/endorse that grievance to accelerate its escalation ladder!
              </div>
            </div>
          )}

          {/* Monument and Taluk */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Monument / Location *
              </label>
              <input
                type="text"
                required
                value={monument}
                onChange={(e) => handleMonumentChange(e.target.value)}
                placeholder="e.g. Badami Cave 2 or Aihole Durga Temple"
                className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-amber-700 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Taluk Jurisdiction (Auto-Routed)
              </label>
              <select
                value={taluk}
                onChange={(e) => setTaluk(e.target.value as any)}
                className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-amber-700 text-xs bg-white font-medium"
              >
                <option value="Badami">Badami Taluk (MLA B. B. Chimmanakatti)</option>
                <option value="Hungund">Hungund Taluk (MLA Vijayanand Kashappanavar)</option>
              </select>
            </div>
          </div>

          {/* Issue Summary / Title */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              Issue Title / Subject *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                checkDuplicate(monument, e.target.value);
              }}
              placeholder="e.g. Masonry fissure along cave lintel or litter on ghat steps"
              className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-amber-700 text-xs"
            />
          </div>

          {/* Photographic Evidence Preset Selection */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              Photographic Evidence (Geo-Tagged Photo):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {photoEvidencePresets.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => setSelectedPhotoPreset(preset.id)}
                  className={`p-2 rounded border cursor-pointer text-left transition-all ${
                    selectedPhotoPreset === preset.id
                      ? "bg-amber-50 border-amber-600 ring-1 ring-amber-600 text-amber-950 font-medium"
                      : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <span className="font-semibold text-[11px] block truncate">
                    {preset.title}
                  </span>
                  <span className="text-[9px] font-mono uppercase text-amber-800 block">
                    {preset.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Description & Interactive Voice Recorder */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block font-semibold text-stone-800">
                Detailed Observation
              </label>

              {/* Multilingual Voice Note Recorder */}
              <div className="flex items-center gap-1.5">
                <select
                  value={voiceLang}
                  onChange={(e) => setVoiceLang(e.target.value as any)}
                  className="text-[10px] bg-stone-100 border border-stone-300 rounded px-1.5 py-0.5"
                >
                  <option value="kannada">ಕನ್ನಡ (Kannada Voice)</option>
                  <option value="english">English Voice</option>
                </select>

                <button
                  type="button"
                  onClick={handleToggleVoiceRecord}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    isRecording
                      ? "bg-red-600 text-white animate-pulse"
                      : voiceNoteRecorded
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300"
                  }`}
                >
                  <Mic className="w-3 h-3" />
                  <span>
                    {isRecording
                      ? "Listening (Speech-to-Text)..."
                      : voiceNoteRecorded
                      ? "Voice Attached ✓"
                      : "Record Voice Note"}
                  </span>
                </button>
              </div>
            </div>

            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the visible damage, encroachment, or service gap..."
              className="w-full px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-amber-700 text-xs"
            />
          </div>

          {/* Live AI Triage Structured Card (If available) */}
          {triageResult && (
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded space-y-1 text-emerald-950">
              <div className="flex items-center gap-1.5 font-semibold text-xs text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>AI Triage Completed Successfully:</span>
              </div>
              <div className="text-[11px] text-emerald-800 space-y-0.5 pt-1">
                <div>Category: <strong>{triageResult.category}</strong> ({triageResult.severity} Priority)</div>
                <div>Jurisdiction: <strong>{triageResult.jurisdictionalBody}</strong></div>
                <div>Taluk & MLA: <strong>{triageResult.taluk} Taluk ({triageResult.electedRepresentative})</strong></div>
                <div>Resolution Lane: <strong>{triageResult.recommendedLane}</strong> ({triageResult.escalationDays}-day SLA)</div>
              </div>
            </div>
          )}

          {/* Submit Actions */}
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
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing AI Triage...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Triage & Log into Public Ledger</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
