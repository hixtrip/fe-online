<template>
    <div class="home">
        <el-row>
            <el-col :span="2">
                <OrgTree class="orgtree" @change="getTreeValue"/>
            </el-col>
            <el-col :span="20">
                <UserTable :tableList="tableList"  class="usertable"/>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts" name="home" setup>
import OrgTree from '../../component/orgTree/index.vue'
import UserTable from '../../component/userTable/index.vue'
import {onMounted,ref} from 'vue'
// import {throttle} from 'lodash'
import { getUser } from './index.ts'
const getTreeValue = (num:Number) =>{
    getTableList();
}
const tableList = ref([])
const getTableList = () =>{
    getUser()?.then(res =>{
        tableList.value = res;
    });
}
onMounted(async()=>{
    await getTableList();
})
</script>
<style lang="scss" scoped>
.home{
    width: 100%;
}

</style>