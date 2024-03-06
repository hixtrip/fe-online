<template>
  <div class="org-tree">
    <el-tree
      style="max-width: 200px"
      :load="loadNode"
      :props="defaultProps"
      lazy
      accordion
      @node-click="handleNodeClick"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElTree } from 'element-plus';
import type Node from 'element-plus/es/components/tree/src/model/node';
import orgApi from '../api/org';

const defaultProps = ref({
  label: 'name',
});
// const curNode = ref<Node>();

const emits = defineEmits(['handleNodeClick']);

const handleNodeClick = (_: any, node: Node) => {
  // curNode.value = node;
  emits('handleNodeClick', node);
};

const loadNode = (node: Node, resolve: (data: any[]) => void) => {
  if (node.level === 0) {
    return resolve([{ name: '厦门嗨行旅游', id: '0' }]);
  }
  if (node.level > 3) return resolve([]);
  orgApi.query(node.data.id).then((orgs) => {
    resolve(orgs);
  });
};
</script>

<style>
.org-tree {
  min-width: 200px;
}
</style>
