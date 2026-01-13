import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Chat with the "Digital Twin" of the creator.
 * Uses gemini-3-pro-preview with thinking mode enabled for complex reasoning.
 */
export const sendChatMessage = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const modelId = 'gemini-3-pro-preview';

    // We use a chat session to maintain history
    const chat = ai.chats.create({
        model: modelId,
        config: {
            // "You MUST add thinking mode... set thinkingBudget to 32768"
            thinkingConfig: {
                thinkingBudget: 32768, 
            },
            // "Do not set maxOutputTokens" - omitted as per instruction.
            systemInstruction: "You are the digital persona of a creative writer and musician. You are thoughtful, slightly philosophical, and concise. You help visitors understand the creator's work.",
        },
        history: history,
    });

    const result: GenerateContentResponse = await chat.sendMessage({
        message: message
    });

    return result.text || "I'm lost in thought, please try again.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Something went wrong communicating with the digital twin.";
  }
};

/**
 * Analyze an uploaded image.
 * Uses gemini-3-pro-preview for high quality image understanding.
 */
export const analyzeImage = async (
  base64Data: string,
  mimeType: string,
  prompt: string = "Analyze this image from a creative perspective. What emotions or stories does it evoke?"
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      // Using thinking here as well since we are using the pro model for deep analysis
      config: {
          thinkingConfig: {
            thinkingBudget: 10000, // Slightly lower budget for image analysis speed vs depth
          }
      }
    });

    return response.text || "Could not analyze the image.";
  } catch (error) {
    console.error("Image Analysis Error:", error);
    return "Failed to analyze the image.";
  }
};
