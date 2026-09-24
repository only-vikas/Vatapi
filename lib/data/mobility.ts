export interface CircuitStop {
  id: string;
  name: string;
  kannadaName: string;
  distanceFromBadamiKm: number;
  travelTimeMin: number;
  recommendedDurationMin: number;
  busFrequency: string;
  fairAutoFareINR: number;
  category: "Monument" | "Transit Hub" | "Artisan Cluster" | "Sacred Tank";
}

export const CIRCUIT_STOPS: CircuitStop[] = [
  {
    id: "badami-station",
    name: "Badami Railway Station (BDM)",
    kannadaName: "ಬಾದಾಮಿ ರೈಲ್ವೆ ನಿಲ್ದಾಣ",
    distanceFromBadamiKm: 4,
    travelTimeMin: 10,
    recommendedDurationMin: 15,
    busFrequency: "City feeder shuttle every 25 mins to Badami town bus stand; shared autos ₹20/seat",
    fairAutoFareINR: 70,
    category: "Transit Hub",
  },
  {
    id: "badami",
    name: "Badami Town / Cave Temples",
    kannadaName: "ಬಾದಾಮಿ ಪಟ್ಟಣ ಮತ್ತು ಗುಹೆಗಳು",
    distanceFromBadamiKm: 0,
    travelTimeMin: 0,
    recommendedDurationMin: 180,
    busFrequency: "Central transit hub (NWKRTC Depot); hourly direct services to Bagalkote, Gadag, and Hubballi",
    fairAutoFareINR: 60,
    category: "Monument",
  },
  {
    id: "banashankari",
    name: "Banashankari Amma Temple (Cholachagudda)",
    kannadaName: "ಬನಶಂಕರಿ ದೇವಸ್ಥಾನ (ಚೋಳಚಗುಡ್ಡ)",
    distanceFromBadamiKm: 5,
    travelTimeMin: 12,
    recommendedDurationMin: 45,
    busFrequency: "Frequent buses every 20 mins along Badami–Gadag Highway; shared autos ₹20/head",
    fairAutoFareINR: 120,
    category: "Sacred Tank",
  },
  {
    id: "mahakuta",
    name: "Mahakuta Valley & Spring (Pushkarini)",
    kannadaName: "ಮಹಾಕೂಟ ದೇವಾಲಯ ಮತ್ತು ಪುಷ್ಕರಿಣಿ",
    distanceFromBadamiKm: 14,
    travelTimeMin: 25,
    recommendedDurationMin: 75,
    busFrequency: "Irregular: 4 daily NWKRTC trips; frequent shared Cruisers/Tempos from Badami Old Stand",
    fairAutoFareINR: 280,
    category: "Sacred Tank",
  },
  {
    id: "pattadakal",
    name: "Pattadakal UNESCO World Heritage Complex",
    kannadaName: "ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣ",
    distanceFromBadamiKm: 22,
    travelTimeMin: 35,
    recommendedDurationMin: 120,
    busFrequency: "Buses every 45 mins from Badami platform 3; transit bottleneck occurs on the onward connection to Aihole",
    fairAutoFareINR: 420,
    category: "Monument",
  },
  {
    id: "aihole",
    name: "Aihole Temple Enclosure (Hungund Taluk)",
    kannadaName: "ಐಹೊಳೆ ಐತಿಹಾಸಿಕ ದೇವಾಲಯಗಳ ಸಂಕೀರ್ಣ",
    distanceFromBadamiKm: 34,
    travelTimeMin: 55,
    recommendedDurationMin: 150,
    busFrequency: "CRITICAL BOTTLENECK: Only 2–3 direct NWKRTC buses daily between Pattadakal & Aihole (13 km gap)",
    fairAutoFareINR: 650,
    category: "Monument",
  },
  {
    id: "guledgudda",
    name: "Guledgudda Handloom Khana Weavers Cluster",
    kannadaName: "ಗುಳೇದಗುಡ್ಡ ಖಣ ಕೈಮಗ್ಗ ನೇಕಾರರ ಕಾಲೋನಿ",
    distanceFromBadamiKm: 24,
    travelTimeMin: 40,
    recommendedDurationMin: 90,
    busFrequency: "Direct buses every 30 mins from Badami bus stand; shared passenger jeeps via Kerur",
    fairAutoFareINR: 480,
    category: "Artisan Cluster",
  },
];

