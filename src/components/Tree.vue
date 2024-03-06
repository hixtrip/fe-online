<!--
 * @Author: KokoTa
 * @Date: 2024-03-06 18:21:03
 * @LastEditTime: 2024-03-06 18:48:00
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: \fe-online\src\components\Tree.vue
-->

<template>
  <div v-if="data.length">
    <ul v-for="node in data" :key="node.id">
      <li class="flex items-center p-1 hover:bg-slate-300 hover:cursor-pointer"
        @click="handleClickNode(node)">
        <span class="mr-2">{{ node.isOpen ? '-' : '|' }}</span>
        <span>{{ node.name }} - {{ node.children.length }}</span>
      </li>
      <div v-show="node.isOpen" class="pl-5">
        <Tree :data="node.children" @clickNode="handleClickNode" />
      </div>
    </ul>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { TreeNode } from './OrgTree.vue'

defineProps<{ data: TreeNode[] }>()
const emit = defineEmits(['clickNode'])

const handleClickNode = (node: TreeNode) => {
  emit('clickNode', node)
}
</script>

<style lang="scss" scoped></style>
