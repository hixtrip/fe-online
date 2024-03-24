<template>
	<ul v-for="item in treeData" :key="item.id">
		<li >
			<div class="li-item" :class="value==item.id && 'active'">
				<div  @click="select(item.id)"><ExpandIcon @change="(e)=>{changeExpand(e,item)}" />{{ item.name }}</div>
			</div>
			<template v-if="item.children && item.children.length && item.expand">
				<TreeNode :treeData="item.children" :loadData="loadData" v-model:value="orgId" />
			</template>
		</li>
	</ul>
</template>


<script lang="ts" setup>
import ExpandIcon from './ExpandIcon.vue'
import TreeNode from './index.vue'
import { type treeItem } from './typing'
import { ref , watch } from "vue";
const props = defineProps<{ treeData: treeItem[],loadData:<T>(item:T)=>void,value:string}>()
defineOptions({
  name: 'TreeSelect'
})
const orgId = ref()


watch(orgId, (newValue, oldValue) => {
	emit('update:value',newValue)
});

const emit = defineEmits(['loadData','update:value'])
const changeExpand = (e,item) => {
	item.expand = e
 if(e && !item.children){
	props.loadData(item)
 }
};

const select = (id:string) => {
	orgId.value = id
}

</script>

<style scoped>
ul {
	list-style-type: none;
	padding-left: 20px;
}

li {
	cursor: pointer;
}

.li-item :hover {
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.active{
	color: red;
}
</style>
