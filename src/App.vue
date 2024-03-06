<template>
  <div class="app-home">
    <div class="left-box">
      <OrgTreeVue @handleNodeClick="handleNodeClick" />
    </div>
    <div class="right-box">
      <UserTableVue :curNode="curNode" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import OrgTreeVue from './components/OrgTree.vue';
import UserTableVue from './components/UserTable.vue';
import type Node from 'element-plus/es/components/tree/src/model/node';

const curNode = ref<Node>();

const handleNodeClick = (node: Node) => {
  curNode.value = node;
};
</script>

<style>
.app-home {
  height: 100%;
  display: flex;
}
html,
body,
#app {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
}
.right-box {
  flex: 1;
}
</style>
