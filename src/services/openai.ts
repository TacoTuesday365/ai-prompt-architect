import { Framework } from '../data/frameworks'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

interface GeneratePromptParams {
  framework: Framework;
  formData: Record<string, string>;
}

export async function generatePrompt({ framework, formData }: GeneratePromptParams) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY

  if (!apiKey) {
    throw new Error('OpenAI API key is not configured')
  }

  const systemMessage = `You are an AI prompt engineering expert. 
Your task is to create an effective prompt using the ${framework.name}.
Follow the framework's structure and components to create a well-crafted prompt.`

  const userMessage = `Framework Components:
${framework.components.map(component => `${component}: ${formData[component] || ''}`).join('\n')}

Please create a refined, effective prompt that incorporates all these components following the ${framework.name} structure.
The prompt should be clear, specific, and designed to get the best possible response from an AI model.`

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error('Failed to generate prompt')
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error('Error generating prompt:', error)
    throw error
  }
} 