<template>
    <Direct :target="target" />
</template>

<script setup>

import { useLayoutStore } from '@/store/layout'
const layoutStore = useLayoutStore()

layoutStore.title = "Treehole"
layoutStore.path = [
    { name: "Home", path: "/" },
    { name: "Treehole", path: '/treehole' }
]

const target = [
    { desc: "Tag", path: "/treehole/tag" }
]

</script>