<template>
  <div>
    <!-- <div class="breadcrumb" v-if="tabSelectKeys">
      <el-icon style="margin-right: 10px"><Operation /></el-icon>
      <el-breadcrumb>
        <el-breadcrumb-item>{{ [tabSelectKeys.split[0]] }}</el-breadcrumb-item>
        <el-breadcrumb-item>homepage</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <div style="display: flex; align-items: center">
      <el-input
        v-model="searchVal"
        style="width: 240px; margin: 20px"
        placeholder="请输入搜索名(姓名)"
      />
      <el-button type="primary" @click="toSearch">搜索</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="tableLoading">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="name" label="姓名" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { recordTabSelect } from "../store";
import getUserList from "../api/user";
import debounce from "../utils/debounce";
const recordTabSelectStore = recordTabSelect();
const tableLoading = ref(false);
const tabSelectKeys = computed(() => recordTabSelectStore.result);
const tableData = ref([
  {
    id: "dsafasd",
    name: "ldksjalksaf",
  },
]);
const searchVal = ref("");

function opera(newVal: string, name?: string) {
  tableLoading.value = true;
  getUserList(newVal, name).then((result) => {
    tableData.value = result;
    tableLoading.value = false;
  });
}

const toSearch = debounce(
  () => opera(tabSelectKeys.value, searchVal.value) as any,
  500,
  false
);
watch(
  tabSelectKeys,
  debounce(
    (newVal: string) => {
      opera(newVal);
    },
    500,
    false
  )
);
</script>

<style scoped>
.breadcrumb {
  width: 100%;
  height: 56px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dcdfe6;
}
</style>
