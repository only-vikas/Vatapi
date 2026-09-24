export interface WaterQualityReading {
  date: string;
  lakeName: string;
  waterLevelPct: number;
  capacityMillionLiters: number;
  turbidityNTU: number;
  dissolvedOxygenMgL: number;
  phLevel: number;
  phosphateLevelMgL: number;
  droughtStatus: string;
  inflowRateLps: number;
  notes: string;
  recommendedAction: string;
}

export const RECENT_WATER_READINGS: WaterQualityReading[] = [
  {
    date: "2026-09-24",
    lakeName: "Agastya Tirtha (Badami 7th-Century Artificial Reservoir)",
    waterLevelPct: 41,
    capacityMillionLiters: 168, // Normal full capacity: 410 ML
    turbidityNTU: 18.4, // Standard limit: < 5 NTU
    dissolvedOxygenMgL: 5.2, // Critical threshold: 4.0 mg/L
    phLevel: 8.6, // Elevated due to soap alkaline runoff
    phosphateLevelMgL: 1.42, // Elevated from detergent polyphosphates
    droughtStatus: "Severe Drought Alert (Govt Notification RD-DM-BGL-2026-88: Sept 17, 2026)",
    inflowRateLps: 4.2, // Drastically down from normal monsoon inflow of 85 L/s
    notes: "Malaprabha upper catchment (Khanapur hills) recorded 89% seasonal rainfall deficit. Post-monsoon reservoir volume is lowest in 14 years.",
    recommendedAction: "Halt direct laundry and detergent washing along south stone steps immediately; expedite greywater interception bypass.",
  },
  {
    date: "2026-09-17",
    lakeName: "Agastya Tirtha",
    waterLevelPct: 43,
    capacityMillionLiters: 176,
    turbidityNTU: 17.6,
    dissolvedOxygenMgL: 5.4,
    phLevel: 8.5,
    phosphateLevelMgL: 1.38,
    droughtStatus: "Official Drought Declared by Government of Karnataka",
    inflowRateLps: 6.8,
    notes: "Official declaration issued for all 9 taluks of Bagalkote. Minor Irrigation Department flagged zero live inflow from northern hill catchments.",
    recommendedAction: "Begin deployment of floating micro-algae aerators near eastern Bhutanatha embankment.",
  },
  {
    date: "2026-09-08",
    lakeName: "Agastya Tirtha",
    waterLevelPct: 46,
    capacityMillionLiters: 189,
    turbidityNTU: 15.9,
    dissolvedOxygenMgL: 5.8,
    phLevel: 8.3,
    phosphateLevelMgL: 1.25,
    droughtStatus: "Monsoon Deficit Warning",
    inflowRateLps: 12.4,
    notes: "Late southwest monsoon failed to materialize over the Malaprabha basin. Water color turning emerald green from microcystis algae.",
    recommendedAction: "Issue advisory to Badami Town Municipal Council to prepare emergency tanker pipelines.",
  },
  {
    date: "2026-08-20",
    lakeName: "Agastya Tirtha",
    waterLevelPct: 53,
    capacityMillionLiters: 217,
    turbidityNTU: 13.8,
    dissolvedOxygenMgL: 6.1,
    phLevel: 8.1,
    phosphateLevelMgL: 1.10,
    droughtStatus: "Sub-Normal Storage",
    inflowRateLps: 22.0,
    notes: "Rainfall 65% below normal for August. Submerged 8th-century stone steps visible 2 months ahead of historical schedule.",
    recommendedAction: "Initiate joint survey between ASI Dharwad Circle and Minor Irrigation Directorate.",
  },
];

export interface RefillPoint {
  id: string;
  name: string;
  kannadaName: string;
  location: string;
  monumentProximity: string;
  taluk: "Badami" | "Hungund";
  type: "Free RO Water ATM (Govt / CSR)" | "Heritage Cafe Filter Point" | "Temple Trust Water Chhatra";
  status: "Operational" | "Maintenance Required";
  tdsPpm: number;
  waterSource: string;
  chilledAvailable: boolean;
  singleUsePlasticBottlesSavedDaily: number;
  lastFilterServiceDate: string;
  contactOfficer: string;
}

