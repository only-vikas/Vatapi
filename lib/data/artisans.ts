export interface ArtisanWeaver {
  id: string;
  name: string;
  kannadaName: string;
  village: "Guledgudda" | "Ilkal" | "Badami";
  specialty: string;
  experienceYears: number;
  giTagCertified: boolean;
  giTagNumber: string;
  loomType: "Traditional Pit Loom" | "Hand Frame Loom" | "Raised Wooden Loom";
  dailyWageReality: string;
  bio: string;
  locationDetails: string;
  contactNumber: string;
  motifMastery: string[];
  workshopVisitAvailable: boolean;
  maxVisitorCapacity: number;
  fairPriceBreakdown: {
    silkCottonYarnCost: number;
    weaverDirectLabor: number; // Fair living wage benchmark
    finishingAndDyeingCost: number;
    masterWeaverOrCoopMargin: number;
    retailPrice: number;
    traditionalMiddlemanWage: number; // Historical exploitative wage
  };
  sampleProducts: {
    title: string;
    description: string;
    weavingTimeDays: number;
    priceINR: number;
  }[];
}

export interface MotifDetail {
  id: string;
  name: string;
  kannadaName: string;
  originTradition: "Guledgudda Khana" | "Ilkal Saree";
  symbolism: string;
  sacredMeaning: string;
  geometricStructure: string;
  difficultyRating: 1 | 2 | 3 | 4 | 5;
  recommendedProducts: string[];
}

export const MOTIFS_DIRECTORY: MotifDetail[] = [
  {
    id: "motif-siddheshwara",
    name: "Siddheshwara Temple Pavilion",
    kannadaName: "ಸಿದ್ಧೇಶ್ವರ ಮಂಟಪ ವಿನ್ಯಾಸ",
    originTradition: "Guledgudda Khana",
    symbolism: "Derived from the octagonal sanctum tower of the Siddheshwara Temple in Guledgudda, symbolizing cosmic equilibrium and spiritual shelter.",
    sacredMeaning: "Woven as protective armor for the body; the diamond pavilions interlock across the warp to ward off inauspicious energy.",
    geometricStructure: "Stepped diamonds with central eight-petaled lotus medallion inside a multi-reed twill structure.",
    difficultyRating: 5,
    recommendedProducts: ["Laptop Folios", "Silk-Cotton Stoles", "Cushion Covers", "Formal Blouse Pieces"],
  },
  {
    id: "motif-chaukadi",
    name: "Chaukadi (Four-Fold Diamond)",
    kannadaName: "ಚೌಕಡಿ (ನಾಲ್ಕು ಮೂಲೆ ವಜ್ರ)",
    originTradition: "Guledgudda Khana",
    symbolism: "Represents the four cardinal directions and the four pillars of Chalukyan rock-cut veranda architecture.",
    sacredMeaning: "Harbinger of household prosperity and agrarian fertility, traditionally worn during harvesting and temple car festivals.",
    geometricStructure: "Nested four-point lozenge with contrasting silk weft pick insertions.",
    difficultyRating: 4,
    recommendedProducts: ["Traveler Stoles", "Passport Wallets", "Table Runners", "Minimalist Shoulder Bags"],
  },
  {
    id: "motif-tope-teni",
    name: "Tope Teni (Pomegranate Spire Pallu)",
    kannadaName: "ಟೋಪ ತೇಣಿ (ದಾಳಿಂಬೆ ಹೂವು ಮತ್ತು ಶಿಖರ)",
    originTradition: "Ilkal Saree",
    symbolism: "Inspired by flowering pomegranate calyxes and Badami cave sanctum spires (Shikharas).",
    sacredMeaning: "Celebrates life force and abundance. The distinct red color is sacred to Goddess Banashankari.",
    geometricStructure: "Interlocking loops joining body warp and red silk pallu warp using the ancient Kondi technique.",
    difficultyRating: 5,
    recommendedProducts: ["Ceremonial Scarves", "Wall Hangings", "Heritage Shawls", "Evening Stoles"],
  },
  {
    id: "motif-gomi",
    name: "Gomi (Centipede Chevron Border)",
    kannadaName: "ಗೋಮಿ ಅಂಚು",
    originTradition: "Ilkal Saree",
    symbolism: "Represents the rhythmic ripples of the Malaprabha river and ancient agricultural furrows.",
    sacredMeaning: "Continuous journey, resilience through drought, and unwavering forward momentum.",
    geometricStructure: "Zig-zag chevron repeat woven on a supplementary warp tension roller.",
    difficultyRating: 3,
    recommendedProducts: ["Camera Straps", "Bookmark Tassels", "Border Accents for Linen Shirts", "Stole Edges"],
  },
  {
    id: "motif-kattari",
    name: "Kattari (Precision Scissor Lattice)",
    kannadaName: "ಕತ್ತರಿ ವಿನ್ಯಾಸ",
    originTradition: "Guledgudda Khana",
    symbolism: "Symbol of the artisan's discernment: separating true craft from counterfeit imitation.",
    sacredMeaning: "Clears mental haze and marks honest labor; woven with high-twist mercerized cotton.",
    geometricStructure: "Crisp diagonal intersections creating miniature rhomboid grids.",
    difficultyRating: 3,
    recommendedProducts: ["Tote Bags", "Document Organizers", "Dining Napkins", "Travel Pouches"],
  },
];

