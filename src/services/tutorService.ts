import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function tutorPrompt(message: string, language: string) {
  const prompt = `
Você é um tutor de idiomas. Corrija a gramática do seguinte texto e sugira uma forma mais natural de dizê-lo em ${language}:

"${message}"
`;

  const result = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt
  });

  return result.text;
}
