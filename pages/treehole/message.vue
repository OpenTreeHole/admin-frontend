<template>
  <el-text class="mx-1" style="margin: 5px;">站内信内容</el-text>
  <el-input
    v-model="message"
    style="width: 100%"
    :rows="3"
    type="textarea"
  />
  <div style="margin: 10px;" />
  <el-button v-for="item in default_message" @click="message=item.content">{{ item.title }}</el-button>
  <div style="margin: 10px;" />
  <el-text class="mx-1" style="margin: 5px;">收件人</el-text>
  <el-input v-model="receiver" placeholder="输入英文逗号分隔的数字"></el-input>
  <div style="margin: 20px;" />
  <el-button type="primary" @click="send">发送</el-button>

</template>

<script setup lang="ts">
import { callApi } from '@/util/callApi'
import { sendMessageSchema } from '~/api/treehole/message'

const message = ref('')

const receiver = ref('')

async function send() {
    const { type, data } = await callApi(sendMessageSchema, {
        description: message.value,
        recipients: receiver.value.split(',').map(Number).filter(Boolean)
    })
    if (type == 'success') {
        ElNotification({
            title: '发送成功',
            position: 'bottom-right',
            type: 'success'
        })
    } else {
        ElNotification({
            title: '发送失败',
            position: 'bottom-right',
            type: 'error'
        })
    }
}

const default_message = [
    { title: "清空", content: "" },
    { title: "截图外传", content: "检测到您外传茶楼截图，特此警告。如有下次，将依据社区公约封禁。"}
]

</script>
