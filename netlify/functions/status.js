// netlify/functions/status.js
const fetch = require("node-fetch"); // Ensure you install node-fetch

exports.handler = async function(event, context) {
    try {
        // Google API URL to check if it's ready (using your real API endpoint here)
        const apiKey = process.env.GOOGLE_API_KEY; // Use your environment variable
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const response = await fetch(url, {
            method: 'GET',
        });

        // If the response is OK, Google API is available
        if (response.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ status: 'ready' }),  // Return ready if API is responsive
            };
        } else {
            // If the response is not OK, return not ready
            return {
                statusCode: 500,
                body: JSON.stringify({ status: 'not ready' }),
            };
        }
    } catch (error) {
        // If there is an error (e.g., network issue), return not ready
        return {
            statusCode: 500,
            body: JSON.stringify({ status: 'not ready' }),
        };
    }
};
