import { GoogleGenAI } from "@google/genai";
import { ENV_VARS } from "./envVars";

const ai = new GoogleGenAI({ apiKey: ENV_VARS.GEMINI_API_KEY });

async function generateBlogDescription(prompt: string) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });

    return response.candidates?.[0].content || "";
}

export default generateBlogDescription;