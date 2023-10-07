<script lang="ts" setup>
import type Node from 'element-plus/es/components/tree/src/model/node'
import orgApi from '@/api/org'
interface Tree {
  id: string
  name: string
  leaf?: boolean
}

const emit = defineEmits<{
  onNodeClick: [id: string]
}>()

const props = {
  label: 'name',
  isLeaf: 'leaf'
}

// 请求tree树结构
const getTreeDomDataAction = async (parentId: string = '0') => {
  const res: Tree[] = await orgApi.query(parentId)
  return res
}

// 异步加载下级节点
const loadNode = async (node: Node, resolve: (data: Tree[]) => void) => {
  // 获取id
  const parentId = node.data.id
  // 模拟调用请求
  const data: Tree[] = await getTreeDomDataAction(parentId)
  if (node.level == 2) {
    // 当前展开子节点到第2级指定节点为叶子节点
    data.forEach((item) => {
      item.leaf = true
    })
  }
  resolve(data)
}

// 触发叶子节点
const handleNodeClick = (data: Tree) => {
  if (data?.leaf) {
    emit('onNodeClick', data.id)
  }
}
</script>

<template>
  <el-tree
    :props="props"
    :load="loadNode"
    lazy
    highlight-current
    @node-click="handleNodeClick"
  />
</template>

<style scoped></style>
