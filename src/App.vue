<template>
  <div class="app">
    <div class="OrgTreeBox">
      <OrgTree @clickNode="getNode"></OrgTree>
    </div>
    <UserTable class="tableBox" :orgId="data.orgId"></UserTable>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import OrgTree from './components/OrgTree.vue'
import UserTable from './components/UserTable.vue'
const data = reactive({
  orgId: null
})
const getNode = (node: any) => {
  data.orgId = node.id
}
</script>

<style scoped>
.app {
  display: flex;
  box-sizing: border-box;
}
.OrgTreeBox {
  min-width: 200px;
}
.tableBox {
  flex: 1;
}
</style>
