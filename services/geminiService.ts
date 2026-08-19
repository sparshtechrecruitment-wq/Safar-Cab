import { GoogleGenAI, Type } from "@google/genai";
import { AIJourneyInsight } from '../types';

const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || ''; 
// In a real app, ensure this is handled securely. 
// For this demo, we assume the environment variable is injected.

let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.error("Failed to initialize Gemini API:", e);
  }
}

export const getJourneyInsights = async (
  origin: string,
  destination: string,
  intent: string
): Promise<AIJourneyInsight | null> => {
  if (!ai || !apiKey) {
    console.warn("Gemini API Key missing. Returning mock data.");
    return {
      summary: `A beautiful journey from ${origin} to ${destination}.`,
      pitStops: [{ name: "Highway Treat", type: "Restaurant", reason: "Famous for chai and clean restrooms." }],
      culturalFact: "The region is known for its lush greenery during monsoons.",
      estimatedDuration: "3 hours 30 mins (Relaxed Pace)"
    };
  }

  try {
    const prompt = `
      I am planning a road trip from ${origin} to ${destination} with a focus on "${intent}".
      Please provide a brief travel plan in JSON format.
      Include:
      1. A short, evocative summary of the route atmosphere (max 2 sentences).
      2. Two recommended pit stops (name, type, reason).
      3. One interesting cultural or geographical fact about the route.
      4. Estimated driving duration at a safe, relaxed speed.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            pitStops: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  type: { type: Type.STRING },
                  reason: { type: Type.STRING },
                }
              }
            },
            culturalFact: { type: Type.STRING },
            estimatedDuration: { type: Type.STRING },
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AIJourneyInsight;
    }
    return null;

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback mock
    return {
      summary: `A relaxing drive from ${origin} to ${destination} curated for ${intent}.`,
      pitStops: [
        { name: "Scenic Point", type: "Viewpoint", reason: "Great for photos." },
        { name: "Family Garden", type: "Rest Stop", reason: "Clean amenities." }
      ],
      culturalFact: "This route crosses historical trade paths.",
      estimatedDuration: "Unknown"
    };
  }
};
