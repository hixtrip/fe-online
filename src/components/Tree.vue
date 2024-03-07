<script setup lang="ts">
import { ref, computed, watch, getCurrentInstance } from 'vue'
import orgApi from '../api/org'
import _ from 'lodash'

const emit = defineEmits(['tree-select'])
type TreeData = {
  name: string
  id: string
}

const treeLoading = ref(false)
const defaultProps = {
  children: 'children',
  label: 'name',
}

const nodeClick = _.throttle(
  function (value: TreeData) {
    console.log('nodeClick', value)
    emit('tree-select', value)
  },
  500,
  { trailing: false }
)
const loadNode = (node: any, resolve: (data: TreeData[]) => void) => {
  console.log('node', node)
  treeLoading.value = true
  if (node.level === 0) {
    orgApi
      .query()
      .then((users) => {
        console.log('orgApi', users)
        resolve(users)
      })
      .finally(() => {
        treeLoading.value = false
      })
  }
  orgApi
    .query(node.id || '')
    .then((users) => {
      console.log('orgApi', users)
      const data = users

      resolve(data)
    })
    .finally(() => {
      treeLoading.value = false
    })
}
</script>

<template>
  <div v-loading="treeLoading">
    <el-tree
      node-key="id"
      size="small"
      :props="defaultProps"
      :expand-on-click-node="false"
      @node-click="nodeClick"
      :load="loadNode"
      lazy
    >
    </el-tree>
  </div>
</template>

<style lang="scss" scoped></style>
