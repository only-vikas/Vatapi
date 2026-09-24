export interface EpigraphyPhrase {
  phraseOldKannada: string;
  transliteration: string;
  modernKannada: string;
  meaning: string;
  epigraphicalNote: string;
}

export interface InscriptionSpotlight {
  title: string;
  dateCE: number;
  sakaEra: number;
  script: string;
  patron: string;
  locationDetails: string;
  originalOldKannadaSnippet: string;
  englishTranslation: string;
  historicalSignificance: string;
  phrases: EpigraphyPhrase[];
  chronologyDatingNetwork: {
    monument: string;
    relationship: string;
    datedContext: string;
  }[];
}

export interface Monument {
  id: string;
  name: string;
  kannadaName: string;
  location: string;
  taluk: "Badami" | "Hungund";
  era: string;
  ruler: string;
  architecturalStyle: string;
  timings: string;
  entryFee: string;
  stepCountFact: string; // Clarifying the 2000 steps myth
  summary: string;
  highlights: string[];
  conservationStatus: "Good" | "Needs Monitoring" | "Active Concern";
  virtualStops: {
    title: string;
    description: string;
    audioTranscript: string;
  }[];
  inscriptionSpotlight?: InscriptionSpotlight;
}

export interface MythDebunkItem {
  id: string;
  myth: string;
  sourceOfConfusion: string;
  groundRealityFact: string;
  actualSteps: string;
  verifiedBy: string;
  badge: string;
}

export const MONUMENT_MYTHS: MythDebunkItem[] = [
  {
    id: "myth-2000-steps",
    myth: "The Badami Cave Temples require climbing 2,000 steps to visit.",
    sourceOfConfusion: "Outdated tourist blogs and the district heritage page conflate the arduous perimeter trek to the Upper Shivalaya / Northern Fort across the rugged cliff ridge with the cave temples.",
    groundRealityFact: "The 4 rock-cut caves are arranged on tiered terraces with paved flights of stairs: Cave 1 is 40 steps from gate; Cave 2 is 64 steps; Cave 3 is 120 steps; Cave 4 is 150 steps. The entire 4-cave circuit is 374 cumulative steps with shaded resting landings.",
    actualSteps: "374 steps cumulative (40 to 150 per cave)",
    verifiedBy: "Archaeological Survey of India (ASI) Dharwad Circle & Ground GPS survey",
    badge: "Most Common Myth"
  },
  {
    id: "myth-pattadakal-climb",
    myth: "Pattadakal requires strenuous hill hiking like Badami.",
    sourceOfConfusion: "Visitors assume all Chalukya sites are cliff rock-cut caves.",
    groundRealityFact: "Pattadakal is completely flat riverside parkland along the Malaprabha River. All 10 temples are accessible via smooth paved lawns with only 1 to 3 low threshold steps at sanctum entryways.",
    actualSteps: "0 hill steps (Flat garden complex)",
    verifiedBy: "UNESCO World Heritage Site Documentation",
    badge: "Universal Access"
  },
  {
    id: "myth-banashankari-dates",
    myth: "The Banashankari Jatre takes place only in February.",
    sourceOfConfusion: "Solar vs lunar calendar discrepancies. Sources often list either late December or mid-February.",
    groundRealityFact: "The Jatre is anchored by the Hindu lunar month of Pausha (Pausha Poornima), which shifts between late December, January, and early February. The main cultural festival runs for 21 days with thousands of stalls and cart rides.",
    actualSteps: "Ground level paved temple courtyard",
    verifiedBy: "Karnataka Tourism Department & Banashankari Temple Trust",
    badge: "Calendar Reality"
  },
  {
    id: "myth-aihole-distance",
    myth: "Aihole is just a single temple and can be seen in 20 minutes.",
    sourceOfConfusion: "Tourists only stop at the Durga Temple front lawn before rushing to Pattadakal.",
    groundRealityFact: "Aihole contains 122 historical monuments spread over an entire living village landscape, spanning the 5th to 12th century CE, serving as the evolutionary laboratory of Indian temple architecture.",
    actualSteps: "Dispersed village trail (flat to mild incline)",
    verifiedBy: "ASI Aihole Archaeological Museum & Monograph Series",
    badge: "Historical Scope"
  },
  {
    id: "myth-handloom-counts",
    myth: "Guledgudda has 30,000 active handlooms producing Khana today.",
    sourceOfConfusion: "Old mid-20th-century surveys are cited without noting the catastrophic attrition to mechanized powerlooms.",
    groundRealityFact: "At its peak, Guledgudda sustained over 15,000-25,000 pit-looms. Today, fewer than 200 authentic pit-loom weavers remain in continuous production, making direct GI patronage critical.",
    actualSteps: "Paved town weavers quarter (ground level)",
    verifiedBy: "Textile (2025 peer-reviewed study) & Weavers Cooperative Society",
    badge: "Artisan Truth"
  }
];

