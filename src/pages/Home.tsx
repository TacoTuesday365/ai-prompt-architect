import { SimpleGrid, Box, Heading, Text, VStack, Link as ChakraLink, Badge, HStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { frameworks } from '../data/frameworks'

const Home = () => {
  return (
    <VStack spacing={8} align="stretch">
      <Box textAlign="center">
        <Heading size="xl" mb={4} color="gray.800">AI Prompting Frameworks</Heading>
        <Text fontSize="lg" color="gray.600">
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
              bg="white"
              borderRadius="xl"
              boxShadow="sm"
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-4px)',
                boxShadow: 'md'
              }}
            >
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color="gray.800">{framework.name}</Heading>
                <Text color="gray.600">{framework.description}</Text>
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
              </VStack>
            </Box>
          </ChakraLink>
        ))}
      </SimpleGrid>
    </VStack>
  )
}

export default Home 