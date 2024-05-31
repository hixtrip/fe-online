<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import { loadMicroApp, initGlobalState } from "qiankun";
import { onMounted, reactive } from "vue";

const initState = reactive({ userInfo: { dqw: 2 } })
// 初始化 state 
const actions = initGlobalState(initState);
// 在主应用中监听贡献数据的变化
actions.onGlobalStateChange((state) => {
  initState.userInfo = state;
}, true);
// 给子应用的用的获取数据api
const getGlobalState = () => initState;

onMounted(() => {

  loadMicroApp({
    name: "auth-app",
    entry: "//localhost:3002",
    container: "#auth-app",
    props: {
      getGlobalState,
    },
  });
});

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <div class="data">
    {{ initState?.userInfo }}
  </div>
  <div class="solid"></div>
  <div id="auth-app"></div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.solid {
  margin: 30px 0;
  height: 1px;
  background-color: red;
}
</style>
