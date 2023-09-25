import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    email: '',
    accessToken: '',
    refreshToken: ''
  }),
  getters: {
    logined(state) {
      return state.accessToken !== ''
    }
  },
  actions: {
    logout() {
      ;(this.email = ''), (this.accessToken = this.refreshToken = '')
    }
  }
})
