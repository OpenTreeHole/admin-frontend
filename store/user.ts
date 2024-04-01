import { defineStore } from "pinia"

export const useUserStore = defineStore('user', {
    state: () => ({
        access_token: "",
        refresh_token: "",
    }),
    // getters
    getters: {
        logined: (state) => state.access_token !== "",
    },

})