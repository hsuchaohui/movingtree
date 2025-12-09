import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateLuxuryGreeting = async (): Promise<string> => {
  if (!apiKey) {
    return "Wishing you a season of splendor and grace.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Write a very short (max 15 words), luxurious, and poetic Christmas greeting for a high-end jewelry brand client. No hashtags.",
      config: {
        temperature: 0.8,
        maxOutputTokens: 50,
      }
    });

    return response.text.trim().replace(/^"|"$/g, '');
  } catch (error) {
    console.error("Error generating greeting:", error);
    return "A season of timeless elegance awaits.";
  }
};