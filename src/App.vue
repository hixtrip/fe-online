<template>
  <layout>
    <template #top>
      <wrap></wrap>
    </template>
    <template #main>
      <core></core>
    </template>
  </layout>
</template>

<script setup>
import layout from "./components/Layout.vue";
import wrap from "./components/Wrap.vue";
import core from "./components/Core.vue";
</script>
