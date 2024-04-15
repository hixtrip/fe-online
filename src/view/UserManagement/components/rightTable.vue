<template>
    <div class="page-content">
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="">
                <el-input
                    v-model="form.user"
                    placeholder="搜索"
                    @input="useDebounce"
                    >
                    <template #append>
                        <el-select v-model="form.userOption" style="width: 115px">
                            <el-option label="1" value="1" />
                            <el-option label="2" value="2" />
                            <el-option label="3" value="3" />
                        </el-select>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-select
                    v-model="form.state"
                    style="width: 240px"
                    allow-create
                    filterable
                    placeholder="登录状态"
                    clearable
                >
                    <el-option label="登录状态" value="login" />
                    <el-option label="离线状态" value="offline" />
                </el-select>
            </el-form-item>
        </el-form>
        <el-table
            ref="tableRef"
            :data="tableData.value"
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55" />
            <el-table-column property="name" label="姓名" width="120"></el-table-column>
            <el-table-column property="label" label="用户名" width="120" />
        </el-table>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import userApi from '@/api/user'
import mitter from '@/utils/eventBus'
import { debounce } from '@/utils/index'

const form = ref({})
const tableData = reactive([])

onMounted(() => {
    initTable()
});
/* 初始化表格 */
const initTable = (id)=>{
    userApi.query({id}).then(res=>{
        tableData.value = res
    })
}
const handleSelectionChange = ()=>{}
/* 使用防抖 */
const useDebounce = debounce((val)=>{
    searchTable(val)
},500);

/* 监听左侧树 */
mitter.on('selOrg',(row)=>{
    initTable(row.id)
})

/* 构造数据 */
const searchTable = (val)=>{
    if(!val){
        initTable()
        return
    }
    let newList = [...tableData.value];
    tableData.value = newList.filter((item)=>{
        if(item.name.indexOf(val)>-1){
            return item
        }
    });
}
</script>
<style scoped>

</style>
  