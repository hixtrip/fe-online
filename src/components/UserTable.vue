<template>
  <div class="user-table">
    <div class="titles">
      <span class="title" v-for="(t, i) in titles" :key="t">
        <span v-if="i !== 0"> / </span>
        <span>{{ t }}</span>
      </span>
    </div>
    <el-table :data="userData" style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="name" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';
import userApi from '../api/user';

const props = defineProps({
  curNode: {
    default: () => {
      return {};
    },
  },
});
const userData = ref();
const titles = ref<string[]>([]);

const getTitle = (node: any): string[] => {
  if (!Reflect.ownKeys(node).length) return [];
  let result = [];
  if (node.data && node.data.name) {
    result.push(node.data.name);
  }
  if (node.parent && node.parent.data && node.parent.data.name) {
    result = getTitle(node.parent as any).concat(result);
  }
  return result;
};

const getData = (params: any = {}) => {
  userApi.query(params).then((users) => {
    userData.value = users;
  });
};

watchEffect(() => {
  titles.value = getTitle(props.curNode);
  if (Reflect.ownKeys(props.curNode).length === 0) return;
  getData({ orgId: (props.curNode as any).data.id });
  // console.log(title);
});
</script>

<style>
.user-table {
  width: 100%;
}
.user-table .titles {
  min-height: 10px;
}
</style>
