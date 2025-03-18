import { Box, Flex, Heading, Link as ChakraLink } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(10px)"
      borderBottom="1px solid rgba(255, 255, 255, 0.1)"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex maxW="1200px" mx="auto" h={16} alignItems="center" justifyContent="space-between" px={4}>
        <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
          <Heading size="md" color="white">AI Prompting Guide</Heading>
        </ChakraLink>
      </Flex>
    </Box>
  )
}

export default Navbar 