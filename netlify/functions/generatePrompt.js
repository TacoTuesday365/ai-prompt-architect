const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  try {
    const { prompt } = JSON.parse(event.body);

    // Call Google API to generate content
    const apiKey = process.env.GOOGLE_API_KEY;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
    });

    const data = await response.json();
    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ generatePrompt: data.response.text }), // Return updated field name
      };
    } else {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.error.message || "Unknown error" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
