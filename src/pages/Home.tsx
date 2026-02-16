import { useState } from 'react'
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
  Select,
  useToast,
  Container,
  Fade,
  ScaleFade,
  SimpleGrid,
} from '@chakra-ui/react'
import { frameworks } from '../data/frameworks'
import { generatePrompt } from '../services/ai'

const Home = () => {
  const [selectedFrameworkId, setSelectedFrameworkId] = useState<string>('')
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const selectedFramework = frameworks.find(f => f.id === selectedFrameworkId)

  const handleFrameworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFrameworkId(e.target.value)
    setFormData({})
    setGeneratedPrompt('')
  }

  const handleInputChange = (component: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [component]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedFramework) return

    setIsLoading(true)
    setGeneratedPrompt('')

    try {
      const prompt = await generatePrompt({ framework: selectedFramework, formData })
      setGeneratedPrompt(prompt)
      toast({
        title: 'Prompt generated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to generate prompt',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box pt={{ base: 2, md: 4 }} pb={{ base: 4, md: 8 }} px={{ base: 2, sm: 4 }}>
      <Container maxW={{ base: '100%', sm: '95%', md: '90%', lg: '1000px' }}>
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
          {/* Logo and Title */}
          <VStack spacing={{ base: 2, md: 3 }} textAlign="center">
            <svg
              width="60"
              height="60"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ margin: '0 auto' }}
            >
              <path
                d="M40 5 L65 20 L65 50 L40 65 L15 50 L15 20 Z"
                stroke="url(#gradient1)"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M40 15 L55 25 L55 45 L40 55 L25 45 L25 25 Z"
                stroke="url(#gradient2)"
                strokeWidth="2"
                fill="rgba(100, 255, 218, 0.1)"
              />
              <path
                d="M35 30 L35 50 M35 30 L45 30 L45 40 L35 40"
                stroke="#64FFDA"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#64FFDA" />
                  <stop offset="50%" stopColor="#00D9FF" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D9FF" />
                  <stop offset="100%" stopColor="#64FFDA" />
                </linearGradient>
              </defs>
            </svg>
            <Heading
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
              fontWeight="bold"
              bgGradient="linear(to-r, #64FFDA, #00D9FF)"
              bgClip="text"
              letterSpacing="tight"
            >
              Prompt Archi
            </Heading>
          </VStack>

          {/* Framework Selector */}
          <Box
            bg="rgba(15, 20, 35, 0.6)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(100, 255, 218, 0.3)"
            borderRadius="full"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{
              borderColor: '#64FFDA',
              boxShadow: '0 0 20px rgba(100, 255, 218, 0.2)'
            }}
          >
            <Select
              placeholder="Select a prompting framework..."
              value={selectedFrameworkId}
              onChange={handleFrameworkChange}
              size={{ base: 'md', md: 'lg' }}
              border="none"
              color="white"
              fontSize={{ base: 'sm', md: 'md' }}
              _focus={{ boxShadow: 'none' }}
              _placeholder={{ color: 'gray.400' }}
              cursor="pointer"
              icon={<></>}
              sx={{
                '> option': {
                  background: '#1a1f3a',
                  color: 'white',
                }
              }}
            >
              {frameworks.map((framework) => (
                <option key={framework.id} value={framework.id}>
                  {framework.name}
                </option>
              ))}
            </Select>
          </Box>

          {/* Framework Description */}
          {selectedFramework && (
            <Fade in={!!selectedFramework}>
              <Text 
                textAlign="center" 
                color="gray.400" 
                fontSize={{ base: 'xs', md: 'sm' }}
                px={{ base: 2, md: 0 }}
              >
                {selectedFramework.description}
              </Text>
            </Fade>
          )}

          {/* Dynamic Form and Generated Prompt */}
          {selectedFramework && (
            <ScaleFade in={!!selectedFramework} initialScale={0.95}>
              <SimpleGrid 
                columns={{ base: 1, lg: generatedPrompt ? 2 : 1 }} 
                spacing={{ base: 4, md: 6 }}
              >
                {/* Form */}
                <Box
                  as="form"
                  onSubmit={handleSubmit}
                  p={{ base: 4, md: 6 }}
                  borderRadius={{ base: 'lg', md: 'xl' }}
                  bg="rgba(15, 20, 35, 0.8)"
                  backdropFilter="blur(20px)"
                  border="1px solid rgba(100, 255, 218, 0.2)"
                  boxShadow="0 10px 40px rgba(0, 0, 0, 0.3)"
                >
                  <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                    {selectedFramework.components.map((component) => (
                      <FormControl key={component} size="sm">
                        <FormLabel 
                          color="gray.300" 
                          fontSize={{ base: '2xs', sm: 'xs' }}
                          fontWeight="medium"
                          mb={1}
                        >
                          {component}
                        </FormLabel>
                        {component.toLowerCase().includes('description') || 
                         component.toLowerCase().includes('context') ||
                         component.toLowerCase().includes('example') ? (
                          <Textarea
                            value={formData[component] || ''}
                            onChange={(e) => handleInputChange(component, e.target.value)}
                            placeholder={`Enter ${component.toLowerCase()}...`}
                            bg="rgba(15, 20, 35, 0.6)"
                            border="1px solid rgba(100, 255, 218, 0.3)"
                            color="white"
                            rows={2}
                            fontSize={{ base: 'xs', md: 'sm' }}
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
                            placeholder={`Enter ${component.toLowerCase()}...`}
                            bg="rgba(15, 20, 35, 0.6)"
                            border="1px solid rgba(100, 255, 218, 0.3)"
                            color="white"
                            size={{ base: 'sm', md: 'md' }}
                            fontSize={{ base: 'xs', md: 'sm' }}
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
                      size={{ base: 'sm', md: 'md' }}
                      bg="linear-gradient(135deg, #64FFDA 0%, #00D9FF 100%)"
                      color="gray.900"
                      fontWeight="bold"
                      fontSize={{ base: 'sm', md: 'md' }}
                      isLoading={isLoading}
                      loadingText="Generating..."
                      _hover={{
                        bg: 'linear-gradient(135deg, #7CFFE8 0%, #1AE3FF 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(100, 255, 218, 0.4)'
                      }}
                      _active={{
                        transform: 'translateY(0)',
                      }}
                    >
                      Generate Prompt
                    </Button>
                  </VStack>
                </Box>

                {/* Generated Prompt */}
                {generatedPrompt && (
                  <Box
                    p={{ base: 4, md: 6 }}
                    borderRadius={{ base: 'lg', md: 'xl' }}
                    bg="rgba(15, 20, 35, 0.8)"
                    backdropFilter="blur(20px)"
                    border="1px solid rgba(100, 255, 218, 0.2)"
                    boxShadow="0 10px 40px rgba(0, 0, 0, 0.3)"
                  >
                    <VStack spacing={{ base: 2, md: 3 }} align="stretch">
                      <Heading size={{ base: 'xs', md: 'sm' }} color="white">
                        Generated Prompt
                      </Heading>
                      <Text 
                        whiteSpace="pre-wrap" 
                        color="gray.300"
                        fontSize={{ base: 'xs', md: 'sm' }}
                        lineHeight="tall"
                        maxH={{ base: '300px', md: '400px' }}
                        overflowY="auto"
                        css={{
                          '&::-webkit-scrollbar': {
                            width: '8px',
                          },
                          '&::-webkit-scrollbar-track': {
                            background: 'rgba(15, 20, 35, 0.6)',
                            borderRadius: '4px',
                          },
                          '&::-webkit-scrollbar-thumb': {
                            background: 'rgba(100, 255, 218, 0.3)',
                            borderRadius: '4px',
                          },
                          '&::-webkit-scrollbar-thumb:hover': {
                            background: 'rgba(100, 255, 218, 0.5)',
                          },
                        }}
                      >
                        {generatedPrompt}
                      </Text>
                      <Button
                        size={{ base: 'xs', md: 'sm' }}
                        bg="rgba(100, 255, 218, 0.1)"
                        color="#64FFDA"
                        border="1px solid rgba(100, 255, 218, 0.3)"
                        fontSize={{ base: 'xs', md: 'sm' }}
                        _hover={{
                          bg: 'rgba(100, 255, 218, 0.2)',
                          borderColor: '#64FFDA'
                        }}
                        onClick={() => {
                          navigator.clipboard.writeText(generatedPrompt)
                          toast({
                            title: 'Copied to clipboard',
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                            position: 'top',
                          })
                        }}
                      >
                        Copy to Clipboard
                      </Button>
                    </VStack>
                  </Box>
                )}
              </SimpleGrid>
            </ScaleFade>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default Home 