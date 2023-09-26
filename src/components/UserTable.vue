<script lang="ts" setup>
import { reactive, ref } from "vue";
import userApi from "../api/user";
import throttle from "../utils/throttle.ts";

import type { User } from "../api/user.ts";

const users = ref<User[]>([]);
const keyword = ref("");

interface IGetUserParams {
  name: string;
  orgId: string;
}

const getUserParams = reactive<IGetUserParams>({
  name: "",
  orgId: "",
});
// 获取users
const getUsers = async (key: keyof IGetUserParams, data: string) => {
  getUserParams[key] = data;
  const result: User[] = await userApi.query(getUserParams);
  users.value = result;
};
let handleInput = () => {
  const fn = () => getUsers("name", keyword.value);
  let proxy = throttle(fn, 500);
  proxy();
  handleInput = () => {
    proxy();
  };
};

defineExpose({
  getUsers,
});
</script>
<template>
  <div class="user-table">
    <div class="search">
      <el-input
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
<style scoped>
.user-table {
  flex: 1;
}
</style>
