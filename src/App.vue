<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ElDivider, ElContainer, ElAside, ElHeader, ElCol, ElRow, ElMain } from 'element-plus'
</script>

<template>
  <ElContainer>
    <ElHeader>
      <ElRow>
        <ElCol :span="8">
          <RouterLink to="/">
            <p class="text-2xl pl-8 pt-5">Admin Panel</p>
          </RouterLink>
        </ElCol>
      </ElRow>
      <ElDivider />
    </ElHeader>
    <ElContainer class="pt-2">
      <ElAside width="4%"></ElAside>
      <ElMain>
        <RouterView />
      </ElMain>
      <ElAside width="4%"></ElAside>
    </ElContainer>
  </ElContainer>
</template>

<style scoped></style>
