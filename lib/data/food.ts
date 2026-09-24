export interface VerifiedEatery {
  id: string;
  name: string;
  kannadaName: string;
  type: "Self-Help Group (SHG) Kitchen" | "Traditional Khanavali (Mess)" | "Heritage Home Kitchen";
  location: string;
  taluk: "Badami" | "Hungund";
  distanceFromNearestMonument: string;
  nearestMonumentId: string;
  ownerContact: string;
  shgRegistrationNumber?: string;
  verifiedStatus: "Physically Verified (GPS + Owner Interview)" | "Under Seasonal Audit";
  lastAuditDate: string;
  mealTimings: string;
  operatingDays: string;
  firewoodCooked: boolean;
  signatureDishes: {
    dishName: string;
    kannadaName: string;
    description: string;
    isGlutenFree: boolean;
    isVegan: boolean;
  }[];
  priceRangePerThaliINR: string;
  averageMealCostINR: number;
  dietarySuitability: string;
  storyAndTrustFactor: string;
  whyThisSolvesTouristGap: string;
}

export interface DishCultureDetail {
  id: string;
  name: string;
  kannadaName: string;
  culinaryHeritage: string;
  ingredients: string[];
  whyIconic: string;
  nutritionalBenefits: string;
}

export const DISH_HERITAGE_GUIDE: DishCultureDetail[] = [
  {
    id: "dish-jolada-rotti",
    name: "Jolada Rotti (Sorghum Unleavened Flatbread)",
    kannadaName: "ಜೋಳದ ರೊಟ್ಟಿ",
    culinaryHeritage: "The undisputed staple of Northern Karnataka dryland agrarian culture. Made from rain-fed white jowar (sorghum) flour mixed with boiling water and vigorously kneaded by hand.",
    ingredients: ["100% Sorghum / Jowar Flour", "Boiling Water", "Pinch of Salt (optional)"],
    whyIconic: "Contains zero gluten; it cannot be rolled with a pin and must be rhythmically beaten by hand on a circular stone slab with a dusting of dry flour before cooking on an iron or earthen tava.",
    nutritionalBenefits: "Low glycemic index, rich in complex carbohydrates, dietary fiber, iron, and magnesium, perfectly suited for enduring arid Deccan heat.",
  },
  {
    id: "dish-badanekayi-ennegai",
    name: "Badanekayi Ennegai (Stuffed Country Eggplant Curry)",
    kannadaName: "ಬದನೆಕಾಯಿ ಎಣ್ಣೆಗಾಯಿ",
    culinaryHeritage: "Small, tender purple-striped country brinjals quartered at the base and stuffed with a fragrant dry masala paste before slow-simmering in cold-pressed groundnut oil.",
    ingredients: ["Local Round Brinjals", "Roasted Peanuts", "White Sesame Seeds", "Dry Coconut", "Byadgi Red Chilies", "Tamarind", "Jaggery", "Coriander Seeds"],
    whyIconic: "The nutty, roasted aroma of peanuts and sesame cuts through the mild bitterness of the brinjal, creating a velvety gravy that soaks deeply into crisp pieces of Jolada Rotti.",
    nutritionalBenefits: "High in healthy monounsaturated fats from roasted peanuts, calcium from sesame, and antioxidants from purple anthocyanins.",
  },
  {
    id: "dish-shenga-chutney",
    name: "Shenga Chutney Pudi (Dry Peanut Chutney Powder)",
    kannadaName: "ಶೇಂಗಾ ಚಟ್ನಿ ಪುಡಿ",
    culinaryHeritage: "The essential dry condiment present in every North Karnataka household, served on the corner of the banana leaf or steel thali with cold fresh curd (Mosaru).",
    ingredients: ["Dry Roasted Peanuts (Shenga)", "Byadgi Dried Red Chili", "Pounded Garlic", "Cumin Seeds", "Rock Salt"],
    whyIconic: "Coarsely ground to retain crunch. Visitors mix it directly with a spoonful of cold homemade curd or raw peanut oil to dip their rotti.",
    nutritionalBenefits: "Dense plant-based protein source with zinc and niacin that kept Chalukyan stone carvers fueled through long shifts.",
  },
  {
    id: "dish-pundi-palya",
    name: "Pundi Palya (Sorrel Greens Tangy Mash)",
    kannadaName: "ಪುಂಡಿ ಪಲ್ಯ",
    culinaryHeritage: "Prepared from Gongura / Roselle sorrel leaves, boiled tender with split yellow lentils, cumin, and tempered with green chilies.",
    ingredients: ["Fresh Sorrel Leaves (Pundi Soppu)", "Toor Dal or Chana Dal", "Green Chilies", "Mustard Seeds", "Curry Leaves"],
    whyIconic: "Delivers an invigorating sour-tangy explosion that cleanses the palate after rich peanut gravies.",
    nutritionalBenefits: "Powerhouse of Vitamin C, folic acid, and bioavailable iron, native to the black cotton soil of the Malaprabha basin.",
  },
  {
    id: "dish-belada-panaka",
    name: "Belada Hannina Panaka (Wood-Apple Cooling Nectar)",
    kannadaName: "ಬೇಲದ ಹಣ್ಣಿನ ಪಾನಕ",
    culinaryHeritage: "Traditional forest nectar scooped from wild wood-apples harvested from dry scrub forests around the Badami sandstone gorges.",
    ingredients: ["Wild Wood-Apple Pulp", "Organic Jaggery", "Pounded Cardamom", "Dry Ginger (Shunti)", "Black Pepper"],
    whyIconic: "Natural digestive and electrolyte drink offered to weary pilgrims arriving at temple steps under the intense 38°C midday sun.",
    nutritionalBenefits: "Restores gut flora, prevents heat exhaustion, and cools the core body temperature naturally without artificial sugar.",
  },
  {
    id: "dish-belle-holige",
    name: "Belle Holige / Obbattu (Sweet Chana Dal Flatbread)",
    kannadaName: "ಬೇಳೆ ಹೋಳಿಗೆ / ಒಬ್ಬಟ್ಟು",
    culinaryHeritage: "Festive delicacy served on holy days and wedding feasts, made by enveloping a cardamom-infused cooked jaggery-dal filling (Hoornam) inside soft dough.",
    ingredients: ["Bengal Gram Dal", "Dark Sugarcane Jaggery", "Green Cardamom", "Nutmeg", "Pure Desi Ghee", "Wheat/Maida Flour"],
    whyIconic: "Served hot with a ladle of molten desi cow ghee or chilled spiced milk, melting instantaneously on the tongue.",
    nutritionalBenefits: "Wholesome natural sweetener with iron from unprocessed jaggery and sustained protein from boiled chana dal.",
  },
];

export const VERIFIED_EATERIES: VerifiedEatery[] = [
  {
    id: "oo-aihole-01",
    name: "Shri Banashankari Mahila SHG Khanavali",
    kannadaName: "ಶ್ರೀ ಬನಶಂಕರಿ ಮಹಿಳಾ ಸಂಘ ಖಾನಾವಳಿ",
    type: "Self-Help Group (SHG) Kitchen",
    location: "Aihole Village Center, Near Konti Gudi complex (Hungund Taluk)",
    taluk: "Hungund",
    distanceFromNearestMonument: "250 meters from Aihole Durga Temple Main Gate (3 min walk)",
    nearestMonumentId: "aihole-dur",
    ownerContact: "+91 94812 XXXXX (Smt. Gangamma Hubballi)",
    shgRegistrationNumber: "KSRLPS-HNG-SHG-2018-094",
    verifiedStatus: "Physically Verified (GPS + Owner Interview)",
    lastAuditDate: "September 14, 2026",
    mealTimings: "12:00 PM – 3:30 PM & 7:30 PM – 9:30 PM",
    operatingDays: "All 7 Days (Fresh woodfire batch prepared at 11:45 AM)",
    firewoodCooked: true,
    signatureDishes: [
      {
        dishName: "Piping Hot Jolada Rotti",
        kannadaName: "ಬಿಸಿ ಜೋಳದ ರೊಟ್ಟಿ",
        description: "Freshly beaten and puffed on woodfire cast iron tava; crisp and paper thin.",
        isGlutenFree: true,
        isVegan: true,
      },
      {
        dishName: "Badanekayi Ennegai",
        kannadaName: "ಬದನೆಕಾಯಿ ಎಣ್ಣೆಗಾಯಿ",
        description: "Baby eggplants slow-simmered in roasted groundnut and sesame gravy.",
        isGlutenFree: true,
        isVegan: true,
      },
      {
        dishName: "Shenga Chutney Pudi & Mosaru",
        kannadaName: "ಶೇಂಗಾ ಚಟ್ನಿ ಪುಡಿ & ಮೊಸರು",
        description: "Dry roasted peanut powder with dollop of creamy earthen pot buffalo curd.",
        isGlutenFree: true,
        isVegan: false,
      },
      {
        dishName: "Madike Kaalu Palya",
        kannadaName: "ಮಡಿಕೆ ಕಾಳು ಪಲ್ಯ",
        description: "Sprouted moth bean dry curry with mustard seeds and fresh grated coconut.",
        isGlutenFree: true,
        isVegan: true,
      },
      {
        dishName: "Belada Hannina Panaka",
        kannadaName: "ಬೇಲದ ಹಣ್ಣಿನ ಪಾನಕ",
        description: "Chilled wood-apple nectar sweetened with organic jaggery.",
        isGlutenFree: true,
        isVegan: true,
      }
    ],
    priceRangePerThaliINR: "₹100 – ₹130 (Unlimited traditional thali)",
    averageMealCostINR: 110,
    dietarySuitability: "100% Pure Vegetarian, Gluten-Free options (Jowar), Jain-friendly options on prior 30-min call",
    storyAndTrustFactor: "Travel guidebooks and internet forums for years claimed 'There is nowhere to eat in Aihole'. Smt. Gangamma and 7 village women banded together with their SHG to create an authentic open courtyard dining haven. Ingredients are sourced from organic rain-fed farms in Hungund.",
    whyThisSolvesTouristGap: "Aihole has no multi-cuisine commercial restaurants. Without this verified SHG kitchen, tourists either skip lunch or eat packaged processed junk food.",
  },
  {
    id: "oo-badami-01",
    name: "Basaveshwara Traditional Khanavali & Mess",
    kannadaName: "ಬಸವೇಶ್ವರ ಖಾನಾವಳಿ ಮತ್ತು ಭೋಜನಾಲಯ",
    type: "Traditional Khanavali (Mess)",
    location: "Badami Town, Near Bus Stand Cross Road (Opp. Post Office)",
    taluk: "Badami",
    distanceFromNearestMonument: "1.2 km from Badami Cave 1 (4 min auto ride or 12 min walk)",
    nearestMonumentId: "badami-cave-1",
    ownerContact: "+91 98450 XXXXX (Shri Sharanappa)",
    verifiedStatus: "Physically Verified (GPS + Owner Interview)",
    lastAuditDate: "September 18, 2026",
    mealTimings: "11:30 AM – 4:00 PM & 7:00 PM – 10:00 PM",
    operatingDays: "All 7 Days",
    firewoodCooked: false,
    signatureDishes: [
      {
        dishName: "Kadak Jolada Rotti & Soft Sajje Rotti",
        kannadaName: "ಖಡಕ್ ರೊಟ್ಟಿ & ಸಜ್ಜೆ ರೊಟ್ಟಿ",
        description: "Choice of sun-dried crisp sorghum rotti or soft pearl millet winter rotti.",
        isGlutenFree: true,
        isVegan: true,
      },
      {
        dishName: "Hesaru Kaalu Usli & Bele Saaru",
        kannadaName: "ಹೆಸರು ಕಾಳು ಉಸಳಿ ಮತ್ತು ಬೇಳೆ ಸಾರು",
        description: "Tempered whole green gram with aromatic lentil rasam over hot steamed rice.",
        isGlutenFree: true,
        isVegan: true,
      },
      {
        dishName: "Pure Cow Ghee Belle Holige",
        kannadaName: "ತುಪ್ಪದ ಬೇಳೆ ಹೋಳಿಗೆ",
        description: "Freshly made jaggery-chana dal sweet bread served with molten ghee.",
        isGlutenFree: false,
        isVegan: false,
      }
    ],
    priceRangePerThaliINR: "₹90 – ₹140 per thali",
    averageMealCostINR: 100,
    dietarySuitability: "Pure Vegetarian, Authentic Lingayat culinary discipline (No onion/garlic options prepared daily)",
    storyAndTrustFactor: "Founded in 1984, this modest Khanavali has served three generations of scholars, epigraphists, pilgrims, and road travelers. High turnover guarantees that the lentils, rottis, and curds are replenished every 45 minutes.",
    whyThisSolvesTouristGap: "Protects visitors from exorbitant resort dining while offering authentic digestive-friendly local grain nutrition.",
  },
  {
    id: "oo-pattadakal-01",
    name: "Malaprabha Riverbank Annapurna SHG",
    kannadaName: "ಮಲಪ್ರಭಾ ಅನ್ನಪೂರ್ಣ ಮಹಿಳಾ ಮಂಡಳಿ",
    type: "Heritage Home Kitchen",
    location: "Pattadakal Village (Old Post Office Lane, 200m from Malaprabha River)",
    taluk: "Badami",
    distanceFromNearestMonument: "400 meters from Virupaksha Temple East Gateway (5 min walk)",
    nearestMonumentId: "pattadakal-complex",
    ownerContact: "+91 97419 XXXXX (Smt. Kasturi Pattar)",
    shgRegistrationNumber: "KSRLPS-BDM-SHG-2020-112",
    verifiedStatus: "Physically Verified (GPS + Owner Interview)",
    lastAuditDate: "September 16, 2026",
    mealTimings: "12:30 PM – 3:30 PM & 7:00 PM – 9:00 PM (Prior notification recommended for groups >4)",
    operatingDays: "Tuesday through Sunday",
    firewoodCooked: true,
    signatureDishes: [
      {
        dishName: "Firewood Tava Jolada Rotti",
        kannadaName: "ಒಲೆಯ ಮೇಲಿನ ಜೋಳದ ರೊಟ್ಟಿ",
        description: "Puffed over neem-wood embers, imparts a distinct rustic smoke note.",
        isGlutenFree: true,
        isVegan: true,
      },
      {
        dishName: "Pundi Palya with Green Chili Tempering",
        kannadaName: "ಪುಂಡಿ ಪಲ್ಯ",
        description: "Tangy wild sorrel leaves simmered with yellow lentils and mustard.",
        isGlutenFree: true,
        isVegan: true,
      },
      {
        dishName: "Ranjanaka Fiery Chili Pickle",
        kannadaName: "ರಂಜಣಕ ಕೆಂಪು ಮೆಣಸಿನಕಾಯಿ ಉಪ್ಪಿನಕಾಯಿ",
        description: "Pounded ripe red chilies with fenugreek and cumin; sharp and appetizing.",
        isGlutenFree: true,
        isVegan: true,
      },
      {
        dishName: "Crisp Mirchi Bajji with Mandakki",
        kannadaName: "ಮಿರ್ಚಿ ಬಜ್ಜಿ ಮತ್ತು ಮಂಡಕ್ಕಿ",
        description: "Evening snack of chickpea-battered banana chilies with spiced puffed rice.",
        isGlutenFree: true,
        isVegan: true,
      }
    ],
    priceRangePerThaliINR: "₹110 – ₹150 per meal",
    averageMealCostINR: 120,
    dietarySuitability: "Traditional Village Vegetarian",
    storyAndTrustFactor: "Operated in the breezy shaded courtyard of a heritage stone house under a 100-year-old tamarind tree. Water is filtered through triple-earthen pots. Unconsumed organic scraps are composted for village livestock.",
    whyThisSolvesTouristGap: "Most bus tours rush through Pattadakal without spending lunch money in the village. This kitchen directly funnels tourism revenue to 6 artisan and farming families in Pattadakal.",
  },
  {
    id: "oo-mahakuta-01",
    name: "Pushkarini Teertha Satvik Bhojana",
    kannadaName: "ಪುಷ್ಕರಿಣಿ ತೀರ್ಥ ಸಾತ್ವಿಕ ಭೋಜನಾಲಯ",
    type: "Heritage Home Kitchen",
    location: "Mahakuta Temple Grove, Adjacent to Brahma-Vishnu-Maheshwara Springs",
    taluk: "Badami",
    distanceFromNearestMonument: "60 meters from Mahakuteshwara Temple tank (1 min walk)",
    nearestMonumentId: "mahakuta-grove",
    ownerContact: "+91 96118 XXXXX (Smt. Neelamma Pujar)",
    verifiedStatus: "Physically Verified (GPS + Owner Interview)",
    lastAuditDate: "September 12, 2026",
    mealTimings: "11:30 AM – 3:00 PM (Daily)",
    operatingDays: "All 7 Days",
    firewoodCooked: true,
    signatureDishes: [
      {
        dishName: "Satvik Jowar Rotti (Zero Onion/Garlic)",
        kannadaName: "ಸಾತ್ವಿಕ ರೊಟ್ಟಿ",
        description: "Specially prepared for temple pilgrims following strict ancient Agamic dietary vows.",
        isGlutenFree: true,
        isVegan: true,
      },
      {
        dishName: "Hesaru Kaalu Usli with Fresh Coconut",
        kannadaName: "ತೆಂಗಿನಕಾಯಿ ಹೆಸರುಕಾಳು ಉಸಳಿ",
        description: "Sprouted green moong cooked with cumin, curry leaves, and grated kernel.",
        isGlutenFree: true,
        isVegan: true,
      },
      {
        dishName: "Curry Leaf Infused Majjige (Buttermilk)",
        kannadaName: "ಘಮಘಮಿಸುವ ಮಜ್ಜಿಗೆ",
        description: "Cooling churned buttermilk with crushed ginger and rock salt.",
        isGlutenFree: true,
        isVegan: false,
      }
    ],
    priceRangePerThaliINR: "₹80 – ₹110 per meal",
    averageMealCostINR: 90,
    dietarySuitability: "100% Satvik, Strict Jain friendly, No Onion/Garlic",
    storyAndTrustFactor: "Cooked fresh every morning using natural spring water from the sacred pushkarini stream. Smt. Neelamma’s family has tended the grove kitchen for 30 years.",
    whyThisSolvesTouristGap: "Mahakuta is a quiet pilgrimage forest stop with zero commercial food stalls. Visitors often leave prematurely due to hunger; this kitchen enables peaceful prolonged contemplation.",
  },
  {
    id: "oo-badami-02",
    name: "Sanman Heritage Agastya Khanavali",
    kannadaName: "ಸನ್ಮಾನ್ ಅಗಸ್ತ್ಯ ಖಾನಾವಳಿ",
    type: "Traditional Khanavali (Mess)",
    location: "Agastya Lake North Promenade, Near Bhutanatha Temple Footpath, Badami",
    taluk: "Badami",
    distanceFromNearestMonument: "350 meters from Bhutanatha Temple (4 min scenic walk)",
    nearestMonumentId: "bhutanatha-agastya",
    ownerContact: "+91 94498 XXXXX (Smt. Sunanda & Shri Basavaraj)",
    verifiedStatus: "Physically Verified (GPS + Owner Interview)",
    lastAuditDate: "September 15, 2026",
    mealTimings: "12:00 PM – 4:00 PM & 7:00 PM – 9:30 PM",
    operatingDays: "All 7 Days",
    firewoodCooked: false,
    signatureDishes: [
      {
        dishName: "Sajje Rotti & Hagalakayi Ennegai",
        kannadaName: "ಸಜ್ಜೆ ರೊಟ್ಟಿ ಮತ್ತು ಹಾಗಲಕಾಯಿ ಎಣ್ಣೆಗಾಯಿ",
        description: "Pearl millet flatbread with stuffed bittergourd curry sweetened with jaggery.",
        isGlutenFree: true,
        isVegan: true,
      },
      {
        dishName: "Shengada Holige with Warm Milk",
        kannadaName: "ಶೇಂಗಾ ಹೋಳಿಗೆ ಮತ್ತು ಬಿಸಿ ಹಾಲು",
        description: "Unique roasted peanut and jaggery filling stuffed inside paper-thin flatbread.",
        isGlutenFree: false,
        isVegan: false,
      },
      {
        dishName: "Fresh Earthen Pot Gatti Mosaru",
        kannadaName: "ಮಣ್ಣಿನ ಮಡಕೆ ಗಟ್ಟಿ ಮೊಸರು",
        description: "Dense, set curd churned from local grass-fed cow milk.",
        isGlutenFree: true,
        isVegan: false,
      }
    ],
    priceRangePerThaliINR: "₹100 – ₹140 per thali",
    averageMealCostINR: 115,
    dietarySuitability: "Pure Vegetarian, Diabetic-friendly millet choices",
    storyAndTrustFactor: "Situated on the peaceful north flank of Agastya lake away from vehicle dust. Renowned among landscape photographers waiting for the evening Bhutanatha golden hour.",
    whyThisSolvesTouristGap: "Provides hygienic, authentic refreshment right after completing the strenuous Cave 1–4 and lake perimeter hike.",
  }
];
