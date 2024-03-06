<!--
 * @Author: KokoTa
 * @Date: 2024-03-06 17:31:03
 * @LastEditTime: 2024-03-06 20:03:36
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: \fe-online\src\components\OrgTree.vue
-->

<template>
  <div class="flex-[4]">
    <header class="font-bold flex items-center justify-between">
      <span>部门</span>
    </header>
    <section>
      <Tree :data="data" @clickNode="getData" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import orgApi, { Org } from '../api/org';
import Tree from './Tree.vue';
import { throttle } from '../utils/utils';

export interface TreeNode {
  id: string;
  name: string;
  parentId: string;
  isOpen: boolean;
  children: TreeNode[];
}

const emit = defineEmits(['change'])

const data: Ref<TreeNode[]> = ref([]);


const getData = throttle(async function(node?: TreeNode) {
  if (node) node.isOpen = !node.isOpen
  if (node && node.children.length > 0) return

  const res: Org[] = await orgApi.query(node ? node.parentId : '0')
  const nodes: TreeNode[] = res.map((item) => {
    return {
      id: item.id,
      name: item.name,
      parentId: item.parentId,
      isOpen: false,
      children: []
    }
  })

  if (!node) data.value = nodes
  else node.children.push(...nodes)

  emit('change', { orgId: node ? node.id : '0' })
})

onMounted(() => getData())

</script>

<style lang="scss" scoped></style>
