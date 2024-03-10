<template>
  <div class="input-box flex align-items-center">
    <svg-icon name="search" width="14" height="14"></svg-icon>
    <input v-model="model" class="input ml10" type="text" placeholder="搜索" @input="onInput">
  </div>
</template>

<script lang="ts" setup>
const model = defineModel()
const emit = defineEmits(['input'])
function onInput() {
  emit('input', model.value)
}
</script>

<style lang="scss" scoped>
.input {
  border: none;
}
</style>