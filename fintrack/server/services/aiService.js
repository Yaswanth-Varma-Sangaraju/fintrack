import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAdviceFromGemini = async (categories) => {
    if (!process.env.GEMINI_API_KEY) {
        return "Mock Tip 1: Cook more at home.\nMock Tip 2: Use public transport.\nMock Tip 3: Track subscriptions.";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
        I spent most on ${categories.join(", ")} this month.
        Give me exactly 3 short practical money-saving bullet points.
        Be specific and actionable.
        `;

        const result = await model.generateContent(prompt);

        return result.response.text();

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Failed to get AI advice");
    }
};