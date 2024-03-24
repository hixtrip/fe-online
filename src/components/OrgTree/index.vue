

<template>
	<div class="container">
		<h3>组织列表 </h3>
		<TreeSelect :treeData="state.orgTreeData" :loadData="loadData" v-model:value="state.orgId" ></TreeSelect>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, reactive ,watch } from "vue";
import TreeSelect from '../TreeSelect/index.vue'
import orgApi from "../../api/org";
import {type treeItem} from '../TreeSelect/typing'

const props = defineProps<{getOrgId:(orgId)=>void}>()

const state = reactive({
	orgTreeData:[] as treeItem[],
	orgId:''
})

const initTreeData = async (parentId:string = '0') => {
	const orgs = await orgApi.query(parentId)
	state.orgTreeData = orgs
}

const loadData = (item:treeItem) => {
	orgApi.query(item.id).then((res:treeItem[])=>{
		item.children = res
	})
}

watch(()=>state.orgId,()=>{
	props.getOrgId(state.orgId)
})

onMounted(()=>{
  initTreeData()
})

</script>


<style scoped>
.container {
	padding: 12px;
}






</style>
