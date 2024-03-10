<template>
  <select v-model="selectVal" class="select-wrap" name="pets" id="pet-select" @change="handleSelect">
    <option value="">{{ placeholder }}</option>
    <option v-for="opt in optList" :value="opt.value">{{ opt.label }}</option>
  </select>
</template>

<script lang="ts" setup>
import { ref, toRaw } from 'vue';

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  optList: {
    type: Array,
    default: []
  }
})

const emit = defineEmits(['select'])

const selectVal = ref('')

function handleSelect() {
  let select = toRaw(props.optList).find(o => o.value === selectVal.value)
  emit('select', select)
}
</script>

<style lang="scss" scoped>
.select-wrap {
  border: none;
}
</style>