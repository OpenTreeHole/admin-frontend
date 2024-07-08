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
                <el-table-column label="Operations">
                    <template #default="scope">
                        <el-button
                            type="danger"
                            @click="handleTransfer(scope.$index + (current_page - 1) * 20)"
                        >迁移</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </client-only>
        <el-pagination
            layout="prev, pager, next"
            :total="search.total_page"
            :current-page="current_page"
            :default-page-size="1"
            @update:current-page="changePage"
        />
    </template>

    <template v-else>
        <el-empty description="No Data" />
    </template>
    <el-dialog
        v-model="dialog_visibility"
        title="Transfer Tag"
        width="30%"
    >
        <el-input
            v-model="transfer.to"
            placeholder="请输入要迁移到的Tag"
        />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closeDialog()">Cancel</el-button>
                <el-button
                    type="primary"
                    @click="transfer_tag"
                >Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup async>

import { useLayoutStore } from '@/store/layout'
import { callApi } from '@/util/callApi'
import { tagListSchema, tagDeleteSchema, tagCreateSchema } from '~/api/treehole/tag'

const layoutStore = useLayoutStore()

layoutStore.title = "Tag Management"
layoutStore.path = [
    { name: "Home", path: "/" },
    { name: "Treehole" },
    { name: "Tag" }
]

// the following code is mess
// but it works

const current_page = ref(1)

const search = reactive({
    all_tag: [], // all the tags fetched from the server
    filtered_tag: [], // all_tag filtered by tag
    current_tag: [], // tags to be displayed
    tag: "", // the regex user inputed
    total_page: 0
})

async function load() { // load the tags from the server

    const { type, data } = await callApi(tagListSchema, {})

    search.tag = ""
    if (type == 'success') {
        search.all_tag = data
        dataChange(data) // dataChange called when filtered_tag should be changed.
        ElNotification({
            title: 'Successfully loaded data',
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
    console.log("TotalPage changd to ", search.total_page)
    current_page.value = 1
}

function handleTagInput() {
    // when the input changes
    // flush the filtered_tag
    try {
        let reg = new RegExp(search.tag)
        dataChange(search.all_tag.filter(item => reg.test(item.name)))
    } catch (e) {
        // ignore it
        // because reg may be invalid
    }
}

function changePage(to) { // the page changed, update the view
    current_page.value = to
    search.current_tag = search.filtered_tag.slice((current_page.value - 1) * 20, current_page.value * 20)
}

const dialog_visibility = ref(false)

const transfer = reactive({
    from_id: 0,
    to: "",
})

function handleTransfer(scope) {
    transfer.from_id = search.current_tag[scope].id
    dialog_visibility.value = true // open the dialog
}

function closeDialog() {
    dialog_visibility.value = false
    // do nothing
    transfer.to = ""
}

async function transfer_tag() {
    dialog_visibility.value = false

    if (transfer.to.length == 0) {
        ElNotification({
            title: 'Error',
            message: 'Tag cannot be empty.',
            position: 'bottom-right',
            type: 'error'
        })

        return
    }

    // find if the target tag exists
    const target_tag = search.all_tag.find(item => item.name == transfer.to)

    if (target_tag == undefined) {
        const { type, data } = await callApi(tagCreateSchema, {
            name: transfer.to
        })
        
        if (type !== 'success') {
            ElNotification({
                title: 'Error',
                message: 'Failed to create tag.',
                position: 'bottom-right',
                type: 'error'
            })
            return
        }
    } else if (target_tag.id == transfer.from_id) {
        // find if the target tag is the same as the current tag
        ElNotification({
            title: 'Error',
            message: 'Tag cannot be the same as the current tag.',
            position: 'bottom-right',
            type: 'error'
        })
        return
    }

    const { type, data } = await callApi(tagDeleteSchema, {
        to: transfer.to // payloads
    }, {
        id: transfer.from_id // params
    })

    if (type !== 'success') {
        ElNotification({
            title: 'Error',
            // message: data.message,
            position: 'bottom-right',
            type: 'error'
        })

        return
    }

    ElNotification({
        title: 'Successfully transfered tag',
        // message: data.message,
        position: 'bottom-right',
        type: 'success'
    })

    await load(); // the tags have changed, reload it to sync

    transfer.to = ""
}

</script>