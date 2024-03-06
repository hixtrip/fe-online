<template>
   <el-tabs v-model="activeName">
    <el-tab-pane label="成员管理" name="1"></el-tab-pane>
    <el-tab-pane label="团队管理" name="2"></el-tab-pane>
    <el-tab-pane label="职位维护" name="3"></el-tab-pane>
  </el-tabs>
  <div class="box">
    <OrgTree @onNodeClick="onNodeClick"></OrgTree>
    <UserTable :orgId="orgId"></UserTable>
  </div>
</template>

<script setup lang='ts'>
import type { TabsPaneName } from 'element-plus'
import { ref } from 'vue'
const activeName = ref('1')
const orgId = ref()
const onNodeClick = (val) => {
    orgId.value = val
}
</script>
<style scoped>
.box{
    display:flex;
}
</style>