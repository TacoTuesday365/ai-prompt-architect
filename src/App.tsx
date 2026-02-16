import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import FrameworkDetail from './pages/FrameworkDetail'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Box 
            className="app-container"
            minH="100vh"
            bg="linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%)"
            position="relative"
            overflow="hidden"
          >
            {/* Animated background circles */}
            <Box
              position="absolute"
              width="600px"
              height="600px"
              borderRadius="full"
              background="radial-gradient(circle, rgba(100, 255, 218, 0.15) 0%, rgba(100, 255, 218, 0) 70%)"
              top="-200px"
              right="-200px"
              animation="pulse 4s ease-in-out infinite"
              zIndex={0}
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
              zIndex={0}
            />
          
            <ProtectedRoute>
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
                  <Route path="/framework/:id" element={<FrameworkDetail />} />
                </Routes>
              </Box>
            </ProtectedRoute>

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
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App 