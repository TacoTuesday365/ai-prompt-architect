import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  Text,
  useColorMode,
} from '@chakra-ui/react'

interface FormData {
  name: string
  email: string
  message: string
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const toast = useToast()
  const { colorMode } = useColorMode()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) throw new Error('Failed to submit form')

      toast({
        title: 'Message sent!',
        description: "We'll get back to you soon.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={6}
      borderRadius="xl"
      bg={colorMode === 'dark' ? 'gray.700' : 'white'}
      boxShadow="lg"
      width="100%"
      maxW="600px"
      mx="auto"
      borderWidth="1px"
      borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
      transition="all 0.3s ease-in-out"
    >
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          Get in Touch
        </Text>
        
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            _placeholder={{ opacity: 0.6 }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            _placeholder={{ opacity: 0.6 }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Message</FormLabel>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            _placeholder={{ opacity: 0.6 }}
            minH="150px"
            resize="vertical"
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          width="100%"
          isLoading={isSubmitting}
          loadingText="Sending..."
        >
          Send Message
        </Button>
      </VStack>
    </Box>
  )
} 