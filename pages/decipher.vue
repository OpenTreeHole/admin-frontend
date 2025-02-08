<template>
  <UCard class="max-w-sm w-full mx-auto p-4 rounded-lg shadow-md">
    <template #header>
      <UTabs
        :items="items"
        class="w-full"
        @change="(indx) => (selected = indx)"
      />
    </template>
    <template v-if="selected === 0">
      <UFormGroup label="User ID" class="my-3" style="margin: 5px">
        <UInput v-model="user_id" clearable />
      </UFormGroup>
      <UButton class="my-3" type="primary" @click="query">查询</UButton>
      <template v-if="visibility">
        <p class="my-3" style="margin: 5px">
          解密状态：{{ status ? "已" : "未" }}解密
        </p>
        <p class="my-3" style="margin: 5px">参与解密者：</p>
        <ul class="px-5 my-3">
          <li v-for="identity_name in identity_names" :key="identity_name">
            {{ identity_name }}
          </li>
        </ul>
        <p class="my-3" style="margin: 5px" v-if="status">
          解密后的邮箱：{{ email }}
        </p>
      </template>
    </template>
    <template v-else>
      <p>456</p>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { callApi } from "@/api/api";
import {
  getDecryptStatusSchema,
  getDecryptedEmailSchema,
} from "@/api/shamir/decrypt";

const items = [
  {
    label: "查询解密状态",
  },
  {
    label: "解密用户数据",
  },
];

const selected = ref(0);
const user_id = ref("");
const visibility = ref(false);
const status = ref(false);
const identity_names = ref<string[]>([]);
const email = ref("");

async function query() {
  const { type, data } = await callApi(
    getDecryptStatusSchema,
    {},
    {
      user_id: user_id.value,
    }
  );
  const toast = useToast();

  if (type !== "success") {
    toast.add({ title: "查询失败", description: data.message, color: "red" });
    return;
  }

  status.value = data.shamir_upload_ready;
  identity_names.value = data.uploaded_shares_identity_names;
  if (status.value) {
    const { type, data } = await callApi(
      getDecryptedEmailSchema,
      {},
      {
        user_id: user_id.value,
      }
    );

    if (type !== "success") {
      toast.add({ title: "查询失败", description: data.message, color: "red" });
      return;
    }

    email.value = data.user_email;
  }

  toast.add({ title: "查询成功", color: "green" });
  visibility.value = true;
}
</script>
