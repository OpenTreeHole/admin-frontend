<template>
    <el-form :model="search">
        <el-form-item label="Tag">
            <el-input v-model="search.tag" placeholder="请输入要查找的Tag，支持正则表达式" />
        </el-form-item>
        <el-form-item>
            <el-button
                type="primary"
                @click="load()"
            >Load Data</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup async>

import { useLayoutStore } from '@/store/layout'
import { callApi } from '@/util/callApi'
import { tagListSchema } from '~/api/treehole/tag'
const layoutStore = useLayoutStore()

layoutStore.title = "Tag Management"
layoutStore.path = [
    { name: "Home", path: "/" },
    { name: "Treehole", path: "/treehole" },
    { name: "Tag" }
]

const search = reactive({
    all_tag: [],
    tag: ""
})

async function load() {

    const { type, data } = await callApi(tagListSchema, { tag: search.tag })

    console.log(data)

    if (type == 'success') {

        search.all_tag = data
        ElNotification({
            title: 'Successfully loaded data',
            // message: data.message,
            position: 'bottom-right',
            type: 'success'
        })
    }

}

</script>