// https://nuxt.com/docs/api/configuration/nuxt-config

const dotenv = require('dotenv')
dotenv.config()

export default defineNuxtConfig({
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  elementPlus: { /** Options */ },
  devtools: { enabled: true },
  pinia: {
    storesDirs: ['./store/**'],
  },
  piniaPersistedstate: {
    storage: 'cookies',
  },
  runtimeConfig: {
    public: {
      authBase: '',
      treeHoleBase: '',
    }
  },
  nitro: {
    devProxy: {
      "/AUTH": {
        target: process.env.NUXT_PUBLIC_AUTH_BASE,
        changeOrigin: true,
        prependPath: true,
      },
      "/TREEHOLE": {
        target: process.env.NUXT_PUBLIC_TREE_HOLE_BASE,
        changeOrigin: true,
        prependPath: true,
      }
    }
  }
})
