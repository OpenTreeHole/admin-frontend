import axios from 'axios'

const axios_auth = axios.create({
    baseURL: "https://auth.jingyijun.xyz:9443/api",
})

const axios_treehole = axios.create({
    
})

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token')
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

export {
    axios_auth
}