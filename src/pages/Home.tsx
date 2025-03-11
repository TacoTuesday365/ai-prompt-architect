import { SimpleGrid, Box, Heading, Text, VStack, Link as ChakraLink, Badge, HStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { frameworks } from '../data/frameworks'

const Home = () => {
  return (
    <VStack spacing={8} align="stretch" className="glass-container">
      <Box textAlign="center" color="var(--text-primary)">
        <Heading size="xl" mb={4}>AI Prompting Frameworks</Heading>
        <Text fontSize="lg" opacity={0.9}>
          Discover and learn about different AI prompting frameworks to improve your interactions with AI models.
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {frameworks.map((framework) => (
          <ChakraLink
            key={framework.id}
            as={RouterLink}
            to={`/framework/${framework.id}`}
            _hover={{ textDecoration: 'none' }}
          >
            <Box
              className="glass-card"
              p={6}
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
              }}
            >
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color="var(--text-primary)">{framework.name}</Heading>
                <Text color="var(--text-secondary)">{framework.description}</Text>
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
              </VStack>
            </Box>
          </ChakraLink>
        ))}
      </SimpleGrid>
    </VStack>
  )
}

export default Home 