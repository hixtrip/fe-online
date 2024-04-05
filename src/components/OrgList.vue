// 递归组件

<template>
  <ul>
    <li v-for="item in list">
      <router-link :to="item.name">{{ item.name }}</router-link>
      <org-list v-if="item.children" :list="item.children"></org-list>
    </li>
  </ul>
</template>

<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({ list: Array });
</script>
