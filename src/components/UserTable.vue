<template>
   <div class="UserTable">
      <el-form>
         <el-form-item label="搜索:">
            <el-input v-model="search" placeholder="搜索" @input="onInputSearch"></el-input>
         </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%" height="400">
         <el-table-column prop="name" label="姓名" width="180" />
         <el-table-column prop="id" label="用户名" width="180" />
      </el-table>
   </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, withDefaults, defineProps, watch } from 'vue';
import userApi from '../api/user.ts'
import debounce from '../utils/debounce.ts'
const props = withDefaults(defineProps<{
   orgId:string
}>(), {
   orgId: ''
})

watch(()=>props.orgId, (val) => {
   getTableData()
})

const tableData = ref()
const search = ref('')
const loading = ref(false)
const getTableData = async() => {
   let res = await userApi.query({
      id:props.orgId,
      name:search.value
   })
   tableData.value = res
}
const onInputSearch = debounce(getTableData,300)
</script>
<style scoped>
.UserTable{
   padding: 10px
}
</style>
