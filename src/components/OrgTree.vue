<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { PlusOutlined, ApartmentOutlined } from '@ant-design/icons-vue';
import type { TreeProps } from 'ant-design-vue';
import { DataNode } from 'ant-design-vue/es/tree';
import UserTable from '../components/UserTable.vue'
import orgApi from '../api/org';

// v-model绑定原理
// const props = defineProps(['curOrg'])
// const emit = defineEmits(['update:curOrg'])
// const selectedKeys = ref<string[]>(props.curOrg);
// watch(selectedKeys, async (newSelect, oldSelect) => {
//   console.log(oldSelect);
//   console.log(newSelect);
//   //emit('update:curOrg', newSelect);
// })

const selectedKeys = defineModel<string[]>({ required: true })

// tree 数据源
const treeData = ref<TreeProps['treeData']>();
// Breadcrumb 数据源
const curTreeRoute = ref<TreeProps['treeData']>();

const LoadTreaData = () => {
  const data = [
    { title: '厦门嗨行旅游', key: '0' },
  ] as TreeProps['treeData']
  return data;
}

onMounted(() => {
  treeData.value = LoadTreaData();
  curTreeRoute.value = treeData.value;
});
// 异步加载子节点
const onLoadData: TreeProps['loadData'] = treeNode => {
  return new Promise<void>(resolve => {
    if (!treeNode) {
      resolve();
      return;
    }
    if (treeNode.dataRef.children) {
      resolve();
      return;
    }
    orgApi.query(treeNode.dataRef?.key + "").then((datas) => {
      treeNode.dataRef.children = datas.map(item => { return { key: item.id, title: item.name } as DataNode });
      treeData.value = [...treeData.value];
      resolve();
    })
  });
};
// 点击tree node
const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
  if (info.selected) {
    curTreeRoute.value = [] as DataNode[];
    GetTreeRoute(info.node);
    curTreeRoute.value = curTreeRoute.value.reverse();
  }
};
// 获取 treeNodeRoute
const GetTreeRoute = (curNode: DataNode) => {
  if (curNode.dataRef) {
    curTreeRoute.value?.push(curNode.dataRef as DataNode);
  } else {
    curTreeRoute.value?.push(curNode.node as DataNode);
  }
  if (curNode.parent != undefined) {
    GetTreeRoute(curNode.parent);
  }
}
</script>

<template>
  <a-layout class="w-100 h-100" style="padding: 0">
    <a-layout-sider width="300" style="background: #fff">
      <a-flex vertical class="w-100 h-100" style="">
        <a-flex :justify="'space-between'" :align="'center'" class="w-100"
          style="height: 40px;padding:20px;border-bottom:1px solid #f0f0f0;">
          <span>部门</span>
          <PlusOutlined />
        </a-flex>
        <a-flex class="w-100" style="height: calc(100% - 40px);padding:20px 0;">
          <a-tree class="w-100" v-model:selectedKeys="selectedKeys" :show-icon="true" :block-node="true"
            :load-data="onLoadData" :tree-data="treeData" @select="onSelect">
            <template #icon>
              <ApartmentOutlined />
            </template>
          </a-tree>
        </a-flex>
      </a-flex>
    </a-layout-sider>
    <a-layout style="padding: 0">
      <a-layout-content :style="{ background: '#fff', borderLeft: '1px solid #f0f0f0' }">
        <a-flex vertical class="w-100 h-100" style="">
          <a-flex :align="'center'" class="w-100" style="height: 40px;padding:20px;border-bottom:1px solid #f0f0f0;">
            <ApartmentOutlined style="padding-right: 10px;" />
            <a-breadcrumb v-if="curTreeRoute != undefined">
              <a-breadcrumb-item v-for="item in curTreeRoute" :key="item.key">{{ item.title }}</a-breadcrumb-item>
            </a-breadcrumb>
          </a-flex>
          <a-flex class="w-100" style="height: calc(100% - 40px);">
            <!-- 体现两个组件的互相通信，把user作为子组件，将当前选中的Org通过Props传递到user组件，里面监听处理 -->
            <UserTable :cur-org="selectedKeys"></UserTable>
          </a-flex>
        </a-flex>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped></style>
