<template>
    <div class="orgtree">
        <el-row class="tac">
            <el-col :span="24">
            <h5 class="mb-2">部门表</h5>
            <el-menu
                :default-active="menuActive"
                class="el-menu-vertical-demo"
            >
              <el-menu-item v-for="(item,index) in orgList" :key="index" :index="index" @click="changeOrg(item)">
                <span>{{ item.name }}</span>
              </el-menu-item>
            </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { onMounted,ref,getCurrentInstance } from 'vue'
import {debounce} from 'lodash'
import {getOrg} from './index'
import {Org} from './interface'
const Bus = getCurrentInstance()?.proxy?.Bus;
const orgList = ref([] as Org[]);
const menuActive = ref(0);
// 获取org
const changeOrg = debounce(function(item:Org|{}){
    Bus.emit("orgChange",item)
},300)
const getList = () =>{
    getOrg()?.then(res =>{
        orgList.value = res;
    });
}
onMounted(async()=>{
    await getList();
})
</script>