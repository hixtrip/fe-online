<script setup lang="ts">
export interface UserTableProps {
  orgId: string | null;
}

const props = defineProps<UserTableProps>();

import { query as UserQuery } from "@/api/user";

import { onMounted } from "vue";

async function getUserByOrgId() {
  if (!props.orgId) throw new Error("所提供的orgId为空");
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
