import axios from 'axios'
import { AUTH, TREEHOLE } from './server'
import { access_token, refresh_token } from '../store'

export const axios_auth = axios.create({
  baseURL: AUTH,
})

axios_auth.interceptors.request.use(
  (config) => {
    const token = refresh_token.value
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
) // 调用 axios_auth 需要携带 token 的场景目前只有 refreshJwtToken，所以 token 默认用了 refresh_token

export const axios_treehole = axios.create({
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