<script setup lang="ts">
import userApi from '@/api/user'
import debounce from '@/utils/debounce'
interface Table {
  name: string
  id: string
}
interface Props {
  orgId: string
}
const props = withDefaults(defineProps<Props>(), {
  orgId: ''
})
let keyword = ref('')
let tableData = ref<Table[]>([])
let toTable = []

// 监听tree的触发，请求对应列表数据
watch(
  () => props.orgId,
  (newValue) => {
    keyword.value = ''
    getTableListAction(newValue)
  }
)

// 请求table列表
const getTableListAction = async (orgId: string) => {
  const res: Table[] = await userApi.query({
    orgId,
    name: keyword.value
  })
  tableData.value = res
  toTable = res
}

// 搜索
const onInputSearch = () => {
  // 正常就请求接口 请求参数keyword，接口返回查询后的列表
  // 防抖
  debounce(() => {
    if (keyword.value == '') {
      tableData.value = toTable
    } else {
      let list = []
      toTable.filter((item) => {
        for (let i in item) {
          if (item[i].indexOf(keyword.value) >= 0) {
            list.push(item)
          }
        }
      })
      tableData.value = list
    }
  })
}
</script>

<template>
  <el-input v-model="keyword" placeholder="搜索用户名" @input="onInputSearch">
    <template #prefix>
      <el-icon class="el-input__icon"><i-ep-search /></el-icon>
    </template>
  </el-input>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="name" label="用户名" />
  </el-table>
</template>

<style scoped></style>
