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
    { desc: "Home", path: "/" },
    { desc: "About", path: "/about" },
]

</script>