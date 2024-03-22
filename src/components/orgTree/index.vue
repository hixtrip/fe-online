<template>
  <div>
  <el-tree
      style="max-width: 600px"
      :props="props"
      :load="loadNode"
      :show-checkbox="false"
      :expand-on-click-node	="false"
      lazy
      @node-click="nodeClick"
    />
  </div>
</template>

<script lang="ts" setup>
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { Org } from '../../api/org.ts'
import { orgApi } from '../../api/org'

const emit = defineEmits(['change'])
const props = {
  label: 'name',
}

const loadNode = async (node: Node, resolve: (data: Org[]) => void) => {
  if (node.level === 0) {
    return resolve(await orgApi.query()) 
  } else {
    return resolve(await orgApi.query(node.data.id)) 
  }
  
}

const nodeClick = (node: Org) => {
  console.log(node)
  console.log(node.id)
  emit('change',node.id)
}

</script>
<style scoped>
</style>