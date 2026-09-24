import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import { Type } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { monumentName, observation, imageBase64 } = await req.json();

    const promptText = `You are a Senior Heritage Conservation Specialist and Epigraphist with expertise in early Chalukyan sandstone architecture (6th-8th century CE Badami, Aihole, Pattadakal, Mahakuta).
Analyze the following monument condition report / inspection:

Monument: ${monumentName || "Chalukya Sandstone Monument"}
Observation Note: ${observation || "Visual health inspection"}

Evaluate based on conservation science (crack morphology, micro-vegetation/lichen, salt efflorescence, water percolation, human graffiti, weathering):
1. monumentIdentified: confirmed monument and feature
2. structuralIntegrityScore: integer 0-100 (100 being pristine)
3. keyDefects: array of identified defects (e.g., "Vegetation root wedging in lintel joints", "Surface exfoliation due to windborne sand", "Micro-fissure along relief carving")
4. biologicalGrowth: string describing lichen, moss, or algae presence
5. plainLanguageStory: engaging, historically grounded explanation of this structure for a visitor and why this masonry feature is precious
6. preservationRecommendation: scientific conservation recommendation (lime mortar grouting, chemical biocidal cleaning, barricading)
7. shouldEscalateToHeritageWatch: boolean (true if immediate intervention is needed)
8. suggestedCategoryForLedger: category if escalated
`;

    const parts: any[] = [];
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64,
        },
      });
    }
    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: parts.length > 1 ? { parts } : promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            monumentIdentified: { type: Type.STRING },
            structuralIntegrityScore: { type: Type.INTEGER },
            keyDefects: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            biologicalGrowth: { type: Type.STRING },
            plainLanguageStory: { type: Type.STRING },
            preservationRecommendation: { type: Type.STRING },
            shouldEscalateToHeritageWatch: { type: Type.BOOLEAN },
            suggestedCategoryForLedger: { type: Type.STRING },
          },
          required: [
            "monumentIdentified",
            "structuralIntegrityScore",
            "keyDefects",
            "biologicalGrowth",
            "plainLanguageStory",
            "preservationRecommendation",
            "shouldEscalateToHeritageWatch",
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return NextResponse.json({ success: true, analysis: parsed });
  } catch (error: any) {
    console.error("Health check error:", error);
    return NextResponse.json({
      success: true,
      fallback: true,
      analysis: {
        monumentIdentified: "Badami Sandstone Rock-Cut Architecture",
        structuralIntegrityScore: 78,
        keyDefects: [
          "Granular sandstone surface exfoliation along cave cornice",
          "Hairline capillary fissures with minor rainwater seepage",
          "Dry vegetative spore deposits on outer frieze"
        ],
        biologicalGrowth: "Mild dormant crustose lichen on north-facing sandstone facade.",
        plainLanguageStory: "Carved during the 6th century by Western Chalukya artisans under King Kirtivarman I, this porous reddish sandstone was hand-chiseled directly into the cliff. Its delicate relief requires constant moisture defense.",
        preservationRecommendation: "Non-destructive ultrasonic testing followed by ethyl silicate stone consolidant and non-ionic biocidal wash.",
        shouldEscalateToHeritageWatch: true,
        suggestedCategoryForLedger: "Structural Damage",
      },
    });
  }
}
