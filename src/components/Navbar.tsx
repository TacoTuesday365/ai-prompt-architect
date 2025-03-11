import { Box, Flex, Heading, Link as ChakraLink, HStack, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const { theme } = useTheme()

  return (
    <Box className={theme === 'dark' ? 'glass-nav' : 'nav-light'}>
      <Flex maxW="1200px" mx="auto" h={16} alignItems="center" justifyContent="space-between" px={4}>
        <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
          <Heading size="md" color={theme === 'dark' ? 'var(--dark-text-primary)' : 'var(--light-text-primary)'}>
            AI Prompting Guide
          </Heading>
        </ChakraLink>

        <HStack spacing={4}>
          <ChakraLink
            as={RouterLink}
            to="/"
            color={theme === 'dark' ? 'var(--dark-text-primary)' : 'var(--light-text-primary)'}
            _hover={{ textDecoration: 'none', opacity: 0.8 }}
          >
            Home
          </ChakraLink>
          <Button
            as={RouterLink}
            to="/contact"
            variant="solid"
            colorScheme="blue"
            size="sm"
          >
            Contact Us
          </Button>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar 