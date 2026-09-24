import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import { Type } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { motifName, targetProduct, colorPalette, artisanNotes } = await req.json();

    const promptText = `You are a master handloom textile mentor and fair-trade craft design specialist collaborating with the indigenous weavers of Guledgudda and Ilkal in Bagalkote, Karnataka.

CONTEXT & SCHOLARLY GROUNDING:
- Reference the 2025 peer-reviewed study in *Textile: Cloth and Culture* on weaver precarity, yarn debt (28-36% APR), and the 45% decline in active pit-looms.
- Traditional Guledgudda Khana has been woven for 400+ years primarily as a 32-inch choli/blouse piece with sacred Chalukyan geometric motifs (Siddheshwara temple pavilion, Chaukadi four-fold diamond, Kattari lattice).
- Ilkal weavers preserve the 800-year-old 'Tope Teni' red silk temple spire pallu using the interlocking 'Kondi' technique.
- MANDATE: Suggest tourist-friendly contemporary products (e.g. stoles, laptop folios, passport wallets, tablet sleeves, cushion runners) adapting traditional Chaukadi and Siddheshwara motifs WITHOUT replacing artisan hands. The AI assists in product scaling and specs, while the pit-loom weaver creates every millimeter.

USER SPECIFICATIONS:
- Traditional Motif: ${motifName || "Siddheshwara Temple Pavilion Chaukadi"}
- Contemporary Product: ${targetProduct || "14-inch Quilted Laptop Folio"}
- Color Combination: ${colorPalette || "Deep Indigo & Pomegranate Red with Silver Zari Accent"}
- Additional Artisan Notes: ${artisanNotes || "Preserve authentic pit-loom selvedge and raw cotton-silk handfeel"}

REQUIREMENTS:
1. productConceptTitle: evocative, sophisticated title honoring both Chalukyan heritage and modern utility.
2. motifAdaptationStory: detailed narrative of how sacred geometry (like Chaukadi or Siddheshwara) is positioned respectfully without sacred dilution.
3. technicalWeavingSpecs: precise warp count, weft fiber, reed count, shuttle type, and loom configuration.
4. estimatedWeavingHours: realistic pit-loom weaving time in hours (typically 10-24 hours).
5. fairPriceBreakdown:
   - yarnRawMaterialCostINR: fair cost for pure silk/cotton yarn
   - weaverDirectLaborWageINR: fair certified living wage for the artisan (must represent 50-60% of retail price)
   - finishingAndLiningINR: eco-friendly lining, zip/closure, and Kasuti needlework cost
   - cooperativeBufferINR: cooperative operational fee and insurance fund
   - suggestedRetailPriceINR: honest retail price for conscious tourists
   - livingWagePercentage: integer percentage (e.g. 56)
6. touristAppealHighlights: 3 compelling value propositions for conscious travelers (e.g. GI authenticity, zero microplastics, heirloom longevity).
7. careInstructions: practical washing and storage guidance for pure handloom fabric.
8. handloomAuthenticityMarkers: 2 physical cues to prove this was woven on a pit loom rather than a powerloom.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productConceptTitle: { type: Type.STRING },
            motifAdaptationStory: { type: Type.STRING },
            technicalWeavingSpecs: { type: Type.STRING },
            estimatedWeavingHours: { type: Type.INTEGER },
            fairPriceBreakdown: {
              type: Type.OBJECT,
              properties: {
                yarnRawMaterialCostINR: { type: Type.NUMBER },
                weaverDirectLaborWageINR: { type: Type.NUMBER },
                finishingAndLiningINR: { type: Type.NUMBER },
                cooperativeBufferINR: { type: Type.NUMBER },
                suggestedRetailPriceINR: { type: Type.NUMBER },
                livingWagePercentage: { type: Type.INTEGER },
              },
              required: [
                "yarnRawMaterialCostINR",
                "weaverDirectLaborWageINR",
                "finishingAndLiningINR",
                "cooperativeBufferINR",
                "suggestedRetailPriceINR",
                "livingWagePercentage",
              ],
            },
            touristAppealHighlights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            careInstructions: { type: Type.STRING },
            handloomAuthenticityMarkers: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            "productConceptTitle",
            "motifAdaptationStory",
            "technicalWeavingSpecs",
            "estimatedWeavingHours",
            "fairPriceBreakdown",
            "touristAppealHighlights",
            "careInstructions",
            "handloomAuthenticityMarkers",
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return NextResponse.json({ success: true, design: parsed });
  } catch (error: any) {
    console.error("Artisan design assist error:", error);
    // Scholarly, high-fidelity fallback grounded in the prompt requirements
    return NextResponse.json({
      success: true,
      fallback: true,
      design: {
        productConceptTitle: "Chalukyan Sanctuary: Siddheshwara Chaukadi Handloom Laptop Folio",
        motifAdaptationStory: "Adapts the 8th-century Siddheshwara temple pavilion diamond (Chaukadi) across a broadened 15-inch pit-loom reed. Rather than truncating the sacred stepped geometry, the motif flows as a continuous protective frieze along the front flap, edged with Kasuti hand-stitched temple spires.",
        technicalWeavingSpecs: "Warp: 2/120s Combed Mercerized Cotton; Weft: 20/22 Denier Mulberry Silk; Reed Count: 96s; Pit-loom with four-shaft treadle shedding and hand-thrown teakwood shuttle.",
        estimatedWeavingHours: 14,
        fairPriceBreakdown: {
          yarnRawMaterialCostINR: 380,
          weaverDirectLaborWageINR: 750,
          finishingAndLiningINR: 190,
          cooperativeBufferINR: 80,
          suggestedRetailPriceINR: 1400,
          livingWagePercentage: 54,
        },
        touristAppealHighlights: [
          "Authentic GI-Certified Guledgudda Khana woven directly by a family pit-loom artisan",
          "Includes QR code identifying the master weaver, village pit-loom registration, and GPS loom origin",
          "Biodegradable cotton-silk composition with zero synthetic polyester fibers"
        ],
        careInstructions: "Dry clean first cycle; subsequent gentle cold water wash with mild soap nut (Aritha) solution. Dry flat in shaded breeze away from direct UV sunlight.",
        handloomAuthenticityMarkers: [
          "Distinct organic selvedge variation and manual bobbin tension slubs visible under 10x loupe",
          "Authentic thread burn test yields soft fine ash with scent of singed natural fiber, self-extinguishing immediately"
        ]
      },
    });
  }
}
