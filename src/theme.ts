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
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
        transition: 'background-color 0.2s ease-in-out',
      },
    }),
  },
  components: {
    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
          boxShadow: props.colorMode === 'dark' 
            ? '0 12px 20px -8px rgba(0, 0, 0, 0.5)'
            : '0 12px 20px -8px rgba(0, 0, 0, 0.1)',
          borderRadius: 'xl',
          transform: 'translateY(-4px)',
          transition: 'all 0.2s ease-in-out',
          _hover: {
            transform: 'translateY(0)',
            boxShadow: props.colorMode === 'dark' 
              ? '0 4px 6px -2px rgba(0, 0, 0, 0.3)'
              : '0 4px 6px -2px rgba(0, 0, 0, 0.05)',
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
          _hover: {
            bg: props.colorMode === 'dark' ? 'blue.600' : 'blue.700',
          },
        }),
        ghost: (props: any) => ({
          _hover: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.100',
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
      lightBg: 'white',
      darkBg: 'gray.800',
      lightHover: 'gray.50',
      darkHover: 'gray.700',
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
    },
    glass: {
      backdropFilter: 'blur(8px)',
      bg: 'whiteAlpha.800',
      _dark: {
        bg: 'blackAlpha.800',
      },
    },
  },
  textStyles: {
    h1: {
      fontSize: ['2xl', '3xl'],
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
    h2: {
      fontSize: ['xl', '2xl'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-0.5%',
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