import {createRouter,createWebHistory} from 'vue-router'
//第二步：创建路由器
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            redirect:'/home'
        }
    ]
})
export default router