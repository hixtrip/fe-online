<script setup lang="ts">
import { ref } from "vue";
import { type OrgTreeNode, getOrgTreeApi } from "./composition/getOrgTreeApi";

export interface SubTreeProps {
  data: OrgTreeNode;
}

const props = defineProps<SubTreeProps>();
const isExpand = ref(false);
const childrenNodes = ref<OrgTreeNode[]>([]);

async function handleLoadNextLevelData() {
  const parentNode = props.data;
  if (!parentNode.hasChildren) {
    return;
  }
  if (!parentNode.loaded) {
    parentNode.loading = true;
    const nodes = await getOrgTreeApi(parentNode.level + 1, parentNode.id);
    parentNode.loading = false;
    childrenNodes.value = nodes;
    parentNode.loaded = true;
  }
  isExpand.value = !isExpand.value;
  // console.log(childrenNodes.value);
}
</script>

<template>
  <li>
    <div @click="handleLoadNextLevelData" class="org-item">
      <span v-if="data.hasChildren && !isExpand">➡</span>
      <span v-if="data.hasChildren && isExpand">⬇</span>
      <span>
        {{ data.name }}
      </span>
    </div>
    <div v-if="data.loading">loading...</div>
    <ul v-if="childrenNodes.length > 0" v-show="isExpand" class="expand-tree">
      <OrgTreeNode
        v-for="item of childrenNodes"
        :key="item.name"
        :data="item"
      ></OrgTreeNode>
    </ul>
  </li>
</template>

<style scoped>
.org-item {
  cursor: pointer;
}
.expand-tree {
  transition: all 0.5s ease-in-out;
}
</style>
