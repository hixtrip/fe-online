<template>
  <div class="org-tree-wrap">
    <OrgTreeNode
      v-for="org in orgList"
      :key="org.id"
      :org="org"
      :level="1"
    ></OrgTreeNode>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, toRefs, provide, inject } from 'vue';
import type { PropType } from 'vue';
import OrgTreeNode from './org-tree-node.vue';
import orgApi from '@/api/org';
import type { Org } from '@/api/org';

const props = defineProps({
  // 请求数据的接口，其实如果组件想更通用的话，
  // org.id，org.name字段名都可以改成可配置的
  // 包括wrap、node的变量命名也可以剔除掉org，更中性一些
  func: {
    type: Function,
    default: () => {}
  }
})

const eimt = defineEmits(['select-node'])
onMounted(async () => {
  state.orgList = await props.func()
})

const state = reactive({
  orgList: [] as Org[]
})
const { orgList } = toRefs(state)

// 当前选中的节点
const currSelectNode = ref<Org>({})
function updateCurrSelectNode(node: Org, parentList: Org[]) {
  currSelectNode.value = node
  // 抛出最终选中的结果
  eimt('select-node', node, parentList)
}
provide("currSelect", { currSelectNode, updateCurrSelectNode })

// 将请求数据的接口提供给子元素
provide("getFunc", props.func)
</script>

<style lang="scss" scoped>

</style>