<template>
  <div class="wrap">
    <a-menu v-model:selectedKeys="current" mode="horizontal">
      <a-menu-item key="mail">
        <template #icon>
          <user-add-outlined />
        </template>
        成员管理
      </a-menu-item>
      <a-menu-item key="app">
        <template #icon>
          <usergroup-add-outlined />
        </template>
        团队管理
      </a-menu-item>
      <a-menu-item key="sub1">
        <template #icon>
          <group-outlined />
        </template>
        职位管理
      </a-menu-item>
    </a-menu>
    <div class="wrap-container">
      <orgTree />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, onBeforeMount } from "vue";
import {
  UserAddOutlined,
  UsergroupAddOutlined,
  GroupOutlined,
} from "@ant-design/icons-vue";
import orgTree from "./pages/orgTree.vue";
import orgApi from "./api/org";
import userApi from "./api/user";
const current = ref<string[]>(["mail"]);

// const userList = ref();
// userApi.query({}).then((users) => {
//   //   console.log("userApi：", users);
//   userList.value = users;
// });

// const orgList = ref();
// orgApi.query().then((users) => {
//   //   console.log("orgApi：", users);
//   orgList.value = users;
// });
const userList = ref()
const orgList = ref()
const getList = async () => {
  await userApi.query({}).then((users) => {
    userList.value = users
  });
  await orgApi.query().then((users) => {
    orgList.value = users
  })
};

provide("userList", userList);
provide("orgList", orgList);
onBeforeMount(() => {
  getList()
})
</script>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  background-color: #f3f3f3;
}

.wrap-container {
  display: flex;
  flex-direction: row;
}
</style>