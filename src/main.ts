import "./style.css";

import { createApp } from "vue";
import router from "./router";

import App from "./App.vue";
import { Tree } from "ant-design-vue";

const app = createApp(App);

app.use(router);
app.use(Tree);
app.mount("#app");
