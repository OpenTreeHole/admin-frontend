<template>
    <p>123</p>
</template>

<script setup>

import { useLayoutStore } from '@/store/layout'

const layoutStore = useLayoutStore()

layoutStore.title = '666'

</script>