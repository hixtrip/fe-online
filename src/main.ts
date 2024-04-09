import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
import 'virtual:uno.css'

const app = createApp(App)
app.use(pinia)
app.mount('#app')
