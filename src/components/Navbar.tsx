import { VStack, Heading, Link as ChakraLink, Button, Box, Icon, Text, HStack } from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { FiHome, FiMail, FiBook } from 'react-icons/fi'

const NavItem = ({ to, icon, children, isActive }: { to: string; icon: any; children: React.ReactNode; isActive: boolean }) => (
  <ChakraLink
    as={RouterLink}
    to={to}
    w="100%"
    _hover={{ textDecoration: 'none' }}
  >
    <HStack
      px={4}
      py={3}
      spacing={3}
      bg={isActive ? 'whiteAlpha.200' : 'transparent'}
      _hover={{ bg: 'whiteAlpha.100' }}
      borderRadius="md"
      transition="all 0.2s"
    >
      <Icon as={icon} boxSize={5} />
      <Text>{children}</Text>
    </HStack>
  </ChakraLink>
)

const Navbar = () => {
  const { theme } = useTheme()
  const location = useLocation()

  return (
    <VStack
      h="100%"
      py={8}
      px={4}
      spacing={8}
      align="stretch"
    >
      <Box>
        <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
          <Heading
            size="md"
            mb={8}
            color={theme === 'dark' ? 'var(--dark-text-primary)' : 'var(--light-text-primary)'}
          >
            AI Prompting Guide
          </Heading>
        </ChakraLink>

        <VStack spacing={2} align="stretch">
          <NavItem
            to="/"
            icon={FiHome}
            isActive={location.pathname === '/'}
          >
            Home
          </NavItem>
          <NavItem
            to="/frameworks"
            icon={FiBook}
            isActive={location.pathname.startsWith('/framework')}
          >
            Frameworks
          </NavItem>
          <NavItem
            to="/contact"
            icon={FiMail}
            isActive={location.pathname === '/contact'}
          >
            Contact
          </NavItem>
        </VStack>
      </Box>

      <Box mt="auto">
        <Button
          as={RouterLink}
          to="/contact"
          variant="outline"
          size="md"
          width="100%"
          colorScheme={theme === 'dark' ? 'whiteAlpha' : 'blackAlpha'}
        >
          Get in Touch
        </Button>
      </Box>
    </VStack>
  )
}

export default Navbar 