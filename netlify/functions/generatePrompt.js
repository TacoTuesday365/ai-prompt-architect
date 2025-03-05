const fetch = require('node-fetch'); // Make sure you're using the correct version of node-fetch

exports.handler = async (event) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY; // Securely access your Google API key
    const prompt = JSON.parse(event.body).prompt;

    // Make a POST request to the Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const data = await response.json();

    console.log('Google API response:', data); // Log the response for debugging

    // Handle any error response from the API
    if (data.error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: data.error.message })
      };
    }

    // Return the API response as a JSON object
    return {
      statusCode: 200,
      body: JSON.stringify({ response: data })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
