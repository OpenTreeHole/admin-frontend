<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="手动解密" name="manual">
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
    </el-tab-pane>
    <el-tab-pane label="自动解密" name="auto">
      <el-text class="mx-1" style="margin: 5px;">User ID</el-text>
      <el-input
        v-model="user_id"
        clearable
      />
      <div style="margin: 10px;" />
      <el-text class="mx-1" style="margin: 5px;">上传密钥文件，或者在文本框中输入密钥</el-text>
      <div style="margin: 10px;" />

      <el-upload
        drag
        :http-request="handleUpload"
      >
        <!-- <el-icon class="el-icon--upload"><upload-filled /></el-icon> -->
        <div class="el-upload__text">
          将密钥文件拖到此处，或<em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            密钥信息将在本地处理，不会上传到旦挞或任何第三方服务器
          </div>
        </template>
      </el-upload>
      <div style="margin: 10px;" />
      <el-text class="mx-1" style="margin: 5px;">密钥内容</el-text>
      <el-input
        v-model="secret_key"
        :rows="5"
        type="textarea"
        clearable
      />
      <div style="margin: 10px;" />
      <el-text class="mx-1" style="margin: 5px;" type="password">Password</el-text>
      <el-input
        v-model="password"
        clearable
      />
      <div style="margin: 20px;" />
      <el-button type="primary" @click="decrypt">解密</el-button>
    </el-tab-pane>
  </el-tabs>


</template>

<script setup lang="ts">
import { decryptSchema, getPGPMessageSchema } from '~/api/shamir/decrypt';
import { callApi } from '~/util/callApi';
import * as openpgp from 'openpgp';

const activeTab = ref('manual')

const cipher = ref('')

const identity_name = ref('')
const share = ref('')
const user_id = ref('')

const password = ref('')
const secret_key = ref('')

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

const handleUpload = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    secret_key.value = e.target.result 
  }
  reader.readAsText(file.file)
  return false
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

async function decrypt() {
  // parse identity name from secret_key
  const parsed = await openpgp.readKey({ armoredKey: secret_key.value })
  const identity = parsed.users[0].user.userId.userid
  const identity_name = identity.split('<')[0]
  const { type, data } = await callApi(getPGPMessageSchema, {
    identity_name
  }, {
    user_id: user_id.value
  })

  if (type !== 'success') {
    ElNotification({
      title: '获取原文失败',
      message: data.message,
      position: 'bottom-right',
      type: 'error'
    })
  }

  const cipher = data.pgp_message

  // decrypt with secret-key and password
  const { data: decrypted } = await openpgp.decrypt({
    message: await openpgp.readMessage({ armoredMessage: cipher }),
    decryptionKeys: [await openpgp.readPrivateKey({ armoredKey: secret_key.value })],
    passwords: [password.value]
  })

  { // just to avoid redefinition warning
    const { type, data } = await callApi(decryptSchema, {
      identity_name,
      share: decrypted,
      user_id: parseInt(user_id.value)
    })

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
}
</script>