import { Box, VStack, Heading, Text, Badge, HStack, Button, useClipboard } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { frameworks } from '../data/frameworks'

const Framework = () => {
  const { id } = useParams()
  const framework = frameworks.find(f => f.id === id)
  const { hasCopied, onCopy } = useClipboard(framework?.prompt || '')

  if (!framework) {
    return (
      <Box textAlign="center" color="white">
        <Heading>Framework not found</Heading>
      </Box>
    )
  }

  return (
    <VStack spacing={8} align="stretch">
      <Box
        p={8}
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(10px)"
        borderRadius="xl"
        border="1px solid rgba(255, 255, 255, 0.1)"
      >
        <VStack align="stretch" spacing={6}>
          <Box>
            <Heading size="xl" color="white" mb={4}>{framework.name}</Heading>
            <Text fontSize="lg" color="whiteAlpha.900">{framework.description}</Text>
          </Box>

          <Box>
            <Heading size="md" color="white" mb={3}>Use Cases</Heading>
            <HStack spacing={2} flexWrap="wrap">
              {framework.useCases.map((useCase) => (
                <Badge
                  key={useCase}
                  bg="rgba(255, 255, 255, 0.2)"
                  color="white"
                  borderRadius="full"
                  px={3}
                  py={1}
                >
                  {useCase}
                </Badge>
              ))}
            </HStack>
          </Box>

          {framework.prompt && (
            <Box>
              <Heading size="md" color="white" mb={3}>Prompt Template</Heading>
              <Box
                p={4}
                bg="rgba(0, 0, 0, 0.2)"
                borderRadius="lg"
                position="relative"
              >
                <Text color="whiteAlpha.900" whiteSpace="pre-wrap" mb={4}>
                  {framework.prompt}
                </Text>
                <Button
                  position="absolute"
                  top={2}
                  right={2}
                  size="sm"
                  onClick={onCopy}
                  bg="rgba(255, 255, 255, 0.1)"
                  color="white"
                  _hover={{ bg: 'rgba(255, 255, 255, 0.2)' }}
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
                {framework.examples.map((example: string, index: number) => (
                  <Box
                    key={index}
                    p={4}
                    bg="rgba(255, 255, 255, 0.05)"
                    borderRadius="lg"
                  >
                    <Text color="whiteAlpha.900" whiteSpace="pre-wrap">
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