<template>
  <ul>
    <li v-for="item in target">
      <el-link type="primary" :href="item.path">{{ item.desc }}</el-link>
    </li>
  </ul>
</template>

<script setup>

import { useLayoutStore } from '@/store/layout'
const layoutStore = useLayoutStore()

layoutStore.title = 'Home'
layoutStore.path = [
    { name: "Home", path: "/" }
]

const target = ref([
    // { desc: "User", path: "/user" },
    // { desc: "Treehole", path: "/treehole" }
    { desc: "茶楼 Tag 管理", path: '/treehole/tag' },
    { desc: "发送站内信", path: '/treehole/message' },
    { desc: "我的解密历史", path: '/decrypt/history' },
    { desc: "解密用户数据", path: '/decrypt/upload' },
    { desc: "查询解密状态", path: '/decrypt/status' }
])

</script>