<template>
  <div id="user" class="user-content">
    <h1 class="user-title">
      <el-icon><Link /></el-icon>
      <span>厦门嗨行旅游 / {{ orgObj.name }}</span>
    </h1>
    <div class="search-title">
      <div class="search-left">
        <el-input
          v-model="searchStr"
          placeholder="请查询用户姓名"
          @change="handleChange"
          clearable
        >
          <template #prefix>
            <el-icon class="el-input__icon"><Search /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="search-right">
        <span>登录状态</span>
        {{ userData.length }}个成员
      </div>
    </div>
    <el-table ref="multipleTableRef" :data="userData" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="姓名" prop="name" />
    </el-table>
  </div>
</template>

<script setup>
import userApi from "../../api/user";
import { ref, defineProps, watch } from "vue";
import { Link, Search } from "@element-plus/icons-vue";
const userData = ref([]);
const searchStr = ref("");
const oldData = ref([]);
const props = defineProps(["orgObj"]);

const getData = (obj) => {
  userApi.query(obj).then((data) => {
    oldData.value = userData.value = data;
  });
};
getData({});

const handleChange = () => {
  if (!searchStr.value) {
    userData.value = oldData.value;
    return;
  }
  const newVal = userData.value.filter((item) =>
    item.name.includes(searchStr.value)
  );
  userData.value = newVal;
};
watch(
  () => props.orgObj.id,
  (newVal, oldVal) => {
    getData(props.orgObj);
  }
);
</script>

<style scoped lang="scss">
.user-content {
  flex: 1;
  .user-title {
    font-size: 16px;
    color: #333;
    text-align: left;
    height: 36px;
    line-height: 36px;
    padding: 0 8px;
    border-bottom: 1px solid #ebeef5;
    display: flex;
    align-items: center;
  }
  .search-title {
    display: flex;
    border-bottom: 1px solid #ebeef5;
    align-items: center;
    .search-right,
    .search-left {
      flex: 1;
    }
    .search-right {
      padding: 0 8px;
    }
    ::v-deep .search-left {
      border-right: 1px solid #ebeef5;
      .el-input {
        --el-input-border-color: transparent;
        --el-input-focus-border-color: transparent;
        --el-input-hover-border: transparent;
      }
    }
  }
}
</style>
