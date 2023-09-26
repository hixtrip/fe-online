<script setup lang="ts">
import { ref } from "vue";
import OrgTree from "./components/OrgTree.vue";
import UserTable from "./components/UserTable.vue";

const UserTableRef = ref<typeof UserTable>();
// 每个节点点击事件
const handleNodeClick = (userid: string) => {
  // 如果是叶子则请求users
  UserTableRef.value!.getUsers("orgId", userid);
};
</script>

<template>
  <div class="app">
    <OrgTree @handleNodeClick="handleNodeClick" />
    <UserTable ref="UserTableRef" />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ebeef5;
}
</style>
