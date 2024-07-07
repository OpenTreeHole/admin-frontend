<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>

body {
  margin: 0px;
  padding: 0px;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

</style>