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
import { loginSchema } from '@/api/user/login';

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
    
    const { type, data } = await callApi(loginSchema, {
        email: login_form.email,
        password: login_form.password
    })

    if (type == 'success') {
        userStore.login(data.access, data.refresh)
        ElNotification({
            title: 'Successfully logined',
            message: data.message,
            position: 'bottom-right',
            type: 'success'
        })
        router.push('/')
    } else if (type == 'fail') {
        ElNotification({
            title: 'Failed to logined',
            message: data.message,
            position: 'bottom-right',
            type: 'error'
        })
    } else {
        ElNotification({
            title: 'Unknown error',
            message: '?',
            position: 'bottom-right',
            type: 'error'
        })
    }
    
}


</script>