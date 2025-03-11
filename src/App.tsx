import { ChakraProvider, Box } from '@chakra-ui/react'
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
          <Box className="app-container">
            {/* Background circles for added effect */}
            <Box
              position="absolute"
              width="500px"
              height="500px"
              borderRadius="full"
              background="radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, rgba(100, 255, 218, 0) 70%)"
              top="-100px"
              right="-100px"
              zIndex={0}
            />
            <Box
              position="absolute"
              width="600px"
              height="600px"
              borderRadius="full"
              background="radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, rgba(100, 255, 218, 0) 70%)"
              bottom="-150px"
              left="-150px"
              zIndex={0}
            />
            
            <ThemeToggle />
            <Box className="glass-nav">
              <Navbar />
            </Box>
            <Box 
              maxW="1200px" 
              mx="auto" 
              px={4} 
              py={8}
              position="relative"
              zIndex={1}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/framework/:id" element={<FrameworkDetail />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </ChakraProvider>
  )
}

export default App 