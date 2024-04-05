<template>
  <h2>部门</h2>
  <OrgList :list="data" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import OrgList from "./OrgList.vue";
import orgApi from "../api/org";

const data = ref(null);
onMounted(async () => {
  data.value = await orgApi.query();
});
</script>
