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
import { useUserStore } from '@/store/user'
import { callApi } from '@/util/callApi'

const layoutStore = useLayoutStore()
const router = useRouter()
const userStore = useUserStore();

layoutStore.title = "Login"
layoutStore.path = [
    { name: "Home", path: "/" },
    { name: "User", path: '/user' },
    { name: "Login" }
]

let login_form = reactive({
    email: "",
    password: ""
})

const submit = async () => {
    
    let resp = await callApi('AUTH', '/login', {
        method: 'POST',
        body: {
            email: login_form.email,
            password: login_form.password
        }
    })

    userStore.access_token = resp.data.value.access;
    userStore.refresh_token = resp.data.value.refresh;

    if (userStore.logined) {
        router.push('/')
    }
}


</script>