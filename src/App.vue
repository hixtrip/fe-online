<script setup lang="ts">
import { ref, provide } from "vue";
import OrgTree from "./components/OrgTree/index.vue";
import UserTable from "./components/UserTable.vue";
import debounce from "@/utils/debounce";
import { LOAD_USER_KEY } from "@/utils/keys";
import { query as getUserList, User, type UserQuery } from "./api/user";

const searchName = ref("");

const tableData = ref<User[]>([]);
async function getUserData(userQuery: UserQuery) {
  const data = await getUserList(userQuery);
  tableData.value = data;
}

const debounceGetUserDdata = debounce<UserQuery>(getUserData);
function handleSearchInput() {
  debounceGetUserDdata({
    name: searchName.value,
  });
}

provide(LOAD_USER_KEY, getUserData);
</script>

<template>
  <main>
    <aside>
      <OrgTree />
    </aside>
    <section>
      <el-form-item label="用户名">
        <el-input
          placeholder="搜索"
          v-model="searchName"
          @input="handleSearchInput"
        />
      </el-form-item>
      <UserTable :data="tableData" />
    </section>
  </main>
</template>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
}
main > aside {
  flex: 1;
  border-right: 1px solid #ccc;
}
main > section {
  flex: 2;
}
</style>
@/utils/keys
