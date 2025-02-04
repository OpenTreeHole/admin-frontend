<template>
  <div class="flex justify-center">
    <UCard
        class="max-w-sm w-full mx-auto my-2 sm:my-4 md:my-8 rounded-lg shadow-md"
    >
      <template #header>
        <h1>服务条款</h1>
      </template>
      <div v-for="line in lines" :key="line">{{ line }}</div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const lines = ref<string[]>(generateLines());

function generateLines() {
  const lines = [];
  for (let i = 0; i < 20; i++) {
    const count = Math.floor(Math.random() * 20) + 1;
    lines.push('喵'.repeat(count));
  }
  return lines;
}
</script>
