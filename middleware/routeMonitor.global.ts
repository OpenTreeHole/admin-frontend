import { useUserStore } from "~/store/user"

// const user = useUserStore()
let user: ReturnType<typeof useUserStore> | undefined = undefined;

export default defineNuxtRouteMiddleware((to, from) => {
    if (user == undefined) {
        user = useUserStore(); // delayed initialization
    }
    // return navigateTo(to);
    if (! user.logined && to.path != '/user/login') {
        return navigateTo('/user/login')
    }
})