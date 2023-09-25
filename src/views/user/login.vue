<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="password">
      <el-input v-model="form.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Login</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { login } from '@/api/user/login'
import { useUserStore } from '@/stores/user'

const form = reactive({
  email: '',
  password: ''
})

function submit() {
  login({
    email: form.email,
    password: form.password
  })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {})
}
</script>
