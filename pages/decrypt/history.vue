<template>
  <el-text class="mx-1" style="margin: 5px;">Identity Name</el-text>
  <el-input
    v-model="identity_name"
    clearable
  />
  <!-- TODO: I need a fake identity-name for placeholder -->
  <div style="margin: 20px;" />
  <el-button type="primary" @click="query">查询</el-button>
  <template v-if="history.length > 0">
    <div style="margin: 20px;" />
    <el-table :data="history" style="width: 100%">
      <el-table-column prop="user_id" label="User ID"/>
      <el-table-column prop="pgp_message" label="PGP Message"/>
    </el-table>
  </template>
</template>

<script setup lang="ts">
import { getDecryptHistorySchema } from '~/api/shamir/decrypt';
import { callApi } from '~/util/callApi';

const identity_name = ref('')

const history = ref([])

async function query() {
  const { type, data } = await callApi(getDecryptHistorySchema, {
    identity_name: identity_name.value
  })
  if (type !== 'success') {
    ElNotification({
      title: '查询失败',
      message: data.message,
      position: 'bottom-right',
      type: 'error'
    })
  } else {
    ElNotification({
      title: '查询成功',
      position: 'bottom-right',
      type: 'success'
    })
    history.value = data
  }
}

</script>