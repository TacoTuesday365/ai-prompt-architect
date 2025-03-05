import { GoogleGenerativeAI } from "@google/generative-ai";

export async function handler(event) {
  try {
    const { prompt } = JSON.parse(event.body);
    const apiKey = process.env.GOOGLE_API_KEY; // Securely access API key

    // Initialize the Google Generative AI model
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Generate content with the prompt
    const result = await model.generateContent(prompt);

    // Log result and return the generated response
    console.log("Generated Content:", result.response.text());  // Logs the generated text for debugging
    return {
      statusCode: 200,
      body: JSON.stringify({ refinedPrompt: result.response.text() }),
    };
  } catch (error) {
    console.error("Error in function:", error);  // Logs the error in case something goes wrong
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