export const MONUMENTS: Monument[] = [
  {
    id: "badami-cave-1",
    name: "Badami Cave 1 (Nataraja & Shaiva Sanctuary)",
    kannadaName: "ಬಾದಾಮಿ ಗುಹೆ ೧ (ನಟರಾಜ ಗುಹೆ)",
    location: "Badami Rock Cliffs (Lower Terrace)",
    taluk: "Badami",
    era: "c. 550–575 CE",
    ruler: "Chalukya Pulakeshin I / Kirtivarman I",
    architecturalStyle: "Early Chalukyan Rock-Cut Monolithic",
    timings: "9:00 AM – 5:30 PM daily",
    entryFee: "₹25 (Indians), ₹300 (Foreigners) - Composite ASI ticket for Caves 1-4",
    stepCountFact: "40 stone steps from ground ticketing gate. (Note: Old guidebooks claiming '2,000 steps' erroneously conflate the northern cliff perimeter trek; Cave 1 is accessible within 3 minutes of the lower plaza).",
    summary: "Carved into sheer sandstone cliffs, Cave 1 is famous for the 18-armed dancing Shiva (Nataraja) executing 81 Bharatanatyam mudras simultaneously with Ganesha and Nandi playing the mridangam.",
    highlights: [
      "18-armed Nataraja relief with 81 combined hand poses",
      "Ardhanarishvara depicting cosmic balance of Shiva & Parvati",
      "Harihara carving flanked by Garuda and bull Nandi",
      "Intricately carved coiled Nagaraja ceiling panel"
    ],
    conservationStatus: "Good",
    virtualStops: [
      {
        title: "The 18-Armed Dancing Nataraja",
        description: "Front left veranda panel carved directly into the monolithic sandstone.",
        audioTranscript: "Look closely at the 18 arms of Shiva. Mathematicians and dance scholars have noted that if you pair any right hand with any left hand, it forms one of the 81 classical Bharatanatyam mudras described in the Natyashastra."
      },
      {
        title: "Ardhanarishvara Inner Relief",
        description: "Split composite idol where the right half is masculine Shiva and the left half is feminine Parvati.",
        audioTranscript: "Notice the jewelry: Shiva wears a tiger skin and coiled serpent, while Parvati's half features fine bangles and folded silk."
      }
    ]
  },
  {
    id: "badami-cave-2",
    name: "Badami Cave 2 (Vishnu Trivikrama & Varaha Sanctuary)",
    kannadaName: "ಬಾದಾಮಿ ಗುಹೆ ೨ (ವಿಷ್ಣು ತ್ರಿವಿಕ್ರಮ ಗುಹೆ)",
    location: "Badami Rock Cliffs (Mid Terrace)",
    taluk: "Badami",
    era: "Late 6th century CE (c. 570 CE)",
    ruler: "Western Chalukya Kirtivarman I",
    architecturalStyle: "Vaishnava Monolithic Rock-Cut Sanctuary",
    timings: "9:00 AM – 5:30 PM daily",
    entryFee: "Included in ASI Cave Ticket",
    stepCountFact: "64 paved stone steps up from Cave 1 terrace. Equipped with iron safety railings and midway resting landing.",
    summary: "Dedicated to Vishnu, Cave 2 is renowned for colossal relief panels of Vishnu as Varaha the boar rescuing mother Earth (Bhudevi) from the ocean, and Trivikrama stepping across celestial realms.",
    highlights: [
      "Colossal Trivikrama panel conquering cosmic space with lifted leg",
      "Varaha holding Bhudevi tenderly upon his tusk",
      "Veranda ceiling frieze of carved dwarf ganas in playful postures",
      "Lotus medallions carved into solid cliff sandstone"
    ],
    conservationStatus: "Good",
    virtualStops: [
      {
        title: "Varaha Avatar Rescuing Bhudevi",
        description: "Eastern wall high-relief carving depicting cosmic preservation.",
        audioTranscript: "Observe how the Chalukya sculptors balanced immense physical power with tender gentleness in Varaha's gaze toward Bhudevi."
      }
    ]
  },
  {
    id: "badami-cave-3",
    name: "Badami Cave 3 (Maha-Vishnu & Mangalesha Inscription)",
    kannadaName: "ಬಾದಾಮಿ ಗುಹೆ ೩ (ಮಹಾ ವಿಷ್ಣು ಮತ್ತು ಮಂಗಲೇಶ ಶಾಸನ)",
    location: "Badami Rock Cliffs (Upper Terrace)",
    taluk: "Badami",
    era: "Dated precisely to 578 CE (Saka 500)",
    ruler: "King Mangalesha (Western Chalukya)",
    architecturalStyle: "Vaishnava Monolithic Rock-Cut Sanctuary",
    timings: "9:00 AM – 5:30 PM daily",
    entryFee: "Included in ASI Cave Ticket",
    stepCountFact: "120 total stone steps from Cave 1 (approx. 56 steps from Cave 2). Broad stepped pathway with shaded pauses.",
    summary: "The crown jewel and largest cave of Badami, boasting monument-scale reliefs of Vishnu as Trivikrama, Narasimha, and Varaha. Contains India's foremost dated epigraphic record for early rock architecture.",
    highlights: [
      "Trivikrama (Vamana) lifting cosmic leg to measure the heavens",
      "Seated Vishnu on the multi-hooded serpent Adisesha",
      "Frescoes on bracket figures with ancient vegetable pigments",
      "Celebrated 578 CE Old Kannada stone inscription on the veranda pillar"
    ],
    conservationStatus: "Needs Monitoring",
    inscriptionSpotlight: {
      title: "King Mangalesha Cave 3 Veranda Pillar Inscription (578 CE)",
      dateCE: 578,
      sakaEra: 500,
      script: "Early Southern Brahmi / Old Kannada (Hale Kannada)",
      patron: "Chalukya King Mangalesha",
      locationDetails: "Carved on the front face of the eastern veranda pillar, overlooking Agastya Lake.",
      originalOldKannadaSnippet: "ಸ್ವಸ್ತಿ ಶ್ರೀ ವಲ್ಲಭ... ಶಕವರ್ಷೇಷ್ವತಿ ಕ್ರಾಂತೇಷು ಪಂಚಸು ಶತೇಷು... ಕೃತಮಿವಂ ಮಹಾವಿಷ್ಣುಗೃಹಂ... ಕೀರ್ತಿವರ್ಮ-ಗುಣರತ್ನಧಾಮ",
      englishTranslation: "Hail! In the expired 500th year of the Saka kings [578 CE], during the reign of Sri Vallabha Mangalesha, this glorious rock-cut sanctuary of Maha-Vishnu was carved, dedicated in memory of elder brother King Kirtivarman I, endowing village revenues to Brahmins.",
      historicalSignificance: "This is one of the most crucial chronometers in Indian art history. Because this inscription carries an exact absolute date (Saka 500 = 578 CE) and explicitly identifies the excavation of Cave 3 ('Mahavishnugriham'), it provides an unshakable epigraphical anchor point for dating all early Western Chalukya architecture and peninsular rock temples.",
      phrases: [
        {
          phraseOldKannada: "ಸ್ವಸ್ತಿ ಶ್ರೀ ವಲ್ಲಭ",
          transliteration: "Svasti Śrī Vallabha",
          modernKannada: "ಶುಭವಾಗಲಿ, ಸಿರಿವಲ್ಲಭ (ಮಂಗಲೇಶ)",
          meaning: "Hail! May fortune favor the Beloved of Prosperity (King Mangalesha)",
          epigraphicalNote: "Standard imperial Chalukya invocation honoring Vishnu through the royal title Sri-Vallabha."
        },
        {
          phraseOldKannada: "ಶಕವರ್ಷೇಷ್ವತಿ ಕ್ರಾಂತೇಷು ಪಂಚಸು ಶತೇಷು",
          transliteration: "Śaka-varṣeṣv-atikrānteṣu pañcasu śateṣu",
          modernKannada: "ಶಕ ಕಾಲದ ೫೦೦ ವರ್ಷಗಳು ಕಳೆದಾಗ (೫೭೮ ಕ್ರಿ.ಶ.)",
          meaning: "When five hundred years of the Saka king era had fully elapsed (500 + 78 = 578 CE)",
          epigraphicalNote: "Decisive epigraphical formula: 'atikrānta' denotes elapsed astronomical years, securely dating this monument to late 578 CE."
        },
        {
          phraseOldKannada: "ಕೃತಮಿವಂ ಮಹಾವಿಷ್ಣುಗೃಹಂ",
          transliteration: "Kṛtam-idaṁ Mahā-Viṣṇu-gṛham",
          modernKannada: "ಈ ಮಹಾವಿಷ್ಣುವಿನ ಕಲ್ಲುಗುಹಾಲಯ ನಿರ್ಮಾಣವಾಯಿತು",
          meaning: "This glorious rock-cut sanctuary of Maha-Vishnu was completed",
          epigraphicalNote: "Confirms original dedication as a Vaishnava shrine, corroborating the gigantic Trivikrama, Narasimha, and Varaha reliefs."
        },
        {
          phraseOldKannada: "ಕೀರ್ತಿವರ್ಮ-ಗುಣರತ್ನಧಾಮ",
          transliteration: "Kīrtivarmā-guṇa-ratna-dhāma",
          modernKannada: "ಗುಣರತ್ನಗಳ ಆಗರವಾದ ಅಣ್ಣ ಕೀರ್ತಿವರ್ಮರ ಪುಣ್ಯಾರ್ಥವಾಗಿ",
          meaning: "In honor of elder brother Kirtivarman, an abode of gemstone-like virtues",
          epigraphicalNote: "Royal fraternal memorialization; illustrates peaceful dynastic succession dynamics between the Chalukya brothers."
        },
        {
          phraseOldKannada: "ಲಂಜೀಶ್ವರಂ ಗ್ರಾಮದಾನಂ",
          transliteration: "Lañjīśvaraṁ grāma-dānaṁ",
          modernKannada: "ಲಂಜೀಶ್ವರ (ನಂದಿಕೇಶ್ವರ) ಗ್ರಾಮದ ಕಂದಾಯ ಸಮರ್ಪಣೆ",
          meaning: "Endowment of the tax revenues of Lanjisvara village for temple maintenance",
          epigraphicalNote: "Corresponds to modern Nandikeshwara village near Mahakuta, proving continuous local settlement geography since 6th century."
        }
      ],
      chronologyDatingNetwork: [
        {
          monument: "Badami Cave 1 (Shaiva Nataraja)",
          relationship: "Carved c. 550–570 CE (Precedes Cave 3)",
          datedContext: "Bracket motifs and rudimentary pillar pilasters establish it as the pioneer excavation under King Pulakeshin I."
        },
        {
          monument: "Badami Cave 2 (Vaishnava Trivikrama)",
          relationship: "Carved c. 565–575 CE",
          datedContext: "Intermediate architectural complexity bridging the simpler Cave 1 with the grand scale of Cave 3."
        },
        {
          monument: "Badami Cave 3 (Maha-Vishnu Anchor)",
          relationship: "Fixed Datum: 578 CE (Saka 500)",
          datedContext: "The sole monument with an absolute recorded calendar year, anchoring the entire early Chalukya artistic sequence."
        },
        {
          monument: "Badami Cave 4 (Jain Sanctuary)",
          relationship: "Carved c. 600–615 CE (Post-Cave 3)",
          datedContext: "Stylistic evolution in ceiling medallions confirms excavation under later Chalukya rulers."
        },
        {
          monument: "Aihole Durga & Pattadakal Virupaksha",
          relationship: "Evolved 680–740 CE",
          datedContext: "Artisans transitioned from monolithic rock cutting at Badami to structural stone masonries at Aihole and Pattadakal."
        }
      ]
    },
    virtualStops: [
      {
        title: "Trivikrama Cosmic Stride",
        description: "Enormous high-relief panel showing Vishnu measuring the cosmos.",
        audioTranscript: "Standing nearly 10 feet tall, Vishnu lifts his left foot to the realm of Brahma. The muscular tension carved into porous sandstone has survived 1,450 years of monsoon weathering."
      }
    ]
  },
  {
    id: "badami-cave-4",
    name: "Badami Cave 4 (Jain Tirthankara Sanctuary)",
    kannadaName: "ಬಾದಾಮಿ ಗುಹೆ ೪ (ಜೈನ ತೀರ್ಥಂಕರ ಗುಹೆ)",
    location: "Badami Rock Cliffs (Highest Terrace)",
    taluk: "Badami",
    era: "Late 6th – Early 7th century CE",
    ruler: "Western Chalukyas",
    architecturalStyle: "Digambara Jain Monolithic Rock-Cut Sanctuary",
    timings: "9:00 AM – 5:30 PM daily",
    entryFee: "Included in ASI Cave Ticket",
    stepCountFact: "150 total stone steps from base (highest cave of the four). Offers panoramic views across Agastya Lake.",
    summary: "The topmost cave sanctuary dedicated to Jainism, featuring breathtaking monolithic carvings of Lord Mahavira seated on a lion throne and Parshvanatha sheltered by a multi-headed serpent.",
    highlights: [
      "Serene seated Mahavira surrounded by attendants and chowrie bearers",
      "Bahubali (Gommata) standing in deep Kayotsarga meditation with creepers entwining his legs",
      "Parshvanatha with five-headed serpent canopy",
      "Panoramic vistas over Bhutanatha Temple and Agastya Lake"
    ],
    conservationStatus: "Good",
    virtualStops: [
      {
        title: "Bahubali Kayotsarga Meditation",
        description: "Intricate rock relief depicting Bahubali meditating unperturbed as forest vines wrap his limbs.",
        audioTranscript: "Notice the stillness chiseled into the rock. Chalukya sculptors rendered the botanical details of the climbing vines with botanical precision."
      }
    ]
  },
  {
    id: "bhutanatha-agastya",
    name: "Bhutanatha Temple & Agastya Tirtha Lake",
    kannadaName: "ಭೂತನಾಥ ದೇವಾಲಯ ಮತ್ತು ಅಗಸ್ತ್ಯ ತೀರ್ಥ",
    location: "Eastern Bank of Agastya Lake, Badami",
    taluk: "Badami",
    era: "7th – 11th century CE",
    ruler: "Early Chalukyas with later Kalyana Chalukya additions",
    architecturalStyle: "Sandstone Structural Shore Temple",
    timings: "6:00 AM – 6:30 PM",
    entryFee: "Free access (surrounding ghats and temple)",
    stepCountFact: "Gentle flat pathway along the lake embankment with 15 shallow steps down to water level.",
    summary: "Reflecting seamlessly on the waters of the 7th-century artificial reservoir Agastya Lake, Bhutanatha combines rock-cut sanctum shrines with open stone mantapas extending directly into the water.",
    highlights: [
      "Open pillared hall extending into the reservoir waters",
      "Rock-hewn reliefs of Dashavatara and Varaha behind the temple",
      "Agastya Tirtha reservoir stone embankment engineering",
      "Golden hour photographic alignment with sandstone bluffs"
    ],
    conservationStatus: "Active Concern",
    virtualStops: [
      {
        title: "Agastya Embankment Hydro-Engineering",
        description: "Masonry dam constructed in the 7th century to harvest rainwater between the two sandstone ridges.",
        audioTranscript: "Agastya Lake isn't just scenic; it was a masterclass in runoff capture. In light of the recent September 2026 drought declaration across Bagalkote, preserving this historical reservoir from silt and soap runoff is vital."
      }
    ]
  },
  {
    id: "pattadakal-complex",
    name: "Pattadakal UNESCO World Heritage Complex",
    kannadaName: "ಪಟ್ಟದಕಲ್ಲು ವಿಶ್ವ ಪರಂಪರೆ ತಾಣ",
    location: "Pattadakal Village, Malaprabha Riverbank",
    taluk: "Badami",
    era: "7th – 8th century CE",
    ruler: "Vikramaditya II and Queens Lokamahadevi & Trailokyamahadevi",
    architecturalStyle: "Confluence of Dravida (Southern) and Rekha-Nagara (Northern) Temple Towers",
    timings: "6:00 AM – 6:00 PM daily",
    entryFee: "₹40 (Indians), ₹600 (Foreigners)",
    stepCountFact: "Flat parkland terrain; zero mountain steps. Level pathways between 10 temples, 2-3 shallow threshold steps to mandapas.",
    summary: "The coronation city (Pattada-Kallu) of the Chalukya dynasty, representing the high-water mark of early Indian temple architecture where southern vimana towers stand alongside northern curvilinear spires.",
    highlights: [
      "Virupaksha Temple: built in 740 CE celebrating victory over Pallavas of Kanchipuram",
      "Mallikarjuna Temple: twin shrine built by Queen Trailokyamahadevi",
      "Papanatha Temple: fusion of Nagara shikhara with southern ceiling ornamentation",
      "Carved pillars depicting narrative sequences from the Mahabharata and Ramayana"
    ],
    conservationStatus: "Good",
    virtualStops: [
      {
        title: "Virupaksha Southern Vimana",
        description: "The grandest temple in the complex with a stepped Dravidian pyramidal tower.",
        audioTranscript: "Virupaksha was so admired across peninsular India that Rashtrakuta King Krishna I used its architecture as the exact structural model when carving the famed Kailasa Temple at Ellora."
      }
    ]
  },
  {
    id: "aihole-durga",
    name: "Aihole Durga Temple (Apsidal Fortress Sanctuary)",
    kannadaName: "ಐಹೊಳೆ ದುರ್ಗಾ ದೇವಾಲಯ",
    location: "Aihole Main Enclosure",
    taluk: "Hungund",
    era: "Late 7th – Early 8th century CE",
    ruler: "Western Chalukyas",
    architecturalStyle: "Apsidal (Gajaprishtha / Elephant-back) with Peristyle Ambulatory",
    timings: "9:00 AM – 5:30 PM",
    entryFee: "₹25 (ASI entry for Aihole museum & complex)",
    stepCountFact: "12 steps to the pillared colonnade veranda. Smooth level lawns throughout inner enclosure.",
    summary: "Often called the 'Cradle of Hindu Rock Architecture', Aihole houses 122 temples. The Durga Temple features an extraordinary apsidal design resembling a Buddhist Chaitya, flanked by masterwork high reliefs.",
    highlights: [
      "Apsidal rounded sanctum surrounded by 28 fluted stone columns",
      "Sensational sculpture of Mahishasuramardini (Durga piercing the buffalo demon)",
      "Pillared veranda carved with romantic couples (Mithunas) and guardian deities",
      "Historical fort wall (Durg) surrounding the complex"
    ],
    conservationStatus: "Good",
    virtualStops: [
      {
        title: "The Apsidal Colonaded Ambulatory",
        description: "Open air pradakshinapatha allowing natural light to sweep through the stone columns.",
        audioTranscript: "Aihole was a laboratory where master craftsmen experimented with structural forms before building at Pattadakal. Notice how the rounded end channels breeze even in peak North Karnataka summers."
      }
    ]
  },
  {
    id: "aihole-lad-khan",
    name: "Aihole Lad Khan Temple (Ancient Assembly Hall)",
    kannadaName: "ಐಹೊಳೆ ಲಾಡ್ ಖಾನ್ ದೇವಾಲಯ",
    location: "Aihole Central Complex",
    taluk: "Hungund",
    era: "c. 5th – 6th century CE",
    ruler: "Early Chalukyas",
    architecturalStyle: "Mandapa Style with Stone Lattice Windows",
    timings: "9:00 AM – 5:30 PM",
    entryFee: "Included in Aihole composite ticket",
    stepCountFact: "6 low stone steps from central courtyard.",
    summary: "One of the earliest structural stone temples in peninsular India. Constructed with massive sandstone beams mimicking timber architecture, it features ornate floral lattice jaali screens.",
    highlights: [
      "Perforated stone lattice screens (jaalis) casting patterned shadows",
      "Upper tier sanctum perched atop the main mandapa roof",
      "Pillars depicting Ganga and Yamuna river goddesses",
      "Timber-to-stone architectural transition joinery"
    ],
    conservationStatus: "Good",
    virtualStops: [
      {
        title: "Perforated Stone Jaali Screens",
        description: "Hand-chiseled sandstone grids that filter desert sun while ventilating the hall.",
        audioTranscript: "Look at the interlocking stone slabs. The builders were accustomed to carpentry, so they literally socketed heavy rock slabs together like wooden planks."
      }
    ]
  },
  {
    id: "mahakuta-complex",
    name: "Mahakuta Temple Complex & Pushkarini (Vishnu Pushkarini)",
    kannadaName: "ಮಹಾಕೂಟ ದೇವಾಲಯ ಸಮೂಹ ಮತ್ತು ಪುಷ್ಕರಿಣಿ",
    location: "Mahakuta Valley, 14 km from Badami",
    taluk: "Badami",
    era: "Late 6th – 7th century CE",
    ruler: "Chalukya Pulakeshin I / Mangalesha",
    architecturalStyle: "Shaiva Forest Sanctuary with Natural Perennial Spring",
    timings: "6:00 AM – 8:00 PM daily",
    entryFee: "Free access (Active pilgrim temple)",
    stepCountFact: "Level courtyard shaded by ancient banyan and neem trees; 10 stone steps into holy water tank.",
    summary: "A tranquil pilgrimage complex nestled in an arroyo of sandstone cliffs. Contains a perennial sweet-water spring feeding the holy Pushkarini tank with a submerged 5-faced Shiva linga shrine.",
    highlights: [
      "Active Pushkarini natural spring that never dries even in drought seasons",
      "Submerged Panchamukha Shiva Linga shrine inside the tank",
      "Mahakuteshwara and Mallikarjuna twin shrines",
      "Ancient inscribed pillar (now in Badami Museum) recording royal grants"
    ],
    conservationStatus: "Needs Monitoring",
    virtualStops: [
      {
        title: "Perennial Spring Pushkarini",
        description: "Historic stepped stone tank fed by subterranean sandstone aquifer.",
        audioTranscript: "While Bagalkote faces severe water distress today, Mahakuta's geological fault continues to yield crystal-clear spring water through ancient rock conduits."
      }
    ]
  },
  {
    id: "banashankari-temple",
    name: "Banashankari Amma Temple (Shakambhari Shrine)",
    kannadaName: "ಬನಶಂಕರಿ ಅಮ್ಮನವರ ದೇವಾಲಯ",
    location: "Cholachagudda, 5 km from Badami",
    taluk: "Badami",
    era: "7th century CE (Original Chalukyan) rebuilt 18th century (Maratha)",
    ruler: "Chalukya King Jagadekamalla / later Rashtrakuta & Peshwa",
    architecturalStyle: "Dravidian Sanctum with Deepa Stambhas and Haridra Tirtha",
    timings: "6:00 AM – 8:30 PM",
    entryFee: "Free entry (Pilgrimage temple)",
    stepCountFact: "Ground level paved precinct; zero steps on approach, gentle wheelchair ramp at north entrance.",
    summary: "Beloved mother goddess of northern Karnataka and southern Maharashtra. The temple is flanked by Haridra Tirtha, an enormous stepped water pond surrounded by high stone lamp towers (Deepa Stambhas).",
    highlights: [
      "Haridra Tirtha stepped sacred tank with central floating mantapa",
      "Twin three-story stone lamp towers (Deepa Stambhas) lit during Jatre",
      "Famous annual Banashankari Jatre (cultural fair drawing over 200,000 pilgrims)",
      "Simha-Vahana eight-armed Banashankari Devi idol"
    ],
    conservationStatus: "Good",
    virtualStops: [
      {
        title: "The Deepa Stambha Lamp Towers",
        description: "Three-tiered stone monoliths with projecting stone brackets for sesame oil lamps.",
        audioTranscript: "During the annual Jatre (held in the Hindu month of Pausha), these towering columns blaze with hundreds of clay diyas, illuminating the entire water basin."
      }
    ]
  }
];
