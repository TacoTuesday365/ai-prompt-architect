import { ChakraProvider, Box, Grid, GridItem } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import FrameworkDetail from './pages/FrameworkDetail'
import { ThemeProvider } from './context/ThemeContext'
import { ThemeToggle } from './components/ThemeToggle'
import theme from './theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider>
        <Router>
          <Grid
            templateColumns={{ base: '1fr', md: '250px 1fr' }}
            minH="100vh"
            position="relative"
          >
            {/* Left sidebar navigation */}
            <GridItem
              className="glass-nav"
              borderRight="1px"
              borderColor="whiteAlpha.200"
              display={{ base: 'none', md: 'block' }}
              position="fixed"
              h="100vh"
              w="250px"
            >
              <Navbar />
            </GridItem>

            {/* Mobile navigation */}
            <GridItem display={{ base: 'block', md: 'none' }} position="fixed" top={0} w="100%" zIndex={10}>
              <Box className="glass-nav">
                <Navbar />
              </Box>
            </GridItem>

            {/* Main content */}
            <GridItem
              colStart={{ base: 1, md: 2 }}
              px={4}
              py={8}
              ml={{ base: 0, md: '250px' }}
              position="relative"
            >
              <ThemeToggle />
              <Box maxW="1000px" mx="auto">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/framework/:id" element={<FrameworkDetail />} />
                </Routes>
              </Box>
            </GridItem>

            {/* Background effects */}
            <Box
              position="fixed"
              width="500px"
              height="500px"
              borderRadius="full"
              background="radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, rgba(100, 255, 218, 0) 70%)"
              top="-100px"
              right="-100px"
              zIndex={0}
              pointerEvents="none"
            />
            <Box
              position="fixed"
              width="600px"
              height="600px"
              borderRadius="full"
              background="radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, rgba(100, 255, 218, 0) 70%)"
              bottom="-150px"
              left="-150px"
              zIndex={0}
              pointerEvents="none"
            />
          </Grid>
        </Router>
      </ThemeProvider>
    </ChakraProvider>
  )
}

export default App 