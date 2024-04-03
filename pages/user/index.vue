<template>
    <Direct :target="target" />
</template>

<script setup>

import { useLayoutStore } from '@/store/layout'
const layoutStore = useLayoutStore()

layoutStore.title = "User"
layoutStore.path = [
    { name: "Home", path: "/" },
    { name: "User", path: '/user' }
]

const target = [
    { desc: "Login", path: "/user/login" },
    { desc: "Logout", path: "/user/logout" }
]

</script>