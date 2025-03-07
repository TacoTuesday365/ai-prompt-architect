import { Box, Flex, Heading, Link as ChakraLink } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box bg="white" boxShadow="sm" px={4}>
      <Flex maxW="1200px" mx="auto" h={16} alignItems="center" justifyContent="space-between">
        <ChakraLink as={RouterLink} to="/">
          <Heading size="md" color="blue.600">AI Prompting Guide</Heading>
        </ChakraLink>
      </Flex>
    </Box>
  )
}

export default Navbar 