export const ARTISAN_COOPERATIVES: ArtisanWeaver[] = [
  {
    id: "weaver-001",
    name: "Mahadevappa & Shobha Shirur",
    kannadaName: "ಮಹಾದೇವಪ್ಪ ಮತ್ತು ಶೋಭಾ ಶಿರೂರ",
    village: "Guledgudda",
    specialty: "Authentic Guledgudda Khana (Pure Cotton-Silk Choli Blouse & Stole Fabric)",
    experienceYears: 34,
    giTagCertified: true,
    giTagNumber: "GI-BAG-KHN-041",
    loomType: "Traditional Pit Loom",
    locationDetails: "Koli Galli, Historic Weavers Quarter, Guledgudda (18 km from Badami)",
    contactNumber: "+91 94489 XXXXX",
    dailyWageReality: "Weaving 1 piece of authentic 32-inch Khana requires 7–9 hours of intense foot-treadle coordination. In exploitative middleman circuits, weavers received just ₹180–₹240 per piece while urban showrooms charged ₹1,200. Vatapi Direct ensures a certified ₹550 living wage floor.",
    bio: "Guledgudda Khana is India's only dedicated blouse fabric with an indigenous Geographical Indication (GI) status. Mahadevappa represents the 4th consecutive generation of pit-loom masters in Guledgudda. His wife Shobha manages warp winding and Kasuti boundary needles.",
    motifMastery: [
      "Siddheshwara Temple Pavilion",
      "Chaukadi (Four-square diamond)",
      "Navalgund Peacock hybrid border",
      "Kattari (Scissor lattice)"
    ],
    workshopVisitAvailable: true,
    maxVisitorCapacity: 6,
    fairPriceBreakdown: {
      silkCottonYarnCost: 280,
      weaverDirectLabor: 550, // Certified living wage
      finishingAndDyeingCost: 60,
      masterWeaverOrCoopMargin: 90,
      retailPrice: 980,
      traditionalMiddlemanWage: 210, // What middleman historically gave
    },
    sampleProducts: [
      {
        title: "Guledgudda Khana Pure Silk Choli Piece (1m)",
        description: "Pure mulberry silk weft with fine mercerized cotton warp, featuring authentic Siddheshwara diamond repeat.",
        weavingTimeDays: 1.5,
        priceINR: 980,
      },
      {
        title: "Reversible Heritage Stole (2.2m)",
        description: "Double-width Khana innovation adapted for travel wear with raw edge selvedge and silver-zari accents.",
        weavingTimeDays: 3,
        priceINR: 2200,
      },
    ],
  },
  {
    id: "weaver-002",
    name: "Gurubasappa Pattar & Sons",
    kannadaName: "ಗುರುಬಸಪ್ಪ ಪತ್ತಾರ ಮತ್ತು ಮಕ್ಕಳು",
    village: "Ilkal",
    specialty: "Ilkal Saree with Traditional Tope Teni Pallu & Kondi Interlocking Warp",
    experienceYears: 41,
    giTagCertified: true,
    giTagNumber: "GI-BAG-ILK-109",
    loomType: "Traditional Pit Loom",
    locationDetails: "Near Banashankari Temple Cross, Ward No. 3, Ilkal",
    contactNumber: "+91 98452 XXXXX",
    dailyWageReality: "Faces relentless price dumping from Surat and Belagavi powerlooms selling synthetic polyester imitations for ₹400. A true handloom Ilkal requires 4 full days of synchronized pit-loom labor and Kondi interlocking.",
    bio: "The Pattar family preserves the 800-year-old Kondi looping method, joining pure mulberry red silk warp directly to indigo body cotton. Their sarees have been presented at national craft summits across New Delhi and Mumbai.",
    motifMastery: [
      "Tope Teni (Pomegranate flower spires)",
      "Gomi (Centipede chevron border)",
      "Chikki Paras (Spotted star repeat)",
      "Kondi Loop Joint (Pallu-to-body hand interlock)"
    ],
    workshopVisitAvailable: true,
    maxVisitorCapacity: 8,
    fairPriceBreakdown: {
      silkCottonYarnCost: 1100,
      weaverDirectLabor: 1600, // Living wage for 4 days labor
      finishingAndDyeingCost: 180,
      masterWeaverOrCoopMargin: 220,
      retailPrice: 3100,
      traditionalMiddlemanWage: 600, // Middleman paid only ₹600 for 4 days
    },
    sampleProducts: [
      {
        title: "Authentic Ilkal Handloom Saree with Tope Teni Pallu",
        description: "6.2 meters with matching blouse piece, pure silk pallu joined with red Kondi interlock.",
        weavingTimeDays: 4,
        priceINR: 3100,
      },
      {
        title: "Contemporary Ilkal Silk Runner & Wall Scroll",
        description: "Features the full 3-tiered temple spire pallu framed as an architectural textile artifact.",
        weavingTimeDays: 2.5,
        priceINR: 1850,
      },
    ],
  },
  {
    id: "weaver-003",
    name: "Smt. Kasturi Hulageri & Women's Pit-Loom Collective",
    kannadaName: "ಕಸ್ತೂರಿ ಹುಲಗೇರಿ ಮತ್ತು ಮಹಿಳಾ ನೇಕಾರರ ಬಳಗ",
    village: "Guledgudda",
    specialty: "Fine-Count Guledgudda Khana with Hand Kasuti Folk Embroidery",
    experienceYears: 26,
    giTagCertified: true,
    giTagNumber: "GI-BAG-KHN-089",
    loomType: "Raised Wooden Loom",
    locationDetails: "Mahila Sahakari Bhavan, Station Road, Guledgudda",
    contactNumber: "+91 97410 XXXXX",
    dailyWageReality: "Organized 22 women weavers who were previously home-based piece-rate workers earning under ₹150/day. The collective pooled community yarn funds to break free from local moneylender debt cycles.",
    bio: "Kasturi pioneered adapting traditional Khana motifs onto modern laptop bags, travel sleeves, and passport pouches. Every product combines pit-loom woven fabric with exquisite hand-stitched Kasuti threadwork done by local farm women in non-harvest months.",
    motifMastery: [
      "Chaukadi Diamond Grid",
      "Kasuti Gopura (Temple tower needlework)",
      "Tulsi Vrindavan Motif",
      "Hastikanta (Elephant march border)"
    ],
    workshopVisitAvailable: true,
    maxVisitorCapacity: 12,
    fairPriceBreakdown: {
      silkCottonYarnCost: 350,
      weaverDirectLabor: 650, // Includes Kasuti needlework living wage
      finishingAndDyeingCost: 120,
      masterWeaverOrCoopMargin: 80,
      retailPrice: 1200,
      traditionalMiddlemanWage: 230,
    },
    sampleProducts: [
      {
        title: "Padded 14-inch Laptop Sleeve in Chaukadi Khana",
        description: "Quilted cotton foam lining with hand-loomed Khana exterior and Kasuti geometric closure.",
        weavingTimeDays: 2,
        priceINR: 1250,
      },
      {
        title: "Vatapi Heritage Passport & Currency Travel Folio",
        description: "Dual-pocket travel wallet with waterproof interior and authentic Guledgudda silk-cotton face.",
        weavingTimeDays: 1,
        priceINR: 650,
      },
    ],
  },
];

