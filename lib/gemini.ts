import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client strictly on server side with User-Agent
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});
