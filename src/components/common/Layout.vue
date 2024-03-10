<template>
  <div class="layout-container flex">
    <Header></Header>
    <div class="flex-1 overflow-hidden">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from './Header.vue';

</script>

<style lang="scss">
.layout-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
}
</style>