export const WATER_REFILL_POINTS: RefillPoint[] = [
  {
    id: "refill-01",
    name: "Badami Cave Complex Plaza RO Kiosk",
    kannadaName: "ಬಾದಾಮಿ ಗುಹೆ ಸಂಕೀರ್ಣ ಶುದ್ಧ ಕುಡಿಯುವ ನೀರಿನ ಕೇಂದ್ರ",
    location: "Opposite ASI Ticket Counter & Left Baggage Cloakroom, Badami",
    monumentProximity: "15 meters from Cave 1 Entrance Gate",
    taluk: "Badami",
    type: "Free RO Water ATM (Govt / CSR)",
    status: "Operational",
    tdsPpm: 88,
    waterSource: "Municipal Deep Borewell + 5-Stage Reverse Osmosis",
    chilledAvailable: true,
    singleUsePlasticBottlesSavedDaily: 520,
    lastFilterServiceDate: "September 20, 2026",
    contactOfficer: "TMC Badami Health Inspector (+91 94481 XXXXX)",
  },
  {
    id: "refill-02",
    name: "Agastya West Ghat Chhatra",
    kannadaName: "ಅಗಸ್ತ್ಯ ಪಶ್ಚಿಮ ಘಟ್ಟ ತೀರ್ಥ ಛತ್ರ",
    location: "Adjacent to Yellamma Temple Steps & North Hiking Pathway",
    monumentProximity: "50 meters from Bhutanatha Trailhead",
    taluk: "Badami",
    type: "Temple Trust Water Chhatra",
    status: "Operational",
    tdsPpm: 110,
    waterSource: "Natural Sandstone Aquifer Spring + Activated Charcoal",
    chilledAvailable: false,
    singleUsePlasticBottlesSavedDaily: 340,
    lastFilterServiceDate: "September 18, 2026",
    contactOfficer: "Temple Trust Manager (+91 98453 XXXXX)",
  },
  {
    id: "refill-03",
    name: "Pattadakal World Heritage Orientation Plaza",
    kannadaName: "ಪಟ್ಟದಕಲ್ಲು ವಿಶ್ವ ಪರಂಪರೆ ಮಾಹಿತಿ ಕೇಂದ್ರ",
    location: "Pattadakal Main Entrance Lawn, Adjacent to KSTDC Souvenir Stall",
    monumentProximity: "25 meters from Virupaksha Temple Complex Gate",
    taluk: "Badami",
    type: "Free RO Water ATM (Govt / CSR)",
    status: "Operational",
    tdsPpm: 92,
    waterSource: "Malaprabha River Sand Bed Gallery + UV Sterilization",
    chilledAvailable: true,
    singleUsePlasticBottlesSavedDaily: 680,
    lastFilterServiceDate: "September 22, 2026",
    contactOfficer: "ASI Pattadakal Sub-Circle Curator (+91 97412 XXXXX)",
  },
  {
    id: "refill-04",
    name: "Aihole Archaeological Enclosure Kiosk",
    kannadaName: "ಐಹೊಳೆ ಪುರಾತತ್ವ ವಸ್ತುಸಂಗ್ರಹಾಲಯ ಆವರಣ",
    location: "Between ASI Sculpture Gallery and Durga Temple Outer Wall",
    monumentProximity: "20 meters from Durga Temple East Entrance",
    taluk: "Hungund",
    type: "Free RO Water ATM (Govt / CSR)",
    status: "Operational",
    tdsPpm: 104,
    waterSource: "Gram Panchayat Borewell + Industrial RO Unit",
    chilledAvailable: true,
    singleUsePlasticBottlesSavedDaily: 310,
    lastFilterServiceDate: "September 16, 2026",
    contactOfficer: "Hungund Taluk Panchayat Engineer (+91 96110 XXXXX)",
  },
  {
    id: "refill-05",
    name: "Mahakuta Sacred Teertha Natural Filtering Kiosk",
    kannadaName: "ಮಹಾಕೂಟ ಪುಷ್ಕರಿಣಿ ಶುದ್ಧ ಜಲ ಕೇಂದ್ರ",
    location: "Pushkarini Tank Eastern Arcade, Near Vishnu-Spring Grove",
    monumentProximity: "10 meters from Mahakuteshwara Sanctum",
    taluk: "Badami",
    type: "Heritage Cafe Filter Point",
    status: "Operational",
    tdsPpm: 75,
    waterSource: "Perennial Natural Rock Fissure Spring (Gravity Fed)",
    chilledAvailable: false,
    singleUsePlasticBottlesSavedDaily: 210,
    lastFilterServiceDate: "September 21, 2026",
    contactOfficer: "Mahakuta Pujar Sangha Coordinator (+91 94801 XXXXX)",
  },
];

