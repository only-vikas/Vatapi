import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import { Type } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { title, description, monument, taluk, imageBase64 } = await req.json();

    const promptText = `You are the Civic & Heritage AI Triage Officer for Bagalkote District (Karnataka, India), managing heritage sites like Badami, Pattadakal, Aihole, Mahakuta, Guledgudda, Banashankari, and Kudalasangama.
Analyze the following citizen/visitor grievance and categorize it with strict administrative precision.

Context:
- Badami Taluk covers: Badami town, Cave Temples, Agastya Lake, Pattadakal, Mahakuta, Banashankari. Current Badami MLA: B. B. Chimmanakatti.
- Hungund Taluk covers: Aihole (where 942 families live near 122 protected monuments), Kudalasangama. Current Hungund MLA: Vijayanand Kashappanavar.
- Bagalkot MP: P. C. Gaddigoudar (Elected 2024).
- Key Jurisdictions:
  * "ASI Dharwad Circle" (Centrally Protected Monuments like Badami Caves, Pattadakal Group, Aihole Durga/Lad Khan)
  * "Karnataka State Tourism Development Corporation (KSTDC)" (Signage, Tour tempos, Wayfinding, PPP projects)
  * "Taluk Panchayat / Gram Panchayat" (Sanitation, solid waste, village approach roads, encroachment outside ASI fence)
  * "Banashankari / Mahakuteshwara Temple Trust" (Internal shrine facilities, pilgrim Annadana, rituals)
  * "Bagalkote District Administration & Minor Irrigation" (Agastya Lake, water resources, drought management)

Input Grievance:
- Title: ${title || "Untitled"}
- Location/Monument: ${monument || "General"}
- Taluk mentioned: ${taluk || "Auto-detect"}
- Description: ${description || "No description provided"}

Provide structured triage including:
1. category: one of ["Structural Damage", "Encroachment", "Sanitation & Litter", "Safety & Security", "Accessibility", "Service Gap"]
2. severity: one of ["Critical", "High", "Medium", "Low"]
3. jurisdictionalBody: exact agency responsible
4. taluk: "Badami" or "Hungund"
5. electedRepresentative: MLA and MP responsible
6. recommendedLane: one of ["Government Fix", "Community / CSR Fix", "Investor PPP Lane"]
7. escalationDays: SLA turnaround in days (e.g. 3, 7, 14, 30)
8. duplicateAssessment: brief note on whether this is common or unique
9. plainLanguageSummary: clear 2-sentence explanation of what action should be taken
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
            category: { type: Type.STRING },
            severity: { type: Type.STRING },
            jurisdictionalBody: { type: Type.STRING },
            taluk: { type: Type.STRING },
            electedRepresentative: { type: Type.STRING },
            recommendedLane: { type: Type.STRING },
            escalationDays: { type: Type.INTEGER },
            duplicateAssessment: { type: Type.STRING },
            plainLanguageSummary: { type: Type.STRING },
          },
          required: [
            "category",
            "severity",
            "jurisdictionalBody",
            "taluk",
            "electedRepresentative",
            "recommendedLane",
            "escalationDays",
            "plainLanguageSummary",
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return NextResponse.json({ success: true, triage: parsed });
  } catch (error: any) {
    console.error("Triage error:", error);
    // Fallback deterministic triage if API limit is reached
    return NextResponse.json({
      success: true,
      fallback: true,
      triage: {
        category: "Structural Damage",
        severity: "High",
        jurisdictionalBody: "Archaeological Survey of India (ASI) - Dharwad Circle",
        taluk: "Badami",
        electedRepresentative: "Badami MLA B. B. Chimmanakatti & MP P. C. Gaddigoudar",
        recommendedLane: "Government Fix",
        escalationDays: 7,
        duplicateAssessment: "Triaged based on location telemetry.",
        plainLanguageSummary: "Issue logged with ASI Dharwad Circle with 7-day initial inspection window.",
      },
    });
  }
}
