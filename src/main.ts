import './style.css'
import { createApp } from "vue";
import App from './App.vue';
import pinia from './modules/pinia.js';
import Tree from './components/Tree.vue'
const app = createApp(App);
app.use(pinia);
app.component('Tree', Tree) 
app.mount('#app');

// import orgApi from './api/org'
// import userApi from './api/user'
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
