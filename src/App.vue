<template>
  <el-config-provider :locale="locale">
    <el-card style="width: 1000px">
      <el-row>
        <el-col :span="8">
          <el-scrollbar style="height: 500px; background-color: #545c64">
            <OrgTree></OrgTree>
          </el-scrollbar>
        </el-col>
        <el-col :span="16">
          <UserTable></UserTable>
        </el-col>
      </el-row>
    </el-card>
  </el-config-provider>
</template>
<script setup lang="ts">
import OrgTree from "./components/OrgTree.vue";
import UserTable from "./components/UserTable.vue";
import { computed, ref } from "vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";
const language = ref("zh-cn");
const locale = computed(() => (language.value === "zh-cn" ? zhCn : en));
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
.el-card__body {
  padding: 0;
}
div {
  box-sizing: border-box;
}
</style>
