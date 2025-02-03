<script setup lang="ts">
const { $ui } = useNuxtApp()

const links = []
</script>

<template>
  <UFooter :links="links">
    <template #left>
      <NuxtLink to="https://github.com/Zecyel/ai" target="_blank" class="text-sm text-gray-500 dark:text-gray-400">
        Published under <span class="text-gray-900 dark:text-white">MIT License</span>
      </NuxtLink>
    </template>

    <template #right>
      <UButton aria-label="AIPlatform Website" icon="i-simple-icons-nuxtdotjs" to="http://ai.zecyel.xyz/" target="_blank" v-bind="($ui.button.secondary as any)" />
      <UButton aria-label="Nuxt UI on GitHub" icon="i-simple-icons-github" to="https://github.com/Zecyel/ai" target="_blank" v-bind="($ui.button.secondary as any)" />
    </template>
  </UFooter>
</template>
