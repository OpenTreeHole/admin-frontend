// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],

  pinia: {
    storesDirs: ['./store/**'],
  },

  piniaPersistedstate: {
    storage: 'cookies',
  },

  runtimeConfig: {
    public: {
      authBase: process.env.NUXT_PUBLIC_AUTH_BASE || 'http://localhost:3000',
      treeHoleBase: process.env.NUXT_PUBLIC_TREE_HOLE_BASE || 'http://localhost:3001',
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
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: '🌴管理后台🌴',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  
  compatibilityDate: '2025-02-03',
})