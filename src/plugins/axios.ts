import axios from 'axios'
import NProgress from 'nprogress'

const port = import.meta.env.PROD ? 57257 + '/api/v1' : 11451

const instance = axios.create({
  baseURL: 'http://localhost:' + port
})

instance.interceptors.request.use(
  (config) => {
    NProgress.start()
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => {
    NProgress.done()
    return response
  },
  (error) => {
    NProgress.done()
    return Promise.reject(error)
  }
)

export default instance
