import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function tutorPrompt(message: string) {
  const prompt = `
Você é uma tutora de idiomas chamada Lumi, altamente especializada em idiomas e ensinar com anos de experiencia, responda de maneira amigavel e divertida as duvidas dos usuarios:

"${message}"
`;

  const result = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt
  });

  return result.text;
}
