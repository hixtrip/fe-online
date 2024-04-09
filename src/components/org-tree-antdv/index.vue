<template>
  <div class="org-search">
    <input v-model="searchKey" />
  </div>
  <a-tree
    v-model:expandedKeys="expandedKeys"
    v-model:selectedKeys="selectedKeys"
    :load-data="onLoadData"
    :tree-data="dataList"
    :field-names="{ children: 'children', title: 'name', key: 'id' }"
    @select="selectHandle"
  />
</template>

<script lang="ts" setup>
// 另外树结构若是涉及搜索,后端搜索还是前端搜索处理会有些许区别.此处并未考虑真正的搜索情景.
// 搜索也并为根据输入内容处理,而是简单的重新刷新数据
import { defineComponent, ref, watch } from "vue";
import type { TreeProps } from "ant-design-vue";
import type { Org } from "../org-tree/org.ts";
import orgApi from "@/api/org";

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
const expandedKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);
const onLoadData: TreeProps["loadData"] = (treeNode) => {
  return new Promise((resolve) => {
    if (treeNode.dataRef.children?.length) {
      resolve();
      return;
    }
    orgApi.query().then((orgs: Array<Org>) => {
      treeNode.dataRef.children = orgs;
      dataList.value = [...dataList.value];
      resolve();
    });
  });
};
const selectHandle = (selectedKeys) => {
  // org选择变动,将会重新请求右侧user信息
  // 有选择样式效果,可以空选
  console.log(selectedKeys);
  emit("select", selectedKeys[0]);
};
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
