import { Box, Flex, Heading, Link as ChakraLink } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box
      bg="white"
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex maxW="1200px" mx="auto" h={16} alignItems="center" justifyContent="space-between" px={4}>
        <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
          <Heading size="md" color="brand.600">AI Prompting Guide</Heading>
        </ChakraLink>
      </Flex>
    </Box>
  )
}

export default Navbar 