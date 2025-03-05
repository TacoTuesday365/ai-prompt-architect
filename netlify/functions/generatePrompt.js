import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { prompt } = JSON.parse(event.body);
    const apiKey = process.env.GOOGLE_API_KEY; // Securely access API key

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.log("Google API Error:", data);  // Log detailed error from Google API
      throw new Error(`Google API Error: ${data.error.message}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ refinedPrompt: data.generatedText || 'No output from API' })
    };
  } catch (error) {
    console.error('Error in function:', error);  // Log the error
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
