import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Container
} from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'

export const Login = () => {
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const toast = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const success = login(password)
    
    if (success) {
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Invalid password',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      setPassword('')
    }
  }

  return (
    <Container maxW="md" centerContent>
      <Box
        mt={20}
        p={8}
        borderRadius="lg"
        bg="rgba(255, 255, 255, 0.05)"
        backdropFilter="blur(10px)"
        border="1px solid rgba(255, 255, 255, 0.1)"
        boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.37)"
        w="100%"
      >
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <Heading size="lg" color="white">
            AI Prompt Architect
          </Heading>
          <Text color="gray.300" textAlign="center">
            Enter your password to access the application
          </Text>
          
          <FormControl isRequired>
            <FormLabel color="white">Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              bg="rgba(255, 255, 255, 0.1)"
              border="1px solid rgba(255, 255, 255, 0.2)"
              color="white"
              _placeholder={{ color: 'gray.400' }}
              _hover={{ bg: 'rgba(255, 255, 255, 0.15)' }}
              _focus={{
                bg: 'rgba(255, 255, 255, 0.15)',
                borderColor: 'cyan.400'
              }}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="cyan"
            width="100%"
            size="lg"
          >
            Login
          </Button>
        </VStack>
      </Box>
    </Container>
  )
}
