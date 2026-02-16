import { SimpleGrid, Box, Heading, Text, VStack, Link as ChakraLink, Badge, HStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { frameworks } from '../data/frameworks'

const Home = () => {
  return (
    <VStack spacing={8} align="stretch">
      <Box textAlign="center">
        <Heading 
          size="xl" 
          mb={4}
          bgGradient="linear(to-r, #64FFDA, #00D9FF)"
          bgClip="text"
        >
          AI Prompting Frameworks
        </Heading>
        <Text fontSize="lg" color="gray.300">
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
              borderRadius="xl"
              bg="rgba(15, 20, 35, 0.8)"
              backdropFilter="blur(20px)"
              border="1px solid rgba(100, 255, 218, 0.2)"
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-4px)',
                borderColor: '#64FFDA',
                boxShadow: '0 8px 30px rgba(100, 255, 218, 0.2)'
              }}
            >
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color="white">{framework.name}</Heading>
                <Text color="gray.300">{framework.description}</Text>
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
              </VStack>
            </Box>
          </ChakraLink>
        ))}
      </SimpleGrid>
    </VStack>
  )
}

export default Home 