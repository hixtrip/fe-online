import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//引入pinia
import { createPinia } from 'pinia'
//第二步：创建pinia
const pinia = createPinia()
import './style.css'
const app = createApp(App)
//使用路由器
app.use(router) // app.use()安装插件
app.use(ElementPlus, {
  locale: zhCn, //element-plus国际化配置
})
app.use(pinia)
//挂载整个应用到app容器
app.mount('#app')
// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <h1>Hixtrip FE Online Quiz</h1>
//     <h2>Users:<h2>
//     <p class="read-the-docs" id="user">
//     </p>
//     <h2>Orgs:<h2>
//     <p class="read-the-docs" id="org">
//     </p>
//   </div>
// `

// userApi.query({}).then((users) => {
//   console.log(users)
//   document.getElementById('user')!.innerHTML = JSON.stringify(users)
// })

// orgApi.query('1').then((users) => {
//   document.getElementById('org')!.innerHTML = JSON.stringify(users)
// })
