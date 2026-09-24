export interface AccessibilityProfile {
  id: "wheelchair" | "senior" | "low_vision" | "pram";
  title: string;
  kannadaTitle: string;
  badge: string;
  targetAudience: string;
  stepCountConstraint: string;
  recommendedMonuments: string[];
  inaccessibleMonuments: string[];
  adaptations: string[];
  detailedItinerary: {
    time: string;
    stopName: string;
    stepCount: number;
    terrainType: string;
    restroomAccess: string;
    transitNote: string;
    highlight: string;
  }[];
  virtualTourRecommended: boolean;
  precedentCitation: string;
}

export interface VirtualWalkthroughStop {
  id: string;
  title: string;
  kannadaTitle: string;
  zone: "Veranda East Wall" | "Veranda West Wall" | "Central Ceiling" | "Veranda Pillar" | "Inner Sanctum";
  dimensions: string;
  carvingPeriod: string;
  description: string;
  audioTranscript: string;
  kannadaAudioTranscript: string;
  tactileDescription: string;
  historicalSignificance: string;
  hotspots: {
    xPct: number;
    yPct: number;
    label: string;
    detail: string;
  }[];
}

export const VIRTUAL_CAVE3_STOPS: VirtualWalkthroughStop[] = [
  {
    id: "stop-trivikrama",
    title: "10-Foot Cosmic Trivikrama (Vishnu's Giant Stride)",
    kannadaTitle: "೧೦ ಅಡಿ ತ್ರಿವಿಕ್ರಮ ಮೂರ್ತಿ (ವಿಷ್ಣುವಿನ ವಿಶ್ವ ರೂಪ)",
    zone: "Veranda East Wall",
    dimensions: "3.2 meters high, carved directly out of the living cliff sandstone",
    carvingPeriod: "578 CE (Patronage of King Mangalesha)",
    description: "The colossal eight-armed Vishnu raises his left foot to the cosmic heavens, striding across the triple worlds of heaven, earth, and the netherworld. Below his raised thigh, the humiliated demon king Bali offers his crown, while the demon Rahu is subdued in the upper right register.",
    audioTranscript: "You are standing before the magnificent 10-foot Trivikrama on the eastern wall of Cave 3. Notice the dynamic diagonal energy: Vishnu's left leg reaches straight up toward the heavens, demonstrating his cosmic sovereignty over the universe. In his eight hands, he wields the holy Sudarshana chakra, the Panchajanya conch, a bow, and a mace, while his lower hand rests on his hip in effortless majesty. Running your fingers along the high-relief carving, the sandstone retains chisel marks made exactly 1,448 years ago.",
    kannadaAudioTranscript: "ನೀವು ಬಾದಾಮಿಯ ೩ನೇ ಗುಹೆಯ ಪೂರ್ವ ಗೋಡೆಯ ಮುಂದೆ ನಿಂತಿದ್ದೀರಿ. ಇಲ್ಲಿರುವ ೧೦ ಅಡಿ ಎತ್ತರದ ತ್ರಿವಿಕ್ರಮ ಮೂರ್ತಿಯು ಚಾಲುಕ್ಯ ಶಿಲ್ಪಕಲೆಯ ಅದ್ಭುತ ಶಿಖರವಾಗಿದೆ. ವಿಷ್ಣುವಿನ ಎಡಗಾಲು ಆಕಾಶದತ್ತ ಚಾಚಿದ್ದು, ತ್ರಿಭುವನಗಳನ್ನು ಅಳೆದ ದೃಶ್ಯವನ್ನು ಜೀವಂತವಾಗಿ ಕೆತ್ತಲಾಗಿದೆ.",
    tactileDescription: "Deeply undercut sandstone relief projecting 45 cm from wall; musculature of torso and flexed thigh clearly tangible to touch; beaded necklace and jeweled crown have raised micro-facets.",
    historicalSignificance: "One of the earliest and largest rock-cut depictions of Trivikrama in South Asia, establishing the iconic visual grammar replicated in later Ellora and Mamallapuram art.",
    hotspots: [
      { xPct: 48, yPct: 15, label: "Kireeta Makuta (Crown)", detail: "High cylindrical jeweled crown with pearl tassels and floral rosettes." },
      { xPct: 65, yPct: 35, label: "Sudarshana Chakra", detail: "Sharply edged discus held edge-forward with celestial flames." },
      { xPct: 35, yPct: 52, label: "Cosmic Left Leg", detail: "Vaulting into Brahmaloka, crossing the heavenly dome." },
      { xPct: 22, yPct: 82, label: "King Bali & Shukra", detail: "Demon king offering water of gift with bowed head." },
    ],
  },
  {
    id: "stop-narasimha",
    title: "Eight-Armed Standing Narasimha (Man-Lion Avatar)",
    kannadaTitle: "ಅಷ್ಟಭುಜ ನರಸಿಂಹ ಸ್ವಾಮಿ ಶಿಲ್ಪ",
    zone: "Veranda West Wall",
    dimensions: "3.0 meters high, opposing the Trivikrama panel",
    carvingPeriod: "578 CE",
    description: "Standing in royal, relaxed Tribhanga stance rather than ferocious battle. Narasimha rests his lower right arm on the handle of his divine gada (mace), radiating serene sovereign calm. His lion mane radiates like solar rays around an intricately crowned human-feline head.",
    audioTranscript: "Facing opposite the Trivikrama, on the western end of the veranda, stands the towering eight-armed Narasimha. Unlike later terrifying representations of the demon Hiranyakashipu being disemboweled, here the Chalukyan sculptor depicts the lion-god at peace after cosmic victory. He stands in an elegant three-bend pose, wearing heavy pearl strands and armlets. Beside his foot, the young devotee Prahlada gazes upward with folded hands in eternal gratitude.",
    kannadaAudioTranscript: "ಗುಹೆಯ ಪಶ್ಚಿಮ ಗೋಡೆಯಲ್ಲಿ ಭವ್ಯವಾದ ಅಷ್ಟಭುಜ ನರಸಿಂಹ ಶಿಲ್ಪವಿದೆ. ಇಲ್ಲಿ ನರಸಿಂಹನು ಉಗ್ರ ರೂಪದಲ್ಲಿರದೇ, ಶಾಂತ ಗಂಭೀರ ತ್ರಿಭಂಗ ಭಂಗಿಯಲ್ಲಿ ನಿಂತಿದ್ದಾನೆ.",
    tactileDescription: "Smoothly polished sandstone chest contrasting with deeply grooved, serrated lion mane curls framing the jawline.",
    historicalSignificance: "Masterpiece of royal Chalukyan iconography representing the divine sovereign protecting the state and upholding dharma.",
    hotspots: [
      { xPct: 50, yPct: 20, label: "Solar Lion Mane", detail: "Radial stylized curls carved with alternating depth for shadow play." },
      { xPct: 38, yPct: 58, label: "Divine Mace (Gada)", detail: "Fluted columnar club supporting the deity's resting forearm." },
      { xPct: 68, yPct: 85, label: "Prahlada the Devotee", detail: "Miniature figure rendered with reverence at the deity's side." },
    ],
  },
  {
    id: "stop-ceiling-brahma",
    title: "Coffered Ceiling: Brahma on Hamsa & Flying Vidyadharas",
    kannadaTitle: "ಮೇಲ್ಛಾವಣಿ: ಹಂಸಾರೂಢ ಬ್ರಹ್ಮ ಮತ್ತು ವಿದ್ಯಾಧರ ದಂಪತಿಗಳು",
    zone: "Central Ceiling",
    dimensions: "Ceiling bay: 4.8m x 3.6m; central medallion 1.8m diameter",
    carvingPeriod: "578 CE",
    description: "The veranda ceiling is partitioned into square coffers framing deep-relief medallions. In the central bay, four-faced Brahma rides his sacred goose (Hamsa), encircled by gracefully drifting celestial couples (Vidyadharas) whose flowing garments mimic weightless flight in the stratosphere.",
    audioTranscript: "Look directly overhead into the central ceiling bay. The entire flat ceiling of rock has been carved away to reveal a square lotus canopy. In the center sits Brahma with four serene faces, mounted upon his celestial swan. Radiating outwards are flying Vidyadhara couples floating effortlessly through clouds, their legs bent in the classical Indian dance stance of aerial flight. Traces of 6th-century vegetal plaster and natural earth pigments are still visible in the recessed crevices.",
    kannadaAudioTranscript: "ಗುಹೆಯ ಮೇಲ್ಛಾವಣಿಯನ್ನು ಗಮನಿಸಿ. ಕಲ್ಲಿನಲ್ಲೇ ಕೆತ್ತಿದ ಕಮಲದ ಮಧ್ಯೆ ಹಂಸದ ಮೇಲೆ ಕುಳಿತ ಚತುರ್ಮುಖ ಬ್ರಹ್ಮ ಮತ್ತು ಸುತ್ತಲೂ ಹಾರಾಡುವ ವಿದ್ಯಾಧರ ದಂಪತಿಗಳು ಅದ್ಭುತವಾಗಿ ಗೋಚರಿಸುತ್ತಾರೆ.",
    tactileDescription: "Concave floral rosettes with layered petal tiers; floating figures sculpted in near 3-dimensional relief extending down from bedrock.",
    historicalSignificance: "Demonstrates 6th-century mastery of ceiling weight distribution and marks the earliest surviving fresco-pigment underlays in Karnataka.",
    hotspots: [
      { xPct: 50, yPct: 50, label: "Brahma on Hamsa", detail: "Central four-headed deity seated cross-legged on the sacred swan." },
      { xPct: 28, yPct: 32, label: "Flying Vidyadhara Couple", detail: "Celestial lovers floating with intertwined arms and billowing drapery." },
      { xPct: 75, yPct: 65, label: "6th-Century Fresco Pigments", detail: "Faint traces of lapis lazuli and red ochre pigment preserved in hollows." },
    ],
  },
  {
    id: "stop-mangalesha-pillar",
    title: "Veranda Pillar 2: Mangalesha 578 CE Inscription",
    kannadaTitle: "ಕಂಬದ ಮೇಲಿನ ಮಂಗಳೇಶನ ಕ್ರಿ.ಶ. ೫೭೮ ರ ಶಾಸನ",
    zone: "Veranda Pillar",
    dimensions: "Inscribed panel: 45 cm wide x 60 cm tall on faceted pillar shaft",
    carvingPeriod: "Saka Year 500 (31 October 578 CE)",
    description: "Sixteen lines of crisp Old Kannada (Hale Kannada) / Sanskrit script incised with needle-like precision into the hard red sandstone. It records King Mangalesha dedicating this rock-cut temple (Maha-Vishnu-Griha) to Lord Vishnu on the auspicious Kartik Paurnima day, offering royal gifts for feeding Brahmins.",
    audioTranscript: "Here on the second pillar of the outer veranda is the single most valuable epigraph in Deccan art history. In sixteen lines of pristine Hale Kannada script, King Mangalesha recorded the exact consecration date: Saka Year 500, corresponding to October 31, 578 CE. Because this date is indisputable, it anchors the chronology of all early Chalukya temples and provides the chronological yardstick used by epigraphists worldwide.",
    kannadaAudioTranscript: "ಇದು ಭಾರತೀಯ ಇತಿಹಾಸದಲ್ಲೇ ಅತ್ಯಂತ ಪ್ರಸಿದ್ಧ ಶಾಸನ. ಮಂಗಳೇಶ ರಾಜನು ಶಾಲಿವಾಹನ ಶಕ ೫೦೦ (ಕ್ರಿ.ಶ. ೫೭೮) ರಲ್ಲಿ ಈ ಮಹಾವಿಷ್ಣು ಗೃಹವನ್ನು ಸಮರ್ಪಿಸಿದ ಬಗ್ಗೆ ಸ್ಪಷ್ಟವಾಗಿ ಬರೆಯಲಾಗಿದೆ.",
    tactileDescription: "Smoothly dressed stone face with crisp, V-shaped incised characters 2 cm in height, easily readable with fingertip contact.",
    historicalSignificance: "Absolute dating benchmark for Western Chalukya architecture, iconography, and early epigraphical Kannada paleography.",
    hotspots: [
      { xPct: 45, yPct: 20, label: "Date Line: Saka 500", detail: "Specifies 'Shaka Nripati Rajyabhisheka Samvatsareshu Panchasu Shateshu'." },
      { xPct: 55, yPct: 55, label: "Temple Name: Vishnu-Griha", detail: "Explicitly names the excavated cave as 'Maha-Vishnu-Griha'." },
      { xPct: 40, yPct: 80, label: "Royal Endowment (Lanjeshwara)", detail: "Records village tax grants for daily food offerings." },
    ],
  },
  {
    id: "stop-anantasayana",
    title: "Veranda Bracket & Anantasayana Vishnu (Reclining on Serpent)",
    kannadaTitle: "ಅನಂತಶಯನ ವಿಷ್ಣು ಮತ್ತು ಬ್ರಾಕೆಟ್ ಶಿಲ್ಪಗಳು",
    zone: "Inner Sanctum",
    dimensions: "Serpent coils 2.4 meters long spanning the inner vestibule",
    carvingPeriod: "578 CE",
    description: "Vishnu rests in cosmic meditation (Yoganidra) upon the seven-headed serpent Shesha drifting over the primeval ocean. Goddess Lakshmi sits reverently near his feet, while from his navel rises a lotus stalk supporting four-headed Brahma initiating the creation of a new universe.",
    audioTranscript: "Deep inside the vestibule, we gaze upon the cosmic dream of creation: Anantasayana Vishnu. Reclining languidly upon the buoyant coils of the great serpent Shesha, Vishnu's right arm folds behind his crowned head in contemplation. The seven serpent hoods fan out to form a protective stone parasol above his divine countenance. Lakshmi massages his lotus feet, while below, the demons Madhu and Kaitabha stand frozen, contemplating battle with the slumbering creator.",
    kannadaAudioTranscript: "ಶೇಷನಾಗನ ಮೇಲೆ ಯೋಗನಿದ್ರೆಯಲ್ಲಿರುವ ಅನಂತಶಯನ ವಿಷ್ಣುವಿನ ಶಿಲ್ಪವಿದು. ಏಳು ಹೆಡೆಗಳ ನಾಗರಾಜನು ಕೊಡೆಯಂತೆ ರಕ್ಷಣೆ ನೀಡಿದ್ದಾನೆ.",
    tactileDescription: "Seven hollowed serpent hoods forming a canopy; multi-tiered serpent coils beneath Vishnu's back provide undulating surface texture.",
    historicalSignificance: "Supreme expression of Chalukyan cosmic stillness and lyrical rock modeling before the entrance to the dark sanctum.",
    hotspots: [
      { xPct: 25, yPct: 25, label: "Seven-Headed Shesha Hoods", detail: "Undercut canopy with individual serpent tongues and fangs." },
      { xPct: 50, yPct: 45, label: "Reclining Vishnu (Yoganidra)", detail: "Resting serenely with crown tilted and right arm cradling head." },
      { xPct: 82, yPct: 70, label: "Goddess Lakshmi at Feet", detail: "Seated in reverent attendance at the cosmic feet." },
    ],
  }
];

