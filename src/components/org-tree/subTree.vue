<template>
  <ul>
    <li v-if="props.deep === 0 && props.dataList.length === 0">暂无数据</li>
    <li
      v-for="item in props.dataList"
      :style="'padding-left: ' + (props.deep > 0 ? 18 : 0) + 'px;'"
    >
      <span v-if="!item.isLeaf" @click="loadNodeHandle(item)">{{
        isChildOpen[item.id] ? "-" : "+"
      }}</span
      ><span @click="selectHandle(item.id)">{{ item.name }}</span>
      <sub-tree
        v-if="item.children?.length > 0 && isChildOpen[item.id]"
        :deep="deep + 1"
        :data-list="item.children"
        @load-node="loadNodeHandle"
        @select="selectHandle"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
// 此处处理可能不一,取决于数据是否是打平后的数据.这边是非打平模式.自己写树.太复杂,此列只是简单处理.
// 功能要齐全还是看使用antdv 的写法
import { ref } from "vue";
import type { Org } from "./org.ts";
import SubTree from "./subTree.vue";
const emit = defineEmits(["select", "load-node"]);
const props = defineProps<{
  deep: number; // 层级,做第一层级的空数据判断,及缩进处理.
  dataList?: Array<Org>;
}>();
interface IsChildOpen {
  [key: string]: boolean;
}
const isChildOpen = ref<IsChildOpen>({});
const setChildOpen = (node: Org) => {
  isChildOpen.value[node.id] = !isChildOpen.value[node.id];
};
const selectHandle = (key: string) => {
  // org选择变动,将会重新请求右侧user信息
  emit("select", key);
};
const loadNodeHandle = (node: Org) => {
  setChildOpen(node);
  emit("load-node", node);
};
</script>
