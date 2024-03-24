<template>
  <div class="layout">
    <div class="left-layout">
      <OrgTree :getOrgId="getOrgId"></OrgTree>
    </div>
    <div class="right-layout">
     <UserTable :orgId="orgId"></UserTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import OrgTree from './components/OrgTree/index.vue'
import UserTable from './components/UserTable/index.vue'
import { onMounted , ref} from "vue";
const orgId = ref()
const getOrgId = (value:string) => {
  orgId.value = value
}
onMounted(()=>{
})
</script>
<style>
.layout{
  width: 100%;
  display: flex;
  background-color: #f2f3f5;
  min-height: 100vh;
  padding: 20px;
  gap: 20px;
  box-sizing: border-box;
}

.left-layout{
  min-width: 300px;
  background-color: #fff;
}

.right-layout{
  flex: 1 1 auto;
  background-color: #fff;
}
</style>
