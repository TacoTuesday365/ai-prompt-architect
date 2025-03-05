import { GoogleGenerativeAI } from "@google/generative-ai";

// Create an instance of the Google API client
const genAI = new GoogleGenerativeAI({ apiKey: process.env.GOOGLE_API_KEY }); // Updated to use GOOGLE_API_KEY

// This is the status check endpoint
export async function handler(event) {
  if (event.httpMethod === 'GET' && event.path === '/status') {
    try {
      // Ping the Google API to check if it's responsive
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      await model.generateContent("Ping to check API readiness");

      return {
        statusCode: 200,
        body: JSON.stringify({ status: "ready" }),  // Response for health check
      };
    } catch (error) {
      console.error("Error checking Google API status:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ status: "not ready", error: error.message }),
      };
    }
  }

  // Handle the actual prompt generation logic
  if (event.httpMethod === 'POST' && event.path === '/generatePrompt') {
    try {
      const { prompt } = JSON.parse(event.body);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);

      return {
        statusCode: 200,
        body: JSON.stringify({ refinedPrompt: result.response.text() }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ error: "Not Found" }),
  };
}
