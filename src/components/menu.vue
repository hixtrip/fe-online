<template>
    <div class="menu">
        <h5 class="mb-2">部门</h5>
        <el-scrollbar class="scrollbar">
            <!-- 菜单组件 -->
            <div class="menu">
                <div class="item" v-for="(item, index) in menuList" :key="index" @click="handleUser">{{ item.name }}</div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts" name="app">
import orgApi from '../../src/api/org';
import { ref,onMounted } from "vue";
import useTalk from '../hooks/useUser'
let {handleUser} = useTalk()
/* 生命周期 */
onMounted(() => {
    getOrgInfo() //获取部门信息
})
// 获取部门信息
let menuList = ref<any>([]);
function getOrgInfo() {
    orgApi.query('1').then((users) => {
        menuList.value = users
        handleUser() // 根据参数请求对应的信息
        console.log(menuList.value)
    })
}
</script>

<style scoped>
.mb-2{
    font-size: 22px;
    padding: 10px;
}
.menu{
    height: 100vh;
    border-right: 1px solid #ccc;
}
.menu .item{
    font-size: 20px;
    padding: 10px;
}
</style>