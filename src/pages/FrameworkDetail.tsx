import React, { useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
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
  Link as ChakraLink,
  List,
  ListItem,
  Badge,
  HStack,
  useToast,
} from '@chakra-ui/react'
import { frameworks } from '../data/frameworks'

const FrameworkDetail = () => {
  const { id } = useParams<{ id: string }>()
  const framework = frameworks.find((f) => f.id === id)
  const toast = useToast()
  const [formData, setFormData] = useState<Record<string, string>>({})

  if (!framework) {
    return (
      <Box textAlign="center">
        <Heading>Framework not found</Heading>
        <ChakraLink as={RouterLink} to="/" color="blue.500">
          Return to home
        </ChakraLink>
      </Box>
    )
  }

  const handleInputChange = (component: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [component]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to an API
    toast({
      title: 'Form submitted',
      description: 'Your prompt has been generated successfully!',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <Heading size="xl" mb={4}>{framework.name}</Heading>
        <Text fontSize="lg" color="gray.600" mb={6}>
          {framework.description}
        </Text>
        <HStack spacing={2} mb={6}>
          {framework.useCases.map((useCase) => (
            <Badge key={useCase} colorScheme="blue">
              {useCase}
            </Badge>
          ))}
        </HStack>
      </Box>

      <Box bg="white" p={6} rounded="lg" boxShadow="md">
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            {framework.components.map((component) => (
              <FormControl key={component}>
                <FormLabel fontWeight="bold">{component}</FormLabel>
                {component.toLowerCase().includes('description') ? (
                  <Textarea
                    value={formData[component] || ''}
                    onChange={(e) => handleInputChange(component, e.target.value)}
                    placeholder={`Enter your ${component.toLowerCase()}`}
                    rows={4}
                  />
                ) : (
                  <Input
                    value={formData[component] || ''}
                    onChange={(e) => handleInputChange(component, e.target.value)}
                    placeholder={`Enter your ${component.toLowerCase()}`}
                  />
                )}
              </FormControl>
            ))}
            <Button type="submit" colorScheme="blue" size="lg">
              Generate Prompt
            </Button>
          </VStack>
        </form>
      </Box>

      <Box>
        <Heading size="md" mb={4}>Components</Heading>
        <List spacing={2}>
          {framework.components.map((component) => (
            <ListItem key={component}>
              • {component}
            </ListItem>
          ))}
        </List>
      </Box>
    </VStack>
  )
}

export default FrameworkDetail 