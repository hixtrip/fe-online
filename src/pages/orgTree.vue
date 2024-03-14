<template>
  <div class="flex-row">
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" style="width: 256px" mode="inline"
      @click="handleClick">
      <a-sub-menu key="sub1">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>厦门嗨行旅游</template>
        <a-sub-menu key="g1" @click="changeKey(1)">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>
            <div class="flex">
              <span>技术部</span>
              <template v-if="orgList">
                <span>{{ orgList.length }}</span>
              </template>
            </div>
          </template>
          <template v-if="orgList && orgList.length > 0">
            <a-menu-item v-for="item in orgList" :key="item.id">{{ item.name }}</a-menu-item>
          </template>
        </a-sub-menu>
        <a-sub-menu key="g2" @click="changeKey(2)">
          <template #icon>
            <AppstoreOutlined />
          </template>
          <template #title>
            <div class="flex">
              <span>未分配部门</span>
              <template v-if="userList">
                <span>{{ userList.length }}</span>
              </template>
            </div>
          </template>
          <template v-if="userList && userList.length > 0">
            <a-menu-item v-for="item in userList" :key="item.id">{{ item.name }}</a-menu-item>
          </template>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
    <userTable ref="userTableRef" :flag="flag" />
  </div>
</template>

<script lang="ts" setup>
import { ref, inject } from "vue";
import {
  MailOutlined,
  QqOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";
import userTable from "./userTable.vue";

const selectedKeys = ref<string[]>(["1"]);
const openKeys = ref<string[]>(["sub1"]);
const handleClick: MenuProps["onClick"] = (e:any) => {
  // console.log("click", e);
};
const orgList = ref<any>(inject("orgList"))
const userList = ref<any>(inject("userList"))

const flag = ref(true)
const userTableRef = ref()
const changeKey = (num: number) => {
  // console.log(num);
  if (num == 1) {
    flag.value = true
  } else {
    flag.value = false
  }
  userTableRef.value.onSearch()
}

</script>

<style scoped>
.flex {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.flex-row {
  /* background-color: #fff; */
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>