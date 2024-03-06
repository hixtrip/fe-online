<script setup lang="ts">
import { query as orgQuery } from "@/api/org";
import { onMounted } from "vue";

async function getOrgTreeApi() {
  const data = await orgQuery("0");
  console.log(data);
}
onMounted(() => {
  getOrgTreeApi();
});
</script>

<template>
  <div></div>
</template>

<style scoped lang="scss"></style>
