import axios from 'axios'
import { toast } from 'react-hot-toast'

const api = axios.create({
  baseURL: 'http://localhost:5000/',
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/api/login'
      toast.error('Session expired. Please login again.')
    }
    return Promise.reject(error)
  }
)

export default api