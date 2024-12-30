import axios from 'axios'
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

// Create axios instance with default settings
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL, 
  timeout: 35000,
  headers: {
    'Content-Type': 'application/json', 
  },
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error) => {
    return Promise.reject(error) 
  },
)


instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  },
)

export default instance
