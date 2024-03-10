import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Layout from '@/components/common/Layout.vue';
import "virtual:svg-icons-register";
import setUtilsComponents from "@/components/utils";

const app = createApp(App);
app.use(router);

app.component("Layout", Layout);

setUtilsComponents(app);
app.mount("#app");