export interface LitterHotspot {
  id: string;
  location: string;
  kannadaLocation: string;
  monumentProximity: string;
  taluk: "Badami" | "Hungund";
  litterTypes: string[];
  severity: "High" | "Medium" | "Low";
  status: "Littered (Action Needed)" | "Cleaned & Verified";
  lastCleanedDate: string;
  cleanTrailVolunteersAssigned: number;
  totalKgCollectedToDate: number;
  beforePhotoDescription: string;
  afterPhotoDescription: string;
  hotspotOriginCause: string;
}

export const LITTER_HOTSPOTS: LitterHotspot[] = [
  {
    id: "lh-01",
    location: "Northern Hill Fort Ridge Trail",
    kannadaLocation: "ಉತ್ತರ ಕೋಟೆ ಕಡಿದಾದ ಪರ್ವತ ಹಾದಿ",
    monumentProximity: "Behind Upper Shivalaya & 16th-Century Cannon Bastion (Badami)",
    taluk: "Badami",
    litterTypes: ["Single-use plastic water bottles", "Foil snack wrappers", "Broken liquor glass", "Energy drink cans"],
    severity: "High",
    status: "Littered (Action Needed)",
    lastCleanedDate: "2026-09-20",
    cleanTrailVolunteersAssigned: 8,
    totalKgCollectedToDate: 142,
    beforePhotoDescription: "Plastic bottles, foil chips packets, and glass shards wedged inside crevices of Upper Shivalaya sandstone terrace.",
    afterPhotoDescription: "Pristine red sandstone terrace swept clean; all glass shards collected in puncture-proof bins and hauled downhill.",
    hotspotOriginCause: "No trash bins installed at high elevation due to monkey vandalism; sunset hikers discard packaging after climbing 300 steps.",
  },
  {
    id: "lh-02",
    location: "Agastya South Steps (Traditional Washing Ghat)",
    kannadaLocation: "ಅಗಸ್ತ್ಯ ದಕ್ಷಿಣ ಮೆಟ್ಟಿಲು (ಧೋಬಿ ಘಾಟ್ ಹತ್ತಿರ)",
    monumentProximity: "Agastya Lake Embankment, below Badami Cave 4",
    taluk: "Badami",
    litterTypes: ["Detergent single-use sachets", "Soap wrappers", "Plastic carry bags", "Fabric lint residues"],
    severity: "High",
    status: "Littered (Action Needed)",
    lastCleanedDate: "2026-09-23",
    cleanTrailVolunteersAssigned: 12,
    totalKgCollectedToDate: 285,
    beforePhotoDescription: "Discarded multi-layer detergent plastic pouches floating along the ancient submerged 7th-century steps.",
    afterPhotoDescription: "Ghat steps scrubbed with eco-friendly bio-enzyme; floating booms installed to corral soap scums away from open water.",
    hotspotOriginCause: "Absence of a dedicated municipal laundry platform forces 60+ local families to wash laundry directly on heritage steps.",
  },
  {
    id: "lh-03",
    location: "Aihole Galaganatha & Konti Gudi Trail",
    kannadaLocation: "ಐಹೊಳೆ ಗಲಗನಾಥ ದೇಗುಲ ಮತ್ತು ಹಳ್ಳದ ಹಾದಿ",
    monumentProximity: "Malaprabha riverbank cluster outside central ticketed perimeter",
    taluk: "Hungund",
    litterTypes: ["Paper tea cups", "Polythene carry bags", "Packaged water bottle caps", "Discarded travel pamphlets"],
    severity: "Medium",
    status: "Cleaned & Verified",
    lastCleanedDate: "2026-09-24",
    cleanTrailVolunteersAssigned: 6,
    totalKgCollectedToDate: 96,
    beforePhotoDescription: "Windblown tea cups and snack packaging trapped under thorny acacia bushes outside the un-fenced Galaganatha temple.",
    afterPhotoDescription: "Thorny scrub cleared of windblown trash; two monkey-proof lidded waste barrels installed at trail bifurcation.",
    hotspotOriginCause: "Visitors taking informal village dirt tracks to avoid entry fees drop snack packaging along unmonitored pathways.",
  },
  {
    id: "lh-04",
    location: "Pattadakal Malaprabha Riverbank Sandbar",
    kannadaLocation: "ಪಟ್ಟದಕಲ್ಲು ಮಲಪ್ರಭಾ ನದಿ ತೀರದ ಮರಳು ದಂಡೆ",
    monumentProximity: "Behind Sangameshvara and Virupaksha Temple East Gopuram",
    taluk: "Badami",
    litterTypes: ["Religious ritual polythene bags", "Plastic garland string", "Tetra packs", "Plastic sandals"],
    severity: "Medium",
    status: "Cleaned & Verified",
    lastCleanedDate: "2026-09-22",
    cleanTrailVolunteersAssigned: 7,
    totalKgCollectedToDate: 118,
    beforePhotoDescription: "Plastic strings from flower offerings and discarded plastic bags lodged in Malaprabha riverbed mud during low flow.",
    afterPhotoDescription: "Riverbank sandbar thoroughly raked by college volunteers; 18 kg of riverbed plastics extracted before decomposing.",
    hotspotOriginCause: "Pilgrims performing ancestral rites discard non-biodegradable ritual packaging into the sacred river during low water levels.",
  },
];

