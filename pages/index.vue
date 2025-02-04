<script setup lang="ts">

// 定义页面的数据
const page = ref({
  title: '🌴管理后台🌴',
  description: '邦邦卡邦！欢迎来到旦挞🌴管理后台🌴喵！', // will not show on page
  hero: {
    title: 'Manage TreeHole on Fingertips',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    links: [
      {
        'label': 'Get started',
        // icon: 'i-heroicons-arrow-right-20-solid',
        // icon: 'i-heroicons-rocket-launch',
        // trailing: true,
        'trailing-icon': 'i-heroicons-arrow-small-right',
        'to': '#utils',
        'size': 'xl',
        // style: {
        //   borderRadius: '9999px',
        //   padding: '1rem 2rem',
        // },
      },
    ],
  },
  utils: {
    // headline: 'Utilities',
    title: 'Quick Access',
    description: '',
    items: [
      {
        title: 'Tag迁移',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        link: '/tag/transfer',
        icon: 'i-streamline-arrow-transfer-diagonal-3-solid',
      },
      {
        title: '发送站内信',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        link: '/message',
        icon: 'i-solar-dialog-2-bold',
      },
      {
        title: '开盒',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        link: '/decipher',
        icon: 'i-material-symbols-key-vertical-outline',
      },
      {
        title: '我也不知道写什么了先放把椅子在这里',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        link: '/chair',
        icon: 'i-material-symbols-chair-alt-outline-rounded',
      },
    ],
  },
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
    />

    <!-- utils Section -->
    <ULandingSection

      icon="i-heroicons-rocket-launch"
      :title="page.utils.title"
      :description="page.utils.description"
    >
      <ULandingGrid>
        <ULandingCard
          v-for="(item, index) in page.utils.items"
          id="utils"
          :key="index"
          class="col-span-6 row-span-2"
          :title="item.title"
          :description="item.description"
          :to="item.link"
          :icon="item.icon"
        />
      </ULandingGrid>
    </ULandingSection>
  </div>
</template>

<style scoped>
</style>
