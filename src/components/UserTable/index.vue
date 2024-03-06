<template>
  <div class="user-table-container">
    <div class="user-table-path">{{ orgPath }}</div>
    <div class="user-table-search">
      <el-input
        placeholder="搜索"
        v-model="name"
        style="width: 300px"
        @input="getList(orgId)"
        clearable
        empty-text="请选择部门"
      ></el-input>
    </div>
    <el-table :data="data" fit>
      <el-table-column label="姓名" prop="name"></el-table-column
    ></el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import userApi, { User } from '../../api/user';

defineOptions({
  name: 'UserTable',
});
const props = defineProps<{
  orgId: string;
  orgPath: string;
}>();
const data = ref<User[]>([]);
const name = ref<string>('');

watch(
  () => props.orgId,
  (n) => {
    getList(n);
  }
);

const getList = (id: string = props.orgId) => {
  userApi
    .query({ id, ...(name.value ? { name: name.value } : {}) })
    .then((res) => {
      data.value = res;
    });
};
</script>

<style scoped lang="scss">
.user-table {
  &-container {
    width: 100%;
    height: 100%;
  }
  &-path {
    padding: 10px;
    border-bottom: 1px solid rgb(203, 198, 198);
  }
  &-search {
    padding: 10px;
  }
}
</style>
