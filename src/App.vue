<script setup lang="ts">
import { ref } from "vue";
import OrgTree from "./components/OrgTree.vue";
import UserTable from "./components/UserTable.vue";
const UserTableRef= ref(null)

const handleNodeClick = (userid: string) => {
  UserTableRef.value?.getUsers(userid);
};
</script>

<template>
  <div class="app">
    <OrgTree @handleNodeClick="handleNodeClick" />
    <UserTable ref="UserTableRef"/>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ebeef5;
  margin: 50px;
}
</style>