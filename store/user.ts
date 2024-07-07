import { defineStore } from "pinia"

export const useUserStore = defineStore('user', {
    state: () => ({
        access_token: undefined,
        refresh_token: undefined,
        username: ""
    }),
    // getters
    getters: {
        logined: (state): boolean => {
            return state.access_token !== undefined
        },
    },
    actions: {
        login(access, refresh): boolean {
            if (access == undefined || refresh == undefined) {
                return false;
            }
            this.access_token = access;
            this.refresh_token = refresh;
            return true;
        },
        logout() {
            this.access_token = undefined
            this.refresh_token = undefined
        },
        setUsername(username: string) {
            this.username = username
        }
    },
    persist: true
})