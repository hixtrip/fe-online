<template>
  <div class="content">
    <div class="left_content">
      <org-tree @change="changeFun" />
    </div>
    <div class="right_content">
      <UserTable ref="userTables" />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserTable from "./component/UserTable.vue";
import OrgTree from "./component/OrgTree.vue";
import { ref } from "vue";
const userTables = ref(null) as any;
const changeFun = () => {
  userTables.value.refreshName();
};
</script>

<style scoped>
@import "/src/style/index.css";
</style>
