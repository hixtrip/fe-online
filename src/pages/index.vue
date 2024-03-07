<template>
  <div class="flexCls-align">
   <org-tree @on-change="onOrgChange" ></org-tree>
   <user-table :id="curId"></user-table>
  </div>
</template>

<script setup lang="ts">
import OrgTree from "./components/OrgTree.vue"
import UserTable from "./components/UserTable.vue"
import {ref} from "vue"
const curId=ref<string>("")
function onOrgChange(id:string){
  
  curId.value=id;
}

</script>
<style scoped lang="less">
.flexCls-align {
  display: flex;
  gap:20px
}

</style>
