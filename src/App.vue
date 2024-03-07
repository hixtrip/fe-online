<script setup lang="ts">
import { ref } from "vue";
import OrgTree from "./components/OrgTree/index.vue";
import UserTable from "./components/UserTable.vue";

const activeOrgId = ref(null);
</script>

<template>
  <main>
    <aside>
      <OrgTree />
    </aside>
    <section>
      <UserTable :org-id="activeOrgId" />
    </section>
  </main>
</template>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
}
main > aside {
  flex: 1;
}
main > section {
  flex: 2;
}
</style>
