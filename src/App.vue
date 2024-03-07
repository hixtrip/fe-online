<script setup lang="ts">
import { ref, provide, onMounted } from "vue";
import OrgTree from "./components/OrgTree/index.vue";
import UserTable from "./components/UserTable.vue";
import debounce from "@/utils/debounce";
import { LOAD_USER_KEY } from "@/utils/keys";
import { type UserQuery } from "./api/user";

const searchName = ref("");

type UserTableIns = InstanceType<typeof UserTable>;
const userTableEL = ref<UserTableIns>();
const debounceGetUserDdata = ref<null | ((userQuery: UserQuery) => void)>(null);
onMounted(() => {
  if (userTableEL.value) {
    console.log(userTableEL.value);
    debounceGetUserDdata.value = debounce<UserQuery>(
      userTableEL.value.getUserData
    );
  }
});
function handleSearchInput() {
  debounceGetUserDdata.value &&
    debounceGetUserDdata.value({
      name: searchName.value,
    });
}

provide(LOAD_USER_KEY, debounceGetUserDdata);
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
      <UserTable ref="userTableEL" />
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
