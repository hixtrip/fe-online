<script setup lang="ts">
import OrgTree from "@/components/OrgTree.vue"
import UserTable from "@/components/UserTable.vue"
import useOrgTree from "./OrgTree";
import useUserTable from "./UserTable";
const { orgParent, orgSub, parentId, orgId, getOrgSub } = useOrgTree();
const { userList, keyword } = useUserTable(orgId);
</script>

<template>
  <div class="home">
    <OrgTree :org-parent="orgParent" :org-sub="orgSub" :parent-id="parentId" v-model:org-id="orgId" @parent-change="getOrgSub"/>
    <UserTable :user-list="userList" v-model:keyword="keyword" />
  </div>
</template>

<style scoped>
.home {
  display: flex;
}
</style>