export interface BusTimetableEntry {
  id: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  originStop: string;
  destinationStop: string;
  busType: "NWKRTC Gramina Sarige" | "NWKRTC Rajahamsa" | "KSTDC Tour Coach";
  fareINR: number;
  frequencyNote: string;
  gapRiskAlert?: string;
}

export const NWKRTC_PATTADAKAL_AIHOLE_BUSES: BusTimetableEntry[] = [
  {
    id: "bus-morning-01",
    route: "Badami → Pattadakal → Aihole → Hungund",
    departureTime: "08:45 AM",
    arrivalTime: "09:15 AM",
    originStop: "Pattadakal Malaprabha Bridge Stop",
    destinationStop: "Aihole Main Arch Stand",
    busType: "NWKRTC Gramina Sarige",
    fareINR: 22,
    frequencyNote: "Morning Service (Daily)",
    gapRiskAlert: "Connects with the 08:00 AM Badami departure. Ideal for morning visits before midday heat.",
  },
  {
    id: "bus-midday-02",
    route: "Badami → Pattadakal → Aihole → Amingad",
    departureTime: "01:15 PM",
    arrivalTime: "01:45 PM",
    originStop: "Pattadakal Malaprabha Bridge Stop",
    destinationStop: "Aihole Main Arch Stand",
    busType: "NWKRTC Gramina Sarige",
    fareINR: 22,
    frequencyNote: "Midday Service (Daily)",
    gapRiskAlert: "High risk: Missing this bus triggers a 3-hour 55-minute transit vacuum until the 05:10 PM bus!",
  },
  {
    id: "bus-evening-03",
    route: "Bagalkote → Pattadakal → Aihole → Ilkal",
    departureTime: "05:10 PM",
    arrivalTime: "05:40 PM",
    originStop: "Pattadakal Malaprabha Bridge Stop",
    destinationStop: "Aihole Main Arch Stand",
    busType: "NWKRTC Gramina Sarige",
    fareINR: 22,
    frequencyNote: "Final Daily Service",
    gapRiskAlert: "Final government bus! After 5:10 PM, zero public buses run into Aihole; private auto extortion spikes to ₹600-₹800.",
  },
];

export const NWKRTC_RETURN_AIHOLE_PATTADAKAL: BusTimetableEntry[] = [
  {
    id: "bus-ret-01",
    route: "Hungund → Aihole → Pattadakal → Badami",
    departureTime: "09:30 AM",
    arrivalTime: "10:00 AM",
    originStop: "Aihole Main Arch Stand",
    destinationStop: "Pattadakal Bridge Stop",
    busType: "NWKRTC Gramina Sarige",
    fareINR: 22,
    frequencyNote: "Morning Return",
  },
  {
    id: "bus-ret-02",
    route: "Amingad → Aihole → Pattadakal → Badami",
    departureTime: "02:00 PM",
    arrivalTime: "02:30 PM",
    originStop: "Aihole Main Arch Stand",
    destinationStop: "Pattadakal Bridge Stop",
    busType: "NWKRTC Gramina Sarige",
    fareINR: 22,
    frequencyNote: "Afternoon Return",
  },
  {
    id: "bus-ret-03",
    route: "Ilkal → Aihole → Pattadakal → Badami",
    departureTime: "05:55 PM",
    arrivalTime: "06:25 PM",
    originStop: "Aihole Main Arch Stand",
    destinationStop: "Pattadakal Bridge Stop",
    busType: "NWKRTC Gramina Sarige",
    fareINR: 22,
    frequencyNote: "Last Return Bus to Badami",
    gapRiskAlert: "Last bus to Badami town. Missing this means negotiating an emergency shared jeep via Amingad highway.",
  },
];

export interface SharedRide {
  id: string;
  circuitName: string;
  date: string;
  departureTime: string;
  origin: string;
  stops: string[];
  vehicleType: "Tempo Traveler (12-Seater)" | "Cruiser 4x4 (9-Seater)" | "Auto Rickshaw (3-Seater)";
  totalSeats: number;
  seatsBooked: number;
  minRequiredSeats: number; // e.g. 6 for KSTDC Mayura Tempo to guarantee departure
  pricePerSeatINR: number;
  hostName: string;
  hostPhone: string;
  pickupPin: string;
  status: "Boarding" | "Threshold Met" | "Departing Soon" | "Confirmed" | "Full";
  sampleNotice: boolean;
  notes: string;
}

