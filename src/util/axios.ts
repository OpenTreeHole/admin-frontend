import axios from 'axios'
import { AUTH, TREEHOLE } from './server'
import { access_token } from '../store'

const axios_auth = axios.create({
  baseURL: AUTH,
})

axios_auth.interceptors.request.use(
  (config) => {
    const token = access_token.value
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)  

const axios_treehole = axios.create({
  baseURL: TREEHOLE
})

axios_treehole.interceptors.request.use(
  (config) => {
    const token = access_token.value
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export {
  axios_auth,
  axios_treehole
}