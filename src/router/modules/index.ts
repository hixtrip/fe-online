export default [
  {
    path: "/member-manage",
    name: "MemberManage",
    component: () => import("@/views/member-manage.vue"),
  },
  {
    path: "/team-manage",
    name: "TeamManage",
    component: () => import("@/views/team-manage.vue"),
  },
  {
    path: "/job-manage",
    name: "JobManage",
    component: () => import("@/views/job-manage.vue"),
  },
  {
    path: "/",
    redirect: { name: "MemberManage" },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../../views/404.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];
