<template>
  <div class="flex">
    <OrgTree @changeActiveItem="handleActive"></OrgTree>
    <UserTable ref="userTableRef"></UserTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import OrgTree from "./compenents/OrgTree.vue"
import UserTable from "./compenents/UserTable.vue"
const userTableRef = ref()
const handleActive = (id: string) => {
  userTableRef.value.getList(id)
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f2f5;
  gap: 40px;
}
</style>
