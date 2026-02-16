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
      <Box textAlign="center" p={8}>
        <Heading color="white" mb={4}>Framework not found</Heading>
        <ChakraLink 
          as={RouterLink} 
          to="/" 
          color="#64FFDA"
          _hover={{ color: '#00D9FF' }}
        >
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
        <Heading 
          size="xl" 
          mb={4}
          bgGradient="linear(to-r, #64FFDA, #00D9FF)"
          bgClip="text"
        >
          {framework.name}
        </Heading>
        <Text fontSize="lg" color="gray.300" mb={6}>
          {framework.description}
        </Text>
        <HStack spacing={2} mb={6} flexWrap="wrap">
          {framework.useCases.map((useCase) => (
            <Badge 
              key={useCase}
              px={3}
              py={1}
              borderRadius="md"
              bg="rgba(100, 255, 218, 0.1)"
              color="#64FFDA"
              border="1px solid rgba(100, 255, 218, 0.3)"
            >
              {useCase}
            </Badge>
          ))}
        </HStack>
      </Box>

      <Box
        p={6}
        borderRadius="xl"
        bg="rgba(15, 20, 35, 0.8)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(100, 255, 218, 0.2)"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            {framework.components.map((component) => (
              <FormControl key={component}>
                <FormLabel fontWeight="bold" color="white">{component}</FormLabel>
                {component.toLowerCase().includes('description') ? (
                  <Textarea
                    value={formData[component] || ''}
                    onChange={(e) => handleInputChange(component, e.target.value)}
                    placeholder={`Enter your ${component.toLowerCase()}`}
                    bg="rgba(15, 20, 35, 0.6)"
                    border="1px solid rgba(100, 255, 218, 0.3)"
                    color="white"
                    _placeholder={{ color: 'gray.500' }}
                    _hover={{ 
                      bg: 'rgba(15, 20, 35, 0.8)',
                      borderColor: 'rgba(100, 255, 218, 0.5)'
                    }}
                    _focus={{
                      bg: 'rgba(15, 20, 35, 0.9)',
                      borderColor: '#64FFDA',
                      boxShadow: '0 0 0 1px #64FFDA'
                    }}
                  />
                ) : (
                  <Input
                    value={formData[component] || ''}
                    onChange={(e) => handleInputChange(component, e.target.value)}
                    placeholder={`Enter your ${component.toLowerCase()}`}
                    bg="rgba(15, 20, 35, 0.6)"
                    border="1px solid rgba(100, 255, 218, 0.3)"
                    color="white"
                    _placeholder={{ color: 'gray.500' }}
                    _hover={{ 
                      bg: 'rgba(15, 20, 35, 0.8)',
                      borderColor: 'rgba(100, 255, 218, 0.5)'
                    }}
                    _focus={{
                      bg: 'rgba(15, 20, 35, 0.9)',
                      borderColor: '#64FFDA',
                      boxShadow: '0 0 0 1px #64FFDA'
                    }}
                  />
                )}
              </FormControl>
            ))}
            <Button 
              type="submit" 
              size="lg"
              bg="linear-gradient(135deg, #64FFDA 0%, #00D9FF 100%)"
              color="gray.900"
              fontWeight="bold"
              _hover={{
                bg: 'linear-gradient(135deg, #7CFFE8 0%, #1AE3FF 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(100, 255, 218, 0.4)'
              }}
              _active={{
                transform: 'translateY(0)',
              }}
              isLoading={isLoading}
              loadingText="Generating..."
            >
              Generate Prompt
            </Button>
          </VStack>
        </form>
      </Box>

      {error && (
        <Alert 
          status="error"
          bg="rgba(220, 38, 38, 0.2)"
          border="1px solid rgba(220, 38, 38, 0.5)"
          borderRadius="xl"
          color="white"
        >
          <AlertIcon color="red.400" />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {generatedPrompt && (
        <Box
          p={6}
          borderRadius="xl"
          bg="rgba(15, 20, 35, 0.8)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(100, 255, 218, 0.2)"
        >
          <Heading size="md" mb={4} color="white">Generated Prompt</Heading>
          <Text whiteSpace="pre-wrap" color="gray.300" mb={4}>{generatedPrompt}</Text>
          <Button
            bg="rgba(100, 255, 218, 0.1)"
            color="#64FFDA"
            border="1px solid rgba(100, 255, 218, 0.3)"
            _hover={{
              bg: 'rgba(100, 255, 218, 0.2)',
              borderColor: '#64FFDA'
            }}
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

      <Box
        p={6}
        borderRadius="xl"
        bg="rgba(15, 20, 35, 0.8)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(100, 255, 218, 0.2)"
      >
        <Heading size="md" mb={4} color="white">Components</Heading>
        <List spacing={2}>
          {framework.components.map((component) => (
            <ListItem key={component} color="gray.300">
              • {component}
            </ListItem>
          ))}
        </List>
      </Box>
    </VStack>
  )
}

export default FrameworkDetail 