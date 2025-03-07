import { Framework } from '../data/frameworks'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface GeneratePromptParams {
  framework: Framework;
  formData: Record<string, string>;
}

export async function generatePrompt({ framework, formData }: GeneratePromptParams) {
  const apiKey = import.meta.env.GOOGLE_API_KEY

  if (!apiKey) {
    throw new Error('Google API key is not configured')
  }

  // Initialize the Google AI model
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const prompt = `You are an AI prompt engineering expert.
Your task is to create an effective prompt using the ${framework.name}.
Follow the framework's structure and components to create a well-crafted prompt.

Framework Components:
${framework.components.map(component => `${component}: ${formData[component] || ''}`).join('\n')}

Please create a refined, effective prompt that incorporates all these components following the ${framework.name} structure.
The prompt should be clear, specific, and designed to get the best possible response from an AI model.`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error generating prompt:', error)
    throw error
  }
} 