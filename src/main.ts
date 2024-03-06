import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'

import mitt from 'mitt'
import 'element-plus/dist/index.css'


const Mit = mitt()
declare module "vue" {
    export interface ComponentCustomProperties {
        $Bus: typeof Mit
    }
}


const app = createApp(App)

app.config.globalProperties.$Bus = Mit
app.use(ElementPlus)

app.mount('#app')