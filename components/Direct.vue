<template>
    <ul>
        <li v-for="item in target">
            <el-link type="primary" :href="item.path">{{ item.desc }}</el-link>
        </li>
    </ul>
</template>

<script setup>
    const { target } = defineProps(['target'])
</script>
