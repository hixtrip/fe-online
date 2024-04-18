import { createApp } from 'vue';
import App from './App.vue';
//  element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as Elicons from '@element-plus/icons-vue';
// pinia
import pinia from './store/index';
// router
import router from '@/router';
const app = createApp(App);
for (const name in Elicons) {
    app.component(name, Elicons[name]);
}
app.use(ElementPlus).use(pinia).use(router);
app.mount('#app');
