<template>
   <div class="orgTree">
      <el-tree
         :props="{
            label:'name',
            isLeaf: 'leaf'
         }"
         :load="loadNode"
         lazy
         highlight-current
         @node-click="handleNodeClick"
      />
   </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import orgApi from '../api/org.ts'
import type Node from 'element-plus/es/components/tree/src/model/node'

interface Tree {
  id: string,
  name: string
  leaf?: boolean
}

const emit = defineEmits<{
  onNodeClick: [id: string]
}>()

const loadNode = async(node: Node, resolve: (data: Tree[]) => void) => {
   const parentId = node.data.id
   const data: Tree[] = await orgApi.query(parentId)
   if (node.level == 0){
      return resolve(data)
   }
   if (node.level == 1){
      let resolveData = data.map(element => {
         element.leaf = true
         return element
      });
      return resolve(resolveData)
   }
}

const handleNodeClick = (data: Tree) => {
   if (data?.leaf) {
      emit('onNodeClick', data.id)
   }
}
</script>
<style scoped>
.orgTree{
   padding: 5px;
   border-right: 1px solid #aca9a9;
   height: 500px;
   overflow-y: scroll;
}
::-webkit-scrollbar {
    width: 5px; /* 纵向滚动条*/
    height: 5px; /* 横向滚动条 */
    background-color: #fff;
}

/*定义滚动条轨道 内阴影*/
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    background-color: #ffffff;
}

/*定义滑块 内阴影*/
::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    background-color: #d8d8d8;
    border-radius: 10px;
}

</style>
