<template>
  <div class="container">
    <div class="left">
      <OrgTree />
    </div>
    <div class="right">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import UserTable from "../components/UserTable.vue";
import OrgTree from "../components/OrgTree.vue";
import { RouterView } from "vue-router";
</script>

<style scoped>
.container {
  display: flex;
}
.left {
  width: 400px;
  flex: 0 0 400px;
  border: 1px solid #ccc;
}

.right {
  flex: 1 1 auto;
  border: 1px solid #ccc;
}
</style>