export const ACCESSIBILITY_PROFILES: AccessibilityProfile[] = [
  {
    id: "wheelchair",
    title: "Wheelchair & Full Mobility Support",
    kannadaTitle: "ಗಾಲಿಕುರ್ಚಿ ಮತ್ತು ಪೂರ್ಣ ಚಲನಶೀಲತೆ ಬೆಂಬಲ",
    badge: "Step-Free / Ramp Priority",
    targetAudience: "Manual and motorized wheelchair users, paraplegic visitors, and those using walking frames.",
    stepCountConstraint: "Strictly 0 steps. All routes verified for gentle slopes (< 1:12 gradient).",
    recommendedMonuments: [
      "Pattadakal World Heritage Complex (Level perimeter stone paths & Virupaksha outer viewing pavilion)",
      "Aihole Durga Temple Enclosure (Flat gravel avenues with portable ramp deployed at entrance)",
      "Badami Archaeological Museum & Lake Promenade (Paved, barrier-free access with level entrance)"
    ],
    inaccessibleMonuments: [
      "Badami Caves 2, 3, 4 (No chair lift or ramp; 280+ irregular steep cliff stairs cut into sandstone)",
      "Northern Fort Upper Shivalaya (Unpaved rocky ascent requiring rock scrambles)"
    ],
    adaptations: [
      "Automatic activation of Vatapi 360° Cave 3 & 4 Virtual Sanctuary with spoken audio for ground-level contemplation",
      "ASI Pattadakal & Badami gate staff pre-alerted to provide portable threshold ramps",
      "Restrooms with 90cm wide doors and stainless-steel grab bars marked on live map"
    ],
    detailedItinerary: [
      {
        time: "08:30 AM – 10:30 AM",
        stopName: "Pattadakal World Heritage Complex",
        stepCount: 0,
        terrainType: "Smooth flagstone and compacted grass lawn",
        restroomAccess: "Accessible Western-style restroom at main KSTDC ticket plaza",
        transitNote: "Chartered tempo traveler drops directly at ramp entrance",
        highlight: "Circumambulate Virupaksha and Mallikarjuna temples from unobstructed perimeter paths with zero steps.",
      },
      {
        time: "11:15 AM – 01:00 PM",
        stopName: "Aihole Durga Temple & Archaeological Museum",
        stepCount: 0,
        terrainType: "Level gravel pathway with portable ramp at ticket threshold",
        restroomAccess: "Restroom near museum sculpture gallery",
        transitNote: "Park directly in front of the Durga temple ticket gate",
        highlight: "Inspect the apsidal sanctum and museum galleries housing Chalukyan masterpieces on one continuous ground plane.",
      },
      {
        time: "02:30 PM – 04:30 PM",
        stopName: "Badami Lower Garden & 360° Cave Virtual Sanctuary",
        stepCount: 0,
        terrainType: "Paved garden promenade under shaded tamarind trees",
        restroomAccess: "ASI Badami Plaza Accessible Toilet",
        transitNote: "Drop-off at Badami Cave ticket counter cloakroom",
        highlight: "Relax in the cool garden while enjoying the 360° spoken audio walkthrough of the 10-foot Trivikrama and Mangalesha inscription.",
      },
    ],
    virtualTourRecommended: true,
    precedentCitation: "Modeled after the ASI Ajanta & Ellora barrier-free precedent, providing battery-operated shuttle transit and digital cave kiosks for non-climbers.",
  },
  {
    id: "senior",
    title: "Senior Citizens & Gentle Pacing",
    kannadaTitle: "ಹಿರಿಯ ನಾಗರಿಕರು ಮತ್ತು ಸುಲಭ ನಡಿಗೆ ಹಾದಿ",
    badge: "Shallow Steps & Shaded Benches",
    targetAudience: "Seniors with arthritis, mild respiratory conditions, or travelers preferring unhurried walking.",
    stepCountConstraint: "Maximum 40 gentle steps with handrails. Shaded benches every 75 meters.",
    recommendedMonuments: [
      "Badami Cave 1 (Only 38 wide, low-rise steps with sturdy double-pipe handrails from plaza)",
      "Bhutanatha Temple (Flat shaded 350m lakeside approach on North Agastya embankment)",
      "Mahakuta Temple Grove (Plentiful natural tree canopy, level stone flagging, natural cool springs)"
    ],
    inaccessibleMonuments: [
      "Badami Cave 4 Jain Sanctuary (160+ steep rock steps exposed to blistering afternoon sun)"
    ],
    adaptations: [
      "Morning window scheduling (07:00 AM – 10:00 AM) before sandstone surfaces absorb radiant heat",
      "Frequent 10-minute rest intervals scheduled at shaded pushkarini pavilions",
      "Door-to-door auto and shared tempo drop-offs eliminating long highway parking walks"
    ],
    detailedItinerary: [
      {
        time: "07:30 AM – 09:30 AM",
        stopName: "Badami Cave 1 & Lower Plaza",
        stepCount: 38,
        terrainType: "Wide, low-rise steps with sturdy steel handrails",
        restroomAccess: "ASI Lower Plaza clean western toilets",
        transitNote: "Auto drops passengers within 20 meters of bottom step",
        highlight: "Witness the 18-armed dancing Nataraja carving in gentle morning light with zero crowd pressure.",
      },
      {
        time: "10:15 AM – 12:00 PM",
        stopName: "Mahakuta Sacred Temple Grove",
        stepCount: 0,
        terrainType: "Flat, shaded flagstone courtyard beneath century-old trees",
        restroomAccess: "Restrooms at grove entrance",
        transitNote: "Direct parking in front of Mahakuteshwara outer archway",
        highlight: "Soothing natural spring water, cool microclimate (24°C vs 36°C in town), and Satvik home dining.",
      },
      {
        time: "04:30 PM – 06:15 PM",
        stopName: "Bhutanatha Temple Lakeside Promenade",
        stepCount: 12,
        terrainType: "Flat paved promenade along water's edge",
        restroomAccess: "North bank public facility",
        transitNote: "Gentle 5-minute walk from north fort auto stand",
        highlight: "Spectacular golden hour reflection across Agastya Lake with abundant seating on flat sandstone boulders.",
      },
    ],
    virtualTourRecommended: false,
    precedentCitation: "Incorporates Ministry of Tourism 'Senior Friendly Heritage' guidelines with mandatory hydration breaks and low-gradient handrails.",
  },
  {
    id: "low_vision",
    title: "Low Vision & Spatial Audio Guidance",
    kannadaTitle: "ದೃಷ್ಟಿ ದೋಷವುಳ್ಳವರು ಮತ್ತು ಧ್ವನಿ ವಿವರಣೆ",
    badge: "High-Contrast & Audio Guided",
    targetAudience: "Visually impaired, low-vision, or legally blind visitors relying on descriptive audio and tactile exploration.",
    stepCountConstraint: "All paths equipped with tactile paving or guide accompaniment recommendations.",
    recommendedMonuments: [
      "Badami Cave 3 (Acoustic spatial resonance and detailed tactile reproduction casts at museum)",
      "Pattadakal Virupaksha (Echoing stone hypostyle mandapa with distinct auditory spatial markers)",
      "Banashankari Temple (Rich multi-sensory landscape of bronze temple bells, camphor, and chanting)"
    ],
    inaccessibleMonuments: [
      "Unfenced cliff ledges behind Cave 4 and Northern Fort precipices"
    ],
    adaptations: [
      "Rich spatial audio narration: 'At your 10 o'clock position, 2 meters forward, stands the 10-foot Trivikrama...'",
      "High-contrast UI theme with bold amber-on-black text and tactile screen-reader labeling",
      "Permission to touch designated non-perishable tactile replica friezes at Badami Archaeological Museum"
    ],
    detailedItinerary: [
      {
        time: "09:00 AM – 11:00 AM",
        stopName: "Pattadakal Virupaksha Hypostyle Mandapa",
        stepCount: 15,
        terrainType: "Acoustic stone hall with clear auditory reverberation",
        restroomAccess: "KSTDC plaza accessible facility",
        transitNote: "Guide accompaniment from parking counter",
        highlight: "Listen to the resonating stone pillars of Virupaksha Temple, each producing distinct harmonic overtones.",
      },
      {
        time: "11:45 AM – 01:30 PM",
        stopName: "Badami Archaeological Museum Tactile Gallery",
        stepCount: 4,
        terrainType: "Level indoor tiled surface with braille and audio labels",
        restroomAccess: "Museum clean western toilet",
        transitNote: "Direct parking in front of museum porch",
        highlight: "Touch authentic cast reproductions of Chalukyan sculptures and explore the Makuta crown textures.",
      },
    ],
    virtualTourRecommended: true,
    precedentCitation: "Conforms to National Centre for Promotion of Employment for Disabled People (NCPEDP) tactile heritage standards.",
  },
  {
    id: "pram",
    title: "Families with Strollers / Prams",
    kannadaTitle: "ಪುಟ್ಟ ಮಕ್ಕಳ ಕುಟುಂಬಗಳು ಮತ್ತು ಸ್ಟ್ರೋಲರ್ ಹಾದಿ",
    badge: "Wide Lawns & Pram Bays",
    targetAudience: "Families traveling with infants, toddlers in strollers, and young children.",
    stepCountConstraint: "Wide stroller-friendly pathways with minimal steps and safe fenced enclosures.",
    recommendedMonuments: [
      "Pattadakal World Heritage Complex (Expansive manicured green lawns along Malaprabha river)",
      "Aihole Archaeological Enclosure (Safe, enclosed grassy compound with toddler-safe perimeters)"
    ],
    inaccessibleMonuments: [
      "Badami Caves 2 to 4 (Stroller parking available at Cave 1 base only; no prams allowed on cliff stairs)"
    ],
    adaptations: [
      "Monitored pram parking bays at Badami Cave 1 entrance with ASI baggage token",
      "Directory of family-friendly Khanavalis with child-safe mild meals (steamed rice, fresh cow milk, ghee)",
      "Clean diaper-changing facilities and shaded nursing benches identified"
    ],
    detailedItinerary: [
      {
        time: "08:30 AM – 11:00 AM",
        stopName: "Pattadakal World Heritage Gardens",
        stepCount: 0,
        terrainType: "Smooth paved paths and wide grassy expanses",
        restroomAccess: "Baby-changing counter at main KSTDC building",
        transitNote: "Direct parking with stroller roll-off",
        highlight: "Spacious green lawns where children can safely walk while parents appreciate UNESCO World Heritage architecture.",
      },
      {
        time: "12:00 PM – 02:00 PM",
        stopName: "Aihole Village Enclosure & Ooru Oota Kitchen",
        stepCount: 2,
        terrainType: "Flat archaeological compound",
        restroomAccess: "Restrooms at village entrance",
        transitNote: "Direct car parking at entrance",
        highlight: "Safe enclosed grounds followed by mild, fresh village lunch with unspiced curd and soft flatbreads.",
      },
    ],
    virtualTourRecommended: false,
    precedentCitation: "Incorporates Family-First Tourism protocols with designated stroller bays and monitored child-safety barriers.",
  }
];

