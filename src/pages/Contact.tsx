import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import { ContactForm } from '../components/ContactForm'

const Contact = () => {
  return (
    <VStack spacing={8} align="stretch" className="glass-container">
      <Box textAlign="center" color="var(--text-primary)">
        <Heading size="xl" mb={4}>Contact Us</Heading>
        <Text fontSize="lg" opacity={0.9} mb={8}>
          Have questions about AI prompting frameworks? We'd love to hear from you!
        </Text>
      </Box>
      
      <ContactForm />
    </VStack>
  )
}

export default Contact 