// https://nuxt.com/docs/api/configuration/nuxt-config

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
  }
})
