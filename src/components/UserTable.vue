<script setup lang="ts">
import { query as getUserList, User, type UserQuery } from "@/api/user";
import { ref } from "vue";

const tableData = ref<User[]>([]);
const isLoading = ref(false);
async function getUserData(userQuery: UserQuery) {
  isLoading.value = true;
  try {
    const data = await getUserList(userQuery);
    tableData.value = data;
  } catch (error) {
    console.error("getUserData Error: ", error);
  }
  isLoading.value = false;
}

defineExpose({
  getUserData,
});
</script>

<template>
  <el-table :data="tableData" v-loading="isLoading">
    <el-table-column prop="id" label="id"></el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
  </el-table>
</template>

<style scoped lang="scss"></style>
UserQuery,
