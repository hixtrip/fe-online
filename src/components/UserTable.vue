<script setup lang="ts">
import type { User } from "@/api/user"
interface Props {
  userList: User[],
  keyword: string
}

withDefaults(defineProps<Props>(), {
  userList: () => []
});

const emits = defineEmits<{
  (e: "update:keyword", v: string): void
}>();
let timer: ReturnType<typeof setTimeout> | void;
const inputChange = (e: Event) => {
  if(timer) clearTimeout(timer);
  timer = setTimeout(
    () => emits("update:keyword", (e.target as HTMLInputElement).value.trim()),
    200
  );
};
</script>

<template>
  <div class="user-table">
    <input :value="keyword" class="input-filter" type="text" @input="inputChange">
    <template v-if="userList.length">
      <table border="1">
        <thead>
          <tr>
            <th scope="col">序号</th>
            <th scope="col">姓名</th>
            <th scope="col">用户名</th>
            <th scope="col">id</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in userList">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>xxxxx</td>
            <td>{{ item.id }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <div v-else>no data</div>
  </div>
</template>

<style scoped>
.user-table {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: fit-content;
  padding: 20px 0;
  border: 1px solid #fff;
}
.input-filter {
  height: 30px;
  margin-bottom: 15px;
}
</style>
