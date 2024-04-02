<template>
    <div class="usertable">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="id" width="180" />
            <el-table-column prop="name" label="name" width="180" />
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import {ref,watch} from 'vue'
const props = defineProps({
    tableList:Array
})
const tableData = ref(props.tableList);
watch(props, (newValue) => {
      tableData.value  = newValue.tableList
});
</script>