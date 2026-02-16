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
    
    // Try to list available models
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" })
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
          testResponse: text,
          model: 'gemini-1.5-flash-latest'
        })
      }
    } catch (modelError) {
      // Try alternative model names
      const modelsToTry = [
        'gemini-1.5-flash',
        'gemini-1.5-pro-latest',
        'gemini-1.5-pro',
        'models/gemini-1.5-flash-latest',
        'models/gemini-1.5-flash'
      ]
      
      for (const modelName of modelsToTry) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName })
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
              message: 'Found working model!',
              workingModel: modelName,
              testResponse: text
            })
          }
        } catch (e) {
          // Continue to next model
          continue
        }
      }
      
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Could not find working model',
          originalError: modelError instanceof Error ? modelError.message : String(modelError),
          triedModels: modelsToTry
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
