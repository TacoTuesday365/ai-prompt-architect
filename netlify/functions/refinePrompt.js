import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { prompt } = JSON.parse(event.body);

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/text-bison-001:generateText?key=YOUR_GOOGLE_API_KEY", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: { text: prompt },
        temperature: 0.7
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ refinedPrompt: data.candidates[0].output })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
