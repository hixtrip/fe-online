<template>
  <div class="flex-1">
    <el-input placeholder="请输入用户名称" v-model="userName" ></el-input>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="用户id" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="phone" label="手机号" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, watch, watchEffect } from "vue";
import userApi from "../../api/user";
import { IUser } from "../../types";
const tableData = ref<IUser[]>([]);
const temTableData = ref<IUser[]>([]);
const userName = ref<string>("");
const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});

watch(
  () => props.id, // 要观察的响应式状态
  (newId, oldId) => {
    console.log(newId, oldId);
    if (newId != oldId) {
      getUserList();
    }
  },
  { immediate: true } // 立即执行回调函数
);
watch(()=>userName.value,(newUserName,useOldValue)=>{
  userNameChange()
})
function debounce(func: Function, wait: number = 100) {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: any) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
const userNameChange = debounce((username: string) => {
  tableData.value = temTableData.value.filter(
    (item: IUser) => item.name.indexOf(username) > -1
  );
}, 300);

function getUserList() {
  userApi.query().then((res: IUser[]) => {
    tableData.value = res;
    temTableData.value = res;
  });
}
</script>
<style scoped lang="less">
.flex-1 {
  flex: 1;
}
</style>