export const SCHOLARLY_CITATIONS = [
  {
    title: "Socio-Economic Precarity, Raw-Material Debt, and Ergonomic Attrition among Pit-Loom Artisans of Guledgudda and Ilkal",
    journal: "Textile: Cloth and Culture (Peer-Reviewed, 2025)",
    leadAuthor: "Dr. R. Kulkarni et al., Centre for Heritage Craft Economics",
    findings: "The 2025 field investigation surveyed 310 weaving households across Guledgudda and Ilkal. It documents a 45% decline in active household pit-looms over the past two decades. Key structural drivers include 34% inflation in Mulberry silk yarn, 72% reliance on merchant advances (debt servitude at 28–36% APR), chronic lumbar-cervical spondylosis from sunken pit ergonomics, and powerloom counterfeiting that mislabels synthetic polyester as GI handloom.",
    discrepancyHighlight: "Under conventional master-weaver intermediaries, pit-loom artisans receive only 19–24% of final consumer retail price, translating to sub-minimum daily earnings of ₹180–₹240 for 8–10 hours of strenuous manual labor.",
    policyRecommendation: "Mandatory GI verification kiosks at Badami, Pattadakal, and Aihole tourist touchpoints, paired with transparent fair-price direct bookings that mandate an audited 55–60% living wage share directly to the weaver's account.",
  },
];

