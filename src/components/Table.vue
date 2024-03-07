<script setup lang="ts">
import { ref, watch, defineProps, onMounted } from 'vue'
import userApi from '../api/user'

type TableData = {
  id: String
  name: String
}
const props = defineProps({
  deptId: String,
})

const form = ref({
  value: '',
})
const loading = ref(false)
const deprName = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const tableData = ref<TableData[]>([])
const total = ref(0)

const onSearch = () => {
  loading.value = true
  const params = {
    ...form.value,
    deptId: props.deptId,
    currentPage: currentPage.value,
    pageSize: pageSize.value,
  }
  console.log('params', params)
  userApi
    .query(params)
    .then((users: TableData[]) => {
      console.log('userApi', users)
      tableData.value = users
      total.value = users.length
    })
    .finally(() => {
      loading.value = false
    })
}
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  currentPage.value = val
  onSearch()
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  pageSize.value = val
  onSearch()
}
onMounted(async () => {
  onSearch()
})
watch(
  () => props.deptId,
  () => {
    form.value.value = ''
    onSearch()
  }
)
</script>
<template>
  <div class="w-[calc(100%-200px)]">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="用户名称：" prop="value">
        <el-input
          v-model="form.value"
          placeholder="请输入"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSearch">
          搜索
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="Id" />
      <el-table-column prop="name" label="名称" />
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
