import { GoogleGenAI } from "@google/genai";
import { TripPreferences } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_INSTRUCTION = `
You are 'Chelax AI', the elite travel concierge for Chelax Adventures. 
Your goal is to provide sophisticated, personalized travel advice and itineraries that look professional and structured.

**Itinerary Generation Rules:**
1. **Title**: Catchy and evocative name for the trip.
2. **Overview**: A brief paragraph setting the scene.
3. **Daily Breakdown**: Use bold "Day X: [Theme]" headings. For each day, provide 2-3 bullet points of specific, high-quality activities.
4. **Accommodation**: Suggest 2 premium options (one Boutique, one Luxury) with a one-sentence description of why they fit.
5. **Practical Tips**: Include a "Chelax Insider Tip" about local etiquette or a hidden gem.
6. **Formatting**: Use clean Markdown. Use bullet points for readability. Avoid long walls of text.

**Identity:**
- Expert, Warm, Professional.
- You represent Tampa's Best travel agency.
- Founder: Chelsea.
`;

const ITINERARY_PROMPT_TEMPLATE = (prefs: TripPreferences) => `
Generate a highly structured travel itinerary for:
- **Destination**: ${prefs.destination}
- **Dates**: ${prefs.startDate} to ${prefs.endDate}
- **Budget Level**: ${prefs.budget}
- **Vibe/Style**: ${prefs.travelStyle}
- **Specific Interests**: ${prefs.interests}

Include daily activities, specific hotel recommendations, and local insights.
`;

export const sendMessageToGemini = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  if (!ai) return "I'm currently offline. Please contact the agency directly.";

  try {
    const model = 'gemini-3-pro-preview';
    const chat = ai.chats.create({
      model: model,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I'm lost in thought. Could you repeat that?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my travel database.";
  }
};

export const generateItinerary = async (preferences: TripPreferences): Promise<string> => {
    if (!ai) return "I'm currently offline.";
    
    try {
        const model = 'gemini-3-pro-preview';
        const response = await ai.models.generateContent({
            model: model,
            contents: ITINERARY_PROMPT_TEMPLATE(preferences),
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            }
        });
        return response.text || "Could not generate itinerary.";
    } catch (error) {
        console.error("Gemini Error:", error);
        return "I encountered an error planning your trip. Please try again.";
    }
}