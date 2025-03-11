import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' 
          ? 'linear-gradient(to bottom right, gray.900, gray.800)'
          : 'linear-gradient(to bottom right, white, gray.50)',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
        transition: 'all 0.2s ease-in-out',
      },
    }),
  },
  components: {
    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: props.colorMode === 'dark' 
            ? 'rgba(45, 55, 72, 0.9)'  // dark blue-gray with transparency
            : 'rgba(255, 255, 255, 0.9)',
          borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.200',
          boxShadow: props.colorMode === 'dark' 
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderRadius: 'xl',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s ease-in-out',
          _hover: {
            transform: 'translateY(-4px)',
            boxShadow: props.colorMode === 'dark'
              ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            borderColor: props.colorMode === 'dark' ? 'blue.400' : 'blue.500',
          },
        },
      }),
    },
    Button: {
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'blue.500' : 'blue.600',
          color: 'white',
          fontWeight: '600',
          _hover: {
            bg: props.colorMode === 'dark' ? 'blue.400' : 'blue.500',
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          },
          _active: {
            transform: 'translateY(0)',
            boxShadow: 'md',
          },
        }),
        ghost: (props: any) => ({
          _hover: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.50',
          },
        }),
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '700',
        letterSpacing: '-0.02em',
      },
    },
  },
  colors: {
    tile: {
      lightBg: 'rgba(255, 255, 255, 0.9)',
      darkBg: 'rgba(45, 55, 72, 0.9)',
      lightHover: 'rgba(255, 255, 255, 1)',
      darkHover: 'rgba(45, 55, 72, 1)',
      lightBorder: 'gray.200',
      darkBorder: 'gray.600',
    },
    brand: {
      50: '#E6F6FF',
      100: '#BAE3FF',
      200: '#7CC4FA',
      300: '#47A3F3',
      400: '#2186EB',
      500: '#0967D2',
      600: '#0552B5',
      700: '#03449E',
      800: '#01337D',
      900: '#002159',
    },
  },
  layerStyles: {
    card: {
      p: '6',
      rounded: 'xl',
      shadow: 'lg',
      backdropFilter: 'blur(8px)',
    },
    glass: {
      backdropFilter: 'blur(8px)',
      bg: 'rgba(255, 255, 255, 0.8)',
      _dark: {
        bg: 'rgba(26, 32, 44, 0.8)',
      },
    },
  },
  textStyles: {
    h1: {
      fontSize: ['3xl', '4xl'],
      fontWeight: '800',
      lineHeight: '110%',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: ['2xl', '3xl'],
      fontWeight: '700',
      lineHeight: '110%',
      letterSpacing: '-0.01em',
    },
    subtitle: {
      fontSize: ['lg', 'xl'],
      fontWeight: '500',
      lineHeight: '150%',
      color: 'gray.600',
      _dark: {
        color: 'gray.300',
      },
    },
  },
})

export default theme 