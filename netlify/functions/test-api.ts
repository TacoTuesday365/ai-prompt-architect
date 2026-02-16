import { Handler } from '@netlify/functions'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY || process.env.VITE_GOOGLE_API_KEY

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'API key not configured',
          hasGoogleKey: !!process.env.GOOGLE_API_KEY,
          hasViteKey: !!process.env.VITE_GOOGLE_API_KEY
        })
      }
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    
    // Try to list available models using the API
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
      )
      
      if (!response.ok) {
        const errorText = await response.text()
        return {
          statusCode: response.status,
          body: JSON.stringify({ 
            error: 'Failed to list models',
            status: response.status,
            details: errorText,
            apiKeyPrefix: apiKey.substring(0, 10) + '...'
          })
        }
      }
      
      const data = await response.json()
      
      // Extract model names that support generateContent
      const availableModels = data.models
        ?.filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
        ?.map((m: any) => ({
          name: m.name,
          displayName: m.displayName,
          description: m.description
        })) || []
      
      // Try the first available model
      if (availableModels.length > 0) {
        const firstModel = availableModels[0].name.replace('models/', '')
        try {
          const model = genAI.getGenerativeModel({ model: firstModel })
          const result = await model.generateContent("Say hello")
          const response = await result.response
          const text = response.text()
          
          return {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              success: true,
              message: 'API key is working!',
              workingModel: firstModel,
              testResponse: text,
              availableModels: availableModels
            })
          }
        } catch (testError) {
          return {
            statusCode: 200,
            body: JSON.stringify({ 
              success: false,
              message: 'Found models but test failed',
              availableModels: availableModels,
              testError: testError instanceof Error ? testError.message : String(testError)
            })
          }
        }
      }
      
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: false,
          message: 'No models found that support generateContent',
          allModels: data.models?.map((m: any) => ({
            name: m.name,
            methods: m.supportedGenerationMethods
          }))
        })
      }
      
    } catch (listError) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Failed to list models',
          details: listError instanceof Error ? listError.message : String(listError),
          apiKeyLength: apiKey.length,
          apiKeyPrefix: apiKey.substring(0, 10) + '...'
        })
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      })
    }
  }
}
