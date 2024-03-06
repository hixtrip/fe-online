<template>
  <el-tabs>
    <el-tab-pane label="成员管理">
      <el-row class="h-full">
        <el-col :span="6">
          <OrgTree @selectOrg="selectOrg" />
        </el-col>
        <el-col :span="18">
          <UserTable :orgId="orgId" :orgPath="orgPath" />
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="团队管理">团队管理</el-tab-pane>
    <el-tab-pane label="职业维护">职业维护</el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import OrgTree from './components/OrgTree/index.vue';
import UserTable from './components/UserTable/index.vue';

const orgId = ref<string>('0');

const orgPath = ref<string>('');

const selectOrg = (id: string, path: string) => {
  orgId.value = id;
  orgPath.value = path;
};
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#app {
  padding: 20px;
}
* {
  margin: 0;
  box-sizing: border-box;
}
.el-tabs {
  height: 100%;
  .el-tabs__header {
    margin: 0;
  }
  .el-tabs__content,
  .el-tab-pane {
    height: calc(100% - 20px);
  }
}
</style>
