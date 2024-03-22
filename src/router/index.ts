// 通过vue_router插件实现模板路由配置

import { createRouter, createWebHashHistory } from 'vue-router'
// 创建路由
const router = createRouter({
  //  路由模式
  history: createWebHashHistory(),
  routes: [
  {
    path: '/',
    component: () => import('../views/home.vue'),
    name: 'home', // 命名路由
    meta: {
      title: '首页',
    },
  },]

})

export default router
