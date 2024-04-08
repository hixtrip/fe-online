<template>
	<div class="layout">
		<div class="treeBox">
			<OrgTree ref="orgTree" @onClick="onClick" :orgData="orgData"></OrgTree>
		</div>
		<UserTable class="tableBox" ref="userTable" :orgId="orgId"></UserTable>
	</div>
</template>

<script setup lang="ts">
import OrgTree from './components/OrgTree.vue';
import UserTable from './components/UserTable.vue';
import { ref, onMounted } from 'vue';
import { DataType } from './utils/type';
import orgApi from './api/org';

const orgData = ref<DataType[]>([]);
const userTable = ref(null);
const orgTree = ref(null);
const orgId = ref<string>('');
const onClick = (item: DataType) => {
	orgId.value = item.id;
};
onMounted(async () => {
	const result = await orgApi.query('1');
	orgData.value = result;
})
</script>

<style scoped>
.layout {
	display: flex;
	padding: 10px;
	box-sizing: border-box;
}
.treeBox {
	flex-basis: 200px;
}
.tableBox {
	flex: 1;
	margin-left: 10px;
}
</style>