
<script setup lang="ts">
import orgApi from '../api/org'
import { Ref, ref, getCurrentInstance } from 'vue'
import {  debounce } from "../utils/debounce.ts";

type Obj = {
  id: string,
  name: string
}
let orgList: Ref<Obj[]> = ref([]) 
let activeOrg:string = ''
orgApi.query().then((users) => {
    orgList.value = users
})
const instance = getCurrentInstance();

const menuClick = (item: Obj):void => {
    if(item.id == activeOrg) {
        return
    }
    activeOrg = item.id
    debounce(() => {
        instance?.proxy?.$Bus.emit('on-orgclick', item)
    }, 500)()
}

</script>


<template>
    <div class="org_page">
        <div class="org_head">
            <span>部门</span>
            <el-icon :size="20" color="#333333">
                <Plus />
            </el-icon>
        </div>
        <div>
            <el-menu default-active="0" class="el-menu-vertical-demo" >
                <el-menu-item v-for="(item, index) of orgList" :key="item.id" :index="index" @click="menuClick(item)">
                    <el-icon><icon-menu /></el-icon>
                    <span>{{item.name}}</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>



<style scoped>
.org_page {
    width: 100%;
}

.org_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}
</style>
