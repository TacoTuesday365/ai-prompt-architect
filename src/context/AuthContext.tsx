import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is already authenticated (stored in sessionStorage)
    const authStatus = sessionStorage.getItem('isAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const login = (password: string) => {
    const correctPassword = import.meta.env.VITE_APP_PASSWORD
    
    if (!correctPassword) {
      console.error('App password not configured')
      return false
    }

    if (password === correctPassword) {
      setIsAuthenticated(true)
      sessionStorage.setItem('isAuthenticated', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('isAuthenticated')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