export const INITIAL_SHARED_RIDES: SharedRide[] = [
  {
    id: "ride-001",
    circuitName: "KSTDC Heritage Day Circuit (Badami → Mahakuta → Pattadakal → Aihole)",
    date: "2026-09-25",
    departureTime: "08:00 AM",
    origin: "KSTDC Hotel Mayura Chalukya, Badami",
    stops: ["Mahakuta Valley", "Pattadakal Virupaksha", "Aihole Durga Complex"],
    vehicleType: "Tempo Traveler (12-Seater)",
    totalSeats: 12,
    seatsBooked: 5,
    minRequiredSeats: 6,
    pricePerSeatINR: 550,
    hostName: "KSTDC Captain Ramesh K.",
    hostPhone: "+91 94481 23411",
    pickupPin: "Hotel Mayura Reception Forecourt, Ramdurg Road",
    status: "Boarding",
    sampleNotice: true,
    notes: "Requires 6 passengers minimum to dispatch at ₹550 rate. 1 seat needed to confirm departure! AC tempo with luggage carrier.",
  },
  {
    id: "ride-002",
    circuitName: "Last-Mile Gap Shuttle (Pattadakal → Aihole Solo Pool)",
    date: "2026-09-25",
    departureTime: "01:30 PM",
    origin: "Pattadakal Monument Parking Lot (Tea Stall #3)",
    stops: ["Aihole Main Gate", "Konti Gudi Cluster"],
    vehicleType: "Cruiser 4x4 (9-Seater)",
    totalSeats: 9,
    seatsBooked: 7,
    minRequiredSeats: 4,
    pricePerSeatINR: 120,
    hostName: "Pooja Hegde (Solo Heritage Traveler, Bengaluru)",
    hostPhone: "+91 98860 91244",
    pickupPin: "Pattadakal ASI Ticket Counter Banyan Tree",
    status: "Threshold Met",
    sampleNotice: true,
    notes: "Avoids the 4-hour NWKRTC afternoon bus gap! Departs directly after Virupaksha tour.",
  },
  {
    id: "ride-003",
    circuitName: "Early Dawn Agastya & Cave 1 Photo Trail",
    date: "2026-09-26",
    departureTime: "06:15 AM",
    origin: "Badami Railway Station Platform 1 Exit",
    stops: ["Agastya Lake North Ghat", "Cave 1 Gate", "Bhuthanatha Sunrise Point"],
    vehicleType: "Auto Rickshaw (3-Seater)",
    totalSeats: 3,
    seatsBooked: 2,
    minRequiredSeats: 2,
    pricePerSeatINR: 80,
    hostName: "Basavaraj Auto Driver (Vatapi Verified Partner #42)",
    hostPhone: "+91 99012 87632",
    pickupPin: "Station Auto Stand Bay 2",
    status: "Confirmed",
    sampleNotice: true,
    notes: "Catch golden hour light on Agastya lake sandstone cliffs. Fixed transparent rate.",
  },
  {
    id: "ride-004",
    circuitName: "Guledgudda Khana Artisan Trail & Banashankari Loop",
    date: "2026-09-26",
    departureTime: "09:30 AM",
    origin: "Badami Old Bus Stand Police Outpost",
    stops: ["Banashankari Temple", "Guledgudda Pit-Loom Weavers Quarter"],
    vehicleType: "Cruiser 4x4 (9-Seater)",
    totalSeats: 9,
    seatsBooked: 4,
    minRequiredSeats: 5,
    pricePerSeatINR: 220,
    hostName: "Manjunath Shirur (Heritage Guide & Coordinator)",
    hostPhone: "+91 97410 55198",
    pickupPin: "Badami KSRTC Bus Stand Outside Chaat Corner",
    status: "Boarding",
    sampleNotice: true,
    notes: "Direct connection to authentic pit-loom weavers in Guledgudda with zero middleman commissions.",
  },
];

export interface CircuitPreset {
  id: string;
  name: string;
  kannadaName: string;
  totalKmRoundtrip: number;
  typicalWaitingHours: number;
  durationHours: number;
  recommendedFor: string;
  stops: string[];
  kannadaNegotiationPhrase: string;
}

