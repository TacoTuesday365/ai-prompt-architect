import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
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
        bg: props.colorMode === 'dark' ? '#0A0A0A' : '#FFFFFF',
        color: props.colorMode === 'dark' ? '#E2E8F0' : '#1A202C',
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
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'lg',
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.600' : 'brand.400',
          },
        }),
        outline: (props: any) => ({
          borderColor: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.200',
          color: props.colorMode === 'dark' ? 'white' : 'gray.800',
          _hover: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'gray.50',
          },
        }),
      },
    },
    Input: {
      variants: {
        filled: (props: any) => ({
          field: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.50' : 'gray.50',
            _hover: {
              bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'gray.100',
            },
            _focus: {
              bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'gray.100',
              borderColor: 'brand.500',
            },
          },
        }),
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    Link: {
      baseStyle: (props: any) => ({
        color: props.colorMode === 'dark' ? 'brand.200' : 'brand.600',
        _hover: {
          textDecoration: 'none',
          color: props.colorMode === 'dark' ? 'brand.100' : 'brand.700',
        },
      }),
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
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#2196F3',
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1',
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