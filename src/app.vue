<script setup lang="ts">
let orgId = ref('')
const onNodeClick = (id: string) => {
  orgId.value = id
}
</script>

<template>
  <el-container class="common-layout">
    <el-header class="header-bg">Header</el-header>
    <el-container>
      <el-aside width="240px" class="aside--border">
        <org-tree @on-node-click="onNodeClick"></org-tree>
      </el-aside>
      <el-main>
        <user-table :orgId="orgId"></user-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.common-layout {
  height: 100vh;
  overflow: hidden;
}
.header-bg {
  background: #000;
  color: #fff;
}
.aside--border {
  border-right: 1px solid #ccc;
  overflow-y: auto;
  height: 100vh;
}
</style>
