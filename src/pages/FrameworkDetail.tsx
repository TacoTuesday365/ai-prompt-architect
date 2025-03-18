import { useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import {
  Box,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Link as ChakraLink,
  List,
  ListItem,
  Badge,
  HStack,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { frameworks } from '../data/frameworks'
import { generatePrompt } from '../services/ai'

const FrameworkDetail = () => {
  const { id } = useParams<{ id: string }>()
  const framework = frameworks.find((f) => f.id === id)
  const toast = useToast()
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  if (!framework) {
    return (
      <Box textAlign="center">
        <Heading>Framework not found</Heading>
        <ChakraLink as={RouterLink} to="/" color="blue.500">
          Return to home
        </ChakraLink>
      </Box>
    )
  }

  const handleInputChange = (component: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [component]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submit button clicked')
    console.log('Form data:', formData)
    console.log('Current framework:', framework)
    
    setIsLoading(true)
    setError('')
    setGeneratedPrompt('')

    try {
      console.log('About to call generatePrompt')
      const prompt = await generatePrompt({ framework, formData })
      console.log('Generated prompt:', prompt)
      setGeneratedPrompt(prompt)
      toast({
        title: 'Prompt generated',
        description: 'Your prompt has been generated successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (err) {
      console.error('Error in handleSubmit:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate prompt')
      toast({
        title: 'Error',
        description: 'Failed to generate prompt. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <Heading size="xl" mb={4}>{framework.name}</Heading>
        <Text fontSize="lg" color="gray.600" mb={6}>
          {framework.description}
        </Text>
        <HStack spacing={2} mb={6}>
          {framework.useCases.map((useCase) => (
            <Badge key={useCase} colorScheme="blue">
              {useCase}
            </Badge>
          ))}
        </HStack>
      </Box>

      <Box bg="white" p={6} rounded="lg" boxShadow="md">
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            {framework.components.map((component) => (
              <FormControl key={component}>
                <FormLabel fontWeight="bold">{component}</FormLabel>
                {component.toLowerCase().includes('description') ? (
                  <Textarea
                    value={formData[component] || ''}
                    onChange={(e) => handleInputChange(component, e.target.value)}
                    placeholder={`Enter your ${component.toLowerCase()}`}
                    rows={4}
                  />
                ) : (
                  <Input
                    value={formData[component] || ''}
                    onChange={(e) => handleInputChange(component, e.target.value)}
                    placeholder={`Enter your ${component.toLowerCase()}`}
                  />
                )}
              </FormControl>
            ))}
            <Button 
              type="submit" 
              colorScheme="blue" 
              size="lg"
              isLoading={isLoading}
              loadingText="Generating..."
              onClick={() => console.log('Button clicked directly')}
            >
              Generate Prompt
            </Button>
          </VStack>
        </form>
      </Box>

      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {generatedPrompt && (
        <Box bg="white" p={6} rounded="lg" boxShadow="md">
          <Heading size="md" mb={4}>Generated Prompt</Heading>
          <Text whiteSpace="pre-wrap">{generatedPrompt}</Text>
          <Button
            mt={4}
            onClick={() => {
              navigator.clipboard.writeText(generatedPrompt)
              toast({
                title: 'Copied!',
                description: 'Prompt copied to clipboard',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
            }}
          >
            Copy to Clipboard
          </Button>
        </Box>
      )}

      <Box>
        <Heading size="md" mb={4}>Components</Heading>
        <List spacing={2}>
          {framework.components.map((component) => (
            <ListItem key={component}>
              • {component}
            </ListItem>
          ))}
        </List>
      </Box>
    </VStack>
  )
}

export default FrameworkDetail 