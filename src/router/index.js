import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/mm",
    component: () => import("../views/MemberManagemeng.vue"),
    children: [
      {
        path: ":name",
        component: () => import("../components/UserTable.vue"),
      },
      {
        path: "",
        redirect: "/mm/user",
      },
    ],
  },
  {
    path: "/",
    redirect: "/mm",
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