export interface CivicExecutiveMetrics {
  totalIssuesTracked: number;
  resolvedWithPhotoProofPct: number;
  totalResolvedCount: number;
  activeOpenCount: number;
  averageSlaCountdownDays: number;
  laneDistribution: {
    governmentFixCount: number;
    governmentFixPct: number;
    communityCsrCount: number;
    communityCsrPct: number;
    investorPppCount: number;
    investorPppPct: number;
  };
  talukScorecard: {
    taluk: "Badami Taluk" | "Hungund Taluk" | "Guledgudda Taluk";
    mlaName: string;
    partyAffiliation: string;
    totalIssues: number;
    resolvedCount: number;
    resolutionRatePct: number;
    topUnmetDemand: string;
  }[];
  parliamentaryOverview: {
    mpName: string;
    constituency: string;
    centralAsiVacanciesReported: string;
    unionRailwayRequisitions: string;
  };
}

export const CIVIC_EXECUTIVE_METRICS: CivicExecutiveMetrics = {
  totalIssuesTracked: 148,
  resolvedWithPhotoProofPct: 68,
  totalResolvedCount: 101,
  activeOpenCount: 47,
  averageSlaCountdownDays: 9.4,
  laneDistribution: {
    governmentFixCount: 74,
    governmentFixPct: 50,
    communityCsrCount: 48,
    communityCsrPct: 32,
    investorPppCount: 26,
    investorPppPct: 18,
  },
  talukScorecard: [
    {
      taluk: "Badami Taluk",
      mlaName: "B. B. Chimmanakatti",
      partyAffiliation: "INC (Badami Legislative Assembly)",
      totalIssues: 86,
      resolvedCount: 61,
      resolutionRatePct: 71,
      topUnmetDemand: "Agastya lake detergent washing deck & Cave 1 wheelchair parking ramp",
    },
    {
      taluk: "Hungund Taluk",
      mlaName: "Vijayanand Kashappanavar",
      partyAffiliation: "INC (Hungund Legislative Assembly)",
      totalIssues: 44,
      resolvedCount: 28,
      resolutionRatePct: 64,
      topUnmetDemand: "NWKRTC morning Pattadakal-Aihole transit shuttle & Konti Gudi drainage",
    },
    {
      taluk: "Guledgudda Taluk",
      mlaName: "District Administration Co-Desk",
      partyAffiliation: "Administrative Oversight",
      totalIssues: 18,
      resolvedCount: 12,
      resolutionRatePct: 67,
      topUnmetDemand: "Weaver yarn debt relief & GI Tag authentication kiosk at Badami",
    }
  ],
  parliamentaryOverview: {
    mpName: "P. C. Gaddigoudar",
    constituency: "Bagalkote Lok Sabha Constituency (5th Term MP)",
    centralAsiVacanciesReported: "ASI Dharwad Circle operates at 45% staff vacancy; central requisition pending with Ministry of Culture.",
    unionRailwayRequisitions: "South Western Railway (SWR) petition for daily Hubballi-Badami-Varanasi express halt.",
  }
};
