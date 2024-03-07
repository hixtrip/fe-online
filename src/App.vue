

<template>
   <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="成员管理" name="first" class="conentWrapper">
      <div class="leftContent">
        <OrgTree @idChange="idChange"></OrgTree>
      </div>
      <div class="rightContent">
        <UserTable :id="tableId"></UserTable>
      </div>
    </el-tab-pane>
    <el-tab-pane label="成员管理" name="second">成员管理</el-tab-pane>
    <el-tab-pane label="职位维护" name="third">职位维护</el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import OrgTree from './components/OrgTree.vue'
import UserTable  from './components/UserTable.vue'
const activeName = ref('first')
const tableId = ref('')
const idChange = (id:string)=>{
  tableId.value = id
}
</script>
<style scoped>
.conentWrapper{
  display: flex;
}
.leftContent{
  width: 300px;
  border-right: 1px solid #e4e7ed;
}
.rightContent{
  flex-grow:1;
}
</style>
