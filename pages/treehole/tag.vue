<template>
    <p>123</p>
</template>

<script setup>

import { useLayoutStore } from '@/store/layout'
const layoutStore = useLayoutStore()

layoutStore.title = "Tag Management"
layoutStore.path = [
    { name: "Home", path: "/" },
    { name: "Treehole", path: "/treehole" },
    { name: "Tag" }
]

</script>