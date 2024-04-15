
import './style.css'
import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from './store';

async function run(){
  const app = createApp(App)

  /* 配置 store , 类似Vuex 5 */
  setupStore(app);

  // app.use(ElementPlus)
  
  app.mount('#app')
}
run();
