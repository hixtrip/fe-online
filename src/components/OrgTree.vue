<template>
  <div class="treePage">
    <ul>
      <li v-for="item of orgData.list" :key="item.id">
        <span @click="getOrdChild(item)" class="pointer">
          {{ item.name }}
          <span>{{ item.loading ? '加载中...' : '' }}</span>
        </span>
        <OrgTree v-if="shouldRenderChild(item)" :orgData="item" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import orgApi from '../api/org'
import { PropType, onMounted, reactive, defineEmits } from 'vue'
import { DataType, OrgData } from '@/type/index'
const props = defineProps({
  parentData: {
    type: Object as PropType<DataType>,
    default: () => ({})
  }
})
const orgData = reactive<OrgData>({
  list: []
})
const emits = defineEmits<{
  clickNode: [org: DataType]
}>()

const getOrdChild = (item: DataType) => {
  if (item.loading) return
  if (item.isUnfold) return (item.isUnfold = false)
  item.loading = true
  orgApi
    .query(item.id)
    .then((res) => {
      item.isUnfold = true
      item.children = res || []
      emits('clickNode', item)
    })
    .finally(() => {
      item.loading = false
    })
}
const shouldRenderChild = (node: DataType) => {
  return node.isUnfold && node.children && node.children.length
}
onMounted(async () => {
  const result = await orgApi.query(props.parentData.id || '')
  orgData.list = result || []
})
</script>

<style scoped>
.treePage {
}
.pointer {
  cursor: pointer;
}
</style>
