import { defineStore } from 'pinia'
import { ref } from 'vue'

export const UserStore = defineStore('UserStore', () => {
  const email = ref('')
  const access_token = ref('')
  const refresh_token = ref('')
})
