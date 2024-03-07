<template>
  <div class="minw-200">
    <el-tree
      :load="loadNode"
      lazy
      :props="defaultProps"
      @node-click="nodeClick"
      :expand-on-click-node="false"
      :highlight-current="true"
    >
    </el-tree>
  </div>
</template>

<script setup lang="ts">
interface Tree {
  label: string;
  id: string;
  leaf?: boolean;
  children?: Tree[];
}
import type Node from "element-plus/es/components/tree/src/model/node";
import utils from "../../utils/utils"
const defaultProps = {
  label: "label",
  children: "children",
  isLeaf: "leaf",
};
const emits = defineEmits({
  "on-change": (id:string):void => {}
})
// uuid

function loadNode(node: Node, resolve: (data: Tree[]) => void) {
  if (node.level === 0) {
    return resolve([{ label: "根节点", id: utils.uuid() }]);
  }
  if (node.level >3) return resolve([]);


  setTimeout(() => {
    // 随机生成子节点个数 +1 防止出现0导致没有下级
    const count = Math.floor(Math.random() * 5)+1;
    const data: Tree[] =[]
    for(let i=0;i<count;++i){
      data.push({
        label: "子节点" + utils.uuid().substring(0, 5),
        leaf: Math.random() > 0.5 ? true : false,
        id: utils.uuid(),
      },)
    }
    resolve(data);
  }, 500);
}

function nodeClick(_: Node, node: Node,) {
  emits("on-change", node.data.id);
}
</script>
<style scoped lang="less">
.minw-200 {
  min-width: 200px;
}
</style>
