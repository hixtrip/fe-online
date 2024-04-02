<template>
    <div class="usertable">
        <div>
            <!-- <el-row> -->
                <el-form :model="form" label-width="auto" style="max-width: 600px;display: flex;">
                    <!-- <el-col :span="10"> -->
                        <el-form-item label="关键词查询">
                            <el-input v-model="form.keyword" />
                        </el-form-item>
                    <!-- </el-col> -->
                    <!-- <el-col :span="5"> -->
                        <div style="margin-left: 10px;">
                            <el-button type="primary" @click="getList">查询</el-button>
                        </div>
                    <!-- </el-col> -->
                </el-form>
            <!-- </el-row> -->
        </div>
        <el-table :data="userList" style="width: 100%">
            <el-table-column prop="id" label="id" width="180" />
            <el-table-column prop="name" label="name" width="180" />
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { onMounted,ref,getCurrentInstance } from 'vue';
import {throttle} from 'lodash'
import {getUser} from './index'
import {User} from './interface'
import {Org} from '../orgTree/interface'
const userList = ref([] as User[]);
const Bus = getCurrentInstance()?.proxy?.Bus;
const form = ref({
    keyword:""
})
// 获取org

Bus.on("orgChange",(item:Org)=>{
    getList();
})

const getList = throttle(function() {
    getUser()?.then(res =>{
        userList.value = res;
    });
},300)
onMounted(async()=>{
    await getList();
})
</script>