export interface CrowdForecastSlot {
  id: string;
  monumentName: string;
  taluk: "Badami" | "Hungund";
  dayType: "Weekday" | "Weekend" | "Banashankari Jatre / Festival Rush";
  timeWindow: string;
  density: "Quiet (Golden Slot)" | "Moderate" | "Peak Congestion" | "Extreme Rush";
  hourlyFootfallEst: number;
  heatIndexCelsius: number;
  recommendation: string;
  idealAlternateMonument: string;
  photographyRating: "Exceptional" | "Challenging" | "Poor";
}

export const CROWD_FORECAST_DATA: CrowdForecastSlot[] = [
  {
    id: "cf-pattadakal-morning",
    monumentName: "Pattadakal World Heritage Complex",
    taluk: "Badami",
    dayType: "Weekday",
    timeWindow: "06:30 AM – 08:30 AM",
    density: "Quiet (Golden Slot)",
    hourlyFootfallEst: 45,
    heatIndexCelsius: 22,
    recommendation: "The uncontested gold standard for contemplation and architectural photography. Pristine low-angle eastern sun illuminates the red sandstone carvings of Virupaksha Temple without tour group obstructions.",
    idealAlternateMonument: "Current choice is optimal.",
    photographyRating: "Exceptional",
  },
  {
    id: "cf-badami-weekend-noon",
    monumentName: "Badami Cave Temples (1 to 4)",
    taluk: "Badami",
    dayType: "Weekend",
    timeWindow: "11:00 AM – 03:00 PM",
    density: "Peak Congestion",
    hourlyFootfallEst: 850,
    heatIndexCelsius: 39,
    recommendation: "Severe bottleneck on the narrow cliffside rock stairs between Cave 2 and Cave 3. Blistering midday heat radiates off vertical sandstone walls. High slip risk and long queues for Cave 3 veranda.",
    idealAlternateMonument: "Shift schedule to shaded Mahakuta Temple Grove or air-conditioned Badami Archaeological Museum.",
    photographyRating: "Poor",
  },
  {
    id: "cf-banashankari-jatre",
    monumentName: "Banashankari Temple & Haridra Tirtha",
    taluk: "Badami",
    dayType: "Banashankari Jatre / Festival Rush",
    timeWindow: "All Day (Annual Pausha Jatre / Full Moon)",
    density: "Extreme Rush",
    hourlyFootfallEst: 4200,
    heatIndexCelsius: 34,
    recommendation: "Over 150,000 pilgrims congregate around the holy Haridra Tirtha tank. Traffic on Badami-Ilkal highway is diverted. Expect 2–3 hour queues for sanctum darshan. Maintain designated one-way barricades.",
    idealAlternateMonument: "Avoid private auto transit; use KSRTC shuttle from Badami bus stand or visit Aihole Konti Gudi instead.",
    photographyRating: "Challenging",
  },
  {
    id: "cf-aihole-afternoon",
    monumentName: "Aihole Archaeological Enclosure",
    taluk: "Hungund",
    dayType: "Weekday",
    timeWindow: "02:00 PM – 04:30 PM",
    density: "Quiet (Golden Slot)",
    hourlyFootfallEst: 65,
    heatIndexCelsius: 31,
    recommendation: "Excellent window to explore the 120-monument cradle of Chalukyan architecture. Tour buses generally leave by 1:30 PM for Pattadakal, leaving Durga Temple and Lad Khan open for unhurried study.",
    idealAlternateMonument: "Current choice is optimal.",
    photographyRating: "Exceptional",
  },
  {
    id: "cf-bhutanatha-sunset",
    monumentName: "Bhutanatha Temple Complex (Agastya East Flank)",
    taluk: "Badami",
    dayType: "Weekend",
    timeWindow: "05:00 PM – 06:45 PM",
    density: "Moderate",
    hourlyFootfallEst: 320,
    heatIndexCelsius: 27,
    recommendation: "Mesmerizing sunset reflection across Agastya Lake. While populated with visitors and photographers, open lakeside boulders prevent crushing. Carry flashlight for return walk after 6:30 PM.",
    idealAlternateMonument: "Southern Hill Fort perimeter for panoramic overhead view.",
    photographyRating: "Exceptional",
  },
  {
    id: "cf-mahakuta-morning",
    monumentName: "Mahakuta Temple Grove & Natural Springs",
    taluk: "Badami",
    dayType: "Weekday",
    timeWindow: "07:00 AM – 09:30 AM",
    density: "Quiet (Golden Slot)",
    hourlyFootfallEst: 35,
    heatIndexCelsius: 21,
    recommendation: "Deep woodland shade with fresh natural spring water bubbling through the Vishnu shrine. Serene holy bath and zero waiting time before family pilgrimage vans arrive from Hubballi.",
    idealAlternateMonument: "Current choice is optimal.",
    photographyRating: "Exceptional",
  }
];

