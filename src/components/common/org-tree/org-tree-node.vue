<template>
  <div
    class="org-tree-node cursor-pointer"
    :class="[`level${level}`, currSelectNode.id === org.id && 'active']"
    :style="{ paddingLeft: `${level *20}px`}"
    @click="selectNode"
  >
    <div class="node-head flex align-items-center ">
      <div class="arrow-box">
        <svg-icon v-if="expand && !getted" name="loading" width="10" height="10" class="loading block"></svg-icon>
        <svg-icon v-else-if="showArrow" name="arrow-right" width="10" height="10" :class="['arrow-right block', expand && 'expand']"></svg-icon>
      </div>
      <svg-icon name="flow" width="10" height="10" class="block ml4"></svg-icon>
      <span class="ml4">{{ org.name }}</span>
    </div>
  </div>

  <!-- 子节点 -->
  <CollapseTransition v-if="getted && childList?.length">
    <div class="child-box" v-show="expand">
      <OrgTreeNode
        v-for="child in childList"
        :key="child.id"
        :org="child"
        :level="level + 1"
        :parentList="_parentList"
      ></OrgTreeNode>
    </div>
  </CollapseTransition>
</template>

<script lang="ts" setup>
import OrgTreeWrap from './org-tree-wrap.vue';
import { PropType, inject, reactive, toRefs, ref, onMounted, computed, toRaw } from 'vue';
import type { Ref } from 'vue'
import orgApi from '@/api/org';
import type { Org } from '@/api/org';

const props = defineProps({
  org: {
    type: Object as PropType<Org>,
    default: () => ({})
  },
  parentList: {
    type: Array as PropType<Org[]>,
    default: []
  },
  level: {
    type: Number,
    default: 1
  }
})
const state = reactive({
  childList: null as Nullable<Org[]>,
  expand: false, //展开、折叠
  getted: false //是否获取过子节点
})
const { childList, expand, getted } = toRefs(state)

const { currSelectNode, updateCurrSelectNode } = inject('currSelect')
const getFunc = inject('getFunc')

const showArrow = computed(() => {
  return !state.getted || (state.getted && state.childList?.length)
})

// 父节点数组，包含自身
const _parentList = computed(() => {
  return [].concat(toRaw(props.parentList)).concat(toRaw(props.org))
})

// 选择节点
async function selectNode() {
  // 更新选中的节点
  if (currSelectNode.value !== props.org) {
    updateCurrSelectNode(toRaw(props.org), _parentList.value)
  }

  // 节点已经点过，且没有子元素，直接返回
  if (state.getted && !state.childList?.length) {
    return
  }

  state.expand = !state.expand

  // 获取子节点
  if (!state.getted) {
    try {
      let res = await getFunc(props.org.id, props.level)
      if (res) {
        state.childList = res
      }
    } catch (e) {
      console.error(e)
    } finally {
      state.getted = true
    }
  }
}
</script>

<style lang="scss" scoped>
.org-tree-node {
  line-height: 30px;
  font-size: 14px;
  padding-left: 20px;

  &.active {
    background-color: rgb(236, 245, 255);
  }

  @keyframes loading {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loading {
    animation: loading 2s linear infinite;
  }

  .arrow-box {
    width: 10px;
    height: 10px;
    .arrow-right {
      transition: all .2s ease-in-out;
      transform: rotate(0deg);
      &.expand {
        transform: rotate(90deg);
      }
    }
  }
}

</style>