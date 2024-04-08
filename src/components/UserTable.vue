<template>
	<div>
		<input v-model="searchValue" @input="(event) => {search((event.target as HTMLInputElement).value)}" placeholder="请输入"/>
	<table class="table">
		<thead class="thead">
			<tr>
				<th scope="col">Id</th>
				<th scope="col">Name</th>
			</tr>
  	</thead>
		<tbody>
			<tr v-for="item of tableData" :key="item.id">
				<td>{{ item.id }}</td>
				<td>{{ item.name }}</td>
			</tr>
		</tbody>
	</table>
	</div>
</template>

<script setup lang="ts">
import userApi from '../api/user';
import { ref, onMounted, watch } from 'vue';
import { DataType } from '../utils/type';
import debounce from '../utils/debounce';
const props = defineProps({
	orgId: {
		type: String,
		default: ''
	}
})
const searchValue = ref('');
const tableData = ref<DataType[]>([]);
const queryUser = async () => {
	const params = {
		orgId: props.orgId,
		name: searchValue.value
	}
	const users = await userApi.query(params);
	tableData.value = users;
}
const search = debounce(queryUser, 500, true);
onMounted(() => {
	queryUser();
})
watch(() => props.orgId, () => {
	queryUser();
})
</script>

<style scoped>
.table {
	border-collapse: collapse;
	border: 2px solid rgb(140 140 140);
	font-family: sans-serif;
	font-size: 0.8rem;
	letter-spacing: 1px;
	width: 100%;
}
.thead {
	background-color: rgb(228 240 245);
}
th, td {
    border: 1px solid rgb(160 160 160);
    padding: 8px 10px;
}
</style>