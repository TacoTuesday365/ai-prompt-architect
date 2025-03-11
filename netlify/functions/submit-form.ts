import { Handler } from '@netlify/functions'

interface FormData {
  name: string
  email: string
  message: string
}

export const handler: Handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    }
  }

  try {
    const { name, email, message } = JSON.parse(event.body || '') as FormData

    // Validate the data
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      }
    }

    // Here you would typically send the email using a service like SendGrid, AWS SES, etc.
    // For now, we'll just log it and return success
    console.log('Form submission:', { name, email, message })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully' }),
    }
  } catch (error) {
    console.error('Error processing form submission:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    }
  }
} 