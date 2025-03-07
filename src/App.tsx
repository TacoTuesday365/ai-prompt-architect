import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import FrameworkDetail from './pages/FrameworkDetail'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box minH="100vh" bg="gray.50">
          <Navbar />
          <Box maxW="1200px" mx="auto" px={4} py={8}>
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