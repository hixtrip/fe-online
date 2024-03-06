<script setup lang="ts">
import { ref } from 'vue'

import OrgTree from './components/OrgTree.vue'
import UserTable from './components/UserTable.vue'
const activeName = ref('first');
</script>

<template>
  <div class="home">
    <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="成员管理" name="first">
      <div class="home_member">
        <div class="member_org">
          <OrgTree></OrgTree>
        </div>
        <div class="member_user">
          <UserTable></UserTable>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="团队管理" name="second">团队管理</el-tab-pane>
    <el-tab-pane label="职位管理" name="third">职位管理</el-tab-pane>
  </el-tabs>
  </div>


  
</template>

<style scoped>

.home{
  width: 100vw;
  height: 100vh;
}
.home_member{
  display: flex;
  width: 100vw;
  height: 100vh;
}

.member_org{
  width: 20%;
}
.member_user{
  width: 70%;
}
</style>
