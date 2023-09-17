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
          path: '/login',
          name: 'user.login',
          component: () => import('@/views/user/login.vue')
        }
      ]
    }
  ]
})

export default router
