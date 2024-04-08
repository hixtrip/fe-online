<template>
	<div class="tree">
		<ul>
			<li v-for="item of orgData" :key="item.id">
				<img v-if="!item.children" src="../img/jiantouyou.png" alt="" @click="toggleHandle(item)">
				<img v-else src="../img/jiantoushang.png" alt="" @click="hideData(item)">
				<span @click="itemClick(item)">{{ item.name }} </span>
				<OrgTree v-if="item.children && item.children.length" :orgData="item.children" />
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import orgApi from '../api/org';
import { ref, onMounted, PropType, watch } from 'vue';
import { DataType } from '../utils/type';

const emits = defineEmits(['onClick'])
const props = defineProps({
	orgData: {
		type: Array as PropType<DataType[]>,
		default: []
	}
});
const nodes = ref<DataType[]>()
watch(() => props.orgData, (val) => {
	nodes.value = val
})
const toggleHandle = async (item: DataType) => {
	if (item.childrenCopy) {
		item.children = item.childrenCopy;
		return
	}
	if (item.children) {
		return
	}
	const result = await orgApi.query(item.id);
	item.children = result;
}
const hideData = async (item: DataType) => {
	item.childrenCopy = item.children;
	item.children = null;
}
const itemClick = async (item: DataType) => {
	emits('onClick', item);
};
</script>

<style scoped>
.tree {
	padding-left: 10px;
}
.arrow {
	margin-right: 5px;
}
img {
	width: 12px;
	margin-right: 5px;
}
span {
	cursor: pointer;
}
</style>
