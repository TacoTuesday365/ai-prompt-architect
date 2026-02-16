import { Handler } from '@netlify/functions'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Rate limiting store (in-memory, resets on function cold start)
const rateLimitStore = new Map<string, number[]>()
const MAX_REQUESTS = 10
const TIME_WINDOW = 60 * 60 * 1000 // 1 hour

function checkRateLimit(clientId: string): boolean {
  const now = Date.now()
  const requests = rateLimitStore.get(clientId) || []
  
  // Remove old requests outside time window
  const recentRequests = requests.filter(time => now - time < TIME_WINDOW)
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return false
  }
  
  recentRequests.push(now)
  rateLimitStore.set(clientId, recentRequests)
  return true
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    // Use IP address for rate limiting
    const clientId = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown'
    
    if (!checkRateLimit(clientId)) {
      return {
        statusCode: 429,
        body: JSON.stringify({ 
          error: 'Rate limit exceeded. Please wait before making more requests. (Max 10 requests per hour)' 
        })
      }
    }

    const { framework, formData } = JSON.parse(event.body || '{}')
    // Support both production (GOOGLE_API_KEY) and local dev (VITE_GOOGLE_API_KEY)
    const apiKey = process.env.GOOGLE_API_KEY || process.env.VITE_GOOGLE_API_KEY

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key not configured' })
      }
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const prompt = `You are an AI prompt engineering expert.
Your task is to create an effective prompt using the ${framework.name}.
Follow the framework's structure and components to create a well-crafted prompt.

Framework Components:
${framework.components.map((component: string) => `${component}: ${formData[component] || ''}`).join('\n')}

Please create a refined, effective prompt that incorporates all these components following the ${framework.name} structure.
The prompt should be clear, specific, and designed to get the best possible response from an AI model.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const finalText = response.text()

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true,
        prompt: finalText 
      })
    }
  } catch (error) {
    console.error('Error generating prompt:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to generate prompt' 
      })
    }
  }
}
