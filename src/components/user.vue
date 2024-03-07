<template>
    <el-table :data="filterTableData" style="width: 100%">
        <el-table-column label="ID" prop="id" />
        <el-table-column label="Name" prop="name" />
        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
        </el-table-column>
    </el-table>

</template>

<script lang="ts" setup>
import useUser from '../hooks/useUser'
let {filterTableData,search} = useUser()
</script>