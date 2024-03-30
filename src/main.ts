import { createApp } from 'vue'
import 'ant-design-vue/dist/reset.css';

import { createPinia } from 'pinia'

import './style.less'
import App from './App.tsx'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
