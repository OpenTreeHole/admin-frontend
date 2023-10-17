import axios from 'axios'

const instance = axios.create({
    proxy: {
        protocol: 'https',
        host: 'auth.jingyijun.xyz',
        port: 9443
    },
    baseURL: "https://auth.jingyijun.xyz:9443/api",
    headers: {
        "Content-Type": "application/json",
        // "Host": "auth.jingyijun.xyz:9443"
    }
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

export default instance