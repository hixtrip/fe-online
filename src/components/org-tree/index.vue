<template>
  <div class="org-search">
    <input v-model="searchKey" />
  </div>
  <sub-tree class="org-tree" :deep="0" :data-list="dataList" @load-node="loadNodeHandle" @select="selectHandle" />
</template>

<script lang="ts" setup>
// 另外树结构若是涉及搜索,后端搜索还是前端搜索处理会有些许区别.此处并未考虑真正的搜索情景.
// 搜索也并为根据输入内容处理,而是简单的重新刷新数据
import { ref, watch } from "vue";
import type { Org } from "./org.ts";
import orgApi from "@/api/org";
import SubTree from "./subTree.vue";
const emit = defineEmits(["select"]);
const searchKey = ref<string>();
const dataList = ref<Array<Org>>([]);
const timers = 400; // 延时请求数据时间(防止两次请求时间过近)
const serachTimer = ref(
  setTimeout(() => {
    changeOrg();
  }, timers)
);
const changeOrg = (key: string = "1") => {
  console.log("请求Org数据:");
  orgApi.query(key).then((orgs: Array<Org>) => {
    dataList.value = orgs;
  });
};
const selectHandle = (key: string) => {
  // org选择变动,将会重新请求右侧user信息
  emit("select", key);
};
const loadNodeHandle=(node:Org)=>{
  // 判断是否请求过子节点数据,有children即请求过
  if (!node.children) {
    orgApi.query().then((orgs: Array<Org>) => {
      node.children = orgs;
    });
  }
}
watch(
  () => searchKey.value,
  () => {
    console.log("输入值变更了:", searchKey.value);
    serachTimer.value && clearTimeout(serachTimer.value);
    serachTimer.value = setTimeout(() => {
      changeOrg(searchKey.value);
    }, timers);
  }
);
</script>

<style scoped>
.org-tree :deep(span){cursor: pointer;}
</style>