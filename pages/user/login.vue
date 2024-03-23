<template>
    <el-form :model="login_form">
        <el-form-item label="Username">
            <el-input v-model="login_form.username" />
        </el-form-item>
        <el-form-item label="Password">
            <el-input v-model="login_form.password" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">Login</el-button>
        </el-form-item>
    </el-form>

</template>

<script setup>

import { useLayoutStore } from '@/store/layout'
const layoutStore = useLayoutStore()

layoutStore.title = "Login"
layoutStore.path = [
    { name: "User", path: '/user' },
    { name: "Login" }
]

let login_form = reactive({
    username: "",
    password: ""
})

const submit = () => {
    console.log(login_form.username)
    console.log(login_form.password)
}

</script>