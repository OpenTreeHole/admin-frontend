<template>
  <UCard class="max-w-sm w-full mx-auto p-4 rounded-lg shadow-md">
    <template #header>
      <b>发送站内信</b>
    </template>
    <UFormGroup label="站内信内容">
      <UTextarea v-model="message" />
    </UFormGroup>
    <div style="margin: 10px" />
    <UButtonGroup size="sm" orientation="horizontal">
      <UButton
        v-for="item in default_message"
        @click="message = item.content"
        color="white"
        >{{ item.title }}</UButton
      >
    </UButtonGroup>
    <div style="margin: 10px" />
    <UFormGroup label="收件人">
      <UInput v-model="receiver" placeholder="输入英文逗号分隔的数字" />
    </UFormGroup>
    <template #footer>
      <UButton @click="sendMessage" color="primary">发送</UButton>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { callApi } from "@/api/api";
import { sendMessageSchema } from "~/api/treehole/message";

const default_message = [
  { title: "清空", content: "" },
  {
    title: "截图外传",
    content: "检测到您外传茶楼截图，特此警告。如有下次，将依据社区公约封禁。",
  },
];

const message = ref("");

const receiver = ref("");

async function sendMessage() {
  const toast = useToast();

  if (
    message.value === "" ||
    receiver.value.split(",").map(Number).filter(Boolean).length === 0
  ) {
    toast.add({ title: "信息填写有误，请仔细检查", color: "red" });
    return;
  }

  const { type } = await callApi(sendMessageSchema, {
    description: message.value,
    recipients: receiver.value.split(",").map(Number).filter(Boolean),
  });

  if (type === "success") {
    toast.add({ title: "发送成功", color: "green" });
  } else {
    toast.add({ title: "发送失败", color: "red" });
  }
}
</script>
