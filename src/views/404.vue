<template>
  <div class="flex justify-content-center pt100">
    <div class="flex flex-direction-column align-items-center">
      <div class="c86909C fs14 mb32">您访问的页面不存在！</div>
      <button @click="goto" class="cursor-pointer">返回首页</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter()
function goto() {
  router.push({ name: "MemberManage" });
}
</script>

<style lang="scss" scoped>
.img {
  width: 239px;
  height: 224px;
  margin-top: 77px;
  margin-bottom: 7px;
}
</style>
