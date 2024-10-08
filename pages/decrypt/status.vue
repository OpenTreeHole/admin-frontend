<template>
  <el-text class="mx-1" style="margin: 5px;">User ID</el-text>
  <el-input
    v-model="user_id"
    clearable
  />
  <div style="margin: 20px;" />
  <el-button type="primary" @click="query">查询</el-button>
  <div style="margin: 20px;" />

  <template v-if="visibility">
    <el-text class="mx-1" style="margin: 5px;">解密状态：{{ status ? '已' : '未' }}解密</el-text>
    <div style="margin: 10px;" />

    <el-text class="mx-1" style="margin: 5px;">参与解密者</el-text>
    <div style="margin: 10px;" />

    <ul>
      <li v-for="identity_name in identity_names" :key="identity_name">{{ identity_name }}</li>
    </ul>

    <div style="margin: 10px;" />

    <el-text class="mx-1" style="margin: 5px;" v-if="status">解密后的邮箱：{{ email }}</el-text>
  </template>
</template>

<script setup lang="ts">
import { getDecryptStatusSchema, getDecryptedEmailSchema } from '~/api/shamir/decrypt';
import { callApi } from '~/util/callApi';

const user_id = ref('')

const visibility = ref(false)
const status = ref(false)
const identity_names = ref([])
const email = ref('')

async function query() {
  const { type, data } = await callApi(getDecryptStatusSchema, {}, {
    user_id: user_id.value
  })

  if (type !== 'success') {
    ElNotification({
      title: '查询失败',
      message: data.message,
      position: 'bottom-right',
      type: 'error'
    })
    return
  }

  status.value = data.shamir_upload_ready
  identity_names.value = data.uploaded_shares_identity_names
  if (status.value) {
    const { type, data } = await callApi(getDecryptedEmailSchema, {}, {
      user_id: user_id.value
    })

    if (type !== 'success') {
      ElNotification({
        title: '查询失败',
        message: data.message,
        position: 'bottom-right',
        type: 'error'
      })
      return
    }

    email.value = data.user_email
  }
  
  ElNotification({
    title: '查询成功',
    position: 'bottom-right',
    type: 'success'
  })

  visibility.value = true
}

</script>