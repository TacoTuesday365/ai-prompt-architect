import { Handler } from '@netlify/functions'

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { password } = JSON.parse(event.body || '{}')
    // Support both production (APP_PASSWORD) and local dev (VITE_APP_PASSWORD)
    const correctPassword = process.env.APP_PASSWORD || process.env.VITE_APP_PASSWORD

    if (!correctPassword) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      }
    }

    const isValid = password === correctPassword

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: isValid,
        message: isValid ? 'Authentication successful' : 'Invalid password'
      })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request' })
    }
  }
}
