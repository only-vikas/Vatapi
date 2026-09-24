export interface IssueReport {
  id: string;
  trackingNumber: string;
  title: string;
  description: string;
  monument: string;
  taluk: "Badami" | "Hungund";
  jurisdiction:
    | "ASI Dharwad Circle"
    | "Karnataka Tourism (KSTDC)"
    | "Taluk / Gram Panchayat"
    | "Temple Trust / Muzrai"
    | "Minor Irrigation & Lake Authority";
  category:
    | "Structural Damage"
    | "Encroachment"
    | "Sanitation & Litter"
    | "Safety & Security"
    | "Accessibility"
    | "Service Gap";
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "Under AI Triage" | "Assigned" | "In Escalation" | "Resolved (Pending Verification)" | "Verified Closed";
  electedMLA: string;
  electedMP: string;
  resolutionLane: "Government Fix" | "Community / CSR Fix" | "Investor PPP Lane";
  reportedDate: string;
  slaDeadlineDays: number;
  daysRemaining: number;
  escalationLevel: "L1: Local Office" | "L2: District Commissioner" | "L3: State Ministry & MP Desk";
  photoProofUrl?: string;
  resolvedPhotoUrl?: string;
  upvotesCount: number;
  duplicateCount: number;
  csrAdoptionPartner?: string;
  investorInterestCount?: number;
  coordinates: { lat: number; lng: number };
  sampleDataNotice: boolean;
}

