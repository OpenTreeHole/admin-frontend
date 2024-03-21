<template>
    <ul>
        <li v-for="item in target">
            <!-- <a :href="item.path">{{ item.desc }}</a> -->
            <el-link type="primary" :href="item.path">{{ item.desc }}</el-link>
        </li>
    </ul>
</template>

<script setup>
    const { target } = defineProps(['target'])
    console.log(target)
</script>
