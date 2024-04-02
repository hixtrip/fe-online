import {createApp} from 'vue'
import App from './app.vue';
import router from './router';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import mitt from 'mitt'

const app = createApp(App);
const Mit = mitt()
// 挂载事务总线
app.config.globalProperties.Bus = Mit;
app.use(router).use(ElementPlus).mount('#app');

// import orgApi from './api/org'
// import userApi from './api/user'
// import './style.css'

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
//   document.getElementById('user')!.innerHTML = JSON.stringify(users)
// })

// orgApi.query('1').then((users) => {
//   document.getElementById('org')!.innerHTML = JSON.stringify(users)
// })
