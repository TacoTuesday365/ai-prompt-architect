import { Framework } from '../data/frameworks'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface GeneratePromptParams {
  framework: Framework;
  formData: Record<string, string>;
}

export async function generatePrompt({ framework, formData }: GeneratePromptParams) {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY

  if (!apiKey) {
    console.error('API Key not found in environment. Available env vars:', {
      keys: Object.keys(import.meta.env),
      hasViteKey: !!import.meta.env.VITE_GOOGLE_API_KEY,
      mode: import.meta.env.MODE,
      isDev: import.meta.env.DEV,
      isProd: import.meta.env.PROD
    })
    throw new Error('Google API key is not configured. Please set VITE_GOOGLE_API_KEY in your environment variables.')
  }

  console.log('Initializing with framework:', framework.name)
  
  try {
    // Initialize the Google AI model
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const prompt = `You are an AI prompt engineering expert.
Your task is to create an effective prompt using the ${framework.name}.
Follow the framework's structure and components to create a well-crafted prompt.

Framework Components:
${framework.components.map(component => `${component}: ${formData[component] || ''}`).join('\n')}

Please create a refined, effective prompt that incorporates all these components following the ${framework.name} structure.
The prompt should be clear, specific, and designed to get the best possible response from an AI model.`

    console.log('Sending prompt to Gemini:', { 
      framework: framework.name, 
      components: framework.components,
      apiKeyLength: apiKey.length,
      apiKeyStart: apiKey.substring(0, 4) + '...'
    })
    
    const result = await model.generateContent(prompt)
    console.log('Received response from Gemini:', result)
    
    const response = await result.response
    const finalText = response.text()
    
    console.log('Processed response:', finalText)
    return finalText

  } catch (error) {
    console.error('Detailed error in generatePrompt:', {
      error,
      framework: framework.name,
      apiKeyExists: !!apiKey,
      apiKeyLength: apiKey.length,
      apiKeyStart: apiKey.substring(0, 4) + '...',
      environmentVars: {
        hasViteKey: !!import.meta.env.VITE_GOOGLE_API_KEY,
        mode: import.meta.env.MODE,
        isDev: import.meta.env.DEV,
        isProd: import.meta.env.PROD
      }
    })
    
    if (error instanceof Error) {
      throw new Error(`Failed to generate prompt: ${error.message}`)
    }
    throw error
  }
} 