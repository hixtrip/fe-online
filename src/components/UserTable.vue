<template>
  <h2>部分名称： {{ route.params.name }}</h2>

  <search @search="handleSearch" />

  <table>
    <tr>
      <th>选择</th>
      <th>成员名</th>
      <th>删除</th>
    </tr>
    <tr v-for="item in dataShow" :key="item.id">
      <td>
        <input
          type="radio"
          v-bind:value="item.id"
          @change="item.selected = $event.target.checked"
        />
      </td>
      <td>{{ item.name }}</td>
      <td><button @click="deleteItem(item.id)">删除用户</button></td>
    </tr>
    <tr>
      <td colspan="3">
        <button @click="deletSelect">删除选中的用户</button>
      </td>
    </tr>
  </table>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import userApi from "../api/user";
import Search from "./Search.vue";

const data = ref(null); // 所有的数据
const dataShow = ref(null); // 显示的数据

// 获取路由信息
const route = useRoute();
console.log(route.params.name);

// 获取数据
onMounted(async () => {
  let res = await userApi.query();
  // 对响应的信息进行处理
  data.value = res.map((item) => {
    return {
      ...item,
      selected: false,
    };
  });

  dataShow.value = [...data.value];
});

// 删除指定id的用户
function deleteItem(id) {
  let index = dataShow.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    dataShow.value.splice(index, 1);
  }
}
// 删除选中的用户
function deletSelect() {
  dataShow.value = dataShow.value.filter((item) => !item.selected);
}

// 按名字搜索
function handleSearch(keyword) {
  dataShow.value = dataShow.value.filter((item) => {
    return item.name.includes(keyword);
  });
}
</script>
