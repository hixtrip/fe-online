<template>
  <div>
     <el-input
      v-model="searchName"
      style="width: 240px;margin-bottom: 10px;"
      placeholder="Type something"
      prefix-icon="Search"
      @input="debouncedSearch"
    />
     <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" sortable  />
    <el-table-column prop="name" label="姓名" width="180" sortable  />
    
  </el-table>
  </div>
</template>

<script lang="ts" setup>
import { toRef, ref, watch, } from 'vue'

import { userApi } from '../../api/user'
import type { User } from '../../api/user'

const props = defineProps({ id: String })
let tableData = ref()
const id = toRef(props, 'id')
const searchName = ref('')



const debounce = (fn: Function, delay: number) => {
  let timer: number | null;
  return function(...args: any[]) {
    clearTimeout(timer!);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const debouncedSearch = debounce(() => {
  // 执行搜索逻辑
  getList()
}, 1000);

watch(id,() => {
   getList()
})

const getList = () => {
  const params = {
    orgId: id.value,
    name: searchName.value
  }
  console.log('params===>',params)
  userApi.query(params).then((users: User[]) => {
      tableData.value = users
    })
}






</script>
<style scoped>
</style>