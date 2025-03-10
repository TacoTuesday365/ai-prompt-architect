import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import FrameworkDetail from './pages/FrameworkDetail'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box
          minH="100vh"
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          backgroundAttachment="fixed"
          position="relative"
          overflow="hidden"
        >
          {/* Background circles for added effect */}
          <Box
            position="absolute"
            width="500px"
            height="500px"
            borderRadius="full"
            background="radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)"
            top="-100px"
            right="-100px"
            zIndex={0}
          />
          <Box
            position="absolute"
            width="600px"
            height="600px"
            borderRadius="full"
            background="radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)"
            bottom="-150px"
            left="-150px"
            zIndex={0}
          />
          
          <Navbar />
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
        </Box>
      </Router>
    </ChakraProvider>
  )
}

export default App 