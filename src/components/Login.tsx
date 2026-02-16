import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Container,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useAuth } from '../context/AuthContext'

const PromptArchiLogo = () => (
  <Box textAlign="center" mb={8}>
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: '0 auto' }}
    >
      {/* Outer hexagon */}
      <path
        d="M40 5 L65 20 L65 50 L40 65 L15 50 L15 20 Z"
        stroke="url(#gradient1)"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Inner geometric pattern */}
      <path
        d="M40 15 L55 25 L55 45 L40 55 L25 45 L25 25 Z"
        stroke="url(#gradient2)"
        strokeWidth="2"
        fill="rgba(100, 255, 218, 0.1)"
      />
      {/* Center lines forming "P" */}
      <path
        d="M35 30 L35 50 M35 30 L45 30 L45 40 L35 40"
        stroke="#64FFDA"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#64FFDA" />
          <stop offset="50%" stopColor="#00D9FF" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D9FF" />
          <stop offset="100%" stopColor="#64FFDA" />
        </linearGradient>
      </defs>
    </svg>
    <Text
      fontSize="2xl"
      fontWeight="bold"
      bgGradient="linear(to-r, #64FFDA, #00D9FF)"
      bgClip="text"
      mt={4}
      letterSpacing="wider"
    >
      PROMPT ARCHI
    </Text>
    <Text fontSize="sm" color="gray.400" mt={1}>
      AI Prompt Engineering Platform
    </Text>
  </Box>
)

export const Login = () => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const toast = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const success = login(password)
    
    if (success) {
      toast({
        title: 'Welcome back!',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    } else {
      toast({
        title: 'Access Denied',
        description: 'Invalid password. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      setPassword('')
    }
  }

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      {/* Animated background elements */}
      <Box
        position="absolute"
        width="600px"
        height="600px"
        borderRadius="full"
        background="radial-gradient(circle, rgba(100, 255, 218, 0.15) 0%, rgba(100, 255, 218, 0) 70%)"
        top="-200px"
        right="-200px"
        animation="pulse 4s ease-in-out infinite"
      />
      <Box
        position="absolute"
        width="500px"
        height="500px"
        borderRadius="full"
        background="radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, rgba(0, 217, 255, 0) 70%)"
        bottom="-150px"
        left="-150px"
        animation="pulse 5s ease-in-out infinite"
      />

      <Container maxW="md" centerContent position="relative" zIndex={1}>
        <Box
          p={10}
          borderRadius="2xl"
          bg="rgba(15, 20, 35, 0.8)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(100, 255, 218, 0.2)"
          boxShadow="0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(100, 255, 218, 0.1)"
          w="100%"
        >
          <PromptArchiLogo />
          
          <VStack spacing={6} as="form" onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel 
                color="gray.300" 
                fontSize="sm" 
                fontWeight="medium"
                mb={2}
              >
                Password
              </FormLabel>
              <InputGroup size="lg">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  bg="rgba(15, 20, 35, 0.6)"
                  border="1px solid rgba(100, 255, 218, 0.3)"
                  color="white"
                  fontSize="md"
                  _placeholder={{ color: 'gray.500' }}
                  _hover={{ 
                    bg: 'rgba(15, 20, 35, 0.8)',
                    borderColor: 'rgba(100, 255, 218, 0.5)'
                  }}
                  _focus={{
                    bg: 'rgba(15, 20, 35, 0.9)',
                    borderColor: '#64FFDA',
                    boxShadow: '0 0 0 1px #64FFDA'
                  }}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    color="gray.400"
                    _hover={{ color: '#64FFDA', bg: 'transparent' }}
                    size="sm"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              width="100%"
              size="lg"
              bg="linear-gradient(135deg, #64FFDA 0%, #00D9FF 100%)"
              color="gray.900"
              fontWeight="bold"
              _hover={{
                bg: 'linear-gradient(135deg, #7CFFE8 0%, #1AE3FF 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(100, 255, 218, 0.4)'
              }}
              _active={{
                transform: 'translateY(0)',
              }}
              transition="all 0.2s"
            >
              Access Platform
            </Button>
          </VStack>
        </Box>
      </Container>

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 0.5;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.1);
            }
          }
        `}
      </style>
    </Box>
  )
}
