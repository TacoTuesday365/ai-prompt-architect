import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
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
          bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
          borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.200',
          boxShadow: props.colorMode === 'dark' ? 'dark-lg' : 'lg',
          borderRadius: 'xl',
          transition: 'all 0.3s ease-in-out',
          _hover: {
            transform: 'translateY(-4px)',
            boxShadow: props.colorMode === 'dark' ? '2xl' : 'xl',
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
  },
  colors: {
    tile: {
      lightBg: 'white',
      darkBg: 'gray.700',
      lightHover: 'gray.50',
      darkHover: 'gray.600',
      lightBorder: 'gray.200',
      darkBorder: 'gray.600',
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
  },
})

export default theme 