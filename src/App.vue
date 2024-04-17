<script setup lang="ts">
import OrgTree from '@/components/OrgTree.vue'
import UserTable from '@/components/UserTable.vue'
</script>

<template>
  <div class="layout flex">
    <div class="flex-item">
      <OrgTree />
    </div>
    <div class="flex-item">
      <UserTable />
    </div>
  </div>
</template>

<style>
.layout {
  height: 100vh;
  overflow: hidden;
}
.flex {
  display: flex;
}
.flex-item {
  overflow-y: auto;
}
.flex-item::-webkit-scrollbar {
  display: none;
}
</style>
