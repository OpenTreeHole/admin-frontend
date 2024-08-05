<template>
  <el-text class="mx-1" style="margin: 5px;">User ID</el-text>
  <el-input
    v-model="user_id"
    clearable
  />
  <div style="margin: 10px;" />
  <el-text class="mx-1" style="margin: 5px;">Identity Name</el-text>
  <el-input
    v-model="identity_name"
    clearable
  />
  <div style="margin: 20px;" />
  <el-button type="primary" @click="get_cipher">获取密文</el-button>
  <div style="margin: 10px;" />
  <el-text class="mx-1" style="margin: 5px;">密文：{{ cipher }}</el-text>
  <div style="margin: 10px;" />
  <el-text class="mx-1" style="margin: 5px;">Share</el-text>
  <el-input
    v-model="share"
    :rows="3"
    type="textarea"
    clearable
  />
  <div style="margin: 20px;" />
  <el-button type="primary" @click="upload">上传</el-button>
</template>

<script setup lang="ts">
import { decryptSchema, getPGPMessageSchema } from '~/api/shamir/decrypt';
import { callApi } from '~/util/callApi';

const layoutStore = useLayoutStore();

layoutStore.title = "解密用户数据"
layoutStore.path = [
  { name: "Home", path: "/" },
  { name: "Decrypt" },
  { name: "Upload" }
]

const cipher = ref('')

const identity_name = ref('')
const share = ref('')
const user_id = ref('')

async function get_cipher() {
  const { type, data } = await callApi(getPGPMessageSchema, {
    identity_name: identity_name.value,
  }, {
    user_id: user_id.value
  })

  if (type === 'success') {
    cipher.value = data.pgp_message
    ElNotification({
      title: '获取成功',
      position: 'bottom-right',
      type: 'success'
    })
  } else {
    ElNotification({
      title: '获取原文失败',
      message: data.message,
      position: 'bottom-right',
      type: 'error'
    })
  }
}

async function upload() {

  const userid = parseInt(user_id.value)
  if (isNaN(userid)) {
    ElNotification({
      title: '上传失败',
      message: 'User ID 必须为数字',
      position: 'bottom-right',
      type: 'error'
    })
    return
  }

  const { type, data } = await callApi(decryptSchema, {
    identity_name: identity_name.value,
    share: share.value,
    user_id: userid
  })

  console.log(type, data)
  if (type === 'success') {
    ElNotification({
      title: '上传成功',
      message: data.message,
      position: 'bottom-right',
      type: 'success'
    })
  } else {
    ElNotification({
      title: '上传失败',
      message: data.message,
      position: 'bottom-right',
      type: 'error'
    })
  }
}
</script>