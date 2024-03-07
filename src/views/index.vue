<template>
  <div class="content">
    <el-tabs
      type="border-card"
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="成员管理" name="first">
        <div class="main">
          <orgVue @getOrgName="handleGetName" />
          <userVue :orgObj="orgName" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="团队管理" name="second">团队管理空</el-tab-pane>
      <el-tab-pane label="职位维护" name="third">内容管理空</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import userVue from "@/views/userTable/index.vue";
import orgVue from "@/views/orgTree/index.vue";
import { ref } from "vue";
const activeName = ref("first");
const orgName = ref("");
const handleGetName = (e) => {
  orgName.value = e;
};
</script>
<style scoped>
.content {
  width: 1280px;
}
.main {
  display: flex;
}
</style>
