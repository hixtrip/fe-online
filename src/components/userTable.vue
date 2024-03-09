<template>
    <div>
        <el-input v-model.trim="searchInput" style="width: 240px" placeholder="请输入" >
            <template #append>
                <el-button :icon="Search" @click="getSearch"/>
            </template>
        </el-input>
        <el-table border :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="id" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import userApi from '../api/user'
import {Search} from '@element-plus/icons-vue'
const props = defineProps({
    ids:String
})
interface tableData {
    id: string
    name: string
}


let timer
const tableData = ref<tableData[]>([])
const getData = async (query) => {
    let users = await userApi.query(query)
    tableData.value = users
}

const searchInput = ref<string>('')
const getSearch = () => {
    if(searchInput.value.length === 0) return
    clearTimeout(timer)
    timer = setTimeout(() => {
        getData({name: searchInput.value})
    }, 500);

}
watch(() => props.ids, (newValue, oldValue) => {
    console.log(newValue, oldValue);
    searchInput.value = ''
    clearTimeout(timer)
    timer = setTimeout(() => {
        getData({id: newValue})
    }, 500);
}, {
    immediate: true
})
</script>