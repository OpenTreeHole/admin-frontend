<template>
    <Direct :target="target"/>
</template>

<script setup>

import { useLayoutStore } from '@/store/layout'
const layoutStore = useLayoutStore()

layoutStore.title = 'Home'
layoutStore.path = [
    { name: "Home", path: "/" }
]

const target = [
    // { desc: "User", path: "/user" },
    // { desc: "Treehole", path: "/treehole" }
    { desc: "茶楼 Tag 管理", path: '/treehole/tag' }
]

</script>