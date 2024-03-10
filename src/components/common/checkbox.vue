<template>
  <input class="checkbox" type="checkbox" v-model="model" @change="handleChange">
</template>

<script lang="ts" setup>
const model = defineModel()
const emit = defineEmits(['change'])
function handleChange() {
  emit('change', model.value)
}
</script>

<style lang="scss" scoped>
.checkbox {
  vertical-align: middle;
  margin-top: -2px;
}
</style>