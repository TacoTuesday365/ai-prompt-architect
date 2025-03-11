import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800'
      }
    }
  },
  colors: {
    brand: {
      50: '#f5f7ff',
      100: '#e6eaff',
      200: '#c5ceff',
      300: '#a4b2ff',
      400: '#8396ff',
      500: '#627aff',
      600: '#4e62cc',
      700: '#3a4999',
      800: '#263166',
      900: '#131833'
    }
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand'
      }
    },
    Badge: {
      defaultProps: {
        colorScheme: 'brand'
      }
    }
  }
})

export default theme 