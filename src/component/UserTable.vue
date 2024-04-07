<template>
  <div class="user_table">
    <div class="search_button" ref="searchButton">
      <el-input
        v-model="state.queryModel"
        placeholder="请输入姓名"
        :header-cell-style="{ textAlign: 'center' }"
        border
        stripe
        style="width: 200px"
        @input="searchName"
        clearable
      ></el-input>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="primary"
        @click="refreshName"
        >搜索</el-button
      >
    </div>
    <el-table
      class="table_content"
      ref="table"
      :data="state.tableData"
      border
      stripe
    >
      <el-table-column type="selection" width="60" align="center" />
      <el-table-column label="编号" prop="id" align="center"></el-table-column>
      <el-table-column
        label="姓名"
        prop="name"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts" name="UserTable">
import userApi from "../api/user";
import throttle from "../utils/throttle";
import { computed, reactive, ref, defineExpose } from "vue";
interface User {
  id: String;
  name: String;
}

const searchButton = ref(null) as any;
const state = reactive({
  tableData: [] as User[],
  queryModel: "",
  copyData: [] as User[],
});
const tableHeight = computed(() => {
  return searchButton.value ? searchButton.value.clientHeight + "px" : 0 + "px";
});
const searchName = () => {
  throttle(
    () => {
      if (state.queryModel == "") {
        state.tableData = state.copyData;
      } else {
        state.tableData = state.tableData.filter((item: any) => {
          return (
            item.name.toLowerCase().indexOf(state.queryModel) > -1 ||
            item.name.toUpperCase().indexOf(state.queryModel) > -1
          );
        });
      }
    },
    500,
    false
  );
};

const refreshName = () => {
  throttle(
    () => {
      initData();
    },
    200,
    false
  );
};
defineExpose({ refreshName });

const initData = () => {
  userApi.query({}).then((res) => {
    state.tableData = res;
    state.copyData = JSON.parse(JSON.stringify(res));
  });
};
initData();
</script>

<style scoped>
.user_table {
  width: 100%;
  height: 100%;
}
.search_button {
  margin-bottom: 20px;
}
.table_content {
  height: calc(100% - v-bind(tableHeight));
}
</style>
