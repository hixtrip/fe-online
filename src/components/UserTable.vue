<script setup lang="ts">
import { ref } from 'vue'
import userApi from '../api/user'
import debounce from "../utils/debounce.ts";
const users = ref([]);
const keyword = ref("");
const paths = ref("");
const getUsers = async (postData) => {
  const data =  await userApi.query(postData);
  users.value = data;
};
getUsers()
const changeSearch = (info) => {
	paths.value = info.name
	getUsers({name:keyword.value,orgId:info.id})
}

let changeInput = () => {
	let fn = () => {
		getUsers({name:keyword.value})
	}
	debounce(fn,500);
}
defineExpose({
  changeSearch,
});
</script>

<template>
 <div class="flex flex-1 f-c">
	 <div class="padding-10">
		 <el-breadcrumb separator="/">
		     <el-breadcrumb-item :to="{ path: '/' }">{{paths}}</el-breadcrumb-item>
		   </el-breadcrumb>
	 </div>
	
	 <div class="padding-10">
		 <el-input
		     v-model="keyword"
		     style="width: 240px"
		     placeholder="Please input"
		     clearable
			 @input="changeInput"
		   />
	 </div>
	 <el-table :data="users" border style="width: 100%">
	   <el-table-column prop="id" label="id" />
	   <el-table-column prop="name" label="Name" />
	 </el-table>
 </div>
</template>

<style scoped>
</style>