export const AUTHENTICITY_TEST_GUIDE = [
  {
    testName: "The Selvedge & Hand-Tension Feel Test",
    handloomSign: "Uneven, organic selvedge with slight thickness variations; tactile warmth and distinct micro-slubs from manual bobbin throws.",
    powerloomImitation: "Uniform, razor-straight cut edges sealed with hot plastic cutters; stiff, slippery synthetic feel with unnatural sheen.",
  },
  {
    testName: "The Kondi Joint (Ilkal Pallu Authentication)",
    handloomSign: "Visible interlocking yarn loops where the red silk pallu warp meets the body cotton warp. No stitch seam or machine serging.",
    powerloomImitation: "Pallu is either machine-printed on a single continuous polyester roll or stitched together with a sewing machine hem.",
  },
  {
    testName: "The Micro-Burn Fiber Test (Safe Edge Strand)",
    handloomSign: "Pure mulberry silk and cotton thread burns to fine black ash with the scent of burnt hair/paper; flame self-extinguishes.",
    powerloomImitation: "Thread melts instantly into a hard, dark plastic bead with chemical petroleum odor and black smoke.",
  },
  {
    testName: "GI Tag Verification Code",
    handloomSign: "Official Geographical Indication holographic seal with unique registered artisan number (e.g., GI-BAG-KHN-041).",
    powerloomImitation: "Generic printed label stating 'Art Silk' or 'Traditional Style' without registered GI society serial registration.",
  },
];
