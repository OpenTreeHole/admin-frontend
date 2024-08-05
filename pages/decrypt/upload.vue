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
import { decryptSchema } from '~/api/shamir/decrypt';
import { callApi } from '~/util/callApi';

const layoutStore = useLayoutStore();

layoutStore.title = "上传解密后数据"
layoutStore.path = [
  { name: "Home", path: "/" },
  { name: "Decrypt" },
  { name: "Upload" }
]

const identity_name = ref('')
const share = ref('')
const user_id = ref('')

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