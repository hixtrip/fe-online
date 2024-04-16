import { createApp } from 'vue'
import { registerMicroApps, start } from 'qiankun';

import './style.css'
import App from './App.vue'
const app = createApp(App)


app.mount('#app')


// 注册子应用auth-app
registerMicroApps([
    {
      name: 'auth-app',
      entry: '//localhost:3002',
      container: '#auth-app-containter',
      activeRule: '/',
    },
  ])
  
  // 启动 qiankun
  start()

