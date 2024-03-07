<template>
    <div class="user-table">
      <div class="search">
        <el-input
          clearable
          v-model="keyword"
          style="width: 200px"
          placeholder="请输入用户名"
          @input="handleInput"
        />
      </div>
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="id" label="id" />
        <el-table-column prop="name" label="Name" />
      </el-table>
    </div>
  </template>
<script lang="ts" setup>
import { ref } from "vue";
import userApi from "../api/user";
import debounce from '../utils/debounce.ts'
const users = ref([]);
const keyword = ref("");
const currentId = ref(null)
// 获取users
const getUsers = async () => {
    const params={
        partId:currentId.value,
        kwd:keyword.value
    }
    console.log('params: ', params);
  const result = await userApi.query(params);
  users.value = result;
};
const dbGetUsers = debounce(getUsers,500)

const handleInput = () => {
    dbGetUsers()
};
defineExpose({
  getUsers:(id)=>{
    if(id) currentId.value=id
    getUsers()
  },
});
</script>

<style scoped>
.user-table {
  flex: 1;
  padding: 10px;
  border-left: 1px solid #c0c4cc;
}
</style>