<script lang="ts" setup>
import type Node from "element-plus/es/components/tree/src/model/node";
import orgApi from "../api/org";
import type { Org } from "../api/org.ts";
import { ref } from "vue";
interface Tree {
  id: string;
  name: string;
  leaf?: boolean;
}

interface LeafOrg extends Org {
  leaf?: boolean;
}
const props = {
  label: "name",
  children: "zones",
  isLeaf: "leaf",
  class: "custom-node-class",
};

const emit = defineEmits<{
  handleNodeClick: [userId: string]; // 具名元组语法
}>();
const currentNode = ref("");
// 获取orgs
const getOrgs = async (parentId?: string) => {
  return await orgApi.query(parentId);
};
// 展开树节点进行懒加载
const loadNode = async (node: Node, resolve: (data: Tree[]) => void) => {
  // 添加leaf（当奇数为叶子节点不可展开）
  const parentId = node.data.id;
  const orgs: LeafOrg[] = await getOrgs(parentId);
  orgs.forEach((item: Tree) => {
    const random = Math.random();
    if (random >= 0.5) {
      item.leaf = false;
    } else {
      item.leaf = true;
    }
  });
  return resolve(orgs);
};
// 每个节点点击事件
const handleNodeClick = (data: Tree) => {
  // 如果是叶子则请求users
  if (data.leaf) {
    currentNode.value = data.id;
    emit("handleNodeClick", data.id);
  }
};
</script>
<template>
  <div class="org-tree">
    <el-tree
      lazy
      :highlight-current="true"
      :props="props"
      :load="loadNode"
      @node-click="handleNodeClick"
    />
  </div>
</template>
<style scoped>
.org-tree {
  border-right: 1px solid #ebeef5;
}
.org-tree >>> .el-tree-node__content {
  padding-right: 20px;
}
.org-tree >>> .el-tree-node.is-current.is-focusable.custom-node-class {
  background-color: 64, 158, 255;
}
</style>
