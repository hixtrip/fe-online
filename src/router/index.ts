import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        name: "Home",
        component: () => import('@/views/index.vue')
    },
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

router.beforeEach(async (to, _from, next) => {
    console.log('答应', to, _from, next());

})

export default router;