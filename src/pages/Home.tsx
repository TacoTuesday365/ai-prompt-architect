import {
  SimpleGrid,
  Box,
  Heading,
  Text,
  VStack,
  Link as ChakraLink,
  Badge,
  HStack,
  Input,
  Button,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { frameworks } from '../data/frameworks'

const Home = () => {
  return (
    <VStack spacing={8} align="stretch">
      {/* Prompt Input Section with CIDI Framework */}
      <Box
        className="glass-container"
        p={6}
        borderRadius="xl"
      >
        <VStack spacing={4} align="stretch">
          <Heading size="md" color="var(--text-primary)">Enter your prompt using CIDI Framework</Heading>
          <Text fontSize="sm" color="var(--text-secondary)">
            Context, Instructions, Details, and Input - A comprehensive framework for clear AI communication
          </Text>
          <Input
            placeholder="What would you like to know about AI prompting?"
            size="lg"
            bg="whiteAlpha.50"
            _hover={{ bg: 'whiteAlpha.100' }}
            _focus={{ bg: 'whiteAlpha.100', borderColor: 'blue.400' }}
          />

          <Button colorScheme="blue" size="lg">
            Generate
          </Button>
        </VStack>
      </Box>

      {/* Frameworks Grid */}
      <Box className="glass-container" p={6} borderRadius="xl">
        <Heading size="md" mb={6} color="var(--text-primary)">Available Frameworks</Heading>
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
                border="1px"
                borderColor="whiteAlpha.200"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-4px)',
                  borderColor: 'blue.400',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                <VStack align="stretch" spacing={4}>
                  <Heading size="md" color="var(--text-primary)">{framework.name}</Heading>
                  <Text color="var(--text-secondary)">{framework.description}</Text>
                  <HStack spacing={2} flexWrap="wrap">
                    {framework.useCases.map((useCase) => (
                      <Badge
                        key={useCase}
                        colorScheme="blue"
                        variant="subtle"
                        px={2}
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
      </Box>
    </VStack>
  )
}

export default Home 