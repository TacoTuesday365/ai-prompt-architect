import { Box, VStack, Heading, Text, Badge, HStack, Button, useClipboard } from '@chakra-ui/react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { frameworks, Framework as FrameworkType } from '../data/frameworks'

const Framework = () => {
  const { id } = useParams<{ id: string }>()
  const framework = frameworks.find(f => f.id === id)
  const { hasCopied, onCopy } = useClipboard(framework?.prompt || '')

  if (!framework) {
    return (
      <Box textAlign="center" className="glass-container">
        <Heading color="var(--text-primary)">Framework not found</Heading>
        <Button as={RouterLink} to="/" mt={4} className="glass-button">
          Return to Home
        </Button>
      </Box>
    )
  }

  return (
    <VStack spacing={8} align="stretch">
      <Box className="glass-card">
        <VStack align="stretch" spacing={6}>
          <Box>
            <Heading size="xl" color="var(--text-primary)" mb={4}>{framework.name}</Heading>
            <Text fontSize="lg" color="var(--text-secondary)">{framework.description}</Text>
          </Box>

          <Box>
            <Heading size="md" color="var(--text-primary)" mb={3}>Use Cases</Heading>
            <HStack spacing={2} flexWrap="wrap">
              {framework.useCases.map((useCase) => (
                <Badge
                  key={useCase}
                  className="glass-button"
                  px={3}
                  py={1}
                >
                  {useCase}
                </Badge>
              ))}
            </HStack>
          </Box>

          <Box>
            <Heading size="md" color="var(--text-primary)" mb={3}>Components</Heading>
            <VStack spacing={2} align="stretch">
              {framework.components.map((component) => (
                <Text key={component} color="var(--text-secondary)">
                  • {component}
                </Text>
              ))}
            </VStack>
          </Box>

          {framework.prompt && (
            <Box>
              <Heading size="md" color="var(--text-primary)" mb={3}>Prompt Template</Heading>
              <Box
                className="glass-container"
                p={4}
                position="relative"
              >
                <Text color="var(--text-secondary)" whiteSpace="pre-wrap" mb={4}>
                  {framework.prompt}
                </Text>
                <Button
                  position="absolute"
                  top={2}
                  right={2}
                  size="sm"
                  onClick={onCopy}
                  className="glass-button"
                >
                  {hasCopied ? 'Copied!' : 'Copy'}
                </Button>
              </Box>
            </Box>
          )}

          {framework.examples && framework.examples.length > 0 && (
            <Box>
              <Heading size="md" color="var(--text-primary)" mb={3}>Examples</Heading>
              <VStack spacing={4} align="stretch">
                {framework.examples.map((example, index) => (
                  <Box
                    key={index}
                    className="glass-container"
                    p={4}
                  >
                    <Text color="var(--text-secondary)" whiteSpace="pre-wrap">
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