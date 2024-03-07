
<template>
    <el-tree
        style="max-width: 600px"
        :props="props"
        :load="loadNode"
        @node-click="nodeClick"
        lazy
  />
</template>
<script setup lang="ts">
import type Node from 'element-plus/es/components/tree/src/model/node'
import orgApi from '../api/org'
interface Tree {
  name: string,
  id:string,
  leaf?: boolean
}
const props = {
  label: 'name',
  children: 'zones',
  isLeaf: 'leaf',
}
const emit = defineEmits(["idChange"])

const nodeClick = (node:Tree[] )=>{
    debounce(emit('idChange', node.id),2000)
}
const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
  if (node.level === 0) {
    return resolve([{ name: 'region', id: '5' }])
  }
  if (node.level > 1) return resolve([])
  orgApi.query(node.id).then((users) => {
    resolve(users)
  })
}
const debounce = (fn, delay)=>{
    let timer;
    return function(){ 
      let args = arguments
      if(timer) clearTimeout(timer) 
      timer = setTimeout(() => {
        fn.call( this, ...args )
      }, delay)
    }
}
</script>