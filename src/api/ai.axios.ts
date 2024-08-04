import axios from "axios";

const API_URL = "https://api.anthropic.com/v1/messages";

const claudeApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_CLAUDE_API_KEY,
    "anthropic-version": "2023-06-01",
  },
});

export const sendMessageToClaude = async (message: string) => {
  try {
    const response = await claudeApi.post("", {
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      messages: [{ role: "user", content: message }],
    });
    return response.data.content[0].text;
  } catch (error) {
    console.error("Error calling Claude API:", error);
    throw error;
  }
};
