import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
    {
        name: 'auth-app',
        entry: 'http://localhost:3004',
        container: '#auth-app',
        activeRule: '/',
        // props: {
        //     // msg: "我是来自主应用的值-react"
        // }
    }
], {
    beforeLoad: app => {
        console.log("before load app.name====>>>>>", app.name);
    },
    beforeMount: [
        app => {
            console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
        }
    ],
    afterMount: [
        app => {
            console.log("[LifeCycle] after mount %c%s", "color: green;", app.name);
        }
    ],
    afterUnmount: [
        app => {
            console.log("[LifeCycle] after unmount %c%s", "color: green;", app.name);
        }
    ]
});
// 启动 qiankun
start();
createApp(App).mount('#app')
