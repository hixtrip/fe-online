<script setup lang="ts">
export interface UserTableProps {
  orgId: string;
}

const props = defineProps<UserTableProps>();

import { query as UserQuery } from "@/api/user";

import { onMounted } from "vue";

async function getUserByOrgId() {
  const data = await UserQuery({
    orgId: props.orgId,
  });
  console.log(data);
}
onMounted(() => {
  getUserByOrgId();
});
</script>

<template>
  <div></div>
</template>

<style scoped lang="scss"></style>
