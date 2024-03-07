<script setup lang="ts">
import { ref } from 'vue'
import Tree from './components/Tree.vue'
import Table from './components/Table.vue'

type TreeData = {
  name: string
  id: string
}

const deptName = ref('')
const deptId = ref('')
function onTreeSelect({ name, id }: TreeData) {
  console.log('id, selected', name, id)
  deptName.value = name
  deptId.value = id
}
</script>

<template>
  <el-row type="flex" justify="start" :gutter="10" class="row">
    <el-col :span="8">
      <el-card>
        <template #header>
          <span>部门</span>
        </template>
        <Tree ref="treeRef" @tree-select="onTreeSelect" />
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card>
        <template #header>
          <span>当前部门：{{ deptName }}</span>
        </template>
        <Table :deptId="deptId" />
      </el-card>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
.row {
  width: 1200px;
  height: 600px;
}
</style>
