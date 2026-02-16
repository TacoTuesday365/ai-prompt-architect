import { Framework } from '../data/frameworks'

interface GeneratePromptParams {
  framework: Framework;
  formData: Record<string, string>;
}

export async function generatePrompt({ framework, formData }: GeneratePromptParams) {
  try {
    const response = await fetch('/.netlify/functions/generate-prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ framework, formData })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate prompt')
    }

    return data.prompt
  } catch (error) {
    console.error('Error generating prompt:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to generate prompt: ${error.message}`)
    }
    throw error
  }
} 