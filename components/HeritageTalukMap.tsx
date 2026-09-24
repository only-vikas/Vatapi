"use client";

import React from "react";
import { IssueReport } from "@/lib/data/heritage-watch";
import { MapPin, Navigation, Eye, AlertOctagon, Layers } from "lucide-react";

interface TalukMapProps {
  issues: IssueReport[];
  selectedMonument: string | null;
  onSelectMonument: (monumentName: string | null) => void;
  talukFilter: "All" | "Badami" | "Hungund";
  onSelectTaluk: (taluk: "All" | "Badami" | "Hungund") => void;
}

export const HeritageTalukMap: React.FC<TalukMapProps> = ({
  issues,
  selectedMonument,
  onSelectMonument,
  talukFilter,
  onSelectTaluk,
}) => {
  // Key Bagalkote heritage sites with schematic positioning
  const sites = [
    {
      id: "badami_caves",
      name: "Badami Cave Temples (1-4)",
      shortName: "Badami Caves",
      taluk: "Badami",
      top: "44%",
      left: "24%",
      monumentMatch: "Badami Cave",
    },
    {
      id: "agastya_lake",
      name: "Agastya Lake & Bhutanatha",
      shortName: "Agastya Lake",
      taluk: "Badami",
      top: "38%",
      left: "30%",
      monumentMatch: "Agastya",
    },
    {
      id: "banashankari",
      name: "Banashankari Temple",
      shortName: "Banashankari",
      taluk: "Badami",
      top: "60%",
      left: "26%",
      monumentMatch: "Banashankari",
    },
    {
      id: "mahakuta",
      name: "Mahakuta Spring & Shrines",
      shortName: "Mahakuta",
      taluk: "Badami",
      top: "36%",
      left: "42%",
      monumentMatch: "Mahakuta",
    },
    {
      id: "pattadakal",
      name: "Pattadakal World Heritage Complex",
      shortName: "Pattadakal",
      taluk: "Badami",
      top: "32%",
      left: "55%",
      monumentMatch: "Pattadakal",
    },
    {
      id: "aihole",
      name: "Aihole 122 Temple Enclosure",
      shortName: "Aihole Complex",
      taluk: "Hungund",
      top: "26%",
      left: "76%",
      monumentMatch: "Aihole",
    },
    {
      id: "kudalasangama",
      name: "Kudalasangama Sangameshwara",
      shortName: "Kudalasangama",
      taluk: "Hungund",
      top: "16%",
      left: "86%",
      monumentMatch: "Kudalasangama",
    },
  ];

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 sm:p-5 text-stone-100 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-amber-400" />
          <h4 className="font-serif font-bold text-sm text-stone-100">
            Spatial Jurisdictional Map: Badami vs. Hungund Taluk
          </h4>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-400 text-[11px]">Filter Map:</span>
          {(["All", "Badami", "Hungund"] as const).map((t) => (
            <button
              key={t}
              onClick={() => onSelectTaluk(t)}
              className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                talukFilter === t
                  ? "bg-amber-800 text-white font-semibold"
                  : "bg-stone-800 text-stone-300 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
          {selectedMonument && (
            <button
              onClick={() => onSelectMonument(null)}
              className="text-[10px] text-amber-400 hover:underline"
            >
              Clear Pin Filter
            </button>
          )}
        </div>
      </div>

      {/* Schematic Map Canvas */}
      <div className="relative w-full h-64 sm:h-72 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 rounded-md border border-stone-800 overflow-hidden select-none">
        {/* River Malaprabha trace */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
          <path
            d="M 50 150 Q 180 180 320 120 T 580 80 T 750 40"
            fill="none"
            stroke="#0284c7"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <text x="360" y="105" fill="#38bdf8" fontSize="10" fontFamily="sans-serif">
            Malaprabha River Basin (89% Drought Deficit)
          </text>
        </svg>

        {/* Boundary dividing Badami and Hungund Taluk */}
        <div className="absolute top-0 bottom-0 left-[66%] border-r border-dashed border-amber-600/30 flex flex-col justify-between p-2 pointer-events-none">
          <span className="text-[10px] font-mono text-amber-400/60 uppercase tracking-widest">
            ← Badami Taluk (MLA Chimmanakatti)
          </span>
          <span className="text-[10px] font-mono text-amber-400/60 uppercase tracking-widest text-right">
            Hungund Taluk (MLA Kashappanavar) →
          </span>
        </div>

        {/* Interactive Site Pins */}
        {sites.map((site) => {
          const matchingIssues = issues.filter((i) =>
            i.monument.toLowerCase().includes(site.monumentMatch.toLowerCase())
          );
          const hasCritical = matchingIssues.some((i) => i.severity === "Critical");
          const hasOpen = matchingIssues.some((i) => i.status !== "Verified Closed");
          const isSelected = selectedMonument === site.name;
          const isDimmed = talukFilter !== "All" && site.taluk !== talukFilter;

          if (isDimmed) return null;

          return (
            <div
              key={site.id}
              onClick={() =>
                onSelectMonument(isSelected ? null : site.name)
              }
              style={{ top: site.top, left: site.left }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all z-10 group ${
                isSelected ? "scale-110" : "hover:scale-105"
              }`}
            >
              {/* Pin Icon */}
              <div
                className={`relative flex items-center justify-center rounded-full p-1.5 shadow-md border ${
                  hasCritical
                    ? "bg-red-950/90 border-red-500 text-red-200 ring-2 ring-red-500/40"
                    : hasOpen
                    ? "bg-amber-950/90 border-amber-500 text-amber-200"
                    : "bg-emerald-950/90 border-emerald-500 text-emerald-200"
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                {hasCritical && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                )}
              </div>

              {/* Pin Tag */}
              <div className="absolute left-1/2 -translate-x-1/2 top-7 whitespace-nowrap bg-stone-900/90 border border-stone-700 rounded px-1.5 py-0.5 text-[10px] text-stone-200 pointer-events-none group-hover:bg-amber-950 group-hover:border-amber-500 transition-colors">
                <span className="font-semibold">{site.shortName}</span>
                {matchingIssues.length > 0 && (
                  <span className="ml-1 text-amber-400 font-mono">
                    ({matchingIssues.length})
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-400 pt-1">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" /> Critical Damage
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" /> Active Grievance
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" /> Verified Resolved
          </span>
        </div>
        <div>
          Click any monument pin to filter complaints in that quadrant.
        </div>
      </div>
    </div>
  );
};
