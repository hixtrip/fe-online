<script setup lang="ts">
import { ref } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import orgApi from '../api/org'	

interface Tree {
  name: string
  leaf?: boolean
}

const props = {
  label: 'name',
  children: 'zones',
  isLeaf: 'leaf',
}
const getUsers = async (parentId) => {
  return await orgApi.query(parentId);
};

const loadNode = async (node: Node, resolve: (data: Tree[]) => void) => {
	const parentId = node.data.id;
	const users = await getUsers(parentId);
	if (node.level > 2) {//只显示2个子节点
		return resolve([])
	}else{
		users.forEach((ele,index) => {//数据组装并随机生成是否有子节点
			const random = Math.random();
			if (random >= 0.5 || node.level >= 2) {
			  ele.leaf = true;
			} else {
			  ele.leaf = false;
			}
		})
		return resolve(users)
	}
}

const emit = defineEmits({
  unvalidatedEvent: null, // if we want an event without validation
  onChange: (s) => {
    if (s && typeof s === 'string') {
      return true
    } else {
      console.warn(`Invalid submit event payload!`)
      return false
    }
  },
})
// 每个节点点击事件
const handleNodeClick = (data: Tree) => {
 emit("onChange", data);
};
</script>

<template>
  <div class="wrap-org flex f-s-0">
  <el-tree
      style="width: 100%"
      :props="props"
      :load="loadNode"
	  @node-click="handleNodeClick"
	  :highlight-current="true"
      lazy
    />
  </div>
</template>

<style scoped>
.wrap-org {
	width: 20vw;
	border-right: 1px solid #eee;
}
</style>
