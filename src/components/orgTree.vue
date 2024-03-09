<template>
    <el-tree
        style="width: 300px"
        :props="defaultProps"
        @node-click="handleNodeClick"
        lazy
        :load="loadData"
    />
</template>

<script lang="ts" setup>
import orgApi from '../api/org'
import type Node from 'element-plus/es/components/tree/src/model/node'
interface Tree {
  name: string
  id: string
  leaf?: boolean
  children?: Tree[]
}
const defaultProps = {
  children: 'children',
  label: 'name',
  leaf: 'leaf'
}
const emit = defineEmits(['updata:ids'])

const handleNodeClick = (data: Tree) => {
  emit('updata:ids', data.id)
}

const getOrg = async (id?) => {
    
    let orgs = await orgApi.query(id)

    return id > 1 ? [] : orgs.map(i => {
            return {...i, leaf: true}
        })
}

const loadData = async (node: Node, resolve: (data: Tree[]) => void) => {
    let l = await getOrg(node.level)
    return resolve(l)
}
</script>