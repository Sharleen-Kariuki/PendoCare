import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  // A check to ensure the API key is available.
  console.warn("Gemini API key not found in environment variables. Chatbot will not work.");
}

// Removed the '!' operator used in TS
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash',
    systemInstruction: `You are Pendo, a supportive and friendly AI mental health companion for Kenyan students preparing for their KCSE exams.
  Your goal is to provide helpful, safe, and encouraging advice and coping strategies for stress, anxiety, and feeling overwhelmed.
  Be empathetic, patient, and use simple, clear language.
  - Provide practical, actionable advice (e.g., exercises, study techniques, mindfulness).
  - Do NOT provide medical diagnoses or act as a replacement for a professional therapist.
  - If a user expresses severe distress, thoughts of self-harm, or suicidal ideation, gently but firmly guide them to seek immediate professional help and provide emergency contact information.
  - Keep responses concise and easy to read on a mobile phone.`,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 500,
    }
});
  
// Removed type annotations (userMessage: string) and return type (: Promise<string>)
export const getChatbotResponse = async (userMessage) => {
  if (!API_KEY) {
    console.warn("Gemini API key not found in environment variables. Chatbot will not work.");
    return "I'm sorry, my connection is currently unavailable. Please try again later.";
  }
  
  try {
    const result = await model.generateContent(userMessage);
    const response = result.response;
    const text = response.text();
    
    return text || "I'm sorry, I could not answer that response. Please ask me something else.";
  } catch (error) {
    console.error("Error generating chatbot response:", error);
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
};