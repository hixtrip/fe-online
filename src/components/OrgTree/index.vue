<script setup lang="ts">
import { onMounted, ref } from "vue";
import TreeNode from "./OrgTreeNode.vue";
import { getOrgTreeApi, type OrgTreeNode } from "./composition/getOrgTreeApi";

const orgTreeData = ref<OrgTreeNode[]>([]);

async function getFirstLevelTree() {
  const data = await getOrgTreeApi(0);
  orgTreeData.value = data;
}

onMounted(() => {
  getFirstLevelTree();
});
</script>

<template>
  <ul>
    <TreeNode :data="item" v-for="item of orgTreeData" :key="item.name">
    </TreeNode>
  </ul>
</template>

<style scoped lang="scss"></style>
