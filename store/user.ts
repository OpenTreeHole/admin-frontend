import { defineStore } from "pinia"

export const useUserStore = defineStore('user', {
    state: () => ({
        access_token: undefined,
        refresh_token: undefined,
    }),
    // getters
    getters: {
        logined: (state): boolean => state.access_token !== undefined,
    },
    persist: true
})