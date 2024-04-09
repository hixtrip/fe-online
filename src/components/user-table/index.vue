<template>
  <div class="user-search">
    <input v-model="searchKey" placeholder="请输入用户名" />
  </div>
  <table width="100%">
    <tr>
      <th>序号</th>
      <th>Id</th>
      <th>名称</th>
      <th>orgId</th>
    </tr>
    <tr v-if="dataList.length === 0">
      <td colspan="6">暂无数据</td>
    </tr>
    <tr v-for="(item, idx) in dataList">
      <td>{{ idx + 1 }}</td>
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.orgId }}</td>
    </tr>
  </table>
</template>

<script lang="ts" setup>
// 本页仅简单监听org选择变动,重新请求数据
// TODO 分页未处理 (方式可能有:前端虚拟分页;或后端返回总条数/每页条数)
// 若此处是非分页页面,数据量较大,建议不采用table布局.
// 实际应用中可能考虑到滚动条及固定定位等问题,一般采用成熟ui框架,如果element,antdv等

import { ref, watch } from "vue";
import userApi from "@/api/user";

interface User {
  id: number;
  name: string;
  orgId: string | undefined;
}
const props = defineProps<{
  orgId: string | undefined;
}>();
const searchKey = ref<string>();
const dataList = ref<Array<User>>([]);
const timers = 400; // 延时请求数据时间(防止两次请求时间过近)
const serachTimer = ref(
  setTimeout(() => {
    changeUsers();
  }, timers)
);

const changeUsers = (key?: string) => {
  userApi.query({ orgId: props.orgId }).then((users: Array<User>) => {
    // 因为数据是随机生成,
    dataList.value = users.filter(
      (item) => !key || item.name.indexOf(key) !== -1
    );
    console.log(dataList.value);
  });
};
watch(
  () => props.orgId,
  () => {
    // 监听org选择变动,重新请求user信息
    console.log("org选择变了,重新请求user信息");
    changeUsers();
  }
);
watch(
  () => searchKey.value,
  (n) => {
    console.log("user搜索值变了:", n);
    serachTimer.value && clearTimeout(serachTimer.value);
    serachTimer.value = setTimeout(() => {
      console.log("user搜索值变了,重新请求user信息");
      changeUsers(n);
    }, timers);
  }
);
</script>
<style scoped>
td,
th {
  padding: 0 20px;
}
</style>
