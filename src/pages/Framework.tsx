import { Box, VStack, Heading, Text, Badge, HStack, Button, useClipboard } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { frameworks } from '../data/frameworks'

const Framework = () => {
  const { id } = useParams()
  const framework = frameworks.find(f => f.id === id)
  const { hasCopied, onCopy } = useClipboard(framework?.prompt || '')

  if (!framework) {
    return (
      <Box textAlign="center">
        <Heading color="gray.800">Framework not found</Heading>
      </Box>
    )
  }

  return (
    <VStack spacing={8} align="stretch">
      <Box
        p={8}
        bg="white"
        borderRadius="xl"
        boxShadow="sm"
      >
        <VStack align="stretch" spacing={6}>
          <Box>
            <Heading size="xl" color="gray.800" mb={4}>{framework.name}</Heading>
            <Text fontSize="lg" color="gray.600">{framework.description}</Text>
          </Box>

          <Box>
            <Heading size="md" color="gray.800" mb={3}>Use Cases</Heading>
            <HStack spacing={2} flexWrap="wrap">
              {framework.useCases.map((useCase) => (
                <Badge
                  key={useCase}
                  colorScheme="brand"
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
              <Heading size="md" color="gray.800" mb={3}>Prompt Template</Heading>
              <Box
                p={4}
                bg="gray.50"
                borderRadius="lg"
                position="relative"
              >
                <Text color="gray.800" whiteSpace="pre-wrap" mb={4}>
                  {framework.prompt}
                </Text>
                <Button
                  position="absolute"
                  top={2}
                  right={2}
                  size="sm"
                  onClick={onCopy}
                  colorScheme="brand"
                >
                  {hasCopied ? 'Copied!' : 'Copy'}
                </Button>
              </Box>
            </Box>
          )}

          {framework.examples && framework.examples.length > 0 && (
            <Box>
              <Heading size="md" color="gray.800" mb={3}>Examples</Heading>
              <VStack spacing={4} align="stretch">
                {framework.examples.map((example: string, index: number) => (
                  <Box
                    key={index}
                    p={4}
                    bg="gray.50"
                    borderRadius="lg"
                  >
                    <Text color="gray.800" whiteSpace="pre-wrap">
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