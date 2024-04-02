<template>
    <div class="home">
        <el-row>
            <el-col :span="2">
                <OrgTree :orgList="orgList" class="orgtree" @change="getTreeValue"/>
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
import { getUser,getOrg } from './index.ts'
const getTreeValue = (num:Number) =>{
    getTableList();
}
const tableList = ref([])
const orgList =ref([])
const getTableList = () =>{
    getUser()?.then(res =>{
        tableList.value = res;
    });
}
const getMenuList = () =>{
    getOrg()?.then((res) =>{
        orgList.value = res;
    });
}
onMounted(async()=>{
    await getMenuList();
    await getTableList();
})
</script>
<style lang="scss" scoped>
.home{
    width: 100%;
}

</style>