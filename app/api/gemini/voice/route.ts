import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import { Type } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { message, targetLanguage, mode, role } = await req.json();

    const isTwoWay = mode === "vendor_tourist";

    const promptText = isTwoWay
      ? `You are Vatapi Dual-Voice, a bridge translator between visitors and local Kannada-speaking auto drivers, weavers, and food vendors in Bagalkote/Badami.
The speaker (${role || "Tourist"}) says: "${message}".
Translate and adapt naturally so both parties understand clearly without cultural friction.
Provide:
1. translatedText: translation into ${targetLanguage || "Kannada"}
2. pronunciationGuide: phonetic romanized pronunciation for the speaker to read aloud
3. politeContextNote: cultural etiquette tip (e.g. fair bargaining, temple etiquette, dietary preferences)
4. suggestedReplies: 2-3 quick conversational responses for the other party
`
      : `You are Vatapi Voice, the multilingual heritage guide for Bagalkote (Badami, Pattadakal, Aihole, Banashankari).
Respond to the visitor question: "${message}"
Respond in the language: ${targetLanguage || "English"} (or Kannada/Marathi if requested).
Context:
- Badami caves timing: 9:00 AM - 5:30 PM (ASI ticket required)
- Cave 3 contains the historic 578 CE Old Kannada inscription of King Mangalesha.
- Banashankari temple is a major Shakta pilgrimage hub for Karnataka and Maharashtra.
- Guledgudda is famous for its 400-year-old Khana handloom weave.
Provide:
1. responseText: informative, culturally rich and helpful response
2. audioNarrationScript: conversational text ready to be read aloud
3. localTip: insider travel tip for this spot
4. relatedMonuments: array of 2 nearby monuments to visit next
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: isTwoWay
            ? {
                translatedText: { type: Type.STRING },
                pronunciationGuide: { type: Type.STRING },
                politeContextNote: { type: Type.STRING },
                suggestedReplies: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              }
            : {
                responseText: { type: Type.STRING },
                audioNarrationScript: { type: Type.STRING },
                localTip: { type: Type.STRING },
                relatedMonuments: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
          required: isTwoWay
            ? ["translatedText", "pronunciationGuide", "politeContextNote", "suggestedReplies"]
            : ["responseText", "audioNarrationScript", "localTip", "relatedMonuments"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return NextResponse.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error("Vatapi Voice error:", error);
    return NextResponse.json({
      success: true,
      fallback: true,
      result: {
        responseText:
          "Badami Cave 3 is the largest and most ornate of the rock-cut shrines, dedicated to Vishnu in 578 CE by Chalukya king Mangalesha. Notice the exquisite Anantasayana relief on the ceiling.",
        audioNarrationScript:
          "Welcome to Cave 3, the crown jewel of Badami. Here in 578 CE, King Mangalesha chiseled an inscription celebrating his brother Kirtivarman.",
        localTip: "Visit around 4:00 PM when the setting sun illuminates the red sandstone carvings directly.",
        relatedMonuments: ["Bhutanatha Temple at Agastya Lake", "Badami Northern Fort"],
        translatedText: "ಬಾದಾಮಿ ಗುಹೆಗಳಿಗೆ ಹೇಗೆ ಹೋಗಬೇಕು? (How to reach Badami caves?)",
        pronunciationGuide: "Baadaami guhegalige hege hogabeku?",
        politeContextNote: "Address auto drivers respectfully as 'Anna' (brother). Fair fare from railway station to town is ₹60-₹80.",
        suggestedReplies: ["ಹೌದು, ಬನ್ನಿ ಕುಳಿತುಕೊಳ್ಳಿ (Yes, please come and sit)", "ಮೀಟರ್ ಅಥವಾ ಫಿಕ್ಸ್‌ಡ್ ರೇಟ್ (Fixed rate ₹70)"],
      },
    });
  }
}
