<template>
    <div class="org-tree">
      <el-tree
        lazy
        :highlight-current="true"
        :props="props"
        :load="dbLoadNode"
        @node-click="dbHandleNodeClick"
      >
      <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
          </span>
        </template>
      </el-tree>
    </div>
  </template>
<script lang="ts" setup>

import orgApi from "../api/org";
import debounce from '../utils/debounce.ts'
const props = {
  label: "name",
  children: "zones",
  isLeaf: function(data){
    return data.id<0.5

  },
};
const emit = defineEmits<{
  handleNodeClick: [userId: string];
}>();

// 展开树节点进行懒加载
const loadNode = async (node, resolve) => {
  const serchId = node.data.id;
  const res = await orgApi.query(serchId);
  if(!node.isLeaf&&node.data.id){ // 非叶子节点
    emit("handleNodeClick", node.data.id);
  }
  return resolve(res);
};
const dbLoadNode = debounce(loadNode,500)

// 每个节点点击事件
const handleNodeClick = (data,node) => {
  // 是否叶子node.isLeaf
  if(node.isLeaf){
    emit("handleNodeClick", data.id);
  }
};
const dbHandleNodeClick = debounce(handleNodeClick,500)
</script>

<style scoped>
>>>.el-tree-node__content{
    padding: 10px 50px;
}
</style>