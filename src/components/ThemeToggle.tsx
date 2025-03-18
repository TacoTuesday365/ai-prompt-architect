import { Button, useColorMode } from '@chakra-ui/react'
import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { toggleColorMode } = useColorMode()

  const handleToggle = () => {
    toggleTheme()
    toggleColorMode()
  }

  return (
    <Button
      onClick={handleToggle}
      className={theme === 'dark' ? 'glass-button' : ''}
      size="md"
      position="fixed"
      top="4"
      right="4"
      zIndex={1000}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  )
} 