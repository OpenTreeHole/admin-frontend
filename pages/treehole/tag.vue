<template>
    <el-form :model="search">
        <el-form-item label="Tag">
            <el-input
                v-model="search.tag"
                placeholder="请输入要查找的Tag，支持正则表达式"
                @input="handleTagInput"
            />
        </el-form-item>
        <el-form-item>
            <el-button
                type="primary"
                @click="load()"
            >Load Data</el-button>
        </el-form-item>
    </el-form>
    <template v-if="search.current_tag.length > 0">
        <client-only>
            <el-table
                :data="search.current_tag"
                style="width: 100%;"
            >
                <el-table-column prop="id" label="ID"/>
                <el-table-column prop="name" label="Name"/>
                <el-table-column prop="temperature" label="Temperature"/>
            </el-table>
        </client-only>
        <el-pagination
            layout="prev, pager, next"
            :total="search.total_page"
            :current-page="current_page"
            @update:current-page="changePage"
        />
    </template>

    <template v-else>
        <el-empty description="No Data" />
    </template>
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

const current_page = ref(1)

const search = reactive({
    all_tag: [],
    filtered_tag: [], // all_tag filtered by tag
    current_tag: [],
    tag: "",
    total_page: 0,
    current_path: 1
})

async function load() {
    if (search.all_tag.length > 0) {
        return;
    }

    const { type, data } = await callApi(tagListSchema, { tag: search.tag })
    // console.log(data)

    if (type == 'success') {
        search.all_tag = data
        dataChange(data)
        ElNotification({
            title: 'Successfully loaded data',
            // message: data.message,
            position: 'bottom-right',
            type: 'success'
        })
    }
}

function dataChange(data) {
    search.filtered_tag = data

    // reset the paging.
    search.current_tag = search.filtered_tag.slice(0, 20)
    search.total_page = Math.ceil(search.filtered_tag.length / 20)
    current_page.value = 1
}

function handleTagInput() {
    try {
        let reg = new RegExp(search.tag)
        dataChange(search.all_tag.filter(item => reg.test(item.name)))
    } catch (e) {
        // ignore it
        // because reg may be invalid
    }
}

function changePage(to) {
    current_page.value = to;
    search.current_tag = search.filtered_tag.slice((current_page.value - 1) * 20, current_page.value * 20)
}

</script>