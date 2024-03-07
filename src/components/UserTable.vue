<script setup lang="ts">
import { type User } from "@/api/user";

export interface UserTableProps {
  data: User[];
}

const props = defineProps<UserTableProps>();
</script>

<template>
  <el-table :data="data">
    <el-table-column prop="id"></el-table-column>
    <el-table-column prop="name"></el-table-column>
  </el-table>
</template>

<style scoped lang="scss"></style>
