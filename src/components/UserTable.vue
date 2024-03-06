<script setup lang="ts">


import userApi from '../api/user'
import { Ref, ref, getCurrentInstance } from 'vue'
import {  debounce } from "../utils/debounce.ts";

type Obj = {
    id: string,
    name: string
}
let orgItem: Ref<Obj> = ref({})
let userList: Ref<Obj[]> = ref([])
let userListStr: Obj[]  = []
let searValue: Ref<string> = ref('')

const instance = getCurrentInstance()
instance?.proxy?.$Bus.on('on-orgclick', (item: Obj) => {
    orgItem.value = item
    searValue.value = ''
    userApi.query({}).then((users) => {
        userListStr = users 
        userList.value = users
    })
})

const searchInput = (value: string):void => {
    debounce(() => {
        let searUser: Obj[] = userListStr.filter(item => {
            return item.name.includes(value) 
        })
        userList.value = searUser
    }, 500)()
}


</script>

<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{orgItem.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="user_head ui_row">
            <div class="ui_row">
                 姓名：<el-input v-model="searValue" style="width: 240px" placeholder="搜索" :suffix-icon="Search" @input="searchInput"/>
            </div>
        </div>
        <div>
            <el-table ref="multipleTableRef" :data="userList" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column property="id" label="id"/>
                <el-table-column property="name" label="姓名"/>
            </el-table>
        </div>
    </div>
</template>

<style scoped>


</style>
