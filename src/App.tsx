import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Framework from './pages/Framework'
import theme from './theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh">
          <Navbar />
          <Box 
            maxW="1200px" 
            mx="auto" 
            px={4} 
            py={8}
            position="relative"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/framework/:id" element={<Framework />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  )
}

export default App 