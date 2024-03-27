<template>
    <el-form :model="login_form">
        <el-form-item label="Email">
            <el-input v-model="login_form.email" />
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
import { api, Server } from '@/util/api'

const layoutStore = useLayoutStore()

layoutStore.title = "Login"
layoutStore.path = [
    { name: "User", path: '/user' },
    { name: "Login" }
]

let login_form = reactive({
    email: "",
    password: ""
})

const submit = async () => {
    console.log(login_form.email)
    console.log(login_form.password)
    
    let resp = await useFetch(api(Server.AUTH, '/login'), {
        method: 'POST',
        body: {
            email: login_form.email,
            password: login_form.password
        }
    })

    console.log(resp.data.value.access)
}

</script>