export const INITIAL_HERITAGE_ISSUES: IssueReport[] = [
  {
    id: "vatapi-hw-001",
    trackingNumber: "BGK-2026-0891",
    title: "Sandstone Masonry Fissure & Vegetation Roots in Cave 2 Cornice",
    description: "Deep horizontal fracture along the upper lintel frieze of Badami Cave 2. Ficus root intrusion is exerting wedge pressure on the 6th-century rock ceiling following unseasonal rains.",
    monument: "Badami Cave 2 (Vaishnava Rock-Cut Shrine)",
    taluk: "Badami",
    jurisdiction: "ASI Dharwad Circle",
    category: "Structural Damage",
    severity: "Critical",
    status: "In Escalation",
    electedMLA: "B. B. Chimmanakatti (Badami Constituency)",
    electedMP: "P. C. Gaddigoudar (Bagalkot Parliamentary, 2024)",
    resolutionLane: "Government Fix",
    reportedDate: "2026-09-18",
    slaDeadlineDays: 7,
    daysRemaining: 1,
    escalationLevel: "L2: District Commissioner",
    upvotesCount: 42,
    duplicateCount: 3,
    coordinates: { lat: 15.9189, lng: 75.6829 },
    sampleDataNotice: true,
  },
  {
    id: "vatapi-hw-002",
    trackingNumber: "BGK-2026-0842",
    title: "Aihole Village Encroachment & Lack of Protected Buffer Zone",
    description: "Residential settlement abutting 8th-century Konti Gudi complex. As documented, ~942 families across 122 protected monuments in Aihole require humane state relocation land so conservation fencing can proceed without displacing livelihoods.",
    monument: "Aihole Monument Cluster (Near Konti Gudi)",
    taluk: "Hungund",
    jurisdiction: "ASI Dharwad Circle",
    category: "Encroachment",
    severity: "Critical",
    status: "Assigned",
    electedMLA: "Vijayanand Kashappanavar (Hungund Constituency)",
    electedMP: "P. C. Gaddigoudar (Bagalkot Parliamentary, 2024)",
    resolutionLane: "Government Fix",
    reportedDate: "2026-09-12",
    slaDeadlineDays: 30,
    daysRemaining: 18,
    escalationLevel: "L3: State Ministry & MP Desk",
    upvotesCount: 118,
    duplicateCount: 14,
    coordinates: { lat: 16.0193, lng: 75.8824 },
    sampleDataNotice: true,
  },
  {
    id: "vatapi-hw-003",
    trackingNumber: "BGK-2026-0904",
    title: "Public Hygiene Gap & Absence of Refill Point at Agastya North Ghat",
    description: "Litter accumulation and open clothes-washing at historic 7th-century Agastya lake steps. Visitors have no drinking water refill kiosks, leading to hundreds of single-use plastic bottles discarded along the sandstone bank.",
    monument: "Agastya Lake North Ghat (Opposite Bhutanatha)",
    taluk: "Badami",
    jurisdiction: "Minor Irrigation & Lake Authority",
    category: "Sanitation & Litter",
    severity: "High",
    status: "Assigned",
    electedMLA: "B. B. Chimmanakatti (Badami Constituency)",
    electedMP: "P. C. Gaddigoudar (Bagalkot Parliamentary, 2024)",
    resolutionLane: "Community / CSR Fix",
    csrAdoptionPartner: "JSW Foundation Heritage Sanitation Initiative (Proposed CSR Adoption)",
    reportedDate: "2026-09-21",
    slaDeadlineDays: 14,
    daysRemaining: 11,
    escalationLevel: "L1: Local Office",
    upvotesCount: 67,
    duplicateCount: 5,
    coordinates: { lat: 15.9205, lng: 75.6865 },
    sampleDataNotice: true,
  },
  {
    id: "vatapi-hw-004",
    trackingNumber: "BGK-2026-0811",
    title: "Absence of Hygienic Dining Facilities near Aihole Monument Precinct",
    description: "Over 800 daily visitors to Aihole find no quality traditional food options within 2 km of the monument gate. Recurring complaints substantiate market demand for a heritage food courtyard showcasing North Karnataka cuisine.",
    monument: "Aihole Tourism Precinct",
    taluk: "Hungund",
    jurisdiction: "Karnataka Tourism (KSTDC)",
    category: "Service Gap",
    severity: "Medium",
    status: "Assigned",
    electedMLA: "Vijayanand Kashappanavar (Hungund Constituency)",
    electedMP: "P. C. Gaddigoudar (Bagalkot Parliamentary, 2024)",
    resolutionLane: "Investor PPP Lane",
    investorInterestCount: 4,
    reportedDate: "2026-09-08",
    slaDeadlineDays: 45,
    daysRemaining: 29,
    escalationLevel: "L1: Local Office",
    upvotesCount: 84,
    duplicateCount: 9,
    coordinates: { lat: 16.0211, lng: 75.8856 },
    sampleDataNotice: true,
  },
  {
    id: "vatapi-hw-005",
    trackingNumber: "BGK-2026-0775",
    title: "Broken Safety Railing along Upper Stairway to Badami Cave 4",
    description: "Rusted, dislodged iron balustrade at step 140 leading up to the Jain rock-cut cave. High slip risk during pilgrim rush and evening descent.",
    monument: "Badami Cave 4 (Jain Sanctuary Stairway)",
    taluk: "Badami",
    jurisdiction: "ASI Dharwad Circle",
    category: "Safety & Security",
    severity: "High",
    status: "Resolved (Pending Verification)",
    electedMLA: "B. B. Chimmanakatti (Badami Constituency)",
    electedMP: "P. C. Gaddigoudar (Bagalkot Parliamentary, 2024)",
    resolutionLane: "Government Fix",
    reportedDate: "2026-09-02",
    slaDeadlineDays: 14,
    daysRemaining: 0,
    escalationLevel: "L1: Local Office",
    photoProofUrl: "Repaired with marine-grade steel clamp and epoxy mortar anchorage by Dharwad Circle sub-division.",
    upvotesCount: 53,
    duplicateCount: 2,
    coordinates: { lat: 15.9181, lng: 75.6841 },
    sampleDataNotice: true,
  },
  {
    id: "vatapi-hw-006",
    trackingNumber: "BGK-2026-0730",
    title: "Step Barrier: Inaccessible Approach for Wheelchair Users at Pattadakal Eastern Entry",
    description: "Pattadakal UNESCO World Heritage Complex has unramped stone thresholds at the perimeter gate, preventing mobility-impaired visitors and seniors from accessing the flat lawn walkways around Virupaksha Temple.",
    monument: "Pattadakal World Heritage Group",
    taluk: "Badami",
    jurisdiction: "ASI Dharwad Circle",
    category: "Accessibility",
    severity: "Medium",
    status: "Assigned",
    electedMLA: "B. B. Chimmanakatti (Badami Constituency)",
    electedMP: "P. C. Gaddigoudar (Bagalkot Parliamentary, 2024)",
    resolutionLane: "Community / CSR Fix",
    csrAdoptionPartner: "Basaveshwara Engineering College (BEC) NSS Volunteer Project",
    reportedDate: "2026-08-28",
    slaDeadlineDays: 30,
    daysRemaining: 4,
    escalationLevel: "L2: District Commissioner",
    upvotesCount: 91,
    duplicateCount: 6,
    coordinates: { lat: 15.9497, lng: 75.8164 },
    sampleDataNotice: true,
  }
];

export const TALUK_OFFICIALS = {
  Badami: {
    mla: "B. B. Chimmanakatti",
    constituency: "Badami (Karnataka Legislative Assembly)",
    party: "INC",
    mp: "P. C. Gaddigoudar (Bagalkot Lok Sabha)",
    deputyCommissioner: "District Magistrate & DC Bagalkote",
    asiSubCircle: "ASI Badami Sub-Division, Dharwad Circle",
    headquarters: "Badami Town",
    keyMonuments: ["Badami Caves 1-4", "Agastya Lake & Bhutanatha", "Pattadakal Complex", "Mahakuta", "Banashankari Temple"]
  },
  Hungund: {
    mla: "Vijayanand Kashappanavar",
    constituency: "Hungund (Karnataka Legislative Assembly)",
    party: "INC",
    mp: "P. C. Gaddigoudar (Bagalkot Lok Sabha)",
    deputyCommissioner: "District Magistrate & DC Bagalkote",
    asiSubCircle: "ASI Aihole In-Charge, Dharwad Circle",
    headquarters: "Hungund Town",
    keyMonuments: ["Aihole Complex (122 monuments)", "Durga Temple", "Lad Khan Temple", "Kudalasangama Sangameshwara"]
  }
};
