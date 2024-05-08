<script setup>
import { onMounted, ref } from 'vue';
import { MonitorBuilder, useHandleMessageCore } from '../src/message';
import HelloWorld from './components/HelloWorld.vue';

const info = ref('')
const ready = (res) => {
  info.value = res
}
onMounted(() => {
  useOperate()
})
const iframeRef = ref(null)
/** 控制器 */
const useOperate = () => {
  /** 监测的处理器配置策略,可以添加多个事件类型 */
  const monitor = new MonitorBuilder()
    .setEventHandler('test', ready)

  const { sendEvent, eventHandle } = useHandleMessageCore(iframeRef)
  /** 监测处理接口事件回调 */
  eventHandle(async (eventType, eventData) => {
    try {
      const data = await monitor.triggerEvent(eventType, eventData)
      sendEvent(eventType, data || undefined)
    } catch (e) {
      console.error(e)
      sendEvent(eventType, undefined)
    }
  })
}

</script>

<template>
  <div style="display: flex;">
    <div style="margin-right: 20px;">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
      <HelloWorld msg="Vite + Vue" />
      <p>子页面传过来的token信息</p>
      <p class="message">{{ info.token }}</p>
    </div>
    <iframe ref="iframeRef" width="492" src="http://127.0.0.1:3002/" scrolling="no" frameborder="0"
      allow="accelerometer *; gyroscope *; geolocation *;" />
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

.message {
  width: 391px;
  color: red;
  word-break: break-all;
}
</style>
