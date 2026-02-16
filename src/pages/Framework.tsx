import { Box, VStack, Heading, Text, Badge, HStack, Button, useClipboard } from '@chakra-ui/react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { frameworks, Framework as FrameworkType } from '../data/frameworks'

const Framework = () => {
  const { id } = useParams<{ id: string }>()
  const framework = frameworks.find(f => f.id === id)
  const { hasCopied, onCopy } = useClipboard(framework?.prompt || '')

  if (!framework) {
    return (
      <Box textAlign="center" p={8}>
        <Heading color="white" mb={4}>Framework not found</Heading>
        <Button 
          as={RouterLink} 
          to="/" 
          mt={4}
          bg="rgba(100, 255, 218, 0.1)"
          color="#64FFDA"
          border="1px solid rgba(100, 255, 218, 0.3)"
          _hover={{
            bg: 'rgba(100, 255, 218, 0.2)',
            borderColor: '#64FFDA'
          }}
        >
          Return to Home
        </Button>
      </Box>
    )
  }

  return (
    <VStack spacing={8} align="stretch">
      <Box
        p={6}
        borderRadius="xl"
        bg="rgba(15, 20, 35, 0.8)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(100, 255, 218, 0.2)"
      >
        <VStack align="stretch" spacing={6}>
          <Box>
            <Heading 
              size="xl" 
              mb={4}
              bgGradient="linear(to-r, #64FFDA, #00D9FF)"
              bgClip="text"
            >
              {framework.name}
            </Heading>
            <Text fontSize="lg" color="gray.300">{framework.description}</Text>
          </Box>

          <Box>
            <Heading size="md" color="white" mb={3}>Use Cases</Heading>
            <HStack spacing={2} flexWrap="wrap">
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

          <Box>
            <Heading size="md" color="white" mb={3}>Components</Heading>
            <VStack spacing={2} align="stretch">
              {framework.components.map((component) => (
                <Text key={component} color="gray.300">
                  • {component}
                </Text>
              ))}
            </VStack>
          </Box>

          {framework.prompt && (
            <Box>
              <Heading size="md" color="white" mb={3}>Prompt Template</Heading>
              <Box
                p={4}
                borderRadius="lg"
                bg="rgba(15, 20, 35, 0.6)"
                border="1px solid rgba(100, 255, 218, 0.2)"
                position="relative"
              >
                <Text color="gray.300" whiteSpace="pre-wrap" mb={4}>
                  {framework.prompt}
                </Text>
                <Button
                  position="absolute"
                  top={2}
                  right={2}
                  size="sm"
                  onClick={onCopy}
                  bg="rgba(100, 255, 218, 0.1)"
                  color="#64FFDA"
                  border="1px solid rgba(100, 255, 218, 0.3)"
                  _hover={{
                    bg: 'rgba(100, 255, 218, 0.2)',
                    borderColor: '#64FFDA'
                  }}
                >
                  {hasCopied ? 'Copied!' : 'Copy'}
                </Button>
              </Box>
            </Box>
          )}

          {framework.examples && framework.examples.length > 0 && (
            <Box>
              <Heading size="md" color="white" mb={3}>Examples</Heading>
              <VStack spacing={4} align="stretch">
                {framework.examples.map((example, index) => (
                  <Box
                    key={index}
                    p={4}
                    borderRadius="lg"
                    bg="rgba(15, 20, 35, 0.6)"
                    border="1px solid rgba(100, 255, 218, 0.2)"
                  >
                    <Text color="gray.300" whiteSpace="pre-wrap">
                      {example}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Box>
          )}
        </VStack>
      </Box>
    </VStack>
  )
}

export default Framework 