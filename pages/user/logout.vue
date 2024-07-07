<template>
    <el-button type="primary" @click="logout()">Logout</el-button>
</template>

<script setup>
import { useLayoutStore } from '@/store/layout'
// import { useUserStore } from '@/store/user'

const layoutStore = useLayoutStore()
const userStore = useUserStore()

layoutStore.title = "Logout"
layoutStore.path = [
    { name: "Home", path: "/" },
    { name: "User", path: '/user' },
    { name: "Logout" }
]

function logout() {
    userStore.logout();
    const route = useRouter();
    route.push('/login');
}
</script>