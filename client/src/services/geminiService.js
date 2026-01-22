import api from './api';

/**
 * Sends a message to the backend and returns the AI response.
 * @param {string} userMessage - The message from the student.
 * @param {Array} history - The conversation history.
 * @param {string} studentName - The student's name.
 * @param {string} sessionId - Unique ID for this session.
 * @returns {Promise<{response: string, escalate: boolean}>}
 */
export const getChatbotResponse = async (userMessage, history = [], studentName = "", sessionId = "") => {
  try {
    const response = await api.post('/api/message', {
      message: userMessage,
      history: history,
      studentName: studentName,
      sessionId: sessionId
    });

    if (response.data) {
      return {
        response: response.data.response || "I'm sorry, I could not answer that. Please ask me something else.",
        escalate: !!response.data.escalate
      };
    }

    return {
      response: "I'm sorry, I could not answer that. Please ask me something else.",
      escalate: false
    };
  } catch (error) {
    console.error("Error generating chatbot response:", error);

    const isQuotaExceeded =
      error.response?.status === 429 ||
      error.message?.toLowerCase().includes("quota");

    if (isQuotaExceeded) {
      return {
        response: "Pendo is currently resting because many students are reaching out at once! 🌿 Please wait about a minute and try again. I'm here for you.",
        escalate: false
      };
    }

    return {
      response: "I'm having trouble connecting right now. Please try again in a moment.",
      escalate: false
    };
  }
};