export const CIVIC_LAUNDRY_PROPOSAL_SPEC = {
  title: "Decentralized Municipal Washing Deck & Phytoremediation Greywater Facility",
  projectNumber: "VTP-PROP-CIVIC-2026-04",
  targetLocation: "Downstream Malaprabha Feeder Canal (Koli Galli Bypass, 220m from Agastya South Ghat)",
  problemAddressed: "Over 60 washer families rely on the 7th-century sandstone steps of Agastya Lake due to lack of municipal facilities, discharging ~180 kg of alkaline detergents and phosphates monthly into the drought-stressed reservoir.",
  engineeringSpecs: [
    "16 waist-height ergonomic sandstone wash platforms reducing chronic lumbar worker strain by 65%",
    "Piped borewell and canal water with dual stainless-steel rinsing troughs",
    "3-stage phytoremediation reed-bed (Typha latifolia & Canna indica) to absorb nitrates and phosphates naturally",
    "Coarse sand and coconut-shell activated charcoal filtration beds for grease and lint entrapment",
    "Solar photovoltaic 3.5 kW pump system with zero recurring diesel emissions"
  ],
  budgetEstimatedINR: 2450000, // 24.5 Lakhs
  fundingStructure: {
    municipalTMCFundINR: 1000000, // Badami TMC
    corporateCSRGrantINR: 1200000, // JSW Foundation / CSR Precedent
    washerCoopEquityINR: 250000, // Community co-op contribution
  },
  projectedEcologicalImpact: "Diverts 98% of synthetic surfactants away from Agastya Tirtha, reducing lake phosphate levels from 1.42 mg/L to < 0.20 mg/L within 90 days of commissioning.",
  resolutionLane: "Phase 1 Heritage Watch: Community / CSR Fix & Civic Requisition",
};
