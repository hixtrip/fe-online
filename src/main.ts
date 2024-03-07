

import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from 'element-plus'
// 样式

const app = createApp(App);

app.use(ElementPlus).mount("#app");