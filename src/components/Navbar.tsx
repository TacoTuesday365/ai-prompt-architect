import { Box, Flex, Heading, Link as ChakraLink } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box className="glass-nav">
      <Flex maxW="1200px" mx="auto" h={16} alignItems="center" justifyContent="space-between" px={4}>
        <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
          <Heading 
            size="md" 
            bgGradient="linear(to-r, #64FFDA, #00D9FF)"
            bgClip="text"
            fontWeight="bold"
          >
            PROMPT ARCHI
          </Heading>
        </ChakraLink>
      </Flex>
    </Box>
  )
}

export default Navbar 