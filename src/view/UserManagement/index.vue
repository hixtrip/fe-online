<template>
    <div class="page-content">
        <el-tabs v-model="tabName" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="user">
                <div class="user-tab">
                    <div class="user-tab-left">
                        <LeftTree />
                    </div>
                    <div class="user-tab-right">
                        <RightTable />
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="组织管理" name="org" lazy>组织管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="role" lazy>角色管理</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import userApi from '@/api/user'
import orgApi from '@/api/org'
import LeftTree from './components/leftTree.vue'
import RightTable from './components/rightTable.vue'

const tabName = ref('user')
/* tab切换事件 */
const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}

</script>
<style scoped>
.page-content{
    padding:10px;
    width:100%;
    height:100%;
    box-sizing: border-box;
    
}
.user-tab{
    display: flex;
    .user-tab-left{
        display: grid;
        width:300px;
    }
    .user-tab-right{
        flex:1;
    }
}
:deep(.el-tabs__header){
    margin:0;
}

</style>
  