<script lang="ts" setup>
import type { HeaderLink } from '#ui-pro/types'

const route = useRoute()
const user = useUserStore()

const links = computed<HeaderLink[]>(() => {
  const unlogined_links = [{
    label: '登录',
    icon: 'i-material-symbols-login-rounded',
    to: '/user/login',
    active: route.path.startsWith('/user/login'),
  }]

  if (! user.logined) {
    return unlogined_links
  }

  const default_links = [{
    label: '主页',
    icon: 'i-material-symbols-home-outline',
    to: '/',
    active: route.path === '/',
  }, {
    label: 'Tag迁移',
    icon: 'i-streamline-arrow-transfer-diagonal-3-solid',
    to: '/tag/transfer',
    active: route.path.startsWith('/tag/transfer'),
  }, {
    label: '发送站内信',
    icon: 'i-solar-dialog-2-bold',
    to: '/message',
    active: route.path.startsWith('/message'),
  }, {
    label: '开盒',
    icon: 'i-material-symbols-key-vertical-outline',
    to: '/decipher',
    active: route.path.startsWith('/decipher'),
  }, {
    label: '登出',
    icon: 'i-material-symbols-logout-rounded',
    to: '/user/logout',
    active: route.path.startsWith('/user/logout'),
  }]

  return default_links
})
</script>

<template>
  <div>
    <Header :links="links" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Footer />

    <UNotifications />
    <UModals />
    <USlideovers />
  </div>
</template>
