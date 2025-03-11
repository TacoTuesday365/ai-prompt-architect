import { SimpleGrid, Box, Heading, Text, VStack, Link as ChakraLink, Badge, HStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { frameworks } from '../data/frameworks'

const Home = () => {
  return (
    <VStack spacing={8} align="stretch">
      <Box textAlign="center" color="white">
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
              p={6}
              bg="rgba(255, 255, 255, 0.1)"
              backdropFilter="blur(10px)"
              borderRadius="xl"
              border="1px solid rgba(255, 255, 255, 0.1)"
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-4px)',
                bg: 'rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
            >
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color="white">{framework.name}</Heading>
                <Text color="whiteAlpha.900">{framework.description}</Text>
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
              </VStack>
            </Box>
          </ChakraLink>
        ))}
      </SimpleGrid>
    </VStack>
  )
}

export default Home 