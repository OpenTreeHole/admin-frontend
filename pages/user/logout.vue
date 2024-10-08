<template>
    <el-button type="primary" @click="logout()">Logout</el-button>
</template>

<script setup>
const userStore = useUserStore()

function logout() {
    userStore.logout();
    const route = useRouter();
    route.push('/login');
}
</script>