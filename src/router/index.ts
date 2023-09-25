import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/user',
      name: 'user',
      children: [
        {
          path: 'login',
          name: 'user.login',
          component: () => import('@/views/user/login.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  if (userStore.logined) {
    next()
    return
  }

  if (to.name === 'user.login') {
    next()
    return
  }
  next('/user/login')
})

export default router
