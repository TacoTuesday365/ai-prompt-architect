import { Box, Flex, Text, Button } from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { logout } = useAuth()

  return (
    <Box className="glass-nav">
      <Flex maxW="1200px" mx="auto" h={12} alignItems="center" justifyContent="space-between" px={6}>
        <Text 
          fontSize="sm" 
          color="gray.400"
          letterSpacing="wide"
        >
          AI Prompt Engineering
        </Text>
        <Button
          size="sm"
          variant="ghost"
          color="gray.400"
          _hover={{ color: '#64FFDA', bg: 'transparent' }}
          onClick={logout}
        >
          Logout
        </Button>
      </Flex>
    </Box>
  )
}

export default Navbar 