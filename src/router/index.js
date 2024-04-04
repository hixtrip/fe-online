import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/mm",
    component: () => import("../views/MemberManagemeng.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
