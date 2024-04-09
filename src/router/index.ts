import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const constantRoutes: RouteRecordRaw[] = [
  {
    // 树结构:简单自写
    path: '/user',
    name: 'User',
    component: () => import('@/views/system/user.vue'),
    meta: {
      withoutLayout: true
    }
  },
  {
    // 树结构 使用antdesign vue
    path: '/user2',
    name: 'User2',
    component: () => import('@/views/system/user2.vue'),
    meta: {
      withoutLayout: true
    }
  },
  {
    // 
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      withoutLayout: true
    }
  },
]
// 创建路由
const router = createRouter({
  routes: constantRoutes,
  history: createWebHistory(import.meta.env.BASE_URL)
})

export default router