export const PRESET_CIRCUITS: CircuitPreset[] = [
  {
    id: "golden-chalukya-triangle",
    name: "Full Chalukya Golden Circuit (Full Day)",
    kannadaName: "ಸಂಪೂರ್ಣ ಚಾಲುಕ್ಯ ಸುವರ್ಣ ಸರ್ಕ್ಯೂಟ್ (ಇಡೀ ದಿನ)",
    totalKmRoundtrip: 78,
    typicalWaitingHours: 4,
    durationHours: 7,
    recommendedFor: "First-time visitors wanting complete Chalukya masterworks",
    stops: [
      "Badami Town",
      "Mahakuta Valley",
      "Pattadakal UNESCO Group",
      "Aihole Durga & Lad Khan",
      "Return to Badami",
    ],
    kannadaNegotiationPhrase:
      "ಅಣ್ಣ, ಇಡೀ ದಿನದ ಸರ್ಕ್ಯೂಟ್‌ಗೆ (ಮಹಾಕೂಟ, ಪಟ್ಟದಕಲ್ಲು, ಐಹೊಳೆ) ಸರ್ಕಾರಿ ಸೂತ್ರದಂತೆ ಒಟ್ಟು ದರ ₹1,520 ಆಗುತ್ತೆ. ಬರ್ತೀರಾ?",
  },
  {
    id: "unesco-pattadakal-aihole",
    name: "Pattadakal & Aihole Heritage Express",
    kannadaName: "ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆ ಎಕ್ಸ್‌ಪ್ರೆಸ್",
    totalKmRoundtrip: 68,
    typicalWaitingHours: 3,
    durationHours: 5,
    recommendedFor: "Architecture & sculpture enthusiasts focusing on temple evolution",
    stops: ["Badami Town", "Pattadakal UNESCO Group", "Aihole Enclosure", "Return to Badami"],
    kannadaNegotiationPhrase:
      "ಅಣ್ಣ, ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆಗೆ ಹೋಗಿ 3 ಗಂಟೆ ಕಾಯ್ದು ವಾಪಸ್ ಬರಲು ಸರ್ಕಾರಿ ದರ ಸೂತ್ರದಂತೆ ₹1,310 ಆಗುತ್ತೆ.",
  },
  {
    id: "local-sacred-springs",
    name: "Banashankari & Mahakuta Sacred Circuit",
    kannadaName: "ಬನಶಂಕರಿ ಮತ್ತು ಮಹಾಕೂಟ ಪವಿತ್ರ ತೀರ್ಥ ಯಾತ್ರೆ",
    totalKmRoundtrip: 32,
    typicalWaitingHours: 2,
    durationHours: 3,
    recommendedFor: "Families, pilgrims, and photography enthusiasts",
    stops: ["Badami Town", "Banashankari Temple & Haridra Tirtha", "Mahakuta Spring Pool", "Return to Badami"],
    kannadaNegotiationPhrase:
      "ಅಣ್ಣ, ಬನಶಂಕರಿ ಮತ್ತು ಮಹಾಕೂಟ ದರ್ಶನ ಮಾಡಿ 2 ಗಂಟೆ ನಿಲ್ಲಿಸಲು ಸರ್ಕಾರಿ ದರದಂತೆ ₹670 ಕೊಡುತ್ತೇವೆ.",
  },
  {
    id: "pattadakal-aihole-lastmile",
    name: "Pattadakal to Aihole One-Way Transit Hop",
    kannadaName: "ಪಟ್ಟದಕಲ್ಲು - ಐಹೊಳೆ 13 ಕಿಮೀ ನೇರ ಸಂಪರ್ಕ",
    totalKmRoundtrip: 13,
    typicalWaitingHours: 0,
    durationHours: 1,
    recommendedFor: "Solo travelers caught in the NWKRTC bus gap",
    stops: ["Pattadakal Malaprabha Bridge", "Aihole Main Gate (One-Way)"],
    kannadaNegotiationPhrase:
      "ಅಣ್ಣ, ಪಟ್ಟದಕಲ್ಲಿನಿಂದ ಐಹೊಳೆಗೆ ನೇರ ಡ್ರಾಪ್‌ಗೆ ಸರ್ಕಾರಿ ದರ ಪ್ರಕಾರ ₹250 (ಕಿಮೀ ₹16 + ಬೇಸ್) ಸರಿನಾ?",
  },
];
