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
import axios from '@/plugins/axios'

const form = reactive({
  email: '',
  password: ''
})

function submit() {
  axios.post('/login', form)
}
</script>
