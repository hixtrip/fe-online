<template>
	<li >
		<div >
			<span @click="changeExpand" >{{ expand ? '-' : '+' }}</span>
			<span @click="">{{ treeOptionData.name }}</span>
		</div>
		<template v-if="treeOptionData.children && treeOptionData.children.length && expand">
			<TreeSelect :treeData="treeOptionData.children"  @getChildren="getChildren" />
		</template>

	</li>
</template>

<script lang="ts" setup>
import { type treeItem } from './typing'
import TreeSelect from './index.vue'
import { ref } from "vue";
const props = defineProps<{ treeOptionData: treeItem }>()
const emit = defineEmits(['getChildren'])
const expand = ref(false)
const changeExpand = () => {
	expand.value = !expand.value
	emit('getChildren',props.treeOptionData.id)
}
const getChildren = (parentId:string) => {
	emit('getChildren',parentId)
}
</script>



<style lang="css" scoped>
</style>
