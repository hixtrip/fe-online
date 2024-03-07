<template>
    <el-input v-model="input" style="width: 240px" placeholder="按回车搜索" @change="changeValue" />
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="姓名" min-width="180" />
      <el-table-column prop="name" label="用户名" min-width="180" />
    </el-table>
  </template>
  
<script lang="ts" setup>
import {ref, watch, defineProps } from 'vue'
import userApi from '../api/user'
interface Props {
  id?: string,
}
const props  = defineProps<Props>()
const input = ref('')
const totalData = ref([])
const tableData = ref([])
watch(() => props.id, (newValue: string, oldValue: string) => {
  userApi.query({id:newValue}).then((users) => {
    totalData.value = users
    tableData.value = users
  })
}, { immediate : true })
const changeValue = (value:string)=>{
    tableData.value = totalData.value.filter(item => item.name.indexOf(value)>=0)
}
</script>