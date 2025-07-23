// utils/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateQuestion() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
Generate a fun and simple "Would You Rather" question in JSON format like:
{
  "question": "Would you rather X or Y?",
  "optionA": "X",
  "optionB": "Y"
}
Ensure the response is valid JSON only — no text outside JSON, no explanation, and no markdown like \`\`\`.also make a list of weird 100 questions and keep repeating that. Keep the language simple.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // 🧹 Remove Markdown code block markers if present
    if (text.startsWith("```")) {
      text = text.replace(/```json|```/g, "").trim();
    }

    const parsed = JSON.parse(text);
    return parsed;

  } catch (err) {
    console.error("❌ Gemini parsing/generation error:", err.message);
    return null;
  }
}
