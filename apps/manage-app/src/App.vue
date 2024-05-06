<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { initGlobalState } from 'qiankun'
import { reactive } from "vue"
let state = reactive({
 loginUserInfo:{ token: "",
   username:"",
   passwords:""}
})

const action = initGlobalState(state)
// 监听actions全局公共状态数据的变化
action.onGlobalStateChange((nextState, prevState) => {
  console.log("主应用变更前：", prevState);
  console.log("主应用变更后：", nextState);
  state.loginUserInfo=nextState
})

</script>
<template>
  <div style="display: flex">
    <div style="background: #646cff">
      <h1>主应用基座</h1>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
      </div>
      <HelloWorld msg="Vite + Vue" />
      <div style="background: red;" v-show="state.loginUserInfo.token!==''">
        {{state.loginUserInfo.token!==""?JSON.stringify(state.loginUserInfo):""}}
      </div>
    </div>
    <div id="auth-app">
    </div>
  </div>
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
</style>
