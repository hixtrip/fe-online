<template>
  <div class="layout-content">
    <div class="cont-org">
      <org-tree-antdv @select="orgSelect" />
    </div>
    <div class="cont-user">
      <user-table :org-id="orgId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import OrgTreeAntdv from "@/components/org-tree-antdv/index.vue";
import UserTable from "@/components/user-table/index.vue";

const orgId = ref();
const orgSelect = (id: string) => {
  orgId.value = id;
};
</script>
<style scoped>
.layout-content {
  display: flex;
  padding: 20px;
}
.cont-org {
  width: 300px;
  flex-grow: 0;
}
.cont-user {
  flex-grow: 1;
}
</style>
