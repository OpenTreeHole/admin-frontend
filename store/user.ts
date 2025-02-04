import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore('user', () => {
    const access_token = ref("")
    const refresh_token = ref("")
    const email = ref("")
    const logined = computed(() => access_token.value != "" && refresh_token.value != "")

    function login(access: string, refresh: string) {
        if (access == "" || refresh == "") {
            return false;
        }
        access_token.value = access;
        refresh_token.value = refresh;
        return true;
    }

    function logout() {
        access_token.value = ""
        refresh_token.value = ""
    }

    function setEmail(name: string) {
        email.value = name
    }

    return {
        // fields
        access_token,
        refresh_token,
        email,
        logined,

        // actions
        login,
        logout,
        setEmail,
    }
})