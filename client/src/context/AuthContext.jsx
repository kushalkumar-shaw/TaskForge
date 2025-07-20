import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import api from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          api.defaults.headers.common['x-auth-token'] = token
          const { data } = await api.get('/api/auth/me')
          setUser(data)
          setIsAuthenticated(true)
        }
      } catch (err) {
        console.error('Auth check failed:', err)
        logout()
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/api/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      api.defaults.headers.common['x-auth-token'] = data.token
      const userRes = await api.get('/api/auth/me')
      setUser(userRes.data)
      setIsAuthenticated(true)
      toast.success('Logged in successfully')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Login failed')
      throw err
    }
  }

  const register = async (username, email, password) => {
    try {
      const { data } = await api.post('/api/auth/register', { username, email, password })
      localStorage.setItem('token', data.token)
      api.defaults.headers.common['x-auth-token'] = data.token
      const userRes = await api.get('/api/auth/me')
      setUser(userRes.data)
      setIsAuthenticated(true)
      toast.success('Account created successfully')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Registration failed')
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['x-auth-token']
    setUser(null)
    setIsAuthenticated(false)
    navigate('/login')
    toast.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)