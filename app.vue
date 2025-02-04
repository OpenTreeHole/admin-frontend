<script lang="ts" setup>
import type { HeaderLink } from '#ui-pro/types'

const route = useRoute()
// const user = useUserStore()

const user = {
  isLogin: () => true
}

const links = computed<HeaderLink[]>(() => {
  const unlogined_links = [{
    label: '登录',
    icon: 'i-material-symbols-login-rounded',
    to: '/user/login',
    active: route.path.startsWith('/user/login'),
  }]

  if (!user.isLogin()) {
    return unlogined_links
  }

  const default_links = [{
    label: 'Tag迁移',
    icon: 'i-material-symbols-home',
    to: '/tag/transfer',
    active: route.path.startsWith('/tag/transfer'),
  }, {
    label: '发送站内信',
    icon: 'i-material-symbols-how-to-vote-outline-rounded',
    to: '/message',
    active: route.path.startsWith('/message'),
  }, {
    label: '开盒',
    icon: 'i-material-symbols-logout-rounded',
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
