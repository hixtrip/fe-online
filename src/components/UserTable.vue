<template>
  <div>
    <input v-model="searchValue" placeholder="请输入" class="mb-20" />
    <table class="table">
      <caption></caption>
      <thead class="thead">
        <tr>
          <th scope="col">姓名</th>
          <th scope="col">用户名</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item of tableData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import userApi from '../api/user'
import { PropType, watch, ref, watchEffect } from 'vue'
import debounce from '../utils/debounce'
import { DataType } from '@/type/index'
const props = defineProps({
  orgId: {
    type: String as PropType<String | null>,
    default: null
  }
})
const searchValue = ref('')
const tableData = ref<DataType[]>([])
const getList = debounce(() => {
  const params = {
    orgId: (props.orgId || '') as string,
    name: searchValue.value
  }
  userApi.query(params).then((res) => {
    tableData.value = res
  })
})
watchEffect(() => {
  const data = {
    orgId: (props.orgId || '') as string,
    name: searchValue.value
  }
  getList()
})
</script>

<style scoped>
.table {
  width: 100%;
}
.mb-20 {
  margin-bottom: 20px;
}
.thead {
  background-color: blue;
}
th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}